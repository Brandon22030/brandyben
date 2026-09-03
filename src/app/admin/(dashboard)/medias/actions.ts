"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteMedia(bucket: "logos" | "projects", path: string) {
  const supabase = await createClient();
  await supabase.storage.from(bucket).remove([path]);
  revalidatePath("/admin/medias");
}
