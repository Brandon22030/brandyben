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

export async function savePost(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();

  const id = formData.get("id")?.toString();
  const titre = formData.get("titre")?.toString().trim();
  if (!titre) return { status: "error", message: "Le titre est obligatoire." };

  const slugInput = formData.get("slug")?.toString().trim();
  const slug = slugify(slugInput || titre);
  const statut = formData.get("statut")?.toString() as "brouillon" | "publie";

  const coverFile = formData.get("couverture") as File | null;
  let couverture: string | undefined;
  if (coverFile && coverFile.size > 0) {
    const ext = coverFile.name.split(".").pop() ?? "jpg";
    const path = `posts/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("projects").upload(path, coverFile, {
      contentType: coverFile.type,
    });
    if (error) return { status: "error", message: "Échec de l'envoi de l'image de couverture." };
    couverture = supabase.storage.from("projects").getPublicUrl(path).data.publicUrl;
  }

  let published_at: string | null | undefined;
  if (statut === "publie") {
    if (id && id !== "nouveau") {
      const { data: existing } = await supabase
        .from("posts")
        .select("published_at")
        .eq("id", id)
        .single();
      published_at = existing?.published_at ?? new Date().toISOString();
    } else {
      published_at = new Date().toISOString();
    }
  } else {
    published_at = null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const payload = {
    titre,
    slug,
    extrait: formData.get("extrait")?.toString() || null,
    contenu: formData.get("contenu")?.toString() || null,
    auteur:
      formData.get("auteur")?.toString() ||
      (user?.user_metadata?.full_name as string | undefined) ||
      user?.email ||
      null,
    statut,
    published_at,
    ...(couverture ? { couverture } : {}),
  };

  const query =
    id && id !== "nouveau"
      ? supabase.from("posts").update(payload).eq("id", id)
      : supabase.from("posts").insert(payload);

  const { error } = await query;
  if (error) {
    return {
      status: "error",
      message: error.code === "23505" ? "Ce slug existe déjà." : "Erreur lors de l'enregistrement.",
    };
  }

  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  redirect("/admin/articles");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
}
