/**
 * 올리브식권 — 구내식당 앱 메인 진입점
 */

import "./shared/i18n"; // i18n 초기화를 최우선으로 보장
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { ReactNode, CSSProperties } from "react";
import {
  ShoppingCart,
  Home,
  ScrollText,
  UserRound,
  ChevronRight,
  Bell,
  MapPin,
  Search,
  Calendar,
  Clock,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import svgPaths from "../imports/svg-apf66xr4az";
import QrIcon from "../imports/QrIcon";
import QrPaymentPage from "./components/QrPaymentPage";
import NotificationPage from "./components/NotificationPage";
import MenuDetailPage from "./components/MenuDetailPage";
import type { MenuDetailData } from "./components/MenuDetailPage";
import PaymentHistoryPage from "./components/PaymentHistoryPage";
import type { PaymentItem } from "./components/PaymentHistoryPage";
import PaymentDetailPage from "./components/PaymentDetailPage";
import SimpleMealDetailPage from "./components/SimpleMealDetailPage";
import type { SimpleMealData } from "./components/SimpleMealDetailPage";
import CartPageOption4 from "./components/CartPageOption4";
import type { CartItem } from "./components/CartPage";
import DateRangePickerPage from "./components/DateRangePickerPage";
import type { DateRange } from "./components/DateRangePickerPage";
import { PaymentConfirmPopup, PaymentCompletePopup } from "./components/PaymentPopup";
import PaymentCompletePage from "./components/PaymentCompletePage";
import type { PaymentCompleteItem } from "./components/PaymentCompletePage";
import { Toaster } from "sonner";
import CorporatePointPage from "./components/CorporatePointPage";
import PointHubPage from "./components/PointHubPage";
import OlivePointPage from "./components/OlivePointPage";
import OlivePointRefundPage from "./components/OlivePointRefundPage";
import { colors as sharedColors, fontFamily, spacing, radius } from "./shared/tokens";
import { toastBaseStyle, showSuccessToast, showPlainToast } from "./shared/toast";
import {
  HomeTab, MealTime, PickupStatus, PaymentStatus,
  homeTabKey, mealTimeKey,
} from "./shared/enums";
import { useTranslation } from "react-i18next";
import { formatMonthDayTime, formatAmount, formatAmountStr } from "./shared/formatters";
import MyOlivePage from "./components/MyOlivePage";
import UserProfilePage from "./components/UserProfilePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import FindAccountPage from "./components/FindAccountPage";
import DocsPage from "./components/DocsPage";
import MapPage from "./components/MapPage";
import OldVersionHomePage from "./components/OldVersionHomePage";
import OldVersionQrPaymentPage from "./components/OldVersionQrPaymentPage";
import OldVersionPaymentHistoryPage from "./components/OldVersionPaymentHistoryPage";
import OldVersionMyOlivePage from "./components/OldVersionMyOlivePage";

// ─── Keyframes ───────────────────────────────────────────────
const animationKeyframes = `
@keyframes dayTapBounce {
  0% { transform: scale(1); }
  50% { transform: scale(0.92); }
  100% { transform: scale(1); }
}
@keyframes spinLoader {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// ─── Design Tokens (shared/tokens.ts 에서 import) ───────────
// App.tsx 전용: gray1 → blueGray (#8C96A8) 매핑
const colors = {
  ...sharedColors,
  /** App 홈 전용 — 포인트 라벨, 메뉴 설명 등 */
  gray1: sharedColors.blueGray,
};

// ─── StyleSheet ──────────────────────────────────────────────
const styles: Record<string, CSSProperties> = {
  screen: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.white,
    fontFamily,
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: colors.white,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    height: 54,
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray6}`,
    zIndex: 10,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },
  headerSearchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    minWidth: 0,
    height: 36,
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
    paddingLeft: 12,
    paddingRight: 12,
    border: "none",
    cursor: "pointer",
  },
  headerSearchText: {
    fontSize: 13,
    color: colors.gray2,
    letterSpacing: -0.3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.5,
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  iconBtn: {
    width: 36,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    position: "relative",
  },
  bellDot: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    top: 5,
    right: 4,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "white",
  },
  cartBadge: {
    position: "absolute",
    width: 18,
    height: 18,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    top: 2,
    right: 0,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.2,
  },
  pointsSection: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.bg,
  },
  pointsCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: spacing.xl,
    paddingRight: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  pointsLabel: {
    fontSize: 15,
    color: colors.gray1,
    fontWeight: 500,
    marginBottom: spacing.xs,
  },
  pointsRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  pointsValue: {
    fontSize: 22,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.5,
  },
  tabsSection: {
    backgroundColor: colors.bg,
    borderBottom: `1px solid #D9D9D9`,
  },
  tabsRow: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: spacing.xl,
    overflowX: "auto" as const,
    scrollbarWidth: "none" as const,
  },
  tabBtn: {
    position: "relative",
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: spacing.xxl,
    backgroundColor: "transparent",
    border: "none",
    letterSpacing: -0.3,
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.black,
    borderRadius: radius.full,
  },
  calendarSection: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.bg,
    borderBottom: `1px solid #D9D9D9`,
  },
  calendarRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  dayCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    flex: 1,
    minWidth: 0,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: colors.gray2,
  },
  todayCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 52,
    height: 58,
    border: `2.5px solid ${colors.black}`,
    borderRadius: radius.md,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
    paddingLeft: 10,
    backgroundColor: colors.bg,
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    flexShrink: 0,
  },
  todayLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.black,
  },
  todayDate: {
    fontSize: 15,
    fontWeight: 800,
    color: colors.black,
  },
  bannerSection: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: 12,
    backgroundColor: colors.white,
  },
  bannerWrap: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
    background:
      "linear-gradient(135deg, #FF4B50 0%, #E8182E 60%, #C91020 100%)",
    height: 100,
  },
  bannerCircle1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: radius.full,
    background: "rgba(255,255,255,0.08)",
    right: -20,
    top: -30,
  },
  bannerCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: radius.full,
    background: "rgba(255,255,255,0.06)",
    right: 60,
    bottom: -20,
  },
  bannerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: spacing.xl,
    paddingRight: 128,
  },
  bannerTag: {
    fontSize: 10,
    fontWeight: 500,
    color: "rgba(255,255,255,0.75)",
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  bannerSub: {
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 2,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.5,
  },
  bannerImg: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 120,
    height: 100,
    objectFit: "cover",
  },
  mealTabsSection: {
    display: "flex",
    flexDirection: "row",
    gap: spacing.sm,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.white,
    overflowX: "auto" as const,
    scrollbarWidth: "none" as const,
  },
  menuGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.white,
  },
  menuCard: {
    flexBasis: "calc(50% - 6px)",
    maxWidth: "calc(50% - 6px)",
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
  },
  menuImgWrap: {
    position: "relative",
    height: 140,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  menuImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  kcalBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 4,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.45)",
    fontSize: 10,
    fontWeight: 600,
    color: colors.white,
    backdropFilter: "blur(4px)",
    lineHeight: 1,
  },
  menuBody: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    paddingLeft: 0,
    paddingRight: 0,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  menuCorner: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.blue,
    letterSpacing: -0.3,
  },
  menuName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.4,
    lineHeight: 1.3,
  },
  menuDesc: {
    fontSize: 14,
    color: colors.gray1,
    lineHeight: 1.5,
    letterSpacing: -0.3,
  },
  menuPriceRow: {
    marginTop: 0,
    paddingTop: 0,
  },
  menuPrice: {
    fontSize: 17,
    fontWeight: 800,
    color: colors.black,
  },
  bottomNav: {
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTop: `1px solid ${colors.gray6}`,
    position: "relative",
    zIndex: 10,
    flexShrink: 0,
  },
  navBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    backgroundColor: "transparent",
    border: "none",
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  navLabel: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: -0.1,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
  floatingQR: {
    position: "absolute",
    right: spacing.xl,
    bottom: 82,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    boxShadow: "0 4px 16px rgba(238,43,47,0.4)",
    color: colors.white,
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: -0.2,
    zIndex: 20,
    border: "none",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: colors.bg,
    zIndex: 10,
  },
  pullRefresh: {
    position: "absolute",
    top: -60,
    left: 0,
    right: 0,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
    zIndex: 10,
  },
  pullRefreshIcon: {
    width: 24,
    height: 24,
    animation: "spinLoader 1s linear infinite",
  },
};

