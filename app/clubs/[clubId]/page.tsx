"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import ClubCard from "@/components/club/ClubCard";
import {
  MapPin,
  Clock,
  Star,
  Users,
  Share2,
  Heart,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  X,
  Plus,
  Compass,
  Check,
  ArrowRight,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import {
  getDetailedClubById,
  allClubsData,
  ClubReview,
  ClubEventItem,
} from "@/lib/clubs-data";

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.clubId as string) || "xyz-club";

  const club = useMemo(() => {
    return getDetailedClubById(rawId);
  }, [rawId]);

  // Related clubs: same or neighboring areas, excluding current club
  const relatedClubs = useMemo(() => {
    return allClubsData
      .filter((c) => c.id !== club.id)
      .slice(0, 4);
  }, [club.id]);

  // Local interaction states
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersDelta, setFollowersDelta] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [eventFilter, setEventFilter] = useState<"ALL" | "THIS WEEK" | "THIS MONTH">("ALL");
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [reviewsList, setReviewsList] = useState<ClubReview[]>(club.reviews || []);
  const [isCommunityJoined, setIsCommunityJoined] = useState(false);
  const [communityDelta, setCommunityDelta] = useState(0);
  const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newComment, setNewComment] = useState("");
  const [reviewSubmittedToast, setReviewSubmittedToast] = useState(false);
  const [followingClubs, setFollowingClubs] = useState<Record<string, boolean>>({});

  // Sync reviews if club changes
  useEffect(() => {
    setReviewsList(club.reviews || []);
    setIsFollowing(false);
    setFollowersDelta(0);
    setIsSaved(false);
    setIsCommunityJoined(false);
    setCommunityDelta(0);
  }, [club]);

  // Handle ESC key for lightbox and review modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
        setShowWriteReviewModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersDelta((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowersDelta((prev) => prev + 1);
    }
  };

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      const shareData = {
        title: `${club.name} on VibeUp`,
        text: `Discover ${club.name} in ${club.location || club.area}, Bangalore on VibeUp.`,
        url: window.location.href,
      };

      if (navigator.share && navigator.canShare?.(shareData)) {
        try {
          await navigator.share(shareData);
          return;
        } catch {
          // fallback to clipboard
        }
      }

      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleToggleCommunity = () => {
    if (isCommunityJoined) {
      setIsCommunityJoined(false);
      setCommunityDelta((prev) => prev - 1);
    } else {
      setIsCommunityJoined(true);
      setCommunityDelta((prev) => prev + 1);
    }
  };

  const handleRelatedFollowToggle = (cId: string) => {
    setFollowingClubs((prev) => ({
      ...prev,
      [cId]: !prev[cId],
    }));
  };

  // Filter events by timeframe
  const filteredEvents = useMemo(() => {
    const events = club.upcomingEvents || [];
    if (eventFilter === "ALL") return events;
    if (eventFilter === "THIS WEEK") {
      return events.filter((e) => e.timeframe === "this-week");
    }
    if (eventFilter === "THIS MONTH") {
      return events;
    }
    return events;
  }, [club.upcomingEvents, eventFilter]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const created: ClubReview = {
      id: `rev-${Date.now()}`,
      authorName: newAuthor.trim() || "VibeUp Explorer",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
      rating: newRating,
      date: "Just now",
      comment: newComment.trim(),
      tag: "Verified Attendee",
    };

    setReviewsList((prev) => [created, ...prev]);
    setShowWriteReviewModal(false);
    setNewComment("");
    setNewAuthor("");
    setNewRating(5);
    setReviewSubmittedToast(true);
    setTimeout(() => setReviewSubmittedToast(false), 3000);
  };

  const photos = club.photos || [];

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
              1. BREADCRUMB
          ================================================== */}
          <nav aria-label="Breadcrumb" className="mb-6 pt-2">
            <ol className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
              <li>
                <Link
                  href="/discover"
                  className="text-[#A1A1AA] hover:text-white transition-colors"
                >
                  DISCOVER
                </Link>
              </li>
              <li className="text-[#71717A]" aria-hidden="true">
                /
              </li>
              <li>
                <Link
                  href="/clubs"
                  className="text-[#A1A1AA] hover:text-white transition-colors"
                >
                  CLUBS
                </Link>
              </li>
              <li className="text-[#71717A]" aria-hidden="true">
                /
              </li>
              <li className="text-white font-bold truncate max-w-[200px] sm:max-w-none">
                {club.name}
              </li>
            </ol>
          </nav>

          {/* ==================================================
              2. CLUB HERO & 3. CLUB INFORMATION
          ================================================== */}
          <section
            aria-label={`${club.name} Venue Overview`}
            className="rounded-[20px] bg-[#141418] border border-[#2A2A35] overflow-hidden mb-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Left Column (Desktop 5 cols): Large Hero Image */}
              <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[360px] lg:h-full min-h-[300px] bg-[#09090B] overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={club.image}
                  alt={`${club.name} Nightlife Venue`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/40 lg:bg-gradient-to-r lg:from-transparent lg:to-[#141418]" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                    {club.area.toUpperCase()} · BANGALORE
                  </span>

                  {club.openTonight && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold text-white bg-[#22C55E]/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      OPEN TONIGHT
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column (Desktop 7 cols): Club Information */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Club Type */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="font-mono text-[11px] text-[#EC4899] font-bold tracking-wider uppercase">
                      {club.clubType || "BREWERY • LIVE MUSIC • NIGHTLIFE"}
                    </span>
                  </div>

                  {/* Club Name */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-white tracking-tight mb-3">
                    {club.name}
                  </h1>

                  {/* Rating + Followers + Location Line */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-xs font-mono text-[#A1A1AA]">
                    <div className="inline-flex items-center gap-1.5 text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full font-bold">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(club.rating || 4.7)
                                ? "fill-amber-400 text-amber-400"
                                : "text-amber-400/40"
                            }`}
                          />
                        ))}
                      </div>
                      <span>{club.rating ? club.rating.toFixed(1) : "4.7"}</span>
                    </div>

                    <span className="text-white font-semibold">
                      {(club.followers + followersDelta).toLocaleString()} FOLLOWERS
                    </span>

                    <span className="text-[#71717A]">·</span>

                    <span className="inline-flex items-center gap-1 text-[#D4D4D8]">
                      <MapPin className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
                      {club.location || `${club.area}, Bangalore`}
                    </span>
                  </div>

                  {/* Concise Description */}
                  <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed mb-5">
                    {club.description}
                  </p>

                  {/* Genres Chips */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="font-mono text-[11px] text-[#71717A] uppercase mr-1">
                      SOUND:
                    </span>
                    {club.genres.map((genre) => (
                      <span
                        key={genre}
                        className="font-mono text-xs text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-3 py-1 rounded-lg"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ==================================================
                    8. ACTION BUTTONS
                ================================================== */}
                <div className="pt-4 border-t border-[#2A2A35] flex flex-wrap items-center gap-3">
                  {/* Primary: FOLLOW button */}
                  <button
                    type="button"
                    onClick={handleToggleFollow}
                    aria-label={isFollowing ? `Unfollow ${club.name}` : `Follow ${club.name}`}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all duration-200 ${
                      isFollowing
                        ? "bg-[#8B5CF6]/20 border border-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                        : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] active:scale-95"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check className="w-4 h-4 text-[#8B5CF6]" />
                        <span>FOLLOWING</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>FOLLOW</span>
                      </>
                    )}
                  </button>

                  {/* Secondary: SHARE button */}
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share venue link"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] border border-[#2A2A35] hover:border-[#8B5CF6]/40 text-xs font-mono text-[#D4D4D8] hover:text-white transition-all"
                  >
                    <Share2 className="w-4 h-4 text-[#8B5CF6]" />
                    <span>{copiedLink ? "COPIED LINK ✓" : "SHARE"}</span>
                  </button>

                  {/* Optional: SAVE button */}
                  <button
                    type="button"
                    onClick={handleToggleSave}
                    aria-label={isSaved ? "Saved to favorites" : "Save to favorites"}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono transition-all ${
                      isSaved
                        ? "bg-[#EC4899]/15 border-[#EC4899] text-[#EC4899]"
                        : "bg-[#1A1A21] hover:bg-[#2A2A35] border-[#2A2A35] text-[#A1A1AA] hover:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? "fill-[#EC4899] text-[#EC4899]" : "text-[#A1A1AA]"
                      }`}
                    />
                    <span>{isSaved ? "SAVED" : "SAVE"}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              4. SOCIAL / VIBE SIGNALS
          ================================================== */}
          <section
            aria-label="Club Community & Social Interest"
            className="mb-12 p-4 sm:p-5 rounded-[16px] bg-[#141418] border border-[#2A2A35] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {(club.followers + followersDelta).toLocaleString()} PEOPLE FOLLOW THIS CLUB
                </h4>
                <p className="text-xs text-[#A1A1AA] font-sans">
                  People you may know follow this club and attend weekend events here.
                </p>
              </div>
            </div>

            {/* Avatar Stack */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center -space-x-2.5 overflow-hidden">
                {(club.followersList || []).slice(0, 5).map((follower) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={follower.id}
                    src={follower.avatar}
                    alt={follower.name}
                    title={follower.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#141418]"
                  />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-[#8B5CF6]">
                +{(club.followers / 1000).toFixed(1)}K
              </span>
            </div>
          </section>

          {/* ==================================================
              5. UPCOMING EVENTS & 11. EVENT FILTERS
          ================================================== */}
          <section aria-labelledby="upcoming-events-heading" className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                  CALENDAR &amp; GUESTLISTS
                </span>
                <h2
                  id="upcoming-events-heading"
                  className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
                >
                  UPCOMING EVENTS
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                  What&apos;s happening here. Book tickets or join guestlists early.
                </p>
              </div>

              {/* Event Filters */}
              <div
                role="tablist"
                aria-label="Event timeframe filter"
                className="inline-flex items-center p-1 rounded-xl bg-[#141418] border border-[#2A2A35] shrink-0"
              >
                {(["ALL", "THIS WEEK", "THIS MONTH"] as const).map((filter) => (
                  <button
                    key={filter}
                    role="tab"
                    aria-selected={eventFilter === filter}
                    onClick={() => setEventFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      eventFilter === filter
                        ? "bg-[#8B5CF6] text-white shadow-sm"
                        : "text-[#A1A1AA] hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((evt: ClubEventItem) => (
                  <EventCard
                    key={evt.id}
                    title={evt.title}
                    category={evt.category}
                    date={evt.date}
                    time={evt.time}
                    venue={evt.venue}
                    area={evt.area}
                    price={evt.price}
                    goingCount={evt.goingCount}
                    image={evt.image}
                    avatars={evt.avatars}
                    onClick={() => router.push(`/events/${evt.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-[20px] bg-[#141418] border border-[#2A2A35] text-center">
                <Calendar className="w-8 h-8 text-[#8B5CF6] mx-auto mb-2 opacity-60" />
                <h4 className="font-sans font-bold text-white text-base mb-1">
                  NO EVENTS IN THIS TIMEFRAME
                </h4>
                <p className="text-xs text-[#A1A1AA] font-sans max-w-sm mx-auto mb-4">
                  Check back soon or switch filter to explore events this month.
                </p>
                <button
                  type="button"
                  onClick={() => setEventFilter("ALL")}
                  className="px-4 py-2 rounded-xl bg-[#8B5CF6] text-white text-xs font-mono font-bold"
                >
                  SHOW ALL EVENTS
                </button>
              </div>
            )}
          </section>

          {/* ==================================================
              6. ABOUT THE CLUB & 7. VIBE / GENRES (2-Col Layout)
          ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Left Column (Cols 7): About the Club */}
            <section
              aria-labelledby="about-club-heading"
              className="lg:col-span-7 p-6 sm:p-8 rounded-[20px] bg-[#141418] border border-[#2A2A35]"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
                  VENUE IDENTITY
                </span>
              </div>
              <h2
                id="about-club-heading"
                className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight mb-4"
              >
                ABOUT THE CLUB
              </h2>

              <p
                className={`text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed mb-4 ${
                  !isAboutExpanded ? "line-clamp-4" : ""
                }`}
              >
                {club.about || club.description}
              </p>

              <button
                type="button"
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
              >
                <span>{isAboutExpanded ? "SHOW LESS" : "READ MORE"}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isAboutExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Venue Quick Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-[#2A2A35]">
                <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                  <span className="font-mono text-[10px] text-[#EC4899] uppercase block mb-1">
                    OPERATING HOURS
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{club.hours || "7:00 PM – 1:30 AM"}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                  <span className="font-mono text-[10px] text-[#22C55E] uppercase block mb-1">
                    DOOR &amp; ENTRY
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="truncate">
                      {club.entryRule || "Couples & reservation preferred"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column (Cols 5): Vibe / Genres */}
            <section
              aria-labelledby="vibe-genres-heading"
              className="lg:col-span-5 p-6 sm:p-8 rounded-[20px] bg-[#141418] border border-[#2A2A35]"
            >
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-4 h-4 text-[#EC4899]" />
                <span className="font-mono text-xs font-semibold text-[#EC4899] uppercase tracking-wider">
                  SOUND &amp; ATMOSPHERE
                </span>
              </div>
              <h2
                id="vibe-genres-heading"
                className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight mb-2"
              >
                THE VIBE
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mb-5">
                Curated descriptors from regulars and resident DJs describing the dancefloor.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {(club.vibeTags || [
                  "House",
                  "Techno",
                  "Dance Floor",
                  "Late Night",
                  "Cocktail Lab",
                  "High Energy",
                ]).map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-2 rounded-xl bg-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-colors text-xs font-mono font-medium text-white flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
                    <span>#{tag.toUpperCase()}</span>
                  </span>
                ))}
              </div>

              {/* Music Genres Badges */}
              <div className="mt-6 pt-6 border-t border-[#2A2A35]">
                <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider block mb-2.5">
                  CORE MUSIC GENRES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {club.genres.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono font-bold text-[#8B5CF6]"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ==================================================
              8. COMMUNITY SECTION
          ================================================== */}
          {club.community && (
            <section
              aria-labelledby="club-community-heading"
              className="mb-16 p-6 sm:p-8 rounded-[20px] bg-gradient-to-r from-[#141418] via-[#1A1A21] to-[#141418] border border-[#2A2A35] relative overflow-hidden"
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#8B5CF6]/10 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={club.community.image}
                    alt={club.community.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#8B5CF6]/50 shrink-0 shadow-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2 py-0.5 rounded-full font-bold">
                        OFFICIAL COMMUNITY
                      </span>
                    </div>
                    <h3
                      id="club-community-heading"
                      className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight"
                    >
                      {club.community.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5 max-w-xl">
                      {club.community.description}
                    </p>
                    <span className="font-mono text-xs text-[#22C55E] mt-1.5 inline-block">
                      {(club.community.memberCount + communityDelta).toLocaleString()} ACTIVE MEMBERS
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleToggleCommunity}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-md ${
                      isCommunityJoined
                        ? "bg-[#22C55E]/20 border border-[#22C55E] text-[#22C55E]"
                        : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                    }`}
                  >
                    {isCommunityJoined ? "JOINED COMMUNITY ✓" : "JOIN COMMUNITY"}
                  </button>

                  <Link
                    href={`/crews/c1`}
                    className="px-4 py-3 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] border border-[#2A2A35] text-xs font-mono text-white transition-colors"
                  >
                    VIEW CREWS
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* ==================================================
              9. PHOTOS / GALLERY
          ================================================== */}
          <section aria-labelledby="club-photos-heading" className="mb-16">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs font-semibold text-[#EC4899] uppercase tracking-wider block mb-1">
                  VISUAL ARCHIVE
                </span>
                <h2
                  id="club-photos-heading"
                  className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
                >
                  CLUB PHOTOS
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                  Glimpses of the sound system, lighting design, and weekend atmosphere.
                </p>
              </div>
              <span className="font-mono text-xs text-[#A1A1AA]">
                {photos.length} PHOTOGRAPHS
              </span>
            </div>

            {/* Photo Grid (2 cols mobile, 3 cols tablet, 3-4 cols desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className="group relative h-[180px] sm:h-[220px] rounded-[16px] overflow-hidden bg-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6] cursor-pointer transition-all duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                    <p className="text-xs font-sans text-white font-medium line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ==================================================
              10. REVIEWS
          ================================================== */}
          <section aria-labelledby="club-reviews-heading" className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                  COMMUNITY FEEDBACK
                </span>
                <h2
                  id="club-reviews-heading"
                  className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
                >
                  REVIEWS
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono text-sm font-bold text-white">
                    {club.rating ? club.rating.toFixed(1) : "4.7"} / 5.0
                  </span>
                  <span className="font-mono text-xs text-[#A1A1AA]">
                    · ({reviewsList.length} verified reviews)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowWriteReviewModal(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)] self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>WRITE A REVIEW</span>
              </button>
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-[16px] bg-[#141418] border border-[#2A2A35] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rev.avatar}
                          alt={rev.authorName}
                          className="w-10 h-10 rounded-full object-cover border border-[#2A2A35]"
                        />
                        <div>
                          <h4 className="font-sans font-bold text-sm text-white">
                            {rev.authorName}
                          </h4>
                          <span className="font-mono text-[11px] text-[#A1A1AA]">
                            {rev.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md font-mono text-xs text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{rev.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#D4D4D8] font-sans leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  {rev.tag && (
                    <div className="mt-3 pt-3 border-t border-[#2A2A35] flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#22C55E] inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {rev.tag}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href={`/clubs/${club.id}/reviews`}
                className="px-6 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] border border-[#2A2A35] hover:border-[#8B5CF6]/50 text-xs font-mono text-[#D4D4D8] hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <span>SEE ALL REVIEWS →</span>
              </Link>
            </div>
          </section>

          {/* ==================================================
              11. RELATED CLUBS ("YOU MAY ALSO LIKE")
          ================================================== */}
          <section aria-labelledby="related-clubs-heading" className="mb-12">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                  MORE BANGALORE NIGHTLIFE
                </span>
                <h2
                  id="related-clubs-heading"
                  className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
                >
                  YOU MAY ALSO LIKE
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-0.5">
                  Other venues matching this soundscape and crowd profile.
                </p>
              </div>

              <Link
                href="/clubs"
                className="hidden sm:inline-flex items-center gap-1 font-mono text-xs font-bold text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
              >
                <span>EXPLORE ALL CLUBS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Related Clubs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedClubs.map((relClub) => (
                <ClubCard
                  key={relClub.id}
                  club={relClub}
                  isFollowing={!!followingClubs[relClub.id]}
                  onToggleFollow={handleRelatedFollowToggle}
                  showUpcomingBadge={true}
                />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/clubs"
                className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#8B5CF6] hover:text-[#A78BFA]"
              >
                <span>EXPLORE ALL CLUBS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* ==================================================
          LIGHTBOX MODAL FOR CLUB PHOTOS
      ================================================== */}
      {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#141418] border border-[#2A2A35] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="p-4 flex items-center justify-between border-b border-[#2A2A35]">
              <span className="font-mono text-xs text-[#A1A1AA]">
                PHOTO {selectedPhotoIndex + 1} OF {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close Lightbox"
                className="w-8 h-8 rounded-full bg-[#1A1A21] hover:bg-[#2A2A35] text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lightbox Image */}
            <div className="relative w-full h-[320px] sm:h-[480px] bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[selectedPhotoIndex].url}
                alt={photos[selectedPhotoIndex].caption}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next controls */}
              {selectedPhotoIndex > 0 && (
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => setSelectedPhotoIndex(selectedPhotoIndex - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {selectedPhotoIndex < photos.length - 1 && (
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setSelectedPhotoIndex(selectedPhotoIndex + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Lightbox Caption */}
            <div className="p-4 bg-[#141418] border-t border-[#2A2A35]">
              <p className="font-sans text-sm text-white font-medium">
                {photos[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          WRITE REVIEW MODAL
      ================================================== */}
      {showWriteReviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowWriteReviewModal(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#141418] border border-[#2A2A35] rounded-2xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#8B5CF6]" />
                <h3
                  id="write-review-title"
                  className="font-sans font-bold text-xl text-white tracking-tight"
                >
                  REVIEW {club.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowWriteReviewModal(false)}
                aria-label="Close review dialog"
                className="w-8 h-8 rounded-full bg-[#1A1A21] hover:bg-[#2A2A35] text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#A1A1AA] font-sans mb-5">
              Share your experience regarding sound quality, crowd energy, entry policy, and overall vibe.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Select */}
              <div>
                <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                  RATING
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      aria-label={`${star} star rating`}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? "fill-amber-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-xs text-white ml-2">
                    {newRating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label
                  htmlFor="review-author-input"
                  className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5"
                >
                  YOUR NAME / ALIAS
                </label>
                <input
                  id="review-author-input"
                  type="text"
                  placeholder="e.g. Maya S."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white placeholder-[#71717A]"
                />
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="review-comment-input"
                  className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5"
                >
                  YOUR REVIEW
                </label>
                <textarea
                  id="review-comment-input"
                  rows={4}
                  required
                  placeholder="How was the sound? How did the dance floor feel?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white placeholder-[#71717A] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowWriteReviewModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-mono font-bold text-white transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                >
                  SUBMIT REVIEW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Submitted Toast */}
      {reviewSubmittedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1A1A21] border border-[#22C55E] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in slide-in-from-bottom"
        >
          <Check className="w-4 h-4 text-[#22C55E]" />
          <span>Review submitted! Added to community feedback.</span>
        </div>
      )}

      <Footer />
    </main>
  );
}
