export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

/**
 * Headings may start with Chinese characters followed by a space, e.g.
 * "## 冰皮 What is snow skin?". The characters become a gold prefix and the
 * English part becomes the id.
 */
export function splitZh(text: string): { zh: string | null; rest: string } {
  const m = text.match(/^([㐀-鿿]+)\s+(.+)$/);
  return m ? { zh: m[1], rest: m[2].trim() } : { zh: null, rest: text.trim() };
}

/** Pull the plain text out of React children for heading ids. */
export function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: React.ReactNode } }).props;
    return textOf(props?.children);
  }
  return "";
}
