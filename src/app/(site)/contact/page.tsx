import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { getSettings } from "@/lib/settings";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact",
  description: "Nous revenons vers vous sous 24 h ouvrées avec une première estimation.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const telephone = settings?.telephone ?? "+229 01 53 72 90 10";
  const email = settings?.email ?? "brandonmedehou2203@gmail.com";
  const horaires = settings?.horaires ?? "Lundi – samedi, 8 h – 18 h";

  return (
    <div className="box-content mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-[clamp(28px,4vw,52px)] px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)] lg:grid-cols-2">
      <div className="flex flex-col gap-[30px]">
        <Reveal className="flex flex-col gap-4">
          <p className="text-[11.5px] uppercase tracking-[0.24em] text-[#5A6072]">Contact</p>
          <h1 className="text-[clamp(32px,5vw,56px)] font-bold leading-none tracking-[-0.05em] text-bone">
            Parlons de votre projet
          </h1>
          <p className="text-[17px] leading-[1.7] text-[#9AA2B4]">
            Décrivez votre besoin en quelques lignes. Nous revenons vers vous sous 24 h ouvrées
            avec une première estimation.
          </p>
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-px overflow-hidden rounded-[18px] border border-white/[0.09] bg-white/[0.09]">
          <div className="bg-[#0A0C11] px-6 py-5">
            <p className="mb-[5px] text-[12.5px] text-[#6B7183]">Téléphone</p>
            <p className="text-[16px] font-semibold text-bone">{telephone}</p>
          </div>
          <div className="bg-[#0A0C11] px-6 py-5">
            <p className="mb-[5px] text-[12.5px] text-[#6B7183]">Téléphone (Bennett)</p>
            <p className="text-[16px] font-semibold text-bone">+229 01 61 70 40 70</p>
          </div>
          <div className="bg-[#0A0C11] px-6 py-5">
            <p className="mb-[5px] text-[12.5px] text-[#6B7183]">E-mail</p>
            <p className="break-all text-[16px] font-semibold text-bone">{email}</p>
          </div>
          <div className="bg-[#0A0C11] px-6 py-5">
            <p className="mb-[5px] text-[12.5px] text-[#6B7183]">Adresse</p>
            <p className="text-[16px] font-semibold leading-[1.55] text-bone">
              Quartier Agontinkon, Îlot 1270, Parcelle D
              <br />
              8ᵉ arrondissement, Cotonou, Bénin
              <br />
              <span className="font-normal text-[#8B93A7]">Von, derrière l&apos;école Pigier</span>
            </p>
          </div>
          <div className="bg-[#0A0C11] px-6 py-5">
            <p className="mb-[5px] text-[12.5px] text-[#6B7183]">Horaires</p>
            <p className="text-[16px] font-semibold text-bone">{horaires}</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <ContactForm />
      </Reveal>
    </div>
  );
}
