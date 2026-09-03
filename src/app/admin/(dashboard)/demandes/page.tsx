import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PoleBadge, StatutDemandeBadge } from "@/components/admin/ui";
import { QuoteStatusButtons } from "@/components/admin/quote-status-buttons";
import { ArchiveQuoteButton } from "@/components/admin/archive-quote-button";
import { updateQuoteNote } from "./actions";
import type { StatutDemande } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const FILTERS: { label: string; value: StatutDemande | "tous" }[] = [
  { label: "Tous", value: "tous" },
  { label: "Nouvelles", value: "nouveau" },
  { label: "En cours", value: "en_cours" },
  { label: "Devis envoyé", value: "devis_envoye" },
  { label: "Gagnées", value: "gagne" },
  { label: "Perdues", value: "perdu" },
  { label: "Archivées", value: "archive" },
];

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; filtre?: string }>;
}) {
  const { id, filtre = "nouveau" } = await searchParams;
  const supabase = await createClient();

  const { data: demandes } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const filtered =
    filtre === "tous"
      ? demandes ?? []
      : (demandes ?? []).filter((d) => d.statut === filtre);

  const selected = id
    ? (demandes ?? []).find((d) => d.id === id)
    : filtered[0] ?? (demandes ?? [])[0];

  return (
    <div>
      <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
        Demandes de devis
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Link
                key={f.value}
                href={`/admin/demandes?filtre=${f.value}`}
                className={`rounded-full border px-3 py-1.5 text-[12px] ${
                  filtre === f.value
                    ? "border-signal bg-signal/[0.18] text-bone"
                    : "border-white/[0.13] text-cool"
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {filtered.length === 0 ? (
              <p className="rounded-[14px] border border-white/10 p-4 text-[13px] text-cool">
                Aucune demande dans cette catégorie.
              </p>
            ) : (
              filtered.map((d) => (
                <Link
                  key={d.id}
                  href={`/admin/demandes?id=${d.id}&filtre=${filtre}`}
                  className={`rounded-[14px] border p-4 ${
                    selected?.id === d.id
                      ? "border-signal/40 bg-signal/[0.08]"
                      : "border-white/10 bg-white/[0.028]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="truncate text-[13.5px] font-medium text-bone">{d.nom}</p>
                    <span className="shrink-0 text-[11.5px] text-cool">
                      {shortDate(d.created_at)}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[12.5px] text-cool">{d.message}</p>
                  <div className="mt-2 flex gap-1.5">
                    <PoleBadge pole={d.pole} />
                    <StatutDemandeBadge statut={d.statut} />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div>
          {!selected ? (
            <div className="flex h-full items-center justify-center rounded-[20px] border border-white/10 p-10 text-[13.5px] text-cool">
              Sélectionnez une demande.
            </div>
          ) : (
            <div className="rounded-[20px] border border-white/10 bg-white/[0.028] p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h2 className="font-sans text-[19px] font-bold text-bone">{selected.nom}</h2>
                  <p className="mt-1 text-[13px] text-cool">
                    {selected.email}
                    {selected.telephone ? ` · ${selected.telephone}` : ""} · reçue le{" "}
                    {new Date(selected.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <ArchiveQuoteButton id={selected.id} />
                  <a
                    href={`mailto:${selected.email}`}
                    className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white"
                  >
                    Répondre
                  </a>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <PoleBadge pole={selected.pole} />
                <StatutDemandeBadge statut={selected.statut} />
              </div>

              <div className="mt-5 rounded-[14px] border border-white/10 bg-[#0A0C11] p-5 text-[14px] leading-relaxed text-cool">
                {selected.message}
              </div>

              <div className="mt-8">
                <h3 className="font-sans text-[15px] font-semibold text-bone">Suivi interne</h3>
                <div className="mt-3">
                  <QuoteStatusButtons id={selected.id} current={selected.statut} />
                </div>

                <form action={updateQuoteNote} className="mt-4">
                  <input type="hidden" name="id" value={selected.id} />
                  <textarea
                    name="note_interne"
                    defaultValue={selected.note_interne ?? ""}
                    rows={3}
                    placeholder="Note interne (visible seulement par vous deux)…"
                    className="w-full resize-none rounded-[10px] border border-white/[0.13] bg-white/[0.03] px-3.5 py-3 text-[13.5px] text-bone placeholder:text-[#5A6072] outline-none focus:border-signal/60"
                  />
                  <button
                    type="submit"
                    className="mt-2 rounded-full border border-white/15 px-4 py-2 text-[12.5px] font-semibold text-bone"
                  >
                    Enregistrer la note
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
