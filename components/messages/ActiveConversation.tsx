"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MoreVertical,
  Send,
  Smile,
  ExternalLink,
  ShieldAlert,
  UserX,
  Check,
  Sparkles,
} from "lucide-react";
import { Conversation } from "@/lib/messages-data";

interface ActiveConversationProps {
  conversation: Conversation;
  onSendMessage: (text: string) => void;
  onBack?: () => void;
}

const QUICK_EMOJIS = ["🔥", "🎧", "🍸", "💃", "🕺", "✨", "⚡", "🎶", "🎉", "🚀"];

export default function ActiveConversation({
  conversation,
  onSendMessage,
  onBack,
}: ActiveConversationProps) {
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    scrollToBottom(false);
  }, [conversation.id]);

  useEffect(() => {
    scrollToBottom(true);
  }, [conversation.messages.length]);

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show temporary toast feedback for mock safety actions
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowMoreMenu(false);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputText("");
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Context button label & link
  const getContextButton = () => {
    switch (conversation.type) {
      case "person":
        return { label: "VIEW PROFILE", href: conversation.route };
      case "crew":
        return { label: "VIEW CREW", href: conversation.route };
      case "event":
        return { label: "VIEW EVENT", href: conversation.route };
      case "community":
        return { label: "VIEW COMMUNITY", href: conversation.route };
    }
  };

  const contextAction = getContextButton();

  // Find index of the last outgoing message for the mock SEEN receipt
  const lastOutgoingIndex = conversation.messages.reduce(
    (lastIdx, msg, idx) => (msg.sender === "me" ? idx : lastIdx),
    -1
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#111111] relative overflow-hidden">
      {/* ================================================== */}
      {/* 1. CONVERSATION HEADER */}
      {/* ================================================== */}
      <div className="h-[68px] px-4 sm:px-6 border-b border-[#1A1A1A] bg-[#111111]/95 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to conversations"
              className="md:hidden p-1.5 -ml-1 text-[#666666] hover:text-white rounded-[4px] hover:bg-white/5 transition-colors flex items-center gap-1 font-mono text-xs uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-bold">BACK</span>
            </button>
          )}

          {/* Avatar */}
          <div className="relative shrink-0 w-10 h-10 rounded-full border border-[#1A1A1A] bg-[#111111] overflow-hidden">
            <Image
              src={conversation.avatar}
              alt={conversation.name}
              fill
              sizes="40px"
              className="object-cover"
            />
            {conversation.type === "person" && conversation.online && (
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#111111]"
                title="Online"
              />
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight truncate">
                {conversation.name}
              </h2>
              {conversation.type === "person" && conversation.online && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#22C55E] font-semibold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  ONLINE
                </span>
              )}
            </div>

            <p className="text-[11px] font-mono text-[#666666] truncate">
              {conversation.subtitle || conversation.handle || conversation.context}
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Canonical Context Link (View Profile / View Crew / View Event / View Community) */}
          <Link
            href={contextAction.href}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-xs font-mono font-medium text-white transition-colors"
          >
            <span>{contextAction.label}</span>
            <ExternalLink className="w-3 h-3 text-[#666666]" />
          </Link>

          {/* More Actions Dropdown Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              aria-label="Conversation options"
              className="p-2 text-[#666666] hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl bg-[#111111] border border-[#1A1A1A] shadow-2xl py-1.5 z-30 font-sans text-xs">
                {/* Mobile-visible View Link */}
                <Link
                  href={contextAction.href}
                  onClick={() => setShowMoreMenu(false)}
                  className="sm:hidden flex items-center gap-2.5 px-3.5 py-2 text-white hover:bg-white/5 transition-colors font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{contextAction.label}</span>
                </Link>

                {/* Safety / Moderation Placeholders */}
                <button
                  type="button"
                  onClick={() =>
                    triggerToast("Report received. Our moderation team will review this chat.")
                  }
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[#FCA5A5] hover:bg-white/5 transition-colors text-left"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>REPORT CONVERSATION</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    triggerToast(
                      conversation.type === "person"
                        ? "User blocked. You will no longer receive messages."
                        : "Left conversation."
                    )
                  }
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[#666666] hover:text-white hover:bg-white/5 transition-colors text-left"
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>
                    {conversation.type === "person" ? "BLOCK USER" : "LEAVE CONVERSATION"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TOAST NOTIFICATION NOTICES (Local feedback) */}
      {/* ================================================== */}
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 max-w-[90%] sm:max-w-md px-4 py-2 rounded-xl bg-[#111111] border border-[#8B5CF6]/50 shadow-2xl text-xs font-mono text-white flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================================================== */}
      {/* 3. SCROLLABLE MESSAGES CONTAINER */}
      {/* ================================================== */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 custom-scrollbar">
        {/* Nightlife Privacy / Encrypted Context Banner */}
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111]/70 border border-[#1A1A1A] text-[10px] font-mono text-[#666666]">
            <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
            <span>NIGHTLIFE PLANS · VERIFIED VIBEUP CONVERSATION</span>
          </div>
        </div>

        {conversation.messages.map((message, index) => {
          const isMe = message.sender === "me";
          const isLatestOutgoing = isMe && index === lastOutgoingIndex;

          return (
            <div
              key={message.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              {/* Group sender name for incoming group chats */}
              {!isMe && message.senderName && conversation.type !== "person" && (
                <span className="text-[11px] font-mono text-[#666666] ml-1 mb-1 font-medium">
                  {message.senderName}
                </span>
              )}

              {/* Message Bubble */}
              <div
                className={`px-4 py-2.5 rounded-[12px] text-sm leading-relaxed max-w-[85%] sm:max-w-[75%] break-words shadow-sm ${
                  isMe
                    ? "bg-[#8B5CF6] text-white rounded-tr-sm shadow-[0_0_14px_rgba(139,92,246,0.2)]"
                    : "bg-[#111111] border border-[#1A1A1A] text-white rounded-tl-sm"
                }`}
              >
                <p className="font-sans whitespace-pre-wrap">{message.text}</p>
              </div>

              {/* Message Metadata (Timestamp + Mock Seen Receipt) */}
              <div
                className={`flex items-center gap-1 mt-1 px-1 text-[10px] font-mono ${
                  isMe ? "text-[#666666]" : "text-[#666666]"
                }`}
              >
                <span>{message.timestamp}</span>

                {/* Mock presentation state for UI preview (not real backend receipt) */}
                {isLatestOutgoing && (
                  <span
                    className="text-[#8B5CF6] font-bold tracking-wider"
                    title="Mock seen state for UI preview"
                  >
                    · SEEN
                  </span>
                )}
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* ================================================== */}
      {/* 4. EMOJI BAR (Quick Nightlife Emojis) */}
      {/* ================================================== */}
      {showEmojiPicker && (
        <div className="px-4 py-2 border-t border-[#1A1A1A] bg-[#111111] flex items-center gap-2 overflow-x-auto shrink-0 z-10">
          <span className="text-[10px] font-mono text-[#666666] uppercase mr-1">
            QUICK:
          </span>
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleAddEmoji(emoji)}
              className="text-base p-1.5 hover:bg-white/10 rounded-lg transition-transform active:scale-125"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* ================================================== */}
      {/* 5. MESSAGE INPUT COMPOSER */}
      {/* ================================================== */}
      <div className="p-3 sm:p-4 border-t border-[#1A1A1A] bg-[#111111] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-end gap-2 bg-[#111111] border border-[#1A1A1A] focus-within:border-[#8B5CF6] rounded-[12px] p-2 transition-colors duration-200"
        >
          {/* Emoji Toggle Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Toggle emoji picker"
            className={`p-2 rounded-xl transition-colors shrink-0 ${
              showEmojiPicker
                ? "text-[#8B5CF6] bg-[#8B5CF6]/15"
                : "text-[#666666] hover:text-white hover:bg-white/5"
            }`}
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Multiline-capable Textarea with Enter-to-Send */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            aria-label="Write a message"
            className="flex-1 bg-transparent border-0 text-sm font-sans text-white placeholder-[#666666] focus:outline-none resize-none max-h-32 py-1.5 px-1 leading-normal"
            style={{ minHeight: "24px" }}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            aria-label="Send message"
            className={`p-2.5 rounded-[4px] transition-all duration-200 shrink-0 flex items-center justify-center ${
              inputText.trim()
                ? "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white  active:scale-95 cursor-pointer"
                : "bg-[#1A1A1A]/50 text-[#666666] cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono text-[#666666]">
          <span>Press Enter to send · Shift+Enter for new line</span>
          <span className="hidden sm:inline">Frontend UI Preview</span>
        </div>
      </div>
    </div>
  );
}
