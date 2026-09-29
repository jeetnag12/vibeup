"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Community, communityCategories } from "@/lib/communities-data";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCommunity: (newCommunity: Community) => void;
}

const coverPresets = [
  {
    label: "Warehouse Techno",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Rooftop Sunset",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Club Lasers",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Live Concert",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
  },
];

export default function CreateCommunityModal({
  isOpen,
  onClose,
  onCreateCommunity,
}: CreateCommunityModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Community["category"]>("MUSIC");
  const [location, setLocation] = useState("Bangalore");
  const [genresText, setGenresText] = useState("Techno, House");
  const [selectedCover, setSelectedCover] = useState(coverPresets[0].url);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedGenres = genresText
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newComm: Community = {
      id: slug || `community-${Date.now()}`,
      name: name.toUpperCase().trim(),
      description:
        description.trim() ||
        "A freshly founded VibeUp nightlife community connecting partygoers across Bangalore.",
      coverImage: selectedCover,
      location: location.trim() || "Bangalore",
      area: location.trim(),
      category: category,
      genres: parsedGenres.length > 0 ? parsedGenres : ["Nightlife", "Electronic"],
      memberCount: 1,
      memberCountDisplay: "1",
      activityCount: "NEW CROWD",
      tags: ["New", "Community", location],
      members: [
        {
          id: "creator",
          name: "You (Founder)",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=160&auto=format&fit=crop",
        },
      ],
      trending: false,
      interest: "TECHNO",
      upcomingEventsCount: 0,
    };

    onCreateCommunity(newComm);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-community-modal-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#111111] border border-[#1A1A1A] rounded-[12px] p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
            <h3
              id="create-community-modal-title"
              className="font-sans font-bold text-2xl text-white tracking-tight"
            >
              CREATE COMMUNITY
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full bg-[#111111] hover:bg-[#1A1A1A] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#666666] font-sans mb-5 leading-relaxed">
          Build a crowd around your favorite music genres, neighborhood spots, or weekend event plans.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Community Name */}
          <div>
            <label
              htmlFor="comm-name"
              className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
            >
              COMMUNITY NAME
            </label>
            <input
              id="comm-name"
              type="text"
              required
              placeholder="e.g. INDIRANAGAR HOUSE COLLECTIVE"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white placeholder-[#666666]"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="comm-desc"
              className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
            >
              DESCRIPTION
            </label>
            <textarea
              id="comm-desc"
              rows={3}
              required
              placeholder="What is this community about? What kind of energy and music can members expect?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white placeholder-[#666666] resize-none"
            />
          </div>

          {/* Category & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="comm-cat"
                className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
              >
                CATEGORY
              </label>
              <select
                id="comm-cat"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Community["category"])
                }
                className="w-full h-10 px-3 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white"
              >
                {communityCategories
                  .filter((c) => c !== "ALL")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="comm-loc"
                className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
              >
                LOCATION / AREA
              </label>
              <input
                id="comm-loc"
                type="text"
                placeholder="e.g. Indiranagar, Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white"
              >
              </input>
            </div>
          </div>

          {/* Genres */}
          <div>
            <label
              htmlFor="comm-genres"
              className="block text-xs font-mono text-[#666666] uppercase mb-1.5"
            >
              GENRES (COMMA-SEPARATED)
            </label>
            <input
              id="comm-genres"
              type="text"
              placeholder="e.g. Techno, Deep House, Acid"
              value={genresText}
              onChange={(e) => setGenresText(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] focus:border-[#8B5CF6] focus:outline-none text-xs font-sans text-white"
            />
          </div>

          {/* Cover Image Preset Picker */}
          <div>
            <span className="block text-xs font-mono text-[#666666] uppercase mb-1.5">
              COVER IMAGE PRESET
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {coverPresets.map((preset) => (
                <div
                  key={preset.label}
                  onClick={() => setSelectedCover(preset.url)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 relative h-16 transition-all ${
                    selectedCover === preset.url
                      ? "border-[#8B5CF6] ring-2 ring-[#8B5CF6]/40"
                      : "border-[#1A1A1A] opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                    <span className="text-[9px] font-mono text-white truncate">
                      {preset.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-mono font-bold text-white transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
            >
              CREATE COMMUNITY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
