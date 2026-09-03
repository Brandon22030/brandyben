"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SaveState = { status: "idle" | "error"; message?: string };

export async function saveTestimonial(
  _prevState: SaveState,
  formData: FormData
): Promise<SaveState> {
  const supabase = await createClient();

  const id = formData.get("id")?.toString();
  const auteur = formData.get("auteur")?.toString().trim();
  const citation = formData.get("citation")?.toString().trim();
  if (!auteur || !citation) {
    return { status: "error", message: "Le nom du client et la citation sont obligatoires." };
  }

  const photoFile = formData.get("photo") as File | null;
  let photo_url: string | undefined;
  if (photoFile && photoFile.size > 0) {
    const ext = photoFile.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("logos").upload(path, photoFile, {
      contentType: photoFile.type,
    });
    if (error) return { status: "error", message: "Échec de l'envoi de la photo." };
    photo_url = supabase.storage.from("logos").getPublicUrl(path).data.publicUrl;
  }

  const clientId = formData.get("client_id")?.toString();

  const payload = {
    auteur,
    citation,
    client_id: clientId || null,
    fonction: formData.get("fonction")?.toString() || null,
    note: Number(formData.get("note")) || 5,
    statut: formData.get("statut")?.toString() as "brouillon" | "publie",
    ...(photo_url ? { photo_url } : {}),
  };

  const query =
    id && id !== "nouveau"
      ? supabase.from("testimonials").update(payload).eq("id", id)
      : supabase.from("testimonials").insert(payload);

  const { error } = await query;
  if (error) return { status: "error", message: "Erreur lors de l'enregistrement." };

  revalidatePath("/admin/temoignages");
  revalidatePath("/temoignages");
  redirect("/admin/temoignages");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/temoignages");
  revalidatePath("/temoignages");
}
