"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "@/components/icons";
import { eventCatalog, unsplash, formatINR } from "@/lib/event-catalog";
import { allClubsData } from "@/lib/clubs-data";
import { allCommunitiesData } from "@/lib/communities-data";
import { mockEventCrews } from "@/lib/crews-data";
import { mockPeopleData } from "@/lib/people-data";

type Result = {
  key: string;
  href: string;
  title: string;
  sub: string;
  img?: string;
  round?: boolean;
};

const SUGGESTIONS = ["Techno", "Indiranagar", "Rooftop", "Bollywood", "Koramangala", "Comedy"];

// One copy of each event title (the catalogue repeats some events under several ids).
const uniqueEvents = Array.from(new Map(eventCatalog.map((e) => [e.title.toLowerCase(), e])).values());

const has = (q: string, ...fields: (string | undefined | string[])[]) =>
  fields.some((f) =>
    Array.isArray(f) ? f.some((x) => x.toLowerCase().includes(q)) : (f ?? "").toLowerCase().includes(q)
  );

function search(raw: string): { label: string; items: Result[] }[] {
  const q = raw.trim().toLowerCase();
  if (!q) return [];

  const events = uniqueEvents
    .filter((e) => has(q, e.title, e.genre, e.category, e.venue, e.area))
    .slice(0, 5)
    .map((e) => ({
      key: "e-" + e.id,
      href: `/events/${e.id}`,
      title: e.title,
      sub: `${e.date} · ${e.venue}, ${e.area} · from ${formatINR(e.price)}`,
      img: unsplash(e.img, 160),
    }));

  const clubs = allClubsData
    .filter((c) => has(q, c.name, c.area, c.genres, c.clubType))
    .slice(0, 4)
    .map((c) => ({
      key: "c-" + c.id,
      href: `/clubs/${c.id}`,
      title: c.name,
      sub: `${c.area} · ${c.genres.slice(0, 2).join(", ")}`,
      img: c.image,
    }));

  const communities = allCommunitiesData
    .filter((c) => has(q, c.name, c.area, c.location, c.genres, c.tags, c.interest))
    .slice(0, 3)
    .map((c) => ({
      key: "m-" + c.id,
      href: `/communities/${c.id}`,
      title: c.name,
      sub: `${c.memberCountDisplay} members · ${c.area ?? c.location}`,
      img: c.coverImage,
    }));

  const crews = mockEventCrews
    .filter((c) => has(q, c.name, c.eventName, c.area, c.interests))
    .slice(0, 3)
    .map((c) => ({
      key: "r-" + c.id,
      href: `/crews/${c.id}`,
      title: c.name,
      sub: `${c.eventName} · ${c.openSpots > 0 ? `${c.openSpots} spots left` : "Full"}`,
      img: c.image,
    }));

  const people = mockPeopleData
    .filter((p) => has(q, p.name, p.username, p.area, p.genres))
    .slice(0, 3)
    .map((p) => ({
      key: "p-" + p.id,
      href: `/people/${p.id}`,
      title: p.name,
      sub: `@${p.username.replace(/^@/, "")} · ${p.area}`,
      img: p.avatar,
      round: true,
    }));

  return [
    { label: "Events", items: events },
    { label: "Clubs", items: clubs },
    { label: "Communities", items: communities },
    { label: "Crews", items: crews },
    { label: "People", items: people },
  ].filter((g) => g.items.length > 0);
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const groups = useMemo(() => search(query), [query]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    router.push(href);
  };
  const allEventsHref = `/discover?q=${encodeURIComponent(query.trim())}`;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      go(flat[active]?.href ?? allEventsHref);
    }
  };

  let index = -1;

  // Portal to <body>: the navbar's backdrop blur would otherwise trap this fixed overlay inside the header.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] bg-night/80 backdrop-blur-sm flex items-start justify-center px-4 pt-[10vh]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Search VibeUp"
    >
      <div className="w-full max-w-[640px] rounded-[22px] border border-line bg-tile shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 h-[60px] border-b border-line">
          <Search className="w-5 h-5 text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search events, clubs, crews, people…"
            className="flex-1 bg-transparent text-[16px] text-white placeholder:text-muted outline-none"
            aria-label="Search"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="w-8 h-8 rounded-full grid place-items-center text-muted hover:text-white hover:bg-line"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query.trim() && (
            <div className="p-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-3">↗ Try</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-line px-3 py-1.5 text-[13px] text-white hover:border-yellow hover:text-yellow"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && flat.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-white text-[15px] font-medium">Nothing for “{query.trim()}” yet.</p>
              <p className="text-muted text-[14px] mt-1">Try an area like Indiranagar or a genre like techno.</p>
            </div>
          )}

          {groups.map((g) => (
            <div key={g.label} className="mb-1">
              <p className="px-3 pt-3 pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{g.label}</p>
              {g.items.map((r) => {
                index += 1;
                const i = index;
                return (
                  <Link
                    key={r.key}
                    href={r.href}
                    onClick={onClose}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 rounded-[14px] px-3 py-2 ${
                      active === i ? "bg-line" : "hover:bg-line"
                    }`}
                  >
                    {r.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={r.img}
                        alt=""
                        className={`w-10 h-10 object-cover shrink-0 ${r.round ? "rounded-full" : "rounded-[10px]"}`}
                      />
                    ) : (
                      <span className="w-10 h-10 rounded-[10px] bg-line shrink-0" />
                    )}
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium text-white truncate">{r.title}</span>
                      <span className="block text-[12px] text-muted truncate">{r.sub}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}

          {query.trim() && (
            <Link
              href={allEventsHref}
              onClick={onClose}
              className="mt-1 flex items-center justify-between rounded-[14px] px-3 py-3 text-[14px] font-medium text-yellow hover:bg-line"
            >
              See all events for “{query.trim()}”
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
