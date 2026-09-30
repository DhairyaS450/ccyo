import Link from "next/link";
import { Cloud, Instagram, Lantern } from "@/components/art";
import { NAV } from "@/content/nav";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-deep text-cream">
      <Cloud className="pointer-events-none absolute -right-10 top-6 w-[320px] text-cream opacity-[0.07]" />
      <Cloud className="pointer-events-none absolute -left-24 bottom-4 w-[260px] text-cream opacity-[0.06]" />
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex gap-5">
          <Lantern className="h-24 w-auto shrink-0 origin-top animate-sway" />
          <div>
            <p className="font-heading text-2xl font-extrabold tracking-tight">{site.short}</p>
            <p className="mt-1 font-heading text-[15px] font-semibold text-cream/85">{site.name}</p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-cream/75">
              {site.school.name}, {site.school.city}. Listed at school as the {site.school.listingName}.
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="text-[15px]">
          <p className="eyebrow text-gold">Pages</p>
          <ul className="mt-4 space-y-2 font-heading font-semibold">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="decoration-gold decoration-2 hover:underline">
                  {n.label}
                </Link>
                <span className="font-sc ml-2 text-gold/80" aria-hidden>
                  {n.zh}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-[15px]">
          <p className="eyebrow text-gold">Find us</p>
          <ul className="mt-4 space-y-2 text-cream/85">
            <li>
              {site.meeting.day} {site.meeting.time}, {site.meeting.room}
            </li>
            <li>
              Google Classroom code{" "}
              <span className="font-heading font-bold tracking-widest text-cream">{site.classroomCode}</span>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-heading font-bold decoration-gold decoration-2 hover:underline"
              >
                <Instagram className="h-4 w-4" aria-hidden />@{site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="wrap flex flex-col gap-2 py-5 text-[13px] text-cream/65 md:flex-row md:items-center md:justify-between">
          <p>
            Made by the {site.season} exec. Student led, since {site.founded}.
          </p>
          <p>
            <span className="font-sc text-gold/90" aria-hidden>
              中秋节快乐
            </span>
            <span className="sr-only">Happy Mid-Autumn Festival.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