// ─── Data ─────────────────────────────────────────────────────
const DAYS = [
  { dayKey: "day.mon", date: "23", color: colors.black },
  { dayKey: "day.tue", date: "24", color: colors.black },
  { dayKey: "day.wed", date: "25", color: colors.black },
  {
    dayKey: "day.today",
    date: "26",
    color: colors.black,
    isToday: true,
  },
  { dayKey: "day.fri", date: "27", color: colors.black },
  { dayKey: "day.sat", date: "28", color: colors.blue },
  { dayKey: "day.sun", date: "29", color: colors.primary },
];

function getMenus(t: (key: string) => string): Record<MealTime, { id: number; corner: string; name: string; desc: string; img: string; kcal: string; price: string; noPhoto?: boolean }[]> {
  return {
    [MealTime.BREAKFAST]: [
      {
        id: 1,
        corner: t("mock.cornerKorean"),
        name: t("mock.doenjangSetName"),
        desc: t("mock.doenjangSetDesc"),
        img: "https://images.unsplash.com/photo-1573470571028-a0ca7a723959?w=600",
        kcal: "480 kcal",
        price: "5,500",
        mealTime: t("enum.mealTime.BREAKFAST"),
      },
      {
        id: 2,
        corner: t("mock.cornerWestern"),
        name: t("mock.toastSetName"),
        desc: t("mock.toastSetDesc"),
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
        kcal: "420 kcal",
        price: "5,000",
        mealTime: t("enum.mealTime.BREAKFAST"),
      },
      {
        id: 7,
        corner: t("mock.cornerPorridge"),
        name: t("mock.abaloneSetName"),
        desc: t("mock.abaloneSetDesc"),
        img: "https://images.unsplash.com/photo-1724158311225-24875cacdea7?w=600",
        kcal: "380 kcal",
        price: "6,000",
        mealTime: t("enum.mealTime.BREAKFAST"),
      },
      {
        id: 8,
        corner: t("mock.cornerKorean"),
        name: t("mock.hangoverSetName"),
        desc: t("mock.hangoverSetDesc"),
        img: "https://images.unsplash.com/photo-1752826892253-d89531507b1d?w=600",
        kcal: "510 kcal",
        price: "6,500",
        mealTime: t("enum.mealTime.BREAKFAST"),
      },
    ],
    [MealTime.LUNCH]: [
      {
        id: 3,
        corner: t("mock.cornerSnack"),
        name: t("mock.tteokbokkiSetName"),
        desc: t("mock.tteokbokkiSetDesc"),
        img: "https://images.unsplash.com/photo-1626427223333-183395267453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHdoaXRlJTIwcGxhdGUlMjBtaW5pbWFsfGVufDF8fHx8MTc3Mjk3NTU5OXww&ixlib=rb-4.1.0&q=80&w=1080",
        kcal: "620 kcal",
        price: "6,500",
        noPhoto: true,
        mealTime: t("enum.mealTime.LUNCH"),
      },
      {
        id: 4,
        corner: t("mock.cornerKorean"),
        name: t("mock.bibimbapSetName"),
        desc: t("mock.bibimbapSetDesc"),
        img: "https://images.unsplash.com/photo-1741295017668-c8132acd6fc0?w=600",
        kcal: "560 kcal",
        price: "7,000",
        mealTime: t("enum.mealTime.LUNCH"),
      },
      {
        id: 9,
        corner: t("mock.cornerWestern"),
        name: t("mock.udonSetName"),
        desc: t("mock.udonSetDesc"),
        img: "https://images.unsplash.com/photo-1725121463846-b23056f190df?w=600",
        kcal: "530 kcal",
        price: "6,000",
        mealTime: t("enum.mealTime.LUNCH"),
        noHero: true,
      },
      {
        id: 10,
        corner: t("mock.cornerKorean"),
        name: t("mock.chickenStewSetName"),
        desc: t("mock.chickenStewSetDesc"),
        img: "https://images.unsplash.com/photo-1723242017392-6adddc9ffda1?w=600",
        kcal: "640 kcal",
        price: "7,500",
        mealTime: t("enum.mealTime.LUNCH"),
      },
    ],
    [MealTime.DINNER]: [
      {
        id: 5,
        corner: t("mock.cornerWestern"),
        name: t("mock.pastaSetName"),
        desc: t("mock.pastaSetDesc"),
        img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
        kcal: "680 kcal",
        price: "8,500",
        mealTime: t("enum.mealTime.DINNER"),
      },
      {
        id: 6,
        corner: t("mock.cornerKorean"),
        name: t("mock.galbitangSetName"),
        desc: t("mock.galbitangSetDesc"),
        img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600",
        kcal: "720 kcal",
        price: "9,000",
        mealTime: t("enum.mealTime.DINNER"),
      },
      {
        id: 11,
        corner: t("mock.cornerWestern"),
        name: t("mock.tonkatsuSetName"),
        desc: t("mock.tonkatsuSetDesc"),
        img: "https://images.unsplash.com/photo-1677050205812-1fbf1a832efa?w=600",
        kcal: "750 kcal",
        price: "8,000",
        mealTime: t("enum.mealTime.DINNER"),
      },
      {
        id: 12,
        corner: t("mock.cornerKorean"),
        name: t("mock.japchaeSetName"),
        desc: t("mock.japchaeSetDesc"),
        img: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=600",
        kcal: "590 kcal",
        price: "7,500",
        mealTime: t("enum.mealTime.DINNER"),
      },
    ],
  };
}

