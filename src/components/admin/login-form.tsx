"use client";

import { useActionState, useState, useTransition } from "react";
import { signIn, sendMagicLink, sendPasswordReset, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = { status: "idle" };

const inputClass =
  "w-full rounded-[10px] border border-white/[0.13] bg-white/[0.03] px-3.5 py-3 text-[14px] text-bone placeholder:text-[#5A6072] outline-none focus:border-signal/60";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const [email, setEmail] = useState("");
  const [secondary, setSecondary] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] text-cool">E-mail</span>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@brandyben.com"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] text-cool">Mot de passe</span>
        <input
          type="password"
          name="password"
          required
          placeholder="••••••••••"
          className={inputClass}
        />
      </label>

      {state.status === "error" && state.message && (
        <p className="text-[13px] text-amber">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full rounded-full bg-signal py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_36px_rgba(79,124,255,0.3)] disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>

      <div className="mt-2 flex items-center justify-center gap-2 text-[12.5px] text-cool">
        <button
          type="button"
          className="hover:text-bone"
          onClick={() =>
            startTransition(async () => {
              const res = await sendMagicLink(email);
              setSecondary(res.message);
            })
          }
        >
          Lien de connexion par e-mail
        </button>
        <span>·</span>
        <button
          type="button"
          className="hover:text-bone"
          onClick={() =>
            startTransition(async () => {
              const res = await sendPasswordReset(email);
              setSecondary(res.message);
            })
          }
        >
          Mot de passe oublié
        </button>
      </div>

      {(isPending || secondary) && (
        <p className="text-center text-[12.5px] text-cool">
          {isPending ? "Envoi…" : secondary}
        </p>
      )}
    </form>
  );
}
