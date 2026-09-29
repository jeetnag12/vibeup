export interface NextEventSummary {
  id: string;
  title: string;
  dateDisplay: string;
  genre: string;
  startingPrice: string;
}

export interface ClubFollower {
  id: string;
  name: string;
  avatar: string;
  vibeScore?: number;
}

export interface ClubPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface ClubReview {
  id: string;
  authorName: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  tag?: string;
}

export interface ClubCommunity {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  memberCountDisplay: string;
  image: string;
}

export interface ClubEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  area: string;
  price: string;
  goingCount: number;
  category: string;
  image: string;
  avatars: string[];
  timeframe: "this-week" | "this-month";
}

export interface Club {
  id: string;
  name: string;
  image: string;
  area: string;
  location?: string;
  genres: string[];
  rating?: number;
  followers: number;
  followersDisplay: string;
  upcomingEventsCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  vibeTags?: string[];
  socialSignal?: string;
  openTonight?: boolean;
  description?: string;
  about?: string;
  clubType?: string;
  address?: string;
  hours?: string;
  entryRule?: string;
  nextEvent?: NextEventSummary;
  upcomingEvents?: ClubEventItem[];
  followersList?: ClubFollower[];
  photos?: ClubPhoto[];
  reviews?: ClubReview[];
  community?: ClubCommunity;
}

export interface VibeCategory {
  id: string;
  title: string;
  subtitle: string;
  genres: string[];
  image: string;
  badge: string;
}

export const vibeCategories: VibeCategory[] = [
  {
    id: "underground",
    title: "UNDERGROUND",
    subtitle: "Techno · House · Experimental",
    genres: ["Techno", "House", "Electronic"],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    badge: "HYPNOTIC & RAW",
  },
  {
    id: "big-energy",
    title: "BIG ENERGY",
    subtitle: "Commercial · Bollywood · Mainstream",
    genres: ["Commercial", "Bollywood", "Hip-hop"],
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    badge: "HIGH VOLTAGE",
  },
  {
    id: "rooftop",
    title: "ROOFTOP",
    subtitle: "Chill · Sunset · Cocktails",
    genres: ["Rooftop", "Lounge", "House"],
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    badge: "SKYLINE VIBES",
  },
  {
    id: "live",
    title: "LIVE",
    subtitle: "Bands · Artists · Concerts",
    genres: ["Live Music", "Indie", "Electronic"],
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    badge: "STAGE & ACOUSTIC",
  },
  {
    id: "late-night",
    title: "LATE NIGHT",
    subtitle: "Electronic · After-hours",
    genres: ["Techno", "Electronic", "House"],
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    badge: "PAST 1:00 AM",
  },
  {
    id: "intimate",
    title: "INTIMATE",
    subtitle: "Lounge · Date Night · Social",
    genres: ["Lounge", "Rooftop", "Casual"],
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop",
    badge: "DEEP CHAT & SIP",
  },
];

