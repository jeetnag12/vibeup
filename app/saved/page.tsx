"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import ClubCard from "@/components/club/ClubCard";
import CommunityCard from "@/components/community/CommunityCard";
import {
  initialSavedEvents,
  initialSavedClubs,
  initialSavedCommunities,
  SavedTab,
  SavedEventItem,
} from "@/lib/saved-data";
import { Club } from "@/lib/clubs-data";
import { Community } from "@/lib/communities-data";
import {
  Bookmark,
  Search,
  X,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function SavedPage() {
  const router = useRouter();

  // Local saved collections state (instant reactive removal)
  const [savedEvents, setSavedEvents] =
    useState<SavedEventItem[]>(initialSavedEvents);
  const [savedClubs, setSavedClubs] = useState<Club[]>(initialSavedClubs);
  const [savedCommunities, setSavedCommunities] = useState<Community[]>(
    initialSavedCommunities
  );

  // Tab & search state
  const [activeTab, setActiveTab] = useState<SavedTab>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Following state for clubs (local UI state)
  const [followingClubs, setFollowingClubs] = useState<Record<string, boolean>>(
    {
      "xyz-club": true,
      "the-black-box": true,
      "playboy-club": false,
      "the-humming-tree": true,
    }
  );

  // Joined state for communities (local UI state)
  const [joinedCommunities, setJoinedCommunities] = useState<
    Record<string, boolean>
  >({
    "bangalore-techno-society": true,
    "house-heads-bangalore": true,
    "indiranagar-night-owls": false,
    "underground-bangalore": true,
  });

  // Toggle club follow state
  const handleToggleClubFollow = (clubId: string) => {
    setFollowingClubs((prev) => ({
      ...prev,
      [clubId]: !prev[clubId],
    }));
  };

  // Toggle community join state
  const handleToggleCommunityJoin = (communityId: string) => {
    setJoinedCommunities((prev) => ({
      ...prev,
      [communityId]: !prev[communityId],
    }));
  };

  // Remove actions
  const handleRemoveEvent = (eventId: string) => {
    setSavedEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const handleRemoveClub = (clubId: string) => {
    setSavedClubs((prev) => prev.filter((c) => c.id !== clubId));
  };

  const handleRemoveCommunity = (commId: string) => {
    setSavedCommunities((prev) => prev.filter((c) => c.id !== commId));
  };

  // Filtered collections based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return savedEvents;
    const q = searchQuery.toLowerCase().trim();
    return savedEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.area.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        (e.genre && e.genre.toLowerCase().includes(q))
    );
  }, [savedEvents, searchQuery]);

  const filteredClubs = useMemo(() => {
    if (!searchQuery.trim()) return savedClubs;
    const q = searchQuery.toLowerCase().trim();
    return savedClubs.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q) ||
        (c.location && c.location.toLowerCase().includes(q)) ||
        c.genres.some((g) => g.toLowerCase().includes(q))
    );
  }, [savedClubs, searchQuery]);

  const filteredCommunities = useMemo(() => {
    if (!searchQuery.trim()) return savedCommunities;
    const q = searchQuery.toLowerCase().trim();
    return savedCommunities.filter(
      (comm) =>
        comm.name.toLowerCase().includes(q) ||
        comm.category.toLowerCase().includes(q) ||
        (comm.area && comm.area.toLowerCase().includes(q)) ||
        comm.description.toLowerCase().includes(q) ||
        comm.genres.some((g) => g.toLowerCase().includes(q))
    );
  }, [savedCommunities, searchQuery]);

  // Overall counts
  const totalSavedCount =
    savedEvents.length + savedClubs.length + savedCommunities.length;
  const filteredTotalCount =
    filteredEvents.length + filteredClubs.length + filteredCommunities.length;

  const tabs: { key: SavedTab; label: string; count: number }[] = [
    { key: "ALL", label: "ALL", count: totalSavedCount },
    { key: "EVENTS", label: "EVENTS", count: savedEvents.length },
    { key: "CLUBS", label: "CLUBS", count: savedClubs.length },
    { key: "COMMUNITIES", label: "COMMUNITIES", count: savedCommunities.length },
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* Ambient Radial Background Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 2. Main Page Layout Container */}
      <div className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 pt-[88px] sm:pt-[96px] pb-16 relative z-10">
        {/* ================================================== */}
        {/* 3. PAGE HEADER */}
        {/* ================================================== */}
        <section className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#1A1A1A] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
                <span className="font-mono text-[11px] text-[#666666] uppercase tracking-wider font-semibold">
                  EVERYTHING YOU WANT TO COME BACK TO
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight leading-tight">
                SAVED
              </h1>

              {/* Secondary Supporting Text */}
              <p className="text-sm sm:text-base text-[#666666] font-sans mt-2 max-w-xl leading-relaxed">
                Keep your favorite events, clubs, and communities in one place.
              </p>
            </div>

            {/* Quick Stats Pill */}
            {totalSavedCount > 0 && (
              <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#111111] border border-[#1A1A1A] font-mono text-xs text-[#E4E4E7]">
                <Bookmark className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span className="font-bold text-white">{totalSavedCount}</span>
                <span className="text-[#666666]">ITEMS SAVED</span>
              </div>
            )}
          </div>

          {/* ================================================== */}
          {/* 4. TABS & SEARCH BAR CONTROLS */}
          {/* ================================================== */}
          <div className="mt-8 pt-6 border-t border-[#1A1A1A] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-200 shrink-0 flex items-center gap-2 border ${
                      isActive
                        ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_16px_rgba(139,92,246,0.35)]"
                        : "bg-[#111111] text-[#666666] hover:text-white border-[#1A1A1A] hover:border-[#8B5CF6]/40"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#111111] text-[#666666]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lightweight Local Search Field */}
            {totalSavedCount > 0 && (
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved items..."
                  aria-label="Search saved items"
                  className="w-full bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] rounded-xl pl-9 pr-8 py-2 text-xs font-sans text-white placeholder-[#666666] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ================================================== */}
        {/* 5. SEARCH RESULTS COUNT BANNER (When searching) */}
        {/* ================================================== */}
        {searchQuery.trim() && (
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-[#666666]">
            <span>
              SHOWING {filteredTotalCount} RESULT
              {filteredTotalCount === 1 ? "" : "S"} FOR &quot;{searchQuery}&quot;
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-[#8B5CF6] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>CLEAR SEARCH</span>
            </button>
          </div>
        )}

        {/* ================================================== */}
        {/* 6. CONTENT SECTIONS ACCORDING TO ACTIVE TAB */}
        {/* ================================================== */}

        {/* Global Empty State: No items saved at all */}
        {totalSavedCount === 0 && (
          <div className="py-[120px] px-4 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex flex-col items-center justify-center text-center shadow-2xl">
            <div className="w-16 h-16 rounded-[12px] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-5 ">
              <Bookmark className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
              NOTHING SAVED YET
            </h2>
            <p className="text-sm text-[#666666] font-sans mt-2 max-w-md mx-auto leading-relaxed">
              Your saved events, clubs, and communities will appear here so you can easily plan your next night.
            </p>
            <Link
              href="/discover"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>EXPLORE VIBEUP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Search Yields 0 Results */}
        {totalSavedCount > 0 && searchQuery.trim() && filteredTotalCount === 0 && (
          <div className="py-16 px-4 rounded-[12px] bg-[#111111] border border-[#1A1A1A] text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-center mx-auto text-[#666666]">
              <Search className="w-5 h-5" />
            </div>
            <h2 className="font-mono text-sm font-extrabold tracking-[-0.03em] text-white uppercase tracking-wider">
              NO SAVED ITEMS MATCH YOUR SEARCH
            </h2>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              We couldn&apos;t find any saved events, clubs, or communities matching &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 px-4 py-2 rounded-xl bg-[#111111] border border-[#1A1A1A] text-xs font-mono text-[#8B5CF6] hover:border-[#8B5CF6] transition-colors"
            >
              RESET SEARCH
            </button>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 1: ALL (Unified Curated Sections) */}
        {/* ================================================== */}
        {totalSavedCount > 0 && activeTab === "ALL" && (
          <div className="space-y-12">
            {/* 1. Saved Events Section */}
            {filteredEvents.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    <h2 className="font-mono text-sm sm:text-base font-extrabold tracking-[-0.03em] text-white tracking-wider uppercase">
                      SAVED EVENTS
                    </h2>
                    <span className="text-xs font-mono text-[#666666]">
                      ({filteredEvents.length})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab("EVENTS")}
                    className="text-xs font-mono text-[#8B5CF6] hover:text-white transition-colors inline-flex items-center gap-1 font-semibold group"
                  >
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      {...event}
                      saved={true}
                      onClick={() => router.push(`/events/${event.id}`)}
                      onSaveToggle={(saved) => {
                        if (!saved) handleRemoveEvent(event.id);
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* 2. Saved Clubs Section */}
            {filteredClubs.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
                    <h2 className="font-mono text-sm sm:text-base font-extrabold tracking-[-0.03em] text-white tracking-wider uppercase">
                      SAVED CLUBS
                    </h2>
                    <span className="text-xs font-mono text-[#666666]">
                      ({filteredClubs.length})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab("CLUBS")}
                    className="text-xs font-mono text-[#8B5CF6] hover:text-white transition-colors inline-flex items-center gap-1 font-semibold group"
                  >
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredClubs.map((club) => (
                    <ClubCard
                      key={club.id}
                      club={club}
                      isFollowing={Boolean(followingClubs[club.id])}
                      onToggleFollow={handleToggleClubFollow}
                      saved={true}
                      onSaveToggle={(clubId, saved) => {
                        if (!saved) handleRemoveClub(clubId);
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* 3. Saved Communities Section */}
            {filteredCommunities.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    <h2 className="font-mono text-sm sm:text-base font-extrabold tracking-[-0.03em] text-white tracking-wider uppercase">
                      SAVED COMMUNITIES
                    </h2>
                    <span className="text-xs font-mono text-[#666666]">
                      ({filteredCommunities.length})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab("COMMUNITIES")}
                    className="text-xs font-mono text-[#8B5CF6] hover:text-white transition-colors inline-flex items-center gap-1 font-semibold group"
                  >
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredCommunities.map((community) => (
                    <CommunityCard
                      key={community.id}
                      community={community}
                      isJoined={Boolean(joinedCommunities[community.id])}
                      onToggleJoin={handleToggleCommunityJoin}
                      saved={true}
                      onSaveToggle={(commId, saved) => {
                        if (!saved) handleRemoveCommunity(commId);
                      }}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 2: EVENTS */}
        {/* ================================================== */}
        {activeTab === "EVENTS" && (
          <div>
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    {...event}
                    saved={true}
                    onClick={() => router.push(`/events/${event.id}`)}
                    onSaveToggle={(saved) => {
                      if (!saved) handleRemoveEvent(event.id);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 px-4 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex flex-col items-center justify-center text-center shadow-xl">
                <div className="w-14 h-14 rounded-[12px] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-sans text-white">
                  No saved events yet.
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1.5 max-w-sm">
                  Discover upcoming parties, warehouse raves, and live concerts to save for later.
                </p>
                <Link
                  href="/discover"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                >
                  <span>Discover Events</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 3: CLUBS */}
        {/* ================================================== */}
        {activeTab === "CLUBS" && (
          <div>
            {filteredClubs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredClubs.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    isFollowing={Boolean(followingClubs[club.id])}
                    onToggleFollow={handleToggleClubFollow}
                    saved={true}
                    onSaveToggle={(clubId, saved) => {
                      if (!saved) handleRemoveClub(clubId);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 px-4 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex flex-col items-center justify-center text-center shadow-xl">
                <div className="w-14 h-14 rounded-[12px] bg-[#EC4899]/15 border border-[#EC4899]/30 flex items-center justify-center text-[#EC4899] mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-sans text-white">
                  No saved clubs yet.
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1.5 max-w-sm">
                  Explore Bangalore&apos;s best underground electronic spaces, cocktail lounges, and rooftop terraces.
                </p>
                <Link
                  href="/clubs"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                >
                  <span>Explore Clubs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 4: COMMUNITIES */}
        {/* ================================================== */}
        {activeTab === "COMMUNITIES" && (
          <div>
            {filteredCommunities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    isJoined={Boolean(joinedCommunities[community.id])}
                    onToggleJoin={handleToggleCommunityJoin}
                    saved={true}
                    onSaveToggle={(commId, saved) => {
                      if (!saved) handleRemoveCommunity(commId);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 px-4 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex flex-col items-center justify-center text-center shadow-xl">
                <div className="w-14 h-14 rounded-[12px] bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-sans text-white">
                  No saved communities yet.
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1.5 max-w-sm">
                  Join music societies, neighborhood night owls, and pre-drinks crews across the city.
                </p>
                <Link
                  href="/communities"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                >
                  <span>Explore Communities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 7. Global Footer */}
      <Footer />
    </main>
  );
}
