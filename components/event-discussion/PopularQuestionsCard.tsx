"use client";

import { HelpCircle, ChevronRight } from "@/components/icons";
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
    <div className="p-5 rounded-[12px] bg-[#15151C] border border-[#25252F] flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-[#25252F]">
        <HelpCircle className="w-3.5 h-3.5 text-[#FFE14D]" />
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
            className="text-left p-2.5 rounded-xl bg-[#15151C] hover:bg-[#FFE14D]/10 border border-[#25252F] hover:border-[#FFE14D]/40 transition-colors flex items-center justify-between gap-2 group"
          >
            <span className="text-xs text-[#8E8C9C] group-hover:text-white font-sans transition-colors">
              &ldquo;{q.question}&rdquo;
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#6B6979] group-hover:text-[#FFE14D] shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
