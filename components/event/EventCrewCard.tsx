"use client";

import Link from "next/link";
import { MapPin, Check, Lock, Sparkles, ArrowRight, UserPlus } from "@/components/icons";
import { EventCrew } from "@/lib/crews-data";

interface EventCrewCardProps {
  crew: EventCrew;
  isJoined: boolean;
  hasRequested: boolean;
  onJoinClick: (crew: EventCrew) => void;
  onRequestClick: (crew: EventCrew) => void;
  onInviteClick?: (crew: EventCrew) => void;
}

export default function EventCrewCard({
  crew,
  isJoined,
  hasRequested,
  onJoinClick,
  onRequestClick,
}: EventCrewCardProps) {
  const currentCount = isJoined ? crew.memberCount + 1 : crew.memberCount;
  const currentOpenSpots = isJoined ? Math.max(0, crew.openSpots - 1) : crew.openSpots;
  const isFull = currentOpenSpots <= 0 && !isJoined;
  const isPrivate = crew.status === "private";

  // Status Badge Rendering
  const renderStatusBadge = () => {
    if (isJoined) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-full">
          <Check className="w-3 h-3" />
          <span>JOINED</span>
        </span>
      );
    }
    if (isPrivate) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#FF4FA3] bg-[#FF4FA3]/15 border border-[#FF4FA3]/30 px-2 py-0.5 rounded-full">
          <Lock className="w-3 h-3" />
          <span>PRIVATE CREW</span>
        </span>
      );
    }
    if (isFull) {
      return (
        <span className="inline-flex items-center font-mono text-[10px] font-bold text-[#EF4444] bg-[#EF4444]/15 border border-[#EF4444]/30 px-2 py-0.5 rounded-full">
          FULL
        </span>
      );
    }
    if (currentOpenSpots <= 2) {
      return (
        <span className="inline-flex items-center font-mono text-[10px] font-bold text-amber-400 bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
          {currentOpenSpots} {currentOpenSpots === 1 ? "SPOT" : "SPOTS"} LEFT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center font-mono text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-full">
        OPEN
      </span>
    );
  };

  return (
    <div className="group rounded-[12px] bg-[#15151C] border border-[#25252F] hover:border-[#FFE14D] hover:shadow-[0_0_24px_rgba(255,225,77,0.18)] transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Card Header Media / Banner */}
        <div className="relative h-32 w-full overflow-hidden bg-[#15151C]">
          {crew.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={crew.image}
              alt={crew.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FFE14D]/20 to-[#FF4FA3]/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#15151C] via-[#15151C]/40 to-transparent" />

          {/* Area & Status Badges over image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              <MapPin className="w-3 h-3 text-[#FF4FA3]" />
              {crew.area.toUpperCase()}
            </span>

            {renderStatusBadge()}
          </div>

          {/* Subtle Vibe / Match Tag */}
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#FF4FA3] bg-[#FF4FA3]/15 border border-[#FF4FA3]/20 px-2 py-0.5 rounded-md truncate max-w-[180px]">
              {crew.vibeTag || "Vibe Crew"}
            </span>

            {crew.matchPercentage && (
              <span
                title={crew.matchReason || "High vibe match"}
                className="inline-flex items-center gap-1 font-mono text-[10px] text-[#FFE14D] bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#FFE14D]/30 font-bold"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#FFE14D]" />
                {crew.matchPercentage}% MATCH
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Crew Name */}
          <h4 className="font-sans font-bold text-white text-lg tracking-tight leading-snug group-hover:text-[#FFE14D] transition-colors mb-1.5">
            {crew.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-[#8E8C9C] font-sans line-clamp-2 leading-relaxed mb-3.5 min-h-[34px]">
            {crew.description}
          </p>

          {/* Subtle matching rationale */}
          {crew.matchReason && (
            <div className="mb-3.5 px-2.5 py-1 rounded-lg bg-[#15151C] border border-[#25252F] flex items-center gap-1.5 text-[10px] font-mono text-[#8E8C9C]">
              <span className="text-[#FFE14D] font-bold">WHY:</span>
              <span className="truncate">{crew.matchReason}</span>
            </div>
          )}

          {/* Member Avatars Stack + Spot Counts */}
          <div className="flex items-center justify-between pt-3 border-t border-[#25252F] mb-2">
            <div className="flex items-center -space-x-2">
              {(crew.members || []).slice(0, 4).map((member, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={member.id || idx}
                  src={member.avatar}
                  alt={member.name}
                  title={member.name}
                  className="w-7 h-7 rounded-full object-cover border-2 border-[#15151C] bg-[#15151C]"
                />
              ))}
              {(crew.members?.length || crew.memberCount) > 4 && (
                <div className="w-7 h-7 rounded-full bg-[#15151C] border-2 border-[#15151C] flex items-center justify-center font-mono text-[9px] text-[#8E8C9C] font-bold">
                  +{(crew.members?.length || crew.memberCount) - 4}
                </div>
              )}
            </div>

            <div className="text-right">
              <span className="font-mono text-xs font-bold text-white block">
                {currentCount} MEMBERS
              </span>
              <span className="font-mono text-[10px] text-[#FFE14D]">
                {currentOpenSpots > 0 ? `${currentOpenSpots} SPOTS LEFT` : "CREW FULL"}
              </span>
            </div>
          </div>

          {/* Joined notification inline */}
          {isJoined && (
            <div className="mt-2 text-center py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/20 text-[11px] font-mono text-[#22C55E]">
              You&apos;re in this crew.
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 grid grid-cols-2 gap-2">
        {/* View Crew Button */}
        <Link
          href={`/crews/${crew.id}`}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[4px] bg-[#15151C] hover:bg-[#25252F] text-white text-xs font-mono font-medium border border-[#25252F] hover:border-[#FFE14D]/40 transition-all duration-200"
        >
          <span>VIEW CREW</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#8E8C9C]" />
        </Link>

        {/* Join / Request / Full Button */}
        {isJoined ? (
          <button
            type="button"
            onClick={() => onJoinClick(crew)}
            className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E] text-xs font-mono font-bold transition-all duration-200 hover:bg-[#22C55E]/25"
          >
            <Check className="w-3.5 h-3.5" />
            <span>JOINED ✓</span>
          </button>
        ) : isPrivate ? (
          <button
            type="button"
            onClick={() => onRequestClick(crew)}
            className={`inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
              hasRequested
                ? "bg-[#FF4FA3]/15 border border-[#FF4FA3] text-[#FF4FA3]"
                : "bg-[#FF4FA3]/20 hover:bg-[#FF4FA3] text-[#FF4FA3] hover:text-white border border-[#FF4FA3]/40"
            }`}
          >
            {hasRequested ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>REQUEST SENT</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>REQUEST</span>
              </>
            )}
          </button>
        ) : isFull ? (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center py-2.5 px-3 rounded-[4px] bg-[#15151C] border border-[#25252F] text-[#8E8C9C] text-xs font-mono cursor-not-allowed"
          >
            CREW FULL
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onJoinClick(crew)}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FFE14D] hover:bg-[#F2CF2E] text-[#0B0B10] text-xs font-mono font-bold transition-all duration-200 shadow-[0_0_14px_rgba(255,225,77,0.3)] hover:shadow-[0_0_20px_rgba(255,225,77,0.45)]"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>JOIN CREW</span>
          </button>
        )}
      </div>
    </div>
  );
}
