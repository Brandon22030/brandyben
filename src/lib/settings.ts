import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getSettings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  return data;
});
