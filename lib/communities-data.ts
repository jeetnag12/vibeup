export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  location: string;
  area?: string;
  category: "MUSIC" | "NIGHTLIFE" | "CITY" | "GENRE" | "CLUBS" | "EVENTS" | "SOCIAL";
  genres: string[];
  memberCount: number;
  memberCountDisplay: string;
  activityCount: string;
  tags: string[];
  members: CommunityMember[];
  featured?: boolean;
  trending?: boolean;
  isNearYou?: boolean;
  interest: "TECHNO" | "HOUSE" | "HIP-HOP" | "AFRO" | "BOLLYWOOD" | "LIVE MUSIC" | "INDIE" | "FESTIVALS";
  upcomingEventsCount?: number;
}

export const communityCategories = [
  "ALL",
  "MUSIC",
  "NIGHTLIFE",
  "CITY",
  "GENRE",
  "CLUBS",
  "EVENTS",
  "SOCIAL",
] as const;

export type CommunityCategoryFilter = (typeof communityCategories)[number];

export const interestTabs = [
  "TECHNO",
  "HOUSE",
  "HIP-HOP",
  "AFRO",
  "BOLLYWOOD",
  "LIVE MUSIC",
  "INDIE",
  "FESTIVALS",
] as const;

export type InterestTab = (typeof interestTabs)[number];

const sampleAvatars: CommunityMember[] = [
  {
    id: "m1",
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
  },
  {
    id: "m2",
    name: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
  },
  {
    id: "m3",
    name: "Rohan Iyer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
  },
  {
    id: "m4",
    name: "Ananya Roy",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
  },
  {
    id: "m5",
    name: "Karan Verma",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
  },
];

