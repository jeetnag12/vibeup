"use client";

import { useState } from "react";
import { Send, Image as ImageIcon, BarChart2, Sparkles, LogIn, Lock } from "lucide-react";
import { DiscussionTopic } from "@/lib/events-data";

interface DiscussionComposerProps {
  onPostSubmit: (text: string, topic: DiscussionTopic) => void;
  isAuthenticated: boolean;
  onToggleAuth: () => void;
  selectedTopicPrefill?: DiscussionTopic | null;
}

const topicSuggestions: { label: string; topic: DiscussionTopic; prefill: string }[] = [
  { label: "Dress Code", topic: "dress-code", prefill: "What's the dress code tonight? " },
  { label: "Who's Going?", topic: "crew", prefill: "Who is heading out to this event? " },
  { label: "Music", topic: "music", prefill: "What music genres are playing at peak hours? " },
  { label: "Timing", topic: "timing", prefill: "What time does the main headline set start? " },
  { label: "Venue", topic: "venue", prefill: "Does XYZ Club have valet parking / physical ID check? " },
  { label: "Transport", topic: "transport", prefill: "Anyone looking to split a cab / Uber from " },
  { label: "Solo", topic: "solo", prefill: "Heading solo! Any tips for first-timers here? " },
];

export default function DiscussionComposer({
  onPostSubmit,
  isAuthenticated,
  onToggleAuth,
  selectedTopicPrefill,
}: DiscussionComposerProps) {
  const [text, setText] = useState("");
  const [currentTopic, setCurrentTopic] = useState<DiscussionTopic>(
    selectedTopicPrefill || "general"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTopicClick = (item: (typeof topicSuggestions)[0]) => {
    setCurrentTopic(item.topic);
    if (!text.trim()) {
      setText(item.prefill);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onPostSubmit(text.trim(), currentTopic);
      setText("");
      setCurrentTopic("general");
      setIsSubmitting(false);
    }, 200);
  };

  // 1. Unauthenticated View
  if (!isAuthenticated) {
    return (
      <div className="w-full rounded-[12px] bg-[#111111] border border-[#1A1A1A] p-6 mb-8 text-center flex flex-col items-center justify-center relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="w-12 h-12 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex items-center justify-center mb-3 text-[#8B5CF6]">
          <Lock className="w-5 h-5" />
        </div>

        <h3 className="font-sans font-bold text-lg text-white mb-1.5">
          JOIN THE CONVERSATION
        </h3>
        <p className="text-xs sm:text-sm text-[#666666] font-sans max-w-md mb-5 leading-relaxed">
          Sign in to ask questions, coordinate rides, reply to threads, and connect with people going to this event.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onToggleAuth}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogIn className="w-4 h-4" />
            <span>SIGN IN →</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Authenticated Composer View
  return (
    <div className="w-full rounded-[12px] bg-[#111111] border border-[#1A1A1A] p-4 sm:p-5 mb-8 flex flex-col gap-4">
      {/* Top Header: Current User & Topic Indicator */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover border border-[#8B5CF6]/50 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">You</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#8B5CF6]/15 text-[#8B5CF6] font-semibold">
                Score 92
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#666666]">
              Topic: <span className="text-white uppercase">{currentTopic.replace("-", " ")}</span>
            </span>
          </div>
        </div>

        {/* Demo Auth Toggle for Convenience */}
        <button
          type="button"
          onClick={onToggleAuth}
          className="text-[11px] font-mono text-[#666666] hover:text-[#666666] transition-colors"
          title="Toggle auth state for testing"
        >
          Sign out
        </button>
      </div>

      {/* Composer Textarea */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask something about this event... (outfits, cab splitting, timing, etc.)"
          aria-label="Discussion post input"
          className="w-full bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] rounded-xl p-3 text-sm text-white placeholder:text-[#666666] focus:outline-none font-sans resize-none transition-colors"
        />

        {/* Quick Topic Suggestions */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#666666] mb-2">
            <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
            <span>QUICK TOPICS:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {topicSuggestions.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleTopicClick(item)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono shrink-0 transition-colors border ${
                  currentTopic === item.topic
                    ? "bg-[#8B5CF6]/20 border-[#8B5CF6] text-white font-semibold"
                    : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white hover:border-[#8B5CF6]/30"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Toolbar & Submit Button */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]/60">
          <div className="flex items-center gap-2">
            {/* Disabled Coming Soon Options */}
            <button
              type="button"
              disabled
              title="Image upload (Coming Soon)"
              className="p-2 rounded-[4px] text-[#52525B] cursor-not-allowed flex items-center gap-1 text-xs font-mono"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px]">Photo (soon)</span>
            </button>
            <button
              type="button"
              disabled
              title="Polls (Coming Soon)"
              className="p-2 rounded-[4px] text-[#52525B] cursor-not-allowed flex items-center gap-1 text-xs font-mono"
            >
              <BarChart2 className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px]">Poll (soon)</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!text.trim() || isSubmitting}
            className="px-5 py-2 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 disabled:hover:bg-[#8B5CF6] text-white text-xs font-mono font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.25)] flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "POSTING..." : "POST"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
