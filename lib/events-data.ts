export interface TicketTier {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  availability: string;
  badge?: string;
  description: string;
}

export interface Attendee {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  interests: string[];
  musicTaste: string;
  vibeScore: number;
  isFollowing?: boolean;
}

export interface VibeMatchUser {
  id: string;
  name: string;
  avatar: string;
  matchPercentage: number;
  matchTags: string[];
  reason: string;
  vibeScore: number;
  isFollowing?: boolean;
}

export interface DiscussionPost {
  id: string;
  authorName: string;
  avatar: string;
  badge?: string;
  text: string;
  timestamp: string;
  repliesCount: number;
  likesCount: number;
}

export interface EventCrew {
  id: string;
  name: string;
  membersCount: number;
  maxSpots: number;
  eventName: string;
  membersAvatars: string[];
  creatorName: string;
  vibeTag: string;
}

export interface EventReview {
  id: string;
  authorName: string;
  avatar: string;
  rating: number;
  verifiedAttendee: boolean;
  comment: string;
  date: string;
}

export interface DetailedEvent {
  id: string;
  title: string;
  category: string;
  genre: string;
  image: string;
  dateDisplay: string;
  timeDisplay: string;
  timeRange: string;
  venue: string;
  area: string;
  city: string;
  ageRestriction: string;
  startingPrice: number;
  formattedStartingPrice: string;
  goingCount: number;
  vibeCount: number;
  goingAvatars: string[];
  descriptionParagraphs: string[];
  dressCode: string;
  doorsOpen: string;
  importantNotes: string[];
  overallRating: number;
  reviewCount: number;
  ratingDimensions: {
    music: number;
    crowd: number;
    venue: number;
  };
  tickets: TicketTier[];
  attendees: Attendee[];
  vibeMatches: VibeMatchUser[];
  discussions: DiscussionPost[];
  crews: EventCrew[];
  reviews: EventReview[];
}

