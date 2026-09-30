import { Hero } from "@/components/home/Hero";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import { JoinBand } from "@/components/home/JoinBand";
import { NextEvent } from "@/components/home/NextEvent";
import { TeamStrip } from "@/components/home/TeamStrip";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Marquee } from "@/components/Marquee";
import { listEvents } from "@/lib/content";
import { formatShort, isPast } from "@/lib/dates";

export default async function HomePage() {
  const events = await listEvents();
  const next = events.find((e) => !isPast(e.date)) ?? events.at(-1);

  const ticker = next
    ? ["中秋节", next.title, formatShort(next.date), next.time ?? "", next.room ?? "", "Everyone welcome", "Bring a friend"].filter(Boolean)
    : ["中秋节", "Chinese Cultural Youth Organization", "Tuesdays at lunch", "Room 2700"];

  return (
    <>
      <Hero next={next} />
      <Marquee items={ticker} />
      {next ? <NextEvent event={next} /> : null}
      <WhatWeDo />
      <TeamStrip />
      <InstagramStrip />
      <JoinBand />
    </>
  );
}
