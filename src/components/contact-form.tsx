"use client";

import { useActionState, useState } from "react";
import { submitQuoteRequest, type ContactFormState } from "@/app/(site)/contact/actions";
import type { Pole } from "@/lib/supabase/types";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full rounded-[11px] border border-white/[0.13] bg-white/[0.03] px-[15px] py-[13px] text-[15px] text-bone placeholder:text-[#5A6072] outline-none focus:border-signal";

const POLE_CHOICES: { value: Pole; label: string }[] = [
  { value: "dev", label: "Développement web & informatique" },
  { value: "batiment", label: "Ingénierie & bâtiment" },
  { value: "indetermine", label: "Je ne sais pas encore" },
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);
  const [pole, setPole] = useState<Pole>("dev");

  if (state.status === "success") {
    return (
      <div className="rounded-[24px] border border-white/10 bg-white/[0.028] p-8 text-center">
        <p className="text-[18px] font-semibold text-bone">Demande envoyée</p>
        <p className="mt-2 text-[14px] text-[#8B93A7]">
          {state.message ??
            "Merci, votre demande a bien été envoyée. Nous revenons vers vous sous 24 h ouvrées."}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 rounded-[24px] border border-white/[0.11] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012))] p-[clamp(26px,3.2vw,40px)]"
    >
      <h2 className="text-[22px] font-bold tracking-[-0.03em] text-bone">Demande de devis</h2>

      {/* Champ leurre anti-spam, invisible pour un visiteur humain */}
      <input
        type="text"
        name="entreprise"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <label className="flex flex-col gap-[7px]">
        <span className="text-[13.5px] text-[#9AA2B4]">Nom complet</span>
        <input type="text" name="nom" required placeholder="Votre nom" className={inputClass} />
        {state.fieldErrors?.nom && (
          <span className="text-[12px] text-amber">{state.fieldErrors.nom}</span>
        )}
      </label>

      <label className="flex flex-col gap-[7px]">
        <span className="text-[13.5px] text-[#9AA2B4]">E-mail</span>
        <input
          type="email"
          name="email"
          required
          placeholder="vous@exemple.com"
          className={inputClass}
        />
        {state.fieldErrors?.email && (
          <span className="text-[12px] text-amber">{state.fieldErrors.email}</span>
        )}
      </label>

      <label className="flex flex-col gap-[7px]">
        <span className="text-[13.5px] text-[#9AA2B4]">Téléphone</span>
        <input type="tel" name="telephone" placeholder="+229 ..." className={inputClass} />
      </label>

      <div className="flex flex-col gap-[9px]">
        <span className="text-[13.5px] text-[#9AA2B4]">Pôle concerné</span>
        <input type="hidden" name="pole" value={pole} />
        <div className="flex flex-wrap gap-2">
          {POLE_CHOICES.map((choice) => (
            <button
              key={choice.value}
              type="button"
              onClick={() => setPole(choice.value)}
              className={`rounded-full border px-[15px] py-[10px] text-[13.5px] transition-colors ${
                pole === choice.value
                  ? "border-signal bg-signal/[0.18] text-white"
                  : "border-white/[0.13] bg-white/[0.02] text-[#9AA2B4]"
              }`}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-[7px]">
        <span className="text-[13.5px] text-[#9AA2B4]">Votre message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre projet, vos délais et votre budget indicatif."
          className={`${inputClass} resize-y`}
        />
        {state.fieldErrors?.message && (
          <span className="text-[12px] text-amber">{state.fieldErrors.message}</span>
        )}
      </label>

      {state.status === "error" && state.message && (
        <p className="text-[13px] text-amber">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-signal py-[15px] text-[15px] font-semibold text-white shadow-[0_12px_36px_rgba(79,124,255,0.3)] transition-colors hover:bg-[#3D6BFF] disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Envoyer la demande"}
      </button>

      <p className="text-[12.5px] leading-[1.6] text-[#6B7183]">
        Vos informations servent uniquement à répondre à votre demande. Elles ne sont ni cédées
        ni vendues à des tiers.
      </p>
    </form>
  );
}
