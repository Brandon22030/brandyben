"use client";

import { useActionState } from "react";
import { saveSettings, type SaveState } from "@/app/admin/(dashboard)/parametres/actions";
import { AdminCard, Field, fieldClass } from "@/components/admin/ui";
import type { Database } from "@/lib/supabase/types";

type Settings = Database["public"]["Tables"]["settings"]["Row"];

const initialState: SaveState = { status: "idle" };

export function SettingsForm({ settings }: { settings: Settings | null }) {
  const [state, formAction, pending] = useActionState(saveSettings, initialState);

  return (
    <form action={formAction}>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
          Paramètres
        </h1>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>

      {state.message && (
        <p className={`mt-4 text-[13px] ${state.status === "error" ? "text-amber" : "text-signal"}`}>
          {state.message}
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminCard title="Informations légales">
          <div className="flex flex-col gap-4">
            <Field label="Numéro RCCM">
              <input
                name="rccm"
                defaultValue={settings?.rccm ?? ""}
                placeholder="À compléter dès délivrance"
                className={fieldClass}
              />
            </Field>
            <Field label="Numéro IFU">
              <input name="ifu" defaultValue={settings?.ifu ?? ""} className={fieldClass} />
            </Field>
            <Field label="Siège social">
              <input
                name="adresse"
                defaultValue={settings?.adresse ?? ""}
                className={fieldClass}
              />
            </Field>
            <Field label="Hébergeur">
              <input
                name="hebergeur"
                defaultValue={settings?.hebergeur ?? ""}
                placeholder="Nom, adresse et contact"
                className={fieldClass}
              />
            </Field>
          </div>
          <p className="mt-4 text-[12px] text-cool">
            Le numéro RCCM saisi ici alimente automatiquement la page Mentions légales.
          </p>
        </AdminCard>

        <AdminCard title="Coordonnées affichées sur le site">
          <div className="flex flex-col gap-4">
            <Field label="Téléphone">
              <input
                type="tel"
                name="telephone"
                defaultValue={settings?.telephone ?? ""}
                className={fieldClass}
              />
            </Field>
            <Field label="E-mail">
              <input
                type="email"
                name="email"
                defaultValue={settings?.email ?? ""}
                className={fieldClass}
              />
            </Field>
            <Field label="Horaires">
              <input
                name="horaires"
                defaultValue={settings?.horaires ?? ""}
                className={fieldClass}
              />
            </Field>
          </div>
        </AdminCard>
      </div>
    </form>
  );
}
