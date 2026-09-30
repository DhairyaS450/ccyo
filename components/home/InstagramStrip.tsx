import Image from "next/image";
import { Heart } from "lucide-react";
import { Instagram } from "@/components/art";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { postUrl, site } from "@/content/site";
import { formatShort } from "@/lib/dates";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];

/** The latest posts as polaroids pinned to the page. No API, just the images. */
export function InstagramStrip() {
  return (
    <section aria-labelledby="instagram" className="wrap py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="instagram" zh="最新" eyebrow="Latest">
          Fresh from @{site.instagram.handle}
        </SectionHeading>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mb-2">
          <Instagram className="h-4 w-4" aria-hidden />
          Follow
        </a>
      </div>

      <ul className="mt-14 flex flex-col items-center gap-14 md:flex-row md:items-start md:justify-center md:gap-10">
        {site.posts.map((post, i) => (
          <Reveal key={post.id} as="li" delay={i * 90} className={`${tilts[i % tilts.length]} w-full max-w-[300px]`}>
            <a
              href={postUrl(post.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="tape relative block bg-white p-3 pb-5 shadow-lift transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-2 hover:rotate-0"
            >
              <Image
                src={post.image}
                alt={post.alt}
                width={post.width}
                height={post.height}
                sizes="300px"
                className="block aspect-[4/5] h-auto w-full object-cover"
              />
              <p className="display-italic mt-4 text-[21px] leading-tight">{post.caption}</p>
              <p className="mt-2 flex items-center gap-3 font-heading text-[13px] font-semibold text-ink-soft">
                <span>{formatShort(post.date)}</span>
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 fill-vermilion text-vermilion" aria-hidden />
                  {post.likes}
                </span>
              </p>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
