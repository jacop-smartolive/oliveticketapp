/**
 * 결제 확인 / 결제 완료 팝업
 * QR결제 완료 팝업과 동일한 디자인 기반
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import ShoppingBag from "../../imports/ShoppingBag";
import { colors, fontFamily } from "../shared/tokens";
import { formatAmount } from "../shared/formatters";

// ─── 1. 결제 확인 컨펌 팝업 ────────────────────────────────────
interface PaymentConfirmPopupProps {
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PaymentConfirmPopup({
  amount,
  onConfirm,
  onCancel,
}: PaymentConfirmPopupProps) {
  const { t } = useTranslation();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setFadeIn(true));
  }, []);

  const handleCancel = () => {
    setFadeIn(false);
    setTimeout(onCancel, 200);
  };

  const handleConfirm = () => {
    setFadeIn(false);
    setTimeout(onConfirm, 200);
  };

  return (
    <div
      style={{
        ...confirmStyles.overlay,
        opacity: fadeIn ? 1 : 0,
      }}
      onClick={handleCancel}
    >
      <div
        style={{
          ...confirmStyles.dialog,
          transform: fadeIn ? "scale(1)" : "scale(0.92)",
          opacity: fadeIn ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={confirmStyles.amount}>{formatAmount(amount)}</p>
        <p style={confirmStyles.message}>{t("paymentPopup.confirmTitle")}</p>
        <div style={confirmStyles.btnRow}>
          <button style={confirmStyles.cancelBtn} onClick={handleCancel}>
            {t("common.cancel")}
          </button>
          <button style={confirmStyles.confirmBtn} onClick={handleConfirm}>
            {t("paymentPopup.payBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

const confirmStyles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(25,26,28,0.5)",
    zIndex: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s ease",
    fontFamily: fontFamily,
  },
  dialog: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingTop: 36,
    paddingRight: 28,
    paddingBottom: 24,
    paddingLeft: 28,
    width: "calc(100% - 80px)",
    maxWidth: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s ease, opacity 0.2s ease",
  },
  amount: {
    fontSize: 32,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.5,
    margin: 0,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.16,
    margin: 0,
    marginBottom: 28,
  },
  btnRow: {
    display: "flex",
    width: "100%",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    border: `1.5px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 16,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.16,
    cursor: "pointer",
  },
  confirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.primary,
    fontSize: 16,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.16,
    cursor: "pointer",
  },
};

// ─── 2. 결제 완료 팝업 (QR 결제 완료 팝업과 동일) ───────────────
export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface PaymentCompletePopupProps {
  amount: number;
  onClose: () => void;
  onAdditionalPay: () => void;
  orderItems?: OrderItem[];
}

export function PaymentCompletePopup({
  amount,
  onClose,
  onAdditionalPay,
  orderItems,
}: PaymentCompletePopupProps) {
  const { t } = useTranslation();
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setSlideIn(true));
  }, []);

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(onClose, 300);
  };

  const handleAdditionalPay = () => {
    setSlideIn(false);
    setTimeout(onAdditionalPay, 300);
  };

  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const orderNumber = String(Math.floor(10000000000 + Math.random() * 90000000000));

  return (
    <div
      style={{
        ...popupStyles.overlay,
        opacity: slideIn ? 1 : 0,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          ...popupStyles.sheet,
          transform: slideIn ? "translateY(0)" : "translateY(100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div style={popupStyles.sheetHeader}>
          <span style={popupStyles.sheetTitle}>{t("paymentPopup.completeTitle")}</span>
          <button onClick={handleClose} style={popupStyles.closeBtn}>
            <X size={18} strokeWidth={2.5} color="#888" />
          </button>
        </div>

        {/* ── Amount Row + 추가결제 ── */}
        <div style={popupStyles.amountRow}>
          <span style={popupStyles.amountValue}>
            {formatAmount(amount)}
          </span>
          <button onClick={handleAdditionalPay} style={popupStyles.additionalPayBtn}>
            <ShoppingBag color="#FFFFFF" size={14} />
            {t("paymentPopup.additionalPay")}
          </button>
        </div>

        {/* ── Detail Rows ── */}
        <div style={popupStyles.detailSection}>
          <div style={popupStyles.detailRow}>
            <span style={popupStyles.detailLabel}>{t("paymentPopup.paymentDate")}</span>
            <span style={popupStyles.detailValue}>{dateStr}</span>
          </div>
          <div style={popupStyles.detailRow}>
            <span style={popupStyles.detailLabel}>{t("paymentPopup.paymentNumber")}</span>
            <span style={popupStyles.detailValue}>{orderNumber}</span>
          </div>
          <div style={popupStyles.detailRow}>
            <span style={popupStyles.detailLabel}>{t("paymentPopup.paymentPlace")}</span>
            <span style={popupStyles.detailValue}>{t("paymentPopup.cafeteriaName")}</span>
          </div>
        </div>

        {/* ── 간편식 결제내역 ── */}
        {orderItems && orderItems.length > 0 && (
          <div style={popupStyles.orderSection}>
            <p style={popupStyles.orderSectionTitle}>{t("paymentPopup.simpleMealHistory")}</p>
            <div style={popupStyles.orderDivider} />
            {orderItems.map((item, idx) => (
              <div key={idx}>
                <div style={popupStyles.orderItem}>
                  <div style={popupStyles.orderItemLeft}>
                    <p style={popupStyles.orderItemName}>{item.name}</p>
                    <p style={popupStyles.orderItemQty}>{t("paymentPopup.quantity", { count: item.quantity })}</p>
                  </div>
                  <p style={popupStyles.orderItemPrice}>
                    {formatAmount(item.price * item.quantity)}
                  </p>
                </div>
                {idx < orderItems.length - 1 && (
                  <div style={popupStyles.orderDivider} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const popupStyles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(25,26,28,0.4)",
    zIndex: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    transition: "opacity 0.3s ease",
    fontFamily: fontFamily,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 24,
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 28,
    transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  },
  sheetHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.18,
  },
  closeBtn: {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 999,
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  amountRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  amountValue: {
    fontSize: 30,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.3,
  },
  additionalPayBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingLeft: 16,
    paddingRight: 16,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 100,
    border: "none",
    color: colors.white,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: -0.13,
    cursor: "pointer",
  },
  detailSection: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
    marginBottom: 32,
  },
  detailRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.14,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.14,
    textAlign: "right",
  },
  orderSection: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 8,
  },
  orderSectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.15,
    margin: 0,
    marginBottom: 4,
  },
  orderItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingBottom: 14,
  },
  orderItemLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.14,
    margin: 0,
  },
  orderItemQty: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.gray2,
    letterSpacing: -0.12,
    margin: 0,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.14,
    textAlign: "right",
    margin: 0,
  },
  orderDivider: {
    height: 1,
    backgroundColor: colors.gray5,
  },
};