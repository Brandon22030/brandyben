import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 300;

async function getProject(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, clients(nom, site)")
    .eq("slug", slug)
    .eq("statut", "publie")
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.titre,
    description: project.resume ?? undefined,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const client = project.clients as unknown as { nom: string; site: string | null } | null;

  return (
    <div className="box-content mx-auto max-w-[1240px] px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <div className="mx-auto max-w-[720px]">
        <Link href="/realisations" className="text-[13px] text-cool hover:text-bone">
          ← Réalisations
        </Link>

        <span
          className={`mt-6 inline-block text-[12px] font-semibold ${
            project.pole === "batiment" ? "text-amber" : "text-signal"
          }`}
        >
          {project.pole === "batiment" ? "Bâtiment" : "Développement web"}
        </span>

        <h1 className="mt-2 font-sans text-[30px] font-bold tracking-[-0.04em] text-bone md:text-[38px]">
          {project.titre}
        </h1>

        {client && <p className="mt-2 text-[14px] text-cool">{client.nom}</p>}

        {project.images?.[0] ? (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-[18px] border border-white/10">
            <Image src={project.images[0]} alt={project.titre} fill className="object-cover" />
          </div>
        ) : (
          <div className="mt-8 flex aspect-video items-center justify-center rounded-[18px] border border-dashed border-white/15 text-[13px] text-cool">
            Image à venir
          </div>
        )}

        {project.resume && (
          <p className="mt-8 text-[16px] text-cool">{project.resume}</p>
        )}

        {project.contenu && (
          <div className="mt-6 max-w-[70ch] whitespace-pre-line text-[15px] leading-relaxed text-cool">
            {project.contenu}
          </div>
        )}

        {project.images && project.images.length > 1 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {project.images.slice(1).map((src) => (
              <div key={src} className="relative aspect-video overflow-hidden rounded-[14px] border border-white/10">
                <Image src={src} alt={project.titre} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {project.lien && (
          <Link
            href={project.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[14px] font-semibold text-bone"
          >
            Voir le projet en ligne
            <ExternalLink size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}
