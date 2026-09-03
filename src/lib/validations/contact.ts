import { z } from "zod";

export const contactSchema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom complet."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  telephone: z.string().trim().optional().or(z.literal("")),
  pole: z.enum(["dev", "batiment", "indetermine"], { message: "Sélectionnez un pôle." }),
  message: z.string().trim().min(10, "Décrivez votre projet en quelques mots."),
});

export type ContactInput = z.infer<typeof contactSchema>;
