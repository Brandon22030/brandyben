"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { StatutDemande } from "@/lib/supabase/types";

export async function updateQuoteStatus(id: string, statut: StatutDemande) {
  const supabase = await createClient();
  await supabase.from("quote_requests").update({ statut }).eq("id", id);
  revalidatePath("/admin/demandes");
}

export async function updateQuoteNote(formData: FormData) {
  const id = formData.get("id")?.toString();
  const note_interne = formData.get("note_interne")?.toString() ?? "";
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("quote_requests").update({ note_interne }).eq("id", id);
  revalidatePath("/admin/demandes");
}
