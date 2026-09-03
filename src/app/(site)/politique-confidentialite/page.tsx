import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment BRANDYBEN collecte, utilise et protège les données transmises via le site.",
};

export default async function PolitiqueConfidentialitePage() {
  const settings = await getSettings();
  const email = settings?.email ?? "brandonmedehou2203@gmail.com";

  return (
    <div className="box-content mx-auto flex max-w-[820px] flex-col gap-9 px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <div className="flex flex-col gap-3">
        <h1 className="text-[clamp(30px,5vw,52px)] font-bold tracking-[-0.05em] text-bone">
          Politique de confidentialité
        </h1>
        <p className="text-[14px] text-[#6B7183]">Dernière mise à jour : 3 septembre 2026</p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Responsable du traitement
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          BRANDYBEN, entreprise individuelle basée à Cotonou (Bénin), est responsable du
          traitement des données décrites ci-dessous. Pour toute question, écrivez à{" "}
          {email}.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Données collectées
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Le site ne demande pas de créer de compte et ne collecte aucune donnée en navigation
          normale. La seule collecte a lieu lorsque vous remplissez volontairement le formulaire
          de la page Contact : nom, adresse e-mail, numéro de téléphone (facultatif) et le
          contenu de votre message.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Finalité et base légale
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Ces informations servent uniquement à répondre à votre demande de devis ou de contact,
          sur la base de votre consentement (l&apos;envoi du formulaire) et de l&apos;intérêt
          légitime précontractuel qui en découle. Elles ne sont utilisées à aucune autre fin,
          notamment pas à des fins de prospection commerciale non sollicitée ni de profilage.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">
          Destinataires et conservation
        </h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Vos données sont accessibles uniquement aux deux cofondateurs de BRANDYBEN, depuis
          l&apos;espace d&apos;administration protégé du site. Elles ne sont ni cédées, ni
          vendues, ni partagées avec des tiers. Elles sont conservées le temps nécessaire au
          traitement de votre demande, puis pendant une durée maximale de trois ans à compter du
          dernier échange si aucune relation contractuelle ne s&apos;est engagée, sauf demande de
          suppression anticipée de votre part.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Vos droits</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Conformément au Code du numérique de la République du Bénin (loi n° 2017-20 du 20
          avril 2018) relatif à la protection des données à caractère personnel, vous disposez
          d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition sur
          vos données. Pour l&apos;exercer, écrivez à {email}. Vous pouvez également saisir
          l&apos;Autorité de Protection des Données Personnelles (APDP) du Bénin si vous estimez
          que vos droits ne sont pas respectés.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Cookies</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Le site public n&apos;utilise aucun cookie de suivi, de mesure d&apos;audience ou de
          publicité. Seul l&apos;espace d&apos;administration (réservé aux cofondateurs) dépose
          un cookie de session strictement nécessaire à la connexion. Si un outil de mesure
          d&apos;audience était ajouté à l&apos;avenir, cette politique serait mise à jour et un
          bandeau de consentement serait affiché avant tout dépôt de cookie non essentiel.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] font-bold tracking-[-0.03em] text-bone">Sécurité</h2>
        <p className="text-[16px] leading-[1.75] text-[#B4BCCC]">
          Les données sont hébergées chez Supabase, avec un accès restreint par authentification
          et des règles de sécurité au niveau des lignes de la base de données. Aucun système
          n&apos;étant infaillible, BRANDYBEN met en œuvre les moyens raisonnables pour protéger
          vos informations contre l&apos;accès non autorisé, la perte ou la divulgation.
        </p>
      </div>
    </div>
  );
}
