import { useState } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import PointApplicationFormPage from "./PointApplicationFormPage";
import { colors, fontFamily, pillBadgeBase, headerTitleBase } from "../shared/tokens";

// ─── Types ───────────────────────────────────────────────────
interface PointPolicy {
  id: number;
  title: string;
  statusLabelKey: string;
  available: boolean;
  remainingPoint: string;
  daysKey: string;
  timeKey: string;
  limitPerUseKey?: string;
  limitPerDayKey?: string;
  expiryKey?: string;
  approvalKey?: string;
}

interface PointApplicationPageProps {
  onBack: () => void;
  policies: PointPolicy[];
  onSubmit?: (policy: PointPolicy, type: string, amount: string, reason: string) => void;
}

export default function PointApplicationPage({
  onBack,
  policies,
  onSubmit,
}: PointApplicationPageProps) {
  const { t } = useTranslation();
  const [selectedPolicy, setSelectedPolicy] = useState<PointPolicy | null>(null);

  return (
    <div style={s.screen}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button onClick={onBack} style={s.backBtn}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>{t("pointApplication.title")}</span>
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scrollArea}>
        <div style={s.cardList}>
          {policies.map((policy) => {
            const ok = policy.available;

            return (
              <div key={policy.id} style={s.card}>
                {/* Title Row */}
                <div style={s.cardHeader}>
                  <span style={{ ...s.cardTitle, color: ok ? colors.black : "#bbb" }}>
                    {policy.title}
                  </span>
                </div>

                {/* Balance Row */}
                <div style={s.balanceRow}>
                  <span style={{ ...s.balanceLabel, color: ok ? colors.black : colors.gray2 }}>
                    {t("pointApplication.availablePoints")}
                  </span>
                  <span style={{ ...s.balanceValue, color: ok ? colors.primary : "#888" }}>
                    {policy.remainingPoint}
                  </span>
                </div>

                {/* Divider */}
                <div style={s.cardDivider} />

                {/* Info: 사용가능 일시 */}
                <div style={s.infoSection}>
                  <InfoRow label={t("corporatePoint.usableDays")} available={ok}>
                    <span>
                      {t(policy.daysKey)}
                      <br />
                      {t(policy.timeKey)}
                    </span>
                  </InfoRow>
                </div>

                {/* Divider */}
                <div style={s.cardDividerInner} />

                {/* Info: 사용 한도 / 사용 기한 / 신청 승인여부 */}
                <div style={s.infoSection}>
                  <InfoRow label={t("corporatePoint.usageLimit")} available={ok}>
                    <span>
                      {t("pointApplication.limitPerUse")} - {t(policy.limitPerUseKey || "pointApplication.noLimit")}
                      <br />
                      {t("pointApplication.limitPerDay")} - {t(policy.limitPerDayKey || "pointApplication.noLimit")}
                    </span>
                  </InfoRow>
                  <InfoRow label={t("corporatePoint.expiryLabel")} available={ok}>
                    <span>{policy.expiryKey ? t(policy.expiryKey) : "-"}</span>
                  </InfoRow>
                  <InfoRow label={t("corporatePoint.approvalLabel")} available={ok}>
                    <span>{policy.approvalKey ? t(policy.approvalKey) : "-"}</span>
                  </InfoRow>
                </div>

                {/* 신청하기 버튼 */}
                <div style={s.applyBtnWrap}>
                  <button
                    style={s.applyBtn}
                    onClick={() => {
                      setSelectedPolicy(policy);
                    }}
                  >
                    {t("pointApplication.applyBtn")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Point Application Form Page ── */}
      {selectedPolicy && (
        <PointApplicationFormPage
          policy={selectedPolicy}
          onBack={() => setSelectedPolicy(null)}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}

// ─── Info Row ────────────────────────────────────────────────
function InfoRow({
  label,
  children,
  available = true,
}: {
  label: string;
  children: React.ReactNode;
  available?: boolean;
}) {
  return (
    <div style={s.infoRow}>
      <span
        style={{
          ...s.infoLabel,
          color: available ? colors.black : colors.gray2,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div
        style={{
          ...s.infoValue,
          color: available ? colors.black : "#888",
          fontWeight: available ? 600 : 500,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Styles (CorporatePointPage 카드 스타일 재활용) ──────────
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
    fontFamily: fontFamily,
    zIndex: 110,
  },

  // ── Header ──
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

  // ── Scroll ──
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 40,
  },

  // ── Card List ──
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    padding: "20px 15px 0",
  },

  // ── Card (잔여포인트 탭과 동일) ──
  card: {
    position: "relative",
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 0,
    paddingLeft: 15,
  },

  // ── Card Header ──
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.45,
    margin: 0,
  },

  // ── Status Badge ──
  statusBadge: {
    ...pillBadgeBase,
    gap: 5,
    letterSpacing: -0.36,
  },

  // ── Balance Row ──
  balanceRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.36,
  },
  balanceValue: {
    fontSize: 19,
    fontWeight: 700,
    letterSpacing: -0.5,
  },

  // ── Divider ──
  cardDivider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 12,
    marginLeft: 0,
  },
  cardDividerInner: {
    height: 1,
    backgroundColor: colors.gray5,
    marginBottom: 12,
  },

  // ── Info Section ──
  infoSection: {
    display: "flex",
    flexDirection: "column",
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.36,
    minWidth: 85,
    flexShrink: 0,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.36,
    textAlign: "right",
  },

  // ── 신청하기 Button ──
  applyBtnWrap: {
    borderTop: `1px solid ${colors.gray5}`,
    marginTop: 8,
    paddingTop: 14,
    paddingRight: 0,
    paddingBottom: 14,
    paddingLeft: 0,
  },
  applyBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
    fontFamily: "'Pretendard', sans-serif",
  },
};