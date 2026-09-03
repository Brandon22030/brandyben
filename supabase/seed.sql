-- Données de démonstration — développement local uniquement.
-- Ne pas exécuter sur la base de production : le site public n'affiche
-- aucun projet, client ou témoignage inventé (voir CLAUDE.md).

insert into clients (nom, secteur, ville, contact, email, telephone, site, visible_sur_site, notes_internes) values
  ('Société Exemple SARL', 'Commerce', 'Cotonou', 'Nom et fonction', 'contact@exemple.bj', '+229 00 00 00 01', 'https://exemple.bj', true, 'Client de démonstration.'),
  ('Association Horizon', 'Association', 'Cotonou', 'Nom et fonction', 'horizon@mail.bj', '+229 00 00 00 02', null, true, 'Client de démonstration.'),
  ('Cabinet Agbo', 'Architecture', 'Cotonou', 'Nom et fonction', 'agbo@mail.bj', '+229 00 00 00 03', null, true, 'Client de démonstration.'),
  ('Boutique Fifa', 'Commerce', 'Cotonou', 'Nom et fonction', 'fifa@mail.bj', '+229 00 00 00 04', null, true, 'Client de démonstration.'),
  ('EPI Construction', 'BTP', 'Cotonou', 'Nom et fonction', 'epi@mail.bj', '+229 00 00 00 05', null, false, 'Client de démonstration.'),
  ('Client privé', 'Particulier', 'Cotonou', null, null, null, null, false, 'Souhaite rester anonyme.');

insert into projects (titre, slug, client_id, pole, resume, contenu, statut, ordre)
select 'Site Société Exemple', 'site-societe-exemple', id, 'dev', 'Site vitrine cinq pages avec catalogue.', 'Projet de démonstration pour les tests locaux.', 'publie', 1
from clients where nom = 'Société Exemple SARL';

insert into projects (titre, slug, client_id, pole, resume, contenu, statut, ordre)
select 'Boutique Fifa', 'boutique-fifa', id, 'dev', 'Boutique en ligne avec paiement mobile.', 'Projet de démonstration pour les tests locaux.', 'publie', 2
from clients where nom = 'Boutique Fifa';

insert into projects (titre, slug, client_id, pole, resume, contenu, statut, ordre)
select 'Villa duplex Akpakpa', 'villa-duplex-akpakpa', id, 'batiment', 'Plans d''exécution pour une villa duplex.', 'Projet de démonstration pour les tests locaux.', 'brouillon', 3
from clients where nom = 'Cabinet Agbo';

insert into projects (titre, slug, client_id, pole, resume, contenu, statut, ordre)
select 'Outil de gestion Horizon', 'outil-gestion-horizon', id, 'dev', 'Outil de gestion interne sur mesure.', 'Projet de démonstration pour les tests locaux.', 'publie', 4
from clients where nom = 'Association Horizon';

insert into quote_requests (nom, email, telephone, pole, message, statut, note_interne, created_at) values
  ('Société Exemple SARL', 'contact@exemple.bj', '+229 00 00 00 00', 'dev', 'Bonjour, nous souhaitons un site vitrine de cinq pages avec un formulaire de contact et une page catalogue. Notre budget indicatif est de … et nous aimerions une mise en ligne avant la fin du trimestre.', 'nouveau', null, now() - interval '2 days'),
  ('Association Horizon', 'horizon@mail.bj', '+229 00 00 00 02', 'dev', 'Refonte du site et hébergement.', 'en_cours', null, now() - interval '5 days'),
  ('Cabinet Agbo', 'agbo@mail.bj', '+229 00 00 00 03', 'batiment', 'Plans d''exécution pour une villa duplex.', 'devis_envoye', null, now() - interval '9 days'),
  ('Boutique Fifa', 'fifa@mail.bj', '+229 00 00 00 04', 'dev', 'Boutique en ligne, paiement mobile.', 'devis_envoye', null, now() - interval '12 days'),
  ('EPI Construction', 'epi@mail.bj', '+229 00 00 00 05', 'batiment', 'Métrés et note technique.', 'archive', null, now() - interval '18 days');

insert into testimonials (client_id, auteur, fonction, note, citation, statut)
select id, 'Nom du client', 'Fonction, entreprise', 5, 'Avis de démonstration pour les tests locaux.', 'brouillon'
from clients where nom = 'Société Exemple SARL';

insert into posts (titre, slug, extrait, contenu, statut, auteur) values
  ('Combien coûte un site internet au Bénin ?', 'combien-coute-un-site-internet-au-benin', 'Nom de domaine, hébergement, conception, contenus et maintenance.', null, 'brouillon', 'Brandon MEDEHOU'),
  ('Site vitrine ou boutique en ligne : comment choisir', 'site-vitrine-ou-boutique-en-ligne-comment-choisir', 'Les questions à se poser avant de lancer un projet.', null, 'brouillon', 'Brandon MEDEHOU'),
  ('Cinq erreurs fréquentes sur les plans d''exécution', 'cinq-erreurs-frequentes-sur-les-plans-d-execution', 'Ce qui ralentit un chantier et comment l''éviter.', null, 'brouillon', 'Bennett MEDEHOU');

-- Les services (catalogue réel) sont déjà insérés par la migration 0001_init.sql.
