"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselItem {
  image: string;
  title: string;
  subtitle?: string;
  category: string;
  price: string;
  date: string;
  id?: string;
}

interface CardCarouselProps {
  items?: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  initialIndex?: number;
  className?: string;
}

const defaultItems: CarouselItem[] = [
  {
    id: "techno-bunker",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "UNDERGROUND VAULT RAVE",
    subtitle: "Basement Vault · Indiranagar",
    price: "₹999",
    date: "TONIGHT · 10:00 PM",
  },
  {
    id: "neon-odyssey",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "HOUSE",
    title: "NEON ODYSSEY VOL. 4",
    subtitle: "The Humming Tree · Indiranagar",
    price: "₹799",
    date: "SAT · 9:00 PM",
  },
  {
    id: "rooftop-sundowner",
    image:
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
    category: "ROOFTOP",
    title: "SUNDOWNER FREQUENCIES",
    subtitle: "The Skyye · UB City",
    price: "₹1,199",
    date: "SUN · 5:30 PM",
  },
  {
    id: "desi-grooves",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    title: "DESI SATURDAY MADNESS",
    subtitle: "Toit Brewpub · Koramangala",
    price: "₹599",
    date: "SAT · 9:30 PM",
  },
  {
    id: "afro-frequencies",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "AFRO HOUSE",
    title: "SUBTERRANEAN SESSIONS",
    subtitle: "Fandom · Koramangala",
    price: "₹899",
    date: "FRI · 10:00 PM",
  },
];

