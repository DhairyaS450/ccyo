declare module "*.mdx" {
  /** Parsed YAML frontmatter, exported by remark-mdx-frontmatter. */
  export const frontmatter: Record<string, unknown>;
}
