/**
 * Hand-drawn SVG motifs used across the site. Every illustration is pure
 * vector so it stays crisp at any size and picks up the palette from CSS.
 */
import { useId } from "react";

type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string };

function a11y(title?: string) {
  return title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const, focusable: false as const };
}

/** Red paper lantern with gold caps and a tassel. */
export function Lantern({ title, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 210" {...a11y(title)} {...props}>
      <line x1="60" y1="0" x2="60" y2="22" stroke="#d9a441" strokeWidth="3" />
      <rect x="36" y="20" width="48" height="13" rx="4" fill="#d9a441" />
      <path
        d="M60 32C22 32 6 68 6 102c0 34 16 68 54 68s54-34 54-68c0-34-16-70-54-70Z"
        fill="#c8102e"
      />
      <path
        d="M40 36c-12 26-12 106 0 130M60 32v138M80 36c12 26 12 106 0 130"
        fill="none"
        stroke="#8e0b1f"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <ellipse cx="42" cy="66" rx="10" ry="18" fill="#fff" opacity="0.18" />
      <rect x="40" y="166" width="40" height="11" rx="4" fill="#d9a441" />
      <line x1="60" y1="177" x2="60" y2="188" stroke="#d9a441" strokeWidth="3" />
      <rect x="53" y="186" width="14" height="7" rx="2" fill="#d9a441" />
      <path
        d="M55 193v15M60 193v17M65 193v15"
        stroke="#c8102e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small lantern glyph in currentColor for the sticky bar and buttons. */
export function LanternMark({ title, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 32" {...a11y(title)} {...props}>
      <path d="M12 0v4" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="3.5" width="10" height="3" rx="1" fill="currentColor" />
      <path
        d="M12 6C5 6 2 12 2 17s3 11 10 11 10-6 10-11S19 6 12 6Z"
        fill="currentColor"
      />
      <path
        d="M8 8c-2 5-2 13 0 18M12 6v22M16 8c2 5 2 13 0 18"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1.2"
        fill="none"
      />
      <rect x="8" y="26.5" width="8" height="2.5" rx="1" fill="currentColor" />
      <path d="M12 29v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Full gold moon with paper grain and faint craters. */
export function Moon({ title, ...props }: SvgProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 400" {...a11y(title)} {...props}>
      <defs>
        <radialGradient id={`${id}-g`} cx="42%" cy="38%" r="65%">
          <stop offset="0" stopColor="#fbe7a6" />
          <stop offset="0.55" stopColor="#e9bd5c" />
          <stop offset="1" stopColor="#d9a441" />
        </radialGradient>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.22" />
          </feComponentTransfer>
        </filter>
        <clipPath id={`${id}-c`}>
          <circle cx="200" cy="200" r="190" />
        </clipPath>
      </defs>
      <circle cx="200" cy="200" r="190" fill={`url(#${id}-g)`} />
      <g fill="#c99a3a" opacity="0.28">
        <circle cx="150" cy="125" r="24" />
        <circle cx="262" cy="222" r="36" />
        <circle cx="170" cy="268" r="14" />
        <circle cx="282" cy="118" r="11" />
        <circle cx="118" cy="205" r="9" />
      </g>
      <rect width="400" height="400" filter={`url(#${id}-grain)`} clipPath={`url(#${id}-c)`} />
    </svg>
  );
}

/** Auspicious cloud (xiangyun) with an ink outline and a trailing streamer. Fill comes from currentColor. */
export function Cloud({ title, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 320 130" {...a11y(title)} {...props}>
      <path
        d="M34 96C10 96 6 64 30 60c-6-26 30-40 46-20 8-30 62-32 72-2 20-16 58-4 54 24 30-2 38 30 12 34H34Z"
        fill="currentColor"
        stroke="#2b1d1a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M214 96h96c8 0 8 12 0 12H240"
        fill="none"
        stroke="#2b1d1a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M62 78a12 12 0 1 1 18-10M124 60a14 14 0 1 1 20-8M176 76a10 10 0 1 1 14-8"
        fill="none"
        stroke="#2b1d1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/** Top-down snow skin mooncake with a stamped flower and the character for moon. */
export function Mooncake({ title, ...props }: SvgProps) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 200 200" {...a11y(title)} {...props}>
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke="#f6d9d4"
        strokeWidth="10"
        strokeDasharray="0.1 17.2"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="86" fill="#fbe6e1" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#e7a9a1" strokeWidth="2" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#e7a9a1" strokeWidth="1.5" strokeDasharray="4 6" />
      {petals.map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="54"
          rx="10"
          ry="22"
          fill="#f7cfc9"
          stroke="#d98c86"
          strokeWidth="1.5"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="26" fill="#fbe6e1" stroke="#d98c86" strokeWidth="1.5" />
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontSize="30"
        fill="#c8102e"
        style={{ fontFamily: "var(--font-sc)", fontWeight: 700 }}
      >
        月
      </text>
    </svg>
  );
}

/** Skewer of candied fruit. */
export function Tanghulu({ title, ...props }: SvgProps) {
  const ys = [42, 84, 126, 168];
  return (
    <svg viewBox="0 0 70 220" {...a11y(title)} {...props}>
      <path d="M35 8v206" stroke="#c9a36b" strokeWidth="5" strokeLinecap="round" />
      <path d="M35 2l6 10H29Z" fill="#c9a36b" />
      {ys.map((y) => (
        <g key={y}>
          <circle cx="35" cy={y} r="22" fill="#c8102e" stroke="#f4c9c3" strokeWidth="3" />
          <ellipse
            cx="27"
            cy={y - 8}
            rx="6"
            ry="4"
            fill="#fff"
            opacity="0.6"
            transform={`rotate(-30 27 ${y - 8})`}
          />
        </g>
      ))}
    </svg>
  );
}

/** Pleated dumpling. */
export function Dumpling({ title, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 220 130" {...a11y(title)} {...props}>
      <path
        d="M14 104C30 34 190 34 206 104Z"
        fill="#fbefd9"
        stroke="#d9b98a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M52 70q10-14 20 0M74 60q10-14 20 0M96 55q10-14 20 0M118 55q10-14 20 0M140 60q10-14 20 0M162 70q10-14 20 0"
        fill="none"
        stroke="#d9b98a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M14 104h192" stroke="#d9b98a" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="90" cy="92" rx="26" ry="5" fill="#fff" opacity="0.5" />
    </svg>
  );
}

/** Dance ribbon streamer. */
export function Ribbon({ title, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 320 140" {...a11y(title)} {...props}>
      <path
        d="M8 70C60 -10 110 150 160 70S260 -10 312 70"
        fill="none"
        stroke="#c8102e"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M8 70C60 -10 110 150 160 70S260 -10 312 70"
        fill="none"
        stroke="#d9a441"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1 14"
      />
    </svg>
  );
}

/** Plum blossom branch, like the poster. */
export function Branch({ title, ...props }: SvgProps) {
  const blossoms: Array<[number, number, number]> = [
    [118, 132, 1],
    [206, 96, 1.15],
    [262, 62, 0.85],
    [330, 48, 1],
    [176, 118, 0.6],
  ];
  return (
    <svg viewBox="0 0 400 200" {...a11y(title)} {...props}>
      <path
        d="M0 172C70 150 130 128 200 102S320 50 400 26"
        fill="none"
        stroke="#5a3a2e"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M186 108c14-22 22-30 44-46M292 58c10-16 18-26 34-38"
        fill="none"
        stroke="#5a3a2e"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {blossoms.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          {[0, 72, 144, 216, 288].map((deg) => (
            <circle key={deg} cx="0" cy="-12" r="9" fill="#c8102e" transform={`rotate(${deg})`} />
          ))}
          <circle r="4.5" fill="#d9a441" />
        </g>
      ))}
    </svg>
  );
}

/* Pixel goldfish, 16 x 12 grid. O body, D shade, W white, B eye. */
const FISH = [
  "........D.......",
  ".......DDD......",
  ".....OOOOOO...DD",
  "....OOOOOOOO.DDD",
  "...OWBOOOOOOODD.",
  "..OOWWOOOOOOODD.",
  "..OOOOOOOOOOOD..",
  "...OOOOOOOOOODD.",
  "....OWWOOOOO.DDD",
  ".....OWOOOO...DD",
  ".......DD.......",
  "......DD........",
];
const FISH_COLORS: Record<string, string> = {
  O: "#f28c28",
  D: "#d9641e",
  W: "#fff4e8",
  B: "#2b1d1a",
};
const FISH_RECTS = FISH.flatMap((row, y) =>
  row.split("").flatMap((ch, x) => (ch === "." ? [] : [{ x, y, fill: FISH_COLORS[ch] }])),
);

/** 8-bit goldfish. Faces left by default. */
export function Goldfish({ title, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 16 12" shapeRendering="crispEdges" {...a11y(title)} {...props}>
      {FISH_RECTS.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width="1" height="1" fill={r.fill} />
      ))}
    </svg>
  );
}

/** Instagram glyph. Lucide dropped brand icons, so this one is ours. */
export function Instagram({ title, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...a11y(title)} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
