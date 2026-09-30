"use client";

import { useSyncExternalStore } from "react";
import { daysUntil } from "@/lib/dates";

function label(date: string): string {
  const d = daysUntil(date);
  if (d === 0) return "today";
  if (d === 1) return "tomorrow";
  if (d === -1) return "yesterday";
  return d > 1 ? `in ${d} days` : `${-d} days ago`;
}

const subscribe = () => () => {};

/** "in 10 days", "tomorrow", "today", "3 days ago". Computed on the client so it is always current. */
export function DaysUntil({ date, className = "" }: { date: string; className?: string }) {
  const text = useSyncExternalStore(
    subscribe,
    () => label(date),
    () => null,
  );
  return <span className={className}>{text ?? " "}</span>;
}
