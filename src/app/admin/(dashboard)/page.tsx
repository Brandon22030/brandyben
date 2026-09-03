import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PoleBadge, StatutDemandeBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

function startOfMonthIso() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

function shortDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
    .replace(".", "");
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: demandesCeMois },
    { count: devisEnAttente },
    { count: projetsPublies },
    { count: projetsBrouillons },
    { count: clientsTotal },
    { count: clientsVisibles },
    { data: dernieresDemandes },
    { data: settings },
    { count: temoignagesPublies },
    { count: demandesNouvelles },
  ] = await Promise.all([
    supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfMonthIso()),
    supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("statut", "devis_envoye"),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("statut", "publie"),
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("statut", "brouillon"),
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase
      .from("clients")
      .select("id", { count: "exact", head: true })
      .eq("visible_sur_site", true),
    supabase
      .from("quote_requests")
      .select("id, nom, message, pole, statut, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.from("settings").select("rccm").eq("id", 1).single(),
    supabase
      .from("testimonials")
      .select("id", { count: "exact", head: true })
      .eq("statut", "publie"),
    supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("statut", "nouveau"),
  ]);

  const kpis = [
    {
      label: "Demandes ce mois",
      value: demandesCeMois ?? 0,
      delta: "sur la table quote_requests",
    },
    { label: "Devis en attente", value: devisEnAttente ?? 0, delta: "à relancer" },
    {
      label: "Projets publiés",
      value: projetsPublies ?? 0,
      delta: `${projetsBrouillons ?? 0} brouillon${(projetsBrouillons ?? 0) > 1 ? "s" : ""}`,
    },
    {
      label: "Clients",
      value: clientsTotal ?? 0,
      delta: `${clientsVisibles ?? 0} visibles sur le site`,
    },
  ];

  const todos: string[] = [];
  if ((projetsBrouillons ?? 0) > 0) {
    todos.push(
      `${projetsBrouillons} projet${(projetsBrouillons ?? 0) > 1 ? "s" : ""} en brouillon à publier`
    );
  }
  if ((demandesNouvelles ?? 0) > 0) {
    todos.push(
      `${demandesNouvelles} nouvelle${(demandesNouvelles ?? 0) > 1 ? "s" : ""} demande${
        (demandesNouvelles ?? 0) > 1 ? "s" : ""
      } à traiter`
    );
  }
  if (!settings?.rccm) {
    todos.push("Compléter le numéro RCCM dans Paramètres dès délivrance");
  }
  if ((temoignagesPublies ?? 0) === 0) {
    todos.push("Publier un premier témoignage client");
  }

  const showRappelLegal = new Date() <= new Date("2026-11-01");

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-sans text-[26px] font-bold tracking-[-0.03em] text-bone">
            Tableau de bord
          </h1>
          <p className="mt-1 text-[13.5px] capitalize text-cool">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            target="_blank"
            className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold text-bone"
          >
            Voir le site
          </Link>
          <Link
            href="/admin/projets/nouveau"
            className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white"
          >
            Nouveau projet
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-[18px] border border-white/10 bg-white/[0.028] p-5">
            <p className="text-[12.5px] text-cool">{kpi.label}</p>
            <p className="mt-2 font-sans text-[28px] font-bold tracking-[-0.03em] text-bone">
              {kpi.value}
            </p>
            <p className="mt-1 text-[12px] text-cool/70">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[20px] border border-white/10 bg-white/[0.028] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-[16px] font-semibold text-bone">
              Dernières demandes de devis
            </h2>
            <Link href="/admin/demandes" className="text-[13px] text-signal">
              Tout voir
            </Link>
          </div>

          <div className="mt-4 divide-y divide-white/10">
            {!dernieresDemandes || dernieresDemandes.length === 0 ? (
              <p className="py-6 text-[13.5px] text-cool">Aucune demande pour le moment.</p>
            ) : (
              dernieresDemandes.map((d) => (
                <Link
                  key={d.id}
                  href="/admin/demandes"
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-bone">{d.nom}</p>
                    <p className="truncate text-[12.5px] text-cool">{d.message}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <PoleBadge pole={d.pole} />
                    <StatutDemandeBadge statut={d.statut} />
                    <span className="w-14 text-right text-[12px] text-cool">
                      {shortDate(d.created_at)}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[20px] border border-white/10 bg-white/[0.028] p-6">
            <h2 className="font-sans text-[16px] font-semibold text-bone">À faire</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {todos.length === 0 ? (
                <li className="text-[13.5px] text-cool">Rien à signaler pour le moment.</li>
              ) : (
                todos.map((todo) => (
                  <li key={todo} className="flex items-start gap-2.5 text-[13.5px] text-bone">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20" />
                    {todo}
                  </li>
                ))
              )}
            </ul>
          </div>

          {showRappelLegal && (
            <div className="rounded-[20px] border border-amber/[0.28] bg-amber/[0.07] p-6">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-amber">
                Rappel légal
              </p>
              <p className="mt-2 text-[13.5px] text-amber/90">
                Casier judiciaire à déposer au tribunal avant le 01-11-2026. Numéro RCCM à
                reporter dans les mentions légales dès délivrance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
