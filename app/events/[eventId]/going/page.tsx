"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoingHeader from "@/components/event-going/GoingHeader";
import SocialStatsRow from "@/components/event-going/SocialStatsRow";
import AttendeeFilters, {
  FilterType,
  SortType,
} from "@/components/event-going/AttendeeFilters";
import FeaturedVibeMatches from "@/components/event-going/FeaturedVibeMatches";
import AttendeeCard from "@/components/event-going/AttendeeCard";
import CrewDiscoverySection from "@/components/event-going/CrewDiscoverySection";
import InviteCrewModal from "@/components/event-going/InviteCrewModal";
import AttendeeCardSkeleton from "@/components/event-going/AttendeeCardSkeleton";
import { getEventById, Attendee } from "@/lib/events-data";
import { Users, SearchX, ArrowRight } from "lucide-react";

interface GoingPageProps {
  params?: {
    eventId?: string;
  };
}

export default function WhosGoingPage({ params }: GoingPageProps) {
  const routeParams = useParams();
  const rawId =
    (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";

  const event = useMemo(() => getEventById(rawId), [rawId]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [activeSort, setActiveSort] = useState<SortType>("Recommended");
  const [isLoading] = useState(false);

  // Social Interaction States
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({});
  const [selectedInviteAttendee, setSelectedInviteAttendee] = useState<Attendee | null>(null);

  // Optimistic Follow Toggle
  const handleToggleFollow = (id: string) => {
    setFollowingState((prev) => {
      const current = prev[id] ?? event.attendees.find((a) => a.id === id)?.isFollowing ?? false;
      return { ...prev, [id]: !current };
    });
  };

  // Crew Invite Trigger
  const handleOpenInviteModal = (attendee: Attendee) => {
    setSelectedInviteAttendee(attendee);
  };

  const handleInviteSuccess = () => {
    // Invitation callback
  };

  // Filter & Sort Logic
  const filteredAndSortedAttendees = useMemo(() => {
    let list = [...event.attendees];

    // 1. Text Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.bio.toLowerCase().includes(q) ||
          a.musicTaste.toLowerCase().includes(q) ||
          a.area.toLowerCase().includes(q) ||
          a.interests.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    switch (activeFilter) {
      case "PEOPLE YOU FOLLOW":
        list = list.filter((a) => {
          const isF = followingState[a.id] ?? a.isFollowing ?? false;
          return isF;
        });
        break;
      case "VIBE MATCHES":
        list = list.filter((a) => (a.vibeMatch ?? 0) >= 88);
        break;
      case "CREW LOOKING":
        list = list.filter((a) => a.crewStatus === "looking");
        break;
      case "NEW CONNECTIONS":
        list = list.filter((a) => a.joinedRecently || a.mutualConnections <= 2);
        break;
      case "ALL":
      default:
        break;
    }

    // 3. Sorting
    switch (activeSort) {
      case "Vibe Match":
        list.sort((a, b) => (b.vibeMatch ?? 0) - (a.vibeMatch ?? 0));
        break;
      case "Mutual Connections":
        list.sort((a, b) => b.mutualConnections - a.mutualConnections);
        break;
      case "Recently Joined":
        list.sort((a, b) => (b.joinedRecently ? 1 : 0) - (a.joinedRecently ? 1 : 0));
        break;
      case "Recommended":
      default:
        // Rank by composite vibeScore + match
        list.sort((a, b) => b.vibeScore - a.vibeScore);
        break;
    }

    return list;
  }, [event.attendees, searchQuery, activeFilter, activeSort, followingState]);

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="w-full pt-[96px] pb-[100px] relative z-10">
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* 2. Page Header & Event Summary Card */}
          <GoingHeader event={event} />

          {/* 3. Social Statistics Row */}
          <SocialStatsRow event={event} />

          {/* 4. Vibe Match Section (PEOPLE YOU MAY VIBE WITH) */}
          <FeaturedVibeMatches
            vibeMatches={event.vibeMatches}
            followingState={followingState}
            onToggleFollow={handleToggleFollow}
            onOpenInviteModal={handleOpenInviteModal}
          />

          {/* 5. Crew Discovery Section (LOOKING FOR A CREW?) */}
          <CrewDiscoverySection
            event={event}
            onOpenInviteModal={handleOpenInviteModal}
          />

          {/* 6. Filter & Search Bar */}
          <div className="pt-6 border-t border-[#1A1A1A]/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
                  FULL ATTENDEE DIRECTORY
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight"
                  style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
                >
                  EVERYONE GOING
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1">
                  Discover the crowd before you arrive. Find shared interests and mutual connections.
                </p>
              </div>
            </div>

            <AttendeeFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              activeSort={activeSort}
              onSortChange={setActiveSort}
              totalFilteredCount={filteredAndSortedAttendees.length}
            />

            {/* 7. Attendees Grid / Empty State */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <AttendeeCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredAndSortedAttendees.length === 0 ? (
              /* Empty States */
              searchQuery ? (
                <div className="w-full py-16 px-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex items-center justify-center mb-4 text-[#666666]">
                    <SearchX className="w-6 h-6 text-[#EC4899]" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-1">
                    NO MATCHES FOUND
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] font-sans max-w-sm mb-6">
                    Try another name, area, or music genre, or reset filters to explore the full crowd.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("ALL");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold transition-colors"
                  >
                    RESET SEARCH &amp; FILTERS
                  </button>
                </div>
              ) : (
                <div className="w-full py-16 px-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex items-center justify-center mb-4 text-[#8B5CF6]">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-1">
                    BE THE FIRST IN
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] font-sans max-w-sm mb-6">
                    No one has joined this view yet. Grab your ticket and be the first to start the vibe.
                  </p>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold transition-colors"
                  >
                    <span>VIEW EVENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            ) : (
              /* Responsive Grid: Desktop 4, Tablet 3, Mobile 2 */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {filteredAndSortedAttendees.map((person) => {
                  const isFollowing =
                    followingState[person.id] ?? person.isFollowing ?? false;

                  return (
                    <AttendeeCard
                      key={person.id}
                      attendee={person}
                      isFollowing={isFollowing}
                      onToggleFollow={handleToggleFollow}
                      onInviteToCrew={handleOpenInviteModal}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 8. Invite to Crew Modal */}
      {selectedInviteAttendee && (
        <InviteCrewModal
          attendee={selectedInviteAttendee}
          eventId={event.id}
          crews={event.crews}
          onClose={() => setSelectedInviteAttendee(null)}
          onInviteSuccess={handleInviteSuccess}
        />
      )}

      {/* 9. Footer */}
      <Footer />
    </main>
  );
}
