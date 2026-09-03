import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatutContenuBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: avis } = await supabase
    .from("testimonials")
    .select("*, clients(nom)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
            Témoignages
          </h1>
          <p className="mt-1 text-[13.5px] text-cool">{(avis ?? []).length} avis</p>
        </div>
        <Link
          href="/admin/temoignages/nouveau"
          className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white"
        >
          + Nouveau témoignage
        </Link>
      </div>

      {(avis ?? []).length === 0 ? (
        <p className="mt-8 text-[13.5px] text-cool">Aucun témoignage pour le moment.</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(avis ?? []).map((item) => (
            <div key={item.id} className="rounded-[18px] border border-white/10 bg-white/[0.028] p-5">
              <div className="flex items-center justify-between">
                <span className="text-amber">{"★".repeat(item.note ?? 5)}</span>
                <StatutContenuBadge statut={item.statut} />
              </div>
              <p className="mt-3 line-clamp-3 text-[13.5px] text-cool">{item.citation}</p>
              <p className="mt-3 text-[13.5px] font-semibold text-bone">{item.auteur}</p>
              <p className="text-[12.5px] text-cool">
                {item.fonction ?? (item.clients as unknown as { nom: string } | null)?.nom}
              </p>
              <Link href={`/admin/temoignages/${item.id}`} className="mt-3 inline-block text-[12.5px] text-signal">
                Modifier
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
