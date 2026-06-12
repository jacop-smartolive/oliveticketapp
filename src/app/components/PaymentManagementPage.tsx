/**
 * 결제 관리 페이지
 * - 올리브포인트 충전 > 올리브 페이 > 등록 카드 "설정" 클릭 시 진입
 * - 결제수단 관리 / 결제 비밀번호 설정 / 이메일 관리 / 해지하기
 */
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase } from "../shared/tokens";

interface PaymentManagementPageProps {
  onBack: () => void;
}

export default function PaymentManagementPage({ onBack }: PaymentManagementPageProps) {
  const { t } = useTranslation();

  const Row = ({ label }: { label: string }) => (
    <div style={s.row}>
      <span style={s.rowLabel}>{label}</span>
      <ChevronRight size={18} strokeWidth={2} color={colors.gray2} />
    </div>
  );

  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>{t("paymentMgmt.title")}</span>
        </div>
      </div>

      {/* Body */}
      <div style={s.scroll}>
        <div style={s.group}>
          <Row label={t("paymentMgmt.methodMgmt")} />
          <div style={s.divider} />
          <Row label={t("paymentMgmt.password")} />
          <div style={s.divider} />
          <Row label={t("paymentMgmt.email")} />
        </div>

        <div style={s.gap} />

        <div style={s.group}>
          <Row label={t("paymentMgmt.unsubscribe")} />
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
    zIndex: 120,
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
    flexShrink: 0,
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
    backgroundColor: colors.white,
  },
  group: {
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
  },
  gap: {
    height: 8,
    backgroundColor: colors.bg,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    cursor: "pointer",
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginLeft: spacing.xl,
    marginRight: spacing.xl,
  },
};
