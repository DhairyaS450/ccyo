import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { listEvents, listWorkshops } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, workshops] = await Promise.all([listEvents(), listWorkshops()]);
  const pages = ["", "/events", "/workshops", "/team", "/about", "/join"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
  }));
  return [
    ...pages,
    ...events.map((e) => ({ url: `${site.url}/events/${e.slug}`, lastModified: new Date(e.date) })),
    ...workshops.map((w) => ({
      url: `${site.url}/workshops/${w.slug}`,
      lastModified: w.updated ? new Date(w.updated) : new Date(),
    })),
  ];
}
