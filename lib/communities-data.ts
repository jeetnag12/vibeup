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

export interface DetailedMember {
  id: string;
  name: string;
  avatar: string;
  vibeMatch: number;
  interests: string[];
  area?: string;
  bio?: string;
  role?: string;
}

export interface CommunityActivity {
  id: string;
  userName: string;
  avatar: string;
  action: string;
  target?: string;
  timeAgo: string;
}

export interface CommunityDiscussion {
  id: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  preview: string;
  timeAgo: string;
  replyCount: number;
}

export interface CommunityPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  area: string;
  price: string;
  goingCount: number;
  membersGoing: number;
  savedCount: number;
  crewsForming: number;
  image: string;
  avatars: string[];
}

export interface DetailedCommunity extends Community {
  activeToday: number;
  eventsThisMonth: number;
  aboutText: string;
  detailedMembers: DetailedMember[];
  vibeMatchMembers: DetailedMember[];
  activities: CommunityActivity[];
  discussions: CommunityDiscussion[];
  photos: CommunityPhoto[];
  upcomingEvents: CommunityEvent[];
  relatedCommunities: Community[];
}

const defaultDetailedMembersPool: DetailedMember[] = [
  {
    id: "m1",
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
    vibeMatch: 96,
    interests: ["Techno", "Warehouse", "Synthesizers"],
    area: "Koramangala",
    bio: "Analog synth enthusiast & vinyl digger. Always front left near the subs.",
    role: "Community Lead",
  },
  {
    id: "m2",
    name: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
    vibeMatch: 92,
    interests: ["Deep House", "Audiophile", "Sunset Sets"],
    area: "Indiranagar",
    bio: "Music curator and weekend party explorer. Seeking melodic and hypnotic sets.",
    role: "Host",
  },
  {
    id: "m3",
    name: "Rohan Iyer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
    vibeMatch: 89,
    interests: ["Industrial", "Acid", "Dark Techno"],
    area: "CBD",
    bio: "Fast tempos, Berlin underground vibes, and late night espresso.",
  },
  {
    id: "m4",
    name: "Ananya Roy",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
    vibeMatch: 87,
    interests: ["Melodic House", "Festivals", "Live Vocals"],
    area: "HSR Layout",
    bio: "Festival chaser & crew organizer. Let's catch the next warehouse drop together.",
  },
  {
    id: "m5",
    name: "Karan Verma",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
    vibeMatch: 84,
    interests: ["Boiler Room", "Tech House", "Late Night"],
    area: "Whitefield",
    bio: "Electronic music producer. Passionate about Funktion-One acoustics.",
  },
  {
    id: "m6",
    name: "Priya Nair",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
    vibeMatch: 81,
    interests: ["Afro Tech", "Groove", "Dancefloor"],
    area: "Indiranagar",
    bio: "Dancing until the lights come up. Strict no-screen dancefloor etiquette.",
  },
];

const defaultCommunityPhotos: CommunityPhoto[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    caption: "Peak time boiler-room vibes at the Koramangala warehouse session",
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    caption: "Dynamic laser array and fog visuals during midnight resident showcase",
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    caption: "Subterranean acoustic chamber featuring custom sound design",
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    caption: "Front row crowd energy when the main bassline dropped at 1:00 AM",
  },
  {
    id: "p5",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    caption: "Pre-event rooftop meetup with community members sharing track IDs",
  },
  {
    id: "p6",
    url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    caption: "Open air amphitheater gathering under the stars in Palace Grounds",
  },
];

