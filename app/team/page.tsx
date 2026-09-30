import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TeamDesktop } from "@/components/TeamDesktop";
import { site } from "@/content/site";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: `Meet the ${site.season} CCYO exec: ${team.map((m) => m.name).join(", ")}.`,
};

export default function TeamPage() {
  return (
    <>
      <section className="wrap grid items-center gap-10 py-14 lg:grid-cols-[1fr_300px] lg:py-20">
        <div>
          <p className="eyebrow text-vermilion">
            <span className="font-sc mr-2 text-[15px]" aria-hidden>
              团队
            </span>
            The {site.season} exec
          </p>
          <h1 className="display-italic mt-4 text-[64px] leading-none text-ink sm:text-[88px] lg:text-[112px]">Meet the team</h1>
          <p className="mt-2 font-pixel text-[20px] font-extrabold text-water-deep sm:text-[24px]">Chinese Cultural Youth Organization</p>
          <p className="mt-6 max-w-[36rem] text-[18px] leading-relaxed text-ink-soft">
            Five people, one Google Classroom, and a lot of group chats. Drag the windows around, close the ones you are done with, and bring anyone back from the bar at the bottom.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-heading text-[15px] font-bold">
            {team.map((m) => (
              <li key={m.slug}>
                <a href={`#${m.slug}`} className="decoration-gold decoration-2 hover:underline">
                  {m.name.split(" ")[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="tape relative mx-auto w-[220px] -rotate-2 shadow-lift sm:w-[260px]">
          <Image
            src="/team/cover.webp"
            alt="Meet the Team carousel cover with pixel goldfish over blue water."
            width={1440}
            height={1777}
            sizes="260px"
            loading="eager"
            fetchPriority="high"
            className="block h-auto w-full border-[6px] border-white"
          />
        </div>
      </section>

      <section aria-label="Team desktop" className="wrap pb-10">
        <TeamDesktop team={team} />
      </section>

      <section className="wrap py-14">
        <div className="box-peach flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-vermilion">Join the exec</p>
            <p className="mt-2 max-w-[40rem] text-[17px] leading-relaxed">
              Applications for next year open in the spring. Until then the best way in is to come to meetings and help run an event. Ask {site.leads[0]} or {site.leads[1]}.
            </p>
          </div>
          <Link href="/join" className="btn btn-primary shrink-0">
            How to join
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
