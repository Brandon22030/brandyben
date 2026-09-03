"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";
import { signOut } from "@/app/admin/(dashboard)/actions";

export function AdminSidebar({ initials, name }: { initials: string; name: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-surface px-4 py-6 md:flex">
      <Link href="/admin" className="flex items-center gap-2 px-2">
        <Logo size={24} />
        <span className="font-sans text-[16px] font-bold tracking-[-0.05em] text-bone">
          BRANDYBEN
        </span>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {ADMIN_NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-3 py-2.5 text-[13.5px] transition-colors ${
                active
                  ? "border border-signal/30 bg-signal/[0.16] text-bone"
                  : "text-cool hover:text-bone"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 rounded-xl border border-white/10 px-3 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal/20 text-[12px] font-semibold text-signal">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-bone" title={name}>
            {name}
          </p>
          <p className="text-[11.5px] text-cool">Administrateur</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            aria-label="Se déconnecter"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-cool hover:text-bone"
          >
            <LogOut size={15} />
          </button>
        </form>
      </div>
    </aside>
  );
}
