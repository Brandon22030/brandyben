import type { Metadata } from "next";
import { HairlineGrid, HairlineCell } from "@/components/hairline-grid";
import { getSettings } from "@/lib/settings";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de BRANDYBEN, entreprise individuelle basée à Cotonou, Bénin.",
};

export default async function MentionsLegalesPage() {
  const settings = await getSettings();

  const legal = [
    { k: "Nom commercial", v: "BRANDYBEN" },
    { k: "Cofondateurs", v: "Brandon MEDEHOU et Bennett MEDEHOU" },
    { k: "Directeur de la publication", v: "Brandon MEDEHOU" },
    { k: "Forme juridique", v: "Entreprise individuelle" },
    { k: "Numéro IFU", v: settings?.ifu ?? "0202212868410" },
    { k: "Numéro RCCM", v: settings?.rccm || "[à compléter dès délivrance]" },
    {
      k: "Adresse",
      v:
        settings?.adresse ||
        "Quartier Agontinkon, Îlot 1270, Parcelle D, 8ème arrondissement, Cotonou, Littoral, Bénin",
    },
    { k: "Téléphone", v: settings?.telephone ?? "+229 01 53 72 90 10" },
    { k: "E-mail", v: settings?.email ?? "brandonmedehou2203@gmail.com" },
    {
      k: "Activité",
      v: "Développement informatique, développement de sites web, autres activités liées au numérique, activités d'architecture, d'ingénierie et autres activités techniques",
    },
  ];

  const hebergeur =
    settings?.hebergeur ||
    "[nom de l'hébergeur, adresse et contact à compléter selon le prestataire retenu]";

  return (
    <div className="box-content mx-auto flex max-w-[820px] flex-col gap-9 px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <h1 className="text-[clamp(30px,5vw,52px)] font-bold tracking-[-0.05em] text-bone">
        Mentions légales
      </h1>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Éditeur du site</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Le présent site est édité par BRANDYBEN, entreprise individuelle
          {settings?.rccm
            ? ` immatriculée au Registre du Commerce et du Crédit Mobilier de Cotonou sous le numéro ${settings.rccm}`
            : " en cours d'immatriculation au Registre du Commerce et du Crédit Mobilier"}
          , dont le siège est situé Quartier Agontinkon, Îlot 1270, Parcelle D, 8ème
          arrondissement, Cotonou, Bénin.
        </p>
      </div>

      <HairlineGrid className="grid-cols-1">
        {legal.map((item) => (
          <HairlineCell key={item.k} className="flex flex-wrap gap-5 px-[22px] py-4">
            <span className="min-w-[210px] text-[13.5px] text-[#6B7183]">{item.k}</span>
            <span className="min-w-[200px] flex-1 text-[15px] font-medium text-bone">
              {item.v}
            </span>
          </HairlineCell>
        ))}
      </HairlineGrid>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Hébergement</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Le site est hébergé par : {hebergeur}.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Propriété intellectuelle
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          L&apos;ensemble des contenus présents sur ce site (textes, images, logo, graphismes)
          est la propriété de BRANDYBEN, sauf mention contraire, et ne peut être reproduit sans
          autorisation préalable.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Protection des données personnelles
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Les informations recueillies via les formulaires du site (nom, e-mail, téléphone)
          sont utilisées uniquement pour répondre aux demandes de contact et ne sont ni cédées
          ni vendues à des tiers. Conformément à la réglementation applicable, toute personne
          dispose d&apos;un droit d&apos;accès, de rectification et de suppression de ses
          données en écrivant à {settings?.email ?? "brandonmedehou2203@gmail.com"}.
        </p>
      </div>
    </div>
  );
}
