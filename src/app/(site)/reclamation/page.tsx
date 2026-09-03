import type { Metadata } from "next";
import Link from "next/link";
import { HairlineGrid, HairlineCell } from "@/components/hairline-grid";
import { getSettings } from "@/lib/settings";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Réclamation",
  description: "Comment signaler un problème ou une insatisfaction à BRANDYBEN.",
};

export default async function ReclamationPage() {
  const settings = await getSettings();
  const telephone = settings?.telephone ?? "+229 01 53 72 90 10";
  const email = settings?.email ?? "brandonmedehou2203@gmail.com";

  const etapes = [
    {
      k: "1. Contactez-nous directement",
      v: `Décrivez le problème rencontré par e-mail (${email}) ou par téléphone (${telephone}), en précisant la date de votre demande initiale ou de la prestation concernée.`,
    },
    {
      k: "2. Nous accusons réception",
      v: "Un cofondateur vous répond sous 3 jours ouvrés pour confirmer la prise en compte de votre réclamation.",
    },
    {
      k: "3. Nous traitons votre demande",
      v: "Une réponse de fond ou une proposition de solution vous est apportée sous 10 jours ouvrés, selon la nature du problème.",
    },
    {
      k: "4. En cas de désaccord persistant",
      v: "À défaut de solution amiable, le litige relève des tribunaux de Cotonou, conformément aux Conditions générales d'utilisation.",
    },
  ];

  return (
    <div className="box-content mx-auto flex max-w-[820px] flex-col gap-9 px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <div className="flex flex-col gap-3">
        <h1 className="text-[clamp(30px,5vw,52px)] font-bold tracking-[-0.05em] text-bone">
          Réclamation
        </h1>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Un devis mal expliqué, un délai non tenu, une prestation qui ne correspond pas à ce qui
          était convenu : dites-le-nous. Voici comment procède BRANDYBEN pour traiter une
          réclamation.
        </p>
      </div>

      <HairlineGrid className="grid-cols-1">
        {etapes.map((etape) => (
          <HairlineCell key={etape.k} className="flex flex-col gap-2 px-[22px] py-5">
            <p className="text-[15px] font-semibold text-bone">{etape.k}</p>
            <p className="text-[14.5px] leading-[1.65] text-[#8B93A7]">{etape.v}</p>
          </HairlineCell>
        ))}
      </HairlineGrid>

      <p className="text-[14px] leading-[1.6] text-[#6B7183]">
        Vous pouvez aussi utiliser le{" "}
        <Link href="/contact" className="text-signal">
          formulaire de contact
        </Link>{" "}
        en précisant qu&apos;il s&apos;agit d&apos;une réclamation.
      </p>
    </div>
  );
}
