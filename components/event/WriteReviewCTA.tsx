"use client";

import { MessageSquarePlus, ShieldCheck, Lock, Sparkles, CheckCircle2 } from "@/components/icons";

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
    <div className="w-full rounded-[12px] bg-gradient-to-r from-[#15151C] via-[#15151C] to-[#15151C] border border-[#25252F] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative ambient gradient */}
      <div
        className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
        style={{
          background: "radial-gradient(circle, #FFE14D 0%, #FF4FA3 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#FFE14D]" />
          <span className="font-mono text-xs text-[#FFE14D] uppercase tracking-wider font-semibold">
            ATTENDEE REPUTATION LAYER
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight mb-1.5">
          WERE YOU THERE?
        </h4>
        <p className="text-xs sm:text-sm text-[#8E8C9C] font-sans leading-relaxed">
          Share your experience and help the next crowd know what to expect. Review music, sound, crowd energy, and venue logistics.
        </p>

        {/* Attendance Verification notice */}
        <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-[#8E8C9C]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Only verified attendees can submit public reviews</span>

          {/* Dev/demo toggle */}
          <button
            type="button"
            onClick={onToggleVerification}
            className="ml-2 text-[10px] underline text-[#FFE14D] hover:text-[#FFEA80] transition-colors"
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-[#FFE14D] hover:bg-[#F2CF2E] text-[#0B0B10] font-sans text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,225,77,0.3)]"
          >
            <Lock className="w-4 h-4" />
            <span>SIGN IN TO REVIEW</span>
          </button>
        ) : !isVerifiedAttendee ? (
          <div className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-[#15151C] border border-[#25252F] text-xs font-mono text-[#8E8C9C] flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-[#EF4444]" />
            <span>ATTEND THIS EVENT TO REVIEW</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-[#FFE14D] hover:bg-[#F2CF2E] text-[#0B0B10] font-sans text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,225,77,0.35)] hover:shadow-[0_0_28px_rgba(255,225,77,0.5)] active:scale-[0.99]"
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
