// VibeUp icon set: Phosphor icons in the "fill" weight.
// Exported under the old Lucide names so every page keeps working unchanged.
// Sizing still comes from Tailwind classes (w-4 h-4 …) and colour from text-* classes.
// Pass weight="bold" for an "off" state (e.g. unsaved bookmark) and leave the default for "on".
import { forwardRef, type ComponentType, type SVGProps } from "react";
import type { IconProps as PhosphorProps, IconWeight } from "@phosphor-icons/react";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowLeft as PArrowLeft,
  ArrowRight as PArrowRight,
  ArrowSquareOut,
  ArrowsDownUp,
  At,
  BookmarkSimple,
  Broadcast,
  CalendarDots,
  CaretDown,
  CaretRight,
  CaretUp,
  ChartBar,
  ChartBarHorizontal,
  ChatCenteredDots,
  ChatCenteredText,
  ChatCircleDots,
  Check as PCheck,
  CheckCircle as PCheckCircle,
  Clock as PClock,
  Compass as PCompass,
  DotsThree,
  Eye as PEye,
  Flag as PFlag,
  Heart as PHeart,
  Image as PImage,
  Info as PInfo,
  Lightning,
  List,
  LockSimple,
  LockSimpleOpen,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  MapPin as PMapPin,
  MusicNotes,
  PaperPlaneTilt,
  Plus as PPlus,
  Pulse,
  Question,
  Quotes,
  SealCheck,
  ShareNetwork,
  ShieldWarning,
  SignIn,
  SlidersHorizontal as PSlidersHorizontal,
  Sparkle,
  Star as PStar,
  TShirt,
  ThumbsUp as PThumbsUp,
  Ticket as PTicket,
  User as PUser,
  UserPlus as PUserPlus,
  UsersThree,
  Warning,
  WarningCircle,
  X as PX,
  Medal as P_Award,
  Buildings as P_Building2,
  Camera as P_Camera,
  CaretLeft as P_ChevronLeft,
  Coffee as P_Coffee,
  Coins as P_Coins,
  CreditCard as P_CreditCard,
  VinylRecord as P_Disc,
  Barbell as P_Dumbbell,
  FilmStrip as P_Film,
  Funnel as P_Filter,
  Fire as P_Flame,
  GameController as P_Gamepad2,
  Headphones as P_Headphones,
  Stack as P_Layers,
  Microphone as P_Mic2,
  Moon as P_Moon,
  DotsThreeVertical as P_MoreVertical,
  Mountains as P_Mountain,
  Palette as P_Palette,
  QrCode as P_QrCode,
  Smiley as P_Smile,
  UploadSimple as P_Upload,
  ForkKnife as P_Utensils,
  MagicWand as P_Wand2,
  Waves as P_Waves,
  UserMinus as P_UserX,
} from "@phosphor-icons/react/dist/ssr";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  size?: number | string;
  weight?: IconWeight;
  /** Lucide-only props, accepted and ignored so old call sites still type-check. */
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
};

export type LucideIcon = ComponentType<IconProps>;

function make(Icon: ComponentType<PhosphorProps>, name: string) {
  const Wrapped = forwardRef<SVGSVGElement, IconProps>(function VibeIcon(
    { weight = "fill", ...props },
    ref
  ) {
    const rest = { ...props };
    delete rest.strokeWidth;
    delete rest.absoluteStrokeWidth;
    return <Icon ref={ref} weight={weight} aria-hidden={rest["aria-label"] ? undefined : true} {...(rest as PhosphorProps)} />;
  });
  Wrapped.displayName = name;
  return Wrapped;
}

