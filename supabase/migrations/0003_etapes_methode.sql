-- Étapes de la section « Comment se déroule un projet » (accueil),
-- éditables depuis l'admin, une liste par pôle.

create table etapes_methode (
  id uuid primary key default gen_random_uuid(),
  pole pole not null,
  titre text not null,
  description text,
  duree text,
  ordre integer not null default 0
);

alter table etapes_methode enable row level security;

create policy "etapes_methode_public_read" on etapes_methode
  for select to anon using (true);

create policy "etapes_methode_authenticated_all" on etapes_methode
  for all to authenticated using (true) with check (true);

insert into etapes_methode (pole, titre, description, duree, ordre) values
  ('dev', 'Cadrage', 'Nous clarifions votre besoin, vos contenus et vos objectifs.', '1 semaine', 1),
  ('dev', 'Maquettes', 'Proposition de design, allers-retours et validation avec vous.', '1 à 2 semaines', 2),
  ('dev', 'Développement', 'Intégration des pages, des fonctionnalités et de vos contenus.', '2 à 3 semaines', 3),
  ('dev', 'Tests et mise en ligne', 'Vérifications techniques, mobile, formulaires, puis publication.', '1 semaine', 4),
  ('batiment', 'Visite et relevés', 'Visite du site, prise de mesures et relevés techniques du terrain ou du bâti existant.', '1 à 3 jours', 1),
  ('batiment', 'Esquisse et plans', 'Esquisse du projet puis plans d''exécution détaillés, en échange avec vous.', '1 à 2 semaines', 2),
  ('batiment', 'Études techniques', 'Études de génie civil, métrés et notes techniques nécessaires au dossier.', '1 semaine', 3),
  ('batiment', 'Dépôt et suivi', 'Constitution du dossier, dépôt du permis si besoin, puis appui au suivi de chantier.', 'Selon le projet', 4);
