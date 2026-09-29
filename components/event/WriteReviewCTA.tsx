"use client";

import { MessageSquarePlus, ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";

interface WriteReviewCTAProps {
  isAuthenticated: boolean;
  isVerifiedAttendee: boolean;
  onOpenModal: () => void;
  onSignIn: () => void;
  onToggleVerification: () => void;
}

export default function WriteReviewCTA({
  isAuthenticated,
  isVerifiedAttendee,
  onOpenModal,
  onSignIn,
  onToggleVerification,
}: WriteReviewCTAProps) {
  return (
    <div className="w-full rounded-[20px] bg-gradient-to-r from-[#1A1A21] via-[#141418] to-[#1A1A21] border border-[#2A2A35] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative ambient gradient */}
      <div
        className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, #EC4899 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider font-semibold">
            ATTENDEE REPUTATION LAYER
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight mb-1.5">
          WERE YOU THERE?
        </h4>
        <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans leading-relaxed">
          Share your experience and help the next crowd know what to expect. Review music, sound, crowd energy, and venue logistics.
        </p>

        {/* Attendance Verification notice */}
        <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-[#A1A1AA]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Only verified attendees can submit public reviews</span>

          {/* Dev/demo toggle */}
          <button
            type="button"
            onClick={onToggleVerification}
            className="ml-2 text-[10px] underline text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
          >
            ({isVerifiedAttendee ? "Simulate: Not Verified" : "Simulate: Verified Ticket"})
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 w-full md:w-auto shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {!isAuthenticated ? (
          <button
            type="button"
            onClick={onSignIn}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <Lock className="w-4 h-4" />
            <span>SIGN IN TO REVIEW</span>
          </button>
        ) : !isVerifiedAttendee ? (
          <div className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-[#141418] border border-[#2A2A35] text-xs font-mono text-[#A1A1AA] flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-[#EF4444]" />
            <span>ATTEND THIS EVENT TO REVIEW</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] active:scale-[0.99]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            <MessageSquarePlus className="w-4 h-4" />
            <span>WRITE A REVIEW →</span>
          </button>
        )}
      </div>
    </div>
  );
}
