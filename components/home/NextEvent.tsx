import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Mooncake } from "@/components/art";
import { Reveal } from "@/components/Reveal";
import type { EventItem } from "@/lib/content";
import { monthDay } from "@/lib/dates";

export function NextEvent({ event }: { event: EventItem }) {
  const md = monthDay(event.date);
  return (
    <section aria-labelledby="next-event" className="relative overflow-hidden bg-peach">
      <span className="zh-watermark -right-6 -top-10" aria-hidden>
        月
      </span>
      <div className="wrap relative grid items-center gap-10 py-16 md:grid-cols-[auto_1fr_auto] md:gap-14 lg:py-20">
        <Reveal className="flex justify-center">
          <Mooncake className="w-44 animate-bob md:w-52" title="A snow skin mooncake" />
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow text-vermilion">Next event</p>
          <h2 id="next-event" className="mt-2 text-[34px] md:text-[44px]">
            {event.title}
          </h2>
          <p className="mt-3 max-w-[38rem] text-[18px] leading-relaxed text-ink-soft">{event.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-heading text-[15px] font-semibold">
            {event.time ? (
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-vermilion" aria-hidden /> {event.time}
              </li>
            ) : null}
            {event.room ? (
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-vermilion" aria-hidden /> {event.room}
              </li>
            ) : null}
            {event.cost ? <li className="inline-flex items-center gap-2 text-vermilion">{event.cost}</li> : null}
          </ul>
          <Link href={`/events/${event.slug}`} className="btn btn-primary mt-7">
            Everything about the day
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={160} className="md:text-right">
          <p className="display text-[110px] leading-none text-vermilion md:text-[150px]">{md.day}</p>
          <p className="font-heading text-[26px] font-extrabold uppercase tracking-wide">{md.month}</p>
          <p className="text-[15px] text-ink-soft">{md.weekday}</p>
        </Reveal>
      </div>
    </section>
  );
}
