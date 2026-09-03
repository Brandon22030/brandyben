"use client";

import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteMedia } from "@/app/admin/(dashboard)/medias/actions";

export type MediaItem = { path: string; url: string };

export function MediaGrid({
  bucket,
  items,
}: {
  bucket: "logos" | "projects";
  items: MediaItem[];
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  if (items.length === 0) {
    return <p className="text-[13px] text-cool">Aucun fichier dans ce bucket.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {items.map((item) => (
        <div key={item.path} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10">
          <Image src={item.url} alt="" fill className="object-cover" />
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await deleteMedia(bucket, item.path);
                router.refresh();
              })
            }
            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-md bg-ink/80 text-cool opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
