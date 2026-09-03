"use client";

import { useActionState } from "react";
import { inviteUser, type InviteState } from "@/app/admin/(dashboard)/parametres/actions";
import { fieldClass } from "@/components/admin/ui";

const initialState: InviteState = { status: "idle" };

export function InviteUserForm() {
  const [state, formAction, pending] = useActionState(inviteUser, initialState);

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="bennett@brandyben.com"
        className={`${fieldClass} flex-1`}
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-white/15 px-4 py-2.5 text-[13px] font-semibold text-bone disabled:opacity-60"
      >
        {pending ? "Envoi…" : "+ Inviter un utilisateur"}
      </button>
      {state.message && (
        <p className={`text-[12px] ${state.status === "error" ? "text-amber" : "text-signal"} sm:self-center`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
