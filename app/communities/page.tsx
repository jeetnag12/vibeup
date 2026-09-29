"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityCard from "@/components/community/CommunityCard";
import CreateCommunityModal from "@/components/community/CreateCommunityModal";
import {
  Search,
  X,
  Plus,
  Users,
  Sparkles,
  Compass,
  Check,
} from "lucide-react";
import {
  allCommunitiesData,
  Community,
  communityCategories,
  CommunityCategoryFilter,
  interestTabs,
  InterestTab,
} from "@/lib/communities-data";

export default function CommunitiesPage() {
  // Master community list in local state
  const [communitiesList, setCommunitiesList] = useState<Community[]>(
    allCommunitiesData
  );

  // Search & Category filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CommunityCategoryFilter>("ALL");

  // Interest tab selection
  const [selectedInterest, setSelectedInterest] = useState<InterestTab>("TECHNO");

  // Local join state map: communityId -> boolean
  const [joinedMap, setJoinedMap] = useState<Record<string, boolean>>({});

  // Create community modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleJoin = (communityId: string) => {
    setJoinedMap((prev) => ({
      ...prev,
      [communityId]: !prev[communityId],
    }));
  };

  const handleCreateCommunity = (newCommunity: Community) => {
    setCommunitiesList((prev) => [newCommunity, ...prev]);
    setJoinedMap((prev) => ({
      ...prev,
      [newCommunity.id]: true,
    }));
    setToastMessage(`Community "${newCommunity.name}" created! You are the founder.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered by Search & Category
  const isFilteringActive = searchQuery.trim() !== "" || selectedCategory !== "ALL";

  const searchFilteredCommunities = useMemo(() => {
    let list = [...communitiesList];

    // Category filter
    if (selectedCategory !== "ALL") {
      list = list.filter((c) => c.category === selectedCategory);
    }

    // Text search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((c) => {
        const inName = c.name.toLowerCase().includes(q);
        const inDesc = c.description.toLowerCase().includes(q);
        const inLoc = c.location.toLowerCase().includes(q);
        const inGenres = c.genres.some((g) => g.toLowerCase().includes(q));
        const inTags = c.tags.some((t) => t.toLowerCase().includes(q));
        return inName || inDesc || inLoc || inGenres || inTags;
      });
    }

    return list;
  }, [communitiesList, selectedCategory, searchQuery]);

  // Featured Communities (from master list)
  const featuredCommunities = useMemo(() => {
    return communitiesList.filter((c) => c.featured).slice(0, 4);
  }, [communitiesList]);

  // Popular Communities (from master list)
  const popularCommunities = useMemo(() => {
    return communitiesList
      .filter((c) => c.trending)
      .sort((a, b) => b.memberCount - a.memberCount)
      .slice(0, 6);
  }, [communitiesList]);

  // Communities Around Bangalore (Near you)
  const nearYouCommunities = useMemo(() => {
    return communitiesList.filter((c) => c.isNearYou).slice(0, 4);
  }, [communitiesList]);

  // Communities By Selected Interest Tab
  const interestCommunities = useMemo(() => {
    return communitiesList
      .filter((c) => c.interest === selectedInterest)
      .slice(0, 4);
  }, [communitiesList, selectedInterest]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[88px] sm:pt-[96px] pb-[80px]">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] max-w-full h-[450px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* ==================================================
              1. PAGE HEADER
          ================================================== */}
          <section
            aria-label="Discover Communities Header"
            className="mb-8 pt-4 sm:pt-6 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NIGHTLIFE COLLECTIVES &amp; SQUADS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-sans text-white tracking-tight mb-3">
              FIND YOUR COMMUNITY
            </h1>

            <p className="text-sm sm:text-base text-[#A1A1AA] font-sans leading-relaxed">
              Find people who share your music, nightlife and weekend energy. Connect, pre-game, and discover Bangalore together.
            </p>
          </section>

          {/* ==================================================
              2. SEARCH
          ================================================== */}
          <section aria-label="Search Communities" className="mb-6 max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH COMMUNITIES"
                aria-label="Search communities by name, genre, location or tag"
                className="w-full h-12 pl-11 pr-10 rounded-xl bg-[#141418] border border-[#2A2A35] focus:border-[#8B5CF6] focus:outline-none text-xs font-mono text-white placeholder-[#71717A] transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </section>

          {/* ==================================================
              3. CATEGORY FILTERS
          ================================================== */}
          <section aria-label="Category Filters" className="mb-12">
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
              {communityCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                    selectedCategory === cat
                      ? "bg-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                      : "bg-[#141418] hover:bg-[#1A1A21] border border-[#2A2A35] text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* ==================================================
              SEARCH / CATEGORY RESULTS (When Filtering is Active)
          ================================================== */}
          {isFilteringActive ? (
            <section aria-label="Search Results" className="mb-16">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#2A2A35]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#8B5CF6]" />
                  <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    RESULTS ({searchFilteredCommunities.length} FOUND)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("ALL");
                  }}
                  className="text-xs font-mono text-[#8B5CF6] hover:underline"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>

              {searchFilteredCommunities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchFilteredCommunities.map((comm) => (
                    <CommunityCard
                      key={comm.id}
                      community={comm}
                      isJoined={!!joinedMap[comm.id]}
                      onToggleJoin={handleToggleJoin}
                    />
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="p-12 rounded-[20px] bg-[#141418] border border-[#2A2A35] text-center max-w-lg mx-auto">
                  <Users className="w-10 h-10 text-[#8B5CF6] mx-auto mb-3 opacity-60" />
                  <h3 className="text-xl font-bold font-sans text-white mb-2">
                    NO COMMUNITIES FOUND
                  </h3>
                  <p className="text-xs text-[#A1A1AA] font-sans leading-relaxed mb-6">
                    We couldn&apos;t find any communities matching &ldquo;
                    {searchQuery || selectedCategory}&rdquo;. Try another search, or create your own crowd!
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("ALL");
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] border border-[#2A2A35] text-xs font-mono text-white transition-colors"
                    >
                      RESET FILTERS
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-mono font-bold text-white transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                    >
                      CREATE COMMUNITY
                    </button>
                  </div>
                </div>
              )}
            </section>
          ) : (
            /* ==================================================
                DEFAULT VIEW: Ordered Sections (4 to 7)
            ================================================== */
            <>
              {/* ==================================================
                  4. FEATURED COMMUNITIES
              ================================================== */}
              <section aria-labelledby="featured-communities-heading" className="mb-16">
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                      TOP PICKS
                    </span>
                    <h2
                      id="featured-communities-heading"
                      className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
                    >
                      FEATURED COMMUNITIES
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                      Flagship nightlife groups with curated meetups and active weekly discussions.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredCommunities.map((comm) => (
                    <CommunityCard
                      key={comm.id}
                      community={comm}
                      isJoined={!!joinedMap[comm.id]}
                      onToggleJoin={handleToggleJoin}
                      variant="featured"
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  5. POPULAR COMMUNITIES
              ================================================== */}
              <section aria-labelledby="popular-communities-heading" className="mb-16">
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#EC4899] uppercase tracking-wider block mb-1">
                      HIGH ENERGY
                    </span>
                    <h2
                      id="popular-communities-heading"
                      className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
                    >
                      POPULAR RIGHT NOW
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                      Fast-growing groups with the most event interest and active members today.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularCommunities.map((comm) => (
                    <CommunityCard
                      key={comm.id}
                      community={comm}
                      isJoined={!!joinedMap[comm.id]}
                      onToggleJoin={handleToggleJoin}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  6. COMMUNITIES NEAR YOU (AROUND BANGALORE)
              ================================================== */}
              <section aria-labelledby="around-bangalore-heading" className="mb-16">
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#22C55E] uppercase tracking-wider block mb-1">
                      LOCAL COLLECTIVES
                    </span>
                    <h2
                      id="around-bangalore-heading"
                      className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
                    >
                      AROUND BANGALORE
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                      Neighborhood-based crowds across Indiranagar, Koramangala, Whitefield, and CBD.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {nearYouCommunities.map((comm) => (
                    <CommunityCard
                      key={comm.id}
                      community={comm}
                      isJoined={!!joinedMap[comm.id]}
                      onToggleJoin={handleToggleJoin}
                    />
                  ))}
                </div>
              </section>

              {/* ==================================================
                  7. COMMUNITIES BY INTEREST
              ================================================== */}
              <section aria-labelledby="by-interest-heading" className="mb-16">
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                      GENRE &amp; SOUNDSCAPES
                    </span>
                    <h2
                      id="by-interest-heading"
                      className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
                    >
                      COMMUNITIES BY INTEREST
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                      Explore crews organized strictly by music taste and event culture.
                    </p>
                  </div>
                </div>

                {/* Interest Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
                  {interestTabs.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => setSelectedInterest(interest)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                        selectedInterest === interest
                          ? "bg-[#8B5CF6] text-white shadow-sm"
                          : "bg-[#141418] hover:bg-[#1A1A21] border border-[#2A2A35] text-[#A1A1AA] hover:text-white"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                {/* Interest Grid */}
                {interestCommunities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {interestCommunities.map((comm) => (
                      <CommunityCard
                        key={comm.id}
                        community={comm}
                        isJoined={!!joinedMap[comm.id]}
                        onToggleJoin={handleToggleJoin}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 rounded-[16px] bg-[#141418] border border-[#2A2A35] text-center">
                    <p className="text-xs font-mono text-[#A1A1AA]">
                      No communities currently listed under {selectedInterest}. Be the first to start one!
                    </p>
                  </div>
                )}
              </section>
            </>
          )}

          {/* ==================================================
              8. CREATE COMMUNITY CTA
          ================================================== */}
          <section
            aria-label="Create Community Call to Action"
            className="mb-12 p-8 sm:p-10 rounded-[20px] bg-gradient-to-r from-[#141418] via-[#1A1A21] to-[#141418] border border-[#2A2A35] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
          >
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#8B5CF6]/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                <span className="font-mono text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
                  FOUND A NEW MOVEMENT
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                WANT TO BUILD YOUR OWN CROWD?
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-1.5 leading-relaxed">
                Create a community around the music, places or nights you love. Gather like-minded partygoers, coordinate pre-drinks, and discover Bangalore nightlife together.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_24px_rgba(139,92,246,0.35)] shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE COMMUNITY</span>
            </button>
          </section>
        </div>
      </div>

      {/* ==================================================
          CREATE COMMUNITY MODAL
      ================================================== */}
      <CreateCommunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateCommunity={handleCreateCommunity}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1A1A21] border border-[#22C55E] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in slide-in-from-bottom"
        >
          <Check className="w-4 h-4 text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </main>
  );
}
