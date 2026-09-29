"use client";

import { useEffect, useState } from "react";
import { X, Flag, CheckCircle2 } from "lucide-react";
import { EventReview } from "@/lib/reviews-data";

interface ReportReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: EventReview | null;
  onConfirmReport: (reviewId: string, reason: string) => void;
}

export default function ReportReviewModal({
  isOpen,
  onClose,
  review,
  onConfirmReport,
}: ReportReviewModalProps) {
  const [selectedReason, setSelectedReason] = useState("Spam");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isReported, setIsReported] = useState(false);

  const reasons = ["Spam", "Inappropriate", "Misleading", "Other"];

  useEffect(() => {
    if (!isOpen) {
      setIsReported(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !review) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReported(true);
    setTimeout(() => {
      onConfirmReport(review.id, selectedReason);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 sm:p-7 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close report modal"
          className="absolute top-5 right-5 p-2 rounded-[4px] text-[#666666] hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isReported ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-sans text-white">
              REPORT RECEIVED
            </h3>
            <p className="text-xs text-[#666666] max-w-xs mx-auto">
              Thank you for keeping VibeUp verified and respectful. Our community team will review this report.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#EF4444] mb-1">
              <Flag className="w-3.5 h-3.5" />
              <span>CONTENT MODERATION</span>
            </div>

            <h3 id="report-modal-title" className="text-xl font-bold font-sans text-white mb-1">
              REPORT REVIEW
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Report review by <strong className="text-white">{review.author.name}</strong>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#666666] uppercase mb-2">
                  REASON
                </label>
                <div className="space-y-2">
                  {reasons.map((r) => (
                    <label
                      key={r}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        selectedReason === r
                          ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-white"
                          : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white"
                      }`}
                    >
                      <span className="text-xs font-mono font-medium">{r}</span>
                      <input
                        type="radio"
                        name="reportReason"
                        value={r}
                        checked={selectedReason === r}
                        onChange={() => setSelectedReason(r)}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="report-details" className="block text-xs font-mono text-[#666666] uppercase mb-1.5">
                  ADDITIONAL DETAILS (OPTIONAL)
                </label>
                <textarea
                  id="report-details"
                  rows={2}
                  placeholder="Explain why this review violates guidelines..."
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-[#8B5CF6] font-sans resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white border border-[#1A1A1A] transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-[4px] bg-[#EF4444] hover:bg-[#DC2626] text-xs font-mono font-bold text-white transition-all shadow-[0_0_14px_rgba(239,68,68,0.3)]"
                >
                  SUBMIT REPORT
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
