/**
 * 기업포인트 페이지
 * - 홈 > 사용가능 포인트 영역 클릭 시 진입
 * - 잔여포인트 / 충전내역 / 신청내역 탭
 * - 포인트 정책 카드 접기/펼치기
 * - 하단 고정 "포인트 신청" 버튼
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import PointApplicationPage from "./PointApplicationPage";
import { colors, fontFamily, spacing, pillBadgeBase, headerTitleBase } from "../shared/tokens";
import {
  RequestStatus, RequestFilter,
  requestStatusKey, requestFilterKey,
} from "../shared/enums";
import { formatDateTimeWithDay, formatAmountStr } from "../shared/formatters";

// ── Status Badge Config ──────────────────────────────────────

// ─── Mock Data ───────────────────────────────────────────────
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

interface ChargeHistory {
  id: number;
  date: Date;
  title: string;
  chargedAmount: string;
  remainingAmount: string;
  depleted: boolean;
}

function getPointPolicies(t: (key: string) => string): PointPolicy[] {
  return [
    {
      id: 1,
      title: t("mock.lunchEmployee"),
      statusLabelKey: "corporatePoint.currentlyAvailable",
      available: true,
      remainingPoint: "29,000",
      daysKey: "corporatePoint.policyDaysAll",
      timeKey: "corporatePoint.policyTimeAll",
      limitPerUseKey: "corporatePoint.noLimit",
      limitPerDayKey: "corporatePoint.noLimit",
      expiryKey: "corporatePoint.expiryUnlimited",
      approvalKey: "corporatePoint.approvalNotRequired",
    },
    {
      id: 2,
      title: t("mock.dinnerEmployee"),
      statusLabelKey: "corporatePoint.currentlyAvailable",
      available: true,
      remainingPoint: "29,000",
      daysKey: "corporatePoint.policyDaysAll",
      timeKey: "corporatePoint.policyTimeAll",
      limitPerUseKey: "corporatePoint.noLimit",
      limitPerDayKey: "corporatePoint.noLimit",
      expiryKey: "corporatePoint.expiryUnlimited",
      approvalKey: "corporatePoint.approvalRequired",
    },
    {
      id: 3,
      title: t("mock.dinnerEmployee"),
      statusLabelKey: "corporatePoint.unavailable",
      available: false,
      remainingPoint: "29,000",
      daysKey: "corporatePoint.policyDaysAll",
      timeKey: "corporatePoint.policyTimeAll",
      limitPerUseKey: "corporatePoint.noLimit",
      limitPerDayKey: "corporatePoint.noLimit",
      expiryKey: "corporatePoint.expiryUnlimited",
      approvalKey: "corporatePoint.approvalNotRequired",
    },
  ];
}

function getChargeHistories(t: (key: string) => string): ChargeHistory[] {
  return [
    { id: 1, date: new Date(2025, 2, 1, 0, 11), title: t("mock.lunchEmployee"), chargedAmount: "130,000", remainingAmount: "106,950", depleted: false },
    { id: 2, date: new Date(2025, 1, 1, 0, 12), title: t("mock.lunchEmployee"), chargedAmount: "130,000", remainingAmount: "0", depleted: true },
    { id: 3, date: new Date(2025, 0, 1, 0, 12), title: t("mock.lunchEmployee"), chargedAmount: "130,000", remainingAmount: "0", depleted: true },
    { id: 4, date: new Date(2024, 11, 1, 0, 12), title: t("mock.lunchEmployee"), chargedAmount: "130,000", remainingAmount: "0", depleted: true },
    { id: 5, date: new Date(2024, 10, 1, 0, 12), title: t("mock.lunchEmployee"), chargedAmount: "130,000", remainingAmount: "0", depleted: true },
  ];
}

// ─── 신청내역 Mock Data ──────────────────────────────────────
// type RequestStatus — imported from enums

interface RequestHistory {
  id: number;
  date: Date;
  title: string;
  amount: string;
  status: RequestStatus;
}

const requestStatusConfig: Record<RequestStatus, { labelKey: string; bg: string; color: string }> = {
  APPROVED: { labelKey: "corporatePoint.statusApproved", bg: "#DDEDFF", color: "#1D8AFF" },
  APPLIED: { labelKey: "corporatePoint.statusApplied", bg: "#F3F4F6", color: "#191A1C" },
  REJECTED: { labelKey: "corporatePoint.statusRejected", bg: "#FFF0F1", color: "#EE2B2F" },
};

function getRequestHistories(t: (key: string) => string): RequestHistory[] {
  return [
    { id: 1, date: new Date(2025, 2, 5, 17, 0), title: t("mock.lunchEmployee"), amount: "130,000", status: RequestStatus.APPROVED },
    { id: 2, date: new Date(2025, 2, 5, 17, 0), title: t("mock.lunchEmployee"), amount: "130,000", status: RequestStatus.APPLIED },
    { id: 3, date: new Date(2025, 2, 5, 17, 0), title: t("mock.lunchEmployee"), amount: "130,000", status: RequestStatus.REJECTED },
    { id: 4, date: new Date(2025, 1, 28, 9, 0), title: t("mock.dinnerEmployee"), amount: "80,000", status: RequestStatus.APPROVED },
    { id: 5, date: new Date(2025, 1, 20, 10, 0), title: t("mock.lunchEmployee"), amount: "130,000", status: RequestStatus.APPROVED },
  ];
}

const requestFilters = [RequestFilter.ALL, RequestFilter.APPLIED, RequestFilter.APPROVED, RequestFilter.REJECTED] as const;

// ─── Tabs ────────────────────────────────────────────────────
const TAB_KEYS = ["remaining", "charges", "requests"] as const;
type Tab = (typeof TAB_KEYS)[number];
const tabLabelKeys: Record<Tab, string> = {
  remaining: "corporatePoint.remainingPoint",
  charges: "corporatePoint.chargeHistory",
  requests: "corporatePoint.requestHistory",
};

interface CorporatePointPageProps {
  onBack: () => void;
}

export default function CorporatePointPage({ onBack }: CorporatePointPageProps) {
  const { t } = useTranslation();
  const pointPolicies = getPointPolicies(t);
  const chargeHistories = getChargeHistories(t);
  const [activeTab, setActiveTab] = useState<Tab>("remaining");
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set([1]));
  const [requestFilter, setRequestFilter] = useState<RequestFilter>(RequestFilter.ALL);
  const [showPointApplication, setShowPointApplication] = useState(false);
  const [dynamicRequests, setDynamicRequests] = useState<RequestHistory[]>(() => getRequestHistories(t));
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertFadeIn, setAlertFadeIn] = useState(false);
  const [alertType, setAlertType] = useState<"approved" | "submitted">("approved");

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalPoints = "250,000";

  // ── 포인트 신청 완료 핸들러 ──
  const handlePointSubmit = (policy: PointPolicy, _type: string, submittedAmount: string, _reason: string) => {
    const isAutoApprove = policy.approvalKey === "corporatePoint.approvalNotRequired";

    const newRequest: RequestHistory = {
      id: Date.now(),
      date: new Date(),
      title: policy.title,
      amount: submittedAmount,
      status: isAutoApprove ? RequestStatus.APPROVED : RequestStatus.APPLIED,
    };

    setDynamicRequests((prev) => [newRequest, ...prev]);
    setShowPointApplication(false);
    setActiveTab("requests");
    setRequestFilter(RequestFilter.ALL);

    setTimeout(() => {
      setAlertMessage(
        isAutoApprove
          ? t("corporatePoint.approvedToast")
          : t("corporatePoint.submittedToast")
      );
      setAlertFadeIn(true);
      setAlertType(isAutoApprove ? "approved" : "submitted");
    }, 300);
  };

  return (
    <div style={s.screen}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button onClick={onBack} style={s.backBtn}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>{t("corporatePoint.title")}</span>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div style={s.tabBarWrap}>
        <div style={s.tabBar}>
          {TAB_KEYS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...s.tabItem,
                color: activeTab === tab ? colors.black : colors.gray3,
                fontWeight: activeTab === tab ? 700 : 500,
              }}
            >
              {t(tabLabelKeys[tab])}
              {activeTab === tab && <span style={s.tabIndicator} />}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scrollArea}>
        {activeTab === "remaining" && (
          <>
            {/* ── Total Points ── */}
            <div style={s.heroWrap}>
              <p style={s.heroLabel}>{t("corporatePoint.availablePointLabel")}</p>
              <p style={s.heroValue}>{formatAmountStr(totalPoints)}</p>
            </div>

            {/* ── Policy Cards ── */}
            <div style={s.cardList}>
              {pointPolicies.map((policy) => {
                const isExpanded = expandedIds.has(policy.id);
                const ok = policy.available;

                return (
                  <div
                    key={policy.id}
                    style={{
                      ...s.card,
                    }}
                  >
                    {/* Title Row */}
                    <div style={s.cardHeader}>
                      <span style={{ ...s.cardTitle, color: ok ? colors.black : "#bbb" }}>{policy.title}</span>
                      <span
                        style={{
                          ...s.statusBadge,
                          background: ok ? "#fff0f0" : "#f5f5f5",
                          color: ok ? colors.primary : "#999",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: ok ? colors.primary : "#CACACA",
                            flexShrink: 0,
                          }}
                        />
                        {t(policy.statusLabelKey)}
                      </span>
                    </div>

                    {/* Balance Row */}
                    <div style={s.balanceRow}>
                      <span style={{ ...s.balanceLabel, color: ok ? colors.black : colors.gray2 }}>{t("corporatePoint.remainingPointLabel")}</span>
                      <span
                        style={{
                          ...s.balanceValue,
                          color: ok ? colors.primary : "#888",
                        }}
                      >
                        {formatAmountStr(policy.remainingPoint)}
                      </span>
                    </div>

                    {/* Divider */}
                    <div style={s.cardDivider} />

                    {/* Always-visible info */}
                    <div style={s.infoSection}>
                      <InfoRow label={t("corporatePoint.usableDays")} available={ok}>
                        <span>
                          {t(policy.daysKey)}
                          <br />
                          {t(policy.timeKey)}
                        </span>
                      </InfoRow>
                    </div>

                    {/* Expandable detail */}
                    {isExpanded && (
                      <div style={s.expandedSection}>
                        <div style={s.cardDividerInner} />
                        <InfoRow label={t("corporatePoint.usageLimit")} available={ok}>
                          <span>
                            {t("corporatePoint.limitPerUse")} - {t(policy.limitPerUseKey)}
                            <br />
                            {t("corporatePoint.limitPerDay")} - {t(policy.limitPerDayKey)}
                          </span>
                        </InfoRow>
                        <InfoRow label={t("corporatePoint.expiryLabel")} available={ok}>
                          <span>{t(policy.expiryKey)}</span>
                        </InfoRow>
                        <InfoRow label={t("corporatePoint.approvalLabel")} available={ok}>
                          <span>{t(policy.approvalKey)}</span>
                        </InfoRow>
                      </div>
                    )}

                    {/* Toggle button */}
                    <button
                      onClick={() => toggleExpand(policy.id)}
                      style={s.toggleBtn}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={13} color={colors.gray1} />
                          <span>{t("corporatePoint.policyFold")}</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown size={13} color={colors.gray1} />
                          <span>{t("corporatePoint.policyExpand")}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "charges" && (
          <div style={s.chargeList}>
            {chargeHistories.map((history) => (
              <div
                key={history.id}
                style={{
                  ...s.chargeCard,
                  opacity: history.depleted ? 0.55 : 1,
                }}
              >
                <div style={s.chargeLeft}>
                  <span style={s.chargeDate}>{formatDateTimeWithDay(history.date)}</span>
                  <span style={s.chargeTitle}>{history.title}</span>
                  <div style={s.chargeAmountRow}>
                    <span style={s.chargeLabel}>{t("corporatePoint.charged")}</span>
                    <span style={s.chargeValue}>{formatAmountStr(history.chargedAmount)}</span>
                    <span style={s.chargeSep}>│</span>
                    <span style={s.chargeLabel}>{t("corporatePoint.remaining")}</span>
                    {history.depleted ? (
                      <span style={s.depletedBadge}>{t("corporatePoint.depleted")}</span>
                    ) : (
                      <span style={{ ...s.chargeValue, color: colors.primary }}>{formatAmountStr(history.remainingAmount)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "requests" && (() => {
          const filtered = requestFilter === RequestFilter.ALL
            ? dynamicRequests
            : dynamicRequests.filter((r) => r.status === requestFilter);

          return (
            <>
              {/* Sub-filter pills */}
              <div style={s.reqFilterBar}>
                {requestFilters.map((f) => {
                  const active = requestFilter === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setRequestFilter(f)}
                      style={{
                        ...s.reqFilterPill,
                        backgroundColor: active ? colors.black : colors.white,
                        color: active ? colors.white : colors.gray2,
                        border: active ? "none" : `1px solid ${colors.gray5}`,
                      }}
                    >
                      {t(requestFilterKey[f])}
                    </button>
                  );
                })}
              </div>

              {/* Request cards */}
              {filtered.length === 0 ? (
                <div style={s.emptyWrap}>
                  <p style={s.emptyText}>{t("corporatePoint.noRequests")}</p>
                </div>
              ) : (
                <div style={s.reqList}>
                  {filtered.map((req) => {
                    const cfg = requestStatusConfig[req.status];
                    return (
                      <div key={req.id} style={s.reqCard}>
                        <div style={s.reqLeft}>
                          <span style={s.reqDate}>{formatDateTimeWithDay(req.date)}</span>
                          <span style={s.reqTitle}>{req.title}</span>
                        </div>
                        <div style={s.reqRight}>
                          <span
                            style={{
                              ...s.reqStatusBadge,
                              backgroundColor: cfg.bg,
                              color: cfg.color,
                            }}
                          >
                            {t(cfg.labelKey)}
                          </span>
                          <span style={s.reqAmount}>{formatAmountStr(req.amount)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* ── Bottom Fixed Button ── */}
      <div style={s.bottomBar}>
        <button style={s.applyBtn} onClick={() => setShowPointApplication(true)}>
          <span style={s.chargePIcon}>P</span>
          <span style={s.applyBtnText}>{t("corporatePoint.applyPoint")}</span>
        </button>
      </div>

      {/* ── Point Application Page ── */}
      {showPointApplication && (
        <PointApplicationPage
          onBack={() => setShowPointApplication(false)}
          policies={pointPolicies}
          onSubmit={handlePointSubmit}
        />
      )}

      {/* ── Alert Toast ── */}
      {alertMessage && (
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
            zIndex: 400,
            transition: "opacity 0.3s ease",
            opacity: alertFadeIn ? 1 : 0,
            fontFamily: "'Pretendard', sans-serif",
          }}
          onClick={() => {
            setAlertFadeIn(false);
            setTimeout(() => setAlertMessage(null), 300);
          }}
        >
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: 16,
              padding: "36px 28px 24px",
              width: "calc(100% - 80px)",
              maxWidth: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: alertFadeIn ? "scale(1)" : "scale(0.92)",
              opacity: alertFadeIn ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: alertType === "approved" ? "#E8F5E9" : "#FFF0F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              {alertType === "approved" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="#EE2B2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="9" y="3" width="6" height="4" rx="1" stroke="#EE2B2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 12h6M9 16h4" stroke="#EE2B2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: colors.black,
                letterSpacing: -0.16,
                margin: 0,
                marginBottom: 24,
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {alertMessage}
            </p>
            <button
              style={{
                width: "100%",
                height: 48,
                borderRadius: 12,
                border: "none",
                backgroundColor: colors.primary,
                fontSize: 16,
                fontWeight: 700,
                color: colors.white,
                letterSpacing: -0.16,
                cursor: "pointer",
                fontFamily: "'Pretendard', sans-serif",
              }}
              onClick={() => {
                setAlertFadeIn(false);
                setTimeout(() => setAlertMessage(null), 300);
              }}
            >
              {t("common.confirm")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Info Row sub-component ──────────────────────────────────
function InfoRow({ label, children, available = true }: { label: string; children: React.ReactNode; available?: boolean }) {
  return (
    <div style={s.infoRow}>
      <span style={{ ...s.infoLabel, color: available ? colors.black : colors.gray2, whiteSpace: "nowrap", flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ ...s.infoValue, color: available ? colors.black : "#888", fontWeight: available ? 600 : 500 }}>{children}</div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
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
    fontFamily: "'Pretendard', sans-serif",
    zIndex: 100,
  },

  // ── Header ──
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    paddingLeft: spacing.md,
    paddingRight: spacing.lg,
    height: 54,
    justifyContent: "center",
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

  // ── Tab Bar (홈과 동일) ──
  tabBarWrap: {
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray5}`,
    position: "relative",
    zIndex: 5,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: spacing.xl,
    overflowX: "auto" as const,
    scrollbarWidth: "none" as const,
  },
  tabItem: {
    position: "relative",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: 24,
    fontSize: 16,
    letterSpacing: -0.3,
    cursor: "pointer",
    fontFamily: "'Pretendard', sans-serif",
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.black,
    borderRadius: 999,
  },

  // ── Scroll ──
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 100,
  },

  // ── Hero (총 포인트 - 텍스트만) ──
  heroWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px 15px 16px",
  },
  heroLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.15,
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 30,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },

  // ── Card List ──
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    padding: "14px 15px 0",
  },
  card: {
    position: "relative",
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    paddingTop: 24,
    paddingBottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
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
    fontSize: 13,
    letterSpacing: -0.36,
    padding: "5px 12px 5px 10px",
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
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.3,
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
    margin: "0 0 12px",
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
  expandedSection: {
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

  // ── Toggle Button ──
  toggleBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 6,
    backgroundColor: "transparent",
    border: "none",
    borderTop: `1px solid ${colors.gray5}`,
    cursor: "pointer",
    color: colors.gray1,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: -0.36,
    fontFamily: "'Pretendard', sans-serif",
  },

  // ── Empty ──
  emptyWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.14,
  },

  // ── Bottom Bar ──
  bottomBar: {
    position: "relative",
    zIndex: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    padding: "16px 16px 24px",
  },
  applyBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
  },
  applyBtnText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.17,
  },
  chargePIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    fontSize: 12,
    fontWeight: 800,
    color: colors.white,
    marginRight: 6,
  },

  // ── Charge List ──
  chargeList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "14px 15px 0",
  },
  chargeCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: "18px 16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  chargeLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  chargeDate: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.44,
  },
  chargeTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.13,
  },
  chargeAmount: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.14,
  },
  chargeAmountRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chargeLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.36,
  },
  chargeValue: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.5,
  },
  chargeSep: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.gray3,
    margin: "0 2px",
  },
  depletedBadge: {
    ...pillBadgeBase,
    color: colors.gray2,
    letterSpacing: -0.36,
    backgroundColor: "#F3F4F6",
  },

  // ── Request List ──
  reqFilterBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: "14px 15px 0",
    overflowX: "auto" as const,
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none",
    WebkitOverflowScrolling: "touch",
  },
  reqFilterPill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: -0.3,
    cursor: "pointer",
    fontFamily: "'Pretendard', sans-serif",
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  reqList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "14px 15px 0",
  },
  reqCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: "18px 16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  reqLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  reqDate: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.44,
  },
  reqTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.13,
  },
  reqRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },
  reqStatusBadge: {
    ...pillBadgeBase,
  },
  reqAmount: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.14,
  },

  // ── Modal ──
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 101,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: "20px 30px",
    width: "90%",
    maxWidth: 500,
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
};