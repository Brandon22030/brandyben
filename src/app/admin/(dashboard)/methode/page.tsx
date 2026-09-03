import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminCard, PoleBadge } from "@/components/admin/ui";
import { DeleteEtapeButton } from "@/components/admin/delete-etape-button";

export const dynamic = "force-dynamic";

export default async function AdminMethodePage() {
  const supabase = await createClient();
  const { data: etapes } = await supabase
    .from("etapes_methode")
    .select("*")
    .order("pole")
    .order("ordre");

  const dev = (etapes ?? []).filter((e) => e.pole === "dev");
  const batiment = (etapes ?? []).filter((e) => e.pole === "batiment");

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
            Méthode
          </h1>
          <p className="mt-1 text-[13.5px] text-cool">
            Étapes affichées dans la section « Comment se déroule un projet » de l&apos;accueil,
            avec un bouton pour basculer entre les deux pôles.
          </p>
        </div>
        <Link
          href="/admin/methode/nouveau"
          className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white"
        >
          + Nouvelle étape
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {[
          { pole: "dev" as const, label: "Développement web", items: dev },
          { pole: "batiment" as const, label: "Architecture & bâtiment", items: batiment },
        ].map((group) => (
          <AdminCard key={group.pole} title={group.label}>
            {group.items.length === 0 ? (
              <p className="text-[13.5px] text-cool">Aucune étape pour ce pôle.</p>
            ) : (
              <div className="flex flex-col divide-y divide-white/10">
                {group.items.map((etape) => (
                  <div key={etape.id} className="flex items-center gap-3 py-3">
                    <span className="font-mono text-[12px] text-cool/60">{etape.ordre}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-bone">{etape.titre}</p>
                      {etape.duree && (
                        <p className="text-[12px] text-cool">{etape.duree}</p>
                      )}
                    </div>
                    <PoleBadge pole={etape.pole} />
                    <Link
                      href={`/admin/methode/${etape.id}`}
                      className="text-[12.5px] text-signal"
                    >
                      Modifier
                    </Link>
                    <DeleteEtapeButton id={etape.id} />
                  </div>
                ))}
              </div>
            )}
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
