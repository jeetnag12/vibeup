export interface ClubReference {
  id: string;
  name: string;
}

export interface CommunityReference {
  id: string;
  name: string;
}

export interface EventReference {
  id: string;
  name: string;
  date: string;
}

export interface RecentActivity {
  text: string;
  target?: string;
  time: string;
}

export interface Person {
  id: string;
  name: string;
  username: string;
  avatar: string;
  location: string;
  area: string;
  bio: string;
  genres: string[];
  interests: string[];
  clubs: ClubReference[];
  communities: CommunityReference[];
  upcomingEvents: EventReference[];
  vibeMatch: number;
  followers: number;
  following: boolean;
  activeStatus: "ONLINE" | "ACTIVE TODAY" | "GOING OUT TONIGHT";
  recentActivity: RecentActivity;
  // Future algorithm preparation signals:
  genreMatch?: number;
  locationMatch?: number;
  clubAffinity?: string[];
  communityAffinity?: string[];
  sharedInterestsCount?: number;
  mutualEventsCount?: number;
}

export const peopleFilterCategories = [
  "ALL",
  "NEARBY",
  "MUSIC",
  "EVENTS",
  "CLUBS",
  "COMMUNITIES",
  "ACTIVE NOW",
] as const;

export type PeopleFilterCategory = (typeof peopleFilterCategories)[number];