export const allClubsData: Club[] = [
  {
    id: "xyz-club",
    name: "XYZ CLUB",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
    area: "Koramangala",
    location: "Koramangala 4th Block",
    genres: ["Techno", "House", "Electronic"],
    rating: 4.8,
    followers: 14200,
    followersDisplay: "14.2K",
    upcomingEventsCount: 5,
    isTrending: true,
    openTonight: true,
    socialSignal: "23 people you follow are interested",
    description: "Bangalore's premier underground electronic room. Funktion-One sound, warehouse aesthetics, and strict music curation.",
    address: "80 Feet Road, 4th Block, Koramangala, Bengaluru",
    hours: "8:00 PM – 2:00 AM",
    entryRule: "Couples & Stags with prior ticket/guestlist",
    vibeTags: ["Warehouse", "Dark Room", "Funktion-One", "Front Row Energy"],
    nextEvent: {
      id: "saturday-techno-night",
      title: "SATURDAY TECHNO NIGHT",
      dateDisplay: "SAT · 03 OCT",
      genre: "Techno · House",
      startingPrice: "₹799+",
    },
  },
  {
    id: "the-black-box",
    name: "THE BLACK BOX",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    area: "Koramangala",
    location: "Koramangala 5th Block",
    genres: ["Techno", "House"],
    rating: 4.7,
    followers: 12400,
    followersDisplay: "12.4K",
    upcomingEventsCount: 6,
    isTrending: true,
    openTonight: true,
    socialSignal: "18 people you follow are interested",
    description: "An intimate acoustic sanctuary dedicated to deep house, melodic techno, and raw synthesizer performance.",
    address: "5th Block, Jyoti Nivas College Road, Koramangala",
    hours: "9:00 PM – 2:00 AM",
    entryRule: "Music enthusiasts first, reservation recommended",
    vibeTags: ["Intimate", "Deep House", "Audiophile"],
    nextEvent: {
      id: "deep-house-odyssey-vol-4",
      title: "DEEP HOUSE ODYSSEY VOL. 4",
      dateDisplay: "FRI · 09 OCT",
      genre: "Deep House · Melodic",
      startingPrice: "₹499+",
    },
  },
  {
    id: "playboy-club",
    name: "PLAYBOY BEER GARDEN & CLUB",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    area: "Indiranagar",
    location: "100ft Road, Indiranagar",
    genres: ["Commercial", "Hip-hop", "Bollywood"],
    rating: 4.8,
    followers: 18500,
    followersDisplay: "18.5K",
    upcomingEventsCount: 4,
    isTrending: true,
    openTonight: true,
    socialSignal: "12 people you follow visited recently",
    description: "High energy two-tier club on Indiranagar 100ft road with expansive VIP decks and top touring Bollywood/Hip-Hop DJs.",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar",
    hours: "7:00 PM – 1:30 AM",
    entryRule: "Clubwear mandatory, couples policy applies",
    vibeTags: ["High Voltage", "VIP Booths", "Champagne Showers"],
    nextEvent: {
      id: "desi-nights-club-edition",
      title: "DESI NIGHTS CLUB EDITION",
      dateDisplay: "SAT · 10 OCT",
      genre: "Bollywood · Commercial",
      startingPrice: "₹999+",
    },
  },
  {
    id: "the-humming-tree",
    name: "THE HUMMING TREE",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    area: "Indiranagar",
    location: "12th Main, Indiranagar",
    genres: ["Live Music", "Indie", "Electronic"],
    rating: 4.9,
    followers: 24100,
    followersDisplay: "24.1K",
    upcomingEventsCount: 7,
    isTrending: true,
    openTonight: true,
    socialSignal: "31 people you follow follow this club",
    description: "Iconic cultural venue celebrating original live music, indie acts, and experimental electronic showcases under rooftop greenery.",
    address: "949, 12th Main Rd, Doopanahalli, Indiranagar",
    hours: "6:30 PM – 1:00 AM",
    entryRule: "Ticket required for gigs",
    vibeTags: ["Live Bands", "Artisan Cocktails", "Open Air"],
    nextEvent: {
      id: "parvaaz-acoustic-live",
      title: "PARVAAZ ACOUSTIC LIVE",
      dateDisplay: "SUN · 11 OCT",
      genre: "Indie Rock · Live",
      startingPrice: "₹1,199+",
    },
  },
  {
    id: "the-skyye-lounge",
    name: "SKYYE LOUNGE",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    area: "CBD",
    location: "UB City, Vittal Mallya Road",
    genres: ["Rooftop", "Lounge", "Commercial"],
    rating: 4.6,
    followers: 32000,
    followersDisplay: "32K",
    upcomingEventsCount: 3,
    isTrending: true,
    openTonight: true,
    socialSignal: "45 mutual connections have visited",
    description: "16th-floor rooftop lounge with color-shifting glass floors, panoramic city views, and open-air cocktail glamour.",
    address: "16th Floor, UB City, Vittal Mallya Rd, Bengaluru",
    hours: "6:00 PM – 1:00 AM",
    entryRule: "Smart casuals, cover charges at gate",
    vibeTags: ["Skyline Views", "Open Air", "Sundowner Cocktails"],
    nextEvent: {
      id: "skyline-sunset-sessions",
      title: "SKYLINE SUNSET SESSIONS",
      dateDisplay: "SUN · 04 OCT",
      genre: "Melodic House · Sunset",
      startingPrice: "₹1,499+",
    },
  },
  {
    id: "fandom-at-gillys",
    name: "FANDOM AT GILLY'S",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    area: "Koramangala",
    location: "100ft Road, Koramangala",
    genres: ["Electronic", "Hip-hop", "Live Music"],
    rating: 4.7,
    followers: 16800,
    followersDisplay: "16.8K",
    upcomingEventsCount: 5,
    isTrending: false,
    openTonight: true,
    socialSignal: "9 friends visited recently",
    description: "Purpose-built arena stage hosting heavy rock, hip-hop cyphers, and bassline club nights with stadium grade line-array audio.",
    address: "SJR Primus, 1st Floor, 100 Feet Rd, Koramangala",
    hours: "7:00 PM – 1:30 AM",
    entryRule: "Event passes or cover at door",
    vibeTags: ["Heavy Bass", "Arena Stage", "Crowd Surfing"],
    nextEvent: {
      id: "cyberpunk-neon-warehouse",
      title: "CYBERPUNK NEON WAREHOUSE",
      dateDisplay: "FRI · 16 OCT",
      genre: "Synthwave · Techno",
      startingPrice: "₹899+",
    },
  },
  {
    id: "raahi-neo-kitchen",
    name: "RAAHI & AFTER-HOURS",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop",
    area: "MG Road",
    location: "Museum Road, Central Bangalore",
    genres: ["Lounge", "House", "Commercial"],
    rating: 4.5,
    followers: 11200,
    followersDisplay: "11.2K",
    upcomingEventsCount: 3,
    isTrending: false,
    openTonight: true,
    socialSignal: "14 people you follow are interested",
    description: "Sleek neo-modern dining by dusk that transforms into an ambient deep house lounge as night falls.",
    address: "15, State Bank of India Rd, Shanthala Nagar, Ashok Nagar",
    hours: "12:00 PM – 1:00 AM",
    entryRule: "Reservation recommended for lounge tables",
    vibeTags: ["Cocktail Lab", "Dim Lit", "Curated Plates"],
  },
  {
    id: "toit-brewpub",
    name: "TOIT BREWPUB & TAPROOM",
    image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=800&auto=format&fit=crop",
    area: "Indiranagar",
    location: "100ft Road, Indiranagar",
    genres: ["Casual", "Live Music", "Lounge"],
    rating: 4.8,
    followers: 45000,
    followersDisplay: "45K",
    upcomingEventsCount: 2,
    isTrending: false,
    openTonight: true,
    socialSignal: "52 friends have been here",
    description: "Bangalore's quintessential craft beer institution. Bustling weekend crowds, wood-fired pizzas, and pre-party communal tables.",
    address: "298, 100 Feet Rd, Near KFC, Indiranagar",
    hours: "8:30 AM – 1:00 AM",
    entryRule: "Walk-ins welcome, queues common after 8 PM",
    vibeTags: ["Craft Ales", "Pre-drinks Hub", "Lively Banter"],
  },
  {
    id: "pebble-the-jungle-lounge",
    name: "PEBBLE — THE JUNGLE LOUNGE",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    area: "CBD",
    location: "Palace Grounds, Sadashivanagar",
    genres: ["Techno", "Electronic", "House"],
    rating: 4.6,
    followers: 21500,
    followersDisplay: "21.5K",
    upcomingEventsCount: 4,
    isTrending: true,
    openTonight: false,
    socialSignal: "27 people you follow follow this club",
    description: "Legendary outdoor open-air amphitheater set under a canopy of banyan trees for legendary psy-trance, minimal, and techno gatherings.",
    address: "3, Ramana Maharishi Rd, Palace Grounds, Armane Nagar",
    hours: "7:00 PM – 1:00 AM",
    entryRule: "Entry via event passes only",
    vibeTags: ["Banyan Tree", "Open Air Sanctuary", "Under the Stars"],
    nextEvent: {
      id: "jungle-psy-chronicles",
      title: "JUNGLE PSY CHRONICLES",
      dateDisplay: "SAT · 17 OCT",
      genre: "Psytrance · Techno",
      startingPrice: "₹999+",
    },
  },
  {
    id: "sound-garden-hsr",
    name: "THE SOUND GARDEN",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    area: "HSR",
    location: "27th Main, HSR Layout",
    genres: ["Techno", "House", "Hip-hop"],
    rating: 4.6,
    followers: 6800,
    followersDisplay: "6.8K",
    upcomingEventsCount: 4,
    isNew: true,
    openTonight: true,
    socialSignal: "Newly discovered space in HSR Sector 1",
    description: "A fresh acoustic basement featuring curated boiler-room style DJ booths in the center of the dancefloor.",
    address: "27th Main Rd, Sector 1, HSR Layout",
    hours: "8:00 PM – 1:30 AM",
    entryRule: "Door guestlist via VibeUp",
    vibeTags: ["Boiler Room Layout", "Local DJs", "Basement Raves"],
    nextEvent: {
      id: "hsr-boiler-sessions",
      title: "HSR BOILER SESSIONS",
      dateDisplay: "FRI · 23 OCT",
      genre: "Techno · Acid",
      startingPrice: "₹499+",
    },
  },
  {
    id: "neon-attic-whitefield",
    name: "NEON ATTIC",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    area: "Whitefield",
    location: "ITPL Main Road, Whitefield",
    genres: ["Electronic", "Commercial", "Rooftop"],
    rating: 4.5,
    followers: 5400,
    followersDisplay: "5.4K",
    upcomingEventsCount: 3,
    isNew: true,
    openTonight: true,
    socialSignal: "Trending in East Bangalore",
    description: "Whitefield's newest rooftop destination pairing laser displays with progressive electronic and dance-pop sets.",
    address: "4th Floor, Nexus Shantiniketan, Whitefield",
    hours: "6:00 PM – 1:00 AM",
    entryRule: "Smart casuals required",
    vibeTags: ["Laser Grid", "Whitefield Nightlife", "Cocktail Decks"],
  },
  {
    id: "sub-terrace-jp-nagar",
    name: "SUB TERRACE & SOCIALS",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    area: "JP Nagar",
    location: "24th Main, JP Nagar Phase 5",
    genres: ["Lounge", "Live Music", "Casual"],
    rating: 4.5,
    followers: 4900,
    followersDisplay: "4.9K",
    upcomingEventsCount: 2,
    isNew: true,
    openTonight: true,
    socialSignal: "Recently added neighborhood favorite",
    description: "South Bangalore's cozy hidden gem for acoustic weekend jams, vinyl listening nights, and craft beer flights.",
    address: "24th Main Rd, JP Nagar 5th Phase, Bengaluru",
    hours: "5:00 PM – 12:30 AM",
    entryRule: "Walk-ins welcome",
    vibeTags: ["Vinyl Records", "Acoustic Stage", "Craft Beers"],
  },
  {
    id: "loft-38",
    name: "LOFT 38",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    area: "Indiranagar",
    location: "100ft Road, Indiranagar",
    genres: ["Commercial", "Hip-hop", "Bollywood"],
    rating: 4.6,
    followers: 28000,
    followersDisplay: "28K",
    upcomingEventsCount: 4,
    isTrending: true,
    openTonight: true,
    socialSignal: "38 people you follow are interested",
    description: "Sprawling three-level club with high wooden rafters, dynamic stage lighting, and weekend electronic/hip-hop parties.",
    address: "763, 100 Feet Rd, HAL 2nd Stage, Indiranagar",
    hours: "7:00 PM – 1:00 AM",
    entryRule: "Couples & mixed groups preferred",
    vibeTags: ["Multi-Level", "High Ceiling", "VIP Mezzanine"],
  },
  {
    id: "gypsy-warehouse-mg-road",
    name: "THE GYPSY WAREHOUSE",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    area: "MG Road",
    location: "Residency Road, Central Bangalore",
    genres: ["Techno", "House", "Electronic"],
    rating: 4.7,
    followers: 9800,
    followersDisplay: "9.8K",
    upcomingEventsCount: 3,
    isNew: true,
    openTonight: true,
    socialSignal: "9 friends attended opening weekend",
    description: "Industrial warehouse conversion in the heart of CBD. Minimalist lighting, immersive surround subs, and strict no-flash photography policy.",
    address: "Residency Road, Richmond Town, Bengaluru",
    hours: "9:00 PM – 2:00 AM",
    entryRule: "21+ only, prior ticket holders",
    vibeTags: ["No Flash Policy", "Sub-Bass Heavy", "Industrial"],
  },
];

