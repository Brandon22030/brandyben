import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const STATIC_ROUTES = [
  "",
  "/a-propos",
  "/services",
  "/realisations",
  "/temoignages",
  "/blog",
  "/contact",
  "/mentions-legales",
  "/conditions-generales",
  "/politique-confidentialite",
  "/reclamation",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brandyben.com";
  const supabase = await createClient();

  const [{ data: projects }, { data: posts }] = await Promise.all([
    supabase.from("projects").select("slug, created_at").eq("statut", "publie"),
    supabase.from("posts").select("slug, published_at").eq("statut", "publie"),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${base}${route}`,
  }));

  const projectEntries: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${base}/realisations/${p.slug}`,
    lastModified: p.created_at,
  }));

  const postEntries: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.published_at ?? undefined,
  }));

  return [...staticEntries, ...projectEntries, ...postEntries];
}
