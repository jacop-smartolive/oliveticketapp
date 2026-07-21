/**
 * 혼자결제 QR 결제 팝업 (가맹점 결제)
 * - 장바구니(가맹점) / 가맹점 상세 포인트 혼자결제 시 노출
 * - "사장님 눌러주세요" 버튼 → onPay (결제완료)
 */
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, radius } from "../shared/tokens";
import { formatAmount } from "../shared/formatters";

interface SoloQrPopupProps {
  amount: number;
  storeNameKey: string;
  onClose: () => void;
  onPay: () => void;
}

export default function SoloQrPopup({ amount, storeNameKey, onClose, onPay }: SoloQrPopupProps) {
  const { t } = useTranslation();
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.card} onClick={(e) => e.stopPropagation()}>
        <span style={s.title}>{t("togetherPay.qrTitle")}</span>
        <span style={s.meta}>{t("restaurantDetail.paySolo")} | 2023.09.06 11:13</span>
        <button style={s.pressBtn} onClick={onPay}>
          <span style={s.pressAmount}>{formatAmount(amount)}</span>
          <span style={s.pressText}>{t("togetherPay.qrPress")}</span>
        </button>
        <span style={s.guide}>{t("togetherPay.qrGuide")}</span>
        <button style={s.cancelBtn} onClick={onClose}>{t("togetherPay.qrCancel")}</button>
        <div style={s.divider} />
        <div style={s.infoRow}>
          <span style={s.infoLabel}>{t("togetherPay.qrPayNumber")}</span>
          <span style={s.infoValue}>43573942875</span>
        </div>
        <div style={s.infoRow}>
          <span style={s.infoLabel}>{t("togetherPay.qrStore")}</span>
          <span style={s.infoValue}>{t(storeNameKey)}</span>
        </div>
        <div style={s.barcode} />
      </div>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 320,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    overflowY: "auto",
    fontFamily,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.white,
    borderRadius: 16,
    boxShadow: "0 12px 40px rgba(0,0,0,0.24)",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  meta: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    marginTop: 8,
  },
  pressBtn: {
    width: "100%",
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    fontFamily,
  },
  pressAmount: {
    fontSize: 30,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.5,
  },
  pressText: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.white,
    letterSpacing: -0.2,
  },
  guide: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    textAlign: "center",
    lineHeight: 1.5,
    marginTop: 14,
  },
  cancelBtn: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    marginTop: 14,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 18,
    marginBottom: 14,
  },
  infoRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  barcode: {
    width: "100%",
    height: 64,
    marginTop: 16,
    borderRadius: 6,
    background:
      "repeating-linear-gradient(90deg, #191A1C 0, #191A1C 2px, transparent 2px, transparent 4px, #191A1C 4px, #191A1C 7px, transparent 7px, transparent 9px)",
  },
};
