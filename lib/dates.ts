/** Parse "YYYY-MM-DD" as a local calendar date (no timezone drift). */
export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatLong(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShort(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function monthDay(iso: string): { month: string; day: string; weekday: string } {
  const d = parseDate(iso);
  return {
    month: d.toLocaleDateString("en-CA", { month: "short" }),
    day: String(d.getDate()).padStart(2, "0"),
    weekday: d.toLocaleDateString("en-CA", { weekday: "long" }),
  };
}

/** Whole days from today (local) until the date. Negative when past. */
export function daysUntil(iso: string, now = new Date()): number {
  const target = parseDate(iso);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function isPast(iso: string, now = new Date()): boolean {
  return daysUntil(iso, now) < 0;
}
