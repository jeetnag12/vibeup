"use client";

import Link from "next/link";
import { Sparkles, MapPin, Users, UserPlus, Check } from "lucide-react";
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
      <div className="w-full mb-12 p-8 rounded-[16px] bg-[#141418] border border-[#2A2A35] text-center">
        <Sparkles className="w-6 h-6 text-[#8B5CF6] mx-auto mb-2 opacity-60" />
        <h3 className="font-mono text-sm text-white font-bold tracking-wider mb-1">
          YOUR CROWD IS STILL GROWING
        </h3>
        <p className="text-xs text-[#A1A1AA] font-sans">
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
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider font-semibold">
              CURATED RECOMMENDATIONS
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
            style={{ fontWeight: 700 }}
          >
            PEOPLE YOU MAY VIBE WITH
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-1">
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
              className="p-5 sm:p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6] hover:shadow-[0_0_24px_rgba(139,92,246,0.14)] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Vibe Match Pill + Vibe Score */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#8B5CF6] text-xs font-mono font-bold tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                    <span>{person.matchPercentage}% VIBE MATCH</span>
                  </div>

                  <div className="font-mono text-xs text-[#A1A1AA]">
                    Score <span className="text-white font-bold">{person.vibeScore}</span>
                  </div>
                </div>

                {/* Profile Overview */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#2A2A35] group-hover:border-[#8B5CF6]/60 transition-colors shrink-0"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/people/${person.id}`}
                      className="text-lg font-bold font-sans text-white hover:text-[#8B5CF6] transition-colors truncate block"
                    >
                      {person.name.toUpperCase()}
                    </Link>
                    <div className="flex items-center gap-1 text-xs font-mono text-[#A1A1AA] mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#EC4899] shrink-0" />
                      <span>{person.area || "BANGALORE"}</span>
                    </div>
                  </div>
                </div>

                {/* Music Taste / Interests */}
                <div className="font-mono text-xs text-white/90 font-medium tracking-wide mb-2 line-clamp-1">
                  {person.musicTaste || person.matchTags.join(" · ").toUpperCase()}
                </div>

                {/* Mutual Connection Badge */}
                <div className="p-2.5 rounded-xl bg-[#141418] border border-[#2A2A35]/80 text-xs font-sans text-[#A1A1AA] flex items-center gap-2 mb-4">
                  <Users className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                  <span className="truncate">
                    {person.mutualDetails || `${person.mutualCount || 3} MUTUAL CONNECTIONS`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-3 border-t border-[#2A2A35]/60">
                <div className="grid grid-cols-2 gap-2">
                  {/* Follow Button */}
                  <button
                    type="button"
                    onClick={() => onToggleFollow(person.id)}
                    className={`h-[38px] px-3 rounded-xl text-xs font-mono font-medium transition-all duration-150 flex items-center justify-center gap-1.5 ${
                      isFollowing
                        ? "bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]"
                        : "bg-[#141418] border border-[#2A2A35] text-white hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10"
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
                    className="h-[38px] px-3 rounded-xl border border-[#2A2A35] hover:border-[#8B5CF6] bg-[#141418] text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors flex items-center justify-center"
                  >
                    VIEW PROFILE
                  </Link>
                </div>

                {/* Invite to Crew Button */}
                <button
                  type="button"
                  onClick={() => onOpenInviteModal(asAttendee)}
                  className="w-full h-[36px] rounded-xl bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-white border border-[#8B5CF6]/30 hover:border-[#8B5CF6] text-xs font-mono font-medium transition-all duration-200 flex items-center justify-center gap-1.5"
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
