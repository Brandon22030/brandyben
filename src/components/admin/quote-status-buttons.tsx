"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateQuoteStatus } from "@/app/admin/(dashboard)/demandes/actions";
import { STATUT_DEMANDE_LABEL } from "@/components/admin/ui";
import type { StatutDemande } from "@/lib/supabase/types";

const STATUSES: StatutDemande[] = ["nouveau", "en_cours", "devis_envoye", "gagne", "perdu"];

export function QuoteStatusButtons({ id, current }: { id: string; current: StatutDemande }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((statut) => (
        <button
          key={statut}
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await updateQuoteStatus(id, statut);
              router.refresh();
            })
          }
          className={`rounded-full border px-3.5 py-2 text-[12.5px] transition-colors disabled:opacity-50 ${
            current === statut
              ? "border-signal bg-signal/[0.18] text-bone"
              : "border-white/[0.13] text-cool"
          }`}
        >
          {STATUT_DEMANDE_LABEL[statut]}
        </button>
      ))}
    </div>
  );
}
