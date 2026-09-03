import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { HairlineGrid, HairlineCell } from "@/components/hairline-grid";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Un article par mois suffit à faire progresser le site dans les résultats de recherche.",
};

function formatDate(iso: string | null) {
  if (!iso) return "À publier";
  return new Date(iso)
    .toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
    .toUpperCase();
}

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("posts")
    .select("id, titre, slug, extrait, published_at")
    .eq("statut", "publie")
    .order("published_at", { ascending: false });

  return (
    <div className="box-content mx-auto flex max-w-[1000px] flex-col gap-[clamp(32px,4vw,48px)] px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <Reveal className="flex max-w-[720px] flex-col gap-4">
        <p className="text-[11.5px] uppercase tracking-[0.24em] text-[#5A6072]">Blog</p>
        <h1 className="text-[clamp(34px,6vw,64px)] font-bold leading-none tracking-[-0.05em] text-bone">
          Conseils et actualités
        </h1>
        <p className="text-[17px] leading-[1.7] text-[#9AA2B4]">
          Un article par mois suffit à faire progresser le site dans les résultats de
          recherche.
        </p>
      </Reveal>

      {!articles || articles.length === 0 ? (
        <p className="text-[14px] text-[#8B93A7]">
          Le premier article sera publié prochainement.
        </p>
      ) : (
        <Reveal>
          <HairlineGrid className="grid-cols-1" rounded="20px">
            {articles.map((article) => (
              <HairlineCell key={article.id} className="transition-colors hover:bg-[#0F1218]">
                <Link
                  href={`/blog/${article.slug}`}
                  className="flex flex-wrap items-baseline gap-[26px] p-[30px]"
                >
                  <span className="min-w-[110px] text-[12.5px] uppercase tracking-[0.08em] text-[#5A6072]">
                    {formatDate(article.published_at)}
                  </span>
                  <span className="flex min-w-[240px] flex-1 flex-col gap-[9px]">
                    <span className="text-[21px] font-bold tracking-[-0.03em] text-bone">
                      {article.titre}
                    </span>
                    {article.extrait && (
                      <span className="text-[15px] leading-[1.6] text-[#8B93A7]">
                        {article.extrait}
                      </span>
                    )}
                  </span>
                </Link>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Reveal>
      )}
    </div>
  );
}
