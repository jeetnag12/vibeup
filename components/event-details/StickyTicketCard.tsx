"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { DetailedEvent, TicketTier } from "@/lib/events-data";

interface StickyTicketCardProps {
  event: DetailedEvent;
}

export default function StickyTicketCard({ event }: StickyTicketCardProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>(
    event.tickets[0]?.id || "t1"
  );

  const selectedTier =
    event.tickets.find((t) => t.id === selectedTierId) || event.tickets[0];

  return (
    <>
      {/* DESKTOP SIDEBAR STICKY CARD (Hidden on mobile / tablet, visible on lg) */}
      <div className="hidden lg:block w-full sticky top-[88px] z-30">
        <div className="w-full bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 shadow-2xl hover:border-[#8B5CF6]/50 transition-colors">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-5">
            <div>
              <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
                SECURE ENTRY
              </span>
              <h3
                className="text-lg font-bold font-sans text-white tracking-tight"
                style={{ fontWeight: 700 }}
              >
                GET YOUR TICKET
              </h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
              <Zap className="w-4 h-4" />
            </div>
          </div>

          {/* Ticket Options List */}
          <div className="space-y-3 mb-6">
            {event.tickets.map((tier: TicketTier) => {
              const isSelected = tier.id === selectedTierId;

              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`p-3.5 rounded-[12px] border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-[#111111] border-[#8B5CF6] shadow-[0_0_16px_rgba(139,92,246,0.15)] ring-1 ring-[#8B5CF6]"
                      : "bg-[#111111]/60 border-[#1A1A1A] hover:border-[#8B5CF6]/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Radio Indicator */}
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#8B5CF6] bg-[#8B5CF6]"
                            : "border-[#666666] bg-transparent"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>

                      <div>
                        <span className="font-sans font-semibold text-sm text-white block">
                          {tier.name}
                        </span>
                        <span className="font-mono text-[11px] text-[#666666]">
                          {tier.availability}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-sans font-bold text-base text-white block">
                        {tier.formattedPrice}
                      </span>
                      {tier.badge && (
                        <span className="font-mono text-[10px] text-[#EC4899] px-1.5 py-0.2 rounded bg-[#EC4899]/10">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-[#666666] font-sans pl-7">
                    {tier.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Selected Summary & Primary CTA */}
          <div className="pt-2">
            <Link
              href={`/checkout?event=${event.id}&tier=${selectedTier?.id || "t1"}`}
              className="w-full h-[52px] rounded-[10px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200  hover:shadow-[0_0_24px_rgba(139,92,246,0.35)] active:scale-[0.99]"
            >
              <span>GET TICKETS ({selectedTier?.formattedPrice})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-mono text-[#666666]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Instant QR Pass · Official Partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR (Visible on mobile & tablet, hidden on desktop) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-[20px] border-t border-[#1A1A1A] px-4 py-3.5 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#666666] uppercase">
              TICKETS FROM
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-bold text-xl text-white">
                ₹{event.startingPrice}
              </span>
              <span className="font-mono text-xs text-[#666666]">onwards</span>
            </div>
          </div>

          <Link
            href={`/checkout?event=${event.id}&tier=${selectedTier?.id || "t1"}`}
            className="px-6 py-3 rounded-[10px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold flex items-center gap-2 transition-colors  active:scale-95 shrink-0"
          >
            <span>GET TICKETS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