// ─── 간편식 Data ─────────────────────────────────────────────
function getSimpleMeals(t: (key: string) => string) {
  return [
    {
      id: 101,
      store: t("mock.storeName"),
      name: t("mock.hamEggSandwich"),
      nameKey: "mock.hamEggSandwich",
      storeKey: "mock.storeName",
      price: "3,700",
      remaining: 5,
      img: "https://images.unsplash.com/photo-1616174900332-1264408cf779?w=300",
      deadlineValue: "D-7, 19:09:20",
      pickupDate: new Date(2025, 11, 17, 20, 0),
      status: PickupStatus.SCHEDULED as string,
    },
    {
      id: 102,
      store: t("mock.storeName"),
      name: t("mock.chickenSaladLunchbox"),
      nameKey: "mock.chickenSaladLunchbox",
      storeKey: "mock.storeName",
      price: "4,500",
      remaining: 3,
      img: "https://images.unsplash.com/photo-1573130447734-0b5a799d27a6?w=300",
      deadlineValue: "D-5, 18:00:00",
      pickupDate: new Date(2025, 11, 19, 12, 0),
      status: PickupStatus.COMPLETED as string,
    },
    {
      id: 103,
      store: t("mock.storeName"),
      name: t("mock.tunaKimbapSet"),
      nameKey: "mock.tunaKimbapSet",
      storeKey: "mock.storeName",
      price: "3,200",
      remaining: 8,
      img: "https://images.unsplash.com/photo-1656428254987-45d97432714b?w=300",
      deadlineValue: "D-3, 17:00:00",
      pickupDate: new Date(2025, 11, 20, 11, 30),
      status: PickupStatus.SCHEDULED as string,
    },
    {
      id: 104,
      store: t("mock.storeName"),
      name: t("mock.bibimbapLunchbox"),
      nameKey: "mock.bibimbapLunchbox",
      storeKey: "mock.storeName",
      price: "5,000",
      remaining: 2,
      img: "https://images.unsplash.com/photo-1741295017668-c8132acd6fc0?w=300",
      deadlineValue: "D-2, 19:00:00",
      pickupDate: new Date(2025, 11, 21, 12, 0),
      status: PaymentStatus.PAID as string,
    },
    {
      id: 105,
      store: t("mock.storeName"),
      name: t("mock.hamEggSandwich"),
      nameKey: "mock.hamEggSandwich",
      storeKey: "mock.storeName",
      price: "3,500",
      remaining: 15,
      img: "https://images.unsplash.com/photo-1616174900332-1264408cf779?w=300",
      deadlineValue: "D-4, 18:00:00",
      pickupDate: new Date(2025, 11, 18, 18, 0),
      status: PickupStatus.SCHEDULED as string,
    },
    {
      id: 106,
      store: t("mock.storeName"),
      name: t("mock.chickenSaladLunchbox"),
      nameKey: "mock.chickenSaladLunchbox",
      storeKey: "mock.storeName",
      price: "4,200",
      remaining: 0,
      img: "https://images.unsplash.com/photo-1573130447734-0b5a799d27a6?w=300",
      deadlineValue: "D-1, 17:00:00",
      pickupDate: new Date(2025, 11, 22, 12, 0),
      status: PickupStatus.SCHEDULED as string,
    },
  ];
}

const PULL_THRESHOLD = 60;

export default function App() {
  return <AppContent />;
}

