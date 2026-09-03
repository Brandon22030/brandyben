# CLAUDE.md — BRANDYBEN

Instructions persistantes pour le développement du site BRANDYBEN.
Lire `README.md` pour le contexte entreprise et la liste des écrans.

---

## Stack imposée

- **Next.js 15+, App Router, TypeScript**
- **Tailwind CSS** avec les tokens définis plus bas
- **Supabase** : Postgres, Auth, Storage, RLS
- Déploiement Vercel, base Supabase hébergée
- Pas de bibliothèque de composants lourde. `lucide-react` pour les icônes, `next/image` pour les images, rien d'autre sans nécessité.

Site public en **français**, ton sobre et factuel. Ne jamais réécrire les textes fournis dans les maquettes ou le cahier des charges.

---

## Design tokens

Déclarer dans `tailwind.config.ts` :

```ts
colors: {
  ink:      '#07080B',   // fond principal
  surface:  '#0E1016',   // cartes, sections
  signal:   '#4F7CFF',   // accent, pôle 01 (développement)
  amber:    '#FFB84D',   // accent, pôle 02 (bâtiment)
  bone:     '#F2F4F8',   // titres, texte principal
  cool:     '#8B93A7',   // texte secondaire
}
fontFamily: {
  sans: ['Instrument Sans', 'sans-serif'],  // titres 600/700 letter-spacing -0.04em, courants 400
  mono: ['JetBrains Mono', 'monospace'],    // surtitres, cotes, chiffres techniques
}
```

Conventions visuelles constantes :

- bordures : `border border-white/10`
- fonds de carte : `bg-white/[0.028]`
- rayons : 10 px sur les champs, 18–22 px sur les cartes, `rounded-full` sur les boutons
- boutons primaires : `bg-signal text-white shadow-[0_12px_36px_rgba(79,124,255,0.3)]`
- halos : `radial-gradient` bleu flouté, `pointer-events-none`, en `absolute` derrière le contenu
- animation d'apparition : opacité 0 → 1 + `translateY(26px)` → 0, `cubic-bezier(.2,.7,.3,1)`, 700 ms, déclenchée par IntersectionObserver

Fidélité aux maquettes : lire les valeurs dans les fichiers `.dc.html` de `maquettes/` plutôt que d'improviser. Ne pas introduire de couleur, de police ou de rayon absents de cette liste.

---

## Schéma Supabase

```sql
clients        (id, nom, secteur, ville, contact, email, telephone,
                site, logo_url, visible_sur_site, notes_internes, created_at)

projects       (id, titre, slug, client_id → clients, pole,
                resume, contenu, images[], lien, statut, ordre, created_at)

quote_requests (id, nom, email, telephone, pole, message,
                statut, note_interne, created_at)

testimonials   (id, client_id → clients, auteur, fonction,
                note, citation, photo_url, statut, created_at)

posts          (id, titre, slug, extrait, contenu, couverture,
                statut, published_at, auteur, created_at)

services       (id, pole, titre, description, benefice, ordre)

settings       (id, rccm, ifu, adresse, telephone, email,
                horaires, hebergeur, reseaux jsonb)
```

- `pole` : enum `'dev' | 'batiment'`
- `statut` sur `projects`, `posts`, `testimonials` : enum `'brouillon' | 'publie'`
- `statut` sur `quote_requests` : enum `'nouveau' | 'en_cours' | 'devis_envoye' | 'gagne' | 'perdu' | 'archive'`
- `settings` est une table à ligne unique.

Écrire les migrations dans `supabase/migrations/`, avec des données de démonstration en seed séparé.

---

## Sécurité et accès

