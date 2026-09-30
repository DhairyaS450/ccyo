import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { slugify, splitZh } from "@/lib/slug";

export type EventFrontmatter = {
  title: string;
  summary: string;
  /** YYYY-MM-DD */
  date: string;
  /** Human time, e.g. "At lunch" */
  time?: string;
  /** HH:MM, used for calendar files when known */
  start?: string;
  end?: string;
  room?: string;
  location?: string;
  cover?: string;
  coverAlt?: string;
  coverWidth?: number;
  coverHeight?: number;
  bring?: string[];
  cost?: string;
  tags?: string[];
  /** Instagram post shortcode */
  instagram?: string;
};

export type Ingredient = {
  amount?: number;
  unit?: string;
  item: string;
  note?: string;
};

export type Recipe = {
  yields: number;
  yieldLabel: string;
  prep: string;
  cook: string;
  rest?: string;
  ingredients: { group?: string; items: Ingredient[] }[];
  steps: string[];
};

export type WorkshopFrontmatter = {
  title: string;
  summary: string;
  cover?: string;
  coverAlt?: string;
  coverWidth?: number;
  coverHeight?: number;
  art?: "mooncake" | "tanghulu" | "dumpling" | "lantern";
  difficulty?: "easy" | "medium" | "hard";
  time?: string;
  updated?: string;
  tags?: string[];
  recipe?: Recipe;
};

type MdxModule<T> = { default: ComponentType; frontmatter: T };

export type Heading = { id: string; text: string; zh: string | null };

const CONTENT = path.join(process.cwd(), "content");

async function slugsIn(dir: "events" | "workshops"): Promise<string[]> {
  const files = await readdir(path.join(CONTENT, dir));
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

/** Level-2 headings from the raw MDX, for the table of contents. */
export async function headingsFor(dir: "events" | "workshops", slug: string): Promise<Heading[]> {
  const raw = await readFile(path.join(CONTENT, dir, `${slug}.mdx`), "utf8");
  const body = raw.replace(/^---[\s\S]*?\n---/, "");
  return [...body.matchAll(/^## (.+)$/gm)].map((m) => {
    const { zh, rest } = splitZh(m[1].trim());
    return { id: slugify(rest), text: rest, zh };
  });
}

export type EventItem = EventFrontmatter & { slug: string };
export type WorkshopItem = WorkshopFrontmatter & { slug: string };

export async function listEvents(): Promise<EventItem[]> {
  const slugs = await slugsIn("events");
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const mod = (await import(`@/content/events/${slug}.mdx`)) as MdxModule<EventFrontmatter>;
      return { slug, ...mod.frontmatter };
    }),
  );
  return items.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getEvent(slug: string) {
  try {
    const mod = (await import(`@/content/events/${slug}.mdx`)) as MdxModule<EventFrontmatter>;
    return { Content: mod.default, frontmatter: mod.frontmatter };
  } catch {
    return null;
  }
}

export async function listWorkshops(): Promise<WorkshopItem[]> {
  const slugs = await slugsIn("workshops");
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const mod = (await import(`@/content/workshops/${slug}.mdx`)) as MdxModule<WorkshopFrontmatter>;
      return { slug, ...mod.frontmatter };
    }),
  );
  return items.sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? ""));
}

export async function getWorkshop(slug: string) {
  try {
    const mod = (await import(`@/content/workshops/${slug}.mdx`)) as MdxModule<WorkshopFrontmatter>;
    return { Content: mod.default, frontmatter: mod.frontmatter };
  } catch {
    return null;
  }
}
