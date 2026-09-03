import type { ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import type { Pole, StatutContenu, StatutDemande } from "@/lib/supabase/types";

export const fieldClass =
  "w-full rounded-[10px] border border-white/[0.13] bg-white/[0.03] px-3.5 py-2.5 text-[14px] text-bone placeholder:text-[#5A6072] outline-none focus:border-signal/60";

export function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${fieldClass} appearance-none pr-9 ${className}`}
      />
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cool"
      />
    </div>
  );
}

export function AdminCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[20px] border border-white/10 bg-white/[0.028] p-6 ${className}`}>
      {title && (
        <h2 className="font-sans text-[16px] font-semibold text-bone">{title}</h2>
      )}
      <div className={title ? "mt-5" : ""}>{children}</div>
    </div>
  );
}

export function Field({
  label,
  children,
  span2 = false,
}: {
  label: string;
  children: ReactNode;
  span2?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${span2 ? "sm:col-span-2" : ""}`}>
      <span className="text-[13px] text-cool">{label}</span>
      {children}
    </label>
  );
}

export function Toggle({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3">
      <span className="text-[13.5px] text-bone">{label}</span>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-5 w-9 shrink-0 appearance-none rounded-full bg-white/10 outline-none transition-colors checked:bg-signal relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
      />
    </label>
  );
}

const POLE_LABEL: Record<Pole, string> = {
  dev: "Développement web",
  batiment: "Bâtiment",
  indetermine: "Indéterminé",
};
const POLE_CLASS: Record<Pole, string> = {
  dev: "bg-signal/[0.16] text-signal",
  batiment: "bg-amber/[0.16] text-amber",
  indetermine: "bg-white/10 text-cool",
};

export function PoleBadge({ pole }: { pole: Pole }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${POLE_CLASS[pole]}`}>
      {POLE_LABEL[pole]}
    </span>
  );
}

const STATUT_CONTENU_LABEL: Record<StatutContenu, string> = {
  brouillon: "Brouillon",
  publie: "Publié",
};
const STATUT_CONTENU_CLASS: Record<StatutContenu, string> = {
  brouillon: "bg-white/10 text-cool",
  publie: "bg-signal/[0.16] text-signal",
};

export function StatutContenuBadge({ statut }: { statut: StatutContenu }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${STATUT_CONTENU_CLASS[statut]}`}
    >
      {STATUT_CONTENU_LABEL[statut]}
    </span>
  );
}

export const STATUT_DEMANDE_LABEL: Record<StatutDemande, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  devis_envoye: "Devis envoyé",
  gagne: "Gagné",
  perdu: "Perdu",
  archive: "Archivé",
};

const STATUT_DEMANDE_CLASS: Record<StatutDemande, string> = {
  nouveau: "bg-signal/[0.16] text-signal",
  en_cours: "bg-amber/[0.16] text-amber",
  devis_envoye: "bg-white/10 text-bone",
  gagne: "bg-emerald-500/15 text-emerald-400",
  perdu: "bg-red-500/15 text-red-400",
  archive: "bg-white/5 text-cool",
};

export function StatutDemandeBadge({ statut }: { statut: StatutDemande }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${STATUT_DEMANDE_CLASS[statut]}`}
    >
      {STATUT_DEMANDE_LABEL[statut]}
    </span>
  );
}
