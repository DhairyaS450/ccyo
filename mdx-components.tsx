import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { slugify, splitZh, textOf } from "@/lib/slug";

/** Heading with an optional Chinese prefix, e.g. "目录 In the school directory". Also used by hand-written pages. */
export function Heading({ level, children }: { level: 2 | 3; children?: React.ReactNode }) {
  const { zh, rest } = splitZh(textOf(children));
  const id = slugify(rest);
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id}>
      {zh ? (
        <span className="zh" aria-hidden>
          {zh}
        </span>
      ) : null}
      <span>{rest}</span>
    </Tag>
  );
}

function Anchor({ href = "", children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const internal = href.startsWith("/") || href.startsWith("#");
  if (internal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

/** Full-width photo with an optional caption. */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  eager,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  eager?: boolean;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 736px, 100vw"
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** Peach callout box. */
export function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="callout">
      {title ? <p className="font-heading text-[15px] font-bold uppercase tracking-[0.14em] text-vermilion">{title}</p> : null}
      {children}
    </aside>
  );
}

/** One question in an FAQ list. Native details, no JavaScript. */
export function Q({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details>
      <summary>{q}</summary>
      <div>{children}</div>
    </details>
  );
}

const components: MDXComponents = {
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  a: Anchor,
  Figure,
  Callout,
  Q,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