// ─── App ────────────────────────────────────────────────────
function AppContent() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [appVersion, setAppVersion] = useState<"new" | "old">("new");
  const [showOldQrPayment, setShowOldQrPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<HomeTab>(HomeTab.CAFETERIA);
  const [mealTime, setMealTime] = useState<MealTime>(MealTime.LUNCH);
  const [activeNav, setActiveNav] = useState<
    "home" | "receipt" | "notification" | "my" | "map"
  >("home"); // 홈 화면 기본 표시
  const [selectedDate, setSelectedDate] = useState("26");
  const [tappedDate, setTappedDate] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showQrPayment, setShowQrPayment] = useState(false);
  const [showCorporatePoint, setShowCorporatePoint] = useState(false);
  const [showPointHub, setShowPointHub] = useState(false);
  const [showOlivePoint, setShowOlivePoint] = useState(false);
  const [showOlivePointRefund, setShowOlivePointRefund] = useState(false);
  const [showRefundCompleteAlert, setShowRefundCompleteAlert] = useState(false);
  const [refundAlertFadeIn, setRefundAlertFadeIn] = useState(false);

  const handleRefundComplete = () => {
    setShowPointHub(false);
    setShowCorporatePoint(false);
    setShowOlivePoint(false);
    setShowOlivePointRefund(false);
    setTimeout(() => {
      setShowRefundCompleteAlert(true);
      setTimeout(() => setRefundAlertFadeIn(true), 10);
    }, 250);
  };

  const closeRefundAlert = () => {
    setRefundAlertFadeIn(false);
    setTimeout(() => setShowRefundCompleteAlert(false), 250);
  };
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuDetailData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);
  const [selectedSimpleMeal, setSelectedSimpleMeal] = useState<SimpleMealData | null>(null);
  const [quickPurchaseMode, setQuickPurchaseMode] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(2025, 3, 27),
    end: new Date(2025, 4, 3),
  });
  const dateRangeLabel = useMemo(() => {
    const s = dateRange.start;
    const e = dateRange.end;
    if (!s) return t("dateRange.title");
    const months = (t("dateFormat.monthShort") as string).split(",");
    const sStr = t("dateFormat.monthDay", { month: months[s.getMonth()], monthShort: months[s.getMonth()], day: s.getDate() });
    if (!e || s.getTime() === e.getTime()) return sStr;
    const eStr = t("dateFormat.monthDay", { month: months[e.getMonth()], monthShort: months[e.getMonth()], day: e.getDate() });
    const sep = t("dateFormat.rangeSeparator") as string;
    return `${sStr}${sep}${eStr}`;
  }, [dateRange, t]);
  const [paymentConfirmAmount, setPaymentConfirmAmount] = useState<number | null>(null);
  const [paymentCompleteAmount, setPaymentCompleteAmount] = useState<number | null>(null);
  const [paymentSource, setPaymentSource] = useState<"detail" | "cart" | "reserve" | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showFindAccount, setShowFindAccount] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const touchStartY = useRef(0);
  const isPulling = useRef(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const handleScroll = () => {
      const stickyEl = stickyRef.current;
      if (!stickyEl || !scrollEl) return;
      // 스크롤이 최상단이면 기본 상태(그레이) 유지
      if (scrollEl.scrollTop <= 0) {
        setIsSticky(false);
        return;
      }
      const scrollRect = scrollEl.getBoundingClientRect();
      const stickyRect = stickyEl.getBoundingClientRect();
      // sticky 요소의 top이 스크롤 컨테이너 top에 붙으면 stuck 상태
      setIsSticky(stickyRect.top <= scrollRect.top + 1);
    };
    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    // 탭 전환 복귀 시 초기 상태 보정
    setIsSticky(false);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [activeNav]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const scrollEl = scrollRef.current;
    if (scrollEl && scrollEl.scrollTop <= 0 && !isRefreshing) {
      touchStartY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  }, [isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling.current || isRefreshing) return;
    const scrollEl = scrollRef.current;
    if (scrollEl && scrollEl.scrollTop > 0) {
      isPulling.current = false;
      setPullDistance(0);
      return;
    }
    const diff = e.touches[0].clientY - touchStartY.current;
    if (diff > 0) {
      const dampened = Math.min(diff * 0.4, 120);
      setPullDistance(dampened);
    }
  }, [isRefreshing]);

  const handleTouchEnd = useCallback(() => {
    if (!isPulling.current) return;
    isPulling.current = false;
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(PULL_THRESHOLD);
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
      }, 1500);
    } else {
      setPullDistance(0);
    }
  }, [pullDistance]);

  const menus = getMenus(t)[mealTime];
  const simpleMeals = getSimpleMeals(t);

  // ─── Cart Functions ───────────────────────────────────────────
  const handleAddToCart = useCallback((item: SimpleMealData, quantity: number) => {
    const priceNum = parseInt(item.price.replace(/,/g, ""), 10);
    const existingItem = cartItems.find((ci) => ci.id === item.id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: item.id,
          store: item.store,
          name: item.name,
          nameKey: (item as any).nameKey,
          storeKey: (item as any).storeKey,
          pickupDate: item.pickupDate,
          price: priceNum,
          img: item.img,
          pickupTime: formatMonthDayTime(item.pickupDate),
          quantity,
        },
      ]);
    }
    
    setSelectedSimpleMeal(null);
    setQuickPurchaseMode(false);
  }, [cartItems]);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [cartItems]);

  const handleRemoveItem = useCallback((id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }, [cartItems]);



  // ── 비로그인 상태: 로그인/회원가입/아이디찾기 흐름 ──
  if (!isLoggedIn) {
    return (
      <>
      <Toaster position="top-center" style={{ zIndex: 9999 }} toastOptions={{ style: toastBaseStyle }} />
      <div style={styles.screen}>
        <style>{animationKeyframes}</style>

        {/* 기본: 로그인 페이지 */}
        {!showSignup && !showFindAccount && (
          <LoginPage
            onBack={() => {
              setIsLoggedIn(true);
              setActiveNav("home");
            }}
            onLogin={(company) => {
              setIsLoggedIn(true);
              setActiveNav("home");
            }}
            onFindAccount={() => setShowFindAccount(true)}
            onSignup={() => setShowSignup(true)}
          />
        )}

        {/* 회원가입 */}
        {showSignup && (
          <SignupPage
            onBack={() => setShowSignup(false)}
            onGoLogin={() => setShowSignup(false)}
          />
        )}

        {/* 아이디/비밀번호 찾기 */}
        {showFindAccount && (
          <FindAccountPage
            onBack={() => setShowFindAccount(false)}
            onGoLogin={() => setShowFindAccount(false)}
          />
        )}
      </div>
      </>
    );
  }

  return (
    <>
    <Toaster position="top-center" style={{ zIndex: 9999 }} toastOptions={{ style: toastBaseStyle }} />
    <div style={styles.screen}>
      {/* ── Injected Keyframes ── */}
      <style>{animationKeyframes}</style>
      {/* ── Header: Home ── */}
      {activeNav === "home" && appVersion === "new" && (
      <header style={{
        ...styles.header,
        borderBottom: isSticky ? "none" : `1px solid ${colors.gray6}`,
        boxShadow: isSticky ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
      }}>
        <div style={styles.headerLeft}>
          <div style={{ width: 26, height: 26, flexShrink: 0, cursor: "pointer" }} onClick={() => setShowDocs(true)}>
            <svg
              viewBox="0 0 466.474 466.337"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                <linearGradient
                  id="logoGrad"
                  x1="233.237"
                  x2="233.237"
                  y1="0"
                  y2="466.337"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF4048" />
                  <stop offset="0.5" stopColor="#ED1B24" />
                  <stop offset="1" stopColor="#FF4048" />
                </linearGradient>
              </defs>
              <path
                d={svgPaths.p1734a880}
                fill="url(#logoGrad)"
              />
              <ellipse
                cx="233.284"
                cy="233.165"
                fill="white"
                rx="147.259"
                ry="144.845"
              />
              <path d={svgPaths.pcd2280} fill="#EE2B2F" />
            </svg>
          </div>
          <div style={styles.headerSearchBar as any}>
            <Search size={16} strokeWidth={2} color={colors.gray2} style={{ flexShrink: 0 }} />
            <span style={styles.headerSearchText as any}>{t("map.searchPlaceholder")}</span>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.iconBtn} onClick={() => setShowCart(true)}>
            <ShoppingCart
              size={24}
              strokeWidth={2.2}
              color={colors.black}
            />
            {cartItems.length > 0 && (
              <span style={styles.cartBadge}>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
          <button style={styles.iconBtn} onClick={() => setActiveNav("map")}>
            <MapPin
              size={24}
              strokeWidth={2.2}
              color={colors.black}
            />
          </button>
          <button style={styles.iconBtn} onClick={() => setActiveNav("notification")}>
            <Bell
              size={24}
              strokeWidth={2.2}
              color={colors.black}
            />
            <span style={styles.bellDot} />
          </button>
        </div>
      </header>
      )}
      {/* ── Header: My올리브 ── */}
      {activeNav === "my" && appVersion === "new" && (
      <header style={{
        ...styles.header,
        borderBottom: `1px solid ${colors.gray6}`,
      }}>
        <span style={styles.headerTitle}>{t("my.title")}</span>
        <button style={styles.iconBtn} onClick={() => setActiveNav("notification")}>
          <Bell
            size={24}
            strokeWidth={2.2}
            color={colors.black}
          />
          <span style={styles.bellDot} />
        </button>
      </header>
      )}
      {/* ── Notification Nav Tab (헤더/스크롤 영역 대체) ── */}
      {activeNav === "notification" && (
        <NotificationPage asNavTab onBack={() => setActiveNav("home")} />
      )}
      {/* ── Map Nav Tab ── */}
      {activeNav === "map" && (
        <MapPage onBack={() => setActiveNav("home")} />
      )}

      {/* ── Scroll Area ── */}
      {activeNav !== "notification" && activeNav !== "map" && (
      <div
        style={{
          ...styles.scrollArea,
          backgroundColor: pullDistance > 0 || isRefreshing ? colors.bg : colors.white,
        }}
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activeNav === "receipt" && appVersion === "old" ? (
          <OldVersionPaymentHistoryPage />
        ) : activeNav === "receipt" ? (
          <PaymentHistoryPage onItemClick={(item) => setSelectedPayment(item)} />
        ) : activeNav === "my" && appVersion === "old" ? (
          <OldVersionMyOlivePage
            onProfileClick={() => setShowUserProfile(true)}
            onSave={(toastMessage) => {
              showSuccessToast(toastMessage);
            }}
            appVersion={appVersion}
            onVersionChange={setAppVersion}
          />
        ) : activeNav === "my" ? (
          <MyOlivePage
            onProfileClick={() => setShowUserProfile(true)}
            onSave={(toastMessage) => {
              showSuccessToast(toastMessage);
            }}
            appVersion={appVersion}
            onVersionChange={setAppVersion}
          />
        ) : appVersion === "old" ? (
          <OldVersionHomePage onQrPayment={() => setShowOldQrPayment(true)} />
        ) : (
        <>
        {/* ── Pull to Refresh Indicator ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: pullDistance > 0 || isRefreshing ? pullDistance : 0,
            overflow: "hidden",
            backgroundColor: colors.bg,
          }}
        >
          {(pullDistance > 0 || isRefreshing) && (
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: radius.full,
                border: `2.5px solid ${colors.gray5}`,
                borderTopColor: colors.gray2,
                animation: isRefreshing
                  ? "spinLoader 0.8s linear infinite"
                  : "none",
                transform: isRefreshing
                  ? undefined
                  : `rotate(${(pullDistance / PULL_THRESHOLD) * 270}deg)`,
              }}
            />
          )}
        </div>

        {/* ── Points Card ── */}
        <div style={styles.pointsSection}>
          <div style={{...styles.pointsCard, cursor: "pointer"}} onClick={() => setShowPointHub(true)}>
            <p style={styles.pointsLabel}>{t("home.availablePoint")}</p>
            <div style={styles.pointsRight}>
              <p style={styles.pointsValue}>{formatAmountStr("58,690")}</p>
              <ChevronRight
                size={18}
                strokeWidth={2.5}
                color={colors.gray2}
              />
            </div>
          </div>
        </div>

        {/* ── Sticky: Tabs + Calendar ── */}
        <div
          ref={stickyRef}
          style={{
            ...styles.stickyHeader,
            backgroundColor: isSticky ? colors.white : colors.bg,
          }}
        >
          {/* ── Main Tabs ── */}
          <div
            style={{
              ...styles.tabsSection,
              backgroundColor: isSticky ? colors.white : colors.bg,
            }}
          >
            <div style={styles.tabsRow}>
              {([HomeTab.CAFETERIA, HomeTab.SIMPLE_MEAL] as HomeTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                      setActiveTab(tab);
                      if (scrollRef.current) {
                        scrollRef.current.scrollTop = 0;
                        setIsSticky(false);
                      }
                    }}
                  style={{
                    ...styles.tabBtn,
                    fontSize: 16,
                    fontWeight: activeTab === tab ? 700 : 500,
                    color:
                      activeTab === tab
                        ? colors.black
                        : colors.gray3,
                  }}
                >
                  {t(homeTabKey[tab])}
                  {activeTab === tab && (
                    <span style={styles.tabIndicator} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Week Calendar (구내식당 only) ── */}
          {activeTab === HomeTab.CAFETERIA && (
          <div
            style={{
              ...styles.calendarSection,
              backgroundColor: isSticky ? colors.white : colors.bg,
              borderBottom: `1px solid #D9D9D9`,
              boxShadow: "none",
            }}
          >
            <div style={styles.calendarRow}>
              {DAYS.map(({ dayKey, date, color, isToday }) => {
                const isSelected = selectedDate === date;
                return (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setTappedDate(null);
                      requestAnimationFrame(() => setTappedDate(date));
                    }}
                    onAnimationEnd={() => setTappedDate(null)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      flex: 1,
                      minWidth: 0,
                      height: 58,
                      borderRadius: radius.md,
                      border: isSelected
                        ? `2.5px solid ${colors.black}`
                        : "2.5px solid transparent",
                      backgroundColor: isSelected
                        ? (isSticky ? colors.white : colors.bg)
                        : "transparent",
                      boxShadow: isSelected
                        ? "0 2px 10px rgba(0,0,0,0.10)"
                        : "none",
                      paddingTop: 6,
                      paddingRight: 4,
                      paddingBottom: 6,
                      paddingLeft: 4,
                      animationName:
                        tappedDate === date ? "dayTapBounce" : "none",
                      animationDuration: "0.3s",
                      animationTimingFunction: "ease-in-out",
                      animationFillMode: "forwards",
                    }}
                  >
                    <span
                      style={{
                        fontSize: isToday ? 11 : 12,
                        fontWeight: isToday ? 700 : 500,
                        color: isSelected
                          ? colors.black
                          : colors.gray2,
                      }}
                    >
                      {t(dayKey)}
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? colors.black : color,
                      }}
                    >
                      {date}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          )}
        </div>

        {/* ── 간편식: Date Range Selector ── */}
        {activeTab === HomeTab.SIMPLE_MEAL && (
          <div style={{
            paddingLeft: spacing.lg,
            paddingRight: spacing.lg,
            paddingTop: spacing.md + 4,
            paddingBottom: 12,
            backgroundColor: colors.white,
          }}>
            <button style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 6,
              backgroundColor: "#F0F1F3",
              border: "none",
              borderRadius: radius.md,
              width: "100%",
              paddingLeft: 14,
              paddingTop: 12,
              paddingBottom: 12,
            }} onClick={() => setShowDatePicker(true)}>
              <Calendar size={15} strokeWidth={2.2} color={colors.black} style={{ marginTop: -1 }} />
              <span style={{
                fontSize: 14,
                fontWeight: 700,
                color: colors.black,
                letterSpacing: -0.48,
              }}>{dateRangeLabel}</span>
              <span style={{ flex: 1 }} />
              <ChevronDown size={14} strokeWidth={2} color={colors.gray2} style={{ marginRight: 14 }} />
            </button>
          </div>
        )}

        {/* ── Event Banner ── */}
        <div style={styles.bannerSection}>
          <div style={styles.bannerWrap}>
            <div style={styles.bannerCircle1} />
            <div style={styles.bannerCircle2} />
            <div style={styles.bannerContent}>
              <p style={styles.bannerTag}>{t("home.bannerTag")}</p>
              <p style={styles.bannerSub}>
                {t("home.bannerSub")}
              </p>
              <p style={styles.bannerTitle}>{t("home.bannerTitle")}</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1760020890915-ca605575b93b?w=300"
              alt="event"
              style={styles.bannerImg}
            />
          </div>
        </div>

        {/* ── Meal Time Selector (구내식당 only) ── */}
        {activeTab === HomeTab.CAFETERIA && (
        <div style={styles.mealTabsSection}>
          {([MealTime.BREAKFAST, MealTime.LUNCH, MealTime.DINNER] as MealTime[]).map((mt) => (
            <button
              key={mt}
              onClick={() => setMealTime(mt)}
              style={{
                fontSize: 13,
                fontWeight: mealTime === mt ? 700 : 500,
                color:
                  mealTime === mt ? colors.white : colors.gray2,
                backgroundColor:
                  mealTime === mt ? colors.black : colors.white,
                border:
                  mealTime === mt
                    ? "none"
                    : `1px solid ${colors.gray5}`,
                borderRadius: radius.full,
                paddingLeft: spacing.xl,
                paddingRight: spacing.xl,
                paddingTop: spacing.sm,
                paddingBottom: spacing.sm,
                letterSpacing: -0.3,
                whiteSpace: "nowrap" as const,
                flexShrink: 0,
              }}
            >
              {t(mealTimeKey[mt])}
            </button>
          ))}
        </div>
        )}

        {/* ── Menu Cards (구내식당) ── */}
        {activeTab === HomeTab.CAFETERIA && (
        <div style={styles.menuGrid}>
          {menus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              onClick={() => setSelectedMenu(menu)}
            />
          ))}
        </div>
        )}

        {/* ── 간편식 List ── */}
        {activeTab === HomeTab.SIMPLE_MEAL && (
          <div style={{
            paddingLeft: spacing.lg,
            paddingRight: spacing.lg,
            paddingTop: 30,
            paddingBottom: spacing.xxl + 20,
            backgroundColor: colors.white,
            display: "flex",
            flexDirection: "column",
          }}>
            {simpleMeals.map((item, idx) => (
              <SimpleMealCard 
                key={item.id} 
                item={item} 
                isLast={idx === simpleMeals.length - 1} 
                onItemClick={() => {
                  setSelectedSimpleMeal(item);
                  setQuickPurchaseMode(false);
                }} 
                onQuickPurchase={() => {
                  setSelectedSimpleMeal(item);
                  setQuickPurchaseMode(true);
                }} 
              />
            ))}
          </div>
        )}


        </>
        )}
      </div>
      )} {/* end activeNav !== "notification" */}

      {/* ── Floating Cart Bottom Bar (간편식 담기 후) ── */}
      {cartItems.length > 0 && activeNav === "home" && activeTab === HomeTab.SIMPLE_MEAL && !showCart && !selectedSimpleMeal && (
        <div style={{
          backgroundColor: colors.white,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
          paddingTop: 14,
          paddingRight: 20,
          paddingBottom: 14,
          paddingLeft: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          zIndex: 11,
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            <span style={{
              fontSize: 12,
              fontWeight: 400,
              color: colors.black,
              letterSpacing: -0.11,
            }}>{t("paymentComplete.totalPayment")}</span>
            <span style={{
              fontSize: 19,
              fontWeight: 700,
              color: colors.black,
              letterSpacing: -0.19,
            }}>{formatAmount(cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0))}</span>
          </div>
          <button
            onClick={() => setShowCart(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: 46,
              paddingLeft: 24,
              paddingRight: 24,
              borderRadius: 10,
              border: "none",
              backgroundColor: colors.primary,
              cursor: "pointer",
            }}
          >
            <div style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: colors.white,
              position: "relative",
              flexShrink: 0,
            }}>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                color: colors.primary,
                letterSpacing: -0.1,
                lineHeight: 1,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>{cartItems.reduce((sum, ci) => sum + ci.quantity, 0)}</span>
            </div>
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              color: colors.white,
              letterSpacing: -0.15,
            }}>{t("home.cart")}</span>
          </button>
        </div>
      )}

      {/* ── Bottom Nav ── */}
      <div style={styles.bottomNav}>
        <NavBtn
          icon={
            <Home
              size={22}
              strokeWidth={activeNav === "home" ? 2.2 : 1.8}
              color={activeNav === "home" ? colors.primary : colors.gray4}
            />
          }
          label={t("nav.home")}
          active={activeNav === "home"}
          onClick={() => setActiveNav("home")}
        />
        <NavBtn
          icon={
            <ScrollText
              size={22}
              strokeWidth={activeNav === "receipt" ? 2.2 : 1.8}
              color={activeNav === "receipt" ? colors.primary : colors.gray4}
            />
          }
          label={t("nav.history")}
          active={activeNav === "receipt"}
          onClick={() => setActiveNav("receipt")}
        />
        <NavBtn
          icon={
            <UserRound
              size={22}
              strokeWidth={activeNav === "my" ? 2.2 : 1.8}
              color={activeNav === "my" ? colors.primary : colors.gray4}
            />
          }
          label={t("nav.my")}
          active={activeNav === "my"}
          onClick={() => setActiveNav("my")}
        />
      </div>

      {/* ── Floating QR Button ── */}
      {/* ── 구버전 결제 FAB ── */}
      {activeNav === "home" && appVersion === "old" && (
      <button style={styles.floatingQR} onClick={() => setShowOldQrPayment(true)}>
        <div style={{ width: 20, height: 17, flexShrink: 0 }}>
          <QrIcon />
        </div>
        결제하기
      </button>
      )}
      {/* ── 뉴버전 결제 FAB ── */}
      {activeNav === "home" && activeTab === HomeTab.CAFETERIA && appVersion === "new" && (
      <button style={styles.floatingQR} onClick={() => setShowQrPayment(true)}>
        <div style={{ width: 20, height: 17, flexShrink: 0 }}>
          <QrIcon />
        </div>
        {t("home.qrPay")}
      </button>
      )}

      {/* ── QR Payment Page ── */}
      {showQrPayment && (
        <QrPaymentPage onBack={() => setShowQrPayment(false)} />
      )}

      {/* ── 구버전 QR Payment Page ── */}
      {showOldQrPayment && (
        <OldVersionQrPaymentPage onBack={() => setShowOldQrPayment(false)} />
      )}



      {/* ── Point Hub Page ── */}
      {showPointHub && (
        <PointHubPage
          onBack={() => setShowPointHub(false)}
          onCorporatePointClick={() => setShowCorporatePoint(true)}
          onOlivePointClick={() => setShowOlivePoint(true)}
          onRefundClick={() => setShowOlivePointRefund(true)}
        />
      )}

      {/* ── Olive Point Page ── */}
      {showOlivePoint && (
        <OlivePointPage
          onBack={() => setShowOlivePoint(false)}
          onRefundComplete={handleRefundComplete}
        />
      )}

      {/* ── Olive Point Refund Page (from hub) ── */}
      {showOlivePointRefund && (
        <OlivePointRefundPage
          onBack={() => setShowOlivePointRefund(false)}
          onRefundComplete={handleRefundComplete}
        />
      )}

      {/* ── Refund Complete Alert ── */}
      {showRefundCompleteAlert && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(25,26,28,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 500,
            transition: "opacity 0.25s ease",
            opacity: refundAlertFadeIn ? 1 : 0,
            fontFamily,
          }}
          onClick={closeRefundAlert}
        >
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: 16,
              padding: "36px 28px 20px",
              width: "calc(100% - 80px)",
              maxWidth: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.25s ease, opacity 0.25s ease",
              transform: refundAlertFadeIn ? "scale(1)" : "scale(0.92)",
              opacity: refundAlertFadeIn ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#E8F5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{
              fontSize: 16,
              fontWeight: 700,
              color: colors.black,
              letterSpacing: -0.3,
              textAlign: "center",
              margin: 0,
              marginBottom: 24,
            }}>
              {t("olivePointRefund.completedAlert")}
            </p>
            <button
              style={{
                width: "100%",
                height: 48,
                borderRadius: 12,
                border: "none",
                backgroundColor: colors.primary,
                color: colors.white,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: -0.16,
                cursor: "pointer",
                fontFamily,
              }}
              onClick={closeRefundAlert}
            >
              {t("common.confirm")}
            </button>
          </div>
        </div>
      )}

      {/* ── Corporate Point Page ── */}
      {showCorporatePoint && (
        <CorporatePointPage onBack={() => setShowCorporatePoint(false)} />
      )}

      {/* ── User Profile Page ── */}
      {showUserProfile && (
        <UserProfilePage
          onBack={() => setShowUserProfile(false)}
          onSave={(toastMessage) => {
            setShowUserProfile(false);
            showSuccessToast(toastMessage);
          }}
          onLogout={() => {
            setShowUserProfile(false);
            setActiveNav("home");
            setIsLoggedIn(false);
          }}
        />
      )}

      {/* ── Docs Page ── */}
      {showDocs && (
        <DocsPage onBack={() => setShowDocs(false)} />
      )}


      {/* ── Menu Detail Page ── */}
      {selectedMenu && (
        <MenuDetailPage
          menu={selectedMenu}
          onBack={() => setSelectedMenu(null)}
          onPay={() => {
            setSelectedMenu(null);
            setShowQrPayment(true);
          }}
        />
      )}

      {/* ── Payment Detail Page ── */}
      {selectedPayment && (
        <PaymentDetailPage
          payment={selectedPayment}
          onBack={() => setSelectedPayment(null)}
          onCancelOrder={() => {
            setSelectedPayment(null);
            setActiveNav("home");
            showPlainToast(t("toast.orderCancelled"));
          }}
        />
      )}

      {/* ── Simple Meal Detail Page ── */}
      {selectedSimpleMeal && (
        <SimpleMealDetailPage
          item={selectedSimpleMeal}
          onBack={() => {
            setSelectedSimpleMeal(null);
            setQuickPurchaseMode(false);
          }}
          quickPurchaseMode={quickPurchaseMode}
          noHero={selectedSimpleMeal.id === 103}
          onAddToCart={handleAddToCart}
          onDirectPay={(amount) => {
            setPaymentConfirmAmount(amount);
            setPaymentSource("detail");
          }}
        />
      )}

      {/* ── Cart Page ── */}
      {showCart && (
        <CartPageOption4
          items={cartItems}
          onBack={() => setShowCart(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onAddMenu={() => {
            setShowCart(false);
            setActiveTab(HomeTab.SIMPLE_MEAL);
          }}
          onCheckout={() => {
            const total = cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            setPaymentConfirmAmount(total);
            setPaymentSource("cart");
          }}
        />
      )}

      {/* ── Date Range Picker Page ── */}
      {showDatePicker && (
        <DateRangePickerPage
          onBack={() => setShowDatePicker(false)}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      )}

      {/* ── Payment Confirm Popup ── */}
      {paymentConfirmAmount !== null && (
        <PaymentConfirmPopup
          amount={paymentConfirmAmount}
          onCancel={() => {
            setPaymentConfirmAmount(null);
            setPaymentSource(null);
          }}
          onConfirm={() => {
            const amount = paymentConfirmAmount;
            setPaymentConfirmAmount(null);
            setPaymentCompleteAmount(amount);
          }}
        />
      )}

      {/* ── Payment Complete Popup → Page (간편식) / Popup (QR) ── */}
      {paymentCompleteAmount !== null && (paymentSource === "detail" || paymentSource === "cart") && (
        <PaymentCompletePage
          totalAmount={paymentCompleteAmount}
          items={
            paymentSource === "cart"
              ? cartItems.map((ci, idx) => ({
                  name: ci.name,
                  price: ci.price,
                  quantity: ci.quantity,
                  img: ci.img,
                  pickupStatus: PickupStatus.SCHEDULED,
                  pickupDateTime: ci.pickupTime,
                  paymentNumber: `PAY-${String(Date.now()).slice(-6)}${String(idx + 1).padStart(2, "0")}`,
                }))
              : paymentSource === "detail" && selectedSimpleMeal
              ? [{
                  name: selectedSimpleMeal.name,
                  price: parseInt(selectedSimpleMeal.price.replace(/,/g, ""), 10),
                  quantity: 1,
                  img: selectedSimpleMeal.img,
                  pickupStatus: PickupStatus.SCHEDULED,
                  pickupDateTime: formatMonthDayTime(selectedSimpleMeal.pickupDate),
                  paymentNumber: `PAY-${String(Date.now()).slice(-8)}`,
                }]
              : []
          }
          onClose={() => {
            setPaymentCompleteAmount(null);
            if (paymentSource === "detail") {
              setSelectedSimpleMeal(null);
              setQuickPurchaseMode(false);
            } else if (paymentSource === "cart") {
              setCartItems([]);
              setShowCart(false);
            }
            setPaymentSource(null);
          }}
        />
      )}

      {/* ── Payment Complete Popup (QR 등 기타) ── */}
      {paymentCompleteAmount !== null && paymentSource !== "detail" && paymentSource !== "cart" && (
        <PaymentCompletePopup
          amount={paymentCompleteAmount}
          onClose={() => {
            setPaymentCompleteAmount(null);
            setPaymentSource(null);
          }}
          onAdditionalPay={() => {
            setPaymentCompleteAmount(null);
            setPaymentSource(null);
            setActiveTab(HomeTab.SIMPLE_MEAL);
          }}
        />
      )}


    </div>
    </>
  );
}

