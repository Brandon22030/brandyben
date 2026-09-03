# BRANDYBEN — site vitrine + espace d'administration

Dossier de passation pour la mise en place du projet avec Claude Code.
Cible : **Next.js (App Router) + Supabase**, site public en français.

---

## 1. L'entreprise

BRANDYBEN est une entreprise individuelle fondée à Cotonou (Bénin) par **Brandon MEDEHOU** et **Bennett MEDEHOU**, frères jumeaux et **cofondateurs**. Le nom vient de la contraction de leurs deux prénoms.

Deux pôles d'activité :

| Pôle | Intitulé | Responsable |
|---|---|---|
| 01 | Développement web & informatique | Brandon MEDEHOU |
| 02 | Architecture, ingénierie & activités techniques | Bennett MEDEHOU — dessinateur projeteur bâtiment, technicien supérieur en génie civil |

Informations légales à afficher :

- Forme juridique : entreprise individuelle
- Numéro IFU : `0202212868410`
- Numéro RCCM : en cours d'attribution (à saisir depuis l'admin dès délivrance)
- Siège : Quartier Agontinkon, Îlot 1270, Parcelle D, 8ème arrondissement, Cotonou, Littoral, Bénin (von, derrière l'école Pigier)
- Téléphone : `+229 01 53 72 90 10`
- E-mail : `brandonmedehou2203@gmail.com`
- Horaires : lundi – samedi, 8 h – 18 h

Slogan retenu : **« Concevoir, coder, construire. »**

Aucun prix n'est affiché sur le site : tout passe par une demande de devis gratuite.

---

## 2. Contenu du dossier

```
handoff/
├── README.md                      ce fichier
├── CLAUDE.md                      instructions persistantes pour Claude Code
├── maquettes/
│   ├── Logo BRANDYBEN.dc.html         charte v4 : logo, construction, palette, typographies, règles
│   ├── Logo BRANDYBEN Pistes.dc.html  les trois pistes explorées, pour mémoire
│   ├── Écrans Site BRANDYBEN.dc.html  8 écrans du site public, complets
│   ├── Écrans Admin BRANDYBEN.dc.html 7 écrans du dashboard + schéma de données
│   └── Site BRANDYBEN.dc.html         version navigable d'un seul tenant
└── cahier-des-charges/
    └── BRANDYBEN_Cahier_des_charges_site_internet_v3.pdf
```

Les fichiers `.dc.html` s'ouvrent directement dans un navigateur. Ce sont des maquettes de référence visuelle, **pas** du code à réutiliser tel quel : Claude Code doit en lire les valeurs (couleurs, tailles, espacements, structure) et écrire des composants React propres.

---

## 3. Identité visuelle

> Version **v4**. Toute maquette montrant l'ancien signe (crochets + Y-bâtiment) est périmée.

**Logo (v4 — « l'arc de compas »)** — un pivot posé au sol, une portée tracée jusqu'au point haut : le geste par lequel toute construction commence. Deux pleins, un arc, rien d'autre.

Géométrie exacte, sur une grille de 120 × 120 :

```svg
<svg viewBox="0 0 120 120" fill="none">
  <path d="M100 96A70 70 0 0 0 30 26" stroke="#F2F4F8" stroke-width="10" stroke-linecap="round"/>
  <circle cx="30" cy="96" r="10" fill="#F2F4F8"/>  <!-- pivot -->
  <circle cx="30" cy="26" r="8"  fill="#FFB84D"/>  <!-- point haut -->
</svg>
```

Règles :

- Le trait s'épaissit quand le signe rétrécit, pour garder la même densité optique : `stroke-width` 10 au-dessus de 40 px, 11 entre 28 et 39 px, 12 entre 20 et 27 px, 14 en dessous. Le rayon du pivot suit `stroke-width`, celui du point haut vaut `0,82 × stroke-width`.
- Zone de sécurité : marge égale au diamètre du pivot sur les quatre côtés, mesurée depuis la boîte réelle du tracé.
- Taille minimale 16 px. Sous 16 px, marque seule, pivot et point haut monochromes.
- L'ambre `#FFB84D` est **réservé au point haut de la marque**. Il ne sert jamais de couleur d'interface : c'est ce qui rend le signe reconnaissable.
- Version monochrome pour l'impression une couleur et pour les fonds clairs : tout en `#07080B`.
- Interdits : rotation, déformation, affinement du trait, couleurs hors palette.

Le logotype écrit `BRANDYBEN` en capitales, Instrument Sans 700, `letter-spacing: -0.05em`, sans lettre colorée.

**Palette**

| Rôle | Hex |
|---|---|
| Encre (fond principal) | `#07080B` |
| Surface (cartes, sections) | `#0E1016` |
| Bleu signal (accent, pôle 01) | `#4F7CFF` |
| Ambre (accent, pôle 02) | `#FFB84D` |
| Blanc cassé (titres, texte) | `#F2F4F8` |
| Gris froid (texte secondaire) | `#8B93A7` |

**Typographies** — **Instrument Sans** pour tout : titres en 600/700 avec `letter-spacing: -0.04em`, courants en 400 avec interligne 1,65. **JetBrains Mono** 400/500 pour les surtitres, cotes, références de projet et chiffres techniques, toujours en capitales espacées de 0,2 em. Les deux depuis Google Fonts. (Bricolage Grotesque et Space Grotesk, utilisés jusqu'à la v3, sont abandonnés.)

**Vocabulaire visuel** — fond sombre, halos radiaux bleus flous, grille lumineuse discrète en fond de hero, cartes à bordure `rgba(255,255,255,0.10)` et rayon 18–22 px, boutons en pilule, navigation en pilule flottante collante, révélations au scroll (opacité + translation de 26 px).

---

## 4. Écrans

### Site public

| # | Écran | Route |
|---|---|---|
| 01 | Accueil | `/` |
| 02 | À propos | `/a-propos` |
| 03 | Services | `/services` |
| 04 | Réalisations | `/realisations` (+ `/realisations/[slug]`) |
| 05 | Témoignages | `/temoignages` |
| 06 | Blog | `/blog` + `/blog/[slug]` |
| 07 | Contact | `/contact` |
| 08 | Mentions légales | `/mentions-legales` |

### Espace d'administration

| # | Écran | Route |
|---|---|---|
| A1 | Connexion | `/admin/login` |
| A2 | Tableau de bord | `/admin` |
| A3 | Clients (liste) | `/admin/clients` |
| A4 | Fiche client | `/admin/clients/[id]` |
| A5 | Réalisations | `/admin/projets` |
| A6 | Demandes de devis | `/admin/demandes` |
| A7 | Paramètres | `/admin/parametres` |

Même gabarit que A5 pour `/admin/articles` et `/admin/temoignages`.

---

## 5. Ce qui manque encore

À fournir par les fondateurs avant la mise en ligne :

- captures d'écran des projets réalisés (pôle 01) et plans ou photos de chantier (pôle 02)
- logos des clients, avec autorisation de publication
- portraits de Brandon et Bennett
- avis clients réels (une à trois phrases, nom, structure)
- nom et coordonnées de l'hébergeur, pour les mentions légales
- numéro RCCM dès délivrance
- adresses e-mail professionnelles pour les deux comptes admin

Les maquettes marquent ces manques par des emplacements en pointillés.

## 6. Rappel calendaire

Casier judiciaire à déposer au tribunal **avant le 01-11-2026**. Un encart de rappel est prévu sur le tableau de bord admin.
