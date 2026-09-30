import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Goldfish, LanternMark } from "@/components/art";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/content/site";
import { team } from "@/content/team";

export function TeamStrip() {
  return (
    <section aria-labelledby="team-strip" className="wrap py-8">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <SectionHeading id="team-strip" zh="团队" eyebrow={`The ${site.season} exec`}>
          {team.map((m) => m.name.split(" ")[0]).join(", ").replace(/, ([^,]*)$/, " and $1")}
        </SectionHeading>
        <Link href="/team" className="btn btn-ghost mb-2">
          Meet the team
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <Reveal className="relative mt-10 overflow-hidden border-2 border-ink shadow-hard">
        <div className="water dither relative h-24 md:h-28">
          <Goldfish className="absolute bottom-6 left-[12%] w-16 md:w-20" title="Pixel goldfish" />
          <Goldfish className="absolute bottom-10 right-[18%] w-10 -scale-x-100 md:w-12" />
          <p className="absolute right-4 top-3 font-pixel text-[15px] font-extrabold text-navy md:text-[18px]">
            Chinese Cultural Youth Organization
          </p>
        </div>
        <div className="taskbar flex flex-wrap items-center gap-2 px-2 py-2">
          <span className="task-btn is-active">
            <LanternMark className="h-4 w-auto text-vermilion" />
            CCYO
          </span>
          <span className="mx-1 hidden h-6 w-px bg-ink/30 sm:block" aria-hidden />
          {team.map((m) => (
            <Link key={m.slug} href={`/team#${m.slug}`} className="task-btn hover:bg-white">
              <span className="font-sc text-vermilion" aria-hidden>
                {m.character}
              </span>
              {m.name}
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
