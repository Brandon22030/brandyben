import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { GridBackdrop } from "@/components/grid-backdrop";
import { HairlineGrid, HairlineCell } from "@/components/hairline-grid";
import { MethodSection } from "@/components/method-section";
import { createClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/settings";

export const revalidate = 300;

const STATS = [
  { value: "02", label: "Pôles d'activité sous une même structure" },
  { value: "24 h", label: "Délai de réponse à une demande de devis" },
  { value: "100 %", label: "Projets suivis par un fondateur, sans intermédiaire" },
  { value: "Cotonou", label: "Sur place et à distance dans la sous-région" },
];

const ATOUTS = [
  {
    num: "01",
    title: "Réactivité",
    desc: "Réponse sous 24 h ouvrées et un interlocuteur unique du devis à la mise en ligne.",
  },
  {
    num: "02",
    title: "Proximité",
    desc: "Basés à Cotonou, nous nous déplaçons chez vous et travaillons aussi à distance.",
  },
  {
    num: "03",
    title: "Tarifs adaptés",
    desc: "Des budgets calibrés pour les TPE, associations et indépendants, devis détaillé avant démarrage.",
  },
  {
    num: "04",
    title: "Deux métiers",
    desc: "Numérique et bâti dans la même structure : un seul contact pour deux types de besoins.",
  },
];


export default async function HomePage() {
  const supabase = await createClient();
  const settings = await getSettings();

  const { data: clients } = await supabase
    .from("clients")
    .select("nom")
    .eq("visible_sur_site", true)
    .order("nom");

  const { data: etapesMethode } = await supabase
    .from("etapes_methode")
    .select("id, pole, titre, description, duree")
    .order("ordre");

  const telephone = settings?.telephone ?? "+229 01 53 72 90 10";
  const email = settings?.email ?? "brandonmedehou2203@gmail.com";
  const marqueeClients = clients && clients.length > 0 ? [...clients, ...clients] : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BRANDYBEN",
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quartier Agontinkon, Îlot 1270, Parcelle D, 8ème arrondissement",
      addressLocality: "Cotonou",
      addressRegion: "Littoral",
      addressCountry: "BJ",
    },
    ...(settings?.horaires === "Lundi – samedi, 8 h – 18 h"
      ? { openingHours: "Mo-Sa 08:00-18:00" }
      : {}),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-[clamp(48px,7vw,110px)] pb-[clamp(60px,8vw,120px)] sm:px-[clamp(20px,4vw,40px)]">
        <GridBackdrop
          size={64}
          opacity={0.028}
          mask="radial-gradient(ellipse 80% 60% at 50% 20%, #000, transparent)"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-160px] -z-10 h-[420px] w-[1100px] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(79,124,255,0.26),transparent_60%)] blur-[30px] sm:h-[760px] sm:top-[-320px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-140px] top-[220px] -z-10 hidden h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,184,77,0.14),transparent_62%)] blur-[30px] lg:block"
        />

        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-[clamp(36px,5vw,64px)]">
          <div className="flex flex-col items-center gap-[26px] text-center">
            <Reveal className="flex justify-center">
              <span className="inline-flex items-center gap-[10px] rounded-full border border-white/[0.12] bg-white/[0.035] px-4 py-2 text-[12px] uppercase tracking-[0.12em] text-[#A8B0C2]">
                <span className="h-1.5 w-1.5 animate-bb-pulse rounded-full bg-signal" />
                Studio technique · Cotonou, Bénin
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="max-w-[16ch] text-[clamp(42px,8.2vw,104px)] font-bold leading-[0.94] tracking-[-0.055em] text-bone">
                Concevoir, coder,
                <br />
                <span className="bg-[linear-gradient(100deg,#4F7CFF_0%,#9CB4FF_40%,#FFB84D_100%)] bg-clip-text text-transparent">
                  construire.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="max-w-[60ch] text-[clamp(16px,1.8vw,20px)] leading-[1.6] text-[#9AA2B4]">
                BRANDYBEN est le studio de deux frères jumeaux. Nous développons des sites, des
                logiciels et des applications sur mesure, et nous concevons les plans et études
                techniques de vos projets de construction.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-signal px-[30px] py-[15px] text-[15px] font-semibold text-white shadow-[0_12px_40px_rgba(79,124,255,0.35)] transition-colors hover:bg-[#3D6BFF]"
                >
                  Démarrer un projet
                </Link>
                <Link
                  href="/realisations"
                  className="rounded-full border border-white/[0.16] px-[30px] py-[15px] text-[15px] font-semibold text-bone transition-colors hover:border-white/45 hover:bg-white/[0.04]"
                >
                  Voir nos réalisations
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={260}>
            <div className="animate-bb-float rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012))] p-3.5">
              <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#0B0D13]">
                <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3A3F4D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3A3F4D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3A3F4D]" />
                  <span className="ml-3 text-[12px] text-[#5A6072]">brandyben.com</span>
                </div>
                <div className="flex aspect-[16/7] items-center justify-center bg-[radial-gradient(ellipse_at_50%_0%,rgba(79,124,255,0.10),transparent_65%)] px-6 text-center text-[14px] text-[#5A6072]">
                  Emplacement — capture d&apos;un projet réalisé
                  <br />
                  <span className="text-[12.5px]">(remplacez par une image de votre portfolio)</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <HairlineGrid className="grid-cols-2 md:grid-cols-4" rounded="18px">
              {STATS.map((stat) => (
                <HairlineCell key={stat.label} className="flex flex-col gap-[7px] px-6 py-7">
                  <p className="text-[clamp(28px,3.4vw,38px)] font-bold leading-none tracking-[-0.04em] text-bone">
                    {stat.value}
                  </p>
                  <p className="text-[13.5px] leading-[1.45] text-[#8B93A7]">{stat.label}</p>
                </HairlineCell>
              ))}
            </HairlineGrid>
          </Reveal>
        </div>
      </section>

      {/* Ils nous font confiance */}
      {marqueeClients.length > 0 && (
        <section className="overflow-hidden pb-[clamp(56px,7vw,96px)]">
          <p className="box-content mx-auto max-w-[1240px] px-5 pb-[22px] text-[11.5px] uppercase tracking-[0.24em] text-[#5A6072] sm:px-[clamp(20px,4vw,40px)]">
            Ils nous font confiance
          </p>
          <div className="overflow-hidden border-y border-white/[0.08] py-[26px] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="flex w-max animate-bb-marquee gap-14">
              {marqueeClients.map((c, i) => (
                <span
                  key={`${c.nom}-${i}`}
                  className="whitespace-nowrap text-[20px] font-bold tracking-[-0.03em] text-[#3E4453]"
                >
                  {c.nom}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deux pôles */}
      <section className="px-5 pb-[clamp(56px,7vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-[clamp(28px,4vw,48px)]">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <Reveal>
              <h2 className="text-[clamp(30px,4.6vw,54px)] font-bold leading-[1.02] tracking-[-0.045em] text-bone">
                Deux pôles,
                <br />
                une seule équipe
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-[17px] leading-[1.7] text-[#9AA2B4]">
                Le nom réunit Brandon et Bennett. L&apos;entreprise réunit leurs deux métiers : le
                développement informatique et l&apos;ingénierie du bâtiment. Un seul interlocuteur,
                deux compétences complémentaires.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <Link
                href="/services"
                className="flex h-full min-h-[280px] flex-col gap-4 rounded-[22px] border border-white/10 bg-[linear-gradient(160deg,rgba(79,124,255,0.13),rgba(255,255,255,0.02)_55%)] p-[clamp(28px,3.4vw,42px)] transition-colors hover:border-signal/55"
              >
                <div className="flex items-center gap-[10px] text-[11.5px] uppercase tracking-[0.2em] text-signal">
                  <span className="h-[5px] w-[5px] rounded-full bg-signal" />
                  Pôle 01
                </div>
                <h3 className="text-[clamp(24px,2.8vw,32px)] font-bold leading-[1.1] tracking-[-0.035em] text-bone">
                  Développement web &amp; informatique
                </h3>
                <p className="text-[16px] leading-[1.65] text-[#9AA2B4]">
                  Sites vitrine et boutiques en ligne, logiciels métier, applications, refonte,
                  maintenance et conseil digital.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {["Sites vitrine", "E-commerce", "Logiciels métier", "Applications"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.13] px-[13px] py-[6px] text-[12.5px] text-[#C3C9D6]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>

            <Reveal delay={80}>
              <Link
                href="/services"
                className="flex h-full min-h-[280px] flex-col gap-4 rounded-[22px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,184,77,0.12),rgba(255,255,255,0.02)_55%)] p-[clamp(28px,3.4vw,42px)] transition-colors hover:border-amber/50"
              >
                <div className="flex items-center gap-[10px] text-[11.5px] uppercase tracking-[0.2em] text-amber">
                  <span className="h-[5px] w-[5px] rounded-full bg-amber" />
                  Pôle 02
                </div>
                <h3 className="text-[clamp(24px,2.8vw,32px)] font-bold leading-[1.1] tracking-[-0.035em] text-bone">
                  Architecture, ingénierie &amp; technique
                </h3>
                <p className="text-[16px] leading-[1.65] text-[#9AA2B4]">
                  Dessin de projet bâtiment, plans d&apos;exécution, études de génie civil et
                  assistance au suivi de chantier.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {["Plans d'exécution", "Dessin de projet", "Métrés", "Suivi de chantier"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.13] px-[13px] py-[6px] text-[12.5px] text-[#C3C9D6]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <HairlineGrid className="grid-cols-2 lg:grid-cols-4" rounded="20px">
              {ATOUTS.map((atout) => (
                <HairlineCell
                  key={atout.num}
                  className="flex flex-col gap-[11px] px-7 py-8 transition-colors hover:bg-[#0E1016]"
                >
                  <p className="text-[12px] tabular-nums text-signal">{atout.num}</p>
                  <p className="text-[19px] font-bold tracking-[-0.025em] text-bone">
                    {atout.title}
                  </p>
                  <p className="text-[14.5px] leading-[1.6] text-[#8B93A7]">{atout.desc}</p>
                </HairlineCell>
              ))}
            </HairlineGrid>
          </Reveal>
        </div>
      </section>

      {/* Méthode */}
      <section className="px-5 pb-[clamp(56px,7vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
        <div className="mx-auto max-w-[1240px]">
          <MethodSection etapes={etapesMethode ?? []} />
        </div>
      </section>

      {/* CTA final */}
      <section className="px-5 pb-[clamp(64px,8vw,120px)] sm:px-[clamp(20px,4vw,40px)]">
        <Reveal
          className="box-content relative mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[26px] border border-white/[0.11] bg-[linear-gradient(140deg,rgba(79,124,255,0.16),rgba(255,184,77,0.07)_70%,rgba(255,255,255,0.02))] p-[clamp(36px,5.5vw,76px)]"
        >
          <GridBackdrop size={44} />
          <div className="relative flex flex-col gap-3">
            <p className="text-[clamp(28px,4vw,46px)] font-bold leading-[1.04] tracking-[-0.045em] text-bone">
              Un projet en tête ?
              <br />
              Le premier échange est gratuit.
            </p>
            <p className="text-[16px] text-[#B4BCCC]">
              {telephone} · {email}
            </p>
          </div>
          <Link
            href="/contact"
            className="relative shrink-0 whitespace-nowrap rounded-full bg-bone px-8 py-4 text-[15px] font-semibold text-ink transition-colors hover:bg-signal hover:text-white"
          >
            Nous écrire
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