export const areaFilterOptions = [
  "ALL",
  "KORAMANGALA",
  "INDIRANAGAR",
  "HSR",
  "WHITEFIELD",
  "MG ROAD",
  "CBD",
  "JP NAGAR",
];

export const genreFilterOptions = [
  "TECHNO",
  "HOUSE",
  "ELECTRONIC",
  "BOLLYWOOD",
  "LIVE MUSIC",
  "HIP-HOP",
  "COMMERCIAL",
  "ROOFTOP",
  "LOUNGE",
];

export function getClubById(clubId: string): Club | undefined {
  return allClubsData.find((c) => c.id === clubId);
}

const defaultClubPhotos: ClubPhoto[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    caption: "Main floor visual lasers and custom booth architecture",
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    caption: "Peak-time weekend crowd during midnight headliner set",
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1200&auto=format&fit=crop",
    caption: "Artisan cocktail bar & craft mixology lounge deck",
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    caption: "VIP mezzanine terrace with ambient neon illumination",
  },
  {
    id: "p5",
    url: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200&auto=format&fit=crop",
    caption: "Sub-woofer acoustic alcove for audiophiles",
  },
  {
    id: "p6",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
    caption: "Outdoor open-air pre-drinks terrace overlooking Bangalore skyline",
  },
];

