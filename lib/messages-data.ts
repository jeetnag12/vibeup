export type ConversationType = "person" | "crew" | "event" | "community";

export interface Message {
  id: string;
  sender: "me" | "other";
  senderName?: string;
  text: string;
  timestamp: string;
  // Mock presentation state for UI preview (not real backend receipt)
  seen?: boolean;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string;
  subtitle?: string;
  handle?: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  route: string;
  online?: boolean;
  context?: string;
  messages: Message[];
}

export type ConversationFilter =
  | "ALL"
  | "PEOPLE"
  | "CREWS"
  | "EVENTS"
  | "COMMUNITIES";

export const initialMockConversations: Conversation[] = [
  {
    id: "chat-001",
    type: "person",
    name: "RIYA",
    subtitle: "@riya.afterdark",
    handle: "@riya.afterdark",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
    lastMessage: "Are you going to Neon Friday?",
    timestamp: "10:42 PM",
    unreadCount: 2,
    route: "/people/priya-grooves",
    online: true,
    context: "Vibe Match · 94%",
    messages: [
      {
        id: "m-001-1",
        sender: "other",
        senderName: "Riya",
        text: "Hey! Saw you're checking out nightlife in Indiranagar this weekend.",
        timestamp: "10:38 PM",
      },
      {
        id: "m-001-2",
        sender: "me",
        text: "Yeah! Looking for good techno or melodic house sets.",
        timestamp: "10:40 PM",
        seen: true,
      },
      {
        id: "m-001-3",
        sender: "other",
        senderName: "Riya",
        text: "Are you going to Neon Friday?",
        timestamp: "10:42 PM",
      },
    ],
  },
  {
    id: "chat-002",
    type: "crew",
    name: "INDIRANAGAR NIGHT CREW",
    subtitle: "12 MEMBERS",
    handle: "Crew · Peak Time Techno",
    avatar:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=240&auto=format&fit=crop",
    lastMessage: "Arjun: Meeting at 9:30?",
    timestamp: "9:58 PM",
    unreadCount: 5,
    route: "/crews/c1",
    online: false,
    context: "12 Members",
    messages: [
      {
        id: "m-002-1",
        sender: "other",
        senderName: "Vikram",
        text: "Who is driving from 100ft road tonight?",
        timestamp: "9:45 PM",
      },
      {
        id: "m-002-2",
        sender: "me",
        text: "I can pick up 2 folks near Toit around 9:15.",
        timestamp: "9:50 PM",
        seen: true,
      },
      {
        id: "m-002-3",
        sender: "other",
        senderName: "Arjun",
        text: "Arjun: Meeting at 9:30?",
        timestamp: "9:58 PM",
      },
    ],
  },
  {
    id: "chat-003",
    type: "person",
    name: "KABIR",
    subtitle: "@kabir.live",
    handle: "@kabir.live",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240&auto=format&fit=crop",
    lastMessage: "That techno event looks crazy 🔥",
    timestamp: "8:31 PM",
    unreadCount: 1,
    route: "/people/kabir-sound",
    online: true,
    context: "Active Now",
    messages: [
      {
        id: "m-003-1",
        sender: "me",
        text: "Did you catch the subterranean sessions lineup announcement?",
        timestamp: "8:25 PM",
        seen: true,
      },
      {
        id: "m-003-2",
        sender: "other",
        senderName: "Kabir",
        text: "That techno event looks crazy 🔥",
        timestamp: "8:31 PM",
      },
    ],
  },
  {
    id: "chat-004",
    type: "community",
    name: "BANGALORE TECHNO HEADS",
    subtitle: "COMMUNITY",
    handle: "1,420 Members",
    avatar:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=240&auto=format&fit=crop",
    lastMessage: "New discussion: best techno venues",
    timestamp: "7:45 PM",
    unreadCount: 12,
    route: "/communities/bangalore-techno-society",
    online: false,
    context: "Community",
    messages: [
      {
        id: "m-004-1",
        sender: "other",
        senderName: "Nikhil",
        text: "The sound system at Gypsy Warehouse is finally dialed in with the new low-end subs.",
        timestamp: "7:30 PM",
      },
      {
        id: "m-004-2",
        sender: "other",
        senderName: "DJ Zephyr",
        text: "New discussion: best techno venues in Bangalore for underground sound",
        timestamp: "7:45 PM",
      },
    ],
  },
  {
    id: "chat-005",
    type: "event",
    name: "NEON FRIDAY",
    subtitle: "EVENT CHAT",
    handle: "Pebble Lounge · 340 Going",
    avatar:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=240&auto=format&fit=crop",
    lastMessage: "Riya: What time are we reaching?",
    timestamp: "6:20 PM",
    unreadCount: 3,
    route: "/events/cyberpunk-neon-warehouse",
    online: false,
    context: "Event Chat",
    messages: [
      {
        id: "m-005-1",
        sender: "other",
        senderName: "Event Host",
        text: "Doors open at 8:00 PM sharp. Wristbands for pre-registered attendees at Counter 2.",
        timestamp: "5:15 PM",
      },
      {
        id: "m-005-2",
        sender: "me",
        text: "Does the ticket include re-entry stamp before midnight?",
        timestamp: "6:05 PM",
        seen: true,
      },
      {
        id: "m-005-3",
        sender: "other",
        senderName: "Riya",
        text: "Riya: What time are we reaching?",
        timestamp: "6:20 PM",
      },
    ],
  },
  {
    id: "chat-006",
    type: "person",
    name: "ANANYA",
    subtitle: "@ananya.vibe",
    handle: "@ananya.vibe",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=240&auto=format&fit=crop",
    lastMessage: "Let's check out Church Street this weekend.",
    timestamp: "YESTERDAY",
    unreadCount: 0,
    route: "/people/maya-patel",
    online: false,
    context: "Vibe Match · 88%",
    messages: [
      {
        id: "m-006-1",
        sender: "me",
        text: "Any live music gigs on your radar for Saturday?",
        timestamp: "Yesterday, 3:15 PM",
        seen: true,
      },
      {
        id: "m-006-2",
        sender: "other",
        senderName: "Ananya",
        text: "Let's check out Church Street this weekend.",
        timestamp: "Yesterday, 4:00 PM",
      },
    ],
  },
  {
    id: "chat-007",
    type: "community",
    name: "AFRO HOUSE BANGALORE",
    subtitle: "COMMUNITY",
    handle: "890 Members",
    avatar:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=240&auto=format&fit=crop",
    lastMessage: "New event discussion posted.",
    timestamp: "YESTERDAY",
    unreadCount: 0,
    route: "/communities/house-heads-bangalore",
    online: false,
    context: "Community",
    messages: [
      {
        id: "m-007-1",
        sender: "other",
        senderName: "Community Mod",
        text: "Showcase lineup for the rooftop session is dropping this Thursday!",
        timestamp: "Yesterday, 1:20 PM",
      },
      {
        id: "m-007-2",
        sender: "other",
        senderName: "Maya",
        text: "New event discussion posted.",
        timestamp: "Yesterday, 2:45 PM",
      },
    ],
  },
  {
    id: "chat-008",
    type: "crew",
    name: "KORAMANGALA CREW",
    subtitle: "8 MEMBERS",
    handle: "Crew · Pre-drinks & Club Crawl",
    avatar:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=240&auto=format&fit=crop",
    lastMessage: "Meeting point updated.",
    timestamp: "MONDAY",
    unreadCount: 0,
    route: "/crews/c1",
    online: false,
    context: "8 Members",
    messages: [
      {
        id: "m-008-1",
        sender: "other",
        senderName: "Rohan",
        text: "We're meeting up at 5th Block before heading out to the venue.",
        timestamp: "Monday, 7:10 PM",
      },
      {
        id: "m-008-2",
        sender: "other",
        senderName: "Deepak",
        text: "Meeting point updated.",
        timestamp: "Monday, 7:35 PM",
      },
    ],
  },
];
