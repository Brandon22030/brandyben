"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SaveState = { status: "idle" | "error"; message?: string };

async function uploadLogo(supabase: Awaited<ReturnType<typeof createClient>>, file: File) {
  const ext = file.name.split(".").pop() ?? "png";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("logos").upload(path, file, {
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("logos").getPublicUrl(path);
  return data.publicUrl;
}

export async function saveClient(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();

  const id = formData.get("id")?.toString();
  const nom = formData.get("nom")?.toString().trim();
  if (!nom) return { status: "error", message: "Le nom du client est obligatoire." };

  const logoFile = formData.get("logo") as File | null;
  let logo_url: string | undefined;
  if (logoFile && logoFile.size > 0) {
    try {
      logo_url = await uploadLogo(supabase, logoFile);
    } catch {
      return { status: "error", message: "Échec de l'envoi du logo." };
    }
  }

  const payload = {
    nom,
    secteur: formData.get("secteur")?.toString() || null,
    ville: formData.get("ville")?.toString() || null,
    contact: formData.get("contact")?.toString() || null,
    email: formData.get("email")?.toString() || null,
    telephone: formData.get("telephone")?.toString() || null,
    site: formData.get("site")?.toString() || null,
    notes_internes: formData.get("notes_internes")?.toString() || null,
    visible_sur_site: formData.get("visible_sur_site") === "on",
    ...(logo_url ? { logo_url } : {}),
  };

  const query =
    id && id !== "nouveau"
      ? supabase.from("clients").update(payload).eq("id", id)
      : supabase.from("clients").insert(payload);

  const { error } = await query;
  if (error) {
    return { status: "error", message: "Erreur lors de l'enregistrement." };
  }

  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

export async function deleteClient(id: string) {
  const supabase = await createClient();
  await supabase.from("clients").delete().eq("id", id);
  revalidatePath("/admin/clients");
}
