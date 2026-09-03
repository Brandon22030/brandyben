"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SaveState = { status: "idle" | "error"; message?: string };

export async function saveEtapeMethode(
  _prevState: SaveState,
  formData: FormData
): Promise<SaveState> {
  const supabase = await createClient();

  const id = formData.get("id")?.toString();
  const titre = formData.get("titre")?.toString().trim();
  if (!titre) return { status: "error", message: "Le titre est obligatoire." };

  const payload = {
    pole: formData.get("pole")?.toString() as "dev" | "batiment",
    titre,
    description: formData.get("description")?.toString() || null,
    duree: formData.get("duree")?.toString() || null,
    ordre: Number(formData.get("ordre")) || 0,
  };

  const query =
    id && id !== "nouveau"
      ? supabase.from("etapes_methode").update(payload).eq("id", id)
      : supabase.from("etapes_methode").insert(payload);

  const { error } = await query;
  if (error) return { status: "error", message: "Erreur lors de l'enregistrement." };

  revalidatePath("/admin/methode");
  revalidatePath("/");
  redirect("/admin/methode");
}

export async function deleteEtapeMethode(id: string) {
  const supabase = await createClient();
  await supabase.from("etapes_methode").delete().eq("id", id);
  revalidatePath("/admin/methode");
  revalidatePath("/");
}
