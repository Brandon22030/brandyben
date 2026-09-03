import { createClient } from "@/lib/supabase/server";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function NewTestimonialPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select("id, nom").order("nom");
  return <TestimonialForm clients={clients ?? []} />;
}
