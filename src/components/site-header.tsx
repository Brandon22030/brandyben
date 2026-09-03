"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_ITEMS } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 px-3.5 py-3.5 backdrop-blur-[14px] sm:px-7"
      style={{
        background:
          "linear-gradient(180deg, rgba(7,8,11,0.92), rgba(7,8,11,0.55) 70%, transparent)",
      }}
    >
      <div className="relative">
        <div className="box-content mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-[18px] rounded-full border border-white/[0.09] bg-[rgba(14,16,22,0.72)] py-[9px] pl-5 pr-[9px]">
          <Link href="/" className="flex shrink-0 items-center gap-[10px]" onClick={() => setOpen(false)}>
            <Logo size={24} />
            <span className="font-sans text-[19px] font-bold tracking-[-0.05em] text-bone">
              BRANDYBEN
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-[13px] py-[9px] text-[13.5px] font-medium transition-colors ${
                    active ? "bg-white/[0.07] text-bone" : "text-[#8B93A7] hover:text-bone"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-2 whitespace-nowrap rounded-full bg-bone px-5 py-[11px] text-[13.5px] font-semibold text-ink transition-colors hover:bg-signal hover:text-white"
            >
              Demander un devis
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-bone md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="absolute inset-x-0 top-[calc(100%+8px)] rounded-3xl border border-white/[0.09] bg-[rgba(14,16,22,0.96)] p-3 md:hidden">
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                      active ? "bg-white/[0.07] text-bone" : "text-[#8B93A7]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-2xl bg-bone px-4 py-3 text-center text-sm font-semibold text-ink"
              >
                Demander un devis
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
