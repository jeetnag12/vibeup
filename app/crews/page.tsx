"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CrewCard from "@/components/CrewCard";
import {
  Search,
  Users,
  MapPin,
  Sparkles,
  Flame,
  Radio,
  Plus,
  X,
  Check,
  ArrowRight,
  RotateCcw,
  Zap,
} from "lucide-react";
import {
  allCrewsData,
  crewFilterCategories,
  CrewFilterCategory,
  Crew,
  CrewType,
} from "@/lib/crews-data";

export default function CrewsDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<CrewFilterCategory>("ALL");

  // Local list of crews (allows adding new crews from modal)
  const [crewsList, setCrewsList] = useState<Crew[]>(allCrewsData);

  // Local join state mapping: { [crewId]: boolean }
  const [joinedMap, setJoinedMap] = useState<Record<string, boolean>>({});

  const toggleJoin = (crewId: string) => {
    setJoinedMap((prev) => ({
      ...prev,
      [crewId]: !prev[crewId],
    }));
  };

  // Area filter for "Crews Around Bangalore"
  const [activeArea, setActiveArea] = useState<string>("INDIRANAGAR");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreatedToast, setShowCreatedToast] = useState(false);

  // New Crew Form fields
  const [formName, setFormName] = useState("");
  const [formEvent, setFormEvent] = useState("Cyberpunk Neon Warehouse");
  const [formDate, setFormDate] = useState("Tonight");
  const [formTime, setFormTime] = useState("10:00 PM");
  const [formMaxMembers, setFormMaxMembers] = useState(8);
  const [formGenre, setFormGenre] = useState("TECHNO");
  const [formArea, setFormArea] = useState("Indiranagar");
  const [formDescription, setFormDescription] = useState("");

  const handleCreateCrew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newCrew: Crew = {
      id: `custom-crew-${Date.now()}`,
      name: formName.trim().toUpperCase(),
      description:
        formDescription.trim() ||
        "Planning a night out with good crowd, pre-drinks and front-row dancefloor energy.",
      coverImage:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      eventId: "cyberpunk-neon-warehouse",
      eventName: formEvent.toUpperCase(),
      venue: "Basement Vault",
      date: formDate,
      time: formTime,
      area: formArea,
      genres: [formGenre, "NIGHTLIFE"],
      type: "CLUB NIGHT" as CrewType,
      memberCount: 1,
      maxMembers: Number(formMaxMembers) || 8,
      activityCount: "NEW CREW",
      isFull: false,
      createdBy: "You",
      isTonight: formDate.toLowerCase().includes("tonight"),
      isThisWeekend: true,
      timeframe: formDate.toLowerCase().includes("tonight")
        ? "tonight"
        : "this-weekend",
      members: [
        {
          id: "arjun-wav",
          name: "You",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
          vibeMatch: 100,
        },
      ],
    };

    setCrewsList((prev) => [newCrew, ...prev]);
    // Automatically join your own crew
    setJoinedMap((prev) => ({ ...prev, [newCrew.id]: true }));

    // Reset & Close
    setFormName("");
    setFormDescription("");
    setIsModalOpen(false);
    setShowCreatedToast(true);
    setTimeout(() => setShowCreatedToast(false), 3000);
  };

  // Filtered crews based on search and horizontal filter pills
  const filteredCrews = useMemo(() => {
    let result = [...crewsList];

    // Filter by horizontal pill
    if (activeFilter === "TONIGHT") {
      result = result.filter((c) => c.isTonight);
    } else if (activeFilter === "THIS WEEKEND") {
      result = result.filter((c) => c.isThisWeekend);
    } else if (activeFilter === "NEARBY") {
      result = result.filter(
        (c) =>
          c.area.toLowerCase().includes("indiranagar") ||
          c.area.toLowerCase().includes("koramangala") ||
          c.area.toLowerCase().includes("cbd")
      );
    } else if (activeFilter === "TECHNO") {
      result = result.filter((c) =>
        c.genres.some((g) => g.toLowerCase().includes("techno"))
      );
    } else if (activeFilter === "HOUSE") {
      result = result.filter((c) =>
        c.genres.some((g) => g.toLowerCase().includes("house"))
      );
    } else if (activeFilter === "HIP-HOP") {
      result = result.filter((c) =>
        c.genres.some((g) => g.toLowerCase().includes("hip-hop"))
      );
    } else if (activeFilter === "LIVE MUSIC") {
      result = result.filter((c) =>
        c.genres.some((g) => g.toLowerCase().includes("live music") || g.toLowerCase().includes("indie"))
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(q);
        const eventMatch = c.eventName.toLowerCase().includes(q);
        const venueMatch = c.venue.toLowerCase().includes(q);
        const areaMatch = c.area.toLowerCase().includes(q);
        const genreMatch = c.genres.some((g) => g.toLowerCase().includes(q));
        const descMatch = c.description.toLowerCase().includes(q);
        const typeMatch = c.type.toLowerCase().includes(q);

        return (
          nameMatch ||
          eventMatch ||
          venueMatch ||
          areaMatch ||
          genreMatch ||
          descMatch ||
          typeMatch
        );
      });
    }

    return result;
  }, [activeFilter, searchQuery, crewsList]);

  // Section 4: Crews You May Join (top curated)
  const crewsYouMayJoin = useMemo(() => {
    return crewsList.slice(0, 3);
  }, [crewsList]);

  // Section 5: Going Out Tonight (Grouped by event)
  const tonightGroups = useMemo(() => {
    const tonightCrews = crewsList.filter((c) => c.isTonight);
    const groups: Record<
      string,
      {
        eventId: string;
        eventName: string;
        venue: string;
        area: string;
        crews: Crew[];
      }
    > = {};

    tonightCrews.forEach((c) => {
      if (!groups[c.eventId]) {
        groups[c.eventId] = {
          eventId: c.eventId,
          eventName: c.eventName,
          venue: c.venue,
          area: c.area,
          crews: [],
        };
      }
      groups[c.eventId].crews.push(c);
    });

    return Object.values(groups);
  }, [crewsList]);

  // Section 6: Popular Crews
  const popularCrews = useMemo(() => {
    return crewsList.filter((c) => c.isPopular).slice(0, 3);
  }, [crewsList]);

  // Section 7: Crews Around Bangalore (filtered by activeArea tab)
  const areaCrews = useMemo(() => {
    const matches = crewsList.filter((c) =>
      c.area.toUpperCase().includes(activeArea)
    );
    return matches.length > 0 ? matches : crewsList.slice(0, 3);
  }, [activeArea, crewsList]);

  const isFilteringOrSearching =
    searchQuery.trim().length > 0 || activeFilter !== "ALL";

  const clearFilters = () => {
    setSearchQuery("");
    setActiveFilter("ALL");
  };

  const areasList = ["INDIRANAGAR", "KORAMANGALA", "CBD", "HSR", "WHITEFIELD"];

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
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
              <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>NIGHTLIFE PLANS & CREWS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] font-sans tracking-tight text-white uppercase">
              FIND YOUR CREW
            </h1>

            <p className="text-sm sm:text-base text-[#666666] font-sans leading-relaxed">
              Don&apos;t go out alone. Find people heading to the same night.
            </p>
          </section>

          {/* ==================================================
              2. SEARCH CREWS & 3. DISCOVERY FILTERS
          ================================================== */}
          <section className="max-w-4xl mx-auto space-y-4">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH CREWS BY NAME, EVENT, VENUE, AREA OR GENRE..."
                className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-[12px] bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs sm:text-sm font-mono text-white placeholder-[#666666] transition-colors shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#666666] hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Horizontally Scrollable Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {crewFilterCategories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 border ${
                      isActive
                        ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                        : "bg-[#111111] hover:bg-[#111111] text-[#666666] hover:text-white border-[#1A1A1A]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ==================================================
              SEARCH / FILTER OVERRIDE RESULTS (WHEN ACTIVE)
          ================================================== */}
          {isFilteringOrSearching ? (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
                <div>
                  <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                    DISCOVERED CREWS
                  </h2>
                  <p className="text-xs text-[#666666] font-sans mt-0.5">
                    Showing {filteredCrews.length} crews matching your criteria.
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

              {filteredCrews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCrews.map((crew) => (
                    <CrewCard
                      key={crew.id}
                      crew={crew}
                      isJoined={Boolean(joinedMap[crew.id])}
                      onToggleJoin={toggleJoin}
                    />
                  ))}
                </div>
              ) : (
                /* ==================================================
                    22. EMPTY STATE
                ================================================== */
                <div className="py-16 text-center rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto text-[#8B5CF6]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-lg text-white">
                      NO CREWS FOUND
                    </h3>
                    <p className="text-xs text-[#666666] font-sans max-w-sm mx-auto">
                      Try searching another event, genre or area, or start your own crew to rally partygoers.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="px-5 py-2.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-xs font-mono text-white transition-colors"
                    >
                      CLEAR FILTERS
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-mono font-bold text-white transition-colors"
                    >
                      CREATE A CREW
                    </button>
                  </div>
                </div>
              )}
            </section>
          ) : (
            /* ==================================================
                CURATED SECTIONS (DEFAULT FEED)
            ================================================== */
            <div className="space-y-12">
              {/* ==================================================
                  4. CREWS YOU MAY JOIN (Section 10)
              ================================================== */}
              <section aria-label="Crews You May Join" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#1A1A1A] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                      <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                        CREWS YOU MAY JOIN
                      </h2>
                    </div>
                    <p className="text-sm text-[#666666] font-sans">
                      People planning nights that match your vibe.
                    </p>
                  </div>

                  <span className="font-mono text-xs text-[#22C55E]">
                    SPOTS CURRENTLY OPEN
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crewsYouMayJoin.map((crew) => (
                    <CrewCard
                      key={crew.id}
                      crew={crew}
                      isJoined={Boolean(joinedMap[crew.id])}
                      onToggleJoin={toggleJoin}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  5. GOING OUT TONIGHT (Section 11) - Grouped by Event
              ================================================== */}
              <section aria-label="Going Out Tonight" className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Radio className="w-4 h-4 text-[#EC4899] animate-pulse" />
                      <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#EC4899] uppercase tracking-wider">
                        GOING OUT TONIGHT
                      </h2>
                    </div>
                    <p className="text-sm text-[#666666] font-sans">
                      Actionable plans for tonight: find a squad before doors open.
                    </p>
                  </div>

                  <span className="font-mono text-xs text-[#EC4899] bg-[#EC4899]/15 border border-[#EC4899]/30 px-3 py-1 rounded-full">
                    LIVE TODAY
                  </span>
                </div>

                <div className="space-y-6">
                  {tonightGroups.map((group) => (
                    <div
                      key={group.eventId}
                      className="p-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-6"
                    >
                      {/* Event Banner */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A] pb-4">
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] text-[#666666] uppercase block">
                            EVENT DESTINATION
                          </span>
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-white">
                            {group.eventName}
                          </h3>
                          <div className="flex items-center gap-3 text-xs font-mono text-[#666666]">
                            <span>{group.venue}</span>
                            <span>·</span>
                            <span className="text-[#EC4899]">{group.area}</span>
                          </div>
                        </div>

                        <Link
                          href={`/events/${group.eventId}`}
                          className="px-4 py-2 rounded-[4px] bg-[#111111] hover:bg-[#252530] border border-[#1A1A1A] text-xs font-mono text-white flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto"
                        >
                          <span>VIEW EVENT</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        </Link>
                      </div>

                      {/* Crews attending this event */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.crews.map((crew) => (
                          <CrewCard
                            key={crew.id}
                            crew={crew}
                            isJoined={Boolean(joinedMap[crew.id])}
                            onToggleJoin={toggleJoin}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ==================================================
                  6. POPULAR CREWS (Section 12)
              ================================================== */}
              <section aria-label="Popular Crews" className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-amber-400 uppercase tracking-wider">
                        POPULAR CREWS
                      </h2>
                    </div>
                    <p className="text-sm text-[#666666] font-sans">
                      Trending squads seeing high community interest and fast signups.
                    </p>
                  </div>

                  <span className="font-mono text-xs text-amber-400">
                    TRENDING IN BANGALORE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularCrews.map((crew) => (
                    <CrewCard
                      key={crew.id}
                      crew={crew}
                      isJoined={Boolean(joinedMap[crew.id])}
                      onToggleJoin={toggleJoin}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  7. CREWS NEAR YOU (Section 13: Around Bangalore)
              ================================================== */}
              <section aria-label="Crews Around Bangalore" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1A1A1A] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-[#22C55E]" />
                      <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#22C55E] uppercase tracking-wider">
                        CREWS AROUND BANGALORE
                      </h2>
                    </div>
                    <p className="text-sm text-[#666666] font-sans">
                      Neighborhood pre-drinks and ride shares organizing near your zone.
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
                            : "bg-[#111111] text-[#666666] hover:text-white border border-[#1A1A1A]"
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {areaCrews.map((crew) => (
                    <CrewCard
                      key={crew.id}
                      crew={crew}
                      isJoined={Boolean(joinedMap[crew.id])}
                      onToggleJoin={toggleJoin}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  8. CREATE A CREW CTA (Section 15)
              ================================================== */}
              <section
                aria-label="Create a Crew CTA"
                className="p-8 sm:p-12 rounded-[12px] bg-gradient-to-r from-[#111111] via-[#111111] to-[#111111] border border-[#1A1A1A] relative overflow-hidden shadow-2xl text-center max-w-3xl mx-auto"
              >
                {/* Ambient glow accent */}
                <div
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 pointer-events-none rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
                    <Plus className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>START A NEW NIGHT</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                    NO CREW? BUILD YOUR OWN.
                  </h2>

                  <p className="text-sm sm:text-base text-[#D4D4D8] font-sans max-w-md mx-auto leading-relaxed">
                    Pick an event, invite your people and make the plan. Coordinate rides, pre-drinks, and meetups.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-8 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold transition-all  inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>CREATE A CREW</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      {/* ==================================================
          16. CREATE CREW MODAL
      ================================================== */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-crew-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8B5CF6]" />
                <h3
                  id="create-crew-modal-title"
                  className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight"
                >
                  CREATE A CREW
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-[#111111] hover:bg-[#1A1A1A] text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCrew} className="space-y-4">
              {/* Crew Name */}
              <div>
                <label
                  htmlFor="crew-name-input"
                  className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                >
                  CREW NAME *
                </label>
                <input
                  id="crew-name-input"
                  type="text"
                  required
                  placeholder="e.g. Front-Row Techno Squad"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white placeholder-[#666666]"
                />
              </div>

              {/* Event selection */}
              <div>
                <label
                  htmlFor="crew-event-select"
                  className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                >
                  EVENT *
                </label>
                <select
                  id="crew-event-select"
                  value={formEvent}
                  onChange={(e) => setFormEvent(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-mono text-white"
                >
                  <option value="Cyberpunk Neon Warehouse">
                    Cyberpunk Neon Warehouse · Tonight
                  </option>
                  <option value="Saturday Techno Odyssey">
                    Saturday Techno Odyssey · Sat, 17 Oct
                  </option>
                  <option value="Deep House Odyssey Vol. 4">
                    Deep House Odyssey Vol. 4 · Fri, 23 Oct
                  </option>
                  <option value="Desi Nights Club Edition">
                    Desi Nights Club Edition · Sat, 24 Oct
                  </option>
                  <option value="After Dark: Subterranean Sessions">
                    After Dark: Subterranean Sessions · Sat, 24 Oct
                  </option>
                </select>
              </div>

              {/* Date, Time & Max Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="crew-date-select"
                    className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                  >
                    DATE *
                  </label>
                  <select
                    id="crew-date-select"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-mono text-white"
                  >
                    <option value="Tonight">Tonight</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday">This Friday</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="Next Weekend">Next Weekend</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="crew-time-input"
                    className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                  >
                    TIME *
                  </label>
                  <input
                    id="crew-time-input"
                    type="text"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="e.g. 10:00 PM"
                    className="w-full h-11 px-3 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-mono text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="crew-max-members"
                    className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                  >
                    MAX MEMBERS *
                  </label>
                  <input
                    id="crew-max-members"
                    type="number"
                    min="3"
                    max="20"
                    value={formMaxMembers}
                    onChange={(e) => setFormMaxMembers(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Genre & Area Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="crew-genre-select"
                    className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                  >
                    PRIMARY GENRE *
                  </label>
                  <select
                    id="crew-genre-select"
                    value={formGenre}
                    onChange={(e) => setFormGenre(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-mono text-white"
                  >
                    <option value="TECHNO">Techno</option>
                    <option value="HOUSE">House</option>
                    <option value="DEEP HOUSE">Deep House</option>
                    <option value="HIP-HOP">Hip-Hop</option>
                    <option value="BOLLYWOOD">Bollywood</option>
                    <option value="LIVE MUSIC">Live Music</option>
                    <option value="INDIE">Indie</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="crew-area-select"
                    className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                  >
                    MEETUP AREA *
                  </label>
                  <select
                    id="crew-area-select"
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-mono text-white"
                  >
                    <option value="Indiranagar">Indiranagar</option>
                    <option value="Koramangala">Koramangala</option>
                    <option value="CBD">CBD</option>
                    <option value="HSR">HSR</option>
                    <option value="Whitefield">Whitefield</option>
                    <option value="JP Nagar">JP Nagar</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="crew-desc-input"
                  className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                >
                  CREW DESCRIPTION
                </label>
                <textarea
                  id="crew-desc-input"
                  rows={3}
                  placeholder="Where are you meeting? What's the schedule (pre-drinks, rides, venue entry)?"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white placeholder-[#666666] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white transition-colors"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-mono font-bold text-white transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                >
                  CREATE CREW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showCreatedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#111111] border border-[#22C55E] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in slide-in-from-bottom"
        >
          <Check className="w-4 h-4 text-[#22C55E]" />
          <span>Crew created! Added to discovery feed.</span>
        </div>
      )}

      <Footer />
    </main>
  );
}
