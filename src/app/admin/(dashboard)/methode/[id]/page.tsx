import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MethodEtapeForm } from "@/components/admin/method-etape-form";

export default async function EditEtapeMethodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: etape } = await supabase
    .from("etapes_methode")
    .select("*")
    .eq("id", id)
    .single();
  if (!etape) notFound();

  return <MethodEtapeForm etape={etape} />;
}
