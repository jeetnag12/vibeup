/** Full-width scrolling ticker band in Loud Type. */
export default function Band({
  items,
  tone = "yellow",
  reverse = false,
  tilt = false,
  symbol = "✦",
}: {
  items: string[];
  tone?: "yellow" | "pink";
  reverse?: boolean;
  tilt?: boolean;
  symbol?: string;
}) {
  const loop = [...items, ...items, ...items];
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden py-3.5 text-night font-display font-extrabold uppercase text-[17px] sm:text-[22px] relative z-[2] ${
        tone === "yellow" ? "bg-yellow" : "bg-pink"
      } ${tilt ? "-rotate-[1.2deg] -mx-3 -mt-3" : ""}`}
      style={{ fontStretch: "125%" }}
    >
      <div
        className="flex w-max animate-[bandScroll_30s_linear_infinite]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex">
            {loop.map((t, i) => (
              <span key={`${half}-${i}`} className="px-[18px] whitespace-nowrap">
                {symbol} {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
