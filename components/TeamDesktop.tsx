"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Goldfish, LanternMark } from "@/components/art";
import type { Member } from "@/content/team";

type WinState = {
  /** Pixel position once dragged. Null means use the preset percentage. */
  pos: { x: number; y: number } | null;
  z: number;
  min: boolean;
  max: boolean;
};

const README = "readme";

/** Starting positions on the desktop as (% of width, px from top). */
const PRESETS: Record<string, { left: number; top: number }> = {
  bailee: { left: 1, top: 30 },
  annabelle: { left: 33, top: 70 },
  marina: { left: 65, top: 30 },
  hannah: { left: 15, top: 660 },
  sophia: { left: 47, top: 700 },
  [README]: { left: 73, top: 680 },
};

const PALETTE = [
  "#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080", "#808040", "#004040", "#0080ff", "#004080", "#8000ff", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ffff80", "#00ff80", "#80ffff", "#8080ff", "#ff0080", "#ff8040",
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function Clock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="ml-auto inline-flex h-8 items-center border-2 border-[#6b6b6b] border-b-white border-r-white px-3 font-pixel text-[15px] font-extrabold" suppressHydrationWarning>
      {time || " "}
    </span>
  );
}

/**
 * A little desktop. Every exec member is a draggable Paint window holding
 * their real Meet the Team card. Minimise, maximise, close, and bring back
 * from the taskbar. Below the lg breakpoint the windows simply stack.
 */
