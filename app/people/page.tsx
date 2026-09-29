"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PeopleCard from "@/components/PeopleCard";
import {
  Search,
  Users,
  Sparkles,
  Calendar,
  MapPin,
  Flame,
  Radio,
  Clock,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import {
  mockPeopleData,
  peopleFilterCategories,
  PeopleFilterCategory,
} from "@/lib/people-data";

export default function PeopleDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<PeopleFilterCategory>("ALL");

  // Neighborhood filter for "Popular in Bangalore"
  const [activeArea, setActiveArea] = useState<string>("INDIRANAGAR");

  // Genre filter for "People Who Like What You Like"
  const [activeInterestGenre, setActiveInterestGenre] = useState<string>("TECHNO");

  // Local follow state mapping
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    mockPeopleData.forEach((p) => {
      initial[p.id] = p.following;
    });
    return initial;
  });

  const toggleFollow = (personId: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [personId]: !prev[personId],
    }));
  };

  // Filtered people based on search and category
  const filteredPeople = useMemo(() => {
    let result = [...mockPeopleData];

    // Filter by category
    if (activeFilter === "NEARBY") {
      result = result.filter(
        (p) =>
          p.area.toLowerCase().includes("indiranagar") ||
          p.area.toLowerCase().includes("koramangala") ||
          p.area.toLowerCase().includes("cbd")
      );
    } else if (activeFilter === "MUSIC") {
      result = result.filter((p) => p.genres.length > 0);
    } else if (activeFilter === "EVENTS") {
      result = result.filter((p) => p.upcomingEvents.length > 0);
    } else if (activeFilter === "CLUBS") {
      result = result.filter((p) => p.clubs.length > 0);
    } else if (activeFilter === "COMMUNITIES") {
      result = result.filter((p) => p.communities.length > 0);
    } else if (activeFilter === "ACTIVE NOW") {
      result = result.filter(
        (p) =>
          p.activeStatus === "ONLINE" || p.activeStatus === "GOING OUT TONIGHT"
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const usernameMatch = p.username.toLowerCase().includes(q);
        const areaMatch = p.area.toLowerCase().includes(q);
        const locationMatch = p.location.toLowerCase().includes(q);
        const genreMatch = p.genres.some((g) => g.toLowerCase().includes(q));
        const interestMatch = p.interests.some((i) => i.toLowerCase().includes(q));
        const clubMatch = p.clubs.some((c) => c.name.toLowerCase().includes(q));
        const communityMatch = p.communities.some((cm) =>
          cm.name.toLowerCase().includes(q)
        );
        const eventMatch = p.upcomingEvents.some((ev) =>
          ev.name.toLowerCase().includes(q)
        );

        return (
          nameMatch ||
          usernameMatch ||
          areaMatch ||
          locationMatch ||
          genreMatch ||
          interestMatch ||
          clubMatch ||
          communityMatch ||
          eventMatch
        );
      });
    }

    return result;
  }, [activeFilter, searchQuery]);

  // People for "People You May Vibe With" (highest vibe match)
  const peopleYouMayVibeWith = useMemo(() => {
    return [...mockPeopleData].sort((a, b) => b.vibeMatch - a.vibeMatch).slice(0, 4);
  }, []);

  // Event Contextual People (Section 12: People Going to Events)
  const eventContextData = useMemo(() => {
    const targetEvent = {
      id: "cyberpunk-neon-warehouse",
      name: "CYBERPUNK NEON WAREHOUSE",
      date: "Fri, 16 Oct · 10:00 PM",
    };
    const attendees = mockPeopleData.filter((p) =>
      p.upcomingEvents.some((ev) => ev.id === targetEvent.id)
    );
    return {
      event: targetEvent,
      people: attendees.length > 0 ? attendees : mockPeopleData.slice(0, 3),
    };
  }, []);

  // Area People (Section 13: Popular in Bangalore)
  const areaPeople = useMemo(() => {
    const matches = mockPeopleData.filter((p) =>
      p.area.toUpperCase().includes(activeArea)
    );
    return matches.length > 0 ? matches : mockPeopleData.slice(0, 4);
  }, [activeArea]);

  // Shared Interests People (Section 14)
  const sharedInterestPeople = useMemo(() => {
    const matches = mockPeopleData.filter((p) =>
      p.genres.some((g) => g.toUpperCase().includes(activeInterestGenre))
    );
    return matches.length > 0 ? matches : mockPeopleData.slice(0, 4);
  }, [activeInterestGenre]);

  // Active Tonight People (Section 15)
  const activeTonightPeople = useMemo(() => {
    return mockPeopleData
      .filter((p) => p.activeStatus === "GOING OUT TONIGHT" || p.activeStatus === "ONLINE")
      .slice(0, 4);
  }, []);

  // Followed People (Section 16)
  const followedPeople = useMemo(() => {
    return mockPeopleData.filter((p) => followingMap[p.id]);
  }, [followingMap]);

  const isFilteringOrSearching =
    searchQuery.trim().length > 0 || activeFilter !== "ALL";

  const clearFilters = () => {
    setSearchQuery("");
    setActiveFilter("ALL");
  };

  const areasList = ["INDIRANAGAR", "KORAMANGALA", "CBD", "HSR", "WHITEFIELD"];

  const interestGenresList = [
    "TECHNO",
    "HOUSE",
    "HIP-HOP",
    "AFRO HOUSE",
    "LIVE MUSIC",
    "BOLLYWOOD",
    "INDIE",
  ];

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[88px] sm:pt-[96px] pb-[80px]">
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 space-y-10">
          {/* ==================================================
              1. PAGE HEADER
          ================================================== */}
          <section className="text-center max-w-2xl mx-auto space-y-3 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>NIGHTLIFE SOCIAL GRAPH</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white uppercase">
              FIND YOUR CROWD
            </h1>

            <p className="text-sm sm:text-base text-[#A1A1AA] font-sans leading-relaxed">
              Discover people who share your music, nightlife and weekend energy.
            </p>
          </section>

          {/* ==================================================
              2. SEARCH & 3. DISCOVERY FILTERS
          ================================================== */}
          <section className="max-w-4xl mx-auto space-y-4">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH PEOPLE BY NAME, GENRE, AREA, CLUB OR COMMUNITY..."
                className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-2xl bg-[#141418] border border-[#2A2A35] focus:border-[#8B5CF6] focus:outline-none text-xs sm:text-sm font-mono text-white placeholder-[#71717A] transition-colors shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#A1A1AA] hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Horizontally Scrollable Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {peopleFilterCategories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 border ${
                      isActive
                        ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                        : "bg-[#141418] hover:bg-[#1A1A21] text-[#A1A1AA] hover:text-white border-[#2A2A35]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ==================================================
              SEARCH / FILTER RESULTS OVERRIDE (WHEN ACTIVE)
          ================================================== */}
          {isFilteringOrSearching ? (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#2A2A35] pb-4">
                <div>
                  <h2 className="font-mono text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
                    DISCOVERY RESULTS
                  </h2>
                  <p className="text-xs text-[#A1A1AA] font-sans mt-0.5">
                    Showing {filteredPeople.length} people matching your criteria.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#EC4899] hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET FILTERS</span>
                </button>
              </div>

              {filteredPeople.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredPeople.map((person) => (
                    <PeopleCard
                      key={person.id}
                      person={person}
                      isFollowing={Boolean(followingMap[person.id])}
                      onToggleFollow={toggleFollow}
                    />
                  ))}
                </div>
              ) : (
                /* ==================================================
                    10. EMPTY STATE
                ================================================== */
                <div className="py-16 text-center rounded-[20px] bg-[#141418] border border-[#2A2A35] space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto text-[#8B5CF6]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-lg text-white">
                      NO PEOPLE FOUND
                    </h3>
                    <p className="text-xs text-[#A1A1AA] font-sans max-w-sm mx-auto">
                      Try searching another genre, location, or reset active filters to explore more of Bangalore’s nightlife crowd.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-mono font-bold text-white transition-colors"
                  >
                    CLEAR FILTERS
                  </button>
                </div>
              )}
            </section>
          ) : (
            /* ==================================================
                CURATED SECTIONS (DEFAULT FEED)
            ================================================== */
            <div className="space-y-12">
              {/* ==================================================
                  4. PEOPLE YOU MAY VIBE WITH (Primary Section)
              ================================================== */}
              <section aria-label="People You May Vibe With" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#2A2A35] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                      <h2 className="font-mono text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
                        PEOPLE YOU MAY VIBE WITH
                      </h2>
                    </div>
                    <p className="text-sm text-[#A1A1AA] font-sans">
                      People with interests and nightlife energy similar to yours.
                    </p>
                  </div>

                  <span className="font-mono text-xs text-[#22C55E]">
                    TOP COMPATIBILITY MATCHES
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {peopleYouMayVibeWith.map((person) => (
                    <PeopleCard
                      key={person.id}
                      person={person}
                      isFollowing={Boolean(followingMap[person.id])}
                      onToggleFollow={toggleFollow}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  5. PEOPLE GOING TO EVENTS (Section 12)
              ================================================== */}
              <section aria-label="People Going to Events" className="space-y-6">
                <div className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A35] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#EC4899]" />
                        <h2 className="font-mono text-xs font-bold text-[#EC4899] uppercase tracking-wider">
                          PEOPLE GOING TO EVENTS
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold text-white font-sans">
                        <Link
                          href={`/events/${eventContextData.event.id}`}
                          className="hover:text-[#8B5CF6] transition-colors underline-offset-4 hover:underline"
                        >
                          {eventContextData.event.name}
                        </Link>
                        <span className="text-[#A1A1AA] text-xs font-mono font-normal">
                          · {eventContextData.event.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 px-3 py-1 rounded-full">
                        12 PEOPLE YOU MAY VIBE WITH
                      </span>
                      <Link
                        href={`/events/${eventContextData.event.id}`}
                        className="font-mono text-xs text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-1"
                      >
                        <span>EVENT</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventContextData.people.map((person) => (
                      <PeopleCard
                        key={person.id}
                        person={person}
                        isFollowing={Boolean(followingMap[person.id])}
                        onToggleFollow={toggleFollow}
                        eventContext={eventContextData.event}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* ==================================================
                  6. POPULAR IN YOUR AREA (Section 13)
              ================================================== */}
              <section aria-label="Popular in Bangalore" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#2A2A35] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-[#22C55E]" />
                      <h2 className="font-mono text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                        POPULAR IN BANGALORE
                      </h2>
                    </div>
                    <p className="text-sm text-[#A1A1AA] font-sans">
                      Active nightlife enthusiasts across Bangalore’s major party hubs.
                    </p>
                  </div>

                  {/* Area Switcher Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {areasList.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setActiveArea(area)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors ${
                          activeArea === area
                            ? "bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/50 font-bold"
                            : "bg-[#141418] text-[#A1A1AA] hover:text-white border border-[#2A2A35]"
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {areaPeople.map((person) => (
                    <PeopleCard
                      key={person.id}
                      person={person}
                      isFollowing={Boolean(followingMap[person.id])}
                      onToggleFollow={toggleFollow}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  7. SHARED INTERESTS (Section 14: People Who Like What You Like)
              ================================================== */}
              <section aria-label="Shared Interests" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#2A2A35] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-4 h-4 text-[#EC4899]" />
                      <h2 className="font-mono text-xs font-bold text-[#EC4899] uppercase tracking-wider">
                        PEOPLE WHO LIKE WHAT YOU LIKE
                      </h2>
                    </div>
                    <p className="text-sm text-[#A1A1AA] font-sans">
                      Connect around specific music genres and sound subcultures.
                    </p>
                  </div>

                  {/* Genre Switcher Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {interestGenresList.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => setActiveInterestGenre(genre)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors ${
                          activeInterestGenre === genre
                            ? "bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/50 font-bold"
                            : "bg-[#141418] text-[#A1A1AA] hover:text-white border border-[#2A2A35]"
                        }`}
                      >
                        #{genre}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sharedInterestPeople.map((person) => (
                    <PeopleCard
                      key={person.id}
                      person={person}
                      isFollowing={Boolean(followingMap[person.id])}
                      onToggleFollow={toggleFollow}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  8. ACTIVE NIGHTLIFE PEOPLE (Section 15: Active Tonight)
              ================================================== */}
              <section aria-label="Active Tonight" className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2A2A35] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Radio className="w-4 h-4 text-[#8B5CF6] animate-pulse" />
                      <h2 className="font-mono text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
                        ACTIVE TONIGHT
                      </h2>
                    </div>
                    <p className="text-sm text-[#A1A1AA] font-sans">
                      Partygoers and music lovers currently exploring events or heading out.
                    </p>
                  </div>

                  <span className="font-mono text-xs text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-3 py-1 rounded-full">
                    LIVE DISCOVERY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeTonightPeople.map((person) => (
                    <PeopleCard
                      key={person.id}
                      person={person}
                      isFollowing={Boolean(followingMap[person.id])}
                      onToggleFollow={toggleFollow}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  9. FOLLOWED PEOPLE (Section 16: People You Follow)
              ================================================== */}
              <section aria-label="People You Follow" className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2A2A35] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-[#22C55E]" />
                      <h2 className="font-mono text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                        PEOPLE YOU FOLLOW
                      </h2>
                    </div>
                    <p className="text-sm text-[#A1A1AA] font-sans">
                      Keep up with your crew’s weekend plans and community activity.
                    </p>
                  </div>

                  <span className="font-mono text-xs text-white">
                    {followedPeople.length} FOLLOWING
                  </span>
                </div>

                {followedPeople.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {followedPeople.map((person) => (
                      <div
                        key={person.id}
                        className="p-4 rounded-[16px] bg-[#141418] border border-[#2A2A35] hover:border-[#8B5CF6] transition-colors flex items-center justify-between gap-3"
                      >
                        <Link
                          href={`/people/${person.id}`}
                          className="flex items-center gap-3 truncate group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="w-11 h-11 rounded-full object-cover border border-[#2A2A35] shrink-0"
                          />
                          <div className="truncate">
                            <span className="font-sans font-bold text-xs sm:text-sm text-white group-hover:text-[#8B5CF6] transition-colors block truncate">
                              {person.name}
                            </span>
                            <span className="font-mono text-[11px] text-[#A1A1AA] block truncate">
                              {person.recentActivity.text}
                            </span>
                            <span className="font-mono text-[9px] text-[#71717A] flex items-center gap-1 mt-0.5">
                              <Clock className="w-2.5 h-2.5" />
                              <span>{person.recentActivity.time}</span>
                            </span>
                          </div>
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleFollow(person.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-[10px] font-mono font-bold shrink-0 hover:bg-[#22C55E]/25 transition-colors"
                        >
                          FOLLOWING
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-[16px] bg-[#141418] border border-[#2A2A35] text-xs font-mono text-[#A1A1AA]">
                    You haven’t followed anyone yet. Click FOLLOW on any profile above to build your nightlife network.
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