export const mockPeopleData: Person[] = [
  {
    id: "arjun-wav",
    name: "Arjun Mehta",
    username: "@arjun.wav",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "Indiranagar",
    bio: "Modular synth maker & vinyl digger. Front-left dancefloor regular at underground sessions.",
    genres: ["TECHNO", "HOUSE", "UNDERGROUND"],
    interests: ["Modular Synth", "Warehouse Parties", "Funktion-One", "Vinyl Digging"],
    clubs: [
      { id: "pebble-the-jungle-lounge", name: "Pebble Lounge" },
      { id: "gypsy-warehouse-mg-road", name: "The Gypsy Warehouse" },
    ],
    communities: [
      { id: "bangalore-techno-society", name: "Bangalore Techno Society" },
      { id: "underground-bangalore", name: "Underground Bangalore" },
    ],
    upcomingEvents: [
      {
        id: "cyberpunk-neon-warehouse",
        name: "Cyberpunk Neon Warehouse",
        date: "Fri, 16 Oct",
      },
      {
        id: "saturday-techno-night",
        name: "Saturday Techno Odyssey",
        date: "Sat, 17 Oct",
      },
    ],
    vibeMatch: 96,
    followers: 480,
    following: true,
    activeStatus: "GOING OUT TONIGHT",
    recentActivity: {
      text: "Saved Cyberpunk Neon Warehouse",
      time: "24m ago",
    },
    genreMatch: 95,
    locationMatch: 98,
    sharedInterestsCount: 4,
    mutualEventsCount: 3,
  },
  {
    id: "priya-grooves",
    name: "Priya Nair",
    username: "@priya.groove",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "Koramangala",
    bio: "Deep house & melodic sound explorer. Sundays are sacred for sunset terrace sessions.",
    genres: ["HOUSE", "DEEP HOUSE", "MELODIC"],
    interests: ["Sunset Rooftops", "Boiler Room", "Dancefloor Etiquette", "Acoustics"],
    clubs: [
      { id: "loft-38", name: "Loft 38" },
      { id: "toit-brewpub", name: "Toit Brewpub" },
    ],
    communities: [
      { id: "house-heads-bangalore", name: "House Heads Bangalore" },
      { id: "indiranagar-night-owls", name: "Indiranagar Night Owls" },
    ],
    upcomingEvents: [
      {
        id: "deep-house-odyssey-vol-4",
        name: "Deep House Odyssey Vol. 4",
        date: "Fri, 23 Oct",
      },
    ],
    vibeMatch: 92,
    followers: 610,
    following: true,
    activeStatus: "ONLINE",
    recentActivity: {
      text: "Joined Bangalore House Heads",
      time: "1h ago",
    },
    genreMatch: 91,
    locationMatch: 90,
    sharedInterestsCount: 3,
    mutualEventsCount: 2,
  },
  {
    id: "kabir-sound",
    name: "Kabir Sen",
    username: "@kabir.live",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "CBD",
    bio: "Fast tempos, Berlin minimal, and sub-bass frequencies. Strictly zero phone screens on the floor.",
    genres: ["TECHNO", "INDUSTRIAL", "ELECTRONIC"],
    interests: ["Warehouse Raves", "Sub-Bass", "Industrial", "Late Night Coffee"],
    clubs: [
      { id: "gypsy-warehouse-mg-road", name: "The Gypsy Warehouse" },
      { id: "sound-garden-hsr", name: "The Sound Garden" },
    ],
    communities: [
      { id: "bangalore-techno-society", name: "Bangalore Techno Society" },
      { id: "underground-bangalore", name: "Underground Bangalore" },
    ],
    upcomingEvents: [
      {
        id: "after-dark-residents-night",
        name: "After Dark: Subterranean Sessions",
        date: "Sat, 24 Oct",
      },
    ],
    vibeMatch: 89,
    followers: 320,
    following: false,
    activeStatus: "ACTIVE TODAY",
    recentActivity: {
      text: "Created a crew for Saturday Rave",
      time: "3h ago",
    },
    genreMatch: 94,
    locationMatch: 85,
    sharedInterestsCount: 3,
    mutualEventsCount: 2,
  },
  {
    id: "maya-patel",
    name: "Maya Patel",
    username: "@maya.beats",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "Indiranagar",
    bio: "Afro house, Amapiano rhythms, and tribal percussion enthusiast. Dance music is community medicine.",
    genres: ["AFRO HOUSE", "AMAPIANO", "HOUSE"],
    interests: ["Tribal Rhythms", "Dance Workshops", "Cocktail Labs", "Acoustic Spaces"],
    clubs: [
      { id: "raahi-neo-kitchen", name: "Raahi & After-Hours" },
      { id: "toit-brewpub", name: "Toit Brewpub" },
    ],
    communities: [
      { id: "afro-house-india", name: "Afro House India" },
      { id: "indiranagar-night-owls", name: "Indiranagar Night Owls" },
    ],
    upcomingEvents: [
      {
        id: "saturday-house-session",
        name: "Saturday House Session",
        date: "Sat, 03 Oct",
      },
    ],
    vibeMatch: 88,
    followers: 740,
    following: true,
    activeStatus: "GOING OUT TONIGHT",
    recentActivity: {
      text: "Shared Afro House showcase track",
      time: "5h ago",
    },
    genreMatch: 86,
    locationMatch: 95,
    sharedInterestsCount: 4,
    mutualEventsCount: 3,
  },
  {
    id: "rohan-synth",
    name: "Rohan Iyer",
    username: "@rohan.modular",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "HSR Layout",
    bio: "Acoustic audio engineer by day, basement rave seeker by night. Obsessed with high dynamic range sound.",
    genres: ["TECHNO", "ACID", "LIVE MUSIC"],
    interests: ["Audio Engineering", "Basement Vaults", "Live Drum Machines", "Synthesizers"],
    clubs: [
      { id: "sound-garden-hsr", name: "The Sound Garden" },
      { id: "pebble-the-jungle-lounge", name: "Pebble Lounge" },
    ],
    communities: [
      { id: "bangalore-techno-society", name: "Bangalore Techno Society" },
      { id: "bangalore-live-music-society", name: "Bangalore Live Music Society" },
    ],
    upcomingEvents: [
      {
        id: "cyberpunk-neon-warehouse",
        name: "Cyberpunk Neon Warehouse",
        date: "Fri, 16 Oct",
      },
    ],
    vibeMatch: 87,
    followers: 290,
    following: false,
    activeStatus: "ONLINE",
    recentActivity: {
      text: "Posted in BTS Community Talk",
      time: "7h ago",
    },
    genreMatch: 88,
    locationMatch: 82,
    sharedInterestsCount: 3,
    mutualEventsCount: 2,
  },
  {
    id: "ananya-roy",
    name: "Ananya Roy",
    username: "@ananya.melodic",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "Koramangala",
    bio: "Festival hopper & stage frontrunner. Always searching for unreleased IDs and melodic drops.",
    genres: ["MELODIC", "HOUSE", "FESTIVALS"],
    interests: ["Festival Squads", "Roadtrips", "Outdoor Stages", "Pre-Drinks"],
    clubs: [
      { id: "loft-38", name: "Loft 38" },
      { id: "toit-brewpub", name: "Toit Brewpub" },
    ],
    communities: [
      { id: "koramangala-party-people", name: "Koramangala Party People" },
      { id: "house-heads-bangalore", name: "House Heads Bangalore" },
    ],
    upcomingEvents: [
      {
        id: "deep-house-odyssey-vol-4",
        name: "Deep House Odyssey Vol. 4",
        date: "Fri, 23 Oct",
      },
    ],
    vibeMatch: 85,
    followers: 510,
    following: false,
    activeStatus: "ACTIVE TODAY",
    recentActivity: {
      text: "Joined Koramangala Party People",
      time: "9h ago",
    },
    genreMatch: 84,
    locationMatch: 89,
    sharedInterestsCount: 2,
    mutualEventsCount: 1,
  },
  {
    id: "devansh-bass",
    name: "Devansh Roy",
    username: "@devansh.sub",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "CBD",
    bio: "Boom bap, trap, 808 bass, and producer cyphers. Organizes underground beat showcases.",
    genres: ["HIP-HOP", "TRAP", "BASS"],
    interests: ["Beat Battles", "Cyphers", "Vinyl Sampling", "Street Culture"],
    clubs: [
      { id: "gypsy-warehouse-mg-road", name: "The Gypsy Warehouse" },
      { id: "loft-38", name: "Loft 38" },
    ],
    communities: [
      { id: "koramangala-party-people", name: "Koramangala Party People" },
      { id: "underground-bangalore", name: "Underground Bangalore" },
    ],
    upcomingEvents: [
      {
        id: "saturday-techno-night",
        name: "Saturday Techno Odyssey",
        date: "Sat, 17 Oct",
      },
    ],
    vibeMatch: 83,
    followers: 430,
    following: false,
    activeStatus: "GOING OUT TONIGHT",
    recentActivity: {
      text: "Checked in at The Gypsy Warehouse",
      time: "12h ago",
    },
    genreMatch: 80,
    locationMatch: 87,
    sharedInterestsCount: 2,
    mutualEventsCount: 1,
  },
  {
    id: "tara-kapoor",
    name: "Tara Kapoor",
    username: "@tara.vinyl",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "JP Nagar",
    bio: "Indie rock, dream pop & post-rock devotee. Catch me at intimate listening bars with craft beer flights.",
    genres: ["INDIE", "LIVE MUSIC", "POST-ROCK"],
    interests: ["Vinyl Swaps", "Acoustic Rooms", "Indie Gigs", "Cassettes"],
    clubs: [
      { id: "sub-terrace-jp-nagar", name: "Sub Terrace & Socials" },
      { id: "toit-brewpub", name: "Toit Brewpub" },
    ],
    communities: [
      { id: "bangalore-live-music-society", name: "Bangalore Live Music Society" },
    ],
    upcomingEvents: [
      {
        id: "deep-house-odyssey-vol-4",
        name: "Deep House Odyssey Vol. 4",
        date: "Fri, 23 Oct",
      },
    ],
    vibeMatch: 82,
    followers: 380,
    following: true,
    activeStatus: "ONLINE",
    recentActivity: {
      text: "Shared listening session notes",
      time: "1d ago",
    },
    genreMatch: 79,
    locationMatch: 83,
    sharedInterestsCount: 3,
    mutualEventsCount: 1,
  },
  {
    id: "vikram-malhotra",
    name: "Vikram Malhotra",
    username: "@vikram.dark",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "Whitefield",
    bio: "Rooftop electronic parties, progressive house & weekend club carpools from East Bangalore.",
    genres: ["ELECTRONIC", "COMMERCIAL", "ROOFTOP"],
    interests: ["Rooftop Sunsets", "Weekend Carpools", "EDM", "VIP Lounges"],
    clubs: [
      { id: "neon-attic-whitefield", name: "Neon Attic" },
      { id: "loft-38", name: "Loft 38" },
    ],
    communities: [
      { id: "whitefield-weekend-crew", name: "Whitefield Weekend Crew" },
      { id: "indiranagar-night-owls", name: "Indiranagar Night Owls" },
    ],
    upcomingEvents: [
      {
        id: "desi-nights-club-edition",
        name: "Desi Nights Club Edition",
        date: "Sat, 10 Oct",
      },
    ],
    vibeMatch: 79,
    followers: 670,
    following: false,
    activeStatus: "ACTIVE TODAY",
    recentActivity: {
      text: "Formed a carpool crew for Saturday",
      time: "1d ago",
    },
    genreMatch: 76,
    locationMatch: 78,
    sharedInterestsCount: 2,
    mutualEventsCount: 1,
  },
  {
    id: "sanya-mathur",
    name: "Sanya Mathur",
    username: "@sanya.techno",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "Indiranagar",
    bio: "Hypnotic techno, dark disco & warehouse staging. Lighting designer exploring the intersection of light and sound.",
    genres: ["TECHNO", "DARK DISCO", "UNDERGROUND"],
    interests: ["Laser Grids", "Fog Visuals", "Audio-Visual Sets", "Warehouse Raves"],
    clubs: [
      { id: "pebble-the-jungle-lounge", name: "Pebble Lounge" },
      { id: "gypsy-warehouse-mg-road", name: "The Gypsy Warehouse" },
    ],
    communities: [
      { id: "bangalore-techno-society", name: "Bangalore Techno Society" },
      { id: "underground-bangalore", name: "Underground Bangalore" },
    ],
    upcomingEvents: [
      {
        id: "cyberpunk-neon-warehouse",
        name: "Cyberpunk Neon Warehouse",
        date: "Fri, 16 Oct",
      },
    ],
    vibeMatch: 94,
    followers: 590,
    following: true,
    activeStatus: "GOING OUT TONIGHT",
    recentActivity: {
      text: "Saved Saturday Techno Odyssey",
      time: "4h ago",
    },
    genreMatch: 95,
    locationMatch: 92,
    sharedInterestsCount: 4,
    mutualEventsCount: 2,
  },
  {
    id: "aditya-rao",
    name: "Aditya Rao",
    username: "@aditya.pulse",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "Koramangala",
    bio: "Bollywood anthems, Punjabi dance floors & high energy weekend clubbing. VIP tables & late night shawarma.",
    genres: ["BOLLYWOOD", "COMMERCIAL", "PUNJABI"],
    interests: ["VIP Tables", "Late Night Eats", "Bollywood Nights", "High Energy"],
    clubs: [
      { id: "loft-38", name: "Loft 38" },
      { id: "raahi-neo-kitchen", name: "Raahi & After-Hours" },
    ],
    communities: [
      { id: "desi-beat-district", name: "Desi Beat District" },
      { id: "koramangala-party-people", name: "Koramangala Party People" },
    ],
    upcomingEvents: [
      {
        id: "desi-nights-club-edition",
        name: "Desi Nights Club Edition",
        date: "Sat, 10 Oct",
      },
    ],
    vibeMatch: 77,
    followers: 820,
    following: false,
    activeStatus: "ONLINE",
    recentActivity: {
      text: "Saved Desi Nights Club Edition",
      time: "2d ago",
    },
    genreMatch: 72,
    locationMatch: 85,
    sharedInterestsCount: 1,
    mutualEventsCount: 1,
  },
  {
    id: "neha-sharma",
    name: "Neha Sharma",
    username: "@neha.sounds",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "CBD",
    bio: "Electronic music journalist & vinyl collector. Documenting the rise of Bangalore's subterranean sound culture.",
    genres: ["ELECTRONIC", "HOUSE", "TECHNO"],
    interests: ["Music Journalism", "Sound Archives", "Vinyl Listening", "Boiler Room"],
    clubs: [
      { id: "sound-garden-hsr", name: "The Sound Garden" },
      { id: "toit-brewpub", name: "Toit Brewpub" },
    ],
    communities: [
      { id: "underground-bangalore", name: "Underground Bangalore" },
      { id: "house-heads-bangalore", name: "House Heads Bangalore" },
    ],
    upcomingEvents: [
      {
        id: "after-dark-residents-night",
        name: "After Dark: Subterranean Sessions",
        date: "Sat, 24 Oct",
      },
    ],
    vibeMatch: 91,
    followers: 950,
    following: true,
    activeStatus: "ACTIVE TODAY",
    recentActivity: {
      text: "Reviewed Pebble Lounge",
      time: "1d ago",
    },
    genreMatch: 90,
    locationMatch: 92,
    sharedInterestsCount: 4,
    mutualEventsCount: 2,
  },
];

