# Handoff : Produits digitaux (BRANDYBEN)

## Aperçu
Page vitrine des produits digitaux (e-books, modèles) sur brandyben.com, plus l'écran admin pour gérer le catalogue. Chaque produit renvoie vers sa page de vente Chariow existante pour le paiement et la livraison — le site ne gère pas le paiement.

## À propos des fichiers
Le fichier HTML de ce dossier est une **référence de design** (prototype), pas du code à copier tel quel. La tâche consiste à recréer ce design dans l'environnement du projet cible (framework déjà en place, ou celui qui convient le mieux s'il n'y en a pas encore), en respectant ses conventions existantes.

## Fidélité
**Haute fidélité (hifi)** : couleurs, typographie, espacements et contenus sont définitifs. Reproduire pixel pour pixel avec les composants/le système de design déjà en place dans le codebase cible.

## Écrans

### 1. Boutique — `/produits`
- Fond sombre `#07080B` / `#101216`, texte `#F2F4F8`, police Instrument Sans (titres) + JetBrains Mono (labels techniques, si utilisés ailleurs sur le site).
- Header : nav pill translucide (`rgba(14,16,22,0.72)`, `border-radius:999px`) avec logo (arc de compas SVG, bleu `#4F7CFF` en bas, ambre `#FFB84D` en haut), items de nav, CTA "Demander un devis".
- Hero : bandeau "Boutique - téléchargement immédiat" (ambre), titre 64px/700, sous-texte gris `#9AA2B4`.
- Bloc produit vedette : grille `420px 1fr`, image à gauche (placeholder), à droite titre, description, badges, prix barré + prix promo, CTA **"Acheter sur Chariow ↗"** (fond `#4F7CFF`), mention "Paiement et téléchargement gérés sur Chariow".
- Catalogue : grille de cards 3 colonnes. Chaque card = image produit (venant de l'admin), tag, titre, description, prix, CTA "Acheter sur Chariow ↗" — **lien externe vers l'URL Chariow du produit**, pas de fiche produit interne.
- Bandeau bas : rappel que chaque fiche renvoie vers `brandyben.mychariow.shop`.

### 2. Admin — Produits — `/admin/produits`
- Layout dashboard standard (sidebar 236px + contenu), cohérent avec le reste de l'admin BRANDYBEN.
- Liste des produits (tableau : titre, prix, statut Publié/Brouillon, lien Éditer).
- Panneau d'édition d'une fiche produit :
  - **Champ image** (upload/drag-drop) — c'est l'image affichée sur la card du catalogue public.
  - Titre du produit
  - Type (ex. "E-book PDF")
  - Prix (FCFA)
  - Description courte
  - **Lien Chariow** (URL complète de la page produit sur mychariow.shop)
  - Toggle "Visible sur /produits"
  - Bouton "Enregistrer et publier"

## Interactions
- Card produit et CTA vedette : lien externe (`target="_blank"`) vers l'URL Chariow renseignée dans l'admin. Pas de logique de paiement côté site.
- Admin : upload d'image → stockage (bucket/CDN au choix de l'implémentation), champs simples liés à une table `products` (title, type, price, description, image_url, chariow_url, published).

## Design tokens
- Couleurs : fond `#07080B`/`#101216`, texte `#F2F4F8`, texte secondaire `#9AA2B4`/`#8B93A7`, bleu `#4F7CFF`, ambre `#FFB84D`, bordures `rgba(255,255,255,0.10-0.16)`.
- Typographie : Instrument Sans 700 (titres), Instrument Sans 400-600 (corps), JetBrains Mono (labels techniques).
- Rayons : 14-22px sur cards/containers, 999px sur pills/boutons.

## Assets
Logo BRANDYBEN en SVG inline (arc de compas, voir le fichier). Images produits : placeholders à remplacer par les vraies couvertures.

## Fichiers
- `Écrans Produits BRANDYBEN.dc.html` — les deux écrans (boutique + admin), à côté des autres écrans du site (`Écrans Site BRANDYBEN.dc.html`, `Écrans Admin BRANDYBEN.dc.html`) pour le contexte visuel global.
