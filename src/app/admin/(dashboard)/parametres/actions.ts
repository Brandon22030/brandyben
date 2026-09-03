"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type SaveState = { status: "idle" | "success" | "error"; message?: string };

export async function saveSettings(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();

  const payload = {
    rccm: formData.get("rccm")?.toString() || null,
    ifu: formData.get("ifu")?.toString() || null,
    adresse: formData.get("adresse")?.toString() || null,
    hebergeur: formData.get("hebergeur")?.toString() || null,
    telephone: formData.get("telephone")?.toString() || null,
    email: formData.get("email")?.toString() || null,
    horaires: formData.get("horaires")?.toString() || null,
  };

  const { error } = await supabase.from("settings").update(payload).eq("id", 1);
  if (error) return { status: "error", message: "Erreur lors de l'enregistrement." };

  revalidatePath("/", "layout");
  return { status: "success", message: "Paramètres enregistrés." };
}

export type InviteState = { status: "idle" | "success" | "error"; message?: string };

export async function inviteUser(_prevState: InviteState, formData: FormData): Promise<InviteState> {
  const email = formData.get("email")?.toString().trim();
  if (!email) return { status: "error", message: "Saisissez une adresse e-mail." };

  const admin = createAdminClient();
  if (!admin) {
    return {
      status: "error",
      message: "SUPABASE_SERVICE_ROLE_KEY absente : invitation impossible depuis l'admin.",
    };
  }

  const { error } = await admin.auth.admin.inviteUserByEmail(email);
  if (error) return { status: "error", message: "Échec de l'invitation." };

  return { status: "success", message: `Invitation envoyée à ${email}.` };
}
