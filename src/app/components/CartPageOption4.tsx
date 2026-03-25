/**
 * 장바구니 페이지 - 옵션 4: 미니멀 + 아이콘 강화형
 * 간편식 예약 상품 담기 및 결제
 */
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Minus, X, Building2, Home, ShoppingBag as ShoppingBagLucide } from "lucide-react";
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

  // Mock 포인트 데이터
  const corporatePoint = 37000;
  const availablePoint = 29000;
  const totalPoint = corporatePoint + availablePoint;
  const [showCorporatePoint, setShowCorporatePoint] = useState(false);

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
          <div style={s.tabIcon}>
            <ShoppingBag color={colors.primary} size={14} />
          </div>
          <span style={s.tabText}>{t("cart.simpleMeal")}</span>
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
            </div>

            {/* 옵션 4: 미니멀 + 아이콘 강화형 */}
            <div style={s.pointContainer}>
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
    zIndex: 100,
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