export function getPersonById(id: string): Person | undefined {
  const normalizedId = (id || "").toLowerCase().trim();
  return mockPeopleData.find(
    (p) =>
      p.id.toLowerCase() === normalizedId ||
      p.username.toLowerCase().replace(/[@.]/g, "") === normalizedId.replace(/[@.]/g, "")
  );
}

export interface AttendedEventItem {
  id: string;
  name: string;
  venue: string;
  date: string;
  genre: string;
}

export interface ProfileClubItem {
  id: string;
  name: string;
  area: string;
  image: string;
  rating: number;
}

export interface ProfileCommunityItem {
  id: string;
  name: string;
  memberCountDisplay: string;
  image: string;
}

export interface ProfileActivityItem {
  id: string;
  text: string;
  target?: string;
  time: string;
  link?: string;
}

export interface ProfileBadgeItem {
  id: string;
  title: string;
  requirement: string;
  iconName: string;
  color: string;
}

export interface NightlifeStats {
  eventsAttended: number;
  clubsVisited: number;
  communitiesCount: number;
  crewsJoined: number;
}

export interface DetailedPersonProfile extends Person {
  followersCount: number;
  followingCount: number;
  favouriteNights: string[];
  favouriteAreas: string[];
  vibeTags: string[];
  musicTaste: string[];
  attendedEvents: AttendedEventItem[];
  favouriteClubsList: ProfileClubItem[];
  communitiesList: ProfileCommunityItem[];
  activityFeed: ProfileActivityItem[];
  stats: NightlifeStats;
  badges: ProfileBadgeItem[];
  peopleYouMayKnow: Person[];
}

