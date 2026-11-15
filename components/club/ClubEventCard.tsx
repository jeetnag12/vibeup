"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Ticket, Sparkles } from "@/components/icons";
import { Club } from "@/lib/clubs-data";

interface ClubEventCardProps {
  club: Club;
}

export default function ClubEventCard({ club }: ClubEventCardProps) {
  if (!club.nextEvent) return null;

  return (
    <article
      aria-label={`${club.name} hosting ${club.nextEvent.title}`}
      className="p-5 sm:p-6 rounded-[12px] bg-[#15151C] border border-[#25252F] hover:border-[#FFE14D]/60 transition-all duration-200 flex flex-col justify-between group"
    >
      <div>
        {/* Header: Club Name & Area */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#8E8C9C] mb-1">
              <MapPin className="w-3 h-3 text-[#FF4FA3]" />
              <span>{club.area.toUpperCase()}</span>
            </div>
            <Link
              href={`/clubs/${club.id}`}
              className="font-sans font-bold text-base sm:text-lg text-white hover:text-[#FFE14D] transition-colors block"
            >
              {club.name}
            </Link>
          </div>

          <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-full shrink-0">
            HAPPENING SOON
          </span>
        </div>

        {/* Event Spotlight Box */}
        <div className="p-4 rounded-xl bg-[#15151C] border border-[#25252F] group-hover:border-[#FFE14D]/30 transition-colors mb-4">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FFE14D] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UPCOMING EVENT</span>
          </div>

          <h4 className="font-sans font-bold text-base text-white mb-2 leading-snug">
            {club.nextEvent.title}
          </h4>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8E8C9C]">
            <span className="inline-flex items-center gap-1 text-white">
              <Calendar className="w-3.5 h-3.5 text-[#FF4FA3]" />
              {club.nextEvent.dateDisplay}
            </span>
            <span>·</span>
            <span className="text-[#8E8C9C]">{club.nextEvent.genre}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-[#22C55E] font-bold">
              <Ticket className="w-3 h-3" />
              {club.nextEvent.startingPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: VIEW CLUB & VIEW EVENT */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#25252F]">
        <Link
          href={`/clubs/${club.id}`}
          className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-[4px] bg-[#15151C] hover:bg-[#25252F] text-white text-xs font-mono font-medium border border-[#25252F] hover:border-[#FFE14D]/40 transition-colors"
        >
          <span>VIEW CLUB</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#8E8C9C]" />
        </Link>

        <Link
          href={`/events/${club.nextEvent.id}`}
          className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-[4px] bg-[#FFE14D] hover:bg-[#F2CF2E] text-[#0B0B10] text-xs font-mono font-bold transition-all "
        >
          <span>VIEW EVENT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
