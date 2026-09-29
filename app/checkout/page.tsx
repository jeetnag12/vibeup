"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  QrCode,
  Zap,
} from "lucide-react";
import { getEventById, defaultEvent } from "@/lib/events-data";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event") || defaultEvent.id;
  const tierId = searchParams.get("tier") || "t1";

  const event = getEventById(eventId);
  const tier =
    event.tickets.find((t) => t.id === tierId) || event.tickets[0];

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = tier.price * quantity;
  const platformFee = 0; // Early members get zero platform fees!
  const total = subtotal + platformFee;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
      <Link
        href={`/events/${event.id}`}
        className="inline-flex items-center gap-2 text-sm font-mono text-[#666666] hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO EVENT</span>
      </Link>

      {!isSuccess ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Details & Payment */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider block mb-1">
                FAST CHECKOUT
              </span>
              <h1 className="text-3xl font-extrabold tracking-[-0.03em] font-sans text-white">
                Complete Your Order
              </h1>
              <p className="text-xs text-[#666666] font-sans mt-1">
                Zero platform fees for early VibeUp members.
              </p>
            </div>

            <form onSubmit={handlePay} className="space-y-6">
              {/* Attendee Details */}
              <div className="p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A]">
                <h3 className="font-sans font-semibold text-sm text-white mb-4">
                  1. Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-[#666666] uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="Aarav Sharma"
                      className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#8B5CF6] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#666666] uppercase mb-1">
                      Email Address (for QR Pass)
                    </label>
                    <input
                      type="email"
                      required
                      defaultValue="aarav@vibeup.xyz"
                      className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#8B5CF6] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#666666] uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      defaultValue="+91 98765 43210"
                      className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#8B5CF6] font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A]">
                <h3 className="font-sans font-semibold text-sm text-white mb-4">
                  2. Select Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-mono text-xs font-semibold transition-all ${
                      paymentMethod === "upi"
                        ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-white"
                        : "border-[#1A1A1A] text-[#666666]"
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-[#8B5CF6]" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-mono text-xs font-semibold transition-all ${
                      paymentMethod === "card"
                        ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-white"
                        : "border-[#1A1A1A] text-[#666666]"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#EC4899]" />
                    <span>Card / NetBanking</span>
                  </button>
                </div>

                <p className="text-xs text-[#666666] font-sans text-center">
                  Encrypted with 256-bit bank grade security
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-[12px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-base font-semibold flex items-center justify-center gap-2  transition-all"
              >
                <span>PAY ₹{total} &amp; GET PASS</span>
                <Zap className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Summary: Order Details */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 shadow-xl sticky top-[96px]">
            <h3 className="font-sans font-bold text-lg text-white mb-4 pb-3 border-b border-[#1A1A1A]">
              Order Summary
            </h3>

            {/* Event thumbnail */}
            <div className="flex gap-3.5 mb-5 pb-5 border-b border-[#1A1A1A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image}
                alt={event.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#1A1A1A]"
              />
              <div>
                <h4 className="font-sans font-bold text-white text-sm line-clamp-1">
                  {event.title}
                </h4>
                <p className="font-mono text-xs text-[#8B5CF6] mt-0.5">
                  {event.venue} · {event.area}
                </p>
                <p className="font-mono text-[11px] text-[#666666] mt-0.5">
                  {event.dateDisplay}
                </p>
              </div>
            </div>

            {/* Tier & Quantity */}
            <div className="space-y-3 text-xs font-mono text-[#666666] pb-4 border-b border-[#1A1A1A]">
              <div className="flex justify-between items-center text-sm text-white">
                <span className="font-sans font-semibold">{tier.name}</span>
                <span className="font-bold">₹{tier.price}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Quantity</span>
                <div className="flex items-center gap-2 text-white bg-[#111111] border border-[#1A1A1A] px-2 py-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-1 text-[#666666] hover:text-white"
                  >
                    -
                  </button>
                  <span className="font-bold text-xs">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(6, quantity + 1))}
                    className="px-1 text-[#666666] hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Platform Convenience Fee</span>
                <span className="text-[#22C55E] font-medium">FREE (₹0)</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline pt-4 mb-4">
              <span className="font-sans font-bold text-base text-white">
                Total Amount
              </span>
              <span className="font-sans font-bold text-2xl text-white">
                ₹{total}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#666666]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Official ticketing partner of {event.venue}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Order Confirmed Screen */
        <div className="max-w-md mx-auto p-8 rounded-[12px] bg-[#111111] border border-[#1A1A1A] text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E] mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-[-0.03em] font-sans text-white mb-2">
            You&apos;re Going!
          </h2>
          <p className="text-xs text-[#666666] font-sans mb-6">
            Your QR Pass has been sent to your email. You can also view it anytime
            in your VibeUp profile.
          </p>

          <div className="p-4 rounded-xl bg-[#111111] border border-[#1A1A1A] text-left mb-6 font-mono text-xs space-y-1.5">
            <p className="text-white font-bold">{event.title}</p>
            <p className="text-[#8B5CF6]">{tier.name} · {quantity} pass(es)</p>
            <p className="text-[#666666]">{event.dateDisplay} · {event.venue}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              href={`/events/${event.id}`}
              className="w-full py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold font-sans transition-colors"
            >
              Back to Event Hub
            </Link>
            <Link
              href="/discover"
              className="w-full py-2.5 rounded-[4px] border border-[#1A1A1A] text-[#666666] hover:text-white text-sm font-sans transition-colors"
            >
              Discover More Events
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />
      <div className="w-full pt-[96px] pb-[80px]">
        <Suspense
          fallback={
            <div className="max-w-[1000px] mx-auto px-4 py-16 text-center text-sm font-mono text-[#666666]">
              Loading checkout...
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
