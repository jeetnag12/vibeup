"use client";

import { useState } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  MoreVertical,
  Send,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import { DiscussionPost } from "@/lib/events-data";

interface DiscussionPostCardProps {
  post: DiscussionPost;
  isLiked: boolean;
  likesCount: number;
  onToggleLike: (postId: string) => void;
  onAddReply: (postId: string, text: string) => void;
  onOpenReportModal: (post: DiscussionPost) => void;
}

export default function DiscussionPostCard({
  post,
  isLiked,
  likesCount,
  onToggleLike,
  onAddReply,
  onOpenReportModal,
}: DiscussionPostCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const replies = post.replies || [];
  const visibleReplies = showAllReplies ? replies : replies.slice(0, 2);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim()) return;
    onAddReply(post.id, replyInput.trim());
    setReplyInput("");
    setShowReplies(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Discussion by ${post.authorName}`,
          text: post.text,
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <article className="p-5 sm:p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Post Header: Avatar, Name, Metadata, 3-dot Menu */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.avatar}
              alt={post.authorName}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#2A2A35] group-hover:border-[#8B5CF6]/50 transition-colors shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm sm:text-base text-white">
                  {post.authorName}
                </span>
                {post.vibeScore && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#8B5CF6]/15 text-[#8B5CF6] font-semibold">
                    VIBE SCORE {post.vibeScore}
                  </span>
                )}
                {post.badge && (
                  <span className="font-mono text-[10px] text-[#A1A1AA] hidden sm:inline">
                    · {post.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] mt-0.5">
                <span>{post.timestamp.toUpperCase()}</span>
                {post.topic && (
                  <>
                    <span>·</span>
                    <span className="text-[#8B5CF6] font-semibold uppercase">
                      #{post.topic.replace("-", " ")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 3-Dot Menu Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-label="Post options"
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#2A2A35] transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 top-8 z-30 w-36 rounded-xl bg-[#141418] border border-[#2A2A35] shadow-xl py-1 animate-in fade-in"
                onClick={() => setShowMenu(false)}
              >
                <button
                  type="button"
                  onClick={() => onOpenReportModal(post)}
                  className="w-full text-left px-3.5 py-2 text-xs font-mono text-rose-400 hover:bg-[#2A2A35] transition-colors"
                >
                  Report Post
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Muted posts from ${post.authorName}`)}
                  className="w-full text-left px-3.5 py-2 text-xs font-mono text-[#A1A1AA] hover:text-white hover:bg-[#2A2A35] transition-colors"
                >
                  Mute Author
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Blocked ${post.authorName}`)}
                  className="w-full text-left px-3.5 py-2 text-xs font-mono text-[#A1A1AA] hover:text-white hover:bg-[#2A2A35] transition-colors"
                >
                  Block
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Post Text */}
        <p className="text-sm sm:text-base text-white/95 font-sans leading-relaxed mb-4">
          {post.text}
        </p>

        {/* Bottom Actions Row: Like, Reply, Share */}
        <div className="flex items-center gap-4 sm:gap-6 pt-3 border-t border-[#2A2A35]/60 text-xs font-mono text-[#A1A1AA]">
          {/* Like Action */}
          <button
            type="button"
            onClick={() => onToggleLike(post.id)}
            className={`flex items-center gap-1.5 transition-colors ${
              isLiked ? "text-rose-400 font-bold" : "hover:text-white"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                isLiked ? "fill-rose-400 text-rose-400" : ""
              }`}
            />
            <span>{likesCount}</span>
          </button>

          {/* Reply Action */}
          <button
            type="button"
            onClick={() => setShowReplies(!showReplies)}
            className={`flex items-center gap-1.5 transition-colors ${
              showReplies ? "text-[#8B5CF6] font-bold" : "hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>
              {post.repliesCount || replies.length}{" "}
              <span className="hidden sm:inline">
                {replies.length === 1 ? "REPLY" : "REPLIES"}
              </span>
            </span>
          </button>

          {/* Share Action */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto sm:ml-0"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-[#22C55E]" />
                <span className="text-[#22C55E]">COPIED</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">SHARE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Nested Replies Section */}
      {showReplies && (
        <div className="mt-4 pt-4 border-t border-[#2A2A35]/60 flex flex-col gap-3">
          {/* Existing Replies List */}
          {visibleReplies.map((reply) => (
            <div
              key={reply.id}
              className="ml-3 sm:ml-6 pl-3 sm:pl-4 border-l-2 border-[#8B5CF6]/40 flex items-start gap-3 py-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={reply.avatar}
                alt={reply.authorName}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 border border-[#2A2A35]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-white">
                    {reply.authorName}
                  </span>
                  <span className="font-mono text-[9px] text-[#A1A1AA]">
                    {reply.timestamp}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#D4D4D8] font-sans mt-0.5 leading-relaxed">
                  {reply.text}
                </p>
              </div>
            </div>
          ))}

          {/* View More Replies Toggle */}
          {replies.length > 2 && (
            <button
              type="button"
              onClick={() => setShowAllReplies(!showAllReplies)}
              className="ml-3 sm:ml-6 text-left text-xs font-mono text-[#8B5CF6] hover:underline flex items-center gap-1 py-1"
            >
              {showAllReplies ? (
                <>
                  <span>Show fewer replies</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>View all {replies.length} replies</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}

          {/* Reply Input Form */}
          <form
            onSubmit={handleReplySubmit}
            className="mt-2 ml-3 sm:ml-6 flex items-center gap-2"
          >
            <input
              type="text"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              placeholder="Write a reply..."
              aria-label="Write a reply"
              className="flex-1 bg-[#141418] border border-[#2A2A35] focus:border-[#8B5CF6] rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-[#71717A] focus:outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!replyInput.trim()}
              className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 text-white text-xs font-mono font-bold transition-colors shrink-0 flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>REPLY</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
