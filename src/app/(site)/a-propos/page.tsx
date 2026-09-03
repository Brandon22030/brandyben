import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { HairlineGrid, HairlineCell } from "@/components/hairline-grid";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "BRANDYBEN a été fondée à Cotonou par Brandon et Bennett MEDEHOU, frères jumeaux et cofondateurs.",
};

const EQUIPE = [
  {
    nom: "Brandon MEDEHOU",
    role: "Cofondateur — Développement web & informatique",
    roleColor: "text-signal",
    desc: "Conception et développement de sites, de logiciels et d'applications. Pilotage des projets et relation client.",
  },
  {
    nom: "Bennett MEDEHOU",
    role: "Cofondateur — Dessinateur projeteur bâtiment, technicien supérieur en génie civil",
    roleColor: "text-amber",
    desc: "Plans, dessins de projet et études techniques du bâtiment. Suivi de la partie ingénierie et génie civil.",
  },
];

const VALEURS = [
  {
    title: "Qualité",
    desc: "Un travail livré fini, testé et documenté, pas une version approximative.",
  },
  {
    title: "Réactivité",
    desc: "Des réponses rapides et des délais annoncés qui sont tenus.",
  },
  {
    title: "Accompagnement",
    desc: "Nous expliquons nos choix techniques dans un langage clair.",
  },
];

const CONFIANCE = [
  { label: "Forme juridique", value: "Entreprise individuelle" },
  { label: "Numéro IFU", value: "0202212868410" },
  { label: "Numéro RCCM", value: "RB/COT/26 A 119853" },
  { label: "Zone d'intervention", value: "Cotonou et à distance" },
];

export default function AProposPage() {
  return (
    <div className="box-content mx-auto flex max-w-[1000px] flex-col gap-[clamp(36px,5vw,64px)] px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <Reveal className="flex flex-col gap-[18px]">
        <p className="text-[11.5px] uppercase tracking-[0.24em] text-[#5A6072]">À propos</p>
        <h1 className="text-[clamp(34px,6vw,68px)] font-bold leading-[0.98] tracking-[-0.05em] text-bone">
          Jumeaux de naissance,
          <br />
          associés de métier.
        </h1>
        <p className="max-w-[66ch] text-[clamp(16px,1.8vw,19px)] leading-[1.7] text-[#9AA2B4]">
          BRANDYBEN a été fondée à Cotonou par Brandon et Bennett MEDEHOU, frères jumeaux et
          cofondateurs. Le nom de l&apos;entreprise vient de la contraction de leurs deux
          prénoms. L&apos;entreprise est établie au quartier Agontinkon, dans le 8ᵉ
          arrondissement, et est en cours d&apos;immatriculation au Registre du Commerce et du
          Crédit Mobilier via l&apos;APIEX.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {EQUIPE.map((membre, i) => (
          <Reveal
            key={membre.nom}
            delay={i * 80}
            className="flex flex-col gap-[18px] rounded-[22px] border border-white/10 bg-white/[0.03] p-[clamp(26px,3vw,36px)]"
          >
            <div className="flex aspect-[4/3] items-center justify-center rounded-[14px] border border-dashed border-white/[0.16] text-[13px] text-[#5A6072]">
              Portrait
            </div>
            <div className="flex flex-col gap-[5px]">
              <p className="text-[22px] font-bold tracking-[-0.03em] text-bone">{membre.nom}</p>
              <p className={`text-[13.5px] font-semibold ${membre.roleColor}`}>{membre.role}</p>
            </div>
            <p className="text-[15px] leading-[1.65] text-[#8B93A7]">{membre.desc}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="flex flex-col gap-[22px]">
        <h2 className="text-[clamp(24px,3.2vw,34px)] font-bold tracking-[-0.035em] text-bone">
          Mission et valeurs
        </h2>
        <p className="text-[17px] leading-[1.75] text-[#B4BCCC]">
          Rendre accessible aux entreprises, associations et indépendants du Bénin et de la
          sous-région un travail technique de qualité : des outils numériques réellement utiles
          et des études techniques rigoureuses. Nous privilégions le travail bien fait, la
          clarté des échanges et le respect des délais annoncés.
        </p>
        <HairlineGrid className="grid-cols-1 sm:grid-cols-3">
          {VALEURS.map((valeur) => (
            <HairlineCell key={valeur.title} className="flex flex-col gap-2 p-[26px]">
              <p className="text-[16px] font-semibold text-bone">{valeur.title}</p>
              <p className="text-[14.5px] leading-[1.6] text-[#8B93A7]">{valeur.desc}</p>
            </HairlineCell>
          ))}
        </HairlineGrid>
      </Reveal>

      <Reveal className="flex flex-col gap-5 rounded-[20px] border border-white/10 bg-white/[0.03] p-[clamp(26px,3vw,36px)]">
        <p className="text-[11.5px] uppercase tracking-[0.22em] text-[#5A6072]">
          Éléments de confiance
        </p>
        <dl className="grid grid-cols-2 gap-[22px] text-[15px] md:grid-cols-4">
          {CONFIANCE.map((item) => (
            <div key={item.label}>
              <dt className="mb-[5px] text-[13px] text-[#6B7183]">{item.label}</dt>
              <dd className="font-semibold text-bone">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