const defaultFollowersList: ClubFollower[] = [
  {
    id: "f1",
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
    vibeScore: 92,
  },
  {
    id: "f2",
    name: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
    vibeScore: 88,
  },
  {
    id: "f3",
    name: "Rohan Iyer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
    vibeScore: 95,
  },
  {
    id: "f4",
    name: "Ananya Roy",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
    vibeScore: 91,
  },
  {
    id: "f5",
    name: "Karan Verma",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
    vibeScore: 86,
  },
  {
    id: "f6",
    name: "Sanya Kapoor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
    vibeScore: 89,
  },
];

const sampleEventsPool: ClubEventItem[] = [
  {
    id: "friday-techno-night",
    title: "FRIDAY TECHNO NIGHT",
    date: "Fri, 02 Oct",
    time: "9:00 PM – 2:00 AM",
    venue: "XYZ Club",
    area: "Koramangala",
    price: "₹799",
    goingCount: 284,
    category: "TECHNO",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
    timeframe: "this-week",
  },
  {
    id: "saturday-house-session",
    title: "SATURDAY HOUSE SESSION",
    date: "Sat, 03 Oct",
    time: "8:30 PM – 1:30 AM",
    venue: "Main Stage",
    area: "Bangalore",
    price: "₹899",
    goingCount: 362,
    category: "HOUSE",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    ],
    timeframe: "this-week",
  },
  {
    id: "sunday-sunset-social",
    title: "SUNDAY SUNSET SOCIAL",
    date: "Sun, 04 Oct",
    time: "5:00 PM – 11:30 PM",
    venue: "Rooftop Deck",
    area: "Bangalore",
    price: "₹499",
    goingCount: 195,
    category: "ROOFTOP",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
    timeframe: "this-week",
  },
  {
    id: "bass-culture",
    title: "BASS CULTURE: SUBTERRANEAN",
    date: "Fri, 16 Oct",
    time: "9:30 PM – 2:00 AM",
    venue: "Basement Vault",
    area: "Bangalore",
    price: "₹999",
    goingCount: 310,
    category: "ELECTRONIC",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
    timeframe: "this-month",
  },
  {
    id: "after-dark",
    title: "AFTER DARK: RESIDENTS NIGHT",
    date: "Sat, 24 Oct",
    time: "10:00 PM – 2:30 AM",
    venue: "Club Room",
    area: "Bangalore",
    price: "₹699",
    goingCount: 420,
    category: "TECHNO",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    ],
    timeframe: "this-month",
  },
];

