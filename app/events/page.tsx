import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Instagram, Lantern } from "@/components/art";
import { DaysUntil } from "@/components/DaysUntil";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { postUrl, site } from "@/content/site";
import { listEvents } from "@/lib/content";
import { formatLong, formatShort, isPast, monthDay } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming CCYO events at Laurel Heights, the story so far, and what is on the table next.",
};

const ideas = [
  { zh: "糖葫芦", title: "Tanghulu night", note: "Candied fruit, one pot of sugar, a lot of supervision." },
  { zh: "饺子", title: "Dumpling folding for Lunar New Year", note: "Forty dumplings, five folders, February." },
  { zh: "书法", title: "Calligraphy at lunch", note: "Brush, ink, and one character each to take home." },
  { zh: "灯笼", title: "Lantern making", note: "Red paper, gold tassels, and the poster lantern in real life." },
  { zh: "表演", title: "A community performance", note: "The thing the school listing promises. Watch this space." },
];

export default async function EventsPage() {
  const events = await listEvents();
  const upcoming = events.filter((e) => !isPast(e.date));
  const past = events.filter((e) => isPast(e.date)).reverse();

  const timeline = [
    ...site.posts.map((p) => ({ date: p.date, title: p.caption, kind: "post" as const, href: postUrl(p.id) })),
    ...events.map((e) => ({ date: e.date, title: e.title, kind: "event" as const, href: `/events/${e.slug}` })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <section className="wrap pt-14 lg:pt-20">
        <SectionHeading as="h1" zh="活动" eyebrow="What is on">
          Events
        </SectionHeading>
        <p className="mt-6 max-w-[40rem] text-[19px] leading-relaxed text-ink-soft">
          Everything happens at lunch in {site.meeting.room} unless the page says otherwise. Posts go up on Instagram first, then here with the full details.
        </p>
      </section>

      <section aria-labelledby="upcoming" className="wrap py-14">
        <h2 id="upcoming" className="eyebrow text-vermilion">
          Upcoming
        </h2>
        {upcoming.length ? (
          <ul className="mt-6 space-y-10">
            {upcoming.map((e, i) => {
              const md = monthDay(e.date);
              return (
                <Reveal key={e.slug} as="li" delay={i * 80}>
                  <article className="grid overflow-hidden border-2 border-ink bg-cream shadow-hard md:grid-cols-[260px_1fr]">
                    {e.cover ? (
                      <Link href={`/events/${e.slug}`} className="relative block bg-peach md:border-r-2 md:border-dashed md:border-gold">
                        <Image
                          src={e.cover}
                          alt={e.coverAlt ?? ""}
                          width={e.coverWidth ?? 755}
                          height={e.coverHeight ?? 971}
                          sizes="(min-width: 768px) 260px, 100vw"
                          className="block h-full w-full object-cover md:aspect-auto"
                        />
                      </Link>
                    ) : null}
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="display text-[56px] leading-none text-vermilion">{md.day}</p>
                        <p className="font-heading text-[22px] font-extrabold uppercase tracking-wide">{md.month}</p>
                        <p className="text-[15px] text-ink-soft">
                          {md.weekday} · <DaysUntil date={e.date} />
                        </p>
                      </div>
                      <h3 className="mt-3 text-[30px] md:text-[36px]">
                        <Link href={`/events/${e.slug}`} className="decoration-gold decoration-[3px] hover:underline">
                          {e.title}
                        </Link>
                      </h3>
                      <p className="mt-3 max-w-[38rem] text-[17px] leading-relaxed text-ink-soft">{e.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-heading text-[15px] font-semibold">
                        {e.time ? (
                          <li className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4 text-vermilion" aria-hidden /> {e.time}
                          </li>
                        ) : null}
                        {e.room ? (
                          <li className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-vermilion" aria-hidden /> {e.room}
                          </li>
                        ) : null}
                        {e.cost ? <li className="text-vermilion">{e.cost}</li> : null}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={`/events/${e.slug}`} className="btn btn-primary btn-sm">
                          Event details
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        {e.instagram ? (
                          <a href={postUrl(e.instagram)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                            <Instagram className="h-4 w-4" aria-hidden />
                            The post
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 text-[17px] text-ink-soft">Nothing booked right now. Follow the account, it hears first.</p>
        )}
      </section>

      <section aria-labelledby="story" className="bg-peach py-16 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading id="story" zh="故事" eyebrow="The story so far" size="md">
              Three weeks old and counting
            </SectionHeading>
            <ol className="relative mt-10 border-l-2 border-dashed border-gold pl-8">
              {timeline.map((t) => (
                <li key={`${t.date}-${t.title}`} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-ink bg-gold" aria-hidden />
                  <p className="font-heading text-[13px] font-bold uppercase tracking-[0.14em] text-vermilion">
                    {formatLong(t.date)}
                  </p>
                  {t.kind === "post" ? (
                    <a href={t.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 text-[19px] font-heading font-bold decoration-gold decoration-2 hover:underline">
                      <Instagram className="h-4 w-4 text-ink-soft" aria-hidden />
                      {t.title}
                    </a>
                  ) : (
                    <Link href={t.href} className="mt-1 inline-block text-[19px] font-heading font-bold decoration-gold decoration-2 hover:underline">
                      {t.title}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="hidden justify-center lg:flex">
            <Lantern className="h-64 w-auto origin-top animate-sway" />
          </div>
        </div>
      </section>

      {past.length ? (
        <section aria-labelledby="past" className="wrap py-16">
          <SectionHeading id="past" zh="过去" eyebrow="Archive" size="md">
            Past events
          </SectionHeading>
          <ul className="mt-8 divide-y divide-line">
            {past.map((e) => (
              <li key={e.slug} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4">
                <span className="font-heading text-[14px] font-bold uppercase tracking-[0.12em] text-ink-soft">{formatShort(e.date)}</span>
                <Link href={`/events/${e.slug}`} className="text-[20px] font-heading font-bold decoration-gold decoration-2 hover:underline">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="ideas" className="wrap py-16 lg:py-20">
        <SectionHeading id="ideas" zh="下一步" eyebrow="On the table" size="md">
          Ideas we are working on
        </SectionHeading>
        <p className="mt-4 max-w-[38rem] text-[17px] leading-relaxed text-ink-soft">
          Not booked, not promised, but being planned. Tell us at a meeting which one you want first.
        </p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {ideas.map((idea) => (
            <li key={idea.title} className="grid items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[110px_1fr]">
              <span className="font-sc text-[26px] leading-none text-gold" aria-hidden>
                {idea.zh}
              </span>
              <div>
                <p className="text-[20px] font-heading font-bold">{idea.title}</p>
                <p className="text-[15px] text-ink-soft">{idea.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
