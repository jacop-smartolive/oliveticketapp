/**
 * 장바구니 페이지
 * 간편식 예약 상품 담기 및 결제
 */
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Minus, X, Wallet, Building2 } from "lucide-react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import svgPaths from "../../imports/svg-2zgxdrqmnu";
import PointIcon from "./PointIcon";

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

export default function CartPage({
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

  return (
    <div style={s.overlay}>
      <style>{keyframes}</style>

      {/* ── Header — QR결제 동일 ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <h1 style={s.headerTitle}>{t("cart.title")}</h1>
          </div>
        </div>
      </div>

      {/* ── Scroll Area ── */}
      <div style={s.scroll}>
        {/* ── Tab Badge ── */}
        <div style={s.tabBadge}>
          <div style={s.tabIcon}>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5.5C3 4.11929 4.11929 3 5.5 3H14.5C15.8807 3 17 4.11929 17 5.5V14.5C17 15.8807 15.8807 17 14.5 17H5.5C4.11929 17 3 15.8807 3 14.5V5.5Z"
                fill={colors.primary}
              />
              <rect x="6" y="6" width="8" height="6" rx="1" fill="white" />
              <path
                d="M10 1V3M6 3L7 1M14 3L13 1"
                stroke={colors.primary}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
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

            {/* 옵션 1: 총 포인트 강조형 */}
            <div style={s.pointCard}>
              {/* 총 포인트 헤더 */}
              <div style={s.totalPointHeader}>
                <Wallet size={20} strokeWidth={1.5} color={colors.primary} />
                <span style={s.totalPointLabel}>{t("cart.totalAvailablePoints")}</span>
              </div>
              
              {/* 총 포인트 금액 */}
              <div style={s.totalPointAmount}>
                <span style={s.totalPointValue}>{formatAmount(totalPoint)}</span>
                <span style={s.totalPointUnit}>P</span>
              </div>

              {/* 구분선 */}
              <div style={s.pointDivider} />

              {/* 세부 내역 */}
              <div style={s.pointDetailSection}>
                <div style={s.pointRow}>
                  <span style={s.pointDetailLabel}>{t("cart.corpPoint")}</span>
                  <span style={s.pointDetailValue}>
                    {formatAmount(corporatePoint)}
                  </span>
                </div>
                <div style={s.pointRow}>
                  <span style={s.pointDetailLabelActive}>{t("cart.availablePoint")}</span>
                  <div style={s.pointRowRight}>
                    <span style={s.pointDetailValueActive}>
                      {formatAmount(availablePoint)}
                    </span>
                    <ChevronRight
                      size={12}
                      strokeWidth={2}
                      color={colors.gray1}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
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
        <X size={18} strokeWidth={2} color={colors.gray2} />
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

  /* ── Header — QR결제 동일 ── */
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
    margin: 0,
  },

  /* ── Tab Badge ── */
  tabBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 12,
    paddingLeft: 20,
    backgroundColor: colors.bg,
  },
  tabIcon: {
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  tabText: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.13,
    flex: 1,
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
    paddingBottom: 20,
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
  },
  itemName: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
    margin: 0,
    lineHeight: "17px",
  },
  itemStore: {
    fontSize: 13,
    fontWeight: 400,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
    lineHeight: "13px",
  },
  itemTime: {
    fontSize: 13,
    fontWeight: 400,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
    lineHeight: "13px",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
    margin: 0,
    lineHeight: "18px",
  },
  itemTextGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
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
    height: 40,
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
    fontSize: 14,
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
  pointCard: {
    backgroundColor: "#F8F8F8",
    border: "none",
    borderRadius: 10,
    paddingTop: 17,
    paddingRight: 15,
    paddingBottom: 17,
    paddingLeft: 15,
    display: "flex",
    flexDirection: "column",
    gap: 19,
  },
  pointRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointDivider: {
    height: 1,
    backgroundColor: colors.gray5,
  },
  pointLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.15,
  },
  pointValue: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.15,
    textAlign: "right",
  },
  pointLabelActive: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.15,
  },
  pointRowRight: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  pointValueActive: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.15,
    textAlign: "right",
  },
  totalPointHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  totalPointLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.15,
  },
  totalPointAmount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  totalPointValue: {
    fontSize: 19,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.19,
    textAlign: "right",
  },
  totalPointUnit: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.15,
    marginLeft: 5,
  },
  pointDetailSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  pointDetailLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.15,
  },
  pointDetailValue: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.15,
    textAlign: "right",
  },
  pointDetailLabelActive: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.15,
  },
  pointDetailValueActive: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.15,
    textAlign: "right",
  },

  /* ── Bottom Bar ── */
  bottomBar: {
    position: "relative",
    paddingTop: 12,
    paddingRight: 10,
    paddingBottom: 16,
    paddingLeft: 10,
    backgroundColor: colors.white,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
  },
  checkoutBtn: {
    width: "100%",
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    border: "none",
    borderRadius: 10,
  },
  checkoutText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.17,
  },
};