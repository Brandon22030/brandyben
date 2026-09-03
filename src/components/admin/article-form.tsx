"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { savePost, type SaveState } from "@/app/admin/(dashboard)/articles/actions";
import { AdminCard, Field, fieldClass } from "@/components/admin/ui";
import type { Database } from "@/lib/supabase/types";

type Post = Database["public"]["Tables"]["posts"]["Row"];

const initialState: SaveState = { status: "idle" };

export function ArticleForm({ post }: { post?: Post }) {
  const [state, formAction, pending] = useActionState(savePost, initialState);
  const router = useRouter();
  const isNew = !post;

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={post?.id ?? "nouveau"} />

      <div className="flex items-center justify-between gap-4">
        <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
          {isNew ? "Ajouter un article" : "Modifier l'article"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/articles")}
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

      <AdminCard className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Titre" span2>
            <input
              name="titre"
              required
              defaultValue={post?.titre}
              placeholder="Combien coûte un site internet au Bénin ?"
              className={fieldClass}
            />
          </Field>
          <Field label="Slug (laisser vide pour générer)">
            <input name="slug" defaultValue={post?.slug} className={fieldClass} />
          </Field>
          <Field label="Auteur">
            <input
              name="auteur"
              defaultValue={post?.auteur ?? ""}
              placeholder="Brandon MEDEHOU"
              className={fieldClass}
            />
          </Field>
          <Field label="Statut" span2>
            <select name="statut" defaultValue={post?.statut ?? "brouillon"} className={fieldClass}>
              <option value="brouillon">Brouillon</option>
              <option value="publie">Publié</option>
            </select>
          </Field>
          <Field label="Extrait" span2>
            <textarea
              name="extrait"
              defaultValue={post?.extrait ?? ""}
              rows={2}
              className={`${fieldClass} resize-none`}
            />
          </Field>
          <Field label="Contenu" span2>
            <textarea
              name="contenu"
              defaultValue={post?.contenu ?? ""}
              rows={10}
              className={`${fieldClass} resize-none`}
            />
          </Field>
          <Field label="Image de couverture" span2>
            <input type="file" name="couverture" accept="image/*" className={fieldClass} />
          </Field>
        </div>
      </AdminCard>
    </form>
  );
}
