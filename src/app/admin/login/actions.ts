"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function signIn(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { status: "error", message: "Renseignez votre e-mail et votre mot de passe." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { status: "error", message: "E-mail ou mot de passe incorrect." };
  }

  redirect("/admin");
}

export async function sendMagicLink(email: string): Promise<{ ok: boolean; message: string }> {
  if (!email) return { ok: false, message: "Saisissez votre e-mail ci-dessus." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) return { ok: false, message: "Impossible d'envoyer le lien pour le moment." };
  return { ok: true, message: "Lien de connexion envoyé par e-mail." };
}

export async function sendPasswordReset(email: string): Promise<{ ok: boolean; message: string }> {
  if (!email) return { ok: false, message: "Saisissez votre e-mail ci-dessus." };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) return { ok: false, message: "Impossible d'envoyer l'e-mail pour le moment." };
  return { ok: true, message: "E-mail de réinitialisation envoyé." };
}
