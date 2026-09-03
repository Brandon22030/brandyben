"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { saveTestimonial, type SaveState } from "@/app/admin/(dashboard)/temoignages/actions";
import { AdminCard, Field, Select, fieldClass } from "@/components/admin/ui";
import type { Database } from "@/lib/supabase/types";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
type ClientOption = { id: string; nom: string };

const initialState: SaveState = { status: "idle" };

export function TestimonialForm({
  testimonial,
  clients,
}: {
  testimonial?: Testimonial;
  clients: ClientOption[];
}) {
  const [state, formAction, pending] = useActionState(saveTestimonial, initialState);
  const router = useRouter();
  const isNew = !testimonial;

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={testimonial?.id ?? "nouveau"} />

      <div className="flex items-center justify-between gap-4">
        <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
          {isNew ? "Ajouter un témoignage" : "Modifier le témoignage"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/temoignages")}
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
          <Field label="Client">
            <Select name="client_id" defaultValue={testimonial?.client_id ?? ""}>
              <option value="">—</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Nom de l'auteur">
            <input
              name="auteur"
              required
              defaultValue={testimonial?.auteur}
              placeholder="Nom du client"
              className={fieldClass}
            />
          </Field>
          <Field label="Fonction, entreprise">
            <input
              name="fonction"
              defaultValue={testimonial?.fonction ?? ""}
              placeholder="Fonction, entreprise"
              className={fieldClass}
            />
          </Field>
          <Field label="Note (1 à 5)">
            <input
              type="number"
              name="note"
              min={1}
              max={5}
              defaultValue={testimonial?.note ?? 5}
              className={fieldClass}
            />
          </Field>
          <Field label="Statut">
            <Select name="statut" defaultValue={testimonial?.statut ?? "brouillon"}>
              <option value="brouillon">Brouillon</option>
              <option value="publie">Publié</option>
            </Select>
          </Field>
          <Field label="Citation" span2>
            <textarea
              name="citation"
              required
              defaultValue={testimonial?.citation}
              rows={3}
              className={`${fieldClass} resize-none`}
            />
          </Field>
          <Field label="Photo (optionnel)" span2>
            <input type="file" name="photo" accept="image/*" className={fieldClass} />
          </Field>
        </div>
      </AdminCard>
    </form>
  );
}
