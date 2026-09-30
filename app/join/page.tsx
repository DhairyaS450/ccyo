import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Instagram, Lantern, Moon } from "@/components/art";
import { CopyCode } from "@/components/CopyCode";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Join",
  description: `How to join CCYO at ${site.school.name}: the Google Classroom code, the Instagram, and where we meet.`,
};

export default function JoinPage() {
  return (
    <div className="wrap grid gap-14 py-12 lg:grid-cols-[minmax(0,736px)_1fr] lg:gap-20 lg:py-16">
      <div>
        <SectionHeading as="h1" zh="加入" eyebrow="Takes a minute">
          Join CCYO
        </SectionHeading>
        <p className="mt-6 max-w-[38rem] text-[19px] leading-relaxed text-ink-soft">
          No forms, no fees, no audition. Membership is being in the Classroom and turning up when you can. Here is the whole thing.
        </p>

        <ol className="mt-12 space-y-12">
          <li className="grid gap-4 sm:grid-cols-[72px_1fr]">
            <span className="display text-[56px] leading-none text-vermilion">1</span>
            <div>
              <h2 className="text-[26px]">Join the Google Classroom</h2>
              <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">
                Open Classroom with your school account, choose Join class, and paste this code. Announcements, sign-ups and slides live there.
              </p>
              <CopyCode code={site.classroomCode} size="lg" className="mt-4" />
            </div>
          </li>

          <li className="grid gap-4 sm:grid-cols-[72px_1fr]">
            <span className="display text-[56px] leading-none text-vermilion">2</span>
            <div>
              <h2 className="text-[26px]">Follow the account</h2>
              <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">
                Posters go up on Instagram first. It is also where you find out what the exec had for dessert.
              </p>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
                <Instagram className="h-4 w-4" aria-hidden />@{site.instagram.handle}
              </a>
            </div>
          </li>

          <li className="grid gap-4 sm:grid-cols-[72px_1fr]">
            <span className="display text-[56px] leading-none text-vermilion">3</span>
            <div>
              <h2 className="text-[26px]">Come on a Tuesday</h2>
              <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">
                {site.meeting.day} {site.meeting.time} in {site.meeting.room}. Bring your lunch. First-timers get pointed at a seat and asked what their favourite dessert is.
              </p>
            </div>
          </li>

          {site.signupFormUrl ? (
            <li className="grid gap-4 sm:grid-cols-[72px_1fr]">
              <span className="display text-[56px] leading-none text-vermilion">4</span>
              <div>
                <h2 className="text-[26px]">Fill in the sign-up form</h2>
                <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">One minute, so we know how many mooncakes to make.</p>
                <a href={site.signupFormUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Open the form
                </a>
              </div>
            </li>
          ) : null}
        </ol>

        <div className="box-peach mt-14">
          <p className="eyebrow text-vermilion">Want to help run it?</p>
          <p className="mt-2 text-[17px] leading-relaxed">
            The exec always needs hands: someone to run a station, someone with a camera, someone who makes good slides. Say so at a meeting or DM the account. Exec applications for next year open in the spring.
          </p>
          <Link href="/team" className="mt-3 inline-flex items-center gap-2 font-heading text-[15px] font-bold text-vermilion hover:underline">
            Meet the current exec <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="relative hidden min-h-[520px] lg:block">
        <Moon className="absolute right-0 top-8 w-[320px]" title="Full moon" />
        <Lantern className="absolute left-6 top-0 h-56 w-auto origin-top animate-sway" title="Red lantern" />
        <Lantern className="absolute left-40 top-24 h-40 w-auto origin-top animate-sway [animation-delay:-2s]" />
        <p className="font-sc absolute bottom-10 right-4 text-[120px] leading-none text-gold/40" aria-hidden>
          欢迎
        </p>
      </div>
    </div>
  );
}
