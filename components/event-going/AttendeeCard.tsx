"use client";

import Link from "next/link";
import { UserPlus, Check, MapPin, Users } from "lucide-react";
import { Attendee } from "@/lib/events-data";

interface AttendeeCardProps {
  attendee: Attendee;
  isFollowing: boolean;
  onToggleFollow: (id: string) => void;
  onInviteToCrew: (attendee: Attendee) => void;
}

export default function AttendeeCard({
  attendee,
  isFollowing,
  onToggleFollow,
  onInviteToCrew,
}: AttendeeCardProps) {
  const isLookingForCrew = attendee.crewStatus === "looking";

  return (
    <div className="p-4 sm:p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.12)] transition-all duration-200 flex flex-col justify-between group h-full">
      <div>
        {/* Top Header: Avatar + Vibe Score */}
        <div className="flex items-start justify-between gap-2.5 mb-3.5">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={attendee.avatar}
              alt={attendee.name}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#1A1A1A] group-hover:border-[#8B5CF6]/50 transition-colors"
            />
            {isLookingForCrew && (
              <span
                title="Looking for a crew"
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#EC4899] border-2 border-[#111111] flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
              >
                C
              </span>
            )}
          </div>

          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
              VIBE SCORE
            </span>
            <span className="font-mono text-sm sm:text-base font-bold text-[#8B5CF6]">
              {attendee.vibeScore}
            </span>
          </div>
        </div>

        {/* Name & Area */}
        <div className="mb-2">
          <Link
            href={`/people/${attendee.id}`}
            className="font-sans font-bold text-sm sm:text-base text-white hover:text-[#8B5CF6] transition-colors truncate block"
          >
            {attendee.name.toUpperCase()}
          </Link>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#666666] mt-0.5">
            <MapPin className="w-3 h-3 text-[#EC4899] shrink-0" />
            <span className="truncate">{attendee.area.toUpperCase()}</span>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-[#666666] font-sans line-clamp-2 leading-relaxed mb-3 min-h-[32px]">
          {attendee.bio}
        </p>

        {/* Music Interests / Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {attendee.interests.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#111111] text-[#666666] border border-[#1A1A1A] group-hover:border-[#8B5CF6]/30 group-hover:text-white transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Mutual Information / Crew Badge */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#666666] truncate">
            <Users className="w-3 h-3 text-[#8B5CF6] shrink-0" />
            <span>
              {attendee.mutualDetails || `${attendee.mutualConnections} MUTUALS`}
            </span>
          </div>

          {isLookingForCrew ? (
            <div className="inline-flex items-center gap-1 font-mono text-[10px] text-[#EC4899] bg-[#EC4899]/10 px-2 py-0.5 rounded border border-[#EC4899]/30">
              <span>LOOKING FOR CREW</span>
            </div>
          ) : attendee.crewName ? (
            <div className="inline-flex items-center gap-1 font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded border border-[#8B5CF6]/20 truncate">
              <span className="truncate">{attendee.crewName.toUpperCase()}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-3 border-t border-[#1A1A1A]/60 mt-auto">
        <button
          type="button"
          onClick={() => onToggleFollow(attendee.id)}
          className={`w-full h-[36px] rounded-xl text-xs font-mono font-medium transition-all duration-150 flex items-center justify-center gap-1.5 ${
            isFollowing
              ? "bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]"
              : "bg-[#111111] border border-[#1A1A1A] text-white hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10"
          }`}
        >
          {isFollowing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>FOLLOWING</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span>FOLLOW</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onInviteToCrew(attendee)}
          className="w-full h-[32px] rounded-xl text-[11px] font-mono text-[#666666] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 border border-transparent hover:border-[#8B5CF6]/30 transition-colors flex items-center justify-center gap-1"
        >
          <Users className="w-3 h-3" />
          <span>INVITE TO CREW</span>
        </button>
      </div>
    </div>
  );
}
