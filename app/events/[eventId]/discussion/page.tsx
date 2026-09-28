"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, MessageSquare, Heart, Send, AlertCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { getEventById, DiscussionPost } from "@/lib/events-data";

interface DiscussionPageProps {
  params?: {
    eventId?: string;
  };
}

export default function EventDiscussionPage({ params }: DiscussionPageProps) {
  const routeParams = useParams();
  const rawId = (routeParams?.eventId as string) || params?.eventId || "saturday-techno-night";
  const event = useMemo(() => getEventById(rawId), [rawId]);
  const [posts, setPosts] = useState<DiscussionPost[]>(event.discussions);
  const [inputVal, setInputVal] = useState("");
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [hasLikedState, setHasLikedState] = useState<Record<string, boolean>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleLike = (id: string, initialCount: number) => {
    const isLiked = hasLikedState[id];
    setHasLikedState((prev) => ({ ...prev, [id]: !isLiked }));
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + (isLiked ? -1 : 1),
    }));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const newPost: DiscussionPost = {
      id: `d-${Date.now()}`,
      authorName: "You",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
      badge: "Member",
      text: inputVal,
      timestamp: "Just now",
      repliesCount: 0,
      likesCount: 1,
    };
    setPosts([newPost, ...posts]);
    setInputVal("");
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          {/* Back Navigation */}
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-sm font-mono text-[#A1A1AA] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO EVENT</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider block mb-1">
              COMMUNITY TOPICS
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white">
              Event Discussion
            </h1>
            <p className="text-sm text-[#A1A1AA] font-sans mt-1">
              {event.title} · Ask questions, coordinate rides, or find afterparty spots.
            </p>
          </div>

          {/* New Discussion Composer */}
          <form
            onSubmit={handlePostSubmit}
            className="p-4 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35] mb-8 flex flex-col gap-3"
          >
            <textarea
              rows={3}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="What's on your mind about this event? (Carpooling, outfits, timings)..."
              className="w-full bg-[#141418] border border-[#2A2A35] rounded-xl p-3 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#8B5CF6] font-sans resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#71717A]">
                Be kind &amp; respect the vibe.
              </span>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold font-sans flex items-center gap-1.5 transition-colors"
              >
                <span>POST TOPIC</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Discussion Posts */}
          <div className="space-y-4">
            {posts.map((post) => {
              const currentLikes = likesState[post.id] ?? post.likesCount;
              const isLiked = hasLikedState[post.id] ?? false;

              return (
                <div
                  key={post.id}
                  className="p-5 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.avatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-[#2A2A35]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-semibold text-white text-sm">
                          {post.authorName}
                        </span>
                        {post.badge && (
                          <span className="font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/15 px-2 py-0.5 rounded-full">
                            {post.badge}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-[#71717A]">
                        {post.timestamp}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-[#D4D4D8] leading-relaxed mb-4 pl-1">
                    {post.text}
                  </p>

                  <div className="flex items-center gap-6 pt-3 border-t border-[#2A2A35]/60 text-xs font-mono text-[#A1A1AA]">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id, post.likesCount)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        isLiked ? "text-[#EC4899]" : "hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isLiked ? "fill-[#EC4899]" : ""}`}
                      />
                      <span>{currentLikes} likes</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-[#A1A1AA]">
                      <MessageSquare className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>{post.repliesCount} replies</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Auth Prompt Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#1A1A21] border border-[#2A2A35] rounded-[16px] p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="font-sans font-bold text-lg text-white mb-2">
              Sign in to post topics
            </h3>
            <p className="text-xs text-[#A1A1AA] font-sans leading-relaxed mb-6">
              Only verified nightlife members can start topics to keep our community safe and spam-free.
            </p>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/signin"
                className="w-full py-2.5 rounded-[10px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-colors"
              >
                Sign In / Join VibeUp
              </Link>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="w-full py-2.5 rounded-[10px] border border-[#2A2A35] text-[#A1A1AA] hover:text-white font-sans text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
