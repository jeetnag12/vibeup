"use client";

import { HelpCircle, ChevronRight } from "lucide-react";
import { DiscussionTopic } from "@/lib/events-data";

interface PopularQuestionsCardProps {
  onSelectQuestion: (query: string, topic?: DiscussionTopic) => void;
}

const popularQuestions: {
  question: string;
  topic?: DiscussionTopic;
  query: string;
}[] = [
  {
    question: "Is this event solo-friendly?",
    topic: "solo",
    query: "solo",
  },
  {
    question: "What's the dress code?",
    topic: "dress-code",
    query: "dress",
  },
  {
    question: "What time should we arrive?",
    topic: "timing",
    query: "start",
  },
  {
    question: "Anyone going from Koramangala?",
    topic: "transport",
    query: "Koramangala",
  },
  {
    question: "Who is going from Indiranagar / HSR?",
    topic: "transport",
    query: "HSR",
  },
];

export default function PopularQuestionsCard({
  onSelectQuestion,
}: PopularQuestionsCardProps) {
  return (
    <div className="p-5 rounded-[16px] bg-[#141418] border border-[#2A2A35] flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-[#2A2A35]">
        <HelpCircle className="w-3.5 h-3.5 text-[#8B5CF6]" />
        <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">
          POPULAR QUESTIONS
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {popularQuestions.map((q) => (
          <button
            key={q.question}
            type="button"
            onClick={() => onSelectQuestion(q.query, q.topic)}
            className="text-left p-2.5 rounded-xl bg-[#1A1A21] hover:bg-[#8B5CF6]/10 border border-[#2A2A35] hover:border-[#8B5CF6]/40 transition-colors flex items-center justify-between gap-2 group"
          >
            <span className="text-xs text-[#A1A1AA] group-hover:text-white font-sans transition-colors">
              &ldquo;{q.question}&rdquo;
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#52525B] group-hover:text-[#8B5CF6] shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
