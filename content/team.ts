/**
 * The 2026-27 exec, straight from the Meet the Team carousel. Add a member by
 * adding an object and dropping their card at /public/team/<slug>.webp; the
 * team page builds itself from this list.
 */
export type Member = {
  slug: string;
  name: string;
  role: string;
  grade: number;
  /** Favourite Chinese character */
  character: string;
  characterMeaning: string;
  song: string;
  dessert: string;
  /** Card image under /public, 1440 x 1777 */
  card: string;
};

export const team: Member[] = [
  {
    slug: "bailee",
    name: "Bailee Bai",
    role: "President",
    grade: 12,
    character: "舞",
    characterMeaning: "dance",
    song: "Go! by Cortis",
    dessert: "Tanghulu",
    card: "/team/bailee.webp",
  },
  {
    slug: "annabelle",
    name: "Annabelle Xu",
    role: "Co-Leader and Organizer",
    grade: 11,
    character: "燃",
    characterMeaning: "ignite",
    song: "Summertime Sadness by Lana Del Rey",
    dessert: "Birthday cake",
    card: "/team/annabelle.webp",
  },
  {
    slug: "marina",
    name: "Marina Xiao",
    role: "Marketing",
    grade: 11,
    character: "猫",
    characterMeaning: "cat",
    song: "Blue Lips by Her's",
    dessert: "Tiramisu",
    card: "/team/marina.webp",
  },
  {
    slug: "hannah",
    name: "Hannah Jiao",
    role: "Slides and Outreach",
    grade: 11,
    character: "丫",
    characterMeaning: "as in 丫头, a playful word for a girl",
    song: "有点甜 by 汪苏泷",
    dessert: "Cheesecake",
    card: "/team/hannah.webp",
  },
  {
    slug: "sophia",
    name: "Sophia Yu",
    role: "Slides and Outreach",
    grade: 11,
    character: "鱼",
    characterMeaning: "fish",
    song: "更接近海 by 姚晓棠",
    dessert: "Osmanthus rice cake",
    card: "/team/sophia.webp",
  },
];
