"use client";

import Link from "next/link";
import { ShieldCheck, Plus, ArrowRight } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface CrewsPreviewCardProps {
  event: DetailedEvent;
}

export default function CrewsPreviewCard({ event }: CrewsPreviewCardProps) {
  const crews = event.crews.slice(0, 2);

  return (
    <div className="p-5 rounded-[16px] bg-[#141418] border border-[#2A2A35] flex flex-col gap-3.5">
      <div className="flex items-center justify-between pb-2 border-b border-[#2A2A35]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#EC4899]" />
          <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">
            CREWS GOING
          </span>
        </div>
        <Link
          href={`/events/${event.id}/crews`}
          className="text-[10px] font-mono text-[#8B5CF6] hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {crews.map((crew) => (
          <div
            key={crew.id}
            className="p-3 rounded-xl bg-[#1A1A21] border border-[#2A2A35] flex flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-xs font-sans text-white truncate">
                {crew.name}
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#8B5CF6]/15 text-[#8B5CF6] font-semibold">
                {crew.membersCount}/{crew.maxSpots} FILLED
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
              <span>{crew.vibeTag}</span>
              <span className="text-[#EC4899]">{event.area.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-[#2A2A35]/60">
        <Link
          href={`/events/${event.id}/crews`}
          className="flex-1 py-2 rounded-xl bg-[#8B5CF6]/15 hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-white border border-[#8B5CF6]/30 text-xs font-mono font-medium transition-colors text-center flex items-center justify-center gap-1"
        >
          <span>VIEW CREWS</span>
          <ArrowRight className="w-3 h-3" />
        </Link>

        <Link
          href={`/events/${event.id}/crews`}
          className="p-2 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] text-white border border-[#2A2A35] transition-colors"
          title="Create a crew"
        >
          <Plus className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
