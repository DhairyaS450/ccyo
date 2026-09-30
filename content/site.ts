/**
 * Site-wide facts. Edit this file when something about the club changes.
 * Everything here is public information from the club's Instagram bio and
 * the Laurel Heights club directory.
 */
export const site = {
  name: "Chinese Cultural Youth Organization",
  short: "CCYO",
  tagline: "Student-led. Chinese-themed events, workshops and performances for students and families in Waterloo.",
  description:
    "CCYO is a student-led club at Laurel Heights Secondary School hosting Chinese-themed events, workshops and performances for students and families in the Kitchener-Waterloo region.",
  /**
   * Canonical origin for the sitemap, Open Graph tags and calendar links.
   * On Vercel this resolves automatically to the production domain; set
   * NEXT_PUBLIC_SITE_URL to override it anywhere else.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  instagram: {
    handle: "ccyo_official",
    url: "https://www.instagram.com/ccyo_official/",
  },
  school: {
    name: "Laurel Heights Secondary School",
    short: "Laurel Heights",
    city: "Waterloo, Ontario",
    listingName: "Chinese Cultural Club",
    listingBlurb: "Getting together to practice for performing for local community events.",
  },
  meeting: {
    day: "Tuesdays",
    time: "at lunch",
    room: "Room 2700",
  },
  classroomCode: "3mud6fwv",
  supervisor: {
    name: "Rinu Philip",
    email: "rinu_philip@wrdsb.ca",
  },
  leads: ["Bailee Bai", "Annabelle Xu"],
  /** Set this to a Google Form URL when the exec has one. Leave null to hide. */
  signupFormUrl: null as string | null,
  founded: "September 2026",
  season: "2026-27",
  teaser: "Coming to Waterloo Accelerator Centre",
  posts: [
    {
      id: "DdkIRW0BwZM",
      date: "2026-09-21",
      caption: "Snow skin Mooncakes",
      likes: 16,
      image: "/posts/mooncake-poster.webp",
      width: 755,
      height: 971,
      alt: "Poster for the Snow Skin Mooncakes workshop on Oct 1 2026 in Room 2700, with a gold moon, red blossoms and paper lanterns.",
    },
    {
      id: "DdCb1OOILg2",
      date: "2026-09-08",
      caption: "Meet the 26-27 CCYO Team!",
      likes: 133,
      image: "/posts/meet-the-team.webp",
      width: 785,
      height: 968,
      alt: "Meet the Team carousel cover: pixel goldfish over rippling blue water with the CCYO lantern logo.",
    },
    {
      id: "Dc_i6x0oHBv",
      date: "2026-09-07",
      caption: "Introducing.. Chinese Cultural Youth Organization !!",
      likes: 21,
      image: "/posts/introducing.jpg",
      width: 640,
      height: 640,
      alt: "Introduction slide for the Chinese Cultural Youth Organization.",
    },
  ],
} as const;

export function postUrl(id: string) {
  return `https://www.instagram.com/p/${id}/`;
}
