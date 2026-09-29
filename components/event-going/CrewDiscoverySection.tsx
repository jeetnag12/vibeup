"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Plus, Check } from "lucide-react";
import { DetailedEvent, Attendee } from "@/lib/events-data";

interface CrewDiscoverySectionProps {
  event: DetailedEvent;
  onOpenInviteModal: (attendee: Attendee) => void;
}

export default function CrewDiscoverySection({
  event,
  onOpenInviteModal,
}: CrewDiscoverySectionProps) {
  const [joinedCrews, setJoinedCrews] = useState<Record<string, boolean>>({});

  const toggleJoinCrew = (id: string) => {
    setJoinedCrews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Find attendees looking for crew
  const soloAttendees = event.attendees.filter(
    (a) => a.crewStatus === "looking"
  ).slice(0, 3);

  return (
    <section className="w-full my-14 pt-10 border-t border-[#1A1A1A]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-[#EC4899]" />
            <span className="font-mono text-[11px] text-[#EC4899] uppercase tracking-wider font-semibold">
              GROUP SOCIAL DISCOVERY
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            LOOKING FOR A CREW?
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1 max-w-xl">
            Some people are going solo. Some are already building a group. Connect, split rides, or walk in together.
          </p>
        </div>

        {/* Create Crew Action */}
        <Link
          href={`/events/${event.id}/crews`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-[#8B5CF6]/15 hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-white border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-xs font-mono font-medium transition-all duration-200 shrink-0 self-start sm:self-end"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE A CREW</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Crews (Col 7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="font-mono text-xs text-[#666666] uppercase tracking-wider">
            FEATURED EVENT CREWS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.crews.slice(0, 2).map((crew) => {
              const isJoined = joinedCrews[crew.id] || false;
              const displayCount = crew.membersCount + (isJoined ? 1 : 0);

              return (
                <div
                  key={crew.id}
                  className="p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#8B5CF6]/15 text-[#8B5CF6] font-medium">
                        {crew.vibeTag}
                      </span>
                      <span className="font-mono text-xs text-white font-bold">
                        {displayCount}/{crew.maxSpots} SPOTS
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-base text-white tracking-tight mb-2">
                      {crew.name}
                    </h3>

                    {/* Member Avatars Stack */}
                    <div className="flex items-center -space-x-2 mb-4">
                      {crew.membersAvatars.map((img, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={img}
                          alt="Crew member"
                          className="w-7 h-7 rounded-full object-cover border-2 border-[#111111]"
                        />
                      ))}
                      <span className="w-7 h-7 rounded-full bg-[#111111] border-2 border-[#111111] flex items-center justify-center text-[10px] font-mono text-[#666666]">
                        +{displayCount - crew.membersAvatars.length}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#1A1A1A]">
                    <button
                      type="button"
                      onClick={() => toggleJoinCrew(crew.id)}
                      className={`flex-1 h-[34px] rounded-xl text-xs font-mono font-medium transition-colors flex items-center justify-center gap-1.5 ${
                        isJoined
                          ? "bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]"
                          : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>JOINED</span>
                        </>
                      ) : (
                        <span>JOIN CREW</span>
                      )}
                    </button>

                    <Link
                      href={`/events/${event.id}/crews`}
                      className="px-3 h-[34px] rounded-[4px] border border-[#1A1A1A] hover:border-[#8B5CF6] text-xs font-mono text-[#666666] hover:text-white transition-colors flex items-center justify-center"
                    >
                      VIEW
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Solo Attendees Open to Grouping (Col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="font-mono text-xs text-[#666666] uppercase tracking-wider">
            GOING SOLO · OPEN TO CONNECTING
          </div>

          <div className="flex flex-col gap-3">
            {soloAttendees.map((person) => (
              <div
                key={person.id}
                className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] hover:border-[#EC4899]/40 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#1A1A1A] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/people/${person.id}`}
                        className="font-bold text-sm text-white hover:text-[#8B5CF6] truncate"
                      >
                        {person.name}
                      </Link>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#EC4899]/15 text-[#EC4899] font-medium shrink-0">
                        LOOKING
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666666] font-mono truncate">
                      {person.musicTaste} · {person.area}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenInviteModal(person)}
                  className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#8B5CF6] text-white hover:text-white border border-[#1A1A1A] hover:border-[#8B5CF6] text-[11px] font-mono font-medium transition-colors shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>INVITE</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
