-- BRANDYBEN — schéma initial, RLS et buckets de stockage.

create extension if not exists pgcrypto;

create type pole as enum ('dev', 'batiment');
create type statut_contenu as enum ('brouillon', 'publie');
create type statut_demande as enum (
  'nouveau', 'en_cours', 'devis_envoye', 'gagne', 'perdu', 'archive'
);

-- clients ---------------------------------------------------------------

create table clients (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  secteur text,
  ville text,
  contact text,
  email text,
  telephone text,
  site text,
  logo_url text,
  visible_sur_site boolean not null default false,
  notes_internes text,
  created_at timestamptz not null default now()
);

-- projects ----------------------------------------------------------------

create table projects (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  slug text not null unique,
  client_id uuid references clients (id) on delete set null,
  pole pole not null,
  resume text,
  contenu text,
  images text[] not null default '{}',
  lien text,
  statut statut_contenu not null default 'brouillon',
  ordre integer not null default 0,
  created_at timestamptz not null default now()
);

-- quote_requests ------------------------------------------------------------

create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  telephone text,
  pole pole not null,
  message text not null,
  statut statut_demande not null default 'nouveau',
  note_interne text,
  created_at timestamptz not null default now()
);

-- testimonials -------------------------------------------------------------

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients (id) on delete set null,
  auteur text not null,
  fonction text,
  note smallint check (note between 1 and 5),
  citation text not null,
  photo_url text,
  statut statut_contenu not null default 'brouillon',
  created_at timestamptz not null default now()
);

-- posts ----------------------------------------------------------------------

create table posts (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  slug text not null unique,
  extrait text,
  contenu text,
  couverture text,
  statut statut_contenu not null default 'brouillon',
  published_at timestamptz,
  auteur text,
  created_at timestamptz not null default now()
);

-- services --------------------------------------------------------------------

create table services (
  id uuid primary key default gen_random_uuid(),
  pole pole not null,
  titre text not null,
  description text,
  benefice text,
  ordre integer not null default 0
);

insert into services (pole, titre, description, benefice, ordre) values
  ('dev', 'Sites internet', 'Sites vitrine, catalogues et boutiques en ligne, conçus sur mesure et pensés pour le mobile en priorité.', 'Une présence en ligne crédible et trouvable sur Google.', 1),
  ('dev', 'Logiciels et applications', 'Outils métier, applications de gestion et solutions mobiles adaptées à votre organisation.', 'Moins de tâches manuelles, des données fiables.', 2),
  ('dev', 'Maintenance, refonte, conseil', 'Reprise d''un site existant, mises à jour de sécurité, optimisation des performances et accompagnement digital.', 'Un site qui reste rapide, sûr et à jour.', 3),
  ('batiment', 'Dessin de projet bâtiment', 'Plans d''architecture, plans d''exécution et pièces graphiques pour vos projets de construction.', 'Des documents exploitables directement sur chantier.', 1),
  ('batiment', 'Études et assistance technique', 'Études de génie civil, métrés, notes techniques et appui au suivi de chantier.', 'Des choix techniques justifiés et des coûts maîtrisés.', 2),
  ('batiment', 'Permis de construire', 'Constitution du dossier technique et accompagnement jusqu''à l''obtention du permis de construire.', 'Un dossier complet, conforme et déposé dans les règles.', 3);

-- settings (table à ligne unique) ----------------------------------------------

create table settings (
  id smallint primary key default 1 check (id = 1),
  rccm text,
  ifu text,
  adresse text,
  telephone text,
  email text,
  horaires text,
  hebergeur text,
  reseaux jsonb not null default '{}'::jsonb
);

insert into settings (id, rccm, ifu, adresse, telephone, email, horaires, hebergeur, reseaux)
values (
  1,
  null,
  '0202212868410',
  'Quartier Agontinkon, Îlot 1270, Parcelle D, 8ème arrondissement, Cotonou, Littoral, Bénin',
  '+229 01 53 72 90 10',
  'brandonmedehou2203@gmail.com',
  'Lundi – samedi, 8 h – 18 h',
  null,
  '{}'::jsonb
);

-- Row Level Security -----------------------------------------------------------

alter table clients enable row level security;
alter table projects enable row level security;
alter table quote_requests enable row level security;
alter table testimonials enable row level security;
alter table posts enable row level security;
alter table services enable row level security;
alter table settings enable row level security;

-- clients : lecture publique des clients visibles, écriture réservée aux comptes authentifiés
create policy "clients_public_read" on clients
  for select to anon using (visible_sur_site = true);

create policy "clients_authenticated_all" on clients
  for all to authenticated using (true) with check (true);

-- projects : lecture publique des projets publiés
create policy "projects_public_read" on projects
  for select to anon using (statut = 'publie');

create policy "projects_authenticated_all" on projects
  for all to authenticated using (true) with check (true);

-- testimonials : lecture publique des témoignages publiés
create policy "testimonials_public_read" on testimonials
  for select to anon using (statut = 'publie');

create policy "testimonials_authenticated_all" on testimonials
  for all to authenticated using (true) with check (true);

-- posts : lecture publique des articles publiés
create policy "posts_public_read" on posts
  for select to anon using (statut = 'publie');

create policy "posts_authenticated_all" on posts
  for all to authenticated using (true) with check (true);

-- services : lecture publique intégrale (pas de statut de publication)
create policy "services_public_read" on services
  for select to anon using (true);

create policy "services_authenticated_all" on services
  for all to authenticated using (true) with check (true);

-- settings : lecture publique intégrale (ligne unique)
create policy "settings_public_read" on settings
  for select to anon using (true);

create policy "settings_authenticated_all" on settings
  for all to authenticated using (true) with check (true);

-- quote_requests : insertion publique uniquement, aucune lecture publique
create policy "quote_requests_public_insert" on quote_requests
  for insert to anon with check (true);

create policy "quote_requests_authenticated_all" on quote_requests
  for all to authenticated using (true) with check (true);

-- Storage : buckets publics logos / projects -------------------------------------

insert into storage.buckets (id, name, public)
values ('logos', 'logos', true), ('projects', 'projects', true)
on conflict (id) do nothing;

create policy "logos_public_read" on storage.objects
  for select to anon using (bucket_id = 'logos');

create policy "logos_authenticated_write" on storage.objects
  for all to authenticated using (bucket_id = 'logos') with check (bucket_id = 'logos');

create policy "projects_bucket_public_read" on storage.objects
  for select to anon using (bucket_id = 'projects');

create policy "projects_bucket_authenticated_write" on storage.objects
  for all to authenticated using (bucket_id = 'projects') with check (bucket_id = 'projects');
