"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteEtapeMethode } from "@/app/admin/(dashboard)/methode/actions";

export function DeleteEtapeButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Supprimer cette étape ?")) return;
        startTransition(async () => {
          await deleteEtapeMethode(id);
          router.refresh();
        });
      }}
      className="flex h-7 w-7 items-center justify-center rounded-lg text-cool hover:text-amber disabled:opacity-50"
      aria-label="Supprimer"
    >
      <Trash2 size={14} />
    </button>
  );
}
