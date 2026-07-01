/**
 * 가맹점 상세 페이지
 * - 식당·카페 > 가맹점 클릭 시 진입
 * - 히어로 이미지 + 플로팅 버튼 / 이름·지도 / 현장결제·미리주문 탭
 * - 메뉴결제·포인트결제 토글 / 메뉴 리스트
 * ※ 레이아웃만 참고, 공통 디자인 토큰/규칙 준수
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ShoppingCart, Phone, Bookmark, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import { formatAmountStr } from "../shared/formatters";

const HERO_IMG = "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800";

const MENU = [
  { nameKey: "restaurantDetail.m1", price: "3,700" },
  { nameKey: "restaurantDetail.m2", price: "4,500" },
  { nameKey: "restaurantDetail.m3", price: "3,000" },
  { nameKey: "restaurantDetail.m4", price: "4,800" },
  { nameKey: "restaurantDetail.m5", price: "2,500" },
];

type Tab = "onsite" | "preorder";
type PayMode = "menu" | "point";

interface RestaurantDetailPageProps {
  nameKey: string;
  cuisineKey: string;
  onBack: () => void;
}

export default function RestaurantDetailPage({ nameKey, onBack }: RestaurantDetailPageProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("onsite");
  const [payMode, setPayMode] = useState<PayMode>("menu");

  return (
    <div style={s.screen}>
      <div style={s.scroll}>
        {/* ── 히어로 이미지 + 플로팅 버튼 ── */}
        <div style={s.hero}>
          <img src={HERO_IMG} alt="" style={s.heroImg} />
          <button style={{ ...s.circleBtn, ...s.heroBack }} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={24} strokeWidth={2.4} color={colors.black} />
          </button>
          <div style={s.heroActions}>
            <button style={s.circleBtn} aria-label="cart">
              <ShoppingCart size={19} strokeWidth={2.2} color={colors.black} />
            </button>
            <button style={s.circleBtn} aria-label="call">
              <Phone size={18} strokeWidth={2.2} color={colors.black} />
            </button>
            <button style={s.circleBtn} aria-label="bookmark">
              <Bookmark size={19} strokeWidth={2.2} color={colors.black} />
            </button>
          </div>
        </div>

        {/* ── 이름 + 지도 ── */}
        <div style={s.titleSection}>
          <div style={s.titleRow}>
            <h1 style={s.name}>{t(nameKey)}</h1>
            <button style={s.mapBtn}>
              <MapPin size={14} strokeWidth={2.2} color={colors.black} style={{ flexShrink: 0 }} />
              {t("map.title")}
            </button>
          </div>
          <p style={s.greeting}>{t("restaurantDetail.greeting")}</p>
        </div>

        {/* ── 탭 (현장결제 / 미리주문) ── */}
        <div style={s.tabBar}>
          {(["onsite", "preorder"] as Tab[]).map((tb) => {
            const active = tab === tb;
            return (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                style={{
                  ...s.tabItem,
                  color: active ? colors.black : colors.gray3,
                  fontWeight: active ? 700 : 500,
                }}
              >
                {tb === "onsite" ? t("restaurantCafe.onSite") : t("restaurantCafe.preOrder")}
                {active && <span style={s.tabIndicator} />}
              </button>
            );
          })}
        </div>

        {/* ── 결제 토글 (메뉴 결제 / 포인트 결제) ── */}
        <div style={s.toggleWrap}>
          <div style={s.toggleTrack}>
            {(["menu", "point"] as PayMode[]).map((pm) => {
              const active = payMode === pm;
              return (
                <button
                  key={pm}
                  onClick={() => setPayMode(pm)}
                  style={{
                    ...s.toggleBtn,
                    backgroundColor: active ? colors.white : "transparent",
                    color: active ? colors.black : colors.gray2,
                    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {pm === "menu" ? t("restaurantDetail.menuPay") : t("restaurantDetail.pointPay")}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 메뉴 리스트 ── */}
        <div style={s.menuList}>
          {MENU.map((m, i) => (
            <div key={i} style={s.menuRow}>
              <div style={s.menuInfo}>
                <span style={s.menuName}>{t(m.nameKey)}</span>
                <span style={s.menuPrice}>{formatAmountStr(m.price)}</span>
              </div>
              <div style={s.menuThumb} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  screen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
    zIndex: 130,
  },
  scroll: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 40,
  },

  // 히어로
  hero: {
    position: "relative",
    width: "100%",
    height: 240,
    backgroundColor: colors.gray6,
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  circleBtn: {
    width: 38,
    height: 38,
    minWidth: 38,
    minHeight: 38,
    flexShrink: 0,
    boxSizing: "border-box",
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.92)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
  },
  heroBack: {
    position: "absolute",
    top: 14,
    left: spacing.lg,
  },
  heroActions: {
    position: "absolute",
    top: 14,
    right: spacing.lg,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },

  // 이름
  titleSection: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: 20,
    paddingBottom: 16,
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  name: {
    ...headerTitleBase,
    fontSize: 20,
    color: colors.black,
    margin: 0,
    whiteSpace: "normal",
    flex: 1,
    minWidth: 0,
  },
  mapBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    height: 34,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: radius.full,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 13,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    flexShrink: 0,
  },
  greeting: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    margin: 0,
    marginTop: 8,
  },

  // 탭
  tabBar: {
    display: "flex",
    flexDirection: "row",
    borderBottom: `1px solid ${colors.gray5}`,
  },
  tabItem: {
    position: "relative",
    flex: 1,
    backgroundColor: "transparent",
    border: "none",
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 16,
    letterSpacing: -0.3,
    cursor: "pointer",
    fontFamily,
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.black,
  },

  // 결제 토글
  toggleWrap: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: 16,
    paddingBottom: 8,
  },
  toggleTrack: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    padding: 4,
    backgroundColor: colors.gray6,
    borderRadius: radius.full,
  },
  toggleBtn: {
    flex: 1,
    height: 40,
    borderRadius: radius.full,
    border: "none",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    transition: "background-color 0.15s, color 0.15s",
  },

  // 메뉴 리스트
  menuList: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 8,
  },
  menuRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    borderBottom: `1px solid ${colors.gray6}`,
  },
  menuInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
    flex: 1,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  menuPrice: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  menuThumb: {
    width: 74,
    height: 74,
    borderRadius: 12,
    backgroundColor: colors.gray6,
    flexShrink: 0,
  },
};
