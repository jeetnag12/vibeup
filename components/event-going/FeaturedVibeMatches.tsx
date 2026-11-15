"use client";

import Link from "next/link";
import { Sparkles, MapPin, Users, UserPlus, Check } from "@/components/icons";
import { VibeMatchUser, Attendee } from "@/lib/events-data";

interface FeaturedVibeMatchesProps {
  vibeMatches: VibeMatchUser[];
  followingState: Record<string, boolean>;
  onToggleFollow: (id: string) => void;
  onOpenInviteModal: (attendee: Attendee) => void;
}

export default function FeaturedVibeMatches({
  vibeMatches,
  followingState,
  onToggleFollow,
  onOpenInviteModal,
}: FeaturedVibeMatchesProps) {
  if (!vibeMatches || vibeMatches.length === 0) {
    return (
      <div className="w-full mb-12 p-8 rounded-[12px] bg-[#15151C] border border-[#25252F] text-center">
        <Sparkles className="w-6 h-6 text-[#FFE14D] mx-auto mb-2 opacity-60" />
        <h3 className="font-mono text-sm text-white font-bold tracking-wider mb-1">
          YOUR CROWD IS STILL GROWING
        </h3>
        <p className="text-xs text-[#8E8C9C] font-sans">
          More people will appear here as the event gets closer.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#FFE14D]" />
            <span className="font-mono text-[11px] text-[#FFE14D] uppercase tracking-wider font-semibold">
              CURATED RECOMMENDATIONS
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            PEOPLE YOU MAY VIBE WITH
          </h2>
          <p className="text-xs sm:text-sm text-[#8E8C9C] font-sans mt-1">
            People going to this event who share your interests, music taste or communities.
          </p>
        </div>
      </div>

      {/* Featured Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vibeMatches.map((person) => {
          const isFollowing = followingState[person.id] ?? person.isFollowing ?? false;

          // Convert to Attendee object for invite modal
          const asAttendee: Attendee = {
            id: person.id,
            name: person.name,
            avatar: person.avatar,
            bio: person.reason,
            interests: person.matchTags,
            musicTaste: person.musicTaste || "Berlin Techno · Acid House",
            vibeScore: person.vibeScore,
            vibeMatch: person.matchPercentage,
            area: person.area || "Indiranagar",
            mutualConnections: person.mutualCount || 3,
            mutualDetails: person.mutualDetails || person.reason,
            isFollowing,
          };

          return (
            <div
              key={person.id}
              className="p-5 sm:p-6 rounded-[12px] bg-[#15151C] border border-[#25252F] hover:border-[#FFE14D] hover:shadow-[0_0_24px_rgba(255,225,77,0.14)] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Vibe Match Pill + Vibe Score */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFE14D]/15 border border-[#FFE14D]/40 text-[#FFE14D] text-xs font-mono font-bold tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#FFE14D]" />
                    <span>{person.matchPercentage}% VIBE MATCH</span>
                  </div>

                  <div className="font-mono text-xs text-[#8E8C9C]">
                    Score <span className="text-white font-bold">{person.vibeScore}</span>
                  </div>
                </div>

                {/* Profile Overview */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#25252F] group-hover:border-[#FFE14D]/60 transition-colors shrink-0"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/people/${person.id}`}
                      className="text-lg font-bold font-sans text-white hover:text-[#FFE14D] transition-colors truncate block"
                    >
                      {person.name.toUpperCase()}
                    </Link>
                    <div className="flex items-center gap-1 text-xs font-mono text-[#8E8C9C] mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#FF4FA3] shrink-0" />
                      <span>{person.area || "BANGALORE"}</span>
                    </div>
                  </div>
                </div>

                {/* Music Taste / Interests */}
                <div className="font-mono text-xs text-white/90 font-medium tracking-wide mb-2 line-clamp-1">
                  {person.musicTaste || person.matchTags.join(" · ").toUpperCase()}
                </div>

                {/* Mutual Connection Badge */}
                <div className="p-2.5 rounded-xl bg-[#15151C] border border-[#25252F]/80 text-xs font-sans text-[#8E8C9C] flex items-center gap-2 mb-4">
                  <Users className="w-3.5 h-3.5 text-[#FFE14D] shrink-0" />
                  <span className="truncate">
                    {person.mutualDetails || `${person.mutualCount || 3} MUTUAL CONNECTIONS`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-3 border-t border-[#25252F]/60">
                <div className="grid grid-cols-2 gap-2">
                  {/* Follow Button */}
                  <button
                    type="button"
                    onClick={() => onToggleFollow(person.id)}
                    className={`h-[38px] px-3 rounded-xl text-xs font-mono font-medium transition-all duration-150 flex items-center justify-center gap-1.5 ${
                      isFollowing
                        ? "bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]"
                        : "bg-[#15151C] border border-[#25252F] text-white hover:border-[#FFE14D] hover:bg-[#FFE14D]/10"
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

                  {/* View Profile Button */}
                  <Link
                    href={`/people/${person.id}`}
                    className="h-[38px] px-3 rounded-[4px] border border-[#25252F] hover:border-[#FFE14D] bg-[#15151C] text-xs font-mono text-[#8E8C9C] hover:text-white transition-colors flex items-center justify-center"
                  >
                    VIEW PROFILE
                  </Link>
                </div>

                {/* Invite to Crew Button */}
                <button
                  type="button"
                  onClick={() => onOpenInviteModal(asAttendee)}
                  className="w-full h-[36px] rounded-xl bg-[#FFE14D]/10 hover:bg-[#FFE14D] text-[#FFE14D] hover:text-[#0B0B10] border border-[#FFE14D]/30 hover:border-[#FFE14D] text-xs font-mono font-medium transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>INVITE TO CREW</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
