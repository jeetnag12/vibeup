"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Search, Sparkles, UserPlus, Users, Check } from "lucide-react";
import { useParams } from "next/navigation";
import { getEventById, Attendee } from "@/lib/events-data";

interface GoingPageProps {
  params?: {
    eventId?: string;
  };
}

export default function WhosGoingPage({ params }: GoingPageProps) {
  const routeParams = useParams();
  const rawId = (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";
  const event = useMemo(() => getEventById(rawId), [rawId]);
  const [search, setSearch] = useState("");
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({});
  const [invitedState, setInvitedState] = useState<Record<string, boolean>>({});

  const toggleFollow = (id: string) => {
    setFollowingState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleInvite = (id: string) => {
    setInvitedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAttendees = useMemo(() => {
    if (!search.trim()) return event.attendees;
    const q = search.toLowerCase();
    return event.attendees.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.bio.toLowerCase().includes(q) ||
        a.musicTaste.toLowerCase().includes(q) ||
        a.interests.some((t) => t.toLowerCase().includes(q))
    );
  }, [event.attendees, search]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Back Navigation */}
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-sm font-mono text-[#A1A1AA] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO EVENT</span>
          </Link>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider block mb-1">
                ATTENDEE ROSTER
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white">
                Who&apos;s Going ({event.goingCount})
              </h1>
              <p className="text-sm text-[#A1A1AA] font-sans mt-1">
                {event.title} · {event.dateDisplay} at {event.venue}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72 h-[42px] bg-[#141418] border border-[#2A2A35] rounded-xl flex items-center px-3 focus-within:border-[#8B5CF6]">
              <Search className="w-4 h-4 text-[#A1A1AA] mr-2 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search attendees..."
                className="w-full bg-transparent text-xs text-white placeholder:text-[#71717A] focus:outline-none font-sans"
              />
            </div>
          </div>

          {/* Attendees Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAttendees.map((person: Attendee) => {
              const isFollowing = followingState[person.id] ?? person.isFollowing;
              const isInvited = invitedState[person.id] ?? false;

              return (
                <div
                  key={person.id}
                  className="p-5 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#2A2A35]"
                        />
                        <div>
                          <h4 className="font-sans font-semibold text-white text-base">
                            {person.name}
                          </h4>
                          <p className="font-mono text-[11px] text-[#A1A1AA]">
                            {person.musicTaste}
                          </p>
                        </div>
                      </div>

                      <div className="px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                        <span className="font-mono text-xs text-[#8B5CF6] font-medium">
                          {person.vibeScore}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A1A1AA] font-sans line-clamp-2 mb-3">
                      {person.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {person.interests.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-[#71717A] bg-[#141418] border border-[#2A2A35] px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#2A2A35]">
                    <button
                      type="button"
                      onClick={() => toggleFollow(person.id)}
                      className={`py-1.5 rounded-[8px] border font-sans text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                        isFollowing
                          ? "border-[#8B5CF6] bg-[#8B5CF6]/20 text-white"
                          : "border-[#2A2A35] text-[#A1A1AA] hover:border-[#8B5CF6] hover:text-white"
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
                      className={`py-1.5 rounded-[8px] border font-sans text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                        isInvited
                          ? "border-[#22C55E] bg-[#22C55E]/15 text-[#22C55E]"
                          : "border-[#2A2A35] text-[#A1A1AA] hover:border-[#EC4899] hover:text-white"
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
        </div>
      </div>

      <Footer />
    </main>
  );
}
