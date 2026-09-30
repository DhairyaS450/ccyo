import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Dumpling, Lantern, Mooncake, Tanghulu } from "@/components/art";
import { RecipeCard } from "@/components/RecipeCard";
import { SideRail } from "@/components/SideRail";
import { Toc } from "@/components/Toc";
import { Figure } from "@/mdx-components";
import { getWorkshop, headingsFor, listWorkshops, type WorkshopFrontmatter } from "@/lib/content";
import { formatShort } from "@/lib/dates";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await listWorkshops();
  return items.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/workshops/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = await getWorkshop(slug);
  if (!w) return {};
  return { title: w.frontmatter.title, description: w.frontmatter.summary };
}

function Art({ kind }: { kind: WorkshopFrontmatter["art"] }) {
  switch (kind) {
    case "tanghulu":
      return <Tanghulu className="h-56 w-auto" />;
    case "dumpling":
      return <Dumpling className="w-64" />;
    case "lantern":
      return <Lantern className="h-56 w-auto origin-top animate-sway" />;
    default:
      return <Mooncake className="w-52 animate-bob" />;
  }
}

export default async function WorkshopPage({ params }: PageProps<"/workshops/[slug]">) {
  const { slug } = await params;
  const w = await getWorkshop(slug);
  if (!w) notFound();

  const { Content, frontmatter: fm } = w;
  const headings = await headingsFor("workshops", slug);

  return (
    <div className="wrap editorial py-12 lg:py-16">
      <article>
        <p className="eyebrow text-vermilion">
          <span className="font-sc mr-2 text-[15px]" aria-hidden>
            工坊
          </span>
          Workshop
        </p>
        <h1 className="mt-3 text-[40px] md:text-[52px]">{fm.title}</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-ink-soft">{fm.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-heading text-[14px] font-bold uppercase tracking-[0.12em] text-ink-soft">
          {fm.difficulty ? <li>{fm.difficulty}</li> : null}
          {fm.time ? <li>{fm.time}</li> : null}
          {fm.updated ? <li>Updated {formatShort(fm.updated)}</li> : null}
        </ul>

        {fm.cover ? (
          <div className="mt-8">
            <Figure src={fm.cover} alt={fm.coverAlt ?? fm.title} width={fm.coverWidth ?? 1200} height={fm.coverHeight ?? 800} eager />
          </div>
        ) : (
          <div className="relative mt-8 flex items-center justify-center overflow-hidden rounded-lg bg-peach py-12">
            <span className="zh-watermark -left-6 -top-10" aria-hidden>
              {fm.art === "tanghulu" ? "糖" : fm.art === "dumpling" ? "饺" : "月"}
            </span>
            <Art kind={fm.art} />
          </div>
        )}

        <div className="mt-8">
          <Toc headings={headings} jump={fm.recipe ? { href: "#recipe", label: "Jump to recipe" } : undefined} />
        </div>

        <div className="longform mt-10">
          <Content />
        </div>

        {fm.recipe ? (
          <div className="mt-14">
            <RecipeCard title={fm.title} recipe={fm.recipe} />
          </div>
        ) : null}
      </article>

      <SideRail />
    </div>
  );
}
