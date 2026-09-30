import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cloud, Instagram } from "@/components/art";
import { CopyCode } from "@/components/CopyCode";
import { site } from "@/content/site";

export function JoinBand() {
  return (
    <section aria-labelledby="join-band" className="relative overflow-hidden bg-vermilion text-cream">
      <Cloud className="pointer-events-none absolute -left-16 -top-6 w-[280px] text-cream opacity-10" />
      <Cloud className="pointer-events-none absolute -right-20 bottom-0 w-[360px] text-cream opacity-10" />
      <div className="wrap relative grid items-center gap-10 py-16 lg:grid-cols-[1fr_auto] lg:py-20">
        <div>
          <p className="eyebrow text-gold">
            <span className="font-sc mr-2 text-[15px]" aria-hidden>
              加入
            </span>
            Join
          </p>
          <h2 id="join-band" className="display mt-3 text-[44px] text-cream md:text-[64px]">
            No audition. No fee. Just show up.
          </h2>
          <p className="mt-4 max-w-[34rem] text-[18px] leading-relaxed text-cream/85">
            Join the Google Classroom, follow the account, and come by {site.meeting.room} on a Tuesday. That is the whole process.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <CopyCode code={site.classroomCode} size="lg" />
          <div className="flex flex-wrap gap-3">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-cream">
              <Instagram className="h-4 w-4" aria-hidden />
              Follow
            </a>
            <Link href="/join" className="btn btn-gold">
              How it works
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
