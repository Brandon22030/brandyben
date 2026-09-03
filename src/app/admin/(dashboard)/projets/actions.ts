"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SaveState = { status: "idle" | "error"; message?: string };

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveProject(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();

  const id = formData.get("id")?.toString();
  const titre = formData.get("titre")?.toString().trim();
  if (!titre) return { status: "error", message: "Le titre est obligatoire." };

  const slugInput = formData.get("slug")?.toString().trim();
  const slug = slugify(slugInput || titre);

  const existingImages = JSON.parse(formData.get("existing_images")?.toString() || "[]") as string[];
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  const uploadedUrls: string[] = [];
  for (const file of files) {
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("projects").upload(path, file, {
      contentType: file.type,
    });
    if (error) return { status: "error", message: "Échec de l'envoi d'une image." };
    uploadedUrls.push(supabase.storage.from("projects").getPublicUrl(path).data.publicUrl);
  }

  const clientId = formData.get("client_id")?.toString();

  const payload = {
    titre,
    slug,
    client_id: clientId || null,
    pole: formData.get("pole")?.toString() as "dev" | "batiment",
    resume: formData.get("resume")?.toString() || null,
    contenu: formData.get("contenu")?.toString() || null,
    lien: formData.get("lien")?.toString() || null,
    statut: formData.get("statut")?.toString() as "brouillon" | "publie",
    ordre: Number(formData.get("ordre")) || 0,
    images: [...existingImages, ...uploadedUrls],
  };

  const query =
    id && id !== "nouveau"
      ? supabase.from("projects").update(payload).eq("id", id)
      : supabase.from("projects").insert(payload);

  const { error } = await query;
  if (error) {
    return {
      status: "error",
      message: error.code === "23505" ? "Ce slug existe déjà." : "Erreur lors de l'enregistrement.",
    };
  }

  revalidatePath("/admin/projets");
  revalidatePath("/realisations");
  redirect("/admin/projets");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projets");
  revalidatePath("/realisations");
}
