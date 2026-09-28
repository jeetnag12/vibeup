"use client";

import { useEffect, useState } from "react";
import { X, AlertTriangle, Check } from "lucide-react";
import { DiscussionPost } from "@/lib/events-data";

interface ReportPostModalProps {
  post: DiscussionPost | null;
  onClose: () => void;
}

const reportReasons = [
  "Spam or promotion",
  "Harassment or hate speech",
  "Inappropriate content",
  "Misinformation / fake tickets",
  "Other",
];

export default function ReportPostModal({ post, onClose }: ReportPostModalProps) {
  const [selectedReason, setSelectedReason] = useState(reportReasons[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
    >
      <div
        className="relative w-full max-w-md rounded-[20px] bg-[#141418] border border-[#2A2A35] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#2A2A35] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-rose-400 mb-2 font-mono text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>FLAG CONVERSATION</span>
        </div>

        <h3
          id="report-modal-title"
          className="text-xl font-bold font-sans text-white tracking-tight mb-1"
        >
          REPORT POST
        </h3>
        <p className="text-xs text-[#A1A1AA] font-sans mb-4">
          Why are you reporting this post by{" "}
          <span className="text-white font-semibold">{post.authorName}</span>?
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs font-mono flex items-center gap-2 my-6">
            <Check className="w-4 h-4 shrink-0" />
            <span>Thank you. Your report has been recorded for review.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            {reportReasons.map((reason) => (
              <label
                key={reason}
                className={`p-3 rounded-xl border text-xs font-sans flex items-center gap-3 cursor-pointer transition-colors ${
                  selectedReason === reason
                    ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-white"
                    : "bg-[#1A1A21] border-[#2A2A35] text-[#A1A1AA] hover:text-white"
                }`}
              >
                <input
                  type="radio"
                  name="reportReason"
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="accent-[#8B5CF6]"
                />
                <span>{reason}</span>
              </label>
            ))}

            <div className="flex items-center gap-2 justify-end pt-4 border-t border-[#2A2A35] mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#2A2A35] text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition-colors"
              >
                SUBMIT REPORT
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
