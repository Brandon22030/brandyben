"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { saveEtapeMethode, type SaveState } from "@/app/admin/(dashboard)/methode/actions";
import { AdminCard, Field, Select, fieldClass } from "@/components/admin/ui";
import type { Database } from "@/lib/supabase/types";

type Etape = Database["public"]["Tables"]["etapes_methode"]["Row"];

const initialState: SaveState = { status: "idle" };

export function MethodEtapeForm({ etape }: { etape?: Etape }) {
  const [state, formAction, pending] = useActionState(saveEtapeMethode, initialState);
  const router = useRouter();
  const isNew = !etape;

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={etape?.id ?? "nouveau"} />

      <div className="flex items-center justify-between gap-4">
        <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
          {isNew ? "Ajouter une étape" : "Modifier l'étape"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/methode")}
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
          <Field label="Pôle">
            <Select name="pole" defaultValue={etape?.pole ?? "dev"}>
              <option value="dev">Développement web</option>
              <option value="batiment">Architecture & bâtiment</option>
            </Select>
          </Field>
          <Field label="Ordre d'affichage">
            <input
              type="number"
              name="ordre"
              defaultValue={etape?.ordre ?? 0}
              className={fieldClass}
            />
          </Field>
          <Field label="Titre" span2>
            <input
              name="titre"
              required
              defaultValue={etape?.titre}
              placeholder="Cadrage"
              className={fieldClass}
            />
          </Field>
          <Field label="Description" span2>
            <textarea
              name="description"
              defaultValue={etape?.description ?? ""}
              rows={3}
              className={`${fieldClass} resize-none`}
            />
          </Field>
          <Field label="Durée indicative">
            <input
              name="duree"
              defaultValue={etape?.duree ?? ""}
              placeholder="1 semaine"
              className={fieldClass}
            />
          </Field>
        </div>
      </AdminCard>
    </form>
  );
}
