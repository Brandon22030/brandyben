"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { formatFcfa } from "@/lib/format";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/product-categories";
import type { PoleMetier } from "@/lib/supabase/types";

export type ProductCard = {
  id: string;
  titre: string;
  categorie: PoleMetier;
  prix: number | null;
  description: string | null;
  image_url: string | null;
  chariow_url: string | null;
};

type Filtre = "Tous" | PoleMetier;

export function ProductsCatalog({ products }: { products: ProductCard[] }) {
  const [filter, setFilter] = useState<Filtre>("Tous");
  const filtered = filter === "Tous" ? products : products.filter((p) => p.categorie === filter);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-5">
        <h2 className="text-[32px] font-bold tracking-[-0.04em] text-bone">Tout le catalogue</h2>
        <div className="flex flex-wrap gap-2">
          {(["Tous", "dev", "batiment"] as const).map((value) => {
            const label = value === "Tous" ? "Tous" : PRODUCT_CATEGORY_LABELS[value];
            const isActive = filter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full border px-[15px] py-[9px] text-[13px] transition-colors ${
                  isActive
                    ? "border-signal bg-signal/[0.18] text-white"
                    : "border-white/[0.13] text-[#9AA2B4]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-[22px] text-[14px] text-[#8B93A7]">
          Aucun produit publié dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="mt-[22px] grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <Reveal
              key={product.id}
              delay={(i % 6) * 60}
              className="flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.028]"
            >
              <div className="relative flex h-[170px] items-center justify-center overflow-hidden border-b border-white/[0.08] bg-[radial-gradient(ellipse_at_50%_0%,rgba(79,124,255,0.12),transparent_70%)] bg-[#0B0D13] text-[12.5px] text-[#5A6072]">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.titre}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>Image du produit</span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-[9px] p-5">
                <span
                  className={`text-[11px] uppercase tracking-[0.16em] ${
                    product.categorie === "batiment" ? "text-amber" : "text-signal"
                  }`}
                >
                  {PRODUCT_CATEGORY_LABELS[product.categorie]}
                </span>
                <p className="text-[18px] font-bold leading-[1.25] tracking-[-0.03em] text-bone">
                  {product.titre}
                </p>
                {product.description && (
                  <p className="text-[13.5px] leading-[1.6] text-[#8B93A7]">
                    {product.description}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <p className="text-[19px] font-bold tracking-[-0.03em] text-bone">
                    {formatFcfa(product.prix)}
                  </p>
                  {product.chariow_url ? (
                    <a
                      href={product.chariow_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap rounded-full border border-white/[0.16] px-[18px] py-[10px] text-[13px] font-semibold text-bone"
                    >
                      Acheter sur Chariow ↗
                    </a>
                  ) : (
                    <span className="whitespace-nowrap text-[12px] text-[#6B7183]">
                      Bientôt disponible
                    </span>
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
