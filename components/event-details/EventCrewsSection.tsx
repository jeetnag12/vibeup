"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Users, ArrowRight, Check } from "lucide-react";
import { DetailedEvent, EventCrew } from "@/lib/events-data";

interface EventCrewsSectionProps {
  event: DetailedEvent;
}

export default function EventCrewsSection({ event }: EventCrewsSectionProps) {
  const [joinedCrews, setJoinedCrews] = useState<Record<string, boolean>>({});

  const toggleJoin = (id: string) => {
    setJoinedCrews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full my-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
            CREW DISCOVERY
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            EVENT CREWS
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-sans mt-1">
            Don&apos;t have a group? Find one. Arrive together, share tables, and party safely.
          </p>
        </div>

        {/* Create a crew button */}
        <Link
          href={`/events/${event.id}/crews`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/40 text-[#8B5CF6] hover:text-white font-sans text-xs font-semibold tracking-wide transition-all self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE A CREW</span>
        </Link>
      </div>

      {/* Crew Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {event.crews.map((crew: EventCrew) => {
          const isJoined = joinedCrews[crew.id] ?? false;
          const currentCount = isJoined
            ? crew.membersCount + 1
            : crew.membersCount;

          return (
            <div
              key={crew.id}
              className="p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/60 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Crew Name & Vibe Tag */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-sans font-bold text-white text-base tracking-tight leading-snug">
                    {crew.name}
                  </h4>
                  <span className="font-mono text-[10px] text-[#EC4899] bg-[#EC4899]/10 px-2 py-0.5 rounded-full shrink-0">
                    {crew.vibeTag}
                  </span>
                </div>

                <p className="font-mono text-xs text-[#666666] mb-4">
                  Going to: <span className="text-white">{crew.eventName}</span>
                </p>

                {/* Member Avatars Stack */}
                <div className="flex items-center justify-between mb-4 pt-2 border-t border-[#1A1A1A]">
                  <div className="flex items-center -space-x-2">
                    {crew.membersAvatars.map((url, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={idx}
                        src={url}
                        alt="Crew member"
                        className="w-8 h-8 rounded-full object-cover border-2 border-[#111111]"
                      />
                    ))}
                  </div>

                  {/* Status Indicator */}
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-[#8B5CF6]">
                      {currentCount}/{crew.maxSpots} spots filled
                    </span>
                    <p className="font-mono text-[10px] text-[#666666]">
                      Host: {crew.creatorName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: JOIN CREW & VIEW CREW */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1A1A1A]">
                <button
                  type="button"
                  onClick={() => toggleJoin(crew.id)}
                  className={`w-full py-2 rounded-[8px] font-sans text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    isJoined
                      ? "bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E]"
                      : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>JOINED</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-3.5 h-3.5" />
                      <span>JOIN CREW</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/events/${event.id}/crews`}
                  className="w-full py-2 rounded-[8px] border border-[#1A1A1A] bg-[#111111] hover:border-[#8B5CF6] text-[#666666] hover:text-white font-sans text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1"
                >
                  <span>VIEW CREW</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
