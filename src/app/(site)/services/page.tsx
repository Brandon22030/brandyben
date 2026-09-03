import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import type { Pole } from "@/lib/supabase/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Chaque prestation fait l'objet d'un devis détaillé et gratuit, établi après un premier échange sur votre besoin.",
};

function PoleBlock({
  eyebrow,
  eyebrowColor,
  title,
  services,
  benefitColor,
  hoverBorder,
  hoverBg,
  ctaHover,
}: {
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  services: { id: string; titre: string; description: string | null; benefice: string | null }[];
  benefitColor: string;
  hoverBorder: string;
  hoverBg: string;
  ctaHover: string;
}) {
  if (services.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline gap-[14px] border-b border-white/10 pb-[18px]">
        <p className={`text-[11.5px] uppercase tracking-[0.2em] ${eyebrowColor}`}>{eyebrow}</p>
        <h2 className="text-[clamp(22px,2.8vw,30px)] font-bold tracking-[-0.035em] text-bone">
          {title}
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal
            key={service.id}
            delay={i * 70}
            className={`flex h-full flex-col gap-[15px] rounded-[20px] border border-white/10 bg-white/[0.028] p-[clamp(26px,3vw,34px)] transition-colors ${hoverBorder}`}
          >
            <p className="text-[21px] font-bold tracking-[-0.03em] text-bone">{service.titre}</p>
            {service.description && (
              <p className="text-[15px] leading-[1.65] text-[#8B93A7]">{service.description}</p>
            )}
            {service.benefice && (
              <p
                className={`mt-auto border-t border-white/[0.09] pt-[15px] text-[14px] leading-[1.6] ${benefitColor}`}
              >
                {service.benefice}
              </p>
            )}
            <Link
              href="/contact"
              className={`rounded-full border border-white/[0.16] px-[18px] py-3 text-center text-[14px] font-semibold text-bone transition-colors ${ctaHover}`}
            >
              Demander un devis
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").order("ordre");

  const byPole = (pole: Pole) => (services ?? []).filter((s) => s.pole === pole);

  return (
    <div className="box-content mx-auto flex max-w-[1240px] flex-col gap-[clamp(40px,5vw,72px)] px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <Reveal className="flex max-w-[720px] flex-col gap-4">
        <p className="text-[11.5px] uppercase tracking-[0.24em] text-[#5A6072]">Services</p>
        <h1 className="text-[clamp(34px,6vw,64px)] font-bold leading-none tracking-[-0.05em] text-bone">
          Nos prestations
        </h1>
        <p className="text-[17px] leading-[1.7] text-[#9AA2B4]">
          Chaque prestation fait l&apos;objet d&apos;un devis détaillé et gratuit, établi après
          un premier échange sur votre besoin.
        </p>
      </Reveal>

      <PoleBlock
        eyebrow="Pôle 01"
        eyebrowColor="text-signal"
        title="Développement web & informatique"
        services={byPole("dev")}
        benefitColor="text-[#9CB4FF]"
        hoverBorder="hover:border-signal/50 hover:bg-signal/5"
        hoverBg=""
        ctaHover="hover:bg-signal hover:border-signal hover:text-white"
      />

      <PoleBlock
        eyebrow="Pôle 02"
        eyebrowColor="text-amber"
        title="Architecture, ingénierie & activités techniques"
        services={byPole("batiment")}
        benefitColor="text-[#FFCF8A]"
        hoverBorder="hover:border-amber/50 hover:bg-amber/5"
        hoverBg=""
        ctaHover="hover:bg-amber hover:border-amber hover:text-ink"
      />
    </div>
  );
}
