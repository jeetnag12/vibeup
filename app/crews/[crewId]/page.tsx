"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Share2,
  Flag,
  MapPin,
  Calendar,
  Clock,
  Users,
  Sparkles,
  Send,
  Check,
  ExternalLink,
  ShieldAlert,
  X,
  ArrowRight,
  ChevronRight,
  Flame,
  Radio,
} from "lucide-react";
import { getDetailedCrew, DetailedCrewDiscussion } from "@/lib/crews-data";

export default function CrewDetailPage() {
  const params = useParams();
  const crewId = (params?.crewId as string) || "friday-techno-crew";

  const initialCrew = useMemo(() => {
    return getDetailedCrew(crewId);
  }, [crewId]);

  // Local join / leave state
  const [isJoined, setIsJoined] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Chat local state
  const [messages, setMessages] = useState<DetailedCrewDiscussion[]>(
    initialCrew.discussion || []
  );
  const [newMsg, setNewMsg] = useState("");

  // Report modal state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("INAPPROPRIATE CONTENT");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Calculated capacity metrics
  const currentMembersCount = isJoined
    ? initialCrew.memberCount + 1
    : initialCrew.memberCount;
  const isNowFull = currentMembersCount >= initialCrew.maxMembers;
  const spotsLeft = Math.max(0, initialCrew.maxMembers - currentMembersCount);
  const capacityPercent = Math.min(
    100,
    Math.round((currentMembersCount / initialCrew.maxMembers) * 100)
  );

  // Share action
  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator
          .share({
            title: `${initialCrew.name} · VibeUp`,
            text: `Join our crew for ${initialCrew.event.name} on VibeUp!`,
            url: window.location.href,
          })
          .catch(() => {});
      } else {
        navigator.clipboard?.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    }
  };

  // Chat send action
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    const userMsg: DetailedCrewDiscussion = {
      id: `msg-${Date.now()}`,
      sender: "YOU",
      username: "@you",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240&auto=format&fit=crop",
      text: newMsg.trim(),
      time: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setNewMsg("");
  };

  // Report submit action
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setIsReportOpen(false);
      setReportSubmitted(false);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
        {/* Subtle Ambient Purple / Pink Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 50%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          {/* ================================================== */}
          {/* 1. BREADCRUMB */}
          {/* ================================================== */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-between gap-4 mb-6 text-xs font-mono"
          >
            <div className="flex items-center gap-2 text-[#A1A1AA] overflow-x-auto whitespace-nowrap scrollbar-none py-1">
              <Link
                href="/discover"
                className="hover:text-white transition-colors"
              >
                DISCOVER
              </Link>
              <span className="text-[#2A2A35]">/</span>
              <Link href="/crews" className="hover:text-white transition-colors">
                CREWS
              </Link>
              <span className="text-[#2A2A35]">/</span>
              <span className="text-white font-bold tracking-wide truncate max-w-[200px] sm:max-w-none">
                {initialCrew.name}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1A1A21] border border-[#2A2A35] text-xs font-mono text-[#A1A1AA] hover:text-white transition-all shadow-sm"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="text-[#22C55E]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>SHARE CREW</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1A1A21] border border-[#2A2A35] text-[11px] font-mono text-[#71717A] hover:text-[#EF4444] transition-colors"
                title="Report Crew"
              >
                <Flag className="w-3 h-3" />
                <span className="hidden sm:inline">REPORT</span>
              </button>
            </div>
          </nav>

          {/* ================================================== */}
          {/* 2. CREW HERO */}
          {/* ================================================== */}
          <section className="rounded-[24px] bg-[#141418] border border-[#2A2A35] p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xl">
            {/* Background Cover Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={initialCrew.coverImage}
                alt={initialCrew.name}
                className="w-full h-full object-cover filter blur-sm scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141418] via-[#141418]/90 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-3xl">
                {/* Tags & Area */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-[#8B5CF6] font-semibold bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                    {initialCrew.area} CREW
                  </span>
                  {initialCrew.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-[#A1A1AA] bg-[#1A1A21] border border-[#2A2A35] px-2.5 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold font-sans text-white tracking-tight mb-3">
                  {initialCrew.name}
                </h1>

                <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed mb-4 max-w-2xl">
                  {initialCrew.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A1A1AA]">
                  <span className="inline-flex items-center gap-1.5 bg-[#1A1A21] px-3 py-1 rounded-lg border border-[#2A2A35]">
                    <MapPin className="w-3.5 h-3.5 text-[#EC4899]" />
                    <span>MEETUP: <strong>{initialCrew.area}</strong></span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#1A1A21] px-3 py-1 rounded-lg border border-[#2A2A35]">
                    <Flame className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>ENERGY: <strong>{initialCrew.energy}</strong></span>
                  </span>
                </div>
              </div>

              {/* Cover Preview Thumbnail */}
              <div className="hidden md:block w-36 h-36 rounded-2xl overflow-hidden border-2 border-[#2A2A35] shrink-0 shadow-lg relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={initialCrew.coverImage}
                  alt={initialCrew.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </section>

          {/* ================================================== */}
          {/* MAIN 2-COLUMN LAYOUT */}
          {/* ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* ------------------------------------------------ */}
            {/* LEFT COLUMN: The Crew, Crew Vibe, Chat (Cols 7) */}
            {/* ------------------------------------------------ */}
            <div className="lg:col-span-7 space-y-8">
              {/* ================================================== */}
              {/* 6 & 7. CREW MEMBERS ("THE CREW") */}
              {/* ================================================== */}
              <section className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#2A2A35]">
                  <div>
                    <h2 className="text-xl font-bold font-sans text-white tracking-wide">
                      THE CREW
                    </h2>
                    <p className="text-xs text-[#A1A1AA] font-sans mt-0.5">
                      Verified members committed to attending together
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-white">
                      {currentMembersCount} MEMBERS
                    </span>
                    <span className="block text-xs font-mono text-[#8B5CF6]">
                      {isNowFull ? "FULL" : `${spotsLeft} SPOTS LEFT`}
                    </span>
                  </div>
                </div>

                {/* Member Roster Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {initialCrew.members.map((member) => (
                    <div
                      key={member.id}
                      className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6]/40 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-11 h-11 rounded-full object-cover border border-[#2A2A35] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <Link
                              href={`/people/${member.id}`}
                              className="font-sans font-bold text-sm text-white group-hover:text-[#8B5CF6] transition-colors truncate"
                            >
                              {member.name}
                            </Link>
                            {member.role === "CREW ORGANIZER" && (
                              <span className="text-[9px] font-mono font-bold bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 px-1.5 py-0.5 rounded uppercase">
                                ORGANIZER
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs text-[#71717A] block">
                            {member.username}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#22C55E] mt-0.5">
                            <Sparkles className="w-3 h-3" />
                            <span>{member.vibeMatch}% VIBE MATCH</span>
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/people/${member.id}`}
                        className="px-2.5 py-1 rounded-lg bg-[#141418] border border-[#2A2A35] text-[10px] font-mono text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6] transition-colors shrink-0"
                      >
                        VIEW
                      </Link>
                    </div>
                  ))}

                  {/* Joined User Slot if local toggle active */}
                  {isJoined && (
                    <div className="p-3.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240&auto=format&fit=crop"
                          alt="You"
                          className="w-11 h-11 rounded-full object-cover border border-[#22C55E]/40 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-sans font-bold text-sm text-white block">
                            YOU
                          </span>
                          <span className="font-mono text-xs text-[#22C55E]">
                            @you · JUST JOINED
                          </span>
                          <span className="block text-[11px] font-mono text-[#22C55E] mt-0.5">
                            100% READY
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-[#22C55E] font-bold bg-[#22C55E]/20 px-2 py-1 rounded">
                        JOINED
                      </span>
                    </div>
                  )}
                </div>
              </section>

              {/* ================================================== */}
              {/* 8. CREW VIBE */}
              {/* ================================================== */}
              <section className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
                  <h2 className="text-xl font-bold font-sans text-white tracking-wide">
                    CREW VIBE
                  </h2>
                </div>

                {/* Vibe Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {initialCrew.vibeTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] text-xs font-mono text-[#D4D4D8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Descriptive Attributes Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] text-center">
                    <span className="text-[10px] font-mono text-[#71717A] uppercase block mb-1">
                      MUSIC
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-sans text-white">
                      {initialCrew.music}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] text-center">
                    <span className="text-[10px] font-mono text-[#8B5CF6] uppercase block mb-1">
                      ENERGY
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-sans text-white">
                      {initialCrew.energy}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] text-center">
                    <span className="text-[10px] font-mono text-[#EC4899] uppercase block mb-1">
                      STYLE
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-sans text-white">
                      {initialCrew.style}
                    </span>
                  </div>
                </div>
              </section>

              {/* ================================================== */}
              {/* 10. CREW DISCUSSION / CHAT */}
              {/* ================================================== */}
              <section className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] shadow-sm flex flex-col h-[520px]">
                <div className="flex items-center justify-between pb-4 border-b border-[#2A2A35] mb-4">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="text-lg font-bold font-sans text-white tracking-wide">
                      CREW CHAT
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2.5 py-0.5 rounded-full font-bold">
                    LIVE COORDINATION
                  </span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-[#2A2A35]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={msg.avatar}
                            alt={msg.sender}
                            className="w-6 h-6 rounded-full object-cover border border-[#2A2A35]"
                          />
                          <span className="font-sans font-bold text-xs text-white">
                            {msg.sender}
                          </span>
                          <span className="font-mono text-[10px] text-[#71717A]">
                            {msg.username}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#71717A]">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#E4E4E7] font-sans pl-8 leading-relaxed">
                        &ldquo;{msg.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat Composer */}
                <form
                  onSubmit={handleSendMessage}
                  className="pt-4 border-t border-[#2A2A35] mt-4 flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder={
                      isJoined
                        ? "Coordinate plans with the crew..."
                        : "Join this crew to send messages..."
                    }
                    value={newMsg}
                    disabled={!isJoined}
                    onChange={(e) => setNewMsg(e.target.value)}
                    className="flex-1 bg-[#1A1A21] border border-[#2A2A35] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6] disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!isJoined || !newMsg.trim()}
                    className="p-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#2A2A35] text-white disabled:text-[#71717A] transition-colors"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </section>
            </div>

            {/* ------------------------------------------------ */}
            {/* RIGHT COLUMN: Event, Capacity, Join, Plan (Cols 5) */}
            {/* ------------------------------------------------ */}
            <div className="lg:col-span-5 space-y-6">
              {/* ================================================== */}
              {/* 3. EVENT CONNECTION */}
              {/* ================================================== */}
              <section className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#EC4899] font-bold uppercase bg-[#EC4899]/15 border border-[#EC4899]/30 px-2 py-0.5 rounded">
                    GOING TO
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#2A2A35] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={initialCrew.event.image}
                      alt={initialCrew.event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/events/${initialCrew.event.id}`}
                      className="font-sans font-bold text-lg text-white hover:text-[#8B5CF6] transition-colors line-clamp-1 block mb-1"
                    >
                      {initialCrew.event.name}
                    </Link>

                    <div className="text-xs font-mono text-[#A1A1AA] space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                        <span className="truncate">{initialCrew.event.venue} · {initialCrew.event.area}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
                        <span>{initialCrew.event.date} · {initialCrew.event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/events/${initialCrew.event.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] border border-[#2A2A35] text-xs font-mono text-white transition-colors"
                >
                  <span>VIEW EVENT</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </Link>
              </section>

              {/* ================================================== */}
              {/* 4 & 5. CREW STATUS & JOIN CREW ACTION */}
              {/* ================================================== */}
              <section className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#71717A] uppercase tracking-wider">
                    CREW STATUS
                  </span>
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isNowFull
                        ? "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30"
                        : "bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30"
                    }`}
                  >
                    {isNowFull ? "FULL" : "OPEN"}
                  </span>
                </div>

                {/* Capacity Headings */}
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-2xl sm:text-3xl font-bold font-sans text-white">
                    {currentMembersCount} / {initialCrew.maxMembers}{" "}
                    <span className="text-sm font-mono text-[#A1A1AA] font-normal">
                      MEMBERS
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#8B5CF6] font-semibold">
                    {isNowFull ? "NO SPOTS LEFT" : `${spotsLeft} SPOTS LEFT`}
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-[#1A1A21] border border-[#2A2A35] overflow-hidden mb-6">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isNowFull
                        ? "bg-gradient-to-r from-[#EF4444] to-[#EC4899]"
                        : "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                    }`}
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>

                {/* Interactive Join / Leave Actions */}
                <div className="space-y-3">
                  {isJoined ? (
                    <>
                      <div className="p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-center">
                        <span className="text-xs font-mono text-[#22C55E] font-bold inline-flex items-center gap-1.5">
                          <Check className="w-4 h-4" />
                          <span>JOINED · YOU&apos;RE IN THIS CREW</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsJoined(false)}
                        className="w-full py-3 rounded-xl bg-[#1A1A21] hover:bg-[#EF4444]/15 hover:border-[#EF4444] hover:text-[#EF4444] text-[#A1A1AA] border border-[#2A2A35] font-mono text-xs font-bold transition-all"
                      >
                        LEAVE CREW
                      </button>
                    </>
                  ) : isNowFull ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] text-[#71717A] font-mono text-xs font-bold cursor-not-allowed uppercase"
                    >
                      CREW FULL
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsJoined(true)}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-[0.99]"
                    >
                      JOIN CREW
                    </button>
                  )}
                </div>
              </section>

              {/* ================================================== */}
              {/* 9. PLAN / MEETING DETAILS */}
              {/* ================================================== */}
              <section className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="text-lg font-bold font-sans text-white tracking-wide">
                      THE PLAN
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">
                    PUBLIC COORDINATION
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                    <span className="text-[10px] font-mono text-[#8B5CF6] uppercase block mb-1">
                      MEETUP TIME
                    </span>
                    <span className="text-sm font-bold font-mono text-white">
                      {initialCrew.meetup.time}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                    <span className="text-[10px] font-mono text-[#EC4899] uppercase block mb-1">
                      ARRIVAL
                    </span>
                    <span className="text-sm font-bold font-mono text-white">
                      {initialCrew.meetup.arrival}
                    </span>
                  </div>

                  <div className="col-span-2 p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                    <span className="text-[10px] font-mono text-[#22C55E] uppercase block mb-1">
                      MEETING POINT
                    </span>
                    <span className="text-sm font-bold font-sans text-white block mb-0.5">
                      {initialCrew.meetup.location}
                    </span>
                    <span className="text-xs font-mono text-[#A1A1AA]">
                      Destination: {initialCrew.meetup.venue}
                    </span>
                    {initialCrew.meetup.notes && (
                      <p className="text-xs text-[#71717A] font-sans mt-2 pt-2 border-t border-[#2A2A35]/60">
                        {initialCrew.meetup.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* View On Map Action (safe external query) */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    initialCrew.meetup.mapQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] border border-[#2A2A35] text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#EC4899]" />
                  <span>VIEW ON MAP</span>
                  <ExternalLink className="w-3 h-3 text-[#71717A]" />
                </a>
              </section>

              {/* ================================================== */}
              {/* 10. CREATOR PROFILE */}
              {/* ================================================== */}
              <section className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] shadow-sm">
                <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider block mb-3">
                  CREATED BY
                </span>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={initialCrew.creator.avatar}
                      alt={initialCrew.creator.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#2A2A35]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans font-bold text-sm text-white">
                          {initialCrew.creator.name}
                        </span>
                        <span className="text-[9px] font-mono font-bold bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 px-1.5 py-0.5 rounded">
                          CREW ORGANIZER
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#A1A1AA] block">
                        {initialCrew.creator.username}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/people/${initialCrew.creator.id}`}
                    className="px-3 py-1.5 rounded-lg bg-[#1A1A21] hover:bg-[#2A2A35] border border-[#2A2A35] text-xs font-mono text-white transition-colors"
                  >
                    VIEW PROFILE
                  </Link>
                </div>
              </section>
            </div>
          </div>

          {/* ================================================== */}
          {/* 11. CREW ACTIVITY */}
          {/* ================================================== */}
          <section className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] mb-12 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-[#8B5CF6]" />
              <h2 className="text-lg font-bold font-sans text-white tracking-wide">
                CREW ACTIVITY
              </h2>
            </div>

            <div className="divide-y divide-[#2A2A35]/60">
              {initialCrew.activity.map((act) => (
                <div
                  key={act.id}
                  className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0" />
                    <span className="font-mono text-xs font-medium text-[#E4E4E7]">
                      {act.text}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#71717A] shrink-0">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================== */}
          {/* 13. COMMUNITY CONNECTION (Optional Ecosystem Link) */}
          {/* ================================================== */}
          {initialCrew.community && (
            <section className="p-6 rounded-[20px] bg-gradient-to-r from-[#141418] to-[#1A1A21] border border-[#2A2A35] mb-12 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#8B5CF6] font-bold uppercase tracking-widest block mb-1">
                  FROM THE COMMUNITY
                </span>
                <h3 className="text-lg font-bold font-sans text-white">
                  {initialCrew.community.name}
                </h3>
                <p className="text-xs text-[#A1A1AA] font-sans mt-0.5">
                  This crew emerged from the shared nightlife interest group.
                </p>
              </div>

              <Link
                href={`/communities/${initialCrew.community.id}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141418] hover:bg-[#2A2A35] border border-[#2A2A35] text-xs font-mono text-white transition-colors shrink-0"
              >
                <span>EXPLORE COMMUNITY</span>
                <ChevronRight className="w-4 h-4 text-[#8B5CF6]" />
              </Link>
            </section>
          )}

          {/* ================================================== */}
          {/* 12. RELATED EVENT CREWS */}
          {/* ================================================== */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold font-sans text-white tracking-wide">
                  OTHER CREWS FOR THIS EVENT
                </h2>
                <p className="text-xs text-[#A1A1AA] font-sans mt-0.5">
                  Explore other groups heading to {initialCrew.event.name}
                </p>
              </div>

              <Link
                href={`/events/${initialCrew.event.id}/crews`}
                className="text-xs font-mono text-[#8B5CF6] hover:underline hidden sm:inline-flex items-center gap-1"
              >
                <span>ALL EVENT CREWS</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialCrew.relatedCrews.map((rel) => {
                const isRelFull = rel.memberCount >= rel.maxMembers;
                const relOpen = Math.max(0, rel.maxMembers - rel.memberCount);

                return (
                  <div
                    key={rel.id}
                    className="p-5 rounded-[20px] bg-[#141418] border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      {/* Cover snippet */}
                      <div className="h-32 rounded-xl overflow-hidden mb-4 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rel.coverImage}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-white">
                          {rel.area}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono text-[#8B5CF6] font-semibold">
                          {rel.vibe}
                        </span>
                        <span className="text-[11px] font-mono text-[#A1A1AA]">
                          {rel.memberCount} / {rel.maxMembers}
                        </span>
                      </div>

                      <h3 className="font-sans font-bold text-base text-white group-hover:text-[#8B5CF6] transition-colors mb-2">
                        {rel.name}
                      </h3>

                      <p className="text-xs font-mono text-[#71717A] mb-4">
                        {isRelFull ? "CREW FULL" : `${relOpen} SPOTS AVAILABLE`}
                      </p>
                    </div>

                    <Link
                      href={`/crews/${rel.id}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#8B5CF6] hover:text-white border border-[#2A2A35] hover:border-transparent text-xs font-mono text-white transition-colors"
                    >
                      <span>VIEW CREW</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* ================================================== */}
      {/* 20. REPORT CREW MODAL */}
      {/* ================================================== */}
      {isReportOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-md bg-[#141418] border border-[#2A2A35] rounded-[24px] p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsReportOpen(false)}
              className="absolute top-5 right-5 text-[#A1A1AA] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2 text-[#EF4444]">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-lg font-bold font-sans text-white">
                REPORT CREW
              </h3>
            </div>
            <p className="text-xs text-[#A1A1AA] font-sans mb-5 leading-relaxed">
              Help keep VibeUp safe and nightlife-focused. Select an issue to submit for moderation.
            </p>

            {reportSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <Check className="w-10 h-10 text-[#22C55E] mx-auto" />
                <h4 className="font-bold text-white font-sans text-sm">
                  REPORT SUBMITTED
                </h4>
                <p className="text-xs text-[#A1A1AA] font-mono">
                  Thank you. Our moderation team will review this crew shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#A1A1AA] block">
                    REASON FOR REPORT
                  </label>
                  <div className="space-y-1.5">
                    {[
                      "INAPPROPRIATE CONTENT",
                      "SPAM",
                      "HARASSMENT",
                      "MISLEADING INFORMATION",
                      "OTHER",
                    ].map((reason) => (
                      <label
                        key={reason}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-mono cursor-pointer transition-colors ${
                          reportReason === reason
                            ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-white"
                            : "bg-[#1A1A21] border-[#2A2A35] text-[#A1A1AA] hover:text-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reportReason"
                          value={reason}
                          checked={reportReason === reason}
                          onChange={(e) => setReportReason(e.target.value)}
                          className="accent-[#8B5CF6]"
                        />
                        <span>{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2A2A35]">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-xs font-mono font-bold text-white transition-colors"
                  >
                    SUBMIT REPORT
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
