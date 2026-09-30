import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Branch, Cloud, Lantern, Moon } from "@/components/art";
import { DaysUntil } from "@/components/DaysUntil";
import { site } from "@/content/site";
import type { EventItem } from "@/lib/content";

export function Hero({ next }: { next?: EventItem }) {
  return (
    <section className="relative overflow-hidden">
      <Cloud
        className="pointer-events-none absolute -left-72 top-12 hidden w-[300px] text-white opacity-80 animate-drift md:block"
        style={{ "--drift": "140vw" } as React.CSSProperties}
      />
      <Cloud
        className="pointer-events-none absolute -left-96 top-[62%] hidden w-[380px] text-cream-deep opacity-70 animate-drift [animation-delay:-38s] [animation-duration:110s] md:block"
        style={{ "--drift": "150vw" } as React.CSSProperties}
      />

      <div className="wrap relative grid items-center gap-14 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="relative z-10">
          <p className="eyebrow text-vermilion">
            {site.school.short} · {site.school.city}
          </p>
          <h1 className="display mt-5 text-[50px] sm:text-[68px] lg:text-[82px]">
            Chinese Cultural <em className="display-italic text-vermilion">Youth</em> Organization
          </h1>
          <p className="mt-7 max-w-[34rem] text-[20px] leading-relaxed text-ink-soft">{site.tagline}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            {next ? (
              <Link href={`/events/${next.slug}`} className="btn btn-primary">
                Next up: {next.title}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
            <Link href="/join" className="btn btn-ghost">
              Join the club
            </Link>
          </div>

          <p className="mt-7 text-[15px] text-ink-soft">
            We meet {site.meeting.day} {site.meeting.time} in {site.meeting.room}.
            {next ? (
              <>
                {" "}
                {next.title} is <DaysUntil date={next.date} className="font-heading font-bold text-ink" />.
              </>
            ) : null}
          </p>
        </div>

        <div className="relative mx-auto h-[520px] w-full max-w-[460px] sm:h-[560px]">
          <Moon className="absolute -right-8 top-4 w-[380px] animate-spin-slow sm:w-[420px]" title="A full gold moon" />
          <Branch className="absolute -left-10 top-16 z-20 w-[360px]" />
          {next?.cover ? (
            <Link
              href={`/events/${next.slug}`}
              className="tape absolute left-1/2 top-24 z-10 block w-[280px] -translate-x-1/2 -rotate-3 shadow-lift transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-2 hover:rotate-0 sm:w-[310px]"
              aria-label={`${next.title} poster, open event page`}
            >
              <Image
                src={next.cover}
                alt={next.coverAlt ?? `${next.title} poster`}
                width={next.coverWidth ?? 755}
                height={next.coverHeight ?? 971}
                loading="eager"
                fetchPriority="high"
                sizes="310px"
                className="block h-auto w-full border-[6px] border-white"
              />
            </Link>
          ) : null}
          <Lantern className="absolute right-2 top-0 z-30 h-44 w-auto origin-top animate-sway sm:right-6" title="A red paper lantern" />
        </div>
      </div>
    </section>
  );
}