export default function CardCarousel({
  items = defaultItems,
  autoPlay = true,
  interval = 3000,
  initialIndex,
  className = "",
}: CardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(() =>
    initialIndex !== undefined
      ? Math.max(0, Math.min(items.length - 1, initialIndex))
      : items.length > 0
      ? Math.floor(items.length / 2)
      : 0
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = items.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay handler
  useEffect(() => {
    if (!autoPlay || isHovered || isDragging || total <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, interval, isHovered, isDragging, total, nextSlide]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX.current === null) return;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
    setIsDragging(false);
    dragStartX.current = null;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    dragStartX.current = null;
    setIsHovered(false);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - dragStartX.current;
    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
    setIsDragging(false);
    dragStartX.current = null;
  };

  if (total === 0) return null;

  return (
    <section
      className={`relative w-full h-[420px] md:h-[580px] bg-[#000000] overflow-hidden select-none flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* BACKGROUND GLOW behind active card */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "50%",
          left: "50%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          transition: "all 500ms ease",
        }}
      />

      {/* 3D CARDS CONTAINER (perspective: 1000px) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, index) => {
          // Calculate shortest circular difference
          let diff = (index - activeIndex) % total;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const isVisible = Math.abs(diff) <= 2;
          if (!isVisible) return null;

          // Determine 3D card layout & styles based on diff
          let zIndex = 1;
          let opacity = 0.25;
          let filter = "brightness(0.3) blur(2px)";
          let transformDesktop = "";
          let transformMobile = "";
          let border = "1px solid rgba(139,92,246,0.1)";
          let boxShadow = "none";
          let widthClass = "w-[160px]";
          let heightClass = "h-[240px]";

          if (diff === 0) {
            // Active card (center)
            widthClass = "w-[200px] md:w-[280px]";
            heightClass = "h-[300px] md:h-[420px]";
            zIndex = 10;
            opacity = 1;
            filter = "brightness(1) blur(0px)";
            border = "2px solid #8B5CF6";
            boxShadow =
              "0 0 60px rgba(139,92,246,0.4), 0 0 120px rgba(139,92,246,0.15)";
            transformDesktop =
              "translate3d(-50%, -50%, 0) scale(1) translateY(0) rotateY(0deg)";
            transformMobile =
              "translate3d(-50%, -50%, 0) scale(1) translateY(0) rotateY(0deg)";
          } else if (Math.abs(diff) === 1) {
            // Adjacent cards (±1)
            widthClass = "w-[160px] md:w-[220px]";
            heightClass = "h-[240px] md:h-[340px]";
            zIndex = 5;
            opacity = 0.6;
            filter = "brightness(0.5) blur(1px)";
            border = "1px solid rgba(139,92,246,0.2)";
            const rotateY = diff === -1 ? 8 : -8; // Left: +8deg, Right: -8deg
            const xOffsetDesktop = diff * 250;
            const xOffsetMobile = diff * 150;
            transformDesktop = `translate3d(calc(-50% + ${xOffsetDesktop}px), -50%, 0) scale(0.85) translateY(20px) rotateY(${rotateY}deg)`;
            transformMobile = `translate3d(calc(-50% + ${xOffsetMobile}px), -50%, 0) scale(0.85) translateY(14px) rotateY(${rotateY}deg)`;
          } else if (Math.abs(diff) === 2) {
            // Far cards (±2)
            widthClass = "w-[130px] md:w-[160px]";
            heightClass = "h-[195px] md:h-[240px]";
            zIndex = 1;
            opacity = 0.25;
            filter = "brightness(0.3) blur(2px)";
            const rotateY = diff === -2 ? 15 : -15;
            const xOffsetDesktop = diff * 220;
            const xOffsetMobile = diff * 135;
            transformDesktop = `translate3d(calc(-50% + ${xOffsetDesktop}px), -50%, 0) scale(0.7) translateY(40px) rotateY(${rotateY}deg)`;
            transformMobile = `translate3d(calc(-50% + ${xOffsetMobile}px), -50%, 0) scale(0.7) translateY(24px) rotateY(${rotateY}deg)`;
          }

          return (
            <div
              key={item.id || item.title + index}
              onClick={() => setActiveIndex(index)}
              className={`absolute top-1/2 left-1/2 rounded-[16px] overflow-hidden cursor-pointer pointer-events-auto ${widthClass} ${heightClass}`}
              style={{
                aspectRatio: "2 / 3",
                zIndex,
                opacity,
                filter,
                border,
                boxShadow,
                transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                transform:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? transformMobile
                    : transformDesktop,
              }}
            >
              {/* CARD INNER CONTENT */}
              <div className="relative w-full h-full overflow-hidden rounded-[inherit]">
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    zIndex: 1,
                    background:
                      "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.95) 100%)",
                  }}
                />

                {/* Top Right Price Badge */}
                <div
                  className="absolute top-3 right-3 font-mono text-white text-[12px] font-bold z-10"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    lineHeight: 1,
                  }}
                >
                  {item.price}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col items-start text-left pointer-events-none">
                  {/* Category Pill */}
                  <span
                    className="font-mono text-white text-[9px] uppercase font-bold inline-block mb-2"
                    style={{
                      backgroundColor: "#8B5CF6",
                      padding: "2px 8px",
                      borderRadius: "2px",
                      letterSpacing: "0.05em",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-sans text-white text-[15px] md:text-[16px] m-0 line-clamp-1 mb-1 leading-snug"
                    style={{
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Subtitle / Date */}
                  <span
                    className="font-mono text-[#888888] text-[10px] md:text-[11px] line-clamp-1"
                    style={{ letterSpacing: "0.02em" }}
                  >
                    {item.subtitle || item.date}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PREV / NEXT BUTTONS */}
      <button
        type="button"
        aria-label="Previous card"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white z-20 transition-all duration-200"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#8B5CF6";
          e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        aria-label="Next card"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white z-20 transition-all duration-200"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#8B5CF6";
          e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* NAVIGATION DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-[6px] z-20">
        {items.map((_, dotIndex) => {
          const isActive = dotIndex === activeIndex;
          return (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Go to slide ${dotIndex + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(dotIndex);
              }}
              className="h-[6px] transition-all duration-300 focus:outline-none"
              style={{
                width: isActive ? "24px" : "6px",
                borderRadius: isActive ? "3px" : "50%",
                backgroundColor: isActive
                  ? "#8B5CF6"
                  : "rgba(255, 255, 255, 0.2)",
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
