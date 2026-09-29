"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight, Calendar, MapPin } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface EventHeaderProps {
  event: DetailedEvent;
  activeSection?: string;
}

export default function EventHeader({ event, activeSection = "CREWS" }: EventHeaderProps) {
  return (
    <div className="w-full mb-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-5 flex-wrap"
      >
        <Link href="/discover" className="hover:text-white transition-colors">
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
        <span className="text-[#8B5CF6] font-semibold">{activeSection}</span>
      </nav>

      {/* Compact Event Banner Card */}
      <div className="w-full rounded-[16px] bg-[#141418] border border-[#2A2A35] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#8B5CF6]/40 transition-colors">
        <div className="flex items-center gap-4 min-w-0">
          {/* Small Event Poster Thumbnail */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#2A2A35] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="min-w-0">
            <span className="font-mono text-[10px] sm:text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
              {event.category}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-sans text-white truncate mb-1.5">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                {event.dateDisplay} · {event.timeRange || "9:00 PM – 2:00 AM"}
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
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#8B5CF6] text-white text-xs sm:text-sm font-mono font-medium border border-[#2A2A35] hover:border-[#8B5CF6] transition-all duration-200"
        >
          <span>VIEW EVENT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
