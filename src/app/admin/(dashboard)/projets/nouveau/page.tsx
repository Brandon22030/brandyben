import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/project-form";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select("id, nom").order("nom");

  return <ProjectForm clients={clients ?? []} />;
}
