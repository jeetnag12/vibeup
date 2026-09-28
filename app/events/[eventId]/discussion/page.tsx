"use client";

import { useState, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventDiscussionHeader from "@/components/event-discussion/EventDiscussionHeader";
import DiscussionNavTabs from "@/components/event-discussion/DiscussionNavTabs";
import DiscussionComposer from "@/components/event-discussion/DiscussionComposer";
import DiscussionFilters, {
  DiscussionSort,
} from "@/components/event-discussion/DiscussionFilters";
import DiscussionPostCard from "@/components/event-discussion/DiscussionPostCard";
import EventInfoCard from "@/components/event-discussion/EventInfoCard";
import PopularQuestionsCard from "@/components/event-discussion/PopularQuestionsCard";
import CrewsPreviewCard from "@/components/event-discussion/CrewsPreviewCard";
import FindYourCrowdCTA from "@/components/event-discussion/FindYourCrowdCTA";
import ReportPostModal from "@/components/event-discussion/ReportPostModal";
import DiscussionPostSkeleton from "@/components/event-discussion/DiscussionPostSkeleton";
import {
  getEventById,
  DiscussionPost,
  DiscussionTopic,
  DiscussionReply,
} from "@/lib/events-data";
import { MessageSquare, Sparkles, Plus } from "lucide-react";

interface DiscussionPageProps {
  params?: {
    eventId?: string;
  };
}

export default function EventDiscussionPage({ params }: DiscussionPageProps) {
  const routeParams = useParams();
  const rawId =
    (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";

  const event = useMemo(() => getEventById(rawId), [rawId]);

  // Posts & Local State
  const [posts, setPosts] = useState<DiscussionPost[]>(event.discussions);
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [hasLikedState, setHasLikedState] = useState<Record<string, boolean>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading] = useState(false);

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<DiscussionTopic | "ALL">("ALL");
  const [sort, setSort] = useState<DiscussionSort>("LATEST");

  // Reporting State
  const [reportTargetPost, setReportTargetPost] = useState<DiscussionPost | null>(null);

  // Composer Scroll Ref
  const composerRef = useRef<HTMLDivElement>(null);

  const scrollToComposer = () => {
    if (composerRef.current) {
      composerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Like Toggle
  const handleToggleLike = (postId: string) => {
    const isLiked = hasLikedState[postId] ?? false;
    const currentPost = posts.find((p) => p.id === postId);
    const initialLikes = currentPost?.likesCount ?? 0;
    const currentCount = likesState[postId] ?? initialLikes;

    setHasLikedState((prev) => ({ ...prev, [postId]: !isLiked }));
    setLikesState((prev) => ({
      ...prev,
      [postId]: isLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
    }));
  };

  // Add Post from Composer
  const handlePostSubmit = (text: string, topic: DiscussionTopic) => {
    const newPost: DiscussionPost = {
      id: `dp-${Date.now()}`,
      authorName: "You",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      badge: "You",
      vibeScore: 92,
      text,
      timestamp: "Just now",
      topic,
      repliesCount: 0,
      likesCount: 1,
      replies: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    // Auto-select topic if not already viewing
    if (selectedTopic !== "ALL" && selectedTopic !== topic) {
      setSelectedTopic("ALL");
    }
  };

  // Add Reply to Post
  const handleAddReply = (postId: string, replyText: string) => {
    const newReply: DiscussionReply = {
      id: `rep-${Date.now()}`,
      authorName: "You",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      vibeScore: 92,
      text: replyText,
      timestamp: "Just now",
      likesCount: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const currentReplies = p.replies || [];
          return {
            ...p,
            repliesCount: (p.repliesCount || currentReplies.length) + 1,
            replies: [...currentReplies, newReply],
          };
        }
        return p;
      })
    );
  };

  // Popular Question Selector Handler
  const handleSelectPopularQuestion = (query: string, topic?: DiscussionTopic) => {
    if (topic) {
      setSelectedTopic(topic);
    }
    setSearchQuery(query);
    scrollToComposer();
  };

  // Filter & Sort Discussions
  const filteredAndSortedPosts = useMemo(() => {
    let list = [...posts];

    // 1. Topic Filter
    if (selectedTopic !== "ALL") {
      list = list.filter((p) => p.topic === selectedTopic);
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const textMatch = p.text.toLowerCase().includes(q);
        const authorMatch = p.authorName.toLowerCase().includes(q);
        const topicMatch = p.topic?.toLowerCase().includes(q) ?? false;
        const repliesMatch =
          p.replies?.some((r) => r.text.toLowerCase().includes(q)) ?? false;
        return textMatch || authorMatch || topicMatch || repliesMatch;
      });
    }

    // 3. Sorting
    switch (sort) {
      case "MOST DISCUSSED":
        list.sort((a, b) => (b.repliesCount || 0) - (a.repliesCount || 0));
        break;
      case "TRENDING":
        list.sort(
          (a, b) =>
            (b.likesCount || 0) + (b.repliesCount || 0) * 2 -
            ((a.likesCount || 0) + (a.repliesCount || 0) * 2)
        );
        break;
      case "LATEST":
      default:
        // Already in chronological order, new posts prepended
        break;
    }

    return list;
  }, [posts, selectedTopic, searchQuery, sort]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

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
          {/* 2. Event Header */}
          <EventDiscussionHeader event={event} />

          {/* 3. Discussion Navigation Tabs */}
          <DiscussionNavTabs eventId={event.id} />

          {/* 4. Page Title & Activity Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
                <span className="font-mono text-[11px] text-[#8B5CF6] font-semibold uppercase tracking-wider">
                  COMMUNITY BOARD
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight"
                style={{ fontWeight: 700 }}
              >
                EVENT DISCUSSION
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-1">
                Talk before the night starts. Coordinate cabs, outfits, timing &amp; afters.
              </p>
            </div>

            {/* Activity Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141418] border border-[#2A2A35] shrink-0 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="font-mono text-xs text-[#A1A1AA]">
                <strong className="text-white">126</strong> PEOPLE IN THIS EVENT
              </span>
            </div>
          </div>

          {/* 2-Column Desktop Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Column: Feed & Composer (8 cols) */}
            <div className="lg:col-span-8 flex flex-col w-full">
              {/* Discussion Composer */}
              <div ref={composerRef}>
                <DiscussionComposer
                  onPostSubmit={handlePostSubmit}
                  isAuthenticated={isAuthenticated}
                  onToggleAuth={() => setIsAuthenticated(!isAuthenticated)}
                />
              </div>

              {/* Filters, Topic Pills & Sorting */}
              <DiscussionFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTopic={selectedTopic}
                onTopicChange={setSelectedTopic}
                sort={sort}
                onSortChange={setSort}
                filteredCount={filteredAndSortedPosts.length}
              />

              {/* Feed Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  LATEST DISCUSSIONS
                </span>
                <span className="font-mono text-xs text-[#A1A1AA]">
                  {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? "thread" : "threads"}
                </span>
              </div>

              {/* Feed List / Empty State */}
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  <DiscussionPostSkeleton />
                  <DiscussionPostSkeleton />
                  <DiscussionPostSkeleton />
                </div>
              ) : filteredAndSortedPosts.length === 0 ? (
                /* Empty State */
                <div className="p-8 sm:p-12 rounded-[20px] bg-[#141418] border border-[#2A2A35] text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1A21] border border-[#2A2A35] flex items-center justify-center mb-3 text-[#8B5CF6]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-1">
                    START THE CONVERSATION
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans max-w-sm mb-5 leading-relaxed">
                    {searchQuery
                      ? "No discussions match your search. Reset or ask a new question."
                      : "No one has posted in this topic yet. Ask the first question!"}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery || selectedTopic !== "ALL") {
                        setSearchQuery("");
                        setSelectedTopic("ALL");
                      }
                      scrollToComposer();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                  >
                    START A DISCUSSION
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredAndSortedPosts.map((post) => {
                    const isLiked = hasLikedState[post.id] ?? false;
                    const likesCount = likesState[post.id] ?? post.likesCount;

                    return (
                      <DiscussionPostCard
                        key={post.id}
                        post={post}
                        isLiked={isLiked}
                        likesCount={likesCount}
                        onToggleLike={handleToggleLike}
                        onAddReply={handleAddReply}
                        onOpenReportModal={setReportTargetPost}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Sidebar Column (4 cols) */}
            <aside className="lg:col-span-4 flex flex-col gap-5 w-full sticky top-[104px]">
              {/* 5. Pinned Event Info */}
              <EventInfoCard event={event} />

              {/* 7. Popular Questions */}
              <PopularQuestionsCard
                onSelectQuestion={handleSelectPopularQuestion}
              />

              {/* 8. Event Crews Preview */}
              <CrewsPreviewCard event={event} />

              {/* 9. Find Your Crowd CTA */}
              <FindYourCrowdCTA eventId={event.id} />
            </aside>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportTargetPost && (
        <ReportPostModal
          post={reportTargetPost}
          onClose={() => setReportTargetPost(null)}
        />
      )}

      {/* Mobile Sticky Quick-Compose FAB */}
      <div className="lg:hidden fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={scrollToComposer}
          aria-label="Start a discussion"
          className="h-12 px-4 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold shadow-[0_0_24px_rgba(139,92,246,0.45)] border border-purple-400/40 flex items-center gap-2 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>ASK QUESTION</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