const defaultUpcomingEventsPool: CommunityEvent[] = [
  {
    id: "cyberpunk-neon-warehouse",
    title: "CYBERPUNK NEON WAREHOUSE",
    category: "TECHNO",
    date: "Fri, 16 Oct",
    time: "10:00 PM – 3:00 AM",
    venue: "Basement Vault",
    area: "CBD",
    price: "₹899",
    goingCount: 420,
    membersGoing: 18,
    savedCount: 42,
    crewsForming: 6,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "saturday-techno-night",
    title: "SATURDAY TECHNO ODYSSEY",
    category: "TECHNO",
    date: "Sat, 17 Oct",
    time: "9:30 PM – 2:30 AM",
    venue: "The Warehouse Project",
    area: "Koramangala",
    price: "₹799",
    goingCount: 360,
    membersGoing: 24,
    savedCount: 56,
    crewsForming: 8,
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "deep-house-odyssey-vol-4",
    title: "DEEP HOUSE ODYSSEY VOL. 4",
    category: "HOUSE",
    date: "Fri, 23 Oct",
    time: "8:30 PM – 1:30 AM",
    venue: "Rooftop Arena",
    area: "Indiranagar",
    price: "₹699",
    goingCount: 295,
    membersGoing: 12,
    savedCount: 32,
    crewsForming: 5,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "after-dark-residents-night",
    title: "AFTER DARK: SUBTERRANEAN SESSIONS",
    category: "UNDERGROUND",
    date: "Sat, 24 Oct",
    time: "10:30 PM – 3:30 AM",
    venue: "Vault 42",
    area: "CBD",
    price: "₹999",
    goingCount: 380,
    membersGoing: 21,
    savedCount: 49,
    crewsForming: 7,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

export function getDetailedCommunityById(id: string): DetailedCommunity {
  const normalizedId = (id || "").toLowerCase().trim();
  const base =
    allCommunitiesData.find(
      (c) =>
        c.id.toLowerCase() === normalizedId ||
        c.id.replace(/-/g, "") === normalizedId.replace(/-/g, "")
    ) || {
      id: normalizedId || "bangalore-techno-society",
      name: (normalizedId || "bangalore-techno-society")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      description:
        "Underground techno lovers discovering the city's darker side. Weekly warehouse pre-drinks, resident DJ drops, and front-row crew meetups.",
      coverImage:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      location: "Bangalore",
      area: "Koramangala & CBD",
      category: "MUSIC" as const,
      genres: ["Techno", "House", "Underground"],
      memberCount: 2840,
      memberCountDisplay: "2.8K",
      activityCount: "🔥 ACTIVE TODAY",
      tags: [
        "TECHNO",
        "HOUSE",
        "UNDERGROUND",
        "DANCE MUSIC",
        "NIGHTLIFE",
        "BANGALORE",
        "LATE NIGHT",
      ],
      members: sampleAvatars,
      featured: true,
      trending: true,
      interest: "TECHNO" as const,
      upcomingEventsCount: 24,
    };

  // Curated editorial description
  const aboutText =
    `A community for Bangalore's ${base.genres[0].toLowerCase()} crowd. Discover underground parties, share events, meet people with similar music taste and build your weekend crew. We host weekly pre-drinks, share unreleased track IDs, and organize dedicated front-row dancefloor squads across the city's best sound spaces.`;

  // Filter 3-4 related communities
  const relatedCommunities = allCommunitiesData
    .filter((c) => c.id !== base.id)
    .slice(0, 4);

  // Curated activity feed
  const activities: CommunityActivity[] = [
    {
      id: "act-1",
      userName: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
      action: "joined the community",
      timeAgo: "12m ago",
    },
    {
      id: "act-2",
      userName: "Priya Nair",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
      action: "saved",
      target: "Friday Techno Night",
      timeAgo: "34m ago",
    },
    {
      id: "act-3",
      userName: "Vikram & 4 members",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
      action: "joined a crew for",
      target: "Saturday Rave",
      timeAgo: "2h ago",
    },
    {
      id: "act-4",
      userName: "Rahul Sen",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
      action: "shared an event to the community",
      target: "Cyberpunk Neon Warehouse",
      timeAgo: "4h ago",
    },
    {
      id: "act-5",
      userName: "Ananya Roy",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
      action: "started a topic in",
      target: "Community Talk",
      timeAgo: "6h ago",
    },
  ];

  // Curated discussion preview cards
  const discussions: CommunityDiscussion[] = [
    {
      id: "disc-1",
      authorName: "Devansh Roy",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
      title: "Best techno events this weekend?",
      preview:
        "Looking for warehouse venues with minimal commercial fluff and serious acoustic engineering. Who's heading out?",
      timeAgo: "2 hours ago",
      replyCount: 14,
    },
    {
      id: "disc-2",
      authorName: "Tara Kapoor",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      title: "Anyone going to the new Koramangala warehouse party?",
      preview:
        "Heading there with two friends around 10:30 PM. Would love to link up with fellow BTS crew members before entry.",
      timeAgo: "5 hours ago",
      replyCount: 8,
    },
    {
      id: "disc-3",
      authorName: "Kabir Sen",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
      title: "Looking for a crew for Saturday.",
      preview:
        "First time checking out Subterranean Vault solo, let's form a quick pre-drinks crew in Indiranagar!",
      timeAgo: "1 day ago",
      replyCount: 19,
    },
    {
      id: "disc-4",
      authorName: "Sanya Mathur",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
      title: "What's the door policy like at Pebble lately?",
      preview:
        "Heard guestlist closes strict at 9:30 PM. Has anyone entered past 10 PM recently without delays?",
      timeAgo: "2 days ago",
      replyCount: 11,
    },
  ];

  return {
    ...base,
    activeToday: 48,
    eventsThisMonth: 24,
    aboutText,
    detailedMembers: defaultDetailedMembersPool,
    vibeMatchMembers: defaultDetailedMembersPool.slice(0, 3),
    activities,
    discussions,
    photos: defaultCommunityPhotos,
    upcomingEvents: defaultUpcomingEventsPool,
    relatedCommunities,
  };
}

