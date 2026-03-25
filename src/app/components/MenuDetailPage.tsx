import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Clock, MapPin, UtensilsCrossed, Flag } from "lucide-react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, pillBadgeBase, headerTitleBase } from "../shared/tokens";
import { formatAmountStr } from "../shared/formatters";
import { InfoRow } from "./InfoRow";

export interface MenuDetailData {
  corner: string;
  name: string;
  desc: string;
  img: string;
  kcal: string;
  price: string;
  mealTime?: string;
  noPhoto?: boolean;
  noHero?: boolean;
}

interface MenuDetailPageProps {
  menu: MenuDetailData;
  onBack: () => void;
  onPay?: () => void;
}

export default function MenuDetailPage({ menu, onBack, onPay }: MenuDetailPageProps) {
  const { t } = useTranslation();
  const [showHeader, setShowHeader] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = menu.noHero ? 60 : 200;
    const handleScroll = () => setShowHeader(el.scrollTop > threshold);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [menu.noHero]);

  const originInfo = [
    t("mock.originDisclaimer"),
    t("mock.originPork"),
    t("mock.originChicken"),
    t("mock.originSoy"),
    t("mock.originSquid"),
    t("mock.originKimchi"),
    t("mock.originGeotjeori"),
  ];

  const sideMenus = menu.desc.split(",").map((s) => s.trim()).filter(Boolean);
  const mealTimeText = menu.mealTime ?? t("enum.mealTime.LUNCH");
  const mealTimeDetail =
    mealTimeText === t("enum.mealTime.BREAKFAST")
      ? "07:00 ~ 09:00"
      : mealTimeText === t("enum.mealTime.LUNCH")
      ? "11:30 ~ 13:00"
      : mealTimeText === t("enum.mealTime.DINNER")
      ? "17:30 ~ 19:00"
      : mealTimeText;

  return (
    <div style={s.overlay}>
      <style>{keyframes}</style>

      {/* ── 스크롤 시 나타나는 공통 헤더 ── */}
      <div
        style={{
          ...s.stickyHeader,
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          opacity: showHeader ? 1 : 0,
        }}
      >
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.headerBackBtn} onClick={onBack} aria-label={t("common.back")}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("menuDetail.headerTitle")}</span>
          </div>
        </div>
      </div>

      {/* ── 스크롤 영역 ── */}
      <div style={s.scroll} ref={scrollRef}>
        {menu.noHero ? (
          <>
            {/* noHero: 고정 상단 헤더 */}
            <div style={s.noHeroTopBar}>
              <button style={s.headerBackBtn} onClick={onBack} aria-label={t("common.back")}>
                <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
              </button>
              <span style={s.headerTitle}>{t("menuDetail.headerTitle")}</span>
            </div>
            {/* noHero: 뱃지+메뉴명, 가격+시간 정렬 맞춤 */}
            <div style={s.compactInfoBar}>
              <div style={s.compactRowTop}>
                <div style={s.compactBadgeWrapper}>
                  <span style={s.compactBadge}>{t("menuDetail.cafeteriaName")}</span>
                </div>
                <span style={{
                  ...s.stockBadgeCompact,
                  color: colors.primary,
                  backgroundColor: "rgba(238,43,47,0.08)",
                }}>
                  {mealTimeText}
                </span>
              </div>
              <div style={s.compactRowBottom}>
                <h1 style={s.compactName}>{menu.name}</h1>
                <span style={s.compactPrice}>{formatAmountStr(menu.price)}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ── 히어로 이미지 ── */}
            <div style={{
              ...s.hero,
              backgroundColor: menu.noPhoto ? colors.gray6 : undefined,
            }}>
              {!menu.noPhoto ? (
                <img src={menu.img} alt={menu.name} style={s.heroImg} />
              ) : (
                <div style={s.heroPlaceholder}>
                  <svg width="100" height="82" viewBox="0 0 100 82" fill="none">
                    <ellipse cx="50" cy="70" rx="45" ry="10" fill="#D9D9D9" />
                    <path d="M10 62 C10 28, 90 28, 90 62" fill="#E0E0E0" />
                    <path d="M10 62 L90 62" stroke="#D0D0D0" strokeWidth="1.5" />
                    <rect x="45" y="20" width="10" height="10" rx="5" fill="#CDCDCD" />
                  </svg>
                </div>
              )}
              <div style={s.heroGradient} />
              {/* 뒤로가기 */}
              <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
                <ChevronLeft size={22} strokeWidth={2.2} color={colors.white} />
              </button>
              {/* 히어로 하단 정보 */}
              <div style={s.heroInfo}>
                <span style={s.cornerBadge}>{t("menuDetail.cafeteriaName")}</span>
                <h1 style={s.heroTitle}>{menu.name}</h1>
              </div>
            </div>

            {/* ── 가격 바 ── */}
            <div style={s.priceBar}>
              <div>
                <span style={s.priceLabel}>{t("menuDetail.priceLabel")}</span>
                <div style={s.priceRow}>
                  <span style={s.priceValue}>{formatAmountStr(menu.price)}</span>
                </div>
              </div>
              {/* 식사 시간 뱃지 */}
              <span style={{
                ...s.mealTimeBadge,
                color:
                  mealTimeText === t("enum.mealTime.BREAKFAST") ? "#FF9500"
                  : mealTimeText === t("enum.mealTime.DINNER") ? "#8B5CF6"
                  : colors.blue,
                backgroundColor:
                  mealTimeText === t("enum.mealTime.BREAKFAST") ? "rgba(255,149,0,0.10)"
                  : mealTimeText === t("enum.mealTime.DINNER") ? "rgba(139,92,246,0.10)"
                  : "rgba(29,138,255,0.10)",
              }}>
                {mealTimeText}
              </span>
            </div>
          </>
        )}

        {/* ── 정보 카드들 ── */}
        <div style={s.cardArea}>
          {/* 코너 + 위치 */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <MapPin size={16} strokeWidth={2.2} color={colors.gray2} />
              <span style={s.cardHeaderText}>{t("menuDetail.restaurantInfo")}</span>
            </div>
            <div style={s.divider} />
            <InfoRow label={t("menuDetail.corner")} value={t("mock.cafeteriaLabel", { name: menu.corner.replace(/ 코너$/, "").replace(/ Corner$/, "") })} />
            <InfoRow label={t("menuDetail.mealTime")} value={mealTimeDetail} />
          </div>

          {/* 식단 구성 */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <UtensilsCrossed size={16} strokeWidth={2.2} color={colors.gray2} />
              <span style={s.cardHeaderText}>{t("menuDetail.todayMenu")}</span>
            </div>
            <div style={s.divider} />
            <InfoRow label={t("menuDetail.composition")} value={sideMenus.join(", ")} />
          </div>

          {/* 원산지 정보 */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <Flag size={16} strokeWidth={2.2} color={colors.gray2} />
              <span style={s.cardHeaderText}>{t("menuDetail.originInfo")}</span>
            </div>
            <div style={s.divider} />
            <div style={s.originBox}>
              {originInfo.map((line, i) => (
                <p key={i} style={{
                  ...s.originLine,
                  color: i === 0 ? colors.primary : colors.gray1,
                  fontWeight: i === 0 ? 500 : 400,
                }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Keyframes ───────────────────────────────────────────────
const keyframes = `
@keyframes slideUpDetail {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
`;

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.bg,
    fontFamily,
    animation: "slideUpDetail 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
  },

  /* ── Scroll ── */
  scroll: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },

  /* ── Hero ── */
  hero: {
    position: "relative",
    height: 280,
    flexShrink: 0,
    overflow: "hidden",
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.25) 100%)",
  },
  backBtn: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(8px)",
    border: "none",
    borderRadius: 999,
    zIndex: 2,
  },
  heroInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    zIndex: 2,
  },
  cornerBadge: {
    ...pillBadgeBase,
    fontSize: 13,
    backgroundColor: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(6px)",
    color: colors.white,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.8,
    margin: 0,
    lineHeight: "1.2",
    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
  },
  heroMeta: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  heroMetaText: {
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: -0.3,
    lineHeight: "13px",
    display: "inline-flex",
    alignItems: "center",
    height: 13,
  },

  /* ── Price Bar ── */
  priceBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray6}`,
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.3,
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 2,
    marginTop: 2,
  },
  priceValue: {
    fontSize: 25,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.5,
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.3,
  },
  mealTimeBadge: {
    ...pillBadgeBase,
    fontSize: 15,
    height: 24,
    paddingTop: 5,
    paddingRight: 12,
    paddingBottom: 6,
    paddingLeft: 12,
    letterSpacing: -0.2,
  },

  /* ── Card Area ── */
  cardArea: {
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingTop: 16,
    paddingRight: 18,
    paddingBottom: 16,
    paddingLeft: 18,
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray6,
    marginTop: 12,
    marginRight: 0,
    marginBottom: 12,
    marginLeft: 0,
  },

  /* ── Origin Info ── */
  originBox: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  originLine: {
    fontSize: 13.5,
    fontWeight: 400,
    color: colors.gray1,
    letterSpacing: -0.4,
    lineHeight: "1.6",
    margin: 0,
  },

  /* ── noHero & Compact Header Styles ── */
  noHeroTopBar: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray6}`,
  },
  compactInfoBar: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray6}`,
    gap: 12,
  },
  compactRowTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  compactRowBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  compactBadgeWrapper: {
    display: "inline-flex",
    alignItems: "center",
  },
  compactBadge: {
    display: "inline-flex",
    alignItems: "center",
    height: 22,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
    color: "#191a1c",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: -0.3,
  },
  stockBadgeCompact: {
    display: "inline-flex",
    alignItems: "center",
    height: 24,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: -0.3,
  },
  compactName: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.6,
    margin: 0,
    lineHeight: "1.35",
    wordBreak: "keep-all" as const,
  },
  compactPrice: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.6,
    lineHeight: "1",
  },

  /* ── Hero Placeholder ── */
  heroPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: colors.gray3,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: -0.3,
  },
  heroPlaceholderText: {
    marginTop: 12,
  },

  /* ── Image Placeholder ── */
  imgPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 180,
    borderRadius: 10,
    backgroundColor: colors.gray6,
    color: colors.gray3,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.3,
  },
  imgPlaceholderText: {
    marginTop: 10,
    color: colors.gray2,
  },

  /* ── Sticky Header ── */
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 54,
    backgroundColor: colors.white,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    transition: "transform 0.25s ease, opacity 0.25s ease",
    zIndex: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 16,
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftGroup: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  headerBackBtn: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },
};