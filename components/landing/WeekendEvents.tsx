"use client";

import { useState } from "react";
import Link from "next/link";
import { eventCatalog } from "@/lib/event-catalog";
import EventTile from "./EventTile";

const WEEKEND_IDS = [
  "techno-night-playboy",
  "bollywood-saturdays-toit",
  "parvaaz-live-phoenix",
  "sundowner-the-skyye",
  "comedy-night-canvas",
  "underground-rave-secret",
  "jazz-evening-windmills",
  "e2",
  "e5",
  "e8",
  "e11",
  "e6",
];

const FILTERS: { label: string; match: (c: string) => boolean }[] = [
  { label: "All", match: () => true },
  { label: "Techno", match: (c) => c === "TECHNO" || c === "ELECTRONIC" },
  { label: "Bollywood", match: (c) => c === "BOLLYWOOD" },
  { label: "Live music", match: (c) => c === "LIVE MUSIC" || c === "JAZZ" },
  { label: "Rooftop", match: (c) => c === "ROOFTOP" },
  { label: "Comedy", match: (c) => c === "COMEDY" },
];

const weekend = WEEKEND_IDS.map((id) => eventCatalog.find((e) => e.id === id)!).filter(Boolean);

export default function WeekendEvents() {
  const [filter, setFilter] = useState(FILTERS[0]);
  const list = weekend.filter((e) => filter.match(e.category)).slice(0, 4);

  return (
    <section id="events" className="max-w-[1280px] mx-auto px-5 sm:px-6 pt-24 pb-6 scroll-mt-20">
      <div className="flex flex-wrap justify-between items-end gap-5 mb-7">
        <div>
          <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted mb-3">↗ Events this weekend</p>
          <h2 className="font-extrabold uppercase text-[clamp(44px,7vw,100px)] leading-[0.88] m-0">
            Tonight in <span className="text-pink">Bangalore</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter events by genre">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              type="button"
              role="tab"
              aria-selected={filter.label === f.label}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-2 text-[14px] font-medium border transition-colors ${
                filter.label === f.label
                  ? "bg-white text-night border-white"
                  : "border-line text-muted hover:text-white hover:border-[#3A3A48]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {list.map((e) => (
          <EventTile key={e.id} event={e} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/discover"
          className="rounded-full border border-[#3A3A48] px-5 py-3 text-[15px] font-semibold hover:bg-tile transition-colors"
        >
          See all events →
        </Link>
      </div>
    </section>
  );
}
