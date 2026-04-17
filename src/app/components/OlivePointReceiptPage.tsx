/**
 * 올리브포인트 결제 영수증
 * - 충전/환불 내역 카드 클릭 시 진입
 * - 전자영수증 상세 정보 + 하단 "환불하기" 버튼
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase, radius } from "../shared/tokens";
import { showSuccessToast } from "../shared/toast";

interface OlivePointReceiptPageProps {
  onBack: () => void;
  onRefund?: () => void;
  refundable?: boolean;
  onRefundComplete?: () => void;
}

/* Mock 영수증 데이터 */
const receipt = {
  businessName: "㈜스마트올리브",
  transactionAt: "2024.02.27 12:03",
  approvalNo: "00757000",
  installment: "일시불",
  product: "직접 입력",
  amount: "16,500원",
  refundableAmount: "0원",
  businessNo: "646-88-00430",
  representative: "박현숙",
  address: "(08590) 서울특별시 금천구 가산디지털1로 88, 19층 04호(가산동, IT프리미어타워)",
  contact: "070-4006-5288",
};

export default function OlivePointReceiptPage({ onBack, onRefund, refundable = false, onRefundComplete }: OlivePointReceiptPageProps) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (showConfirm) {
      const timer = setTimeout(() => setFadeIn(true), 10);
      return () => clearTimeout(timer);
    } else {
      setFadeIn(false);
    }
  }, [showConfirm]);

  const closeConfirm = () => {
    setFadeIn(false);
    setTimeout(() => setShowConfirm(false), 200);
  };

  const submitRefund = () => {
    closeConfirm();
    setTimeout(() => {
      onRefund?.();
      if (onRefundComplete) {
        onRefundComplete();
      } else {
        showSuccessToast(t("olivePointRefund.submittedToast"));
      }
    }, 220);
  };

  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>{t("olivePointReceipt.title")}</span>
        </div>
      </div>

      {/* Scroll */}
      <div style={s.scroll}>
        <div style={s.card}>
          <div style={s.sectionTitle}>{t("olivePointReceipt.eReceipt")}</div>

          <Row label={t("olivePointReceipt.businessName")} value={receipt.businessName} />
          <Row label={t("olivePointReceipt.transactionAt")} value={receipt.transactionAt} />
          <Row label={t("olivePointReceipt.approvalNo")} value={receipt.approvalNo} />

          <Divider />

          <Row label={t("olivePointReceipt.installment")} value={receipt.installment} />
          <Row label={t("olivePointReceipt.product")} value={receipt.product} />

          <Divider />

          <Row label={t("olivePointReceipt.amount")} value={receipt.amount} />
          <Row label={t("olivePointReceipt.refundableAmount")} value={receipt.refundableAmount} />

          <Divider />

          <Row label={t("olivePointReceipt.businessNo")} value={receipt.businessNo} />
          <Row label={t("olivePointReceipt.representative")} value={receipt.representative} />
          <Row label={t("olivePointReceipt.address")} value={receipt.address} multiline />
          <Row label={t("olivePointReceipt.contact")} value={receipt.contact} />
        </div>
      </div>

      {/* Bottom Button */}
      <div style={s.bottomBar}>
        <button
          style={{
            ...s.refundBtn,
            backgroundColor: colors.gray6,
            color: colors.black,
            cursor: "pointer",
          }}
          onClick={() => setShowConfirm(true)}
        >
          {t("olivePointReceipt.refund")}
        </button>
      </div>

      {/* ── Confirm Dialog ── */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(25,26,28,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 300,
            transition: "opacity 0.2s ease",
            opacity: fadeIn ? 1 : 0,
            fontFamily,
          }}
          onClick={closeConfirm}
        >
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: 16,
              padding: "36px 28px 24px",
              width: "calc(100% - 56px)",
              maxWidth: 340,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              transform: fadeIn ? "scale(1)" : "scale(0.92)",
              opacity: fadeIn ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{
              fontSize: 20,
              fontWeight: 800,
              color: colors.black,
              letterSpacing: -0.5,
              margin: 0,
              marginBottom: 12,
              textAlign: "center",
            }}>
              {t("olivePointRefund.confirmTitle")}
            </p>
            <p style={{
              fontSize: 15,
              fontWeight: 500,
              color: colors.gray1,
              letterSpacing: -0.16,
              lineHeight: 1.5,
              margin: 0,
              marginBottom: 28,
              textAlign: "center",
              whiteSpace: "pre-line",
            }}>
              {t("olivePointRefund.confirmMessage")}
            </p>
            <div style={{ display: "flex", width: "100%", gap: 10 }}>
              <button
                style={{
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
                  fontFamily,
                }}
                onClick={closeConfirm}
              >
                {t("common.cancel")}
              </button>
              <button
                style={{
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
                  fontFamily,
                }}
                onClick={submitRefund}
              >
                {t("olivePointRefund.submitBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div style={{ ...s.row, alignItems: multiline ? "flex-start" : "center" }}>
      <span style={s.rowLabel}>{label}</span>
      <span style={{ ...s.rowValue, whiteSpace: multiline ? "normal" : "nowrap" }}>{value}</span>
    </div>
  );
}

function Divider() {
  return <div style={s.divider} />;
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
    backgroundColor: colors.bg,
    fontFamily,
    zIndex: 110,
  },

  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    paddingLeft: spacing.md,
    paddingRight: spacing.lg,
    height: 54,
    justifyContent: "center",
    zIndex: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  headerInner: {
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
    cursor: "pointer",
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },

  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: 15,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: "20px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    marginBottom: 2,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  rowLabel: {
    flexShrink: 0,
    width: 80,
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    lineHeight: 1.5,
  },
  rowValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
    lineHeight: 1.5,
    overflowWrap: "break-word",
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 4,
    marginBottom: 4,
  },

  bottomBar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    padding: "16px 16px 24px",
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
  },
  refundBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    fontFamily,
  },
};
