import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site BRANDYBEN.",
};

export default function ConditionsGeneralesPage() {
  return (
    <div className="box-content mx-auto flex max-w-[820px] flex-col gap-9 px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <div className="flex flex-col gap-3">
        <h1 className="text-[clamp(30px,5vw,52px)] font-bold tracking-[-0.05em] text-bone">
          Conditions générales d&apos;utilisation
        </h1>
        <p className="text-[14px] text-[#6B7183]">Dernière mise à jour : 3 septembre 2026</p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Objet</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Les présentes conditions générales régissent l&apos;accès et l&apos;utilisation du
          site brandyben.com, édité par BRANDYBEN (voir les Mentions légales). En naviguant sur
          ce site, vous acceptez ces conditions sans réserve.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Accès au site</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Le site est accessible gratuitement à tout visiteur disposant d&apos;un accès à
          Internet. BRANDYBEN met en œuvre les moyens raisonnables pour assurer un accès
          continu, sans garantir une disponibilité ininterrompue : des interruptions liées à la
          maintenance, à des mises à jour ou à des causes indépendantes de sa volonté peuvent
          survenir.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Demandes de devis et de contact
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Le formulaire de contact permet de solliciter un devis gratuit et sans engagement.
          Vous vous engagez à fournir des informations exactes. Toute utilisation abusive du
          formulaire (spam, contenu injurieux, tentative d&apos;intrusion) pourra entraîner le
          blocage de l&apos;accès et, le cas échéant, des poursuites. Une demande de devis ne
          constitue pas un contrat : les modalités d&apos;une prestation (délais, tarifs,
          livrables) sont fixées séparément, par écrit, entre BRANDYBEN et le client.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Propriété intellectuelle
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          L&apos;ensemble des éléments du site (textes, images, logo, mise en page, code) est
          protégé et reste la propriété de BRANDYBEN ou de ses clients pour les réalisations
          présentées, sauf mention contraire. Toute reproduction, même partielle, est soumise à
          autorisation préalable écrite.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Liens externes</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Le site peut contenir des liens vers des sites tiers (réalisations, réseaux sociaux).
          BRANDYBEN n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité
          quant à leur contenu ou à leurs pratiques.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Responsabilité</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Les contenus du site (notamment les articles de blog) ont une vocation informative et
          ne sauraient engager la responsabilité de BRANDYBEN quant à leur usage. BRANDYBEN ne
          peut être tenue responsable des dommages indirects résultant de l&apos;utilisation du
          site ou de l&apos;impossibilité d&apos;y accéder.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Droit applicable et litiges
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Les présentes conditions sont soumises au droit béninois. En cas de litige non résolu
          à l&apos;amiable, les tribunaux de Cotonou sont seuls compétents. Voir aussi la page{" "}
          <a href="/reclamation" className="text-signal">
            Réclamation
          </a>{" "}
          pour signaler un désaccord avant toute action.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Modification</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          BRANDYBEN peut modifier les présentes conditions à tout moment ; la version en vigueur
          est celle publiée sur cette page à la date de votre visite.
        </p>
      </div>
    </div>
  );
}
