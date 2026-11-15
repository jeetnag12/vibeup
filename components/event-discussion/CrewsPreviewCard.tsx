"use client";

import Link from "next/link";
import { ShieldCheck, Plus, ArrowRight } from "@/components/icons";
import { DetailedEvent } from "@/lib/events-data";

interface CrewsPreviewCardProps {
  event: DetailedEvent;
}

export default function CrewsPreviewCard({ event }: CrewsPreviewCardProps) {
  const crews = event.crews.slice(0, 2);

  return (
    <div className="p-5 rounded-[12px] bg-[#15151C] border border-[#25252F] flex flex-col gap-3.5">
      <div className="flex items-center justify-between pb-2 border-b border-[#25252F]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF4FA3]" />
          <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">
            CREWS GOING
          </span>
        </div>
        <Link
          href={`/events/${event.id}/crews`}
          className="text-[10px] font-mono text-[#FFE14D] hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {crews.map((crew) => (
          <div
            key={crew.id}
            className="p-3 rounded-xl bg-[#15151C] border border-[#25252F] flex flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-xs font-sans text-white truncate">
                {crew.name}
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#FFE14D]/15 text-[#FFE14D] font-semibold">
                {crew.membersCount}/{crew.maxSpots} FILLED
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8C9C]">
              <span>{crew.vibeTag}</span>
              <span className="text-[#FF4FA3]">{event.area.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-[#25252F]/60">
        <Link
          href={`/events/${event.id}/crews`}
          className="flex-1 py-2 rounded-[4px] bg-[#FFE14D]/15 hover:bg-[#FFE14D] text-[#FFE14D] hover:text-[#0B0B10] border border-[#FFE14D]/30 text-xs font-mono font-medium transition-colors text-center flex items-center justify-center gap-1"
        >
          <span>VIEW CREWS</span>
          <ArrowRight className="w-3 h-3" />
        </Link>

        <Link
          href={`/events/${event.id}/crews`}
          className="p-2 rounded-[4px] bg-[#15151C] hover:bg-[#25252F] text-white border border-[#25252F] transition-colors"
          title="Create a crew"
        >
          <Plus className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
