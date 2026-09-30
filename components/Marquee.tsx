type Props = {
  items: string[];
  tone?: "gold" | "vermilion" | "peach";
  className?: string;
};

const tones = {
  gold: "bg-gold text-ink",
  vermilion: "bg-vermilion text-cream",
  peach: "bg-peach text-ink",
};

const CJK = /[㐀-鿿]/;

/** Scrolling ticker. Content is duplicated for a seamless loop and hidden from assistive tech. */
export function Marquee({ items, tone = "gold", className = "" }: Props) {
  const row = items.map((item, i) => (
    <span key={i} className="inline-flex items-center">
      <span
        className={
          CJK.test(item)
            ? "font-sc px-5 text-[18px] font-bold"
            : "px-5 font-heading text-[14px] font-extrabold uppercase tracking-[0.2em]"
        }
      >
        {item}
      </span>
      <span className="inline-block h-2 w-2 rounded-full bg-current opacity-60" />
    </span>
  ));
  return (
    <div className={`marquee py-3 ${tones[tone]} ${className}`} aria-hidden>
      <div className="marquee-track">
        <span className="inline-flex items-center">{row}</span>
        <span className="inline-flex items-center">{row}</span>
      </div>
    </div>
  );
}
