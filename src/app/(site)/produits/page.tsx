import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ProductsCatalog } from "@/components/products-catalog";
import { createClient } from "@/lib/supabase/server";
import { formatFcfa } from "@/lib/format";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Produits digitaux",
  description:
    "Guides et modèles téléchargeables, payables par Mobile Money et livrés par e-mail en quelques secondes.",
};

export default async function ProduitsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("statut", "publie")
    .order("ordre");

  const all = products ?? [];
  const featured = all[0];
  const catalogue = all;

  return (
    <div>
      {/* Hero */}
      <section className="relative px-5 pt-11 sm:px-[clamp(20px,4vw,40px)]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-100px] top-[-200px] -z-10 h-[520px] w-[760px] max-w-none rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,184,77,0.18),transparent_62%)] blur-[30px]"
        />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="flex max-w-[820px] flex-col gap-4">
            <Reveal className="flex">
              <span className="inline-flex items-center gap-[9px] rounded-full border border-amber/[0.35] bg-amber/[0.09] px-[15px] py-[7px] text-[11.5px] uppercase tracking-[0.12em] text-[#FFCF8A]">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                Boutique · téléchargement immédiat
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[clamp(34px,6vw,64px)] font-bold leading-[0.98] tracking-[-0.05em] text-bone">
                Produits digitaux
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="max-w-[60ch] text-[18px] leading-[1.65] text-[#9AA2B4]">
                Des ressources digitales pensées par les cofondateurs de BRANDYBEN - développement
                web et architecture, bâtiment - pour construire des projets solides et gagner du
                temps. Guides et modèles téléchargeables, payables par Mobile Money et livrés par
                e-mail en quelques secondes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Produit vedette */}
      {featured && (
        <section className="px-5 pt-9 sm:px-[clamp(20px,4vw,40px)]">
          <Reveal
            delay={100}
            className="mx-auto grid max-w-[1240px] grid-cols-1 gap-9 rounded-[22px] border border-white/[0.11] bg-[linear-gradient(140deg,rgba(79,124,255,0.14),rgba(255,184,77,0.06)_65%,rgba(255,255,255,0.02))] p-8 md:grid-cols-[420px_1fr] md:p-8"
          >
            <div className="relative flex h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/[0.18] bg-[#0B0D13] p-5 text-center text-[13px] text-[#5A6072] md:h-full">
              {featured.image_url ? (
                <Image
                  src={featured.image_url}
                  alt={featured.titre}
                  fill
                  className="object-cover"
                />
              ) : (
                <span>
                  Visuel de couverture
                  <br />
                  du produit vedette
                </span>
              )}
            </div>
            <div className="flex flex-col gap-[14px]">
              <p className="text-[11.5px] uppercase tracking-[0.2em] text-amber">Le plus vendu</p>
              <h2 className="text-[28px] font-bold leading-[1.08] tracking-[-0.04em] text-bone md:text-[34px]">
                {featured.titre}
              </h2>
              {featured.description && (
                <p className="text-[15.5px] leading-[1.7] text-[#B4BCCC]">
                  {featured.description}
                </p>
              )}
              {featured.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {featured.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/[0.14] px-[13px] py-[6px] text-[12.5px] text-[#C3C9D6]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-[18px] border-t border-white/10 pt-[18px]">
                <div className="flex items-baseline gap-[10px] whitespace-nowrap">
                  <p className="text-[36px] font-bold tracking-[-0.04em] text-bone">
                    {formatFcfa(featured.prix)}
                  </p>
                  {featured.prix_avant_promo && (
                    <p className="text-[16px] text-[#6B7183] line-through">
                      {formatFcfa(featured.prix_avant_promo)}
                    </p>
                  )}
                </div>
                {featured.chariow_url ? (
                  <a
                    href={featured.chariow_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap rounded-full bg-signal px-7 py-[14px] text-[15px] font-semibold text-white shadow-[0_12px_40px_rgba(79,124,255,0.35)]"
                  >
                    Acheter sur Chariow ↗
                  </a>
                ) : (
                  <span className="whitespace-nowrap text-[13px] text-[#8B93A7]">
                    Bientôt disponible
                  </span>
                )}
                <p className="whitespace-nowrap text-[13px] text-[#8B93A7]">
                  Paiement et téléchargement gérés sur Chariow
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Catalogue */}
      <section className="px-5 py-11 sm:px-[clamp(20px,4vw,40px)]">
        <div className="mx-auto max-w-[1240px]">
          <ProductsCatalog products={catalogue} />

          <Reveal
            delay={80}
            className="mt-11 flex flex-col items-start justify-between gap-4 rounded-[18px] border border-white/10 bg-white/[0.028] p-7 sm:flex-row sm:items-center"
          >
            <p className="text-[15px] text-[#B4BCCC]">
              Chaque fiche renvoie vers la page de vente Chariow correspondante
            </p>
            <a
              href="https://brandyben.mychariow.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-[13px] font-semibold text-[#9CB4FF]"
            >
              brandyben.mychariow.shop ↗
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
