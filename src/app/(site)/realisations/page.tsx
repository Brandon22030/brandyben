import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ProjectsGrid, type ProjectCard } from "@/components/projects-grid";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Chaque fiche présente le besoin du client, la réponse apportée et le résultat obtenu.",
};

export default async function RealisationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, titre, slug, pole, resume, images, ordre, clients(nom)")
    .eq("statut", "publie")
    .order("ordre");

  const projects: ProjectCard[] = (data ?? []).map((p) => ({
    id: p.id,
    titre: p.titre,
    slug: p.slug,
    pole: p.pole,
    resume: p.resume,
    images: p.images ?? [],
    client_nom: (p.clients as unknown as { nom: string } | null)?.nom ?? null,
  }));

  return (
    <div className="box-content mx-auto flex max-w-[1240px] flex-col gap-[clamp(32px,4vw,52px)] px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <Reveal className="flex max-w-[720px] flex-col gap-4">
        <p className="text-[11.5px] uppercase tracking-[0.24em] text-[#5A6072]">Réalisations</p>
        <h1 className="text-[clamp(34px,6vw,64px)] font-bold leading-none tracking-[-0.05em] text-bone">
          Nos projets
        </h1>
        <p className="text-[17px] leading-[1.7] text-[#9AA2B4]">
          Chaque fiche présente le besoin du client, la réponse apportée et le résultat.
        </p>
      </Reveal>

      <ProjectsGrid projects={projects} />
    </div>
  );
}
