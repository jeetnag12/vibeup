"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, UserPlus, Users, Sparkles, Check } from "lucide-react";
import { Attendee, DetailedEvent } from "@/lib/events-data";

interface WhosGoingSectionProps {
  event: DetailedEvent;
}

export default function WhosGoingSection({ event }: WhosGoingSectionProps) {
  const [followingState, setFollowingState] = useState<Record<string, boolean>>(
    {}
  );
  const [invitedState, setInvitedState] = useState<Record<string, boolean>>({});

  const toggleFollow = (id: string) => {
    setFollowingState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleInvite = (id: string) => {
    setInvitedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full my-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
            COMMUNITY DIRECTORY
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            WHO&apos;S GOING
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-sans mt-1">
            Find people you know. Meet people with your vibe.
          </p>
        </div>

        <Link
          href={`/events/${event.id}/going`}
          className="group inline-flex items-center gap-1.5 text-[#8B5CF6] hover:text-purple-300 font-medium text-sm transition-colors shrink-0"
        >
          <span>VIEW ALL ({event.goingCount})</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid of Attendee Cards: 1 col on mobile, 2 on tablet/laptop, 3 or 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {event.attendees.map((person: Attendee) => {
          const isFollowing = followingState[person.id] ?? person.isFollowing;
          const isInvited = invitedState[person.id] ?? false;

          return (
            <div
              key={person.id}
              className="p-4 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/50 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Top: Avatar, Name & Vibe Score */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#1A1A1A] shrink-0"
                    />
                    <div>
                      <h4 className="font-sans font-semibold text-white text-base leading-tight">
                        {person.name}
                      </h4>
                      <p className="font-mono text-[11px] text-[#666666] truncate mt-0.5">
                        {person.musicTaste}
                      </p>
                    </div>
                  </div>

                  {/* Vibe Score Badge */}
                  <div className="px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                    <span className="font-mono text-[11px] text-[#8B5CF6] font-medium">
                      {person.vibeScore}
                    </span>
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-[#666666] font-sans line-clamp-2 mb-3">
                  {person.bio}
                </p>

                {/* Interests Pills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {person.interests.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-[#666666] bg-[#111111] border border-[#1A1A1A] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: FOLLOW & INVITE TO CREW */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1A1A1A]">
                <button
                  type="button"
                  onClick={() => toggleFollow(person.id)}
                  className={`w-full py-1.5 rounded-[8px] border font-sans text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                    isFollowing
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/20 text-white"
                      : "border-[#1A1A1A] text-[#666666] hover:border-[#8B5CF6] hover:text-white"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-3 h-3 text-[#8B5CF6]" />
                      <span>FOLLOWING</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3" />
                      <span>FOLLOW</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleInvite(person.id)}
                  className={`w-full py-1.5 rounded-[8px] border font-sans text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                    isInvited
                      ? "border-[#22C55E] bg-[#22C55E]/15 text-[#22C55E]"
                      : "border-[#1A1A1A] text-[#666666] hover:border-[#EC4899] hover:text-white"
                  }`}
                >
                  {isInvited ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>INVITED</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-3 h-3" />
                      <span>INVITE</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
