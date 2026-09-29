"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventHeader from "@/components/event/EventHeader";
import EventNavTabs from "@/components/event/EventNavTabs";
import ReviewSummary from "@/components/event/ReviewSummary";
import ReviewBreakdown from "@/components/event/ReviewBreakdown";
import ReviewHighlights from "@/components/event/ReviewHighlights";
import ReviewFilters, {
  ReviewFilterCategory,
  ReviewSortOption,
} from "@/components/event/ReviewFilters";
import ReviewCard from "@/components/event/ReviewCard";
import WriteReviewCTA from "@/components/event/WriteReviewCTA";
import WriteReviewModal from "@/components/event/WriteReviewModal";
import ReportReviewModal from "@/components/event/ReportReviewModal";
import EventInsights from "@/components/event/EventInsights";
import RelatedEvents from "@/components/event/RelatedEvents";
import ReviewSkeleton from "@/components/event/ReviewSkeleton";

import { getEventById, DetailedEvent } from "@/lib/events-data";
import {
  getReviewsForEvent,
  EventReview,
  mockReviewSummary,
} from "@/lib/reviews-data";
import {
  SearchX,
  Plus,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

interface ReviewsPageProps {
  params?: {
    eventId?: string;
  };
}

export default function EventReviewsPage({ params }: ReviewsPageProps) {
  const routeParams = useParams();
  const rawId =
    (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";

  // Event Data
  const event: DetailedEvent = useMemo(() => getEventById(rawId), [rawId]);

  // Reviews State
  const initialReviews = useMemo(() => getReviewsForEvent(rawId), [rawId]);
  const [reviews, setReviews] = useState<EventReview[]>(initialReviews);

  // Loading & Error States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Auth & Verified Attendance States (default: authenticated & verified for testing)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isVerifiedAttendee, setIsVerifiedAttendee] = useState<boolean>(true);

  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ReviewFilterCategory>("ALL");
  const [activeSort, setActiveSort] = useState<ReviewSortOption>("MOST RECENT");

  // Interaction States
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});
  const [showWriteModal, setShowWriteModal] = useState<boolean>(false);
  const [reportingReview, setReportingReview] = useState<EventReview | null>(null);

  // Notification Banner
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    type: "success" | "info";
  } | null>(null);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  // Helpful Toggle Handler
  const handleToggleHelpful = (reviewId: string) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // Share Handler
  const handleShareReview = (review: EventReview) => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setNotification({
        title: "LINK COPIED ✓",
        message: `Direct link to review by ${review.author.name} copied to clipboard.`,
        type: "success",
      });
    }
  };

  // Report Confirm Handler
  const handleConfirmReport = (reviewId: string, reason: string) => {
    setNotification({
      title: "REPORT RECEIVED",
      message: `Review flagged as "${reason}". Our team will inspect it shortly.`,
      type: "info",
    });
  };

  // Review Submit Handler
  const handleReviewSubmitted = (newReview: EventReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setNotification({
      title: "REVIEW SUBMITTED ✓",
      message: "Thanks for helping the next crowd know what to expect.",
      type: "success",
    });
  };

  // Retry on error
  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
      setReviews(getReviewsForEvent(rawId));
    }, 600);
  };

  // Filter & Sort Logic
  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];

    // 1. Text Search Filter (review text or author name)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.text.toLowerCase().includes(q) ||
          r.author.name.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    switch (activeFilter) {
      case "MUSIC":
        result = result.filter((r) => r.musicRating >= 4.5);
        break;
      case "CROWD":
        result = result.filter((r) => r.crowdRating >= 4.5);
        break;
      case "VENUE":
        result = result.filter((r) => r.venueRating >= 4.4);
        break;
      case "EXPERIENCE":
        result = result.filter((r) => r.overallRating >= 4.7);
        break;
      case "ALL":
      default:
        break;
    }

    // 3. Sorting
    switch (activeSort) {
      case "HIGHEST RATED":
        result.sort((a, b) => b.overallRating - a.overallRating);
        break;
      case "MOST HELPFUL":
        result.sort((a, b) => {
          const aCount = a.helpfulCount + (helpfulMap[a.id] ? 1 : 0);
          const bCount = b.helpfulCount + (helpfulMap[b.id] ? 1 : 0);
          return bCount - aCount;
        });
        break;
      case "MOST RECENT":
      default:
        // Prioritize newly added review
        result.sort((a, b) => (b.id.startsWith("rev-") ? 1 : 0) - (a.id.startsWith("rev-") ? 1 : 0));
        break;
    }

    return result;
  }, [reviews, searchQuery, activeFilter, activeSort, helpfulMap]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Page Container */}
      <div className="w-full pt-[88px] pb-[80px]">
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Notification Toast */}
          {notification && (
            <div className="mb-6 p-4 rounded-2xl bg-[#141418] border border-[#8B5CF6]/50 shadow-[0_0_24px_rgba(139,92,246,0.25)] flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-[#A1A1AA] font-sans">
                    {notification.message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNotification(null)}
                aria-label="Dismiss notification"
                className="p-1.5 text-xs font-mono text-[#A1A1AA] hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* 2. Event Header */}
          <EventHeader event={event} activeSection="REVIEWS" />

          {/* 3. Event Navigation (Tabs) */}
          <EventNavTabs eventId={event.id} />

          {/* Error State */}
          {hasError ? (
            <div className="my-16 p-10 rounded-[20px] bg-[#141418] border border-[#EF4444]/40 text-center max-w-md mx-auto">
              <AlertTriangle className="w-10 h-10 text-[#EF4444] mx-auto mb-3" />
              <h3 className="text-xl font-bold font-sans text-white mb-2">
                COULDN&apos;T LOAD REVIEWS
              </h3>
              <p className="text-xs text-[#A1A1AA] mb-6">
                Something went wrong while loading the reviews. Please try again.
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>TRY AGAIN</span>
              </button>
            </div>
          ) : isLoading ? (
            /* Loading Skeleton State */
            <div className="my-10">
              <ReviewSkeleton />
            </div>
          ) : (
            /* 2-Column Responsive Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Main Content Column (Cols 7 or 8 on desktop) */}
              <div className="lg:col-span-8 flex flex-col w-full space-y-8">
                {/* 5. Review Highlights */}
                <ReviewHighlights highlights={mockReviewSummary.highlights} />

                {/* 8. Write a Review CTA */}
                <WriteReviewCTA
                  isAuthenticated={isAuthenticated}
                  isVerifiedAttendee={isVerifiedAttendee}
                  onOpenModal={() => setShowWriteModal(true)}
                  onSignIn={() => setIsAuthenticated(true)}
                  onToggleVerification={() => setIsVerifiedAttendee(!isVerifiedAttendee)}
                />

                {/* 6. Review Filters & Search */}
                <ReviewFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  activeSort={activeSort}
                  onSortChange={setActiveSort}
                  totalCount={filteredAndSortedReviews.length}
                />

                {/* 7. Review Feed */}
                <section aria-label="Review feed" className="space-y-4">
                  {filteredAndSortedReviews.length > 0 ? (
                    filteredAndSortedReviews.map((rev) => (
                      <ReviewCard
                        key={rev.id}
                        review={rev}
                        isHelpful={!!helpfulMap[rev.id]}
                        onToggleHelpful={handleToggleHelpful}
                        onReport={(r) => setReportingReview(r)}
                        onShare={handleShareReview}
                      />
                    ))
                  ) : (
                    /* 18. Empty State */
                    <div className="p-10 rounded-[20px] bg-[#141418] border border-[#2A2A35] text-center">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-3">
                        <SearchX className="w-7 h-7" />
                      </div>
                      <h4 className="text-xl font-bold font-sans text-white mb-1.5">
                        NO REVIEWS YET
                      </h4>
                      <p className="text-xs text-[#A1A1AA] font-sans max-w-sm mx-auto mb-6">
                        {searchQuery || activeFilter !== "ALL"
                          ? "No reviews match your search or filter keywords. Try resetting your filters."
                          : "No one has shared their experience yet. Be the first verified attendee to review!"}
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        {isVerifiedAttendee ? (
                          <button
                            type="button"
                            onClick={() => setShowWriteModal(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                          >
                            <Plus className="w-4 h-4" />
                            <span>WRITE A REVIEW</span>
                          </button>
                        ) : (
                          <Link
                            href={`/events/${event.id}`}
                            className="px-5 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] text-white text-xs font-mono font-medium border border-[#2A2A35] transition-colors"
                          >
                            VIEW EVENT
                          </Link>
                        )}

                        {(searchQuery || activeFilter !== "ALL") && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery("");
                              setActiveFilter("ALL");
                            }}
                            className="px-5 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] text-white text-xs font-mono font-medium border border-[#2A2A35] transition-colors"
                          >
                            RESET FILTERS
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              </div>

              {/* Sidebar Column (Cols 4 on desktop) */}
              <div className="lg:col-span-4 w-full space-y-6">
                {/* 4. Review Summary */}
                <ReviewSummary
                  overallRating={mockReviewSummary.overallRating}
                  totalReviews={mockReviewSummary.totalReviews}
                />

                {/* 5. Review Breakdown */}
                <ReviewBreakdown dimensions={mockReviewSummary.dimensions} />

                {/* 9. Event Experience Insights */}
                <EventInsights insights={mockReviewSummary.insights} />
              </div>
            </div>
          )}

          {/* 10. Related Events */}
          <RelatedEvents />
        </div>
      </div>

      {/* 11. Footer */}
      <Footer />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={showWriteModal}
        onClose={() => setShowWriteModal(false)}
        eventTitle={event.title}
        eventId={event.id}
        onSubmitReview={handleReviewSubmitted}
      />

      {/* Report Review Modal */}
      <ReportReviewModal
        isOpen={!!reportingReview}
        onClose={() => setReportingReview(null)}
        review={reportingReview}
        onConfirmReport={handleConfirmReport}
      />
    </main>
  );
}
