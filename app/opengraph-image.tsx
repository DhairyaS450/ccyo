import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} at ${site.school.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [fraunces, redHat] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Fraunces-Bold.ttf")),
    readFile(join(process.cwd(), "app/fonts/RedHatDisplay-ExtraBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#fff8f0",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44, background: "#c8102e", display: "flex" }} />
        <div
          style={{
            position: "absolute",
            right: -60,
            top: 90,
            width: 540,
            height: 540,
            borderRadius: 540,
            background: "radial-gradient(circle at 40% 35%, #fbe7a6 0%, #e9bd5c 55%, #d9a441 100%)",
            display: "flex",
          }}
        />
        <svg
          viewBox="0 0 120 210"
          width="150"
          height="262"
          style={{ position: "absolute", right: 160, top: 44 }}
        >
          <line x1="60" y1="0" x2="60" y2="22" stroke="#d9a441" strokeWidth="3" />
          <rect x="36" y="20" width="48" height="13" rx="4" fill="#d9a441" />
          <path d="M60 32C22 32 6 68 6 102c0 34 16 68 54 68s54-34 54-68c0-34-16-70-54-70Z" fill="#c8102e" />
          <path d="M40 36c-12 26-12 106 0 130M60 32v138M80 36c12 26 12 106 0 130" fill="none" stroke="#8e0b1f" strokeWidth="2.5" opacity="0.55" />
          <rect x="40" y="166" width="40" height="11" rx="4" fill="#d9a441" />
          <line x1="60" y1="177" x2="60" y2="188" stroke="#d9a441" strokeWidth="3" />
          <rect x="53" y="186" width="14" height="7" rx="2" fill="#d9a441" />
          <path d="M55 193v15M60 193v17M65 193v15" stroke="#c8102e" strokeWidth="2.5" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: 72, top: 120, width: 700 }}>
          <div style={{ fontFamily: "RedHat", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#c8102e" }}>
            {`${site.school.short} · ${site.school.city}`}
          </div>
          <div style={{ fontFamily: "Fraunces", fontSize: 88, lineHeight: 1, color: "#2b1d1a", marginTop: 20, letterSpacing: -2 }}>
            Chinese Cultural Youth Organization
          </div>
          <div style={{ fontFamily: "RedHat", fontSize: 26, color: "#6e5a54", marginTop: 28 }}>
            Events · Workshops · Performances
          </div>
        </div>
        <div style={{ position: "absolute", left: 72, bottom: 48, fontFamily: "RedHat", fontSize: 24, color: "#2b1d1a", display: "flex" }}>
          {`@${site.instagram.handle}`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 700, style: "normal" },
        { name: "RedHat", data: redHat, weight: 800, style: "normal" },
      ],
    },
  );
}
