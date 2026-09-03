import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import type { Pole } from "@/lib/supabase/types";

export type ProjectCard = {
  id: string;
  titre: string;
  slug: string;
  pole: Pole;
  resume: string | null;
  images: string[];
  client_nom: string | null;
};

export function ProjectsGrid({ projects }: { projects: ProjectCard[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-[14px] text-[#8B93A7]">
        Aucun projet publié pour le moment.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <Reveal key={project.id} delay={(i % 6) * 60}>
          <Link
            href={`/realisations/${project.slug}`}
            className="flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.028] transition-colors hover:border-white/28"
          >
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-white/[0.08] bg-[radial-gradient(ellipse_at_50%_0%,rgba(79,124,255,0.10),transparent_70%)] bg-[#0B0D13] px-6 text-center text-[13px] text-[#5A6072]">
              {project.images[0] ? (
                <Image
                  src={project.images[0]}
                  alt={project.titre}
                  fill
                  className="object-cover"
                />
              ) : (
                <span>
                  {project.pole === "batiment" ? "Plan ou photo du chantier" : "Capture d'écran"}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-[11px] p-[26px]">
              <span
                className={`text-[11.5px] uppercase tracking-[0.16em] ${
                  project.pole === "batiment" ? "text-amber" : "text-signal"
                }`}
              >
                {project.pole === "batiment" ? "Bâtiment" : "Développement web"}
              </span>
              <p className="text-[20px] font-bold tracking-[-0.03em] text-bone">
                {project.titre}
              </p>
              {project.client_nom && (
                <p className="text-[13px] text-[#8B93A7]">{project.client_nom}</p>
              )}
              {project.resume && (
                <p className="text-[15px] leading-[1.65] text-[#8B93A7]">{project.resume}</p>
              )}
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
