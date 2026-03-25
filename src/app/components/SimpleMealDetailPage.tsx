import { useState, useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Clock, Calendar, Flag, Info, ShoppingCart, Minus, Plus } from "lucide-react";
import { colors, fontFamily, pillBadgeBase, headerTitleBase } from "../shared/tokens";
import { PickupStatus, PaymentStatus } from "../shared/enums";
import { formatMonthDayTime, formatAmount } from "../shared/formatters";
import { InfoRow } from "./InfoRow";

export interface SimpleMealData {
  id: number;
  store: string;
  name: string;
  nameKey?: string;
  storeKey?: string;
  price: string;
  remaining: number;
  img: string;
  deadlineValue: string;
  pickupDate: Date;
  status?: PickupStatus | PaymentStatus | "취소";
}

interface SimpleMealDetailPageProps {
  item: SimpleMealData;
  onBack: () => void;
  quickPurchaseMode?: boolean;
  noHero?: boolean;
  onAddToCart?: (item: SimpleMealData, quantity: number) => void;
  onDirectPay?: (amount: number) => void;
}

export default function SimpleMealDetailPage({
  item,
  onBack,
  quickPurchaseMode = false,
  noHero = false,
  onAddToCart,
  onDirectPay,
}: SimpleMealDetailPageProps) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [showOrderPanel, setShowOrderPanel] = useState(quickPurchaseMode);
  const [showHeader, setShowHeader] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = noHero ? 60 : 200;
    const handleScroll = () => setShowHeader(el.scrollTop > threshold);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [noHero]);

  const numericPrice = parseInt(item.price.replace(/,/g, ""), 10);
  const totalPrice = formatAmount(numericPrice * quantity);

  const originInfo = [
    t("mock.originDisclaimer"),
    t("mock.originPork"),
    t("mock.originChicken"),
    t("mock.originSoy"),
    t("mock.originSquid"),
    t("mock.originKimchi"),
    t("mock.originGeotjeori"),
  ];

  const isSoldOut = item.remaining === 0;
  const isLowStock = item.remaining <= 9;

  return (
    <div
      style={quickPurchaseMode ? s.overlayQuick : s.overlay}
      onClick={quickPurchaseMode ? onBack : undefined}
    >
      <style>{keyframes}</style>

      {/* ── 스크롤 시 나타나는 공통 헤더 ── */}
      {!quickPurchaseMode && (
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
              <span style={s.headerTitle}>{t("simpleMealDetail.orderBtn")}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── 스크롤 영역 (quickPurchaseMode일 때 숨김) ── */}
      {!quickPurchaseMode && (
      <div style={s.scroll} ref={scrollRef}>
        {noHero ? (
          <>
            {/* noHero: 고정 상단 헤더 */}
            <div style={s.noHeroTopBar}>
              <button style={s.headerBackBtn} onClick={onBack} aria-label={t("common.back")}>
                <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
              </button>
              <span style={s.headerTitle}>{t("simpleMealDetail.orderBtn")}</span>
            </div>
            {/* noHero: 뱃지+메뉴명, 가격+재고 정렬 맞춤 */}
            <div style={s.compactInfoBar}>
              <div style={s.compactRowTop}>
                <div style={s.compactBadgeWrapper}>
                  <span style={s.compactBadge}>{item.store}</span>
                </div>
                <span style={{
                  ...s.stockBadgeCompact,
                  color: isLowStock ? colors.primary : colors.blue,
                  backgroundColor: isLowStock ? "rgba(238,43,47,0.08)" : "rgba(29,138,255,0.08)",
                }}>
                  {t("home.stockLeft", { count: item.remaining })}
                </span>
              </div>
              <div style={s.compactRowBottom}>
                <h1 style={s.compactName}>{item.name}</h1>
                <span style={s.compactPrice}>{formatAmount(numericPrice)}</span>
              </div>
            </div>
          </>
        ) : (
          <>
        {/* ── 히어로 이미지 ── */}
        <div style={s.hero}>
          <img src={item.img} alt={item.name} style={s.heroImg} />
          <div style={s.heroGradient} />
          {/* 뒤로가기 */}
          <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={22} strokeWidth={2.2} color={colors.white} />
          </button>
          {/* 히어로 하단 정보 */}
          <div style={s.heroInfo}>
            <span style={s.cornerBadge}>{item.store}</span>
            <h1 style={s.heroTitle}>{item.name}</h1>
          </div>
        </div>

        {/* ── 가격 바 ── */}
        <div style={s.priceBar}>
          <div>
            <span style={s.priceLabel}>{t("menuDetail.priceLabel")}</span>
            <div style={s.priceRow}>
              <span style={s.priceValue}>{formatAmount(numericPrice)}</span>
            </div>
          </div>
          {/* 재고 뱃지 */}
          <span style={{
            ...s.stockBadge,
            color: isLowStock ? colors.primary : colors.blue,
            backgroundColor: isLowStock ? "rgba(238,43,47,0.08)" : "rgba(29,138,255,0.08)",
          }}>
            {t("home.stockLeft", { count: item.remaining })}
          </span>
        </div>
          </>
        )}

        {/* ── 정보 카드들 ── */}
        <div style={s.cardArea}>
          {/* 예약 정보 */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <Calendar size={16} strokeWidth={2.2} color={colors.gray2} />
              <span style={s.cardHeaderText}>{t("simpleMealDetail.reservationInfo")}</span>
            </div>
            <div style={s.divider} />
            <InfoRow label={t("simpleMealDetail.reservationDeadline")} value={item.deadlineValue} />
            <InfoRow label={t("simpleMealDetail.pickupDateTime")} value={formatMonthDayTime(item.pickupDate)} />
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

          {/* 안내사항 */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <Info size={16} strokeWidth={2.2} color={colors.gray2} />
              <span style={s.cardHeaderText}>{t("simpleMealDetail.noticeTitle")}</span>
            </div>
            <div style={s.divider} />
            <div style={s.originBox}>
              <p style={s.originLine}>{t("simpleMealDetail.noticeCancel")}</p>
              <p style={s.originLine}>{t("simpleMealDetail.noticePickup")}</p>
              <p style={s.originLine}>{t("simpleMealDetail.noticeNoRefund")}</p>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ── 수량 패널 열렸을 때 검은 딤 오버레이 ── */}
      {showOrderPanel && !quickPurchaseMode && (
        <div
          style={s.dimOverlay}
          onClick={() => setShowOrderPanel(false)}
        />
      )}

      {/* ── 하단 수량 선택 + 결제 ── */}
      <div style={s.bottomBar} onClick={(e) => e.stopPropagation()}>
        {!showOrderPanel ? (
          /* ── 주문하기 한 줄 버튼 ── */
          <button
            style={s.orderSingleBtn}
            onClick={() => setShowOrderPanel(true)}
          >
            <span style={s.orderSingleBtnText}>{t("simpleMealDetail.orderBtn")}</span>
          </button>
        ) : (
          <>
            {/* 수량 선택 */}
            <div style={s.qtySection}>
              <div style={s.qtyHeaderRow}>
                <span style={s.qtyMenuName}>{item.name}</span>
                <span style={s.qtyPrice}>{totalPrice}</span>
              </div>
              <div style={s.qtyRow}>
                <div style={s.qtyControl}>
                  <button
                    style={s.qtyBtn}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label={t("common.decreaseQty")}
                  >
                    <Minus size={17} strokeWidth={2} color={quantity <= 1 ? colors.gray3 : colors.black} />
                  </button>
                  <span style={s.qtyValue}>{quantity}</span>
                  <button
                    style={s.qtyBtn}
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label={t("common.increaseQty")}
                  >
                    <Plus size={17} strokeWidth={2} color={colors.black} />
                  </button>
                </div>
              </div>
            </div>

            {/* 담기 / 바로 결제 */}
            <div style={s.btnRow}>
              <button style={s.cartBtn} onClick={() => onAddToCart?.(item, quantity)}>
                <ShoppingCart size={16} strokeWidth={2.2} color={colors.primary} />
                <span style={s.cartBtnText}>{t("simpleMealDetail.addToCart")}</span>
              </button>
              <button style={s.payBtn} onClick={() => onDirectPay?.(numericPrice * quantity)}>
                <span style={s.payBtnText}>{t("simpleMealDetail.directPay")}</span>
              </button>
            </div>
          </>
        )}
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

// ─── Styles ─────────────────────────────────────────────────
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
  overlayQuick: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
    fontFamily,
    justifyContent: "flex-end",
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
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
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
    alignItems: "center",
    gap: 2,
    marginTop: 2,
  },
  priceValue: {
    fontSize: 25,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.5,
  },
  stockBadge: {
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
    paddingBottom: 100,
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

  /* ── Bottom Bar ── */
  bottomBar: {
    position: "relative",
    zIndex: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
    flexShrink: 0,
    pointerEvents: "auto" as const,
    animation: "slideUpDetail 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
  },

  /* ── Quantity Section ── */
  qtySection: {
    backgroundColor: colors.bg,
    borderRadius: 12,
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    marginBottom: 14,
  },
  qtyHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 12,
  },
  qtyMenuName: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    lineHeight: "15px",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
    flex: 1,
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end", // Align quantity control to the right
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 90,
    height: 32,
    backgroundColor: colors.white,
    borderRadius: 6,
    border: `1px solid ${colors.gray5}`,
    paddingTop: 0,
    paddingRight: 2,
    paddingBottom: 0,
    paddingLeft: 2,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    flexShrink: 0,
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.14,
    textAlign: "center" as const,
    lineHeight: "20px",
    minWidth: 20,
    flex: 1,
  },
  qtyPrice: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.17,
    lineHeight: "15px",
    flexShrink: 0,
  },

  /* ── Action Buttons ── */
  btnRow: {
    display: "flex",
    gap: 10,
  },
  cartBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 48,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 12,
    border: `1.5px solid ${colors.primary}`,
    backgroundColor: colors.white,
    flexShrink: 0,
  },
  cartBtnText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.15,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  payBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.primary,
    overflow: "hidden",
  },
  payBtnText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  payBtnPrice: {
    fontSize: 17,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.15,
    opacity: 0.85,
  },

  /* ── Order Single Button ── */
  orderSingleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.primary,
    flexShrink: 0,
    cursor: "pointer",
  },
  orderSingleBtnText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
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

  /* ── noHero Top Bar ── */
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
  compactLeft: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    flex: 1,
    minWidth: 0,
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
  compactName: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.6,
    margin: 0,
    lineHeight: "1.35",
    wordBreak: "keep-all" as const,
  },
  compactRight: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-end" as const,
    gap: 6,
    flexShrink: 0,
  },
  compactPriceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 2,
  },
  compactPrice: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.6,
    lineHeight: "1",
  },
  compactWon: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.gray2,
    letterSpacing: -0.2,
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

  /* ── Dim Overlay ── */
  dimOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9,
  },
};