import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: testimonial }, { data: clients }] = await Promise.all([
    supabase.from("testimonials").select("*").eq("id", id).single(),
    supabase.from("clients").select("id, nom").order("nom"),
  ]);
  if (!testimonial) notFound();

  return <TestimonialForm testimonial={testimonial} clients={clients ?? []} />;
}
