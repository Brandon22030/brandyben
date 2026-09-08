import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatutContenuBadge } from "@/components/admin/ui";
import { formatFcfa } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*").order("ordre");

  const publies = (products ?? []).filter((p) => p.statut === "publie").length;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
            Produits digitaux
          </h1>
          <p className="mt-1 text-[13.5px] text-cool">
            {(products ?? []).length} produits · {publies} publié{publies > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white"
        >
          + Nouveau produit
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[18px] border border-white/10">
        <table className="w-full min-w-[560px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.1em] text-cool">
              <th className="px-5 py-3 font-medium">Produit</th>
              <th className="px-5 py-3 font-medium">Prix</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {(products ?? []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-cool">
                  Aucun produit pour le moment.
                </td>
              </tr>
            ) : (
              (products ?? []).map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-3 text-bone">{product.titre}</td>
                  <td className="px-5 py-3 text-cool">{formatFcfa(product.prix)}</td>
                  <td className="px-5 py-3">
                    <StatutContenuBadge statut={product.statut} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/produits/${product.id}`} className="text-signal">
                      Éditer
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