- **RLS activée sur toutes les tables**, sans exception.
- Lecture publique (rôle `anon`) : uniquement les lignes `statut = 'publie'` de `projects`, `posts`, `testimonials`, plus `services`, `settings` et les `clients` avec `visible_sur_site = true`.
- `quote_requests` : insertion autorisée à `anon`, lecture et modification réservées aux comptes authentifiés. Aucune lecture publique.
- Écriture : réservée aux utilisateurs authentifiés (les deux comptes fondateurs).
- Auth par e-mail et mot de passe via Supabase Auth. Pas d'inscription publique : les deux comptes sont créés à la main.
- Middleware Next.js protégeant `/admin/*`, redirection vers `/admin/login`.
- Ne jamais exposer la clé `service_role` côté client. Variables : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, et `SUPABASE_SERVICE_ROLE_KEY` côté serveur uniquement.

---

## Architecture

- Site public en **Server Components**, données lues directement depuis Supabase avec revalidation. Aucun appel client inutile.
- Formulaire de contact en **Server Action** : validation Zod, insertion dans `quote_requests`, notification e-mail (Resend), anti-spam simple (champ leurre + limitation par IP). Pas de captcha tiers.
- Images et logos dans **Supabase Storage** : buckets publics `logos` et `projects`, servis via `next/image`.
- Admin en Client Components là où l'interactivité l'exige, Server Actions pour toutes les mutations.
- Un seul jeu de tokens partagé entre le site et l'admin. L'admin reprend exactement le même langage visuel sombre.

---

## SEO et performances

- Métadonnées par page via l'API `metadata`, Open Graph, `sitemap.ts`, `robots.ts`.
- JSON-LD `LocalBusiness` sur l'accueil, avec adresse, téléphone et horaires lus depuis `settings`.
- Slugs en français, sans accent : `/realisations/nom-du-projet`.
- Objectif Lighthouse : 90+ partout. Polices en `next/font`, images en AVIF/WebP, pas de JS superflu.
- Mobile d'abord : le site doit être irréprochable sur téléphone en connexion lente. Bouton d'appel direct fixe en bas d'écran sur mobile.
- Cibles de contraste WCAG AA respectées : ne pas descendre le texte secondaire en dessous de `#8B93A7` sur fond `#07080B`.

---

## Règles de contenu

- Ne pas afficher de prix. Tout renvoie vers la demande de devis.
- Ne pas inventer de projets, de clients, de témoignages ni de chiffres. Les emplacements restent visibles jusqu'à réception des vrais contenus.
- Le numéro RCCM affiché dans les mentions légales est lu depuis `settings`, jamais codé en dur.
- Toujours écrire « cofondateurs » au pluriel : Brandon et Bennett sont sur un pied d'égalité. Ne jamais désigner Brandon seul comme promoteur.
- Pas d'emoji dans l'interface.

---

## Ordre de mise en place suggéré

1. Initialisation Next.js + Tailwind + tokens + polices, layout et pied de page
2. Projet Supabase, migrations, RLS, seed de démonstration
3. Pages publiques statiques : accueil, à propos, services, mentions légales
4. Pages publiques dynamiques : réalisations, témoignages, blog
5. Formulaire de contact avec Server Action et notification e-mail
6. Auth + middleware + coquille de l'admin
7. CRUD admin : clients, projets, demandes, témoignages, articles, paramètres
8. SEO, sitemap, JSON-LD, audit Lighthouse et accessibilité


## Logo

Le composant `<Logo />` porte la géométrie exacte de la charte v4 (arc de compas). Ne pas la redessiner :

```tsx
export function Logo({ size = 32, mono = false }: { size?: number; mono?: boolean }) {
  const sw = size >= 40 ? 10 : size >= 28 ? 11 : size >= 20 ? 12 : 14;
  const ink = mono ? 'currentColor' : '#F2F4F8';
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-label="BRANDYBEN">
      <path d="M100 96A70 70 0 0 0 30 26" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="30" cy="96" r={sw} fill={ink} />
      <circle cx="30" cy="26" r={Math.round(sw * 0.82)} fill={mono ? 'currentColor' : '#FFB84D'} />
    </svg>
  );
}
```

Ambre `#FFB84D` réservé au point haut de la marque : jamais en couleur d'interface. Marge de sécurité égale au diamètre du pivot. Taille minimale 16 px. Ni rotation, ni déformation, ni trait affiné.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
