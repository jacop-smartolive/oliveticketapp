/**
 * 장바구니 페이지 - 옵션 4: 미니멀 + 아이콘 강화형
 * 간편식 예약 상품 담기 및 결제
 */
import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, X, Building2, Home, ShoppingBag as ShoppingBagLucide, Check } from "lucide-react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import svgPaths from "../../imports/svg-2zgxdrqmnu";
import PointIcon from "./PointIcon";
import ShoppingBag from "../../imports/ShoppingBag";
import CorporatePointPage from "./CorporatePointPage";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";
import { formatMonthDayTime, formatAmount } from "../shared/formatters";

export interface CartItem {
  id: number;
  store: string;
  name: string;
  nameKey?: string;
  storeKey?: string;
  pickupDate?: Date;
  price: number;
  img: string;
  pickupTime: string;
  quantity: number;
  /** 출처 구분 — 가맹점(식당·카페) 상품이면 "restaurant" */
  sourceType?: "simple" | "restaurant";
  /** 가맹점 썸네일 (이모지 + 배경색) */
  emoji?: string;
  thumbBg?: string;
}

interface CartPageProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onAddMenu: () => void;
  onCheckout: () => void;
}

export default function CartPageOption4({
  items,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onAddMenu,
  onCheckout,
}: CartPageProps) {
  const { t } = useTranslation();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 상단 배지 — 가맹점 상품이면 가맹점명/썸네일, 아니면 간편식
  const firstItem = items[0];
  const isRestaurantCart = firstItem?.sourceType === "restaurant";
  const badgeLabel = isRestaurantCart
    ? firstItem.storeKey
      ? t(firstItem.storeKey)
      : firstItem.store
    : t("cart.simpleMeal");

  // Mock 포인트 데이터
  const corporatePoint = 37000;
  const availablePoint = 29000;
  const olivePoint = 138000;
  const totalPoint = corporatePoint + availablePoint;
  const [showCorporatePoint, setShowCorporatePoint] = useState(false);

  // 결제 유형 셀렉트
  const PAY_TYPES = ["corp", "personal", "mixed"] as const;
  const payTypeLabel: Record<(typeof PAY_TYPES)[number], string> = {
    corp: t("cart.payTypeCorp"),
    personal: t("cart.payTypePersonal"),
    mixed: t("cart.payTypeMixed"),
  };
  const [payType, setPayType] = useState<(typeof PAY_TYPES)[number]>("corp");
  const [payTypeOpen, setPayTypeOpen] = useState(false);

  // 혼합 결제 — 결제수단 선택 (가맹점 상세와 동일)
  const [selectedPts, setSelectedPts] = useState<Set<string>>(new Set(["corp"]));
  const togglePt = (k: string) => {
    setSelectedPts((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };
  const corpOn = selectedPts.has("corp");
  const oliveOn = selectedPts.has("olive");
  const mixedTotal = availablePoint + olivePoint;
  // 결제 유형별 총 사용가능 금액 (뱃지)
  const badgeAmount =
    payType === "mixed" ? mixedTotal : payType === "personal" ? olivePoint : availablePoint;

  if (showCorporatePoint) {
    return <CorporatePointPage onBack={() => setShowCorporatePoint(false)} />;
  }

  return (
    <div style={s.overlay}>
      <style>{keyframes}</style>

      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("cart.title")}</span>
          </div>

          {/* 결제 유형 셀렉트 */}
          <div style={s.selectWrap}>
            <button
              style={s.selectBtn}
              onClick={() => setPayTypeOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={payTypeOpen}
            >
              <span style={s.selectText}>{payTypeLabel[payType]}</span>
              <ChevronDown
                size={16}
                strokeWidth={2.2}
                color={colors.gray1}
                style={{
                  transform: payTypeOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  flexShrink: 0,
                }}
              />
            </button>

            {payTypeOpen && (
              <>
                <div style={s.selectScrim} onClick={() => setPayTypeOpen(false)} />
                <div style={s.selectMenu} role="listbox">
                  {PAY_TYPES.map((type) => {
                    const active = type === payType;
                    return (
                      <button
                        key={type}
                        style={s.selectOption}
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          setPayType(type);
                          setPayTypeOpen(false);
                        }}
                      >
                        <span
                          style={{
                            ...s.selectOptionText,
                            color: active ? colors.primary : colors.black,
                            fontWeight: active ? 700 : 500,
                          }}
                        >
                          {payTypeLabel[type]}
                        </span>
                        {active && (
                          <Check size={16} strokeWidth={2.5} color={colors.primary} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        /* ── Empty State ── */
        <div style={s.emptyState}>
          <ShoppingBagLucide size={52} strokeWidth={1.2} color={colors.gray3} style={{ marginBottom: 20 }} />
          <span style={s.emptyText}>{t("cart.emptyCart")}</span>
          <button style={s.homeBtn} onClick={onBack}>
            <Home size={16} strokeWidth={2.2} color={colors.white} />
            <span style={s.homeBtnText}>{t("paymentComplete.goHome")}</span>
          </button>
        </div>
      ) : (
        <>
      {/* ── Scroll Area ── */}
      <div style={s.scroll}>
        {/* ── Tab Badge ── */}
        <div style={s.tabBadge}>
          <div
            style={{
              ...s.tabIcon,
              ...(isRestaurantCart ? { backgroundColor: firstItem.thumbBg || colors.gray6 } : {}),
            }}
          >
            {isRestaurantCart ? (
              <span style={s.tabEmoji}>{firstItem.emoji}</span>
            ) : (
              <ShoppingBag color={colors.primary} size={14} />
            )}
          </div>
          <span style={s.tabText}>{badgeLabel}</span>
          <ChevronRight size={12} strokeWidth={2.5} color={colors.gray1} />
        </div>

        {/* ── Cart Items ── */}
        <div style={s.itemList}>
          {items.map((item, index) => (
            <CartItemCard
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
              isLast={index === items.length - 1}
            />
          ))}
        </div>

        {/* ── Add Menu Button ── */}
        <button style={s.addMenuBtn} onClick={onAddMenu}>
          <Plus size={12} strokeWidth={3} color={colors.black} />
          <span style={s.addMenuText}>{t("cart.addMenuBtn")}</span>
        </button>

        {/* ── Summary Section ── */}
        <div style={s.summarySection}>
          {/* 총 수량/금액 */}
          <div style={s.summaryBox}>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>{t("cart.totalQty")}</span>
              <span style={s.summaryValue}>{totalQuantity}</span>
            </div>
          </div>

          <div style={s.summaryBox2}>
            <div style={s.summaryRow}>
              <span style={s.totalLabel}>{t("cart.totalOrderAmount")}</span>
              <span style={s.totalValue}>{formatAmount(totalPrice)}</span>
            </div>
          </div>

          {/* 결제수단 */}
          <div style={s.paymentSection}>
            <div style={s.paymentHeader}>
              <span style={s.paymentTitle}>{t("cart.paymentMethod")}</span>
              <span style={s.ptBadge}>
                {t("restaurantDetail.availableTotal", { amount: formatAmount(badgeAmount) })}
              </span>
            </div>

            {/* 옵션 4: 미니멀 + 아이콘 강화형 */}
            <div style={s.pointContainer}>
              {payType === "mixed" ? (
                /* 혼합 결제 — 가맹점 상세와 동일한 결제수단 (그레이 라인 영역) */
                <div style={s.ptCard}>
                  <div style={s.ptMethodList}>
                    {/* 기업포인트 (선택) */}
                    <button style={s.ptRowBtn} onClick={() => togglePt("corp")}>
                      <div style={s.ptRowLeft}>
                        <PtCheck checked={corpOn} />
                        <span style={s.ptLabel}>{t("cart.corpPoint")}</span>
                      </div>
                      <div style={s.ptRight}>
                        <span style={{ ...s.ptValue, color: colors.gray1 }}>{formatAmount(corporatePoint)}</span>
                        <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
                      </div>
                    </button>
                    {/* 사용가능 포인트 (기업포인트 종속) */}
                    <div style={s.ptSubBox}>
                      <span style={s.ptSubLabel}>{t("cart.availablePoint")}</span>
                      <span style={s.ptSubAmount}>{formatAmount(availablePoint)}</span>
                    </div>

                    <div style={s.ptDivider} />

                    {/* 올리브 포인트 (선택) */}
                    <button style={s.ptRowBtn} onClick={() => togglePt("olive")}>
                      <div style={s.ptRowLeft}>
                        <PtCheck checked={oliveOn} />
                        <span style={s.ptLabel}>{t("cart.olivePoint")}</span>
                      </div>
                      <div style={s.ptRight}>
                        <span style={s.ptValue}>{formatAmount(olivePoint)}</span>
                        <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
                      </div>
                    </button>
                  </div>
                </div>
              ) : payType === "personal" ? (
                /* 개인포인트 결제 — 올리브 포인트 (라인박스) */
                <div style={s.methodCard}>
                  <div style={{ ...s.pointItemActive, cursor: "pointer" }} onClick={() => setShowCorporatePoint(true)}>
                    <div style={s.pointItemRow}>
                      <div style={s.pointItemHeader}>
                        <div style={s.iconWrapperActive}>
                          <PointIcon size={20} strokeWidth={1.5} color={colors.primary} />
                        </div>
                        <span style={{ ...s.pointItemLabelActive, color: colors.black }}>{t("cart.olivePoint")}</span>
                      </div>
                      <div style={s.pointItemAmountWithArrow}>
                        <span style={{ ...s.pointItemValueActive, color: colors.black }}>{formatAmount(olivePoint)}</span>
                        <ChevronRight
                          size={16}
                          strokeWidth={2}
                          color={colors.black}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* 기업포인트 결제 — 기업포인트 + 사용가능 포인트 (라인박스) */
                <div style={s.methodCard}>
                  {/* 기업포인트 */}
                  <div style={s.pointItem}>
                    <div style={s.pointItemRow}>
                      <div style={s.pointItemHeader}>
                        <div style={s.iconWrapper}>
                          <Building2 size={20} strokeWidth={1.5} color={colors.gray1} />
                        </div>
                        <span style={s.pointItemLabel}>{t("cart.corpPoint")}</span>
                      </div>
                      <div style={s.pointItemAmountWithArrow}>
                        <span style={s.pointItemValue}>{formatAmount(corporatePoint)}</span>
                        <ChevronRight
                          size={16}
                          strokeWidth={2}
                          color="transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 구분선 */}
                  <div style={s.divider} />

                  {/* 사용가능 포인트 */}
                  <div style={{...s.pointItemActive, cursor: "pointer"}} onClick={() => setShowCorporatePoint(true)}>
                    <div style={s.pointItemRow}>
                      <div style={s.pointItemHeader}>
                        <div style={s.iconWrapperActive}>
                          <PointIcon size={20} strokeWidth={1.5} color={colors.primary} />
                        </div>
                        <span style={s.pointItemLabelActive}>{t("cart.availablePoint")}</span>
                      </div>
                      <div style={s.pointItemAmountWithArrow}>
                        <span style={s.pointItemValueActive}>{formatAmount(availablePoint)}</span>
                        <ChevronRight
                          size={16}
                          strokeWidth={2}
                          color={colors.primary}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Button ── */}
      <div style={s.bottomBar}>
        <button style={s.checkoutBtn} onClick={onCheckout}>
          <span style={s.checkoutText}>{t("cart.checkout")}</span>
        </button>
      </div>
        </>
      )}
    </div>
  );
}

// ─── 결제수단 체크 (혼합 결제) ─────────────────────────────────
function PtCheck({ checked }: { checked: boolean }) {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: 999,
        border: checked ? "none" : `2px solid ${colors.gray3}`,
        backgroundColor: checked ? colors.primary : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {checked && <Check size={13} strokeWidth={3} color={colors.white} />}
    </div>
  );
}

// ─── Cart Item Card ───────────────────────────────────────────
function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  isLast,
}: {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  isLast: boolean;
}) {
  const { t } = useTranslation();
  const displayName = item.nameKey ? t(item.nameKey) : item.name;
  const displayStore = item.storeKey ? t(item.storeKey) : item.store;
  const displayTime = item.pickupDate ? formatMonthDayTime(item.pickupDate) : item.pickupTime;
  return (
    <div style={{
      ...s.itemCard,
      borderBottom: isLast ? 'none' : `1px solid ${colors.gray5}`,
    }}>
      {/* 이미지 */}
      <img src={item.img} alt={displayName} style={s.itemImg} />

      {/* 정보 영역 */}
      <div style={s.itemInfo}>
        <div style={s.itemTextGroup}>
          <div style={{ display: "flex", flexDirection: "column", gap: 13, minWidth: 0 }}>
            <h3 style={s.itemName}>{displayName}</h3>
            <div style={s.itemStoreTimeGroup}>
              <p style={s.itemStore}>{displayStore}</p>
              <p style={s.itemTime}>{displayTime}</p>
            </div>
          </div>
          <p style={s.itemPrice}>{formatAmount(item.price)}</p>
        </div>

        {/* 수량 조절 */}
        <div style={s.qtyControl}>
          <button
            style={s.qtyBtn}
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            aria-label={t("common.decreaseQty")}
          >
            <Minus
              size={17}
              strokeWidth={2}
              color={item.quantity <= 1 ? colors.gray3 : colors.black}
            />
          </button>
          <span style={s.qtyValue}>{item.quantity}</span>
          <button
            style={s.qtyBtn}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            aria-label={t("common.increaseQty")}
          >
            <Plus size={17} strokeWidth={2} color={colors.black} />
          </button>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <button
        style={s.deleteBtn}
        onClick={() => onRemove(item.id)}
        aria-label={t("common.delete")}
      >
        <X size={18} strokeWidth={2} color={colors.gray1} />
      </button>
    </div>
  );
}

// ─── Keyframes ───────────────────────────────────────────────
const keyframes = `
@keyframes slideUpCart {\n  from { transform: translateY(100%); }\n  to   { transform: translateY(0); }\n}\n`;

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 150,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily: fontFamily,
    animation: "slideUpCart 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
  },

  /* ── Header ── */
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    paddingLeft: 12,
    paddingRight: 16,
    height: 54,
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    zIndex: 10,
  },
  headerInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backBtn: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },

  /* ── 결제 유형 셀렉트 ── */
  selectWrap: {
    position: "relative",
    flexShrink: 0,
  },
  selectBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    height: 34,
    paddingLeft: 12,
    paddingRight: 10,
    backgroundColor: colors.inputBg,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 8,
    cursor: "pointer",
  },
  selectText: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.13,
    whiteSpace: "nowrap",
  },
  selectScrim: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,
    backgroundColor: "transparent",
  },
  selectMenu: {
    position: "absolute",
    top: "calc(100% + 6px)",
    right: 0,
    minWidth: 160,
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 10,
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 21,
    overflow: "hidden",
  },
  selectOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    height: 42,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  selectOptionText: {
    fontSize: 14,
    letterSpacing: -0.14,
    whiteSpace: "nowrap",
  },

  /* ── Tab Badge ── */
  tabBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    backgroundColor: colors.bg,
  },
  tabIcon: {
    width: 26,
    height: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  tabIconImg: {
    width: 26,
    height: 26,
  },
  tabEmoji: {
    fontSize: 15,
    lineHeight: "16px",
  },
  tabText: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.15,
  },

  /* ── Scroll ── */
  scroll: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: colors.white,
  },

  /* ── Item List ── */
  itemList: {
    paddingTop: 16,
    paddingRight: 15,
    paddingBottom: 0,
    paddingLeft: 15,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  /* ── Item Card ── */
  itemCard: {
    position: "relative",
    display: "flex",
    gap: 23,
    paddingBottom: 24,
    borderBottom: `1px solid ${colors.gray5}`,
  },
  itemImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
    objectFit: "cover",
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    minWidth: 0,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
    margin: 0,
    lineHeight: "17px",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
  },
  itemStore: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
    lineHeight: "14px",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
  },
  itemTime: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
    lineHeight: "14px",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.16,
    margin: 0,
    lineHeight: "18px",
  },
  itemTextGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 0,
  },
  itemStoreTimeGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 90,
    height: 32,
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 6,
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
    textAlign: "center",
    lineHeight: "20px",
    minWidth: 20,
    flex: 1,
  },
  deleteBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: `1px solid ${colors.gray5}`,
    borderRadius: 5,
    flexShrink: 0,
  },

  /* ── Add Menu ── */
  addMenuBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 46,
    width: "calc(100% - 30px)",
    marginTop: 12,
    marginRight: 15,
    marginBottom: 30,
    marginLeft: 15,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  addMenuText: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.14,
  },

  /* ── Summary ── */
  summarySection: {
    display: "flex",
    flexDirection: "column",
  },
  summaryBox: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 9,
    paddingLeft: 20,
    backgroundColor: colors.bg,
    borderTop: `1px solid ${colors.bg}`,
  },
  summaryBox2: {
    paddingTop: 9,
    paddingRight: 20,
    paddingBottom: 18,
    paddingLeft: 20,
    backgroundColor: colors.bg,
    borderTop: `1px solid ${colors.bg}`,
  },
  summaryRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.15,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.15,
    textAlign: "right",
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.17,
  },
  totalValue: {
    fontSize: 19,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.19,
    textAlign: "right",
  },

  /* ── Payment ── */
  paymentSection: {
    paddingTop: 30,
    paddingRight: 20,
    paddingBottom: 100,
    paddingLeft: 20,
  },
  paymentHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
  },

  /* ── Option 4: Minimal + Icon Enhanced ── */
  pointContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  pointItem: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 18,
    paddingRight: 0,
    paddingBottom: 18,
    paddingLeft: 0,
  },
  pointItemActive: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 18,
    paddingRight: 0,
    paddingBottom: 18,
    paddingLeft: 0,
  },
  pointItemRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  pointItemHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray6,
    borderRadius: 10,
    flexShrink: 0,
  },
  iconWrapperActive: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    flexShrink: 0,
  },
  pointItemLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.16,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  pointItemLabelActive: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.primary,
    letterSpacing: -0.16,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  pointItemAmount: {
    display: "flex",
    alignItems: "baseline",
  },
  pointItemAmountWithArrow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  pointItemAmountRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 52,
    paddingRight: 8,
  },
  pointItemValue: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.18,
  },
  pointItemValueActive: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.18,
  },
  pointItemUnit: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.15,
    marginLeft: 4,
  },
  pointItemUnitActive: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.15,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 3,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
  },

  /* ── 혼합 결제 — 결제수단 카드 (그레이 라인) ── */
  ptBadge: {
    display: "inline-flex",
    alignItems: "center",
    height: 26,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 999,
    backgroundColor: colors.primaryLight,
    fontSize: 12,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.2,
  },
  ptCard: {
    border: `1px solid ${colors.gray5}`,
    borderRadius: 12,
    paddingTop: 4,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  methodCard: {
    border: `1px solid ${colors.gray5}`,
    borderRadius: 12,
    paddingTop: 2,
    paddingRight: 16,
    paddingBottom: 2,
    paddingLeft: 16,
  },
  ptMethodList: {
    display: "flex",
    flexDirection: "column",
  },
  ptRowBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 18,
    paddingBottom: 18,
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily,
  },
  ptRowLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  ptLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.16,
  },
  ptRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  ptValue: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.18,
  },
  ptSubBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginLeft: 34,
    marginTop: 2,
    marginBottom: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
  },
  ptSubLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  ptSubAmount: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  ptDivider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 14,
    marginBottom: 8,
  },

  /* ── Bottom Bar ── */
  bottomBar: {
    position: "relative",
    zIndex: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
    flexShrink: 0,
  },
  checkoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.16,
    gap: 6,
  },
  checkoutText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  checkoutPrice: {
    fontSize: 17,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.3,
    opacity: 0.85,
  },

  /* ── Empty State ── */
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingRight: 20,
    paddingBottom: 40,
    paddingLeft: 20,
    height: "calc(100% - 100px)",
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
    borderRadius: 10,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.16,
    textAlign: "center",
    marginBottom: 24,
  },
  homeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 10,
    border: "none",
    color: colors.white,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: -0.14,
    gap: 6,
  },
  homeBtnText: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.3,
  },
};