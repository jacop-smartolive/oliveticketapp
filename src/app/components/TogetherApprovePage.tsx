/**
 * 같이결제 허용하기 (참여자) — Phase 3
 * - 알림의 "같이결제 승인요청" 터치 시 진입
 * - 상단 주문정보 + 내 상태(나) + 결제 허용 여부(대표자 고정) + 결제 허용
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import { formatAmount } from "../shared/formatters";

interface ApprovePayer {
  id: number;
  nameKey: string;
  deptKey: string;
  amount: number;
  isSelf?: boolean;
  isRep?: boolean;
  allowed: boolean;
}

const STORE_KEY = "mock.storeKimbap";
const TOTAL = 115000;

// 대표자 고정(첫 열) + 참여자
const INIT_PAYERS: ApprovePayer[] = [
  { id: 1, nameKey: "mock.nameHong", deptKey: "mock.deptStrategy", amount: 28750, isRep: true, allowed: true },
  { id: 2, nameKey: "mock.nameChoiGimin", deptKey: "mock.deptStrategyBiz", amount: 28750, allowed: true },
  { id: 3, nameKey: "mock.nameSantos", deptKey: "mock.deptDev", amount: 28750, allowed: false },
  { id: 4, nameKey: "mock.nameShinJongho", deptKey: "mock.deptStrategyBiz", amount: 28750, isSelf: true, allowed: false },
];

interface TogetherApprovePageProps {
  onBack: () => void;
}

export default function TogetherApprovePage({ onBack }: TogetherApprovePageProps) {
  const { t } = useTranslation();
  const [payers, setPayers] = useState<ApprovePayer[]>(INIT_PAYERS);
  const [showDone, setShowDone] = useState(false);

  const me = payers.find((p) => p.isSelf);
  const others = payers.filter((p) => !p.isSelf);

  const approve = () => {
    setPayers((prev) => prev.map((p) => (p.isSelf ? { ...p, allowed: true } : p)));
    setShowDone(true);
  };

  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
          <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
        </button>
        <h1 style={s.headerTitle}>{t("togetherPay.title")}</h1>
      </div>

      <div style={s.scroll}>
        {/* 주문 정보 */}
        <div style={s.orderBox}>
          <span style={s.storeName}>{t(STORE_KEY)}</span>
          <div style={s.orderRow}>
            <span style={s.orderLabel}>{t("togetherPay.totalLabel")}</span>
            <div style={s.orderRight}>
              <span style={s.orderAmount}>{formatAmount(TOTAL)}</span>
              <span style={s.orderPeople}>{t("togetherPay.peopleUnit", { count: payers.length })}</span>
            </div>
          </div>
        </div>

        {/* 내 상태 */}
        {me && (
          <div style={s.myBox}>
            <div style={s.payerRow}>
              <div style={s.payerInfo}>
                <div style={s.payerNameRow}>
                  <span style={s.payerName}>{t(me.nameKey)}</span>
                  <span style={s.meBadge}>{t("togetherPay.me")}</span>
                </div>
                <span style={s.payerDept}>{t(me.deptKey)}</span>
              </div>
              <span style={s.amount}>{formatAmount(me.amount)}</span>
              <span style={me.allowed ? s.allowedBadge : s.pendingBadge}>
                {me.allowed ? t("togetherPay.allowed") : t("togetherPay.notAllowed")}
              </span>
            </div>
          </div>
        )}

        {/* 결제 허용 여부 */}
        <div style={s.allowSection}>
          <span style={s.sectionTitle}>{t("togetherPay.allowSectionTitle")}</span>
          <div style={s.allowList}>
            {others.map((p) => (
              <div key={p.id} style={s.payerRow}>
                <div style={s.payerInfo}>
                  <span style={s.payerName}>{t(p.nameKey)}</span>
                  <span style={s.payerDept}>{t(p.deptKey)}</span>
                </div>
                <span style={s.amount}>{formatAmount(p.amount)}</span>
                {p.isRep ? (
                  <span style={s.repBadge}>{t("togetherPay.representative")}</span>
                ) : (
                  <span style={p.allowed ? s.allowedBadge : s.pendingBadge}>
                    {p.allowed ? t("togetherPay.allowed") : t("togetherPay.notAllowed")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div style={s.bottomBar}>
        <button style={s.cancelBtn} onClick={onBack}>{t("common.cancel")}</button>
        <button
          style={{ ...s.approveBtn, ...(me?.allowed ? { opacity: 0.5 } : {}) }}
          onClick={approve}
          disabled={me?.allowed}
        >
          {t("togetherPay.approveBtn")}
        </button>
      </div>

      {/* 허용 완료 얼럿 */}
      {showDone && (
        <div style={s.doneOverlay}>
          <div style={s.doneCard}>
            <p style={s.doneText}>{t("togetherPay.approveDone")}</p>
            <button style={s.doneBtn} onClick={onBack}>{t("togetherPay.confirm")}</button>
          </div>
        </div>
      )}
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
    zIndex: 220,
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
  },
  orderBox: {
    backgroundColor: colors.white,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  storeName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  orderRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  orderRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.3,
  },
  orderPeople: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  myBox: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
  },
  allowSection: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingTop: 18,
    paddingBottom: 24,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  allowList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  payerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  payerInfo: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  payerNameRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  payerName: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  payerDept: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  meBadge: {
    display: "inline-flex",
    alignItems: "center",
    height: 18,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: radius.full,
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: -0.2,
  },
  amount: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  repBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    minWidth: 54,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: radius.full,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  allowedBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    minWidth: 54,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: radius.full,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  pendingBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    minWidth: 54,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: radius.full,
    border: `1px solid ${colors.gray3}`,
    backgroundColor: colors.white,
    color: colors.gray2,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: "12px 16px 20px",
    backgroundColor: colors.white,
    boxShadow: "0 -1px 8px rgba(0,0,0,0.06)",
    flexShrink: 0,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.gray6,
    color: colors.gray1,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
  approveBtn: {
    flex: 2,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },

  /* 허용 완료 얼럿 */
  doneOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 260,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  doneCard: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingTop: 28,
    paddingBottom: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  doneText: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    textAlign: "center",
    lineHeight: 1.5,
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
    whiteSpace: "pre-line",
  },
  doneBtn: {
    width: "100%",
    height: 52,
    marginTop: 20,
    backgroundColor: "transparent",
    border: "none",
    borderTop: `1px solid ${colors.gray5}`,
    color: colors.primary,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
};
