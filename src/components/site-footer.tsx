import Link from "next/link";
import { Logo } from "@/components/logo";
import { NAV_ITEMS } from "@/lib/nav";
import { getSettings } from "@/lib/settings";

export async function SiteFooter() {
  const settings = await getSettings();
  const telephone = settings?.telephone ?? "+229 01 53 72 90 10";
  const email = settings?.email ?? "brandonmedehou2203@gmail.com";
  const ifu = settings?.ifu ?? "0202212868410";
  const rccm = settings?.rccm;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.09] px-5 pb-7 pt-[clamp(48px,6vw,80px)] sm:px-[clamp(20px,4vw,40px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-40px] left-1/2 h-[400px] w-[1000px] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center_bottom,rgba(79,124,255,0.14),transparent_65%)] blur-[30px]"
      />

      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 [&>div]:min-w-0 sm:gap-9 md:grid-cols-4">
          <div className="flex flex-col gap-[14px]">
            <div className="flex items-center gap-[10px]">
              <Logo size={24} />
              <span className="text-[18px] font-bold tracking-[-0.05em] text-bone">BRANDYBEN</span>
            </div>
            <p className="text-[14px] leading-[1.7] text-[#8B93A7]">
              Développement web, informatique et ingénierie technique. Cotonou, Bénin.
            </p>
          </div>

          <div className="flex flex-col gap-[11px]">
            <p className="text-[11.5px] uppercase tracking-[0.2em] text-[#5A6072]">Navigation</p>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-[#8B93A7] transition-colors hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex min-w-0 flex-col gap-[11px]">
            <p className="text-[11.5px] uppercase tracking-[0.2em] text-[#5A6072]">Contact</p>
            <p className="break-words text-[14px] leading-[1.85] text-[#8B93A7]">
              {telephone}
              <br />
              <span className="break-all">{email}</span>
              <br />
              Agontinkon, 8ᵉ arr., Cotonou
            </p>
          </div>

          <div className="flex flex-col gap-[11px]">
            <p className="text-[11.5px] uppercase tracking-[0.2em] text-[#5A6072]">
              Informations
            </p>
            <Link
              href="/mentions-legales"
              className="text-[14px] text-[#8B93A7] transition-colors hover:text-bone"
            >
              Mentions légales
            </Link>
            <Link
              href="/conditions-generales"
              className="text-[14px] text-[#8B93A7] transition-colors hover:text-bone"
            >
              Conditions générales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-[14px] text-[#8B93A7] transition-colors hover:text-bone"
            >
              Confidentialité
            </Link>
            <Link
              href="/reclamation"
              className="text-[14px] text-[#8B93A7] transition-colors hover:text-bone"
            >
              Réclamation
            </Link>
            <p className="text-[14px] text-[#8B93A7]">IFU {ifu}</p>
            <p className="text-[14px] text-[#8B93A7]">
              {rccm ? `RCCM ${rccm}` : "RCCM en cours d'attribution"}
            </p>
          </div>
        </div>

        <div
          aria-hidden
          className="select-none overflow-hidden text-[clamp(52px,15vw,190px)] font-bold leading-[0.8] tracking-[-0.06em] text-white/[0.045]"
        >
          BRANDYBEN
        </div>

        <div className="border-t border-white/[0.08] pt-[22px] text-[13px] text-[#5A6072]">
          © {year} BRANDYBEN. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