export function TeamDesktop({ team }: { team: Member[] }) {
  const ids = [...team.map((m) => m.slug), README];
  const [wins, setWins] = useState<Record<string, WinState>>(() =>
    Object.fromEntries(ids.map((id, i) => [id, { pos: null, z: i + 1, min: false, max: false }])),
  );
  const [active, setActive] = useState<string>(ids[0]);
  const zTop = useRef(ids.length);
  const deskRef = useRef<HTMLDivElement>(null);
  const winRefs = useRef<Record<string, HTMLElement | null>>({});
  const drag = useRef<{ id: string; dx: number; dy: number; el: HTMLElement } | null>(null);

  const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  const patch = (id: string, p: Partial<WinState>) => setWins((w) => ({ ...w, [id]: { ...w[id], ...p } }));

  const focus = (id: string) => {
    zTop.current += 1;
    patch(id, { z: zTop.current, min: false });
    setActive(id);
  };

  const showAll = () => {
    setWins((w) => Object.fromEntries(Object.entries(w).map(([k, v]) => [k, { ...v, min: false }])));
  };

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>, id: string) {
    if (!isDesktop()) return;
    if ((e.target as HTMLElement).closest("button")) return;
    const el = winRefs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    drag.current = { id, dx: e.clientX - rect.left, dy: e.clientY - rect.top, el };
    focus(id);
    el.classList.add("is-dragging");
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const desk = deskRef.current;
    if (!d || !desk) return;
    const rect = desk.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left - d.dx, -d.el.offsetWidth * 0.6, rect.width - d.el.offsetWidth * 0.4);
    const y = clamp(e.clientY - rect.top - d.dy, 0, rect.height - 80);
    d.el.style.left = `${x}px`;
    d.el.style.top = `${y}px`;
  }

  function onPointerUp() {
    const d = drag.current;
    if (!d) return;
    d.el.classList.remove("is-dragging");
    patch(d.id, { pos: { x: parseFloat(d.el.style.left), y: parseFloat(d.el.style.top) } });
    drag.current = null;
  }

  function styleFor(id: string): React.CSSProperties {
    const w = wins[id];
    const preset = PRESETS[id];
    return {
      left: w.pos ? w.pos.x : `${preset.left}%`,
      top: w.pos ? w.pos.y : preset.top,
      zIndex: w.z,
    };
  }

  const titleBar = (id: string, label: string) => (
      <div
        className="win-title"
        onPointerDown={(e) => onPointerDown(e, id)}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <span className="truncate">{label}</span>
        <span className="ml-auto flex gap-1">
          <button type="button" className="win-btn" aria-label={`Minimise ${label}`} onClick={() => patch(id, { min: true })}>
            _
          </button>
          <button type="button" className="win-btn hidden lg:grid" aria-label={`Resize ${label}`} onClick={() => patch(id, { max: !wins[id].max })}>
            <span className="block h-2 w-2 border border-current" />
          </button>
          <button type="button" className="win-btn" aria-label={`Close ${label}`} onClick={() => patch(id, { min: true })}>
            ×
          </button>
        </span>
      </div>
  );

  const Menu = (
    <div className="win-menu" aria-hidden>
      <span>File</span>
      <span>Edit</span>
      <span>View</span>
      <span>Image</span>
      <span>Options</span>
      <span>Help</span>
    </div>
  );

  return (
    <div className="border-2 border-ink shadow-hard">
      <div
        ref={deskRef}
        className="water dither @container relative overflow-hidden px-4 py-6 lg:h-[1340px] lg:p-0"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <Goldfish className="absolute bottom-24 w-28 animate-swim [--swim:100cqw]" />
          <Goldfish className="absolute bottom-[420px] w-14 animate-swim [--swim:100cqw] [animation-delay:-19s] [animation-duration:46s]" />
          <Goldfish className="absolute bottom-[760px] w-20 animate-swim [--swim:100cqw] [animation-delay:-33s] [animation-duration:38s]" />
        </div>

        <ul className="relative space-y-8 lg:space-y-0">
          {team.map((m) => {
            const w = wins[m.slug];
            return (
              <li
                key={m.slug}
                id={m.slug}
                ref={(el) => {
                  winRefs.current[m.slug] = el;
                }}
                hidden={w.min}
                onPointerDown={() => isDesktop() && active !== m.slug && focus(m.slug)}
                className={`win mx-auto w-full max-w-[420px] scroll-mt-24 lg:absolute lg:mx-0 lg:max-w-none ${w.max ? "lg:w-[560px]" : "lg:w-[320px]"} ${active === m.slug ? "is-active" : ""}`}
                style={styleFor(m.slug)}
              >
                {titleBar(m.slug, `${m.name} - Paint`)}
                {Menu}
                <div className="checker p-2">
                  <Image
                    src={m.card}
                    alt={`${m.name}, Meet the Team card`}
                    width={1440}
                    height={1777}
                    sizes="(min-width: 1024px) 560px, 420px"
                    className="block h-auto w-full border-2 border-ink bg-white"
                  />
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 px-3 py-2 font-body text-[13px] leading-snug">
                  <dt className="font-heading font-bold text-ink-soft">Role</dt>
                  <dd>{m.role}</dd>
                  <dt className="font-heading font-bold text-ink-soft">Grade</dt>
                  <dd>{m.grade}</dd>
                  <dt className="font-heading font-bold text-ink-soft">Character</dt>
                  <dd>
                    <span className="font-sc text-[15px] text-vermilion">{m.character}</span> {m.characterMeaning}
                  </dd>
                  <dt className="font-heading font-bold text-ink-soft">Song</dt>
                  <dd>{m.song}</dd>
                  <dt className="font-heading font-bold text-ink-soft">Dessert</dt>
                  <dd>{m.dessert}</dd>
                </dl>
                <div className="palette" aria-hidden>
                  {PALETTE.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </div>
              </li>
            );
          })}

          <li
            id={README}
            ref={(el) => {
              winRefs.current[README] = el;
            }}
            hidden={wins[README].min}
            onPointerDown={() => isDesktop() && active !== README && focus(README)}
            className={`win mx-auto w-full max-w-[420px] lg:absolute lg:mx-0 lg:w-[290px] lg:max-w-none ${active === README ? "is-active" : ""}`}
            style={styleFor(README)}
          >
            {titleBar(README, "join.txt - Notepad")}
            <div className="win-menu" aria-hidden>
              <span>File</span>
              <span>Edit</span>
              <span>Format</span>
              <span>Help</span>
            </div>
            <div className="bg-white p-4 font-body text-[15px] leading-relaxed">
              <p>Want in on the exec next year?</p>
              <p className="mt-3">
                We need people who can run a station at a workshop, take photos, make slides, or just reliably show up on a Tuesday.
              </p>
              <p className="mt-3">Talk to Bailee or Annabelle at a meeting, or DM the account.</p>
              <Link href="/join" className="mt-4 inline-block font-heading font-bold text-vermilion underline decoration-gold decoration-2">
                How to join
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <div className="taskbar hidden items-center gap-2 px-2 py-1.5 lg:flex">
        <button type="button" onClick={showAll} className="task-btn is-active" title="Show every window">
          <LanternMark className="h-4 w-auto text-vermilion" />
          CCYO
        </button>
        <span className="mx-1 h-6 w-px bg-ink/30" aria-hidden />
        {team.map((m) => {
          const w = wins[m.slug];
          return (
            <button
              key={m.slug}
              type="button"
              onClick={() => (w.min || active !== m.slug ? focus(m.slug) : patch(m.slug, { min: true }))}
              className={`task-btn ${active === m.slug && !w.min ? "is-active" : ""} ${w.min ? "is-min" : ""}`}
              aria-pressed={active === m.slug && !w.min}
            >
              <span className="font-sc text-vermilion" aria-hidden>
                {m.character}
              </span>
              {m.name.split(" ")[0]}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => (wins[README].min || active !== README ? focus(README) : patch(README, { min: true }))}
          className={`task-btn ${active === README && !wins[README].min ? "is-active" : ""} ${wins[README].min ? "is-min" : ""}`}
        >
          join.txt
        </button>
        <Clock />
      </div>
    </div>
  );
}
