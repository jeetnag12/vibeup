"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClubCard from "@/components/club/ClubCard";
import ClubFilters, { ClubSortOption } from "@/components/club/ClubFilters";
import VibeCategoryCard from "@/components/club/VibeCategoryCard";
import ClubEventCard from "@/components/club/ClubEventCard";
import ClubSkeleton from "@/components/club/ClubSkeleton";

import {
  allClubsData,
  vibeCategories,
  VibeCategory,
} from "@/lib/clubs-data";
import {
  Sparkles,
  Flame,
  SearchX,
  RotateCcw,
  AlertTriangle,
  Compass,
  Calendar,
} from "lucide-react";

export default function ClubsPage() {
  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("ALL");
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");
  const [selectedSort, setSelectedSort] = useState<ClubSortOption>("RECOMMENDED");
  const [selectedVibeId, setSelectedVibeId] = useState<string | null>(null);

  // Social & Follow State
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const toggleFollow = (clubId: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [clubId]: !prev[clubId],
    }));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedArea("ALL");
    setSelectedGenre("ALL");
    setSelectedVibeId(null);
  };

  const handleSelectVibe = (vibe: VibeCategory) => {
    if (selectedVibeId === vibe.id) {
      setSelectedVibeId(null);
      setSelectedGenre("ALL");
    } else {
      setSelectedVibeId(vibe.id);
      setSelectedGenre(vibe.genres[0].toUpperCase());
    }
  };

  // Trending Clubs (4-6 clubs marked trending)
  const trendingClubs = useMemo(() => {
    return allClubsData.filter((c) => c.isTrending).slice(0, 4);
  }, []);

  // New & Rising Clubs (4 clubs marked isNew or recently added)
  const newAndRisingClubs = useMemo(() => {
    return allClubsData.filter((c) => c.isNew || c.followers < 10000).slice(0, 4);
  }, []);

  // Clubs with events this week
  const clubsWithEvents = useMemo(() => {
    return allClubsData.filter((c) => c.nextEvent !== undefined).slice(0, 4);
  }, []);

  // Main Filtered & Sorted Clubs
  const filteredAndSortedClubs = useMemo(() => {
    let result = [...allClubsData];

    // 1. Text Search (name, area, location, genres)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.area.toLowerCase().includes(q) ||
          (c.location && c.location.toLowerCase().includes(q)) ||
          c.genres.some((g) => g.toLowerCase().includes(q)) ||
          (c.vibeTags && c.vibeTags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // 2. Area Filter
    if (selectedArea !== "ALL") {
      result = result.filter(
        (c) => c.area.toUpperCase() === selectedArea.toUpperCase()
      );
    }

    // 3. Genre Filter
    if (selectedGenre !== "ALL") {
      result = result.filter((c) =>
        c.genres.some((g) => g.toUpperCase() === selectedGenre.toUpperCase())
      );
    }

    // 4. Sort Modes
    switch (selectedSort) {
      case "POPULAR":
      case "MOST FOLLOWED":
        result.sort((a, b) => b.followers - a.followers);
        break;
      case "NEW":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "RECOMMENDED":
      default:
        result.sort((a, b) => (b.rating ?? 4.0) - (a.rating ?? 4.0));
        break;
    }

    return result;
  }, [searchQuery, selectedArea, selectedGenre, selectedSort]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedArea !== "ALL" ||
    selectedGenre !== "ALL" ||
    selectedVibeId !== null;

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
        {/* Ambient Top Radial Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* 2. Clubs Hero */}
          <section className="mb-10 text-center sm:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 mb-4">
              <Compass className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
                VIBEUP CLUB GUIDE
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-[1.08] mb-4">
              DISCOVER YOUR NIGHT.
            </h1>

            <p className="text-base sm:text-lg text-[#A1A1AA] font-sans leading-relaxed">
              Find the clubs, venues and spaces that match your vibe. Explore the places behind Bangalore&apos;s best music nights.
            </p>
          </section>

          {/* 3 & 4. Search & Filters */}
          <ClubFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedArea={selectedArea}
            onSelectArea={setSelectedArea}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
            selectedSort={selectedSort}
            onSelectSort={setSelectedSort}
            totalFilteredCount={filteredAndSortedClubs.length}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* 5. Trending Clubs (Show when no specific narrow filter is active) */}
          {!hasActiveFilters && (
            <section className="mb-16">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-[#EC4899]" />
                    <span className="font-mono text-xs text-[#EC4899] uppercase tracking-wider font-semibold">
                      POPULAR DESTINATIONS
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                    TRENDING RIGHT NOW
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                    Where Bangalore is heading this week.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trendingClubs.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    isFollowing={!!followingMap[club.id]}
                    onToggleFollow={toggleFollow}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 6. Browse by Vibe */}
          <section className="mb-16">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider font-semibold">
                    CURATED ATMOSPHERES
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                  WHAT&apos;S YOUR VIBE?
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                  Pick a soundscape or energy level to jump directly to matching spaces.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {vibeCategories.map((vibe) => (
                <VibeCategoryCard
                  key={vibe.id}
                  vibe={vibe}
                  isSelected={selectedVibeId === vibe.id}
                  onSelect={handleSelectVibe}
                />
              ))}
            </div>
          </section>

          {/* 7. All Clubs Grid */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider block mb-1">
                  ALL VENUES
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                  EXPLORE ALL CLUBS
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                  Find the places that match your kind of night.
                </p>
              </div>

              <div className="font-mono text-xs text-[#A1A1AA]">
                SHOWING <strong className="text-white">{filteredAndSortedClubs.length}</strong> VENUES
              </div>
            </div>

            {hasError ? (
              <div className="my-12 p-10 rounded-[20px] bg-[#141418] border border-[#EF4444]/40 text-center max-w-md mx-auto">
                <AlertTriangle className="w-10 h-10 text-[#EF4444] mx-auto mb-3" />
                <h3 className="text-xl font-bold font-sans text-white mb-2">
                  COULDN&apos;T LOAD CLUBS
                </h3>
                <p className="text-xs text-[#A1A1AA] mb-6">
                  Something went wrong while loading venues.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setHasError(false);
                    setTimeout(() => setIsLoading(false), 500);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>TRY AGAIN</span>
                </button>
              </div>
            ) : isLoading ? (
              <ClubSkeleton />
            ) : filteredAndSortedClubs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAndSortedClubs.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    isFollowing={!!followingMap[club.id]}
                    onToggleFollow={toggleFollow}
                  />
                ))}
              </div>
            ) : (
              /* 14. Empty State */
              <div className="p-10 sm:p-14 rounded-[20px] bg-[#141418] border border-[#2A2A35] text-center max-w-md mx-auto">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-4">
                  <SearchX className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-sans text-white mb-1.5">
                  NO CLUBS FOUND
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mb-6">
                  Try another area, genre, or search keyword to discover more nightlife venues.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>CLEAR FILTERS</span>
                </button>
              </div>
            )}
          </section>

          {/* 8. New & Rising Section */}
          <section className="mb-16 pt-10 border-t border-[#2A2A35]">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <span className="font-mono text-xs text-[#22C55E] uppercase tracking-wider block mb-1">
                  NEW ADDITIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                  NEW &amp; RISING
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                  Recently discovered spaces worth keeping an eye on.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newAndRisingClubs.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  isFollowing={!!followingMap[club.id]}
                  onToggleFollow={toggleFollow}
                />
              ))}
            </div>
          </section>

          {/* 9. Clubs With Events This Week */}
          <section className="mb-12 pt-10 border-t border-[#2A2A35]">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider font-semibold">
                    LIVE CALENDAR
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                  HAPPENING THIS WEEK
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                  Clubs with events coming up. Book before guestlists close.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {clubsWithEvents.map((club) => (
                <ClubEventCard key={club.id} club={club} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
