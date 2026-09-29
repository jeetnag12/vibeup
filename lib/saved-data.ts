import { EventCardProps } from "@/components/EventCard";
import { Club, allClubsData } from "@/lib/clubs-data";
import { Community, allCommunitiesData } from "@/lib/communities-data";

export interface SavedEventItem extends EventCardProps {
  id: string;
  genre?: string;
}

export type SavedTab = "ALL" | "EVENTS" | "CLUBS" | "COMMUNITIES";

export const initialSavedEvents: SavedEventItem[] = [
  {
    id: "cyberpunk-neon-warehouse",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    genre: "Techno / House",
    title: "Neon District — Warehouse Session",
    date: "Fri, 16 Oct",
    time: "10:00 PM",
    venue: "The Gypsy Warehouse",
    area: "Koramangala",
    price: "₹999",
    goingCount: 184,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "saturday-techno-night",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "COMMERCIAL",
    genre: "Commercial / Hip-Hop",
    title: "Afterdark: High Voltage Odyssey",
    date: "Sat, 17 Oct",
    time: "9:00 PM",
    venue: "Playboy Club",
    area: "Indiranagar",
    price: "₹1,299",
    goingCount: 260,
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "deep-house-odyssey-vol-4",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    genre: "Techno / Minimal",
    title: "Midnight Frequency Vol. 4",
    date: "Sat, 24 Oct",
    time: "10:00 PM",
    venue: "The Sound Garden",
    area: "HSR Layout",
    price: "₹799",
    goingCount: 142,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "after-dark-residents-night",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "AFRO HOUSE",
    genre: "Afro House / Melodic",
    title: "Sunday Sundown Terrace Groove",
    date: "Sun, 25 Oct",
    time: "5:00 PM",
    venue: "Pebble Jungle Lounge",
    area: "Whitefield",
    price: "₹599",
    goingCount: 215,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

// Pick canonical clubs matching the user's mock clubs prompt
export const initialSavedClubs: Club[] = allClubsData.slice(0, 4);

// Pick canonical communities matching the user's mock communities prompt
export const initialSavedCommunities: Community[] = allCommunitiesData.slice(0, 4);
