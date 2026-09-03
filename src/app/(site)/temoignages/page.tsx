import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Témoignages",
  description: "Les avis sont publiés depuis l'administration, après validation.",
};

export default async function TemoignagesPage() {
  const supabase = await createClient();
  const { data: avis } = await supabase
    .from("testimonials")
    .select("*")
    .eq("statut", "publie")
    .order("created_at", { ascending: false });

  return (
    <div className="box-content mx-auto flex max-w-[1100px] flex-col gap-[clamp(32px,4vw,52px)] px-5 py-[clamp(40px,6vw,84px)] pb-[clamp(64px,8vw,110px)] sm:px-[clamp(20px,4vw,40px)]">
      <Reveal className="flex max-w-[720px] flex-col gap-4">
        <p className="text-[11.5px] uppercase tracking-[0.24em] text-[#5A6072]">Témoignages</p>
        <h1 className="text-[clamp(34px,6vw,64px)] font-bold leading-none tracking-[-0.05em] text-bone">
          Ce que disent nos clients
        </h1>
        <p className="text-[17px] leading-[1.7] text-[#9AA2B4]">
          Les avis sont publiés depuis l&apos;administration, après votre validation.
        </p>
      </Reveal>

      {!avis || avis.length === 0 ? (
        <p className="text-[14px] text-[#8B93A7]">
          Les premiers avis clients seront publiés ici prochainement.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {avis.map((item, i) => (
            <Reveal
              key={item.id}
              delay={(i % 6) * 60}
              className="flex flex-col gap-5 rounded-[22px] border border-white/10 bg-white/[0.028] p-[clamp(26px,3vw,34px)]"
            >
              <div className="text-[15px] tracking-[3px] text-amber" aria-hidden>
                {"★".repeat(item.note ?? 5)}
              </div>
              <p className="text-[16.5px] leading-[1.7] text-[#D4D9E3]">{item.citation}</p>
              <div className="mt-auto flex items-center gap-3">
                <span className="h-10 w-10 shrink-0 rounded-full border border-dashed border-white/[0.18]" />
                <div className="flex flex-col">
                  <p className="text-[15px] font-semibold text-bone">{item.auteur}</p>
                  {item.fonction && (
                    <p className="text-[13px] text-[#6B7183]">{item.fonction}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