// ─── Sub Components ───────────────────────────────────────────

function NavBtn({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} style={styles.navBtn}>
      {icon}
      <span
        style={{
          ...styles.navLabel,
          color: active ? colors.primary : colors.gray4,
        }}
      >
        {label}
      </span>
    </button>
  );
}

function MenuCard({
  menu,
  onClick,
}: {
  menu: {
    corner: string;
    name: string;
    desc: string;
    img: string;
    kcal: string;
    price: string;
    noPhoto?: boolean;
  };
  onClick: () => void;
}) {
  return (
    <div style={styles.menuCard} onClick={onClick}>
      <div style={{
        ...styles.menuImgWrap,
        backgroundColor: menu.noPhoto ? colors.gray6 : undefined,
      }}>
        {!menu.noPhoto && (
          <img
            src={menu.img}
            alt={menu.name}
            style={styles.menuImg}
          />
        )}
        {menu.noPhoto && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}>
            <svg width="64" height="52" viewBox="0 0 64 52" fill="none">
              {/* plate */}
              <ellipse cx="32" cy="44" rx="28" ry="6" fill="#D9D9D9" />
              {/* dome */}
              <path d="M8 40 C8 20, 56 20, 56 40" fill="#E0E0E0" />
              <path d="M8 40 L56 40" stroke="#D0D0D0" strokeWidth="1.5" />
              {/* handle */}
              <rect x="29" y="16" width="6" height="6" rx="3" fill="#CDCDCD" />
            </svg>
          </div>
        )}
      </div>
      <div style={styles.menuBody}>
        <span style={styles.menuCorner}>{menu.corner}</span>
        <span style={styles.menuName}>{menu.name}</span>
        <span style={styles.menuDesc}>{menu.desc}</span>
        <div style={styles.menuPriceRow}>
          <span style={styles.menuPrice}>{formatAmountStr(menu.price)}</span>
        </div>
      </div>
    </div>
  );
}

