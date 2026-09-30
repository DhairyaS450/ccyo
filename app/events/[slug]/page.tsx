import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, MapPin } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { SideRail } from "@/components/SideRail";
import { Toc } from "@/components/Toc";
import { Figure } from "@/mdx-components";
import { site } from "@/content/site";
import { getEvent, headingsFor, listEvents } from "@/lib/content";
import { formatLong } from "@/lib/dates";

export const dynamicParams = false;

export async function generateStaticParams() {
  const events = await listEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  const { title, summary, cover } = event.frontmatter;
  return {
    title,
    description: summary,
    openGraph: cover ? { images: [{ url: cover }] } : undefined,
  };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const { Content, frontmatter: fm } = event;
  const headings = await headingsFor("events", slug);
  const url = `${site.url}/events/${slug}`;

  return (
    <div className="wrap editorial py-12 lg:py-16">
      <article>
        <p className="eyebrow text-vermilion">
          <span className="font-sc mr-2 text-[15px]" aria-hidden>
            活动
          </span>
          Event
        </p>
        <h1 className="mt-3 text-[40px] md:text-[52px]">{fm.title}</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-ink-soft">{fm.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-heading text-[15px] font-semibold">
          <li>{formatLong(fm.date)}</li>
          {fm.time ? (
            <li className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-vermilion" aria-hidden /> {fm.time}
            </li>
          ) : null}
          {fm.room ? (
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-vermilion" aria-hidden /> {fm.room}
            </li>
          ) : null}
        </ul>

        {fm.cover ? (
          <div className="mt-8">
            <Figure src={fm.cover} alt={fm.coverAlt ?? fm.title} width={fm.coverWidth ?? 1200} height={fm.coverHeight ?? 800} eager />
          </div>
        ) : null}

        <div className="mt-8">
          <Toc headings={headings} jump={{ href: "#event-card", label: "Jump to event card" }} />
        </div>

        <div className="longform mt-10">
          <Content />
        </div>

        <div className="mt-14">
          <EventCard
            title={fm.title}
            summary={fm.summary}
            date={fm.date}
            time={fm.time}
            start={fm.start}
            end={fm.end}
            room={fm.room}
            location={fm.location}
            bring={fm.bring}
            cost={fm.cost}
            url={url}
          />
        </div>
      </article>

      <SideRail currentSlug={slug} />
    </div>
  );
}
