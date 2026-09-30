import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Instagram, Lantern } from "@/components/art";
import { CopyCode } from "@/components/CopyCode";
import { DaysUntil } from "@/components/DaysUntil";
import { site } from "@/content/site";
import { listEvents } from "@/lib/content";
import { formatShort, isPast } from "@/lib/dates";

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-2 border-ink pt-4">
      <h2 className="eyebrow text-vermilion">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Right rail, in the spirit of the reference site: upcoming, follow, join, meeting info. */
export async function SideRail({ currentSlug }: { currentSlug?: string }) {
  const events = (await listEvents()).filter((e) => !isPast(e.date));

  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      <Widget title="Upcoming">
        {events.length ? (
          <ul className="space-y-4">
            {events.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/events/${e.slug}`}
                  aria-current={e.slug === currentSlug ? "page" : undefined}
                  className="group block"
                >
                  <p className="font-heading text-[18px] font-bold leading-tight decoration-gold decoration-2 group-hover:underline">
                    {e.title}
                  </p>
                  <p className="mt-1 text-[14px] text-ink-soft">
                    {formatShort(e.date)}
                    {e.room ? ` · ${e.room}` : ""} · <DaysUntil date={e.date} />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[15px] text-ink-soft">Nothing on the calendar yet. Instagram hears first.</p>
        )}
      </Widget>

      <Widget title="Meetings">
        <p className="font-heading text-[18px] font-bold leading-tight">
          {site.meeting.day} {site.meeting.time}
        </p>
        <p className="mt-1 text-[15px] text-ink-soft">
          {site.meeting.room}, {site.school.name}
        </p>
      </Widget>

      <Widget title="Follow us">
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <Image
            src="/posts/profile.jpg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border-2 border-ink"
          />
          <span>
            <span className="block font-heading text-[16px] font-bold decoration-gold decoration-2 group-hover:underline">
              @{site.instagram.handle}
            </span>
            <span className="flex items-center gap-1 text-[14px] text-ink-soft">
              <Instagram className="h-3.5 w-3.5" aria-hidden /> Instagram
            </span>
          </span>
        </a>
      </Widget>

      <Widget title="Join">
        <p className="text-[15px] leading-relaxed">Google Classroom code</p>
        <CopyCode code={site.classroomCode} className="mt-2" />
        <Link href="/join" className="mt-4 inline-flex items-center gap-2 font-heading text-[15px] font-bold text-vermilion hover:underline">
          How to join <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Widget>

      <div className="hidden justify-center pt-4 lg:flex">
        <Lantern className="h-28 w-auto origin-top animate-sway" />
      </div>
    </aside>
  );
}
