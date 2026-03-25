/**
 * 구버전 홈 — 맛집/지도 탭, 배너, 필터, 맛집 리스트
 */
import type { CSSProperties } from "react";
import { useState } from "react";
import { Search, Bookmark, MapPin, SlidersHorizontal } from "lucide-react";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import QrIcon from "../../imports/QrIcon";

// ─── Types ───────────────────────────────────────────────────
interface Restaurant {
  name: string;
  desc: string;
  location: string;
  image: string;
}

// ─── Mock Data ───────────────────────────────────────────────
const restaurants: Restaurant[] = [
  {
    name: "(LA)라돈까스",
    desc: "돈까스 전문점 LA돈까스입니다.",
    location: "서울 종로/대학로/동대문",
    image: "",
  },
  {
    name: "「현대 판교점」미딤",
    desc: "신사동 대표맛집 미미면가X딩딤1968의 콜라보레이션",
    location: "경기 판교",
    image: "",
  },
  {
    name: "「현대 판교점」스트릿",
    desc: "아시아 각 지역의 누들&라이스 전문점",
    location: "경기 판교",
    image: "",
  },
];

type FilterTab = "nearby" | "all" | "cafeteria";

// ─── Component ───────────────────────────────────────────────
export default function OldVersionHomePage({
  onQrPayment,
}: {
  onQrPayment?: () => void;
}) {
  const [headerTab, setHeaderTab] = useState<"restaurant" | "map">("restaurant");
  const [filter, setFilter] = useState<FilterTab>("all");

  const filterTabs: { key: FilterTab; label: string; icon?: boolean }[] = [
    { key: "nearby", label: "회사 주변", icon: true },
    { key: "all", label: "전체" },
    { key: "cafeteria", label: "구내식당" },
  ];

  return (
    <div style={s.container}>
      {/* ── Header (탭 + 아이콘 1줄) ── */}
      <div style={s.headerBar}>
        <div style={s.tabBar}>
          {(["restaurant", "map"] as const).map((tab) => {
            const active = headerTab === tab;
            return (
              <button
                key={tab}
                style={{
                  ...s.tabItem,
                  fontWeight: active ? 700 : 500,
                  color: active ? colors.black : colors.gray3,
                }}
                onClick={() => setHeaderTab(tab)}
              >
                {tab === "restaurant" ? "맛집" : "지도"}
                {active && <span style={s.tabIndicator} />}
              </button>
            );
          })}
        </div>
        <div style={s.headerRight}>
          <button style={s.iconBtn}>
            <Search size={24} strokeWidth={2.2} color={colors.black} />
          </button>
          <button style={s.iconBtn}>
            <Bookmark size={24} strokeWidth={2.2} color={colors.black} />
          </button>
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        {/* ── Banner ── */}
        <div style={s.banner}>
          <div style={s.bannerContent}>
            <span style={s.bannerSubtitle}>사랑해밥상</span>
            <div style={s.bannerPriceRow}>
              <span style={s.bannerOriginalPrice}>9,000원</span>
              <span style={s.bannerPrice}>7,500원</span>
            </div>
            <span style={s.bannerLabel}>기업고객 매일특가</span>
          </div>
          <div style={s.bannerCta}>
            <span style={s.bannerCtaText}>무료 신청 &gt;</span>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div style={s.filterRow}>
          {filterTabs.map((tab) => {
            const active = filter === tab.key;
            return (
              <div
                key={tab.key}
                style={{
                  ...s.filterChip,
                  backgroundColor: active ? colors.primary : colors.white,
                  border: active ? `1px solid ${colors.primary}` : `1px solid ${colors.gray5}`,
                }}
                onClick={() => setFilter(tab.key)}
              >
                {tab.icon && (
                  <SlidersHorizontal
                    size={14}
                    strokeWidth={2.2}
                    color={active ? colors.white : colors.gray1}
                  />
                )}
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: active ? colors.white : colors.black,
                    letterSpacing: -0.2,
                  }}
                >
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Restaurant List ── */}
        <div style={s.list}>
          {restaurants.map((item, idx) => (
            <div
              key={idx}
              style={{
                ...s.listItem,
                borderTop: idx === 0 ? "none" : `1px solid ${colors.gray5}`,
              }}
            >
              <div style={s.listItemContent}>
                <span style={s.listItemName}>{item.name}</span>
                <span style={s.listItemDesc}>{item.desc}</span>
                <div style={s.listItemMeta}>
                  <div style={s.metaItem}>
                    <Bookmark size={14} strokeWidth={1.8} color={colors.gray2} />
                    <span style={s.metaText}>저장</span>
                  </div>
                  <div style={s.metaItem}>
                    <MapPin size={14} strokeWidth={1.8} color={colors.gray2} />
                    <span style={s.metaText}>{item.location}</span>
                  </div>
                </div>
              </div>
              <div style={s.listItemImage}>
                <div style={s.imagePlaceholder} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: colors.white,
    fontFamily,
  },

  /* Header Bar (1줄: 탭 + 아이콘) */
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray5}`,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    paddingRight: spacing.sm,
    flexShrink: 0,
    zIndex: 10,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    flexShrink: 0,
  },
  iconBtn: {
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: spacing.xl,
  },
  tabItem: {
    position: "relative",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: 24,
    fontSize: 16,
    letterSpacing: -0.3,
    cursor: "pointer",
    fontFamily,
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
    borderRadius: 999,
  },

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: colors.white,
  },

  /* Banner */
  banner: {
    margin: `0 ${spacing.lg}px`,
    marginTop: spacing.sm,
    borderRadius: radius.md,
    overflow: "hidden",
    background: `linear-gradient(135deg, #F5E6D0 0%, #E8D4B8 100%)`,
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${spacing.xl}px`,
    position: "relative",
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    zIndex: 1,
  },
  bannerSubtitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#3D2B1F",
    letterSpacing: -0.5,
  },
  bannerLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#8B6E54",
    letterSpacing: -0.2,
  },
  bannerPriceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
  },
  bannerOriginalPrice: {
    fontSize: 13,
    fontWeight: 500,
    color: "#A89280",
    textDecoration: "line-through",
  },
  bannerPrice: {
    fontSize: 26,
    fontWeight: 800,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  bannerCta: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingTop: 8,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 14,
  },
  bannerCtaText: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.2,
  },

  /* Filter Tabs */
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingTop: spacing.lg,
    paddingRight: spacing.lg,
    paddingBottom: spacing.md,
    paddingLeft: spacing.lg,
  },
  filterChip: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    paddingTop: 9,
    paddingRight: 16,
    paddingBottom: 9,
    paddingLeft: 16,
    borderRadius: radius.full,
    cursor: "pointer",
  },

  /* Restaurant List */
  list: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 18,
    paddingBottom: 18,
    gap: 16,
  },
  listItemContent: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
    minWidth: 0,
  },
  listItemName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  listItemDesc: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.gray1,
    letterSpacing: -0.2,
    lineHeight: "1.4",
  },
  listItemMeta: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 2,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    fontWeight: 400,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  listItemImage: {
    flexShrink: 0,
  },
  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: radius.md,
    backgroundColor: colors.gray6,
  },

  /* FAB */
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    border: "none",
    borderRadius: radius.full,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 24,
    boxShadow: "0 4px 16px rgba(238,43,47,0.35)",
    cursor: "pointer",
    zIndex: 10,
  },
  fabText: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.2,
  },
};
