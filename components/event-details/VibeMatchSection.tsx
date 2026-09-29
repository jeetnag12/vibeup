"use client";

import { useState } from "react";
import { Sparkles, UserPlus, Check, ExternalLink } from "lucide-react";
import { DetailedEvent, VibeMatchUser } from "@/lib/events-data";

interface VibeMatchSectionProps {
  event: DetailedEvent;
}

export default function VibeMatchSection({ event }: VibeMatchSectionProps) {
  const [followingState, setFollowingState] = useState<Record<string, boolean>>(
    {}
  );
  const [activeProfile, setActiveProfile] = useState<VibeMatchUser | null>(null);

  const toggleFollow = (id: string) => {
    setFollowingState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full my-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#1A1A1A] text-xs font-mono text-[#8B5CF6] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="tracking-wider uppercase">ALGORITHMIC COMPATIBILITY</span>
        </div>
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          PEOPLE YOU MAY VIBE WITH
        </h2>
        <p className="text-sm sm:text-base text-[#666666] font-sans mt-1">
          Based on your interests, music taste and mutual communities.
        </p>
      </div>

      {/* Grid: 4 items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {event.vibeMatches.map((person: VibeMatchUser) => {
          const isFollowing = followingState[person.id] ?? false;

          return (
            <div
              key={person.id}
              className="p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top: Match Percentage & Ring */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[#8B5CF6]">
                      {person.matchPercentage}% VIBE MATCH
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-[#666666]">
                    Score {person.vibeScore}
                  </span>
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#1A1A1A]"
                  />
                  <div>
                    <h4 className="font-sans font-semibold text-white text-base leading-tight">
                      {person.name}
                    </h4>
                    <span className="font-mono text-[11px] text-[#8B5CF6]">
                      Active Attendee
                    </span>
                  </div>
                </div>

                {/* Match Tags: Genre / Area */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {person.matchTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-white bg-[#111111] border border-[#1A1A1A] px-2.5 py-0.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Explanation text */}
                <p className="text-xs text-[#666666] font-sans leading-relaxed mb-4">
                  {person.reason}
                </p>
              </div>

              {/* Actions: FOLLOW & VIEW PROFILE */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1A1A1A]">
                <button
                  type="button"
                  onClick={() => toggleFollow(person.id)}
                  className={`w-full py-2 rounded-[8px] font-sans text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    isFollowing
                      ? "bg-[#8B5CF6]/20 border border-[#8B5CF6] text-white"
                      : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6]" />
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
                  onClick={() => setActiveProfile(person)}
                  className="w-full py-2 rounded-[8px] border border-[#1A1A1A] bg-[#111111] hover:border-[#8B5CF6] text-[#666666] hover:text-white font-sans text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1"
                >
                  <span>PROFILE</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Preview Modal */}
      {activeProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveProfile(null)}
              className="absolute top-4 right-4 text-[#666666] hover:text-white p-1"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProfile.avatar}
                alt={activeProfile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#8B5CF6] mb-3"
              />
              <h3 className="font-sans font-bold text-lg text-white">
                {activeProfile.name}
              </h3>
              <p className="font-mono text-xs text-[#8B5CF6] mb-3">
                {activeProfile.matchPercentage}% Vibe Match
              </p>
              <p className="text-xs text-[#666666] font-sans mb-4">
                {activeProfile.reason}
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                {activeProfile.matchTags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] bg-[#111111] border border-[#1A1A1A] px-2.5 py-1 rounded-full text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  toggleFollow(activeProfile.id);
                  setActiveProfile(null);
                }}
                className="w-full py-2.5 rounded-[10px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-colors"
              >
                {followingState[activeProfile.id] ? "Following" : "Follow on VibeUp"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
