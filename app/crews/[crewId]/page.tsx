"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  MessageSquare,
  Lock,
  Send,
  UserPlus,
  Share2,
} from "lucide-react";
import { getCrewById, mockEventCrews } from "@/lib/crews-data";
import { defaultEvent } from "@/lib/events-data";
import InviteCrewModal from "@/components/event/InviteCrewModal";

export default function CrewDetailPage() {
  const params = useParams();
  const crewId = (params?.crewId as string) || "c1";

  const crew = useMemo(() => {
    return (
      getCrewById(crewId) ||
      mockEventCrews[0]
    );
  }, [crewId]);

  const [isJoined, setIsJoined] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      id: "m1",
      sender: "Aarav Sharma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      text: "Hey everyone! Plan is to meet at 8:45 PM near the rooftop pub on 100ft road.",
      time: "2 hours ago",
    },
    {
      id: "m2",
      sender: "Rhea Nair",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      text: "Sounds great! Cab sharing from Indiranagar or metro?",
      time: "1 hour ago",
    },
    {
      id: "m3",
      sender: "Dev Patel",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      text: "Let's share an Uber XL. Headliner is scheduled at 10:30 PM sharp.",
      time: "45 mins ago",
    },
  ]);
  const [newMsg, setNewMsg] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
        text: newMsg.trim(),
        time: "Just now",
      },
    ]);
    setNewMsg("");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentCount = isJoined ? crew.memberCount + 1 : crew.memberCount;
  const currentOpenSpots = isJoined ? Math.max(0, crew.openSpots - 1) : crew.openSpots;

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
        {/* Ambient Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href={`/events/${crew.eventId}/crews`}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO EVENT CREWS</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1A1A21] border border-[#2A2A35] text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? "COPIED LINK ✓" : "SHARE CREW"}</span>
            </button>
          </div>

          {/* Hero Header Card */}
          <div className="rounded-[24px] bg-[#141418] border border-[#2A2A35] p-6 sm:p-8 mb-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-[#8B5CF6] font-semibold bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-full">
                    {crew.area.toUpperCase()} CREW
                  </span>
                  <span className="font-mono text-xs text-[#EC4899] bg-[#EC4899]/15 border border-[#EC4899]/30 px-2.5 py-0.5 rounded-full">
                    {crew.vibeTag}
                  </span>
                  {crew.status === "private" && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[#EAB308] bg-[#EAB308]/15 border border-[#EAB308]/30 px-2.5 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      <span>PRIVATE</span>
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold font-sans text-white tracking-tight mb-2">
                  {crew.name}
                </h1>

                <p className="text-sm sm:text-base text-[#A1A1AA] font-sans leading-relaxed mb-4">
                  {crew.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A1A1AA]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    For: <strong className="text-white">{crew.eventName}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#EC4899]" />
                    Meetup: <strong className="text-white">{crew.area}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#22C55E]" />
                    Host: <strong className="text-white">{crew.creatorName}</strong>
                  </span>
                </div>
              </div>

              {/* Status and Action Box */}
              <div className="w-full md:w-auto p-5 rounded-2xl bg-[#1A1A21] border border-[#2A2A35] shrink-0 text-center flex flex-col items-center gap-3">
                <div>
                  <div className="text-2xl font-bold font-sans text-white">
                    {currentCount} / {crew.maxMembers}
                  </div>
                  <div className="text-[11px] font-mono text-[#8B5CF6]">
                    {currentOpenSpots > 0 ? `${currentOpenSpots} SPOTS REMAINING` : "CREW FULL"}
                  </div>
                </div>

                {isJoined ? (
                  <button
                    type="button"
                    onClick={() => setIsJoined(false)}
                    className="w-full px-6 py-2.5 rounded-xl bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E] font-mono text-xs font-bold transition-all hover:bg-[#EF4444]/15 hover:border-[#EF4444] hover:text-[#EF4444]"
                  >
                    YOU&apos;RE IN THIS CREW (LEAVE)
                  </button>
                ) : crew.status === "private" ? (
                  <button
                    type="button"
                    onClick={() => setHasRequested(!hasRequested)}
                    className={`w-full px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                      hasRequested
                        ? "bg-[#EC4899]/15 border border-[#EC4899] text-[#EC4899]"
                        : "bg-[#EC4899] hover:bg-[#DB2777] text-white"
                    }`}
                  >
                    {hasRequested ? "REQUEST SENT ✓" : "REQUEST TO JOIN"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsJoined(true)}
                    className="w-full px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                  >
                    JOIN CREW
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowInviteModal(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#141418] hover:bg-[#2A2A35] text-xs font-mono text-white border border-[#2A2A35] transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>INVITE ATTENDEES</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Members Roster (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold font-sans text-white">
                      CREW MEMBERS ({crew.members?.length || crew.memberCount})
                    </h3>
                    <p className="text-xs text-[#A1A1AA] font-sans">
                      Verified attendees heading to {crew.eventName}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-[#8B5CF6]">
                    {crew.openSpots} SPOTS OPEN
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(crew.members || []).map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] flex items-center justify-between gap-3 hover:border-[#8B5CF6]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#2A2A35] shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/people/${m.id}`}
                            className="font-sans font-bold text-sm text-white hover:text-[#8B5CF6] transition-colors block truncate"
                          >
                            {m.name}
                          </Link>
                          <span className="font-mono text-[10px] text-[#A1A1AA]">
                            {m.name === crew.creatorName ? "CREW HOST" : "ATTENDING"}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/people/${m.id}`}
                        className="text-[11px] font-mono text-[#8B5CF6] hover:underline shrink-0"
                      >
                        PROFILE →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meetup Plan & Logistics */}
              <div className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35]">
                <h3 className="text-lg font-bold font-sans text-white mb-2">
                  MEETUP COORDINATION
                </h3>
                <p className="text-xs text-[#A1A1AA] font-sans mb-4">
                  Where and when this crew is gathering before doors open.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                    <span className="font-mono text-[10px] text-[#8B5CF6] uppercase block mb-1">
                      MEETING POINT
                    </span>
                    <p className="font-sans font-bold text-sm text-white">
                      {crew.area} Meetup Spot
                    </p>
                    <p className="text-xs text-[#A1A1AA] mt-1 font-sans">
                      100ft Road / Central landmark before heading to {defaultEvent.venue}.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                    <span className="font-mono text-[10px] text-[#EC4899] uppercase block mb-1">
                      TARGET ARRIVAL
                    </span>
                    <p className="font-sans font-bold text-sm text-white">
                      8:45 PM – 9:15 PM
                    </p>
                    <p className="text-xs text-[#A1A1AA] mt-1 font-sans">
                      Beat the club queue and walk in as a coordinated group.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Crew Chat Channel Preview (Col 5) */}
            <div className="lg:col-span-5 p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2A35] mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
                  <h3 className="text-sm font-bold font-sans text-white">
                    CREW CHAT
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/15 px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>

              {/* Chat Messages scroll area */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-[#2A2A35]">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="p-3 rounded-xl bg-[#1A1A21] border border-[#2A2A35]/80">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={msg.avatar}
                          alt={msg.sender}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-sans font-bold text-xs text-white">
                          {msg.sender}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#71717A]">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#D4D4D8] font-sans pl-7 leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chat Composer */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#2A2A35] flex items-center gap-2">
                <input
                  type="text"
                  placeholder={isJoined ? "Message the crew..." : "Join crew to send messages..."}
                  value={newMsg}
                  disabled={!isJoined}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="flex-1 bg-[#1A1A21] border border-[#2A2A35] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6] disabled:opacity-60 disabled:cursor-not-allowed font-sans"
                />
                <button
                  type="submit"
                  disabled={!isJoined || !newMsg.trim()}
                  className="p-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#2A2A35] text-white disabled:text-[#71717A] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      <InviteCrewModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        crewName={crew.name}
        availableCrews={[crew]}
      />

      <Footer />
    </main>
  );
}
