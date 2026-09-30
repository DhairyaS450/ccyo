type Props = {
  zh?: string;
  eyebrow?: string;
  id?: string;
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md";
  className?: string;
  children: React.ReactNode;
};

/** Section title with a gold Chinese character prefix and a brush underline. */
export function SectionHeading({
  zh,
  eyebrow,
  id,
  as = "h2",
  size = "lg",
  className = "",
  children,
}: Props) {
  const Tag = as;
  const sizes = size === "lg" ? "text-[34px] md:text-[44px]" : "text-[26px] md:text-[30px]";
  return (
    <div className={className}>
      {eyebrow ? <p className="eyebrow text-vermilion">{eyebrow}</p> : null}
      <Tag id={id} className={`mt-2 flex flex-wrap items-baseline gap-x-4 ${sizes} scroll-mt-24`}>
        {zh ? (
          <span className="font-sc text-gold" aria-hidden>
            {zh}
          </span>
        ) : null}
        <span className="brush">{children}</span>
      </Tag>
    </div>
  );
}
