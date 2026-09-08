"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { saveProject, type SaveState } from "@/app/admin/(dashboard)/projets/actions";
import { AdminCard, Field, Select, fieldClass } from "@/components/admin/ui";
import type { Database } from "@/lib/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ClientOption = { id: string; nom: string };

const initialState: SaveState = { status: "idle" };

export function ProjectForm({
  project,
  clients,
}: {
  project?: Project;
  clients: ClientOption[];
}) {
  const [state, formAction, pending] = useActionState(saveProject, initialState);
  const router = useRouter();
  const isNew = !project;
  const [images] = useState<string[]>(project?.images ?? []);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={project?.id ?? "nouveau"} />
      <input type="hidden" name="existing_images" value={JSON.stringify(images)} />

      <div className="flex items-center justify-between gap-4">
        <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
          {isNew ? "Ajouter un projet" : "Modifier le projet"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/projets")}
            className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold text-bone"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p className="mt-4 text-[13px] text-amber">{state.message}</p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <AdminCard>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Titre" span2>
              <input
                name="titre"
                required
                defaultValue={project?.titre}
                placeholder="Site Société Exemple"
                className={fieldClass}
              />
            </Field>
            <Field label="Slug (laisser vide pour générer)">
              <input
                name="slug"
                defaultValue={project?.slug}
                placeholder="site-societe-exemple"
                className={fieldClass}
              />
            </Field>
            <Field label="Client">
              <Select name="client_id" defaultValue={project?.client_id ?? ""}>
                <option value="">-</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Pôle">
              <Select name="pole" defaultValue={project?.pole ?? "dev"}>
                <option value="dev">Développement web</option>
                <option value="batiment">Bâtiment</option>
              </Select>
            </Field>
            <Field label="Statut">
              <Select name="statut" defaultValue={project?.statut ?? "brouillon"}>
                <option value="brouillon">Brouillon</option>
                <option value="publie">Publié</option>
              </Select>
            </Field>
            <Field label="Résumé" span2>
              <textarea
                name="resume"
                defaultValue={project?.resume ?? ""}
                rows={2}
                placeholder="Besoin du client, réponse apportée, résultat."
                className={`${fieldClass} resize-none`}
              />
            </Field>
            <Field label="Contenu détaillé" span2>
              <textarea
                name="contenu"
                defaultValue={project?.contenu ?? ""}
                rows={5}
                className={`${fieldClass} resize-none`}
              />
            </Field>
            <Field label="Lien en ligne">
              <input
                type="url"
                name="lien"
                defaultValue={project?.lien ?? ""}
                placeholder="https://"
                className={fieldClass}
              />
            </Field>
            <Field label="Ordre d'affichage">
              <input
                type="number"
                name="ordre"
                defaultValue={project?.ordre ?? 0}
                className={fieldClass}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard title="Images">
          {images.length > 0 && (
            <div className="mb-4 grid grid-cols-3 gap-2">
              {images.map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
          <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[14px] border border-dashed border-white/15 py-8 text-center">
            <input type="file" name="images" accept="image/*" multiple className="hidden" />
            <span className="text-[13.5px] text-bone">Ajouter des images</span>
            <span className="text-[12px] text-cool">JPG, PNG ou WebP</span>
          </label>
        </AdminCard>
      </div>
    </form>
  );
}
