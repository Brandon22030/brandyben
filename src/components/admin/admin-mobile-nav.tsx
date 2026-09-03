"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 bg-surface px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <Logo size={22} />
          <span className="font-sans text-[15px] font-bold tracking-[-0.05em] text-bone">
            BRANDYBEN
          </span>
        </Link>
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-bone"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="mt-3 flex flex-col gap-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-[13.5px] ${
                  active ? "bg-signal/[0.16] text-bone" : "text-cool"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