export const allCommunitiesData: Community[] = [
  {
    id: "bangalore-techno-society",
    name: "BANGALORE TECHNO SOCIETY",
    description: "Underground techno lovers discovering the city's darker side. Weekly warehouse pre-drinks, resident DJ drops, and front-row crew meetups.",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    location: "Bangalore",
    area: "Koramangala & CBD",
    category: "MUSIC",
    genres: ["Techno", "Industrial", "Acid"],
    memberCount: 2840,
    memberCountDisplay: "2.8K",
    activityCount: "🔥 ACTIVE TODAY",
    tags: ["Underground", "Warehouse", "Funktion-One", "Dark Room"],
    members: sampleAvatars,
    featured: true,
    trending: true,
    interest: "TECHNO",
    upcomingEventsCount: 6,
  },
  {
    id: "house-heads-bangalore",
    name: "HOUSE HEADS BANGALORE",
    description: "Deep house, melodic, and organic soundscapes. We meet for Sunday sunset sessions and intimate acoustic listening rooms across Indiranagar & CBD.",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    location: "Indiranagar, Bangalore",
    area: "Indiranagar",
    category: "MUSIC",
    genres: ["Deep House", "Melodic", "House"],
    memberCount: 3120,
    memberCountDisplay: "3.1K",
    activityCount: "94 PEOPLE ACTIVE",
    tags: ["Sunset Sessions", "Groove", "Melodic Vibes", "Rooftops"],
    members: sampleAvatars,
    featured: true,
    trending: true,
    interest: "HOUSE",
    upcomingEventsCount: 5,
  },
  {
    id: "indiranagar-night-owls",
    name: "INDIRANAGAR NIGHT OWLS",
    description: "The premier social network for East Bangalore partygoers hopping between 100ft Road brewpubs, cocktail labs, and late night dancefloors.",
    coverImage: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=800&auto=format&fit=crop",
    location: "Indiranagar, Bangalore",
    area: "Indiranagar",
    category: "NIGHTLIFE",
    genres: ["Commercial", "Hip-hop", "House"],
    memberCount: 4500,
    memberCountDisplay: "4.5K",
    activityCount: "142 PEOPLE ACTIVE",
    tags: ["Pre-drinks", "Craft Beer", "Weekend Party", "100ft Road"],
    members: sampleAvatars,
    featured: true,
    trending: true,
    isNearYou: true,
    interest: "HOUSE",
    upcomingEventsCount: 7,
  },
  {
    id: "underground-bangalore",
    name: "UNDERGROUND BANGALORE",
    description: "Strictly sub-bass, vinyl-only sessions, and after-hours raves. Zero commercial fluff, pure audio curation and respectful dancefloor etiquette.",
    coverImage: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    location: "CBD, Bangalore",
    area: "Central Bangalore",
    category: "GENRE",
    genres: ["Techno", "Bass", "Experimental"],
    memberCount: 2150,
    memberCountDisplay: "2.1K",
    activityCount: "56 JOINED THIS WEEK",
    tags: ["Sub-Bass", "Audiophiles", "Vinyl Only", "After-hours"],
    members: sampleAvatars,
    featured: true,
    trending: true,
    interest: "TECHNO",
    upcomingEventsCount: 4,
  },
  {
    id: "koramangala-party-people",
    name: "KORAMANGALA PARTY PEOPLE",
    description: "From 4th Block dive bars to heavy weekend bass stages at Fandom & XYZ. Your gateway to Koramangala's bustling tech and nightlife crowd.",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    location: "Koramangala, Bangalore",
    area: "Koramangala",
    category: "CITY",
    genres: ["Electronic", "Hip-hop", "Bollywood"],
    memberCount: 5200,
    memberCountDisplay: "5.2K",
    activityCount: "🔥 ACTIVE TODAY",
    tags: ["Bar Hopping", "Techies After Dark", "Weekend Raves"],
    members: sampleAvatars,
    trending: true,
    isNearYou: true,
    interest: "HIP-HOP",
    upcomingEventsCount: 8,
  },
  {
    id: "bangalore-live-music-society",
    name: "BANGALORE LIVE MUSIC SOCIETY",
    description: "Gig-goers, indie band discoverers, and acoustic session regulars attending live showcases at The Humming Tree, Fandom, and outdoor arenas.",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    location: "Bangalore",
    area: "Indiranagar & Koramangala",
    category: "MUSIC",
    genres: ["Live Music", "Indie Rock", "Acoustic"],
    memberCount: 3800,
    memberCountDisplay: "3.8K",
    activityCount: "82 PEOPLE ACTIVE",
    tags: ["Live Bands", "Acoustic", "Indie Culture", "Concerts"],
    members: sampleAvatars,
    isNearYou: true,
    interest: "LIVE MUSIC",
    upcomingEventsCount: 6,
  },
  {
    id: "afro-house-india",
    name: "AFRO HOUSE INDIA",
    description: "Pioneering African house rhythms, amapiano, and tribal percussion nights in Bangalore. High-energy rhythm and dance-first community mindset.",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    location: "CBD, Bangalore",
    area: "MG Road & CBD",
    category: "GENRE",
    genres: ["Afro House", "Amapiano", "Tribal"],
    memberCount: 1920,
    memberCountDisplay: "1.9K",
    activityCount: "38 JOINED THIS WEEK",
    tags: ["Amapiano", "Tribal Beats", "Afro Tech", "Dance Floor"],
    members: sampleAvatars,
    trending: true,
    interest: "AFRO",
    upcomingEventsCount: 3,
  },
  {
    id: "whitefield-weekend-crew",
    name: "WHITEFIELD WEEKEND CREW",
    description: "East Bangalore crew meeting up for rooftop sessions, ITPL sundowners, and weekend club carpools across the city.",
    coverImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    location: "Whitefield, Bangalore",
    area: "Whitefield",
    category: "CITY",
    genres: ["Commercial", "Electronic", "Rooftop"],
    memberCount: 1650,
    memberCountDisplay: "1.6K",
    activityCount: "35 PEOPLE ACTIVE",
    tags: ["Whitefield", "Sundowners", "Weekend Carpools"],
    members: sampleAvatars,
    isNearYou: true,
    interest: "FESTIVALS",
    upcomingEventsCount: 3,
  },
  {
    id: "desi-beat-district",
    name: "DESI BEAT DISTRICT",
    description: "The ultimate Bollywood and Punjabi clubbing community. High voltage commercial nights, VIP tables, and non-stop dance anthems.",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    location: "Indiranagar, Bangalore",
    area: "Indiranagar & CBD",
    category: "EVENTS",
    genres: ["Bollywood", "Commercial", "Desi Hip-Hop"],
    memberCount: 4100,
    memberCountDisplay: "4.1K",
    activityCount: "110 PEOPLE ACTIVE",
    tags: ["Bollywood Nights", "High Energy", "Weekend Anthems"],
    members: sampleAvatars,
    trending: true,
    interest: "BOLLYWOOD",
    upcomingEventsCount: 5,
  },
  {
    id: "808-bassline-cypher",
    name: "808 & BASSLINE CYPHER",
    description: "Boom bap, trap, UK drill, and hip-hop culture. Open mics, producer battles, and weekend cyphers across Bangalore underground spaces.",
    coverImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    location: "Koramangala, Bangalore",
    area: "Koramangala",
    category: "MUSIC",
    genres: ["Hip-Hop", "Trap", "UK Drill"],
    memberCount: 2350,
    memberCountDisplay: "2.3K",
    activityCount: "44 JOINED THIS WEEK",
    tags: ["Cyphers", "Trap", "Hip-Hop", "Bass Culture"],
    members: sampleAvatars,
    interest: "HIP-HOP",
    upcomingEventsCount: 4,
  },
  {
    id: "bangalore-festival-chasers",
    name: "BANGALORE FESTIVAL CHASERS",
    description: "Multi-day music festival enthusiasts grouping up for tickets, travel, camp setups, and festival stage meetups across India.",
    coverImage: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    location: "Bangalore",
    area: "Pan-Bangalore",
    category: "EVENTS",
    genres: ["Electronic", "Techno", "Festivals"],
    memberCount: 3400,
    memberCountDisplay: "3.4K",
    activityCount: "🔥 ACTIVE TODAY",
    tags: ["Festival Squads", "Roadtrips", "Stage Meetups"],
    members: sampleAvatars,
    interest: "FESTIVALS",
    upcomingEventsCount: 4,
  },
  {
    id: "indie-postrock-collective",
    name: "INDIE & POST-ROCK COLLECTIVE",
    description: "Intimate vinyl listening parties, cassette swaps, and small gig meetups for shoegaze, math rock, and dream pop devotees.",
    coverImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    location: "JP Nagar, Bangalore",
    area: "JP Nagar & Jayanagar",
    category: "SOCIAL",
    genres: ["Indie", "Post-Rock", "Shoegaze"],
    memberCount: 1420,
    memberCountDisplay: "1.4K",
    activityCount: "26 PEOPLE ACTIVE",
    tags: ["Vinyl", "Listening Rooms", "Indie"],
    members: sampleAvatars,
    interest: "INDIE",
    upcomingEventsCount: 2,
  },
];

export function getCommunityById(id: string): Community | undefined {
  return allCommunitiesData.find((c) => c.id === id);
}
