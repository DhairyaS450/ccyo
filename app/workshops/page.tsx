import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Dumpling, Lantern, Mooncake, Tanghulu } from "@/components/art";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { listWorkshops, type WorkshopFrontmatter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Recipes and how-tos from CCYO workshops: snow skin mooncakes, tanghulu, dumplings and more.",
};

function Art({ kind }: { kind: WorkshopFrontmatter["art"] }) {
  switch (kind) {
    case "tanghulu":
      return <Tanghulu className="h-40 w-auto" />;
    case "dumpling":
      return <Dumpling className="w-44" />;
    case "lantern":
      return <Lantern className="h-40 w-auto" />;
    default:
      return <Mooncake className="w-36" />;
  }
}

export default async function WorkshopsPage() {
  const workshops = await listWorkshops();
  return (
    <>
      <section className="wrap pt-14 lg:pt-20">
        <SectionHeading as="h1" zh="工坊" eyebrow="Make it at home">
          Workshops
        </SectionHeading>
        <p className="mt-6 max-w-[40rem] text-[19px] leading-relaxed text-ink-soft">
          Every workshop we run gets written up here with amounts you can scale, so the thing you made at lunch is the thing you can make again on Sunday.
        </p>
      </section>

      <section className="wrap py-14">
        <ol>
          {workshops.map((w, i) => (
            <Reveal key={w.slug} as="li" delay={i * 60} className="border-t-2 border-dashed border-gold py-10 last:border-b-2">
              <Link href={`/workshops/${w.slug}`} className="group grid items-center gap-8 md:grid-cols-[180px_1fr_auto]">
                <div className="flex justify-center transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:rotate-3">
                  <Art kind={w.art} />
                </div>
                <div>
                  <p className="font-display text-[15px] font-bold text-vermilion">0{i + 1}</p>
                  <h2 className="mt-1 text-[30px] decoration-gold decoration-[3px] group-hover:underline md:text-[36px]">{w.title}</h2>
                  <p className="mt-3 max-w-[36rem] text-[17px] leading-relaxed text-ink-soft">{w.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-heading text-[14px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                    {w.difficulty ? <li>{w.difficulty}</li> : null}
                    {w.time ? <li>{w.time}</li> : null}
                    {w.recipe ? (
                      <li>
                        Makes {w.recipe.yields} {w.recipe.yieldLabel}
                      </li>
                    ) : null}
                  </ul>
                </div>
                <ArrowRight className="hidden h-7 w-7 text-vermilion transition-transform group-hover:translate-x-1 md:block" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
