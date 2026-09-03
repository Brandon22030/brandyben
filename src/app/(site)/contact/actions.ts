"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validations/contact";
import { createClient } from "@/lib/supabase/server";
import { sendQuoteNotification } from "@/lib/email";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_REQUESTS = 3;

export async function submitQuoteRequest(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Champ leurre : un vrai visiteur ne le voit ni ne le remplit jamais.
  if (formData.get("entreprise")) {
    return { status: "success" };
  }

  const raw = {
    nom: formData.get("nom")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    telephone: formData.get("telephone")?.toString() ?? "",
    pole: formData.get("pole")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Vérifiez les champs du formulaire.",
      fieldErrors,
    };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";

  const supabase = await createClient();

  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("quote_requests")
    .select("id", { count: "exact", head: true })
    .eq("email", parsed.data.email)
    .gte("created_at", since);

  if ((count ?? 0) >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      status: "error",
      message: "Trop de demandes envoyées récemment. Réessayez dans quelques minutes.",
    };
  }

  const { error } = await supabase.from("quote_requests").insert({
    nom: parsed.data.nom,
    email: parsed.data.email,
    telephone: parsed.data.telephone || null,
    pole: parsed.data.pole,
    message: parsed.data.message,
  });

  if (error) {
    console.error("Erreur d'insertion quote_requests :", error, "IP :", ip);
    return {
      status: "error",
      message: "Une erreur est survenue. Réessayez ou écrivez-nous directement par e-mail.",
    };
  }

  await sendQuoteNotification({
    nom: parsed.data.nom,
    email: parsed.data.email,
    telephone: parsed.data.telephone || null,
    pole: parsed.data.pole,
    message: parsed.data.message,
  });

  return {
    status: "success",
    message: "Merci, votre demande a bien été envoyée. Nous revenons vers vous sous 24 h ouvrées.",
  };
}
