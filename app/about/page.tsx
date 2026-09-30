import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Branch, Cloud } from "@/components/art";
import { SectionHeading } from "@/components/SectionHeading";
import { SideRail } from "@/components/SideRail";
import { Heading } from "@/mdx-components";
import { site } from "@/content/site";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name}: who we are, what we do, and where to find us at ${site.school.name}.`,
};

export default function AboutPage() {
  return (
    <div className="wrap editorial py-12 lg:py-16">
      <article>
        <SectionHeading as="h1" zh="关于" eyebrow="Who we are">
          About CCYO
        </SectionHeading>

        <div className="relative mt-10 overflow-hidden rounded-lg bg-peach">
          <Cloud className="pointer-events-none absolute -right-12 -top-4 w-[260px] text-white opacity-70" />
          <Branch className="pointer-events-none absolute -bottom-8 -right-8 hidden w-[260px] lg:block" />
          <div className="relative flex items-center gap-6 p-8 lg:pr-48">
            <Image
              src="/posts/profile.jpg"
              alt="CCYO lantern logo"
              width={150}
              height={150}
              className="h-24 w-24 shrink-0 rounded-full border-4 border-white shadow-lift"
            />
            <div>
              <p className="display text-[30px] md:text-[40px]">{site.name}</p>
              <p className="mt-1 font-heading text-[15px] font-semibold text-ink-soft">
                Student led, since {site.founded}. {site.school.name}, {site.school.city}.
              </p>
            </div>
          </div>
        </div>

        <div className="longform mt-10">
          <p>
            CCYO is a club at Laurel Heights that exists to do Chinese culture out loud: the food, the festivals, the stories, and the performing. We started in {site.founded} with five people and an Instagram account, and the plan is simple. Host things people actually want to come to, make them free, and make sure nobody needs to already know anything to join in.
          </p>

          <Heading level={2}>什么 What we do</Heading>
          <p>
            Three kinds of thing. <strong>Events</strong> are the big lunches around a festival, like the snow skin mooncake workshop for Mid-Autumn. <strong>Workshops</strong> are hands-on and smaller, and every one gets written up on this site so you can make it again at home. <strong>Performances</strong> are why the school lists us the way it does: we practise on Tuesdays and perform at community events around Waterloo when someone will have us.
          </p>

          <Heading level={2}>目录 In the school directory</Heading>
          <p>Laurel Heights lists us as the {site.school.listingName}. This is the entry, word for word:</p>
          <table>
            <tbody>
              <tr>
                <th scope="row">Club</th>
                <td>{site.school.listingName}</td>
              </tr>
              <tr>
                <th scope="row">What</th>
                <td>{site.school.listingBlurb}</td>
              </tr>
              <tr>
                <th scope="row">When</th>
                <td>
                  {site.meeting.day} {site.meeting.time}
                </td>
              </tr>
              <tr>
                <th scope="row">Where</th>
                <td>{site.meeting.room}</td>
              </tr>
              <tr>
                <th scope="row">Supervisor</th>
                <td>
                  {site.supervisor.name} (<a href={`mailto:${site.supervisor.email}`}>{site.supervisor.email}</a>)
                </td>
              </tr>
              <tr>
                <th scope="row">Leads</th>
                <td>{site.leads.join(" and ")}</td>
              </tr>
              <tr>
                <th scope="row">Google Classroom</th>
                <td>
                  <code>{site.classroomCode}</code>
                </td>
              </tr>
            </tbody>
          </table>

          <Heading level={2}>团队 Who runs it</Heading>
          <p>
            {team.map((m, i) => (
              <span key={m.slug}>
                <strong>{m.name}</strong> ({m.role.toLowerCase()}, grade {m.grade})
                {i < team.length - 2 ? ", " : i === team.length - 2 ? " and " : "."}
              </span>
            ))}{" "}
            Every one of them has a favourite Chinese character and a favourite dessert on record, which you can inspect on the <Link href="/team">team page</Link>.
          </p>

          <Heading level={2}>下一站 Next stop</Heading>
          <p>
            The Instagram bio says it: <em>{site.teaser}</em>. We are working on taking a workshop off campus so families in the region can come too. Details will land on the account first, then on the <Link href="/events">events page</Link>.
          </p>

          <Heading level={2}>联系 Get in touch</Heading>
          <p>
            DM <a href={site.instagram.url}>@{site.instagram.handle}</a> for anything club related. For school business, the supervisor above is the person to email. If you want to join, there is a <Link href="/join">page for that</Link> and it takes about a minute.
          </p>
        </div>

        <Link href="/join" className="btn btn-primary mt-10">
          Join CCYO
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </article>

      <SideRail />
    </div>
  );
}
