"use client";

export default function HowItWorks() {
  return (
    <section
      className="relative w-full bg-[#000000] text-left select-none overflow-hidden"
      style={{
        padding: "140px 8vw",
      }}
    >
      <div className="flex flex-col items-start text-left">
        <span
          className="font-sans block leading-[0.9]"
          style={{
            fontWeight: 900,
            fontSize: "clamp(64px, 10vw, 140px)",
            letterSpacing: "-0.04em",
            color: "rgba(255, 255, 255, 0.06)",
          }}
        >
          DISCOVER.
        </span>
        <span
          className="font-sans block leading-[0.9]"
          style={{
            fontWeight: 900,
            fontSize: "clamp(64px, 10vw, 140px)",
            letterSpacing: "-0.04em",
            color: "rgba(255, 255, 255, 0.06)",
          }}
        >
          CONNECT.
        </span>
        <span
          className="font-sans block leading-[0.9]"
          style={{
            fontWeight: 900,
            fontSize: "clamp(64px, 10vw, 140px)",
            letterSpacing: "-0.04em",
            color: "#8B5CF6",
          }}
        >
          VIBE.
        </span>

        {/* Below (margin-top 48px) */}
        <p
          className="font-sans m-0"
          style={{
            marginTop: "48px",
            fontWeight: 400,
            fontSize: "16px",
            color: "#444444",
            maxWidth: "360px",
            lineHeight: 1.6,
          }}
        >
          From discovery to crew to memories — VibeUp is the social layer Bangalore nightlife was missing.
        </p>
      </div>
    </section>
  );
}