export function getDetailedPersonProfile(id: string): DetailedPersonProfile {
  const normalizedId = (id || "").toLowerCase().trim();
  const found = getPersonById(normalizedId);

  const base: Person = found || {
    id: normalizedId || "arjun-wav",
    name: (normalizedId || "arjun-wav")
      .split("-")[0]
      .replace(/^@/, "")
      .replace(/^\w/, (c) => c.toUpperCase()) || "Arjun",
    username: `@${(normalizedId || "arjun-wav").replace(/^@/, "")}`,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
    location: "Bangalore",
    area: "Indiranagar",
    bio: "Techno nights, underground rooms and discovering new sounds across Bangalore.",
    genres: ["TECHNO", "HOUSE", "AFRO HOUSE"],
    interests: ["Nightlife", "New Venues", "Underground Events", "Live Music", "Festivals"],
    clubs: [
      { id: "pebble-the-jungle-lounge", name: "Pebble Lounge" },
      { id: "gypsy-warehouse-mg-road", name: "The Gypsy Warehouse" },
      { id: "toit-brewpub", name: "Toit Brewpub" },
      { id: "loft-38", name: "Loft 38" },
    ],
    communities: [
      { id: "bangalore-techno-society", name: "Bangalore Techno Society" },
      { id: "underground-bangalore", name: "Underground Bangalore" },
      { id: "house-heads-bangalore", name: "House Heads Bangalore" },
    ],
    upcomingEvents: [
      {
        id: "cyberpunk-neon-warehouse",
        name: "Cyberpunk Neon Warehouse",
        date: "Fri, 16 Oct",
      },
      {
        id: "saturday-techno-night",
        name: "Saturday Techno Odyssey",
        date: "Sat, 17 Oct",
      },
    ],
    vibeMatch: 87,
    followers: 1200,
    following: false,
    activeStatus: "GOING OUT TONIGHT",
    recentActivity: {
      text: "Saved Cyberpunk Neon Warehouse",
      time: "24m ago",
    },
  };

  const attendedEvents: AttendedEventItem[] = [
    {
      id: "deep-house-odyssey-vol-4",
      name: "Deep House Odyssey Vol. 4",
      venue: "Fandom, Koramangala",
      date: "Last Friday",
      genre: "HOUSE",
    },
    {
      id: "after-dark-residents-night",
      name: "After Dark: Subterranean Sessions",
      venue: "The Gypsy Warehouse, CBD",
      date: "12 Oct",
      genre: "TECHNO",
    },
    {
      id: "saturday-house-session",
      name: "Saturday House Session",
      venue: "Main Stage, Koramangala",
      date: "03 Oct",
      genre: "MELODIC",
    },
    {
      id: "desi-nights-club-edition",
      name: "Desi Nights Club Edition",
      venue: "Loft 38, Indiranagar",
      date: "26 Sep",
      genre: "COMMERCIAL",
    },
  ];

  const favouriteClubsList: ProfileClubItem[] = [
    {
      id: "pebble-the-jungle-lounge",
      name: "PEBBLE — THE JUNGLE LOUNGE",
      area: "Sadashivanagar, CBD",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
      rating: 4.6,
    },
    {
      id: "gypsy-warehouse-mg-road",
      name: "THE GYPSY WAREHOUSE",
      area: "Residency Road, CBD",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      rating: 4.7,
    },
    {
      id: "toit-brewpub",
      name: "TOIT BREWPUB & TAPROOM",
      area: "100ft Road, Indiranagar",
      image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=800&auto=format&fit=crop",
      rating: 4.8,
    },
    {
      id: "sound-garden-hsr",
      name: "THE SOUND GARDEN",
      area: "Sector 1, HSR Layout",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
      rating: 4.6,
    },
  ];

  const communitiesList: ProfileCommunityItem[] = [
    {
      id: "bangalore-techno-society",
      name: "BANGALORE TECHNO SOCIETY",
      memberCountDisplay: "2.8K",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "underground-bangalore",
      name: "UNDERGROUND BANGALORE",
      memberCountDisplay: "2.1K",
      image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "house-heads-bangalore",
      name: "HOUSE HEADS BANGALORE",
      memberCountDisplay: "3.1K",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const activityFeed: ProfileActivityItem[] = [
    {
      id: "act-1",
      text: "Joined",
      target: "Bangalore Techno Society",
      time: "2 hours ago",
      link: "/communities/bangalore-techno-society",
    },
    {
      id: "act-2",
      text: "Saved",
      target: "Cyberpunk Neon Warehouse",
      time: "Yesterday",
      link: "/events/cyberpunk-neon-warehouse",
    },
    {
      id: "act-3",
      text: "Followed",
      target: "Toit Brewpub & Taproom",
      time: "3 days ago",
      link: "/clubs/toit-brewpub",
    },
    {
      id: "act-4",
      text: "Joined a crew for",
      target: "Saturday House Session",
      time: "4 days ago",
      link: "/events/saturday-house-session",
    },
    {
      id: "act-5",
      text: "Attended",
      target: "Deep House Odyssey Vol. 4",
      time: "Last week",
      link: "/events/deep-house-odyssey-vol-4",
    },
  ];

  const badges: ProfileBadgeItem[] = [
    {
      id: "b1",
      title: "WEEKEND EXPLORER",
      requirement: "10+ EVENTS",
      iconName: "Compass",
      color: "#8B5CF6",
    },
    {
      id: "b2",
      title: "NIGHTLIFE REGULAR",
      requirement: "20+ EVENTS",
      iconName: "Flame",
      color: "#EC4899",
    },
    {
      id: "b3",
      title: "COMMUNITY BUILDER",
      requirement: "5+ COMMUNITIES",
      iconName: "Users",
      color: "#22C55E",
    },
    {
      id: "b4",
      title: "VINYL PURIST",
      requirement: "UNDERGROUND",
      iconName: "Sparkles",
      color: "#EAB308",
    },
  ];

  const peopleYouMayKnow = mockPeopleData
    .filter((p) => p.id !== base.id)
    .slice(0, 3);

  return {
    ...base,
    followersCount: base.followers || 1200,
    followingCount: 384,
    favouriteNights: ["FRIDAY", "SATURDAY"],
    favouriteAreas: [base.area || "Indiranagar", "Koramangala", "CBD"],
    vibeTags: [
      "NIGHT OWL",
      "TECHNO HEAD",
      "LIVE MUSIC",
      "WEEKEND EXPLORER",
      "UNDERGROUND",
      "DANCE FLOOR",
    ],
    musicTaste: ["TECHNO", "HOUSE", "AFRO HOUSE", "HIP-HOP", "INDIE"],
    attendedEvents,
    favouriteClubsList,
    communitiesList,
    activityFeed,
    stats: {
      eventsAttended: 47,
      clubsVisited: 12,
      communitiesCount: 8,
      crewsJoined: 23,
    },
    badges,
    peopleYouMayKnow,
  };
}

