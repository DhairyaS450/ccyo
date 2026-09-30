import { ArrowDown } from "lucide-react";
import type { Heading } from "@/lib/content";

type Props = {
  headings: Heading[];
  jump?: { href: string; label: string };
};

/** Peach table of contents box, same idea as the recipe site "Jump to" block. */
export function Toc({ headings, jump }: Props) {
  if (!headings.length && !jump) return null;
  return (
    <nav aria-labelledby="toc-title" className="box-peach no-print">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="toc-title" className="text-[20px]">
          On this page
        </h2>
        {jump ? (
          <a href={jump.href} className="btn btn-primary btn-sm">
            <ArrowDown className="h-4 w-4" aria-hidden />
            {jump.label}
          </a>
        ) : null}
      </div>
      {headings.length ? (
        <ol className="mt-4 columns-1 gap-8 sm:columns-2">
          {headings.map((h, i) => (
            <li key={h.id} className="mb-2 break-inside-avoid">
              <a href={`#${h.id}`} className="group flex items-baseline gap-3 font-heading text-[16px] font-semibold">
                <span className="font-display text-[15px] text-vermilion tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="decoration-gold decoration-2 group-hover:underline">{h.text}</span>
                {h.zh ? (
                  <span className="font-sc ml-auto text-[14px] text-gold" aria-hidden>
                    {h.zh}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ol>
      ) : null}
    </nav>
  );
}
