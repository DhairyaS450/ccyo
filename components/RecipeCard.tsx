"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import { LanternMark } from "@/components/art";
import type { Recipe } from "@/lib/content";

const FRACTIONS: Record<string, string> = { "0.25": "¼", "0.5": "½", "0.75": "¾" };

/** Format a scaled amount: whole numbers stay whole, spoons round to quarters. */
function fmt(amount: number, unit?: string) {
  const spoon = unit === "tsp" || unit === "tbsp";
  const v = spoon ? Math.round(amount * 4) / 4 : amount;
  if (Number.isInteger(v)) return String(v);
  if (spoon) {
    const whole = Math.floor(v);
    const frac = FRACTIONS[String(v - whole)] ?? "";
    return whole ? `${whole}${frac}` : frac;
  }
  return v < 10 ? v.toFixed(1).replace(/\.0$/, "") : String(Math.round(v));
}

export function RecipeCard({ title, recipe }: { title: string; recipe: Recipe }) {
  const [factor, setFactor] = useState(1);
  const options = [0.5, 1, 2];
  const yields = recipe.yields * factor;

  return (
    <section id="recipe" aria-labelledby="recipe-title" className="scroll-mt-24 border-2 border-ink bg-cream shadow-hard">
      <div className="flex items-center gap-3 border-b-2 border-ink bg-vermilion px-5 py-3 text-cream">
        <LanternMark className="h-6 w-auto" />
        <p className="eyebrow">Recipe card</p>
        <button type="button" onClick={() => window.print()} className="no-print ml-auto inline-flex items-center gap-2 font-heading text-[13px] font-bold uppercase tracking-[0.14em] hover:underline">
          <Printer className="h-4 w-4" aria-hidden />
          Print
        </button>
      </div>

      <div className="p-5 md:p-7">
        <h2 id="recipe-title" className="text-[28px]">
          {title}
        </h2>

        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
          <div>
            <dt className="eyebrow text-vermilion">Prep</dt>
            <dd className="font-heading font-semibold">{recipe.prep}</dd>
          </div>
          <div>
            <dt className="eyebrow text-vermilion">Cook</dt>
            <dd className="font-heading font-semibold">{recipe.cook}</dd>
          </div>
          {recipe.rest ? (
            <div>
              <dt className="eyebrow text-vermilion">Rest</dt>
              <dd className="font-heading font-semibold">{recipe.rest}</dd>
            </div>
          ) : null}
          <div>
            <dt className="eyebrow text-vermilion">Makes</dt>
            <dd className="font-heading font-semibold">
              {fmt(yields)} {recipe.yieldLabel}
            </dd>
          </div>
        </dl>

        <div className="no-print mt-5 flex flex-wrap items-center gap-3 border-y border-line py-3">
          <span className="font-heading text-[14px] font-bold uppercase tracking-[0.14em]">Scale</span>
          <div role="group" aria-label="Batch size" className="inline-flex overflow-hidden rounded-full border-2 border-ink">
            {options.map((o) => {
              const active = o === factor;
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFactor(o)}
                  className={`px-4 py-1.5 font-heading text-[14px] font-bold transition-colors ${
                    active ? "bg-ink text-cream" : "hover:bg-peach"
                  }`}
                >
                  {fmt(recipe.yields * o)}
                </button>
              );
            })}
          </div>
          <span className="text-[14px] text-ink-soft">{recipe.yieldLabel}</span>
        </div>

        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h3 className="text-[20px]">Ingredients</h3>
            {recipe.ingredients.map((group, gi) => (
              <div key={gi} className="mt-4">
                {group.group ? <p className="eyebrow text-vermilion">{group.group}</p> : null}
                <ul className="mt-2 space-y-2 text-[17px] leading-snug">
                  {group.items.map((ing, i) => (
                    <li key={i} className="flex gap-3 border-b border-line pb-2">
                      <span className="min-w-[64px] font-heading font-bold tabular-nums">
                        {ing.amount != null ? `${fmt(ing.amount * factor, ing.unit)}${ing.unit ? ` ${ing.unit}` : ""}` : ""}
                      </span>
                      <span>
                        {ing.item}
                        {ing.note ? <span className="block text-[14px] text-ink-soft">{ing.note}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="longform">
            <h3 className="text-[20px]">Method</h3>
            <ol>
              {recipe.steps.map((step, i) => (
                <li key={i} className="text-[17px] leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
