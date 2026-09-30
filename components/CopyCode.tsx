"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Google Classroom code with a one-tap copy button. */
export function CopyCode({ code, className = "", size = "md" }: { code: string; className?: string; size?: "md" | "lg" }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const big = size === "lg";
  return (
    <div className={`inline-flex items-stretch overflow-hidden rounded-lg border-2 border-ink bg-white shadow-hard-sm ${className}`}>
      <code
        className={`px-4 font-heading font-extrabold tracking-[0.18em] text-ink ${big ? "py-3 text-[28px]" : "py-2 text-[17px]"}`}
        aria-label={`Classroom code ${code.split("").join(" ")}`}
      >
        {code}
      </code>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex items-center gap-2 border-l-2 border-ink px-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] transition-colors ${
          copied ? "bg-gold text-ink" : "bg-vermilion text-cream hover:bg-vermilion-deep"
        }`}
        aria-live="polite"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
