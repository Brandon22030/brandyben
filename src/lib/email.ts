import { Resend } from "resend";
import type { Pole } from "@/lib/supabase/types";

export async function sendQuoteNotification(quote: {
  nom: string;
  email: string;
  telephone: string | null;
  pole: Pole;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL ?? "brandonmedehou2203@gmail.com";
  const from = process.env.RESEND_FROM_EMAIL ?? "BRANDYBEN <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("RESEND_API_KEY absente : notification e-mail non envoyée.");
    return;
  }

  const resend = new Resend(apiKey);
  const poleLabels: Record<Pole, string> = {
    dev: "Développement web & informatique",
    batiment: "Architecture & BTP",
    indetermine: "Je ne sais pas encore",
  };
  const pole = poleLabels[quote.pole];

  try {
    await resend.emails.send({
      from,
      to,
      subject: `Nouvelle demande de devis - ${quote.nom}`,
      text: [
        `Nom : ${quote.nom}`,
        `E-mail : ${quote.email}`,
        `Téléphone : ${quote.telephone || "-"}`,
        `Pôle concerné : ${pole}`,
        "",
        quote.message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Échec de l'envoi de la notification e-mail :", error);
  }
}
