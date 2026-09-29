"use client";

import { useEffect, useRef, useState } from "react";
import { X, Users, Lock, Unlock, AlertCircle } from "lucide-react";
import { EventCrew, CrewMember } from "@/lib/crews-data";

interface CreateCrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventId: string;
  isAuthenticated: boolean;
  onAuthenticate?: () => void;
  onCrewCreated: (crew: EventCrew) => void;
}

export default function CreateCrewModal({
  isOpen,
  onClose,
  eventTitle,
  eventId,
  isAuthenticated,
  onAuthenticate,
  onCrewCreated,
}: CreateCrewModalProps) {
  const [crewName, setCrewName] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState(8);
  const [meetupArea, setMeetupArea] = useState("Koramangala");
  const [crewType, setCrewType] = useState<"open" | "private">("open");
  const [errorMsg, setErrorMsg] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape & trap initial focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    if (nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crewName.trim()) {
      setErrorMsg("Please enter a crew name.");
      return;
    }

    const newCrewId = `crew-${Date.now()}`;
    const currentUser: CrewMember = {
      id: "current-user",
      name: "You",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240&auto=format&fit=crop",
    };

    const newCrew: EventCrew = {
      id: newCrewId,
      eventId: eventId,
      name: crewName.trim().toUpperCase(),
      description: description.trim() || `Crew assembling for ${eventTitle}.`,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      memberCount: 1,
      maxMembers: maxMembers,
      openSpots: Math.max(0, maxMembers - 1),
      area: meetupArea,
      status: crewType,
      interests: ["Nightlife", meetupArea, crewType === "open" ? "Open Crew" : "Private Crew"],
      matchPercentage: 96,
      matchReason: `New crew created by you · ${meetupArea}`,
      creatorName: "You",
      vibeTag: `${meetupArea} · ${crewType === "open" ? "Open" : "Private"}`,
      eventName: eventTitle,
      membersAvatars: [currentUser.avatar],
      membersCount: 1,
      maxSpots: maxMembers,
      members: [currentUser],
    };

    onCrewCreated(newCrew);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-crew-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 sm:p-8 shadow-2xl relative my-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close create crew modal"
          className="absolute top-5 right-5 p-2 rounded-[4px] text-[#666666] hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
              {eventTitle}
            </span>
          </div>
          <h3 id="create-crew-title" className="text-2xl font-bold font-sans text-white tracking-tight">
            CREATE A CREW
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1">
            Host a group for this event. Set your vibe, choose your meetup area, and gather your crowd.
          </p>
        </div>

        {/* Unauthenticated View */}
        {!isAuthenticated ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-sans text-white mb-1">
                Sign in to create your crew.
              </h4>
              <p className="text-xs text-[#666666] max-w-sm mx-auto">
                You must be logged in to host a crew, approve joining requests, and coordinate with attendees.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onAuthenticate}
                className="w-full sm:w-auto px-6 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
              >
                Sign In Now
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] text-[#666666] hover:text-white font-sans text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center gap-2 text-xs font-sans text-[#EF4444]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Crew Name */}
            <div>
              <label
                htmlFor="crew-name-input"
                className="block text-xs font-mono font-semibold text-[#666666] uppercase tracking-wider mb-1.5"
              >
                CREW NAME
              </label>
              <input
                id="crew-name-input"
                ref={nameInputRef}
                type="text"
                required
                maxLength={45}
                placeholder="Saturday Night Crew"
                value={crewName}
                onChange={(e) => {
                  setCrewName(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] font-sans transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="crew-desc-input"
                className="block text-xs font-mono font-semibold text-[#666666] uppercase tracking-wider mb-1.5"
              >
                DESCRIPTION
              </label>
              <textarea
                id="crew-desc-input"
                rows={3}
                placeholder="What kind of crowd are you looking for? e.g. Pre-drinks, front row techno heads, shared rides..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] font-sans resize-none transition-all"
              />
            </div>

            {/* Max Members & Meetup Area Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Max Members */}
              <div>
                <label
                  htmlFor="crew-max-members"
                  className="block text-xs font-mono font-semibold text-[#666666] uppercase tracking-wider mb-1.5"
                >
                  MAX MEMBERS
                </label>
                <select
                  id="crew-max-members"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(Number(e.target.value))}
                  className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
                >
                  {[4, 6, 8, 10, 15, 20].map((num) => (
                    <option key={num} value={num} className="bg-[#111111] text-white">
                      {num} Members
                    </option>
                  ))}
                </select>
              </div>

              {/* Meetup Area */}
              <div>
                <label
                  htmlFor="crew-meetup-area"
                  className="block text-xs font-mono font-semibold text-[#666666] uppercase tracking-wider mb-1.5"
                >
                  MEETUP AREA
                </label>
                <select
                  id="crew-meetup-area"
                  value={meetupArea}
                  onChange={(e) => setMeetupArea(e.target.value)}
                  className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
                >
                  {["Koramangala", "Indiranagar", "HSR", "Whitefield", "MG Road", "Other"].map((area) => (
                    <option key={area} value={area} className="bg-[#111111] text-white">
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Crew Type: OPEN vs PRIVATE */}
            <div>
              <span className="block text-xs font-mono font-semibold text-[#666666] uppercase tracking-wider mb-2">
                CREW TYPE
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCrewType("open")}
                  className={`p-3.5 rounded-xl border flex flex-col items-start gap-1 transition-all text-left ${
                    crewType === "open"
                      ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-white shadow-[0_0_14px_rgba(139,92,246,0.25)]"
                      : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white hover:border-[#8B5CF6]/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white">
                    <Unlock className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>OPEN</span>
                  </div>
                  <span className="text-[11px] font-sans text-[#666666]">
                    Anyone can join directly until full.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCrewType("private")}
                  className={`p-3.5 rounded-xl border flex flex-col items-start gap-1 transition-all text-left ${
                    crewType === "private"
                      ? "bg-[#EC4899]/15 border-[#EC4899] text-white shadow-[0_0_14px_rgba(236,72,153,0.25)]"
                      : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white hover:border-[#EC4899]/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white">
                    <Lock className="w-3.5 h-3.5 text-[#EC4899]" />
                    <span>PRIVATE</span>
                  </div>
                  <span className="text-[11px] font-sans text-[#666666]">
                    Attendees must request to join.
                  </span>
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] text-[#666666] hover:text-white font-sans text-sm font-medium border border-[#1A1A1A] transition-colors"
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)]"
              >
                CREATE CREW
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