export const defaultEvent: DetailedEvent = {
  id: "saturday-techno-night",
  title: "SATURDAY TECHNO NIGHT",
  category: "TECHNO / ELECTRONIC",
  genre: "Techno · House · Electronic",
  image:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
  dateDisplay: "SAT, 03 OCT 2026",
  timeDisplay: "9:00 PM onwards",
  timeRange: "9:00 PM – 2:00 AM",
  venue: "XYZ CLUB",
  area: "Koramangala",
  city: "Bengaluru",
  ageRestriction: "18+",
  startingPrice: 799,
  formattedStartingPrice: "₹799 onwards",
  goingCount: 124,
  vibeCount: 23,
  goingAvatars: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
  ],
  descriptionParagraphs: [
    "Saturday Techno Night returns to XYZ Club with an immersive audio-visual warehouse experience. Designed for electronic music purists and nocturnal souls who live for deep grooves, industrial baselines, and hypnotic synthesizers.",
    "Curated by Bangalore's underground tastemakers, this edition features an extended 4-hour headline set powered by custom Funktion-One sound engineering. Expect minimal distractions, dimly-lit red neon aesthetics, and an intimate dance floor dedicated entirely to the vibe.",
    "Whether you're rolling in with your regular weekend crew or flying solo looking to connect with genuine music lovers, the social atmosphere is warm, inclusive, and strictly zero-judgment.",
  ],
  dressCode: "Smart casual / Monochrome street",
  doorsOpen: "Doors open 9:00 PM. Last entry 1:00 AM.",
  importantNotes: [
    "Valid government-issued physical ID required at the door (18+).",
    "No outside food, beverages, or contraband permitted.",
    "Zero tolerance policy for harassment, aggression, or unauthorized photography.",
    "Re-entry is restricted after midnight.",
  ],
  overallRating: 4.7,
  reviewCount: 126,
  ratingDimensions: {
    music: 4.8,
    crowd: 4.6,
    venue: 4.5,
  },
  tickets: [
    {
      id: "t1",
      name: "Early Bird",
      price: 799,
      formattedPrice: "₹799",
      availability: "Almost sold out",
      badge: "Few Left",
      description: "Entry before 10:30 PM. Includes 1 complimentary house beverage.",
    },
    {
      id: "t2",
      name: "General Entry",
      price: 999,
      formattedPrice: "₹999",
      availability: "Available",
      badge: "Popular",
      description: "Full event access anytime after doors open at 9:00 PM.",
    },
    {
      id: "t3",
      name: "VIP",
      price: 1999,
      formattedPrice: "₹1,999",
      availability: "Available",
      badge: "Fast Track",
      description: "Priority queue bypass, elevated mezzanine lounge access & 2 craft drinks.",
    },
  ],
  attendees: [
    {
      id: "a1",
      name: "Aarav",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
      bio: "Synthesizer enthusiast, analog photography & weekend raver.",
      interests: ["Techno", "House", "Photography"],
      musicTaste: "Berlin Techno · Acid House",
      vibeScore: 87,
      isFollowing: false,
    },
    {
      id: "a2",
      name: "Ananya",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      bio: "Product designer by day, underground melodic techno fan by night.",
      interests: ["Melodic", "Vinyl", "Design"],
      musicTaste: "Afterlife · Innervisions",
      vibeScore: 92,
      isFollowing: true,
    },
    {
      id: "a3",
      name: "Kabir",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
      bio: "Bangalore native. Always in the front row for heavy basslines.",
      interests: ["Industrial", "Craft Beer", "Gym"],
      musicTaste: "Hard Techno · Peak Time",
      vibeScore: 84,
      isFollowing: false,
    },
    {
      id: "a4",
      name: "Rhea",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
      bio: "Looking for people to split an Uber from Indiranagar!",
      interests: ["House", "Deep Tech", "Fashion"],
      musicTaste: "Deep House · Minimal",
      vibeScore: 89,
      isFollowing: false,
    },
    {
      id: "a5",
      name: "Dev",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=160&auto=format&fit=crop",
      bio: "DJing on weekends. Love chatting about audio equipment.",
      interests: ["Audio Tech", "Synthesizers", "Coffee"],
      musicTaste: "Detroit Techno · Electro",
      vibeScore: 95,
      isFollowing: false,
    },
    {
      id: "a6",
      name: "Meera",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
      bio: "Solo clubber who loves meeting spontaneous crowds.",
      interests: ["Dance", "Cocktails", "Indie"],
      musicTaste: "Progressive House · Melodic",
      vibeScore: 88,
      isFollowing: false,
    },
    {
      id: "a7",
      name: "Vikram",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
      bio: "Founder in Koramangala. Always unwinding to hypnotic beats.",
      interests: ["Startups", "Techno", "Billiards"],
      musicTaste: "Dub Techno · Ambient",
      vibeScore: 81,
      isFollowing: false,
    },
    {
      id: "a8",
      name: "Tara",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=160&auto=format&fit=crop",
      bio: "First time at XYZ Club! Excited for the sound system.",
      interests: ["Live Gigs", "Travel", "Art"],
      musicTaste: "Tech House · Afro House",
      vibeScore: 90,
      isFollowing: false,
    },
  ],
  vibeMatches: [
    {
      id: "vm1",
      name: "Ananya S.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 94,
      matchTags: ["Techno", "House", "Indiranagar"],
      reason: "Attended 3 same underground sessions & mutual electronic music communities.",
      vibeScore: 92,
      isFollowing: false,
    },
    {
      id: "vm2",
      name: "Rohan V.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 91,
      matchTags: ["Koramangala", "Synth", "Craft Beer"],
      reason: "Both active in Koramangala crews and similar weekend nightlife timings.",
      vibeScore: 88,
      isFollowing: false,
    },
    {
      id: "vm3",
      name: "Zoya K.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 89,
      matchTags: ["Melodic Techno", "Photography", "Late Night"],
      reason: "High music synergy and shared interest in electronic audio visuals.",
      vibeScore: 91,
      isFollowing: false,
    },
    {
      id: "vm4",
      name: "Dev P.",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 86,
      matchTags: ["Peak Time", "Audio Tech", "HSR"],
      reason: "Member of Bangalore Electronic Crew with matching rave attendance.",
      vibeScore: 95,
      isFollowing: false,
    },
  ],
  discussions: [
    {
      id: "d1",
      authorName: "Kunal Verma",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      badge: "Regular",
      text: "Anyone heading out from HSR Layout? Looking to carpool or split an Uber around 9:30 PM!",
      timestamp: "2 hours ago",
      repliesCount: 7,
      likesCount: 14,
    },
    {
      id: "d2",
      authorName: "Simran Kaur",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      badge: "Crew Host",
      text: "What is everyone wearing tonight? Is it casual sneaker friendly or strict dress shoes?",
      timestamp: "4 hours ago",
      repliesCount: 12,
      likesCount: 19,
    },
    {
      id: "d3",
      authorName: "Arjun Nair",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      badge: "Solo Explorer",
      text: "First time going solo to XYZ Club. How welcoming is the vibe near the front booth?",
      timestamp: "Yesterday",
      repliesCount: 15,
      likesCount: 26,
    },
  ],
  crews: [
    {
      id: "c1",
      name: "SATURDAY TECHNO CREW",
      membersCount: 8,
      maxSpots: 10,
      eventName: "Saturday Techno Night",
      creatorName: "Aarav S.",
      vibeTag: "High Energy · Front Row",
      membersAvatars: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      ],
    },
    {
      id: "c2",
      name: "INDIRANAGAR CARPOOLERS",
      membersCount: 4,
      maxSpots: 6,
      eventName: "Saturday Techno Night",
      creatorName: "Rhea N.",
      vibeTag: "Pre-drinks · Casual",
      membersAvatars: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
      ],
    },
    {
      id: "c3",
      name: "MIDNIGHT GROOVE COLLECTIVE",
      membersCount: 6,
      maxSpots: 8,
      eventName: "Saturday Techno Night",
      creatorName: "Dev P.",
      vibeTag: "Dancefloor Nonstop",
      membersAvatars: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      ],
    },
  ],
  reviews: [
    {
      id: "r1",
      authorName: "Pranav M.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      rating: 5,
      verifiedAttendee: true,
      comment:
        "Music was insane. Crowd was exactly my kind of people — respectful, here for the tracks, and no chaotic pushing.",
      date: "Sep 2026",
    },
    {
      id: "r2",
      authorName: "Sneha Rao",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      rating: 4.8,
      verifiedAttendee: true,
      comment:
        "Funktion-One sound punch was crisp without being screechy. Loved the crew matchmaking on VibeUp — met 3 awesome people!",
      date: "Sep 2026",
    },
    {
      id: "r3",
      authorName: "Akash D.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      rating: 4.5,
      verifiedAttendee: true,
      comment:
        "Great lighting and cold drinks. Entry was super quick with the VibeUp QR code. Will definitely attend the next edition.",
      date: "Aug 2026",
    },
  ],
};

export const relatedEventsList = [
  {
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    category: "HOUSE",
    title: "Deep House Odyssey Vol. 4",
    date: "Fri, 09 Oct",
    time: "9:30 PM",
    venue: "Fandom",
    area: "Koramangala",
    price: "₹699",
    goingCount: 310,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Cyberpunk Neon Warehouse",
    date: "Sat, 10 Oct",
    time: "10:30 PM",
    venue: "Pebble Lounge",
    area: "Sadashivanagar",
    price: "₹1,199",
    goingCount: 420,
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    title: "Desi Nights Club Edition",
    date: "Sat, 10 Oct",
    time: "9:00 PM",
    venue: "Toit Brewpub",
    area: "Indiranagar",
    price: "₹599",
    goingCount: 380,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "LIVE MUSIC",
    title: "Parvaaz Acoustic Live",
    date: "Sun, 11 Oct",
    time: "7:00 PM",
    venue: "Phoenix Marketcity",
    area: "Whitefield",
    price: "₹1,299",
    goingCount: 650,
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

export function getEventById(id: string): DetailedEvent {
  // If the id matches default or any other id, return rich event data customized to that id
  return {
    ...defaultEvent,
    id: id || defaultEvent.id,
  };
}
