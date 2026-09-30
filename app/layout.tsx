import type { Metadata } from "next";
import { Doto, Fraunces, Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { StickyBar } from "@/components/StickyBar";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
  display: "swap",
});

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  variable: "--font-red-hat-text",
  display: "swap",
});

const doto = Doto({
  subsets: ["latin"],
  axes: ["ROND"],
  variable: "--font-doto",
  display: "swap",
});

/** Only the handful of Chinese characters the site uses. See scripts/fetch-sc-subset.mjs */
const notoSerifSC = localFont({
  src: "./fonts/NotoSerifSC-subset.woff2",
  weight: "700",
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.short} · ${site.name}`,
    template: `%s · ${site.short}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${redHatDisplay.variable} ${redHatText.variable} ${doto.variable} ${notoSerifSC.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <StickyBar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
