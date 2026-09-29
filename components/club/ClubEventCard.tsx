"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Ticket, Sparkles } from "lucide-react";
import { Club } from "@/lib/clubs-data";

interface ClubEventCardProps {
  club: Club;
}

export default function ClubEventCard({ club }: ClubEventCardProps) {
  if (!club.nextEvent) return null;

  return (
    <article
      aria-label={`${club.name} hosting ${club.nextEvent.title}`}
      className="p-5 sm:p-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/60 transition-all duration-200 flex flex-col justify-between group"
    >
      <div>
        {/* Header: Club Name & Area */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#666666] mb-1">
              <MapPin className="w-3 h-3 text-[#EC4899]" />
              <span>{club.area.toUpperCase()}</span>
            </div>
            <Link
              href={`/clubs/${club.id}`}
              className="font-sans font-bold text-base sm:text-lg text-white hover:text-[#8B5CF6] transition-colors block"
            >
              {club.name}
            </Link>
          </div>

          <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-full shrink-0">
            HAPPENING SOON
          </span>
        </div>

        {/* Event Spotlight Box */}
        <div className="p-4 rounded-xl bg-[#111111] border border-[#1A1A1A] group-hover:border-[#8B5CF6]/30 transition-colors mb-4">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8B5CF6] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UPCOMING EVENT</span>
          </div>

          <h4 className="font-sans font-bold text-base text-white mb-2 leading-snug">
            {club.nextEvent.title}
          </h4>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#666666]">
            <span className="inline-flex items-center gap-1 text-white">
              <Calendar className="w-3.5 h-3.5 text-[#EC4899]" />
              {club.nextEvent.dateDisplay}
            </span>
            <span>·</span>
            <span className="text-[#666666]">{club.nextEvent.genre}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-[#22C55E] font-bold">
              <Ticket className="w-3 h-3" />
              {club.nextEvent.startingPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: VIEW CLUB & VIEW EVENT */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1A1A1A]">
        <Link
          href={`/clubs/${club.id}`}
          className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] text-white text-xs font-mono font-medium border border-[#1A1A1A] hover:border-[#8B5CF6]/40 transition-colors"
        >
          <span>VIEW CLUB</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#666666]" />
        </Link>

        <Link
          href={`/events/${club.nextEvent.id}`}
          className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all "
        >
          <span>VIEW EVENT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
