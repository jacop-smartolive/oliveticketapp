/**
 * 식당·카페 탭 (홈)
 * - 필터 칩(회사 주변 / 주문방법 / 음식 종류)
 * - 이벤트 배너
 * - 다양한 가맹점 리스트 (현장결제 / 미리주문 뱃지)
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { Crosshair, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, radius } from "../shared/tokens";
import RegionSelectPage from "./RegionSelectPage";
import RestaurantDetailPage from "./RestaurantDetailPage";

const ORDER_OPTIONS = ["restaurantCafe.onSite", "restaurantCafe.preOrder"];
const CUISINE_OPTIONS = [
  "restaurantCafe.catKorean",
  "restaurantCafe.catChinese",
  "restaurantCafe.catJapanese",
  "restaurantCafe.catSalad",
  "restaurantCafe.catBurger",
  "restaurantCafe.catCafeDessert",
  "restaurantCafe.catEtc",
];

interface Merchant {
  id: number;
  nameKey: string;
  cuisineKey: string;
  emoji: string;
  thumbBg: string;
  preOrder: boolean;
}

const MERCHANTS: Merchant[] = [
  { id: 1, nameKey: "mock.store1", cuisineKey: "mock.cuisineKorean", emoji: "🍚", thumbBg: "#FCEEEE", preOrder: false },
  { id: 2, nameKey: "mock.rcOgeumCoffee", cuisineKey: "mock.cuisineCoffeeBakery", emoji: "☕", thumbBg: "#F3ECE3", preOrder: true },
  { id: 3, nameKey: "mock.store3", cuisineKey: "mock.cuisineKorean", emoji: "🍜", thumbBg: "#EEF3FC", preOrder: false },
  { id: 4, nameKey: "mock.rcSushi", cuisineKey: "mock.cuisineJapanese", emoji: "🍣", thumbBg: "#FDF1F1", preOrder: true },
  { id: 5, nameKey: "mock.rcPizza", cuisineKey: "mock.cuisineWestern", emoji: "🍕", thumbBg: "#FFF6E8", preOrder: false },
  { id: 6, nameKey: "mock.rcBonjuk", cuisineKey: "mock.cuisinePorridge", emoji: "🥣", thumbBg: "#F0F5EC", preOrder: false },
  { id: 7, nameKey: "mock.rcDessert", cuisineKey: "mock.cuisineDessert", emoji: "🍰", thumbBg: "#FCEEF6", preOrder: true },
  { id: 8, nameKey: "mock.rcMara", cuisineKey: "mock.cuisineChinese", emoji: "🥟", thumbBg: "#FBEEE9", preOrder: true },
  { id: 9, nameKey: "mock.store6", cuisineKey: "mock.cuisineCafe", emoji: "🧋", thumbBg: "#EFF0F4", preOrder: true },
  { id: 10, nameKey: "mock.store8", cuisineKey: "mock.cuisineSnack", emoji: "🍢", thumbBg: "#FFF3E9", preOrder: false },
];

export default function RestaurantCafeTab() {
  const { t } = useTranslation();
  const [showFilter, setShowFilter] = useState(false);
  const [sheetIn, setSheetIn] = useState(false);
  const [orderSel, setOrderSel] = useState<Set<string>>(new Set(["restaurantCafe.onSite"]));
  const [cuisineSel, setCuisineSel] = useState<Set<string>>(new Set(["restaurantCafe.catJapanese"]));

  useEffect(() => {
    if (showFilter) {
      const tm = setTimeout(() => setSheetIn(true), 10);
      return () => clearTimeout(tm);
    }
    setSheetIn(false);
  }, [showFilter]);

  const closeFilter = () => {
    setSheetIn(false);
    setTimeout(() => setShowFilter(false), 250);
  };

  const toggle = (set: Set<string>, key: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setter(next);
  };

  const resetFilter = () => {
    setOrderSel(new Set());
    setCuisineSel(new Set());
  };

  // 정렬(회사주변) 시트
  const [showSort, setShowSort] = useState(false);
  const [sortInAnim, setSortInAnim] = useState(false);
  const [sortSel, setSortSel] = useState<"office" | "near" | "region">("office");
  const [showRegion, setShowRegion] = useState(false);
  const [detailMerchant, setDetailMerchant] = useState<Merchant | null>(null);

  useEffect(() => {
    if (showSort) {
      const tm = setTimeout(() => setSortInAnim(true), 10);
      return () => clearTimeout(tm);
    }
    setSortInAnim(false);
  }, [showSort]);

  const closeSort = () => {
    setSortInAnim(false);
    setTimeout(() => setShowSort(false), 250);
  };

  const applySort = (v: "office" | "near" | "region") => {
    setSortSel(v);
    closeSort();
  };

  const sortLabelKey =
    sortSel === "office" ? "restaurantCafe.sortOffice"
    : sortSel === "near" ? "restaurantCafe.sortNearMe"
    : "restaurantCafe.sortMyRegion";

  const REGIONS = [
    "restaurantCafe.regionJongno",
    "restaurantCafe.regionDongdaemun",
    "restaurantCafe.regionWangsimni",
    "restaurantCafe.regionHongdae",
  ];

  return (
    <div style={s.wrap}>
      {/* 필터 칩 */}
      <div style={s.chipsRow}>
        <button style={{ ...s.chip, ...s.chipActive }} onClick={() => setShowSort(true)}>
          <Crosshair size={14} strokeWidth={2.2} color={colors.primary} />
          {t(sortLabelKey)}
        </button>
        <button style={s.chip} onClick={() => setShowFilter(true)}>
          {t("restaurantCafe.orderMethod")}
          <ChevronDown size={14} strokeWidth={2} color={colors.gray2} />
        </button>
        <button style={s.chip} onClick={() => setShowFilter(true)}>
          {t("restaurantCafe.cuisineType")}
          <ChevronDown size={14} strokeWidth={2} color={colors.gray2} />
        </button>
      </div>

      {/* 이벤트 배너 */}
      <div style={s.bannerSection}>
        <div style={s.banner}>
          <div style={s.bannerText}>
            <span style={s.bannerTag}>{t("restaurantCafe.bannerTag")}</span>
            <span style={s.bannerSub}>{t("qrPay.surveyBannerSub")}</span>
            <span style={s.bannerTitle}>{t("qrPay.surveyBannerTitle")}</span>
          </div>
          <span style={s.bannerEmoji}>👍</span>
        </div>
      </div>

      {/* 가맹점 리스트 */}
      <div style={s.list}>
        {MERCHANTS.map((m, i) => (
          <div
            key={m.id}
            style={{ ...s.card, borderBottom: i === MERCHANTS.length - 1 ? "none" : `1px solid ${colors.gray6}` }}
            onClick={() => setDetailMerchant(m)}
          >
            <div style={s.cardLeft}>
              <span style={s.name}>{t(m.nameKey)}</span>
              <span style={s.sub}>{t("mock.storeCity")} · {t(m.cuisineKey)}</span>
              <div style={s.badgeRow}>
                <span style={s.badge}>{t("restaurantCafe.onSite")}</span>
                {m.preOrder && <span style={s.badge}>{t("restaurantCafe.preOrder")}</span>}
              </div>
            </div>
            <div style={{ ...s.thumb, backgroundColor: m.thumbBg }}>
              <span style={s.thumbEmoji}>{m.emoji}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── 필터 바텀시트 (공통 팝업) ── */}
      {showFilter && (
        <div
          style={{ ...s.sheetOverlay, opacity: sheetIn ? 1 : 0 }}
          onClick={closeFilter}
        >
          <div
            style={{ ...s.sheet, transform: sheetIn ? "translateY(0)" : "translateY(100%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div style={s.sheetHeader}>
              <span style={s.sheetTitle}>{t("restaurantCafe.filterTitle")}</span>
              <button style={s.resetBtn} onClick={resetFilter}>{t("pointApplication.resetBtn")}</button>
            </div>

            {/* 주문방법 */}
            <span style={s.sectionLabel}>{t("restaurantCafe.orderMethod")}</span>
            <div style={s.optionWrap}>
              {ORDER_OPTIONS.map((key) => {
                const active = orderSel.has(key);
                return (
                  <button
                    key={key}
                    style={{ ...s.optionChip, ...(active ? s.optionChipActive : {}) }}
                    onClick={() => toggle(orderSel, key, setOrderSel)}
                  >
                    {t(key)}
                  </button>
                );
              })}
            </div>

            {/* 음식 종류 */}
            <span style={{ ...s.sectionLabel, marginTop: 24 }}>{t("restaurantCafe.cuisineType")}</span>
            <div style={s.optionWrap}>
              {CUISINE_OPTIONS.map((key) => {
                const active = cuisineSel.has(key);
                return (
                  <button
                    key={key}
                    style={{ ...s.optionChip, ...(active ? s.optionChipActive : {}) }}
                    onClick={() => toggle(cuisineSel, key, setCuisineSel)}
                  >
                    {t(key)}
                  </button>
                );
              })}
            </div>

            {/* 하단 버튼 */}
            <div style={s.sheetBtnRow}>
              <button style={s.closeBtn} onClick={closeFilter}>{t("common.close")}</button>
              <button style={s.applyBtn} onClick={closeFilter}>{t("restaurantCafe.viewResults")}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 정렬 시트 (회사 주변) ── */}
      {showSort && (
        <div
          style={{ ...s.sheetOverlay, opacity: sortInAnim ? 1 : 0 }}
          onClick={closeSort}
        >
          <div
            style={{ ...s.sheet, transform: sortInAnim ? "translateY(0)" : "translateY(100%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={s.sortTitle}>{t("restaurantCafe.sortTitle")}</span>

            <div style={s.sortList}>
              {/* 회사주변 */}
              <button
                style={{ ...s.sortCard, ...(sortSel === "office" ? s.sortCardActive : {}) }}
                onClick={() => applySort("office")}
              >
                <div style={s.sortCardText}>
                  <span style={s.sortCardTitle}>{t("restaurantCafe.sortOffice")}</span>
                  <span style={s.sortCardSub}>{t("mock.bizName")}</span>
                </div>
                {sortSel === "office" && <Check size={20} strokeWidth={2.4} color={colors.primary} />}
              </button>

              {/* 내 주변 */}
              <button
                style={{ ...s.sortCard, ...(sortSel === "near" ? s.sortCardActive : {}) }}
                onClick={() => applySort("near")}
              >
                <div style={s.sortCardText}>
                  <span style={s.sortCardTitle}>{t("restaurantCafe.sortNearMe")}</span>
                  <span style={s.sortCardSub}>{t("restaurantCafe.sortNearMeSub")}</span>
                </div>
                {sortSel === "near" && <Check size={20} strokeWidth={2.4} color={colors.primary} />}
              </button>

              {/* 내 지역 */}
              <div
                style={{ ...s.sortCard, ...s.sortCardColumn, ...(sortSel === "region" ? s.sortCardActive : {}) }}
                onClick={() => applySort("region")}
              >
                <div style={s.sortCardRow}>
                  <div style={s.sortCardText}>
                    <span style={s.sortCardTitle}>{t("restaurantCafe.sortMyRegion")}</span>
                    <span style={s.sortCardSub}>{t("restaurantCafe.sortMyRegionSub")}</span>
                  </div>
                  {sortSel === "region" && <Check size={20} strokeWidth={2.4} color={colors.primary} />}
                </div>
                <div style={s.regionChips}>
                  {REGIONS.map((rk) => {
                    const active = sortSel === "region";
                    return (
                      <button
                        key={rk}
                        style={{ ...s.regionChip, ...(active ? s.regionChipActive : {}) }}
                        onClick={(e) => { e.stopPropagation(); setSortSel("region"); }}
                      >
                        {t(rk)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 하단 */}
            <div style={s.sortBtnRow}>
              <button style={s.sortApplyBtn} onClick={() => setShowRegion(true)}>{t("restaurantCafe.setRegion")}</button>
              <button style={s.closeBtn} onClick={closeSort}>{t("common.close")}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 지역 선택 페이지 ── */}
      {showRegion && <RegionSelectPage onBack={() => setShowRegion(false)} />}

      {/* ── 가맹점 상세 페이지 ── */}
      {detailMerchant && (
        <RestaurantDetailPage
          nameKey={detailMerchant.nameKey}
          cuisineKey={detailMerchant.cuisineKey}
          onBack={() => setDetailMerchant(null)}
        />
      )}
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.bg,
  },

  // 필터 칩
  chipsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: 14,
    paddingBottom: 10,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    height: 36,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: radius.full,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 14,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  chipActive: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
  },

  // 배너
  bannerSection: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingBottom: 8,
  },
  banner: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 14,
    height: 104,
    background: "linear-gradient(120deg, #FF7AA2 0%, #FF6B5B 60%, #FF8A4C 100%)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 18,
  },
  bannerText: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
  bannerTag: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 0.3,
  },
  bannerSub: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.white,
    letterSpacing: -0.2,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.5,
  },
  bannerEmoji: {
    fontSize: 44,
    flexShrink: 0,
  },

  // 리스트
  list: {
    backgroundColor: colors.white,
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    cursor: "pointer",
  },
  cardLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  sub: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  badgeRow: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    marginTop: 2,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    height: 24,
    paddingLeft: 9,
    paddingRight: 9,
    borderRadius: 6,
    backgroundColor: colors.gray6,
    fontSize: 12,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  thumb: {
    width: 82,
    height: 82,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  thumbEmoji: {
    fontSize: 34,
  },

  // ── 필터 바텀시트 ──
  sheetOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(25,26,28,0.45)",
    zIndex: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    transition: "opacity 0.25s ease",
    fontFamily,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingBottom: 24,
    transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
  },
  sheetHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  resetBtn: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    fontFamily,
  },
  sectionLabel: {
    display: "block",
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  optionWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionChip: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: radius.sm,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 14,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap",
  },
  optionChipActive: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
  },
  sheetBtnRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 28,
  },
  closeBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: `1.5px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 16,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
  applyBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    fontSize: 16,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },

  // ── 정렬 시트 ──
  sortTitle: {
    display: "block",
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    textAlign: "left",
    marginBottom: 22,
  },
  sortList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  sortCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    backgroundColor: colors.white,
    border: `1.5px solid ${colors.gray5}`,
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 18,
    paddingRight: 18,
    cursor: "pointer",
    textAlign: "left",
    fontFamily,
  },
  sortCardColumn: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 14,
  },
  sortCardActive: {
    border: `1.5px solid ${colors.primary}`,
    backgroundColor: colors.primaryLight,
  },
  sortCardActiveBorderOnly: {
    border: `1.5px solid ${colors.primary}`,
  },
  sortCardRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sortCardText: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  sortCardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  sortCardSub: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  regionChips: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  regionChip: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: radius.full,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 13,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap",
  },
  regionChipActive: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.white,
    color: colors.primary,
  },
  sortBtnRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 24,
  },
  sortApplyBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    fontSize: 16,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
};
