"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { saveProduct, type SaveState } from "@/app/admin/(dashboard)/produits/actions";
import { AdminCard, Field, Select, fieldClass } from "@/components/admin/ui";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/product-categories";
import type { Database } from "@/lib/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

const initialState: SaveState = { status: "idle" };

export function ProductForm({ product }: { product?: Product }) {
  const [state, formAction, pending] = useActionState(saveProduct, initialState);
  const router = useRouter();
  const isNew = !product;

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={product?.id ?? "nouveau"} />

      <div className="flex items-center justify-between gap-4">
        <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">
          {isNew ? "Ajouter un produit" : "Modifier le produit"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/produits")}
            className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold text-bone"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-signal px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Enregistrement…" : "Enregistrer et publier"}
          </button>
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p className="mt-4 text-[13px] text-amber">{state.message}</p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <AdminCard>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Titre du produit" span2>
              <input
                name="titre"
                required
                defaultValue={product?.titre}
                placeholder="Le Guide pour créer des sites pro..."
                className={fieldClass}
              />
            </Field>
            <Field label="Catégorie">
              <Select name="categorie" defaultValue={product?.categorie ?? "dev"}>
                <option value="dev">{PRODUCT_CATEGORY_LABELS.dev}</option>
                <option value="batiment">{PRODUCT_CATEGORY_LABELS.batiment}</option>
              </Select>
            </Field>
            <Field label="Statut">
              <Select name="statut" defaultValue={product?.statut ?? "brouillon"}>
                <option value="brouillon">Brouillon</option>
                <option value="publie">Publié</option>
              </Select>
            </Field>
            <Field label="Prix (FCFA)">
              <input
                type="number"
                name="prix"
                min={0}
                defaultValue={product?.prix ?? ""}
                placeholder="5000"
                className={fieldClass}
              />
            </Field>
            <Field label="Prix barré (avant promo, optionnel)">
              <input
                type="number"
                name="prix_avant_promo"
                min={0}
                defaultValue={product?.prix_avant_promo ?? ""}
                placeholder="10000"
                className={fieldClass}
              />
            </Field>
            <Field label="Description courte" span2>
              <textarea
                name="description"
                defaultValue={product?.description ?? ""}
                rows={3}
                placeholder="Une phrase qui résume la promesse du produit."
                className={`${fieldClass} resize-none`}
              />
            </Field>
            <Field label="Badges (séparés par une virgule)" span2>
              <input
                name="badges"
                defaultValue={product?.badges?.join(", ") ?? ""}
                placeholder="E-book PDF, Niveau débutant, Mise à jour incluse"
                className={fieldClass}
              />
            </Field>
            <Field label="Lien Chariow" span2>
              <input
                type="url"
                name="chariow_url"
                defaultValue={product?.chariow_url ?? ""}
                placeholder="https://brandyben.mychariow.shop/prd_..."
                className={fieldClass}
              />
            </Field>
            <Field label="Ordre d'affichage">
              <input
                type="number"
                name="ordre"
                defaultValue={product?.ordre ?? 0}
                className={fieldClass}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard title="Image du produit">
          <p className="mb-3 text-[12px] text-cool">
            Image affichée sur la card du catalogue public.
          </p>
          {product?.image_url && (
            <div className="relative mb-3 aspect-video overflow-hidden rounded-lg border border-white/10">
              <Image src={product.image_url} alt="" fill className="object-cover" />
            </div>
          )}
          <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[14px] border border-dashed border-white/15 py-8 text-center">
            <input type="file" name="image" accept="image/*" className="hidden" />
            <span className="text-[13.5px] text-bone">Glisser une image ou parcourir</span>
          </label>
        </AdminCard>
      </div>
    </form>
  );
}
