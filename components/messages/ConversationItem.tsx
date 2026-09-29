"use client";

import React from "react";
import Image from "next/image";
import { Users, Calendar, Radio, User } from "lucide-react";
import { Conversation } from "@/lib/messages-data";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ConversationItem({
  conversation,
  isSelected,
  onSelect,
}: ConversationItemProps) {
  const isUnread = conversation.unreadCount > 0;

  // Type badge styling & icon
  const getTypeBadge = () => {
    switch (conversation.type) {
      case "person":
        return {
          label: "PERSON",
          icon: <User className="w-2.5 h-2.5" />,
          color: "text-[#A78BFA] bg-[#8B5CF6]/10 border-[#8B5CF6]/30",
        };
      case "crew":
        return {
          label: "CREW",
          icon: <Users className="w-2.5 h-2.5" />,
          color: "text-[#F472B6] bg-[#EC4899]/10 border-[#EC4899]/30",
        };
      case "event":
        return {
          label: "EVENT",
          icon: <Calendar className="w-2.5 h-2.5" />,
          color: "text-[#FBBF24] bg-[#F59E0B]/10 border-[#F59E0B]/30",
        };
      case "community":
        return {
          label: "COMMUNITY",
          icon: <Radio className="w-2.5 h-2.5" />,
          color: "text-[#22D3EE] bg-[#06B6D4]/10 border-[#06B6D4]/30",
        };
    }
  };

  const badge = getTypeBadge();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-label={`Conversation with ${conversation.name}, ${
        isUnread ? `${conversation.unreadCount} unread messages` : "all read"
      }`}
      className={`group relative w-full p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
        isSelected
          ? "bg-[#8B5CF6]/15 border-[#8B5CF6]/60 shadow-[0_0_16px_rgba(139,92,246,0.18)]"
          : "bg-transparent border-transparent hover:bg-[#111111]/80 hover:border-[#1A1A1A]"
      }`}
    >
      {/* Avatar Container with Indicators */}
      <div className="relative shrink-0 w-11 h-11 rounded-full overflow-visible">
        <div className="w-full h-full rounded-full overflow-hidden border border-[#1A1A1A] bg-[#111111] relative">
          <Image
            src={conversation.avatar}
            alt={conversation.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>

        {/* Online Indicator for Person */}
        {conversation.type === "person" && conversation.online && (
          <span
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#111111] shadow-[0_0_8px_#22C55E]"
            aria-label="Online"
            title="Online"
          />
        )}

        {/* Type Icon Pill for Group Chats */}
        {conversation.type !== "person" && (
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-[#111111] text-[9px] ${
              conversation.type === "crew"
                ? "bg-[#EC4899] text-white"
                : conversation.type === "event"
                ? "bg-[#F59E0B] text-black"
                : "bg-[#06B6D4] text-black"
            }`}
          >
            {badge.icon}
          </span>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {/* Top Line: Name + Badge + Timestamp */}
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3
              className={`text-sm truncate font-sans tracking-tight ${
                isUnread ? "font-bold text-white" : "font-medium text-[#F4F4F5]"
              }`}
            >
              {conversation.name}
            </h3>

            {/* Compact Type Tag */}
            <span
              className={`shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${badge.color}`}
            >
              {badge.label}
            </span>
          </div>

          <span
            className={`text-[10px] font-mono shrink-0 ${
              isUnread ? "text-[#8B5CF6] font-bold" : "text-[#666666]"
            }`}
          >
            {conversation.timestamp}
          </span>
        </div>

        {/* Bottom Line: Last Message Preview + Unread Badge */}
        <div className="flex items-center justify-between gap-2">
          <p
            className={`text-xs truncate ${
              isUnread
                ? "text-white font-medium"
                : "text-[#666666] group-hover:text-[#D4D4D8]"
            }`}
          >
            {conversation.lastMessage}
          </p>

          {/* Unread Count Pill */}
          {isUnread && (
            <span
              className="shrink-0 min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#8B5CF6] text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.6)]"
              aria-label={`${conversation.unreadCount} unread`}
            >
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