export function getDetailedClubById(clubId: string): Club {
  const normalizedId = clubId.toLowerCase().trim();
  const found = allClubsData.find(
    (c) => c.id.toLowerCase() === normalizedId || c.id.replace(/-/g, "") === normalizedId.replace(/-/g, "")
  );

  const base: Club = found || {
    id: clubId,
    name: clubId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    area: "Indiranagar",
    location: "100ft Road, Indiranagar, Bangalore",
    genres: ["House", "Techno", "Commercial", "Live Music"],
    rating: 4.7,
    followers: 12840,
    followersDisplay: "12.8K",
    upcomingEventsCount: 5,
    isTrending: true,
    openTonight: true,
    socialSignal: "24 people you follow are interested",
    description:
      "One of Bangalore's most recognizable nightlife destinations, known for craft drinks, curated sound and high-energy weekend crowds.",
    address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    hours: "7:00 PM – 1:30 AM",
    entryRule: "Couples & mixed groups preferred. Clubwear recommended.",
    vibeTags: ["House", "Techno", "Dance Floor", "Late Night", "Cocktail Lab", "High Energy"],
  };

  // Club Type mapping
  let derivedType = "BREWERY • LIVE MUSIC • NIGHTLIFE";
  if (base.genres.includes("Techno") || base.genres.includes("Electronic")) {
    derivedType = "UNDERGROUND CLUB • WAREHOUSE • NIGHTLIFE";
  } else if (base.genres.includes("Rooftop") || base.genres.includes("Lounge")) {
    derivedType = "ROOFTOP LOUNGE • COCKTAIL DECK • NIGHTLIFE";
  } else if (base.genres.includes("Live Music")) {
    derivedType = "LIVE MUSIC ARENA • CRAFT BREWERY • NIGHTLIFE";
  }

  // Curated detailed paragraph
  const derivedAbout =
    base.about ||
    `${base.name} stands as an essential pillar of Bangalore's nocturnal landscape. Nestled in ${base.location || base.area}, the space balances world-class acoustic engineering with an electric social atmosphere. Whether you are stepping in for early twilight cocktails, catching an intimate resident DJ showcase, or heading straight for the pulsating front-row dance floor during a peak-time weekend set, the club delivers an uncompromising music-first experience. Strict curation ensures welcoming crowd etiquette, effortless community mingling, and nights that linger long after the lights come up.`;

  // Specific events for this club
  const clubEvents: ClubEventItem[] = sampleEventsPool.map((evt, idx) => ({
    ...evt,
    id: `${base.id}-evt-${idx + 1}`,
    venue: base.name,
    area: base.area,
  }));

  // Curated reviews
  const reviews: ClubReview[] = [
    {
      id: "r1",
      authorName: "Rohan Malhotra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      rating: 5,
      date: "Last Saturday",
      comment:
        "Great crowd on Saturday. Music was solid and the dance floor stayed packed straight until closing. Staff was super polite at the door.",
      tag: "Verified Attendee",
    },
    {
      id: "r2",
      authorName: "Priyanka Nair",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      rating: 4.8,
      date: "2 weeks ago",
      comment:
        "Sound system here is genuinely top-notch. Clean low-end without ear fatigue and very little casual talking on the center dancefloor.",
      tag: "Regular Attendee",
    },
    {
      id: "r3",
      authorName: "Devansh Roy",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      rating: 4.5,
      date: "3 weeks ago",
      comment:
        "Incredible cocktail curation and pre-drinks vibe. Gets quite packed past 10:30 PM so get in early if you want good table spots.",
      tag: "VibeUp Member",
    },
    {
      id: "r4",
      authorName: "Ananya Sen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      rating: 5,
      date: "Last Month",
      comment:
        "The lighting visuals during the guest producer set were mesmerizing. One of the rare places in Bangalore taking club culture seriously.",
      tag: "Music Explorer",
    },
  ];

  // Associated Community
  const community: ClubCommunity = {
    id: `comm-${base.id}`,
    name: `${base.name.toUpperCase()} NIGHT OWLS`,
    description: `People who regularly discover, socialize, and attend music events at ${base.name}.`,
    memberCount: 1480,
    memberCountDisplay: "1.4K",
    image: base.image,
  };

  return {
    ...base,
    clubType: base.clubType || derivedType,
    about: derivedAbout,
    upcomingEvents: clubEvents,
    followersList: defaultFollowersList,
    photos: defaultClubPhotos,
    reviews: reviews,
    community: community,
  };
}
