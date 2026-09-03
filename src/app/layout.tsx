import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brandyben.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BRANDYBEN - Concevoir, coder, construire.",
    template: "%s — BRANDYBEN",
  },
  description:
    "BRANDYBEN est le studio de deux frères jumeaux à Cotonou : sites, logiciels et applications sur mesure, plans et études techniques du bâtiment.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "BRANDYBEN",
    title: "BRANDYBEN — Concevoir, coder, construire.",
    description:
      "Sites, logiciels et applications sur mesure, plans et études techniques du bâtiment. Studio de deux frères jumeaux à Cotonou.",
    images: [{ url: "/logo-brandyben.png", width: 192, height: 192, alt: "BRANDYBEN" }],
  },
  twitter: {
    card: "summary",
    title: "BRANDYBEN — Concevoir, coder, construire.",
    description:
      "Sites, logiciels et applications sur mesure, plans et études techniques du bâtiment. Studio de deux frères jumeaux à Cotonou.",
    images: ["/logo-brandyben.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${instrumentSans.variable} ${jetBrainsMono.variable} h-full`}>
      <body className="min-h-full bg-ink font-sans text-bone antialiased">{children}</body>
    </html>
  );
}
