"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConversationItem from "@/components/messages/ConversationItem";
import ActiveConversation from "@/components/messages/ActiveConversation";
import {
  initialMockConversations,
  Conversation,
  ConversationFilter,
  Message,
} from "@/lib/messages-data";
import {
  Search,
  X,
  MessageSquare,
  Users,
  Compass,
  Radio,
} from "lucide-react";

export default function MessagesPage() {
  // Master conversations state in local React state
  const [conversations, setConversations] = useState<Conversation[]>(
    initialMockConversations
  );
  // Selected conversation ID
  const [selectedId, setSelectedId] = useState<string>("chat-001");
  // Search query
  const [searchQuery, setSearchQuery] = useState("");
  // Category filter
  const [activeFilter, setActiveFilter] = useState<ConversationFilter>("ALL");
  // Mobile active chat view toggle (true = viewing conversation, false = viewing list)
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  // Total unread count across all conversations
  const totalUnreadCount = useMemo(() => {
    return conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);
  }, [conversations]);

  // Currently active conversation object
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) || null;
  }, [conversations, selectedId]);

  // Filter and search logic
  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      // 1. Type Filter
      if (activeFilter === "PEOPLE" && conv.type !== "person") return false;
      if (activeFilter === "CREWS" && conv.type !== "crew") return false;
      if (activeFilter === "EVENTS" && conv.type !== "event") return false;
      if (activeFilter === "COMMUNITIES" && conv.type !== "community")
        return false;

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = conv.name.toLowerCase().includes(query);
        const matchesSubtitle = (conv.subtitle || "")
          .toLowerCase()
          .includes(query);
        const matchesHandle = (conv.handle || "").toLowerCase().includes(query);
        const matchesLastMsg = conv.lastMessage.toLowerCase().includes(query);
        const matchesType = conv.type.toLowerCase().includes(query);
        return (
          matchesName ||
          matchesSubtitle ||
          matchesHandle ||
          matchesLastMsg ||
          matchesType
        );
      }

      return true;
    });
  }, [conversations, activeFilter, searchQuery]);

  // Handle conversation selection: mark unread as 0 and open view
  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setMobileChatOpen(true);

    // Reset local unreadCount to 0 immediately
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Helper to format local current time for sent messages (e.g., "11:05 PM")
  const formatCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12
    return `${hours}:${minutes} ${ampm}`;
  };

  // Handle message sending (appends to local state immediately)
  const handleSendMessage = (text: string) => {
    if (!activeConversation) return;

    const timeStr = formatCurrentTime();
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text,
      timestamp: timeStr,
      seen: false,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            lastMessage: text,
            timestamp: timeStr,
            unreadCount: 0,
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
    );
  };

  const filterTabs: ConversationFilter[] = [
    "ALL",
    "PEOPLE",
    "CREWS",
    "EVENTS",
    "COMMUNITIES",
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Global VibeUp Navbar */}
      <Navbar />

      {/* Subtle Ambient Radial Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 2. Main Page Layout Container */}
      <div className="flex-1 w-full max-w-[1240px] mx-auto px-2 sm:px-4 md:px-6 pt-[64px] flex flex-col relative z-10">
        {/* Application Surface Card: Responsive calc height */}
        <div className="flex-1 my-3 sm:my-4 md:my-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[calc(100dvh-88px)] sm:h-[calc(100dvh-96px)] md:h-[calc(100dvh-104px)]">
          {/* ================================================== */}
          {/* LEFT COLUMN: CONVERSATION LIST */}
          {/* (Visible on desktop; on mobile hidden if mobileChatOpen) */}
          {/* ================================================== */}
          <div
            className={`w-full md:w-[360px] lg:w-[400px] shrink-0 border-r border-[#1A1A1A] flex flex-col bg-[#111111] h-full ${
              mobileChatOpen ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Page Header Area */}
            <div className="p-4 sm:p-5 border-b border-[#1A1A1A] shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                    <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider font-semibold">
                      YOUR CONVERSATIONS
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight mt-0.5">
                    MESSAGES
                  </h1>
                </div>

                {/* Total Unread Badge */}
                {totalUnreadCount > 0 && (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6] font-bold"
                    aria-label={`${totalUnreadCount} total unread messages`}
                  >
                    <span>{totalUnreadCount}</span>
                    <span className="text-[10px] uppercase">UNREAD</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-[#666666] font-sans">
                Talk to your people, crews and plans.
              </p>

              {/* Local Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  aria-label="Search conversations"
                  className="w-full bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] rounded-xl pl-9 pr-8 py-2 text-xs font-sans text-white placeholder-[#666666] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                {filterTabs.map((tab) => {
                  const isActive = activeFilter === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveFilter(tab)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all duration-150 shrink-0 border ${
                        isActive
                          ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                          : "bg-[#111111] text-[#666666] hover:text-white border-[#1A1A1A] hover:border-[#8B5CF6]/40"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Conversation List */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1 custom-scrollbar">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isSelected={conv.id === selectedId}
                    onSelect={() => handleSelectConversation(conv.id)}
                  />
                ))
              ) : searchQuery.trim() ? (
                /* Search Empty State */
                <div className="py-12 px-4 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#1A1A1A] flex items-center justify-center mx-auto text-[#666666]">
                    <Search className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    NO CONVERSATIONS FOUND
                  </h3>
                  <p className="text-xs text-[#666666] max-w-xs mx-auto">
                    Try another name or conversation.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("ALL");
                    }}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] text-xs font-mono text-[#8B5CF6] transition-colors"
                  >
                    RESET SEARCH
                  </button>
                </div>
              ) : (
                /* Zero Conversations Empty State (Future-Safe) */
                <div className="py-10 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto text-[#8B5CF6]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      START A CONVERSATION
                    </h3>
                    <p className="text-xs text-[#666666] max-w-xs mx-auto mt-1 leading-relaxed">
                      Find people, join a crew or open an event conversation to start connecting.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                    <Link
                      href="/people"
                      className="w-full py-2 px-3 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-[11px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>FIND PEOPLE</span>
                    </Link>
                    <Link
                      href="/crews"
                      className="w-full py-2 px-3 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-white font-mono text-[11px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>FIND CREWS</span>
                    </Link>
                    <Link
                      href="/discover"
                      className="w-full py-2 px-3 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-white font-mono text-[11px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>DISCOVER EVENTS</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================================================== */}
          {/* RIGHT COLUMN: ACTIVE CONVERSATION */}
          {/* (Visible on desktop; on mobile visible only when mobileChatOpen) */}
          {/* ================================================== */}
          <div
            className={`flex-1 flex flex-col h-full bg-[#111111] ${
              mobileChatOpen ? "flex" : "hidden md:flex"
            }`}
          >
            {activeConversation ? (
              <ActiveConversation
                key={activeConversation.id}
                conversation={activeConversation}
                onSendMessage={handleSendMessage}
                onBack={() => setMobileChatOpen(false)}
              />
            ) : (
              /* No Active Selection Placeholder */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 bg-[#111111]">
                <div className="w-14 h-14 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex items-center justify-center text-[#8B5CF6] shadow-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-extrabold tracking-[-0.03em] font-sans text-white">
                  SELECT A CONVERSATION
                </h2>
                <p className="text-xs text-[#666666] max-w-sm">
                  Choose a chat from the left column to view messages, coordinate plans, or catch up with your crew.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
