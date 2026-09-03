"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateQuoteStatus } from "@/app/admin/(dashboard)/demandes/actions";

export function ArchiveQuoteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await updateQuoteStatus(id, "archive");
          router.refresh();
        })
      }
      className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold text-bone disabled:opacity-50"
    >
      Archiver
    </button>
  );
}
