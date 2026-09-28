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
  vibeMatch?: number;
  area: string;
  mutualConnections: number;
  mutualDetails?: string;
  isFollowing?: boolean;
  following?: boolean;
  crewStatus?: "looking" | "in_crew" | "none";
  crewName?: string;
  joinedRecently?: boolean;
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
  area?: string;
  musicTaste?: string;
  mutualCount?: number;
  mutualDetails?: string;
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
      vibeMatch: 92,
      area: "Indiranagar",
      mutualConnections: 3,
      mutualDetails: "Attended 4 events with you",
      isFollowing: false,
      crewStatus: "in_crew",
      crewName: "Saturday Techno Crew",
    },
    {
      id: "a2",
      name: "Maya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      bio: "Techno explorer, film photography enthusiast & nocturnal vibe seeker.",
      interests: ["Techno", "House", "Photography"],
      musicTaste: "Industrial Techno · Acid",
      vibeScore: 82,
      vibeMatch: 94,
      area: "Koramangala",
      mutualConnections: 5,
      mutualDetails: "Follows 2 clubs you follow",
      isFollowing: false,
      crewStatus: "looking",
    },
    {
      id: "a3",
      name: "Ananya Rao",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
      bio: "Product designer by day, underground melodic techno fan by night.",
      interests: ["Melodic", "Vinyl", "Design"],
      musicTaste: "Afterlife · Innervisions",
      vibeScore: 92,
      vibeMatch: 95,
      area: "Indiranagar",
      mutualConnections: 4,
      mutualDetails: "Attended 3 same underground sessions",
      isFollowing: true,
      crewStatus: "in_crew",
      crewName: "Saturday Techno Crew",
    },
    {
      id: "a4",
      name: "Kabir Mehta",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
      bio: "Bangalore native. Always in the front row for heavy basslines.",
      interests: ["Industrial", "Craft Beer", "Gym"],
      musicTaste: "Hard Techno · Peak Time",
      vibeScore: 84,
      vibeMatch: 84,
      area: "HSR Layout",
      mutualConnections: 2,
      mutualDetails: "2 mutuals",
      isFollowing: false,
      crewStatus: "looking",
    },
    {
      id: "a5",
      name: "Rhea Nair",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
      bio: "Looking for people to split an Uber from Indiranagar!",
      interests: ["House", "Deep Tech", "Fashion"],
      musicTaste: "Deep House · Minimal",
      vibeScore: 89,
      vibeMatch: 91,
      area: "Indiranagar",
      mutualConnections: 3,
      mutualDetails: "3 mutuals",
      isFollowing: true,
      crewStatus: "looking",
    },
    {
      id: "a6",
      name: "Dev Patel",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=160&auto=format&fit=crop",
      bio: "DJing on weekends. Love chatting about audio equipment and sound design.",
      interests: ["Audio Tech", "Synthesizers", "Coffee"],
      musicTaste: "Detroit Techno · Electro",
      vibeScore: 95,
      vibeMatch: 88,
      area: "Lavelle Road",
      mutualConnections: 5,
      mutualDetails: "Follows 3 clubs you follow",
      isFollowing: false,
      crewStatus: "in_crew",
      crewName: "Koramangala Crew",
    },
    {
      id: "a7",
      name: "Meera Sen",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=160&auto=format&fit=crop",
      bio: "Solo clubber who loves meeting spontaneous crowds on the dancefloor.",
      interests: ["Dance", "Cocktails", "Indie"],
      musicTaste: "Progressive House · Melodic",
      vibeScore: 88,
      vibeMatch: 89,
      area: "Koramangala",
      mutualConnections: 4,
      mutualDetails: "Same community: Bangalore Techno",
      isFollowing: false,
      crewStatus: "looking",
    },
    {
      id: "a8",
      name: "Nikhil Reddy",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=160&auto=format&fit=crop",
      bio: "Warehouse purist. Hardware synth collector & electronic music writer.",
      interests: ["Modular Synth", "Industrial", "Acid"],
      musicTaste: "Industrial · Berlin Sound",
      vibeScore: 94,
      vibeMatch: 96,
      area: "Indiranagar",
      mutualConnections: 5,
      mutualDetails: "Same community: Bangalore Techno",
      isFollowing: true,
      crewStatus: "in_crew",
      crewName: "Saturday Techno Crew",
    },
    {
      id: "a9",
      name: "Kunal Varma",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
      bio: "Graphic designer & minimal selector. Searching for good vinyl talk.",
      interests: ["Minimal", "Design", "Vinyl"],
      musicTaste: "Minimal Techno · Dub",
      vibeScore: 89,
      vibeMatch: 93,
      area: "Indiranagar",
      mutualConnections: 3,
      mutualDetails: "Follows 3 artists you follow",
      isFollowing: false,
      crewStatus: "looking",
    },
    {
      id: "a10",
      name: "Vikram Singhania",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=160&auto=format&fit=crop",
      bio: "Founder in Koramangala. Always unwinding to hypnotic beats.",
      interests: ["Startups", "Techno", "Billiards"],
      musicTaste: "Dub Techno · Ambient",
      vibeScore: 81,
      vibeMatch: 78,
      area: "Koramangala",
      mutualConnections: 1,
      mutualDetails: "1 mutual connection",
      isFollowing: false,
      crewStatus: "none",
      joinedRecently: true,
    },
    {
      id: "a11",
      name: "Tara D'souza",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=160&auto=format&fit=crop",
      bio: "First time at XYZ Club! Excited for the sound system and friendly crowd.",
      interests: ["Live Gigs", "Travel", "Art"],
      musicTaste: "Tech House · Afro House",
      vibeScore: 90,
      vibeMatch: 86,
      area: "Whitefield",
      mutualConnections: 2,
      mutualDetails: "2 mutual connections",
      isFollowing: false,
      crewStatus: "looking",
      joinedRecently: true,
    },
    {
      id: "a12",
      name: "Rohan Verma",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=160&auto=format&fit=crop",
      bio: "Craft beer & synth fanatic. Organizing regular Koramangala meetups.",
      interests: ["Tech House", "Synth", "Craft Beer"],
      musicTaste: "Tech House · Melodic",
      vibeScore: 88,
      vibeMatch: 91,
      area: "Koramangala",
      mutualConnections: 3,
      mutualDetails: "Both active in Koramangala crews",
      isFollowing: false,
      crewStatus: "in_crew",
      crewName: "Koramangala Crew",
    },
    {
      id: "a13",
      name: "Zoya Khan",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      bio: "Night visual artist & melodic enthusiast. Catch me near the lighting booth.",
      interests: ["Melodic Techno", "Photography", "Late Night"],
      musicTaste: "Melodic House · Deep Tech",
      vibeScore: 91,
      vibeMatch: 89,
      area: "Indiranagar",
      mutualConnections: 4,
      mutualDetails: "Attended 2 events with you",
      isFollowing: false,
      crewStatus: "looking",
    },
    {
      id: "a14",
      name: "Siddharth Roy",
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=160&auto=format&fit=crop",
      bio: "Vinyl digger & coffee roaster. Looking for good techno conversations.",
      interests: ["Vinyl Digging", "Bass", "Design"],
      musicTaste: "Dub Techno · Deep Tech",
      vibeScore: 85,
      vibeMatch: 82,
      area: "HSR Layout",
      mutualConnections: 1,
      mutualDetails: "Joined recently",
      isFollowing: false,
      crewStatus: "none",
      joinedRecently: true,
    },
    {
      id: "a15",
      name: "Priya Krishnan",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=160&auto=format&fit=crop",
      bio: "Architect & electronic music lover. Enjoying Bangalore's underground scene.",
      interests: ["Deep Tech", "Electronic", "Architecture"],
      musicTaste: "Deep Tech · Melodic",
      vibeScore: 91,
      vibeMatch: 90,
      area: "Richmond Town",
      mutualConnections: 4,
      mutualDetails: "Follows 2 clubs you follow",
      isFollowing: true,
      crewStatus: "in_crew",
      crewName: "Saturday Techno Crew",
    },
    {
      id: "a16",
      name: "Alisha Joseph",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=160&auto=format&fit=crop",
      bio: "Festival hopper & house lover. Heading solo, let's connect!",
      interests: ["House", "Festivals", "Travel"],
      musicTaste: "Electro House · Peak Time",
      vibeScore: 86,
      vibeMatch: 87,
      area: "Koramangala",
      mutualConnections: 3,
      mutualDetails: "3 mutual connections",
      isFollowing: false,
      crewStatus: "looking",
      joinedRecently: true,
    },
  ],
  vibeMatches: [
    {
      id: "vm1",
      name: "Nikhil Reddy",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 96,
      matchTags: ["Techno", "Modular Synth", "Indiranagar"],
      reason: "Same community: Bangalore Techno · High music synergy",
      vibeScore: 94,
      area: "INDIRANAGAR",
      musicTaste: "TECHNO · MODULAR · ACID",
      mutualCount: 5,
      mutualDetails: "Same community: Bangalore Techno",
      isFollowing: true,
    },
    {
      id: "vm2",
      name: "Ananya Rao",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 95,
      matchTags: ["Melodic", "Vinyl", "Indiranagar"],
      reason: "Attended 3 same underground sessions & mutual vinyl circles.",
      vibeScore: 92,
      area: "INDIRANAGAR",
      musicTaste: "MELODIC TECHNO · DEEP HOUSE",
      mutualCount: 4,
      mutualDetails: "Attended 3 same underground sessions",
      isFollowing: true,
    },
    {
      id: "vm3",
      name: "Maya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 94,
      matchTags: ["Industrial", "Photography", "Koramangala"],
      reason: "Follows 2 clubs you follow · Shared interest in underground warehouse music.",
      vibeScore: 82,
      area: "KORAMANGALA",
      musicTaste: "TECHNO · HOUSE · PHOTOGRAPHY",
      mutualCount: 5,
      mutualDetails: "Follows 2 clubs you follow",
      isFollowing: false,
    },
    {
      id: "vm4",
      name: "Kunal Varma",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 93,
      matchTags: ["Minimal", "Design", "Indiranagar"],
      reason: "Follows 3 artists you follow · Active in Bangalore electronic art scenes.",
      vibeScore: 89,
      area: "INDIRANAGAR",
      musicTaste: "MINIMAL TECHNO · DUB",
      mutualCount: 3,
      mutualDetails: "Follows 3 artists you follow",
      isFollowing: false,
    },
    {
      id: "vm5",
      name: "Aarav",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 92,
      matchTags: ["Techno", "House", "Indiranagar"],
      reason: "Attended 4 events with you · Both active in Bangalore Techno community.",
      vibeScore: 87,
      area: "INDIRANAGAR",
      musicTaste: "TECHNO · HOUSE · ELECTRONIC",
      mutualCount: 3,
      mutualDetails: "3 MUTUAL CONNECTIONS",
      isFollowing: false,
    },
    {
      id: "vm6",
      name: "Rohan Verma",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=160&auto=format&fit=crop",
      matchPercentage: 91,
      matchTags: ["Tech House", "Synth", "Koramangala"],
      reason: "Both active in Koramangala crews and similar weekend nightlife timings.",
      vibeScore: 88,
      area: "KORAMANGALA",
      musicTaste: "TECH HOUSE · SYNTH",
      mutualCount: 3,
      mutualDetails: "Both active in Koramangala crews",
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
