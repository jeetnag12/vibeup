"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Heart, ArrowRight, Send, AlertCircle } from "@/components/icons";
import { DetailedEvent, DiscussionPost } from "@/lib/events-data";

interface EventDiscussionSectionProps {
  event: DetailedEvent;
}

export default function EventDiscussionSection({
  event,
}: EventDiscussionSectionProps) {
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [hasLikedState, setHasLikedState] = useState<Record<string, boolean>>({});
  const [inputVal, setInputVal] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleLike = (post: DiscussionPost) => {
    const isLiked = hasLikedState[post.id];
    setHasLikedState((prev) => ({ ...prev, [post.id]: !isLiked }));
    setLikesState((prev) => ({
      ...prev,
      [post.id]: (prev[post.id] ?? post.likesCount) + (isLiked ? -1 : 1),
    }));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    // Show prompt to sign in
    setShowAuthModal(true);
  };

  return (
    <section className="w-full my-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <span className="font-mono text-[11px] text-[#FFE14D] uppercase tracking-wider block mb-1">
            COMMUNITY CHAT
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            EVENT DISCUSSION
          </h2>
          <p className="text-sm sm:text-base text-[#8E8C9C] font-sans mt-1">
            Talk before the night starts. Plan rides, check outfits &amp; find crew members.
          </p>
        </div>

        <Link
          href={`/events/${event.id}/discussion`}
          className="group inline-flex items-center gap-1.5 text-[#FFE14D] hover:text-purple-300 font-medium text-sm transition-colors shrink-0"
        >
          <span>VIEW ALL TOPICS</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Discussion Posts Feed */}
      <div className="space-y-3.5 mb-6">
        {event.discussions.map((post) => {
          const currentLikes = likesState[post.id] ?? post.likesCount;
          const isLiked = hasLikedState[post.id] ?? false;

          return (
            <div
              key={post.id}
              className="p-5 rounded-[12px] bg-[#15151C] border border-[#25252F] hover:border-[#FFE14D]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.avatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-[#25252F]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-semibold text-white text-sm">
                        {post.authorName}
                      </span>
                      {post.badge && (
                        <span className="font-mono text-[10px] text-[#FFE14D] bg-[#FFE14D]/15 px-2 py-0.5 rounded-full font-medium">
                          {post.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-[#8E8C9C]">
                      {post.timestamp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <p className="font-sans text-sm text-[#D4D4D8] leading-relaxed mb-4 pl-1">
                &ldquo;{post.text}&rdquo;
              </p>

              {/* Interactions bar */}
              <div className="flex items-center gap-6 pt-3 border-t border-[#25252F]/60 text-xs font-mono text-[#8E8C9C]">
                <button
                  type="button"
                  onClick={() => toggleLike(post)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isLiked ? "text-[#FF4FA3]" : "hover:text-white"
                  }`}
                >
                  <Heart weight={isLiked ? "fill" : "bold"}
 className={`w-3.5 h-3.5 ${isLiked ? "text-[#FF4FA3]" : ""}`}
 />
                  <span>{currentLikes} likes</span>
                </button>

                <Link
                  href={`/events/${event.id}/discussion`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#FFE14D]" />
                  <span>{post.repliesCount} replies</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start a discussion box */}
      <form
        onSubmit={handlePostSubmit}
        className="p-4 rounded-[12px] bg-[#15151C] border border-[#25252F] flex items-center gap-3"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask a question or start a topic (e.g. splitting an Uber from HSR?)..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-[#8E8C9C] focus:outline-none font-sans px-2"
        />

        <button
          type="submit"
          className="px-5 py-2.5 rounded-[4px] bg-[#FFE14D] hover:bg-[#F2CF2E] text-[#0B0B10] text-xs font-semibold font-sans flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>POST</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Link to dedicated discussion page */}
      <div className="mt-4 text-center">
        <Link
          href={`/events/${event.id}/discussion`}
          className="inline-flex items-center gap-2 text-sm font-sans font-medium text-[#FFE14D] hover:underline"
        >
          <span>START A DISCUSSION →</span>
        </Link>
      </div>

      {/* Auth Prompt Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#15151C] border border-[#25252F] rounded-[12px] p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFE14D]/15 border border-[#FFE14D]/30 flex items-center justify-center text-[#FFE14D] mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="font-sans font-bold text-lg text-white mb-2">
              Sign in to join discussion
            </h3>
            <p className="text-xs text-[#8E8C9C] font-sans leading-relaxed mb-6">
              Only verified nightlife members can participate in event discussions
              to maintain our friendly, spam-free vibe.
            </p>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/login"
                className="w-full py-2.5 rounded-[10px] bg-[#FFE14D] hover:bg-[#F2CF2E] text-[#0B0B10] font-sans text-sm font-semibold transition-colors text-center"
              >
                Sign In / Join VibeUp
              </Link>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="w-full py-2.5 rounded-[10px] border border-[#25252F] text-[#8E8C9C] hover:text-white font-sans text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