function SimpleMealCard({
  item,
  isLast,
  onItemClick,
  onQuickPurchase,
}: {
  item: {
    id: number;
    store: string;
    name: string;
    price: string;
    remaining: number;
    img: string;
    deadlineValue: string;
    pickupDate: Date;
    status?: string;
  };
  isLast: boolean;
  onItemClick: () => void;
  onQuickPurchase: () => void;
}) {
  const { t } = useTranslation();
  const isSoldOut = item.remaining === 0;
  const isLowStock = item.remaining <= 9;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      paddingBottom: isLast ? 0 : 20,
      borderBottom: isLast ? "none" : `1px solid ${colors.gray6}`,
      marginBottom: isLast ? 0 : 20,
      opacity: isSoldOut ? 0.5 : 1,
    }}>
      {/* ── Top: Info + Thumbnail ── */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 14,
        cursor: isSoldOut ? "default" : "pointer",
      }} onClick={isSoldOut ? undefined : onItemClick}>
        {/* Right: thumbnail (placed first visually via order) */}
        <div style={{
          width: 82,
          height: 82,
          borderRadius: radius.md,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <img
            src={item.img}
            alt={item.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        {/* Left: text info */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          paddingTop: 2,
        }}>
          <span style={{
            fontSize: 12,
            fontWeight: 500,
            color: colors.gray2,
            letterSpacing: -0.2,
          }}>{item.store}</span>
          <span style={{
            fontSize: 17,
            fontWeight: 700,
            color: colors.black,
            letterSpacing: -0.3,
            marginTop: 2,
          }}>{item.name}</span>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 5,
          }}>
            <span style={{
              fontSize: 17,
              fontWeight: 800,
              color: colors.black,
              letterSpacing: -0.3,
            }}>{formatAmountStr(item.price)}</span>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: 12,
              fontWeight: 600,
              color: isSoldOut ? colors.gray2 : isLowStock ? colors.primary : colors.blue,
              backgroundColor: isSoldOut ? "#F3F4F6" : isLowStock ? "rgba(238,43,47,0.08)" : "rgba(29,138,255,0.08)",
              borderRadius: radius.full,
              paddingLeft: 7,
              paddingRight: 7,
              paddingTop: 2,
              paddingBottom: 2,
              letterSpacing: -0.2,
            }}>{t("home.stockLeft", { count: item.remaining })}</span>
          </div>
        </div>
      </div>

      {/* ── Bottom: Reservation info bar ── */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        backgroundColor: "#F3F4F6",
        borderRadius: radius.md,
        paddingTop: 11,
        paddingRight: 14,
        paddingBottom: 11,
        paddingLeft: 14,
        gap: 0,
      }}>
        {/* 예약마감 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={13} strokeWidth={2} color={colors.gray2} style={{ flexShrink: 0 }} />
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.gray2,
              letterSpacing: -0.2,
            }}>{t("simpleMealDetail.reservationDeadline")}</span>
          </div>
          <span style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.black,
            letterSpacing: -0.3,
          }}>{item.deadlineValue}</span>
        </div>

        {/* Divider */}
        <div style={{
          width: 1,
          height: 28,
          backgroundColor: colors.gray5,
          flexShrink: 0,
          marginLeft: 8,
          marginRight: 12,
        }} />

        {/* 픽업 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <ShoppingBag size={13} strokeWidth={2} color={colors.gray2} style={{ flexShrink: 0 }} />
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.gray2,
              letterSpacing: -0.2,
            }}>{t("simpleMealDetail.pickupLabel")}</span>
          </div>
          <span style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.black,
            letterSpacing: -0.3,
          }}>{formatMonthDayTime(item.pickupDate)}</span>
        </div>

        {/* 예약 Button */}
        <button style={{
          backgroundColor: colors.primary,
          border: "none",
          borderRadius: radius.sm,
          paddingLeft: 18,
          paddingRight: 18,
          paddingTop: 9,
          paddingBottom: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginLeft: 8,
        }} onClick={(e) => {
          e.stopPropagation();
          onQuickPurchase();
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: colors.white,
            letterSpacing: -0.2,
          }}>{t("home.orderBtn")}</span>
        </button>
      </div>
    </div>
  );
}