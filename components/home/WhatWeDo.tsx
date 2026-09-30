import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Lantern, Mooncake, Ribbon } from "@/components/art";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const rows = [
  {
    zh: "活动",
    title: "Events",
    href: "/events",
    body: "Mid-Autumn, Lunar New Year, and whatever else we can talk the school into. Big lunches with food, a story, and something to take home. Everyone at Laurel Heights is welcome, not just members.",
    art: <Lantern className="h-52 w-auto origin-top animate-sway" title="Lantern" />,
  },
  {
    zh: "工坊",
    title: "Workshops",
    href: "/workshops",
    body: "Hands on. Mooncakes, tanghulu, dumplings, calligraphy. You leave with the thing you made and a recipe on this site so you can do it again at home.",
    art: <Mooncake className="w-48 animate-bob" title="Mooncake" />,
  },
  {
    zh: "表演",
    title: "Performances",
    href: "/about",
    body: "The reason the school lists us as the Chinese Cultural Club: we practise on Tuesdays and perform at community events around Waterloo. Dancers, singers and people who just want to hold a lantern all count.",
    art: <Ribbon className="w-64" title="Dance ribbon" />,
  },
];

export function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do" className="wrap py-20 lg:py-28">
      <SectionHeading id="what-we-do" zh="我们" eyebrow="What we do">
        Three things, done properly
      </SectionHeading>

      <ol className="mt-12">
        {rows.map((row, i) => {
          const flipped = i % 2 === 1;
          const zh = (
            <p className={`font-sc text-[72px] leading-none text-gold md:text-[96px] ${flipped ? "md:text-right" : ""}`} aria-hidden>
              {row.zh}
            </p>
          );
          const art = <div className={`flex justify-center ${flipped ? "md:justify-start" : "md:justify-end"}`}>{row.art}</div>;
          return (
            <Reveal key={row.title} as="li" delay={i * 60} className="border-t-2 border-dashed border-gold py-12 last:border-b-2">
              <div
                className={`grid items-center gap-8 ${
                  flipped ? "md:grid-cols-[260px_1fr_120px]" : "md:grid-cols-[120px_1fr_260px]"
                }`}
              >
                {flipped ? art : zh}
                <div>
                  <p className="font-display text-[15px] font-bold text-vermilion">0{i + 1}</p>
                  <h3 className="mt-1 text-[30px] md:text-[36px]">{row.title}</h3>
                  <p className="mt-3 max-w-[36rem] text-[18px] leading-relaxed text-ink-soft">{row.body}</p>
                  <Link
                    href={row.href}
                    className="mt-4 inline-flex items-center gap-2 font-heading text-[15px] font-bold text-vermilion hover:underline"
                  >
                    See {row.title.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                {flipped ? zh : art}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
