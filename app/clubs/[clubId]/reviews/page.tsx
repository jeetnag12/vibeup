"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/club/StarRating";
import {
  ArrowLeft,
  MapPin,
  ThumbsUp,
  Calendar,
  Sparkles,
  Filter,
  ArrowUpDown,
  Plus,
  X,
  Check,
  Music,
  Users as UsersIcon,
  Flame,
  Building2,
  Coins,
  Ticket,
} from "lucide-react";
import { getDetailedClubById } from "@/lib/clubs-data";
import {
  getClubReviewsData,
  ClubDetailedReview,
  ClubReviewCategoryScores,
} from "@/lib/club-reviews-data";

type StarFilter = "ALL" | "5" | "4" | "3" | "2" | "1";

export default function ClubReviewsPage() {
  const params = useParams();
  const rawId = (params?.clubId as string) || "xyz-club";

  const club = useMemo(() => {
    return getDetailedClubById(rawId);
  }, [rawId]);

  const initialPayload = useMemo(() => {
    return getClubReviewsData(rawId, club.name, club.rating || 4.7);
  }, [rawId, club.name, club.rating]);

  // Local state for reviews
  const [reviews, setReviews] = useState<ClubDetailedReview[]>(
    initialPayload.reviews
  );
  const [totalCount, setTotalCount] = useState<number>(
    initialPayload.totalReviews
  );
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  // Filter & Sort state
  const [starFilter, setStarFilter] = useState<StarFilter>("ALL");
  const [sortBy, setSortBy] = useState<"RECENT" | "HELPFUL">("RECENT");
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New review form fields
  const [overallRating, setOverallRating] = useState(5);
  const [categoryScores, setCategoryScores] = useState<ClubReviewCategoryScores>({
    music: 5,
    crowd: 5,
    vibe: 5,
    venue: 5,
    value: 5,
  });
  const [authorName, setAuthorName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");

  // Initialize reviews and counts on club change
  useEffect(() => {
    const payload = getClubReviewsData(rawId, club.name, club.rating || 4.7);
    setReviews(payload.reviews);
    setTotalCount(payload.totalReviews);
    const initialCounts: Record<string, number> = {};
    payload.reviews.forEach((r) => {
      initialCounts[r.id] = r.helpfulCount;
    });
    setHelpfulCounts(initialCounts);
    setHelpfulMap({});
    setStarFilter("ALL");
    setSortBy("RECENT");
    setActiveHighlight(null);
  }, [rawId, club.name, club.rating]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleHelpful = (reviewId: string) => {
    const isCurrentlyHelpful = !!helpfulMap[reviewId];
    setHelpfulMap((prev) => ({
      ...prev,
      [reviewId]: !isCurrentlyHelpful,
    }));

    setHelpfulCounts((prev) => {
      const current = prev[reviewId] ?? 0;
      return {
        ...prev,
        [reviewId]: isCurrentlyHelpful ? Math.max(0, current - 1) : current + 1,
      };
    });
  };

  const handleHighlightClick = (tag: string) => {
    if (activeHighlight === tag) {
      setActiveHighlight(null);
    } else {
      setActiveHighlight(tag);
    }
  };

  // Filtered and Sorted reviews
  const visibleReviews = useMemo(() => {
    let list = [...reviews];

    // Star filter
    if (starFilter !== "ALL") {
      const targetStar = parseInt(starFilter, 10);
      list = list.filter((r) => Math.round(r.rating) === targetStar);
    }

    // Highlight text search filter
    if (activeHighlight) {
      const term = activeHighlight.toLowerCase();
      list = list.filter((r) => {
        const text = r.text.toLowerCase();
        const evName = (r.eventName || "").toLowerCase();
        return text.includes(term) || evName.includes(term);
      });
    }

    // Sorting
    if (sortBy === "HELPFUL") {
      list.sort((a, b) => {
        const countA = helpfulCounts[a.id] ?? a.helpfulCount;
        const countB = helpfulCounts[b.id] ?? b.helpfulCount;
        return countB - countA;
      });
    } else {
      // Default: Most Recent (matches initial ordering)
    }

    return list;
  }, [reviews, starFilter, sortBy, activeHighlight, helpfulCounts]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const matchedEvent = (club.upcomingEvents || []).find(
      (ev) => ev.id === selectedEventId
    );

    const newReview: ClubDetailedReview = {
      id: `rev-client-${Date.now()}`,
      userId: `user-${Date.now()}`,
      userName: authorName.trim() || "VibeUp Explorer",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=160&auto=format&fit=crop",
      rating: overallRating,
      categories: { ...categoryScores },
      text: reviewText.trim(),
      eventId: matchedEvent?.id,
      eventName: matchedEvent?.title,
      date: "Just now",
      helpfulCount: 0,
      tag: "Verified Attendee",
    };

    setReviews((prev) => [newReview, ...prev]);
    setTotalCount((prev) => prev + 1);
    setHelpfulCounts((prev) => ({
      ...prev,
      [newReview.id]: 0,
    }));

    // Reset and close
    setShowModal(false);
    setAuthorName("");
    setReviewText("");
    setSelectedEventId("");
    setOverallRating(5);
    setCategoryScores({
      music: 5,
      crowd: 5,
      vibe: 5,
      venue: 5,
      value: 5,
    });

    setToastMessage("Your review was posted! Thank you for sharing your vibe.");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const experienceDimensions = [
    {
      label: "MUSIC",
      score: initialPayload.categoryRatings.music,
      icon: Music,
      color: "#8B5CF6",
    },
    {
      label: "CROWD",
      score: initialPayload.categoryRatings.crowd,
      icon: UsersIcon,
      color: "#EC4899",
    },
    {
      label: "VIBE",
      score: initialPayload.categoryRatings.vibe,
      icon: Flame,
      color: "#F97316",
    },
    {
      label: "VENUE",
      score: initialPayload.categoryRatings.venue,
      icon: Building2,
      color: "#22C55E",
    },
    {
      label: "VALUE",
      score: initialPayload.categoryRatings.value,
      icon: Coins,
      color: "#38BDF8",
    },
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
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
              1. BREADCRUMB
          ================================================== */}
          <nav aria-label="Breadcrumb" className="mb-6 pt-2">
            <ol className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
              <li>
                <Link
                  href="/discover"
                  className="text-[#666666] hover:text-white transition-colors"
                >
                  DISCOVER
                </Link>
              </li>
              <li className="text-[#666666]" aria-hidden="true">
                /
              </li>
              <li>
                <Link
                  href="/clubs"
                  className="text-[#666666] hover:text-white transition-colors"
                >
                  CLUBS
                </Link>
              </li>
              <li className="text-[#666666]" aria-hidden="true">
                /
              </li>
              <li>
                <Link
                  href={`/clubs/${club.id}`}
                  className="text-[#666666] hover:text-white transition-colors truncate max-w-[140px] sm:max-w-none"
                >
                  {club.name}
                </Link>
              </li>
              <li className="text-[#666666]" aria-hidden="true">
                /
              </li>
              <li className="text-white font-bold">REVIEWS</li>
            </ol>
          </nav>

          {/* ==================================================
              2. COMPACT CLUB HEADER
          ================================================== */}
          <header className="p-4 sm:p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 shadow-lg">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={club.image}
                alt={club.name}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-[12px] object-cover border border-[#1A1A1A] shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-[#EC4899] font-bold uppercase tracking-wider">
                    {club.area.toUpperCase()} · BANGALORE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                  {club.name}
                </h1>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#666666] mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                  <span>{club.location || club.address || `${club.area}, Bangalore`}</span>
                </div>
              </div>
            </div>

            <Link
              href={`/clubs/${club.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] hover:border-[#8B5CF6]/50 text-xs font-mono text-white transition-all self-stretch sm:self-auto justify-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>BACK TO CLUB</span>
            </Link>
          </header>

          {/* ==================================================
              3. RATING OVERVIEW & 4. RATING BREAKDOWN (Desktop 2-Col Layout)
          ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Left Box (Cols 5): Rating Overview & Horizontal Breakdown */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-6">
              {/* Rating Overview */}
              <div>
                <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                  RATING OVERVIEW
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-sans font-bold text-white tracking-tight">
                    {initialPayload.overallRating.toFixed(1)}
                  </span>
                  <div>
                    <StarRating
                      value={initialPayload.overallRating}
                      size="md"
                      ariaLabel={`Rating ${initialPayload.overallRating.toFixed(1)} out of 5`}
                    />
                    <div className="font-mono text-xs font-bold text-white mt-1">
                      {totalCount.toLocaleString()} REVIEWS
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#666666] font-sans mt-2">
                  Based on reviews from VibeUp users
                </p>
              </div>

              {/* Horizontal Star Breakdown */}
              <div className="pt-5 border-t border-[#1A1A1A] space-y-2.5">
                <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider block mb-3">
                  RATING BREAKDOWN
                </span>
                {initialPayload.starsBreakdown.map((row) => (
                  <button
                    key={row.star}
                    type="button"
                    onClick={() =>
                      setStarFilter((prev) =>
                        prev === String(row.star) ? "ALL" : (String(row.star) as StarFilter)
                      )
                    }
                    className={`w-full flex items-center gap-3 text-xs font-mono group transition-colors p-1 rounded-md ${
                      starFilter === String(row.star)
                        ? "bg-[#8B5CF6]/15 text-white"
                        : "hover:bg-white/5 text-[#666666] hover:text-white"
                    }`}
                  >
                    <span className="w-14 text-left font-semibold shrink-0">
                      {row.star} STAR
                    </span>

                    {/* Progress Bar Container */}
                    <div
                      role="progressbar"
                      aria-valuenow={row.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${row.star} stars represent ${row.percentage}% of reviews`}
                      className="flex-1 h-2 rounded-full bg-[#111111] border border-[#1A1A1A] overflow-hidden"
                    >
                      <div
                        className="h-full rounded-full bg-[#8B5CF6] transition-all duration-500 ease-out"
                        style={{ width: `${row.percentage}%` }}
                      />
                    </div>

                    <span className="w-10 text-right font-medium shrink-0">
                      {row.percentage}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Box (Cols 7): Experience Categories & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              {/* 5. Experience Categories */}
              <div className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-[#EC4899] uppercase tracking-wider">
                    EXPERIENCE DIMENSIONS
                  </span>
                  <span className="font-mono text-[11px] text-[#666666]">
                    Scale of 5.0
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {experienceDimensions.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-xs font-mono text-[#666666] mb-2">
                          <span className="font-semibold text-white tracking-wider">
                            {item.label}
                          </span>
                          <IconComponent
                            className="w-3.5 h-3.5"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="font-sans font-bold text-xl text-white">
                            {item.score.toFixed(1)}
                          </span>
                          <span className="font-mono text-[10px] text-[#666666]">
                            / 5.0
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 6. Review Highlights */}
              <div className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
                    WHAT PEOPLE ARE SAYING
                  </span>
                </div>
                <p className="text-xs text-[#666666] font-sans mb-4">
                  Click on key vibe tags to filter reviews mentioning these experiences:
                </p>

                <div className="flex flex-wrap gap-2">
                  {initialPayload.highlights.map((tag) => {
                    const isSelected = activeHighlight === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleHighlightClick(tag)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                          isSelected
                            ? "bg-[#8B5CF6] text-white "
                            : "bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-[#D4D4D8] hover:text-white"
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}

                  {activeHighlight && (
                    <button
                      type="button"
                      onClick={() => setActiveHighlight(null)}
                      className="px-2.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 hover:bg-red-500/20 transition-colors inline-flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      <span>CLEAR TAG</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              8. WRITE A REVIEW CTA BANNER
          ================================================== */}
          <section
            aria-label="Write a Review CTA"
            className="mb-12 p-6 sm:p-8 rounded-[12px] bg-gradient-to-r from-[#111111] via-[#111111] to-[#111111] border border-[#1A1A1A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
          >
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#8B5CF6]/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-xl">
              <span className="font-mono text-xs font-bold text-[#EC4899] uppercase tracking-wider block mb-1">
                BEEN HERE?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                SHARE YOUR VIBE.
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1">
                Help other Bangalore nightlife explorers understand the sound system, crowd, and overall energy at {club.name}.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>WRITE A REVIEW</span>
            </button>
          </section>

          {/* ==================================================
              7. REVIEW FILTERS & SORT
          ================================================== */}
          <section aria-label="Review filtering controls" className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#111111] border border-[#1A1A1A]">
              {/* Star Filters Row */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[11px] font-mono text-[#666666] uppercase mr-1 flex items-center gap-1 shrink-0">
                  <Filter className="w-3 h-3" />
                  RATING:
                </span>
                {(["ALL", "5", "4", "3", "2", "1"] as const).map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStarFilter(star)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors shrink-0 ${
                      starFilter === star
                        ? "bg-[#8B5CF6] text-white shadow-sm"
                        : "bg-[#111111] hover:bg-[#1A1A1A] text-[#666666] hover:text-white border border-[#1A1A1A]"
                    }`}
                  >
                    {star === "ALL" ? "ALL RATINGS" : `${star} STAR`}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown / Toggle */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <span className="text-[11px] font-mono text-[#666666] uppercase flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3" />
                  SORT:
                </span>
                <div className="inline-flex rounded-lg bg-[#111111] border border-[#1A1A1A] p-0.5">
                  <button
                    type="button"
                    onClick={() => setSortBy("RECENT")}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      sortBy === "RECENT"
                        ? "bg-[#8B5CF6] text-white"
                        : "text-[#666666] hover:text-white"
                    }`}
                  >
                    MOST RECENT
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy("HELPFUL")}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      sortBy === "HELPFUL"
                        ? "bg-[#8B5CF6] text-white"
                        : "text-[#666666] hover:text-white"
                    }`}
                  >
                    MOST HELPFUL
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              7. REVIEWS LIST & 20. EMPTY STATE
          ================================================== */}
          <section aria-label="Club reviews feed" className="mb-16">
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-[#666666]">
              <span>SHOWING {visibleReviews.length} REVIEWS</span>
              {starFilter !== "ALL" && (
                <button
                  type="button"
                  onClick={() => setStarFilter("ALL")}
                  className="text-[#8B5CF6] hover:underline"
                >
                  RESET STAR FILTER
                </button>
              )}
            </div>

            {visibleReviews.length > 0 ? (
              <div className="space-y-4">
                {visibleReviews.map((rev) => {
                  const isHelpful = !!helpfulMap[rev.id];
                  const currentHelpfulCount =
                    helpfulCounts[rev.id] ?? rev.helpfulCount;

                  return (
                    <article
                      key={rev.id}
                      aria-label={`Review by ${rev.userName}`}
                      className="p-5 sm:p-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/40 transition-colors"
                    >
                      {/* Top Header: Avatar, Name, Rating, Date */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rev.avatar}
                            alt={rev.userName}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#1A1A1A]"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-sans font-bold text-sm sm:text-base text-white">
                                {rev.userName}
                              </h3>
                              {rev.tag && (
                                <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 rounded-full">
                                  {rev.tag}
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[11px] text-[#666666]">
                              {rev.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <StarRating value={rev.rating} size="sm" />
                          <span className="font-mono text-xs font-bold text-amber-400">
                            {rev.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Review Comment Text */}
                      <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed mb-4 pl-0 sm:pl-1">
                        &ldquo;{rev.text}&rdquo;
                      </p>

                      {/* Event Context & Helpful Action Bar */}
                      <div className="pt-3 border-t border-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                        {/* 13. Event Context */}
                        {rev.eventName ? (
                          <div className="flex items-center gap-1.5 text-[#666666]">
                            <Ticket className="w-3.5 h-3.5 text-[#8B5CF6]" />
                            <span>ATTENDED:</span>
                            {rev.eventId ? (
                              <Link
                                href={`/events/${rev.eventId}`}
                                className="font-semibold text-white hover:text-[#8B5CF6] transition-colors underline underline-offset-2"
                              >
                                {rev.eventName}
                              </Link>
                            ) : (
                              <span className="font-semibold text-white">
                                {rev.eventName}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[#666666]">
                            General Club Experience
                          </span>
                        )}

                        {/* 14. Helpful Interaction Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleHelpful(rev.id)}
                          aria-label={`Mark review as helpful. Currently ${currentHelpfulCount} people found helpful`}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all self-start sm:self-auto ${
                            isHelpful
                              ? "bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-sm"
                              : "bg-[#111111] hover:bg-[#1A1A1A] border-[#1A1A1A] text-[#666666] hover:text-white"
                          }`}
                        >
                          <ThumbsUp
                            className={`w-3.5 h-3.5 ${
                              isHelpful ? "text-[#8B5CF6] fill-[#8B5CF6]" : ""
                            }`}
                          />
                          <span>Helpful {currentHelpfulCount}</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="p-10 rounded-[12px] bg-[#111111] border border-[#1A1A1A] text-center">
                <Calendar className="w-8 h-8 text-[#8B5CF6] mx-auto mb-2 opacity-60" />
                <h4 className="font-sans font-bold text-white text-base mb-1">
                  NO REVIEWS FOUND
                </h4>
                <p className="text-xs text-[#666666] font-sans max-w-sm mx-auto mb-4">
                  No reviews match the selected filter. Try selecting &ldquo;ALL RATINGS&rdquo; or be the first to share your experience!
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStarFilter("ALL");
                      setActiveHighlight(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-white text-xs font-mono font-medium"
                  >
                    RESET FILTERS
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#8B5CF6] text-white text-xs font-mono font-bold"
                  >
                    WRITE A REVIEW
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ==================================================
              9. RELATED CLUB INFORMATION / UPCOMING EVENT SNAPSHOT
          ================================================== */}
          <section
            aria-label="Related Club Information"
            className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider block mb-1">
                DISCOVER THE VENUE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
                EXPLORE {club.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] font-sans mt-0.5 max-w-xl">
                Check upcoming lineups, VIP bottle service, photo galleries, and connected night crews.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/clubs/${club.id}`}
                className="px-5 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
              >
                VIEW FULL CLUB DETAILS →
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* ==================================================
          16. WRITE REVIEW MODAL
      ================================================== */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-club-review-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 sm:p-8 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="font-mono text-[10px] text-[#EC4899] uppercase font-bold tracking-wider">
                  COMMUNITY FEEDBACK
                </span>
                <h3
                  id="write-club-review-title"
                  className="font-sans font-bold text-2xl text-white tracking-tight"
                >
                  REVIEW {club.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full bg-[#111111] hover:bg-[#1A1A1A] text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-5">
              {/* Overall Rating */}
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                <label className="block text-xs font-mono text-[#666666] uppercase mb-1.5">
                  OVERALL RATING
                </label>
                <div className="flex items-center gap-3">
                  <StarRating
                    value={overallRating}
                    size="lg"
                    interactive
                    onChange={(val) => setOverallRating(val)}
                  />
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {overallRating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Dimension Ratings Grid */}
              <div className="space-y-2">
                <span className="block text-xs font-mono text-[#666666] uppercase">
                  EXPERIENCE CATEGORIES (OPTIONAL)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(
                    [
                      { key: "music", label: "Music Quality" },
                      { key: "crowd", label: "Crowd Energy" },
                      { key: "vibe", label: "Nightlife Vibe" },
                      { key: "venue", label: "Venue & Sound" },
                      { key: "value", label: "Overall Value" },
                    ] as const
                  ).map((dim) => (
                    <div
                      key={dim.key}
                      className="p-2.5 rounded-lg bg-[#111111] border border-[#1A1A1A] flex items-center justify-between"
                    >
                      <span className="font-mono text-xs text-white">
                        {dim.label}
                      </span>
                      <StarRating
                        value={categoryScores[dim.key]}
                        size="sm"
                        interactive
                        onChange={(val) =>
                          setCategoryScores((prev) => ({
                            ...prev,
                            [dim.key]: val,
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label
                  htmlFor="club-review-author"
                  className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                >
                  YOUR NAME / ALIAS
                </label>
                <input
                  id="club-review-author"
                  type="text"
                  placeholder="e.g. Arjun V."
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white placeholder-[#666666]"
                />
              </div>

              {/* Event Attended Select */}
              <div>
                <label
                  htmlFor="club-review-event-select"
                  className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                >
                  EVENT ATTENDED (OPTIONAL)
                </label>
                <select
                  id="club-review-event-select"
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white"
                >
                  <option value="">General club visit / Resident night</option>
                  {(club.upcomingEvents || []).map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.date})
                    </option>
                  ))}
                </select>
              </div>

              {/* Textarea */}
              <div>
                <label
                  htmlFor="club-review-text"
                  className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
                >
                  YOUR REVIEW
                </label>
                <textarea
                  id="club-review-text"
                  rows={4}
                  required
                  placeholder="Tell other partygoers what you loved: the sound system, crowd, drinks, door staff, or atmosphere..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white placeholder-[#666666] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-mono font-bold text-white transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                >
                  SUBMIT REVIEW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#111111] border border-[#22C55E] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in slide-in-from-bottom"
        >
          <Check className="w-4 h-4 text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </main>
  );
}
