"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight, Calendar, MapPin } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface GoingHeaderProps {
  event: DetailedEvent;
}

export default function GoingHeader({ event }: GoingHeaderProps) {
  return (
    <div className="w-full mb-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono text-[#666666] uppercase tracking-wider mb-6 flex-wrap"
      >
        <Link
          href="/discover"
          className="hover:text-white transition-colors"
        >
          EVENTS
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#52525B]" />
        <Link
          href={`/events/${event.id}`}
          className="hover:text-[#8B5CF6] transition-colors truncate max-w-[200px] sm:max-w-none"
        >
          {event.title}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#52525B]" />
        <span className="text-[#8B5CF6] font-semibold">WHO&apos;S GOING</span>
      </nav>

      {/* Main Title & Description */}
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-[-0.03em] text-white tracking-tight leading-[1.08] mb-3"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          WHO&apos;S GOING?
        </h1>
        <p className="text-base sm:text-lg text-[#666666] font-sans max-w-2xl leading-relaxed">
          Meet people who are heading to the same night. Find your crowd, match music vibes, and build your crew before doors open.
        </p>
      </div>

      {/* Event Summary Card */}
      <div className="w-full rounded-[12px] bg-[#111111] border border-[#1A1A1A] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#8B5CF6]/40 transition-colors">
        <div className="flex items-center gap-4 min-w-0">
          {/* Thumbnail */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#1A1A1A] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="min-w-0">
            <span className="font-mono text-[10px] sm:text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
              {event.category}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-[-0.03em] font-sans text-white truncate mb-1.5">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#666666]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                {event.dateDisplay} · {event.timeDisplay}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EC4899]" />
                {event.venue} · {event.area.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* View Event Button */}
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#111111] hover:bg-[#8B5CF6] text-white text-xs sm:text-sm font-mono font-medium border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all duration-200 shrink-0 w-full sm:w-auto"
        >
          <span>VIEW EVENT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
