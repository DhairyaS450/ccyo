"use client";

import { CalendarPlus, ExternalLink, Printer } from "lucide-react";
import { LanternMark } from "@/components/art";
import { buildIcs, googleCalendarUrl, type CalendarEvent } from "@/lib/calendar";
import { formatLong, monthDay } from "@/lib/dates";

type Props = {
  title: string;
  summary: string;
  date: string;
  time?: string;
  start?: string;
  end?: string;
  room?: string;
  location?: string;
  bring?: string[];
  cost?: string;
  url: string;
};

/**
 * The event equivalent of a recipe card: everything you need, boxed, at the
 * bottom of the page. Add to calendar builds a real .ics file in the browser.
 */
export function EventCard(props: Props) {
  const { title, summary, date, time, start, end, room, location, bring, cost, url } = props;
  const md = monthDay(date);
  const calEvent: CalendarEvent = {
    title: `CCYO: ${title}`,
    description: `${summary}${time ? ` ${time}.` : ""} ${url}`,
    location: location ?? room,
    date,
    start,
    end,
    url,
  };

  function downloadIcs() {
    const blob = new Blob([buildIcs(calEvent)], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `ccyo-${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  }

  return (
    <section id="event-card" aria-labelledby="event-card-title" className="scroll-mt-24 border-2 border-ink bg-cream shadow-hard">
      <div className="flex items-center gap-3 border-b-2 border-ink bg-vermilion px-5 py-3 text-cream">
        <LanternMark className="h-6 w-auto" />
        <p className="eyebrow">Event card</p>
        {cost ? <p className="ml-auto font-heading text-[13px] font-bold uppercase tracking-[0.14em]">{cost}</p> : null}
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[150px_1fr] md:gap-8 md:p-7">
        <div className="flex flex-row items-center gap-4 md:flex-col md:items-start md:border-r-2 md:border-dashed md:border-gold md:pr-6">
          <p className="display text-[72px] leading-none text-vermilion md:text-[84px]">{md.day}</p>
          <div>
            <p className="font-heading text-2xl font-extrabold uppercase tracking-wide">{md.month}</p>
            <p className="text-[15px] text-ink-soft">{md.weekday}</p>
          </div>
        </div>

        <div>
          <h2 id="event-card-title" className="text-[28px]">
            {title}
          </h2>
          <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{summary}</p>

          <dl className="mt-5 grid gap-x-8 gap-y-3 text-[17px] sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-vermilion">When</dt>
              <dd className="mt-1 font-heading font-semibold">
                {formatLong(date)}
                {time ? <span className="block text-ink-soft">{time}</span> : null}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-vermilion">Where</dt>
              <dd className="mt-1 font-heading font-semibold">{location ?? room ?? "TBA"}</dd>
            </div>
            {bring?.length ? (
              <div className="sm:col-span-2">
                <dt className="eyebrow text-vermilion">Bring</dt>
                <dd className="mt-1">
                  <ul className="space-y-1">
                    {bring.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="no-print mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={downloadIcs} className="btn btn-primary btn-sm">
              <CalendarPlus className="h-4 w-4" aria-hidden />
              Add to calendar
            </button>
            <a
              href={googleCalendarUrl(calEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Google Calendar
            </a>
            <button type="button" onClick={() => window.print()} className="btn btn-ghost btn-sm">
              <Printer className="h-4 w-4" aria-hidden />
              Print
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
