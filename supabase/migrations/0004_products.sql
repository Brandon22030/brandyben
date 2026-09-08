-- Catalogue de produits digitaux (e-books, modèles) sur /produits.
-- Chaque fiche renvoie vers sa page de vente Chariow existante : le site
-- ne gère ni paiement ni livraison.

create table products (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  type text,
  prix integer,
  prix_avant_promo integer,
  description text,
  badges text[] not null default '{}',
  image_url text,
  chariow_url text,
  statut statut_contenu not null default 'brouillon',
  ordre integer not null default 0,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

create policy "products_public_read" on products
  for select to anon using (statut = 'publie');

create policy "products_authenticated_all" on products
  for all to authenticated using (true) with check (true);

-- Premier produit réel de BRANDYBEN, laissé en brouillon : Brandon doit
-- renseigner le vrai lien Chariow depuis /admin/produits avant publication.
insert into products (titre, type, prix, prix_avant_promo, description, badges, statut, ordre) values (
  'Le Guide pour créer des sites pro gratuitement avec l''IA et trouver tes premiers clients en 07 jours',
  'E-book PDF',
  5000,
  10000,
  'Le guide simple et efficace pour créer des sites web professionnels et gagner tes premiers revenus en ligne, même sans expérience et même sans capital de départ.',
  array['E-book PDF', 'Niveau débutant', 'Mise à jour incluse'],
  'brouillon',
  1
);
