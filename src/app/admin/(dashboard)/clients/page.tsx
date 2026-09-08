import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const supabase = await createClient();

  const [{ data: clients }, { data: projects }] = await Promise.all([
    supabase.from("clients").select("*").order("nom"),
    supabase.from("projects").select("client_id"),
  ]);

  const projectCount = new Map<string, number>();
  for (const p of projects ?? []) {
    if (!p.client_id) continue;
    projectCount.set(p.client_id, (projectCount.get(p.client_id) ?? 0) + 1);
  }

  const visibles = (clients ?? []).filter((c) => c.visible_sur_site).length;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
            Clients
          </h1>
          <p className="mt-1 text-[13.5px] text-cool">
            {(clients ?? []).length} clients · {visibles} affichés sur le site
          </p>
        </div>
        <Link
          href="/admin/clients/nouveau"
          className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white"
        >
          + Nouveau client
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[18px] border border-white/10">
        <table className="w-full min-w-[640px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-white/10 text-[12px] text-cool">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Secteur</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Projets</th>
              <th className="px-5 py-3 font-medium">Visible</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {(clients ?? []).length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-cool">
                  Aucun client pour le moment.
                </td>
              </tr>
            ) : (
              (clients ?? []).map((client) => (
                <tr key={client.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-white/15">
                        {client.logo_url ? (
                          <Image src={client.logo_url} alt="" width={32} height={32} />
                        ) : null}
                      </span>
                      <span className="text-bone">{client.nom}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-cool">{client.secteur ?? "-"}</td>
                  <td className="px-5 py-3 text-cool">{client.email ?? client.contact ?? "-"}</td>
                  <td className="px-5 py-3 text-cool">{projectCount.get(client.id) ?? 0}</td>
                  <td className="px-5 py-3 text-cool">
                    {client.visible_sur_site ? "Oui" : "Non"}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/clients/${client.id}`} className="text-signal">
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
