import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { PoleBadge, StatutContenuBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*, clients(nom)")
    .order("ordre");

  const publies = (projects ?? []).filter((p) => p.statut === "publie").length;
  const brouillons = (projects ?? []).filter((p) => p.statut === "brouillon").length;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
            Réalisations
          </h1>
          <p className="mt-1 text-[13.5px] text-cool">
            {(projects ?? []).length} projets · {publies} publiés · {brouillons} brouillons
          </p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white"
        >
          + Nouveau projet
        </Link>
      </div>

      {(projects ?? []).length === 0 ? (
        <p className="mt-8 text-[13.5px] text-cool">Aucun projet pour le moment.</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(projects ?? []).map((project) => (
            <div key={project.id} className="rounded-[18px] border border-white/10 bg-white/[0.028] p-4">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[12px] border border-dashed border-white/15">
                {project.images?.[0] ? (
                  <Image src={project.images[0]} alt="" fill className="object-cover" />
                ) : (
                  <span className="text-[12px] text-cool">Image</span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <PoleBadge pole={project.pole} />
                <StatutContenuBadge statut={project.statut} />
              </div>
              <p className="mt-2 text-[14.5px] font-semibold text-bone">{project.titre}</p>
              <p className="text-[12.5px] text-cool">
                {(project.clients as unknown as { nom: string } | null)?.nom ?? "-"}
              </p>
              <div className="mt-3 flex gap-3 text-[12.5px]">
                <Link href={`/admin/projets/${project.id}`} className="text-signal">
                  Modifier
                </Link>
                <Link href={`/realisations/${project.slug}`} target="_blank" className="text-cool">
                  Aperçu
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
