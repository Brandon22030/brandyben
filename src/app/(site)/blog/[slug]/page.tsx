import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 300;

async function getPost(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("statut", "publie")
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.titre, description: post.extrait ?? undefined };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const meta = [
    post.published_at
      ? `Publié le ${new Date(post.published_at).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`
      : null,
    post.auteur,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="box-content mx-auto max-w-[1000px] px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <Link href="/blog" className="text-[13px] text-cool hover:text-bone">
        ← Blog
      </Link>

      <div className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.028] p-7 sm:p-9 md:p-[60px] md:py-9">
        {meta && <p className="text-[12.5px] text-[#6B7183]">{meta}</p>}

        <h1 className="mt-3 font-sans text-[30px] font-bold leading-[1.06] tracking-[-0.045em] text-bone md:text-[38px]">
          {post.titre}
        </h1>

        {post.couverture ? (
          <div className="relative mt-[22px] h-[180px] overflow-hidden rounded-xl border border-white/10">
            <Image src={post.couverture} alt={post.titre} fill className="object-cover" />
          </div>
        ) : (
          <div className="mt-[22px] flex h-[180px] items-center justify-center rounded-xl border border-dashed border-white/[0.14] text-[13px] text-[#5A6072]">
            Image de couverture
          </div>
        )}

        {post.contenu ? (
          <div className="mt-[22px] max-w-[70ch] whitespace-pre-line text-[16px] leading-[1.85] text-[#B4BCCC]">
            {post.contenu}
          </div>
        ) : (
          <p className="mt-[22px] max-w-[70ch] text-[16px] leading-[1.85] text-[#B4BCCC]">
            {post.extrait}
          </p>
        )}
      </div>
    </div>
  );
}
