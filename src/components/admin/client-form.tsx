"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { saveClient, type SaveState } from "@/app/admin/(dashboard)/clients/actions";
import { AdminCard, Field, Toggle, fieldClass } from "@/components/admin/ui";
import type { Database } from "@/lib/supabase/types";

type Client = Database["public"]["Tables"]["clients"]["Row"];

const initialState: SaveState = { status: "idle" };

export function ClientForm({ client }: { client?: Client }) {
  const [state, formAction, pending] = useActionState(saveClient, initialState);
  const router = useRouter();
  const isNew = !client;

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={client?.id ?? "nouveau"} />

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[12.5px] text-cool">Clients / {isNew ? "Nouveau" : client.nom}</p>
          <h1 className="mt-1 font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
            {isNew ? "Ajouter un client" : "Modifier le client"}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/clients")}
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
            <Field label="Nom du client" span2>
              <input
                name="nom"
                required
                defaultValue={client?.nom}
                placeholder="Société Exemple SARL"
                className={fieldClass}
              />
            </Field>
            <Field label="Secteur">
              <input
                name="secteur"
                defaultValue={client?.secteur ?? ""}
                placeholder="Commerce"
                className={fieldClass}
              />
            </Field>
            <Field label="Ville">
              <input
                name="ville"
                defaultValue={client?.ville ?? ""}
                placeholder="Cotonou"
                className={fieldClass}
              />
            </Field>
            <Field label="Personne de contact">
              <input
                name="contact"
                defaultValue={client?.contact ?? ""}
                placeholder="Nom et fonction"
                className={fieldClass}
              />
            </Field>
            <Field label="E-mail">
              <input
                type="email"
                name="email"
                defaultValue={client?.email ?? ""}
                placeholder="contact@exemple.bj"
                className={fieldClass}
              />
            </Field>
            <Field label="Site internet">
              <input
                type="url"
                name="site"
                defaultValue={client?.site ?? ""}
                placeholder="https://"
                className={fieldClass}
              />
            </Field>
            <Field label="Téléphone">
              <input
                type="tel"
                name="telephone"
                defaultValue={client?.telephone ?? ""}
                placeholder="+229 ..."
                className={fieldClass}
              />
            </Field>
            <Field label="Notes internes" span2>
              <textarea
                name="notes_internes"
                defaultValue={client?.notes_internes ?? ""}
                placeholder="Historique de la relation, préférences…"
                rows={3}
                className={`${fieldClass} resize-none`}
              />
            </Field>
          </div>
        </AdminCard>

        <div className="flex flex-col gap-6">
          <AdminCard title="Logo du client">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[14px] border border-dashed border-white/15 py-8 text-center">
              <input type="file" name="logo" accept="image/png,image/svg+xml" className="hidden" />
              <span className="text-[13.5px] text-bone">Glissez un fichier</span>
              <span className="text-[12px] text-cool">PNG ou SVG · fond transparent</span>
            </label>
          </AdminCard>

          <AdminCard title="Affichage">
            <div className="flex flex-col gap-3">
              <Toggle
                label="Visible sur le site"
                name="visible_sur_site"
                defaultChecked={client?.visible_sur_site ?? true}
              />
            </div>
          </AdminCard>
        </div>
      </div>
    </form>
  );
}
