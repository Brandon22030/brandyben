import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatutContenuBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
            Articles
          </h1>
          <p className="mt-1 text-[13.5px] text-cool">{(articles ?? []).length} articles</p>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white"
        >
          + Nouvel article
        </Link>
      </div>

      {(articles ?? []).length === 0 ? (
        <p className="mt-8 text-[13.5px] text-cool">Aucun article pour le moment.</p>
      ) : (
        <div className="mt-6 divide-y divide-white/10 rounded-[18px] border border-white/10">
          {(articles ?? []).map((article) => (
            <div key={article.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-bone">{article.titre}</p>
                <p className="truncate text-[12.5px] text-cool">{article.extrait}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatutContenuBadge statut={article.statut} />
                <Link href={`/admin/articles/${article.id}`} className="text-[12.5px] text-signal">
                  Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
