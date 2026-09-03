"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import type { PoleMetier } from "@/lib/supabase/types";

export type EtapeMethode = {
  id: string;
  pole: PoleMetier;
  titre: string;
  description: string | null;
  duree: string | null;
};

const TOGGLE_OPTIONS: { value: PoleMetier; label: string }[] = [
  { value: "dev", label: "Développement web" },
  { value: "batiment", label: "Architecture & bâtiment" },
];

export function MethodSection({ etapes }: { etapes: EtapeMethode[] }) {
  const [pole, setPole] = useState<PoleMetier>("dev");
  const visibles = etapes.filter((e) => e.pole === pole);

  if (etapes.length === 0) return null;

  return (
    <div className="flex flex-col gap-[clamp(28px,4vw,44px)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[640px] flex-col gap-[14px]">
          <p className="text-[11.5px] uppercase tracking-[0.24em] text-[#5A6072]">Méthode</p>
          <h2 className="text-[clamp(28px,4vw,46px)] font-bold leading-[1.05] tracking-[-0.045em] text-bone">
            Comment se déroule un projet
          </h2>
        </div>

        <div className="flex gap-2">
          {TOGGLE_OPTIONS.map((option) => {
            const isActive = pole === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setPole(option.value)}
                className={`rounded-full border px-[15px] py-[9px] text-[13px] transition-colors ${
                  isActive
                    ? option.value === "dev"
                      ? "border-signal bg-signal/[0.18] text-white"
                      : "border-amber bg-amber/[0.18] text-white"
                    : "border-white/[0.13] text-[#9AA2B4]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="text-[14px] text-[#8B93A7]">
          Les étapes de ce pôle seront bientôt publiées.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibles.map((etape, i) => (
            <Reveal
              key={etape.id}
              delay={i * 60}
              className="flex flex-col gap-[10px] border-t border-white/[0.14] pt-5"
            >
              <p className="text-[34px] font-bold tracking-[-0.05em] text-[#252B39]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-[17px] font-semibold text-bone">{etape.titre}</p>
              {etape.description && (
                <p className="text-[14.5px] leading-[1.6] text-[#8B93A7]">{etape.description}</p>
              )}
              {etape.duree && (
                <p className={`text-[12.5px] ${pole === "dev" ? "text-signal" : "text-amber"}`}>
                  {etape.duree}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
