/**
 * 같이결제 결제내역 상세 — Phase 4
 * - 이용내역에서 같이결제 항목 클릭 시 진입
 * - 완료(PAID) / 취소(CANCELLED) 변형
 */
import type { CSSProperties } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase } from "../shared/tokens";
import { formatAmount } from "../shared/formatters";

interface SharePart {
  nameKey: string;
  deptKey: string;
  amount: number;
  isSelf?: boolean;
}

const SHARES: SharePart[] = [
  { nameKey: "mock.nameHong", deptKey: "mock.deptStrategy", amount: 30000 },
  { nameKey: "mock.nameChoiGimin", deptKey: "mock.deptStrategyBiz", amount: 60000 },
  { nameKey: "mock.nameShinJongho", deptKey: "mock.deptStrategyBiz", amount: 25000, isSelf: true },
];
const TOTAL = 115000;
const CORP_POINT = 23000;
const OLIVE_POINT = 2000;
const MY_POINT = CORP_POINT + OLIVE_POINT;

interface TogetherPaymentDetailPageProps {
  cancelled?: boolean;
  onBack: () => void;
}

export default function TogetherPaymentDetailPage({ cancelled = false, onBack }: TogetherPaymentDetailPageProps) {
  const { t } = useTranslation();

  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
          <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
        </button>
        <h1 style={s.headerTitle}>{t("togetherPay.historyTitle")}</h1>
      </div>

      <div style={s.scroll}>
        {/* 상태 */}
        <div style={s.statusBox}>
          <span style={{ ...s.statusText, color: cancelled ? colors.primary : colors.black }}>
            {cancelled ? t("paymentStatus.CANCELLED") : t("paymentStatus.PAID")}
          </span>
        </div>

        {/* 기본 정보 */}
        <div style={s.infoBox}>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>{t("togetherPay.dateLabel")}</span>
            <span style={s.infoValue}>2023.09.06 11:13</span>
          </div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>{t("togetherPay.methodLabel")}</span>
            <span style={s.infoValue}>{t("togetherPay.title")}</span>
          </div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>{t("paymentDetail.paymentNumber")}</span>
            <span style={s.infoValue}>7773023090610785040</span>
          </div>
        </div>

        {/* 총 주문금액 */}
        <div style={s.totalBox}>
          <span style={s.totalLabel}>{t("paymentDetail.totalOrderAmount")}</span>
          <span style={s.totalValue}>{formatAmount(TOTAL)}</span>
        </div>

        {/* 같이결제 내역 / 환불내역 */}
        <div style={s.section}>
          <span style={s.sectionTitle}>
            {cancelled ? t("togetherPay.refundListTitle") : t("togetherPay.detailListTitle")}
          </span>
          <div style={s.shareList}>
            {SHARES.map((sh, i) => (
              <div key={i} style={s.shareRow}>
                <span style={{ ...s.shareName, fontWeight: sh.isSelf ? 700 : 500 }}>
                  {t(sh.nameKey)} / {t(sh.deptKey)}
                </span>
                <span style={{ ...s.shareAmount, fontWeight: sh.isSelf ? 800 : 700 }}>
                  {formatAmount(sh.amount)}
                </span>
              </div>
            ))}
            <div style={s.shareDivider} />
            <div style={s.shareRow}>
              <span style={s.shareTotalLabel}>{t("paymentDetail.totalPaymentPoint")}</span>
              <span style={s.shareTotalValue}>{formatAmount(TOTAL)}</span>
            </div>
          </div>
        </div>

        {/* 결제 포인트 / 환불 포인트 (본인 부담분) */}
        <div style={s.section}>
          <span style={s.sectionTitle}>
            {cancelled ? t("paymentDetail.refundPoint") : t("paymentDetail.paymentPoint")}
          </span>
          <div style={s.shareList}>
            <div style={s.shareRow}>
              <span style={s.ptLabel}>{t("paymentDetail.corpPoint")}</span>
              <span style={s.ptValue}>{formatAmount(CORP_POINT)}</span>
            </div>
            <div style={s.shareRow}>
              <span style={s.ptLabel}>{t("paymentDetail.olivePoint")}</span>
              <span style={s.ptValue}>{formatAmount(OLIVE_POINT)}</span>
            </div>
            <div style={s.shareDivider} />
            <div style={s.shareRow}>
              <span style={s.shareTotalLabel}>
                {cancelled ? t("paymentDetail.totalRefundPoint") : t("paymentDetail.totalPaymentPoint")}
              </span>
              <span style={s.shareTotalValue}>{formatAmount(MY_POINT)}</span>
            </div>
          </div>
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
    backgroundColor: colors.bg,
    fontFamily,
    zIndex: 120,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 54,
    paddingLeft: 10,
    paddingRight: 16,
    backgroundColor: colors.white,
    flexShrink: 0,
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    zIndex: 2,
  },
  backBtn: {
    width: 34,
    height: 34,
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
    margin: 0,
  },
  scroll: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 24,
  },
  statusBox: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.3,
  },
  infoBox: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    textAlign: "right",
    wordBreak: "break-all",
  },
  totalBox: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  totalValue: {
    fontSize: 19,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.3,
  },
  section: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  shareList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  shareRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  shareName: {
    fontSize: 14,
    color: colors.black,
    letterSpacing: -0.2,
    minWidth: 0,
  },
  shareAmount: {
    fontSize: 14,
    color: colors.black,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  shareDivider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 2,
    marginBottom: 2,
  },
  shareTotalLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  shareTotalValue: {
    fontSize: 15,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.2,
  },
  ptLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  ptValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
};
