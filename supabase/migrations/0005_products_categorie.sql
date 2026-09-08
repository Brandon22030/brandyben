-- Remplace le champ libre "type" des produits par une vraie catégorie
-- (même logique pôle que le reste du site : dev / bâtiment), qui pilote
-- les filtres de la page /produits.

alter table products add column categorie pole;
update products set categorie = 'dev';
alter table products alter column categorie set not null;
alter table products drop column type;
