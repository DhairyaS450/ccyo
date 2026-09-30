export type CalendarEvent = {
  title: string;
  description?: string;
  location?: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM local, optional. All-day when missing. */
  start?: string;
  end?: string;
  url?: string;
};

const TZ = "America/Toronto";

function compact(date: string, time?: string) {
  const d = date.replace(/-/g, "");
  return time ? `${d}T${time.replace(":", "")}00` : d;
}

function nextDay(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const n = new Date(y, m - 1, d + 1);
  const mm = String(n.getMonth() + 1).padStart(2, "0");
  const dd = String(n.getDate()).padStart(2, "0");
  return `${n.getFullYear()}-${mm}-${dd}`;
}

function escapeIcs(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildIcs(ev: CalendarEvent): string {
  const uid = `${ev.date}-${ev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}@ccyo`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CCYO//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    ev.start ? `DTSTART;TZID=${TZ}:${compact(ev.date, ev.start)}` : `DTSTART;VALUE=DATE:${compact(ev.date)}`,
    ev.start
      ? `DTEND;TZID=${TZ}:${compact(ev.date, ev.end ?? ev.start)}`
      : `DTEND;VALUE=DATE:${compact(nextDay(ev.date))}`,
    `SUMMARY:${escapeIcs(ev.title)}`,
    ev.description ? `DESCRIPTION:${escapeIcs(ev.description)}` : null,
    ev.location ? `LOCATION:${escapeIcs(ev.location)}` : null,
    ev.url ? `URL:${ev.url}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter((l): l is string => Boolean(l));
  return lines.join("\r\n");
}

export function googleCalendarUrl(ev: CalendarEvent): string {
  const dates = ev.start
    ? `${compact(ev.date, ev.start)}/${compact(ev.date, ev.end ?? ev.start)}`
    : `${compact(ev.date)}/${compact(nextDay(ev.date))}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates,
    ctz: TZ,
  });
  if (ev.description) params.set("details", ev.description);
  if (ev.location) params.set("location", ev.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
