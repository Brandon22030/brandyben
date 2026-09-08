"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SaveState = { status: "idle" | "error"; message?: string };

function parseBadges(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);
}

function parsePrix(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const n = Number(raw.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function saveProduct(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();

  const id = formData.get("id")?.toString();
  const titre = formData.get("titre")?.toString().trim();
  if (!titre) return { status: "error", message: "Le titre est obligatoire." };

  const imageFile = formData.get("image") as File | null;
  let image_url: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop() ?? "jpg";
    const path = `products/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("projects").upload(path, imageFile, {
      contentType: imageFile.type,
    });
    if (error) return { status: "error", message: "Échec de l'envoi de l'image." };
    image_url = supabase.storage.from("projects").getPublicUrl(path).data.publicUrl;
  }

  const payload = {
    titre,
    categorie: formData.get("categorie")?.toString() as "dev" | "batiment",
    prix: parsePrix(formData.get("prix")?.toString()),
    prix_avant_promo: parsePrix(formData.get("prix_avant_promo")?.toString()),
    description: formData.get("description")?.toString() || null,
    badges: parseBadges(formData.get("badges")?.toString()),
    chariow_url: formData.get("chariow_url")?.toString() || null,
    statut: formData.get("statut")?.toString() as "brouillon" | "publie",
    ordre: Number(formData.get("ordre")) || 0,
    ...(image_url ? { image_url } : {}),
  };

  const query =
    id && id !== "nouveau"
      ? supabase.from("products").update(payload).eq("id", id)
      : supabase.from("products").insert(payload);

  const { error } = await query;
  if (error) return { status: "error", message: "Erreur lors de l'enregistrement." };

  revalidatePath("/admin/produits");
  revalidatePath("/produits");
  redirect("/admin/produits");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/produits");
  revalidatePath("/produits");
}