export const Activity = make(Pulse, "Activity");
export const AlertCircle = make(WarningCircle, "AlertCircle");
export const AlertTriangle = make(Warning, "AlertTriangle");
export const ArrowLeft = make(PArrowLeft, "ArrowLeft");
export const ArrowRight = make(PArrowRight, "ArrowRight");
export const ArrowUpDown = make(ArrowsDownUp, "ArrowUpDown");
export const AtSign = make(At, "AtSign");
export const BarChart2 = make(ChartBarHorizontal, "BarChart2");
export const BarChart3 = make(ChartBar, "BarChart3");
export const Bookmark = make(BookmarkSimple, "Bookmark");
export const Calendar = make(CalendarDots, "Calendar");
export const Check = make(PCheck, "Check");
export const CheckCircle2 = make(PCheckCircle, "CheckCircle2");
export const ChevronDown = make(CaretDown, "ChevronDown");
export const ChevronRight = make(CaretRight, "ChevronRight");
export const ChevronUp = make(CaretUp, "ChevronUp");
export const Clock = make(PClock, "Clock");
export const Compass = make(PCompass, "Compass");
export const ExternalLink = make(ArrowSquareOut, "ExternalLink");
export const Eye = make(PEye, "Eye");
export const Flag = make(PFlag, "Flag");
export const Heart = make(PHeart, "Heart");
export const HelpCircle = make(Question, "HelpCircle");
export const Image = make(PImage, "Image");
export const Info = make(PInfo, "Info");
export const Lock = make(LockSimple, "Lock");
export const LogIn = make(SignIn, "LogIn");
export const MapPin = make(PMapPin, "MapPin");
export const Menu = make(List, "Menu");
export const MessageCircle = make(ChatCircleDots, "MessageCircle");
export const MessageSquare = make(ChatCenteredText, "MessageSquare");
export const MessageSquarePlus = make(ChatCenteredDots, "MessageSquarePlus");
export const MessageSquareQuote = make(Quotes, "MessageSquareQuote");
export const MoreHorizontal = make(DotsThree, "MoreHorizontal");
export const Music = make(MusicNotes, "Music");
export const Plus = make(PPlus, "Plus");
export const Radio = make(Broadcast, "Radio");
export const RotateCcw = make(ArrowCounterClockwise, "RotateCcw");
export const RotateCw = make(ArrowClockwise, "RotateCw");
export const Search = make(MagnifyingGlass, "Search");
export const SearchX = make(MagnifyingGlassMinus, "SearchX");
export const Send = make(PaperPlaneTilt, "Send");
export const Share2 = make(ShareNetwork, "Share2");
export const ShieldAlert = make(ShieldWarning, "ShieldAlert");
export const ShieldCheck = make(SealCheck, "ShieldCheck");
export const Shirt = make(TShirt, "Shirt");
export const SlidersHorizontal = make(PSlidersHorizontal, "SlidersHorizontal");
export const Sparkles = make(Sparkle, "Sparkles");
export const Star = make(PStar, "Star");
export const ThumbsUp = make(PThumbsUp, "ThumbsUp");
export const Ticket = make(PTicket, "Ticket");
export const Unlock = make(LockSimpleOpen, "Unlock");
export const User = make(PUser, "User");
export const UserPlus = make(PUserPlus, "UserPlus");
export const Users = make(UsersThree, "Users");
export const X = make(PX, "X");

export const Award = make(P_Award, "Award");
export const Building2 = make(P_Building2, "Building2");
export const Camera = make(P_Camera, "Camera");
export const ChevronLeft = make(P_ChevronLeft, "ChevronLeft");
export const Coffee = make(P_Coffee, "Coffee");
export const Coins = make(P_Coins, "Coins");
export const CreditCard = make(P_CreditCard, "CreditCard");
export const Disc = make(P_Disc, "Disc");
export const Dumbbell = make(P_Dumbbell, "Dumbbell");
export const Film = make(P_Film, "Film");
export const Filter = make(P_Filter, "Filter");
export const Flame = make(P_Flame, "Flame");
export const Gamepad2 = make(P_Gamepad2, "Gamepad2");
export const Headphones = make(P_Headphones, "Headphones");
export const Layers = make(P_Layers, "Layers");
export const Mic2 = make(P_Mic2, "Mic2");
export const Moon = make(P_Moon, "Moon");
export const MoreVertical = make(P_MoreVertical, "MoreVertical");
export const Mountain = make(P_Mountain, "Mountain");
export const Palette = make(P_Palette, "Palette");
export const QrCode = make(P_QrCode, "QrCode");
export const Smile = make(P_Smile, "Smile");
export const Upload = make(P_Upload, "Upload");
export const Utensils = make(P_Utensils, "Utensils");
export const Wand2 = make(P_Wand2, "Wand2");
export const Waves = make(P_Waves, "Waves");
export const Zap = make(Lightning, "Zap");
export const UserX = make(P_UserX, "UserX");
