# CCYO website

Site for the Chinese Cultural Youth Organization at Laurel Heights Secondary School, Waterloo.

Next.js 16 (App Router), Tailwind v4, MDX content. Deploys on Vercel with zero config.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

| What | Where |
| --- | --- |
| Club facts (meeting time, room, Classroom code, Instagram, supervisor, latest posts) | `content/site.ts` |
| Exec members | `content/team.ts` and their cards in `public/team/` |
| Events | `content/events/*.mdx` |
| Workshops and recipes | `content/workshops/*.mdx` |
| Design tokens (colours, fonts, animations) | `app/globals.css` |
| Hand-drawn SVG art (lantern, moon, mooncake, goldfish...) | `components/art.tsx` |

## Add an event

1. Copy `content/events/snow-skin-mooncakes.mdx` to a new file. The filename becomes the URL, so `lantern-making.mdx` is `/events/lantern-making`.
2. Fill in the frontmatter at the top. `title`, `summary` and `date` (YYYY-MM-DD) are required. `time`, `room`, `bring`, `cost` and `cover` are optional but make the event card better. Add `start` and `end` as `HH:MM` when the time is fixed so calendar files get a real time.
3. Drop the poster in `public/posts/` and point `cover` at it with its `coverWidth` and `coverHeight` in pixels.
4. Write the page in Markdown below the frontmatter. Level-2 headings become the table of contents. Start a heading with Chinese characters and a space to get the gold prefix: `## 步骤 How the lunch runs`.
5. Components you can use inside the text: `<Callout title="...">`, `<Q q="A question?">the answer</Q>` for FAQ, and `<Figure src alt width height caption />` for photos.

The event shows up on the home page, the events page, the sidebar and the sitemap on its own. Past events move to the archive automatically after the date.

## Add a workshop or recipe

Same as an event, in `content/workshops/`. Add a `recipe` block to the frontmatter (see `snow-skin-mooncakes.mdx`) and the page renders a recipe card with a scaler that recalculates every amount. Set `art` to `mooncake`, `tanghulu`, `dumpling` or `lantern` for the illustration when there is no cover photo.

## Add or change an exec member

Edit `content/team.ts`. Put the member's Meet the Team card at `public/team/<slug>.webp` (1440 x 1777, the Instagram carousel size). The team page draws a draggable window per member.

## Chinese characters

The site self-hosts a tiny subset of Noto Serif SC with only the characters that are actually used. After adding new Chinese text anywhere, run:

```bash
node scripts/fetch-sc-subset.mjs
```

It scans `app/`, `components/` and `content/`, downloads the matching glyphs and rewrites `app/fonts/NotoSerifSC-subset.woff2`.

## Deploy

Push to GitHub and import the repo on Vercel, or run `vercel --prod`. The canonical URL (used for the sitemap, Open Graph tags and calendar links) is picked up from Vercel automatically, including a custom domain once one is attached. Set `NEXT_PUBLIC_SITE_URL` only when hosting somewhere else.

## Sign-up form

When the exec has a Google Form, paste its URL into `signupFormUrl` in `content/site.ts`. The join page adds a fourth step automatically.
