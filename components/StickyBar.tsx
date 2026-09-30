"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Instagram, LanternMark } from "@/components/art";
import { NAV } from "@/content/nav";
import { site } from "@/content/site";

export function StickyBar() {
  const pathname = usePathname();
  /** The menu is open only for the path it was opened on, so navigating closes it. */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-vermilion text-cream shadow-[0_2px_0_0_var(--color-deep)]">
      <div className="wrap flex h-14 items-center gap-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${site.short} home`}>
          <LanternMark className="h-7 w-auto origin-top transition-transform duration-500 group-hover:rotate-6" />
          <span className="font-heading text-[19px] font-extrabold tracking-tight">{site.short}</span>
          <span className="hidden font-heading text-[13px] font-medium tracking-wide text-cream/85 xl:inline">
            Chinese Cultural Youth Organization
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group relative px-3 py-2 font-heading text-[13px] font-bold uppercase tracking-[0.16em]"
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-3 right-3 h-[3px] origin-left rounded-full bg-gold transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 hidden items-center gap-2 rounded-full border-2 border-cream/70 px-3 py-1.5 font-heading text-[13px] font-bold transition-colors hover:bg-cream hover:text-vermilion md:inline-flex"
        >
          <Instagram className="h-4 w-4" strokeWidth={2.25} />
          <span>@{site.instagram.handle}</span>
        </a>

        <button
          type="button"
          onClick={() => setOpenedAt(open ? null : pathname)}
          className="ml-auto inline-flex items-center gap-2 rounded-full border-2 border-cream/70 px-3 py-1.5 font-heading text-[13px] font-bold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-cream text-ink md:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex flex-col py-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between border-b border-line py-5"
            >
              <span className="display text-[40px]">{item.label}</span>
              <span className="font-sc text-2xl text-gold" aria-hidden>
                {item.zh}
              </span>
            </Link>
          ))}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-8 self-start"
          >
            <Instagram className="h-4 w-4" />
            Follow @{site.instagram.handle}
          </a>
          <p className="mt-8 text-[15px] leading-relaxed text-ink-soft">
            We meet {site.meeting.day} {site.meeting.time} in {site.meeting.room}, {site.school.name}.
          </p>
        </nav>
      </div>
    </header>
  );
}
