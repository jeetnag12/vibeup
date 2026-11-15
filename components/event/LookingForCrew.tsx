"use client";

import Link from "next/link";
import { Users, MapPin, Sparkles, Send, ArrowRight } from "@/components/icons";
import { LookingAttendee } from "@/lib/crews-data";

interface LookingForCrewProps {
  attendees: LookingAttendee[];
  onInviteAttendee: (attendee: LookingAttendee) => void;
  eventId: string;
}

export default function LookingForCrew({
  attendees,
  onInviteAttendee,
  eventId,
}: LookingForCrewProps) {
  return (
    <section className="w-full mb-14 pt-10 border-t border-[#25252F]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-4 h-4 text-[#FF4FA3]" />
            <span className="font-mono text-xs text-[#FF4FA3] uppercase tracking-wider font-semibold">
              SOLO ATTENDEE CONNECTOR
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
            PEOPLE LOOKING FOR A CREW
          </h3>
          <p className="text-xs sm:text-sm text-[#8E8C9C] font-sans mt-1 max-w-xl">
            Going solo? Find people who are looking for a group too. Invite them into your crew or team up together.
          </p>
        </div>

        <Link
          href={`/events/${eventId}/going`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFE14D] hover:text-[#FFEA80] transition-colors shrink-0"
        >
          <span>VIEW ALL ATTENDEES</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {attendees.map((person) => (
          <div
            key={person.id}
            className="p-5 rounded-[12px] bg-[#15151C] border border-[#25252F] hover:border-[#FFE14D] hover:shadow-[0_0_20px_rgba(255,225,77,0.15)] transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Header: Avatar + Vibe Score */}
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#25252F] group-hover:border-[#FFE14D]/50 transition-colors"
                  />
                  <span
                    title="Looking for a crew"
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#FF4FA3] border-2 border-[#15151C] flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
                  >
                    C
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[10px] text-[#8E8C9C] uppercase tracking-wider block">
                    VIBE SCORE
                  </span>
                  <span className="font-mono text-base font-bold text-[#FFE14D]">
                    {person.vibeScore}
                  </span>
                </div>
              </div>

              {/* Name & Area */}
              <div className="mb-2">
                <Link
                  href={`/people/${person.id}`}
                  className="font-sans font-bold text-sm sm:text-base text-white hover:text-[#FFE14D] transition-colors block truncate"
                >
                  {person.name}
                </Link>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#8E8C9C] mt-0.5">
                  <MapPin className="w-3 h-3 text-[#FF4FA3] shrink-0" />
                  <span className="truncate">{person.area}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#8E8C9C] font-sans line-clamp-2 leading-relaxed mb-3 min-h-[32px]">
                {person.bio}
              </p>

              {/* Interests Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {person.interests.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#15151C] text-[#8E8C9C] border border-[#25252F] group-hover:border-[#FFE14D]/30 group-hover:text-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Status Badge & Match Signal */}
              <div className="space-y-1.5 mb-4">
                <div className="inline-flex items-center gap-1 font-mono text-[10px] text-[#FF4FA3] bg-[#FF4FA3]/10 px-2 py-0.5 rounded border border-[#FF4FA3]/30 font-semibold">
                  <span>LOOKING FOR CREW</span>
                </div>

                {person.vibeMatch && (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#FFE14D]">
                    <Sparkles className="w-3 h-3 text-[#FFE14D] shrink-0" />
                    <span className="truncate">{person.vibeMatch}% CREW MATCH</span>
                  </div>
                )}
              </div>
            </div>

            {/* Invite Button */}
            <button
              type="button"
              onClick={() => onInviteAttendee(person)}
              className="w-full py-2.5 rounded-xl bg-[#15151C] hover:bg-[#FFE14D] hover:text-[#0B0B10] text-white text-xs font-mono font-medium border border-[#25252F] hover:border-[#FFE14D] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group-hover:border-[#FFE14D]/50"
            >
              <Send className="w-3.5 h-3.5 text-[#FFE14D] group-hover:text-white transition-colors" />
              <span>INVITE TO CREW</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
