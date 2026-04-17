/**
 * 올리브포인트 페이지
 * - 포인트 허브 > 올리브포인트 클릭 시 진입
 * - 탭: 잔여포인트 / 충전·환불 / 결제수단 관리
 * - 하단 고정 "환불하기" / "충전하기" 버튼
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase, radius, pillBadgeBase } from "../shared/tokens";
import { formatAmountStr } from "../shared/formatters";
import OlivePointReceiptPage from "./OlivePointReceiptPage";
import OlivePointRefundPage from "./OlivePointRefundPage";

interface ChargeRecord {
  id: number;
  chargedAmount: string;
  remainingAmount: string;
  chargedAt: string;
}

const mockChargeRecords: ChargeRecord[] = [
  { id: 1, chargedAmount: "20,000", remainingAmount: "10,000", chargedAt: "2023.12.31 09:38" },
  { id: 2, chargedAmount: "20,000", remainingAmount: "10,000", chargedAt: "2023.12.31 09:38" },
];

// ── 충전/환불 내역 ──
type ChargeRefundType = "CHARGE" | "USE" | "REFUND";

interface ChargeRefundRecord {
  id: number;
  date: string;   // "3월 5일 (화) 17:00" 형태
  method: string; // "신용카드 | 나이스 PG"
  amount: string;
  type: ChargeRefundType;
}

const mockChargeRefundRecords: ChargeRefundRecord[] = [
  { id: 1, date: "3월 5일 (화) 17:00", method: "신용카드 | 나이스 PG", amount: "130,000", type: "USE" },
  { id: 2, date: "3월 5일 (화) 17:00", method: "신용카드 | 나이스 PG", amount: "130,000", type: "CHARGE" },
  { id: 3, date: "3월 5일 (화) 17:00", method: "신용카드 | 나이스 PG", amount: "130,000", type: "REFUND" },
];

type FilterType = "ALL" | ChargeRefundType;
const filters: FilterType[] = ["ALL", "CHARGE", "USE", "REFUND"];
const filterLabelKey: Record<FilterType, string> = {
  ALL: "olivePoint.filterAll",
  CHARGE: "olivePoint.filterCharge",
  USE: "olivePoint.filterUse",
  REFUND: "olivePoint.filterRefund",
};

const statusConfig: Record<ChargeRefundType, { labelKey: string; bg: string; color: string }> = {
  USE: { labelKey: "olivePoint.statusUsed", bg: "#F3F4F6", color: "#191A1C" },
  CHARGE: { labelKey: "olivePoint.statusApproved", bg: "#DDEDFF", color: "#1D8AFF" },
  REFUND: { labelKey: "olivePoint.statusRefunded", bg: "#FFF0F1", color: "#EE2B2F" },
};

const TAB_KEYS = ["remaining", "charges", "payment"] as const;
type Tab = (typeof TAB_KEYS)[number];
const tabLabelKeys: Record<Tab, string> = {
  remaining: "olivePoint.remainingPoint",
  charges: "olivePoint.chargeRefund",
  payment: "olivePoint.paymentMethod",
};

interface OlivePointPageProps {
  onBack: () => void;
  onRefundComplete?: () => void;
}

export default function OlivePointPage({ onBack, onRefundComplete }: OlivePointPageProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("remaining");
  const [crFilter, setCrFilter] = useState<FilterType>("ALL");
  const [showReceipt, setShowReceipt] = useState(false);
  const [refundableReceipt, setRefundableReceipt] = useState(false);
  const [showRefund, setShowRefund] = useState(false);

  const totalPoints = "37,000";

  return (
    <div style={s.screen}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button onClick={onBack} style={s.backBtn} aria-label={t("common.back")}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>{t("olivePoint.title")}</span>
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

      {/* ── Scroll ── */}
      <div style={s.scrollArea}>
        {activeTab === "remaining" && (
          <>
            {/* Hero */}
            <div style={s.heroWrap}>
              <p style={s.heroLabel}>{t("olivePoint.availableLabel")}</p>
              <p style={s.heroValue}>{formatAmountStr(totalPoints)}</p>
            </div>

            {/* Charge Records */}
            <div style={s.cardList}>
              {mockChargeRecords.map((r) => (
                <div key={r.id} style={s.card}>
                  {/* 잔여 포인트 (강조) */}
                  <div style={s.balanceRow}>
                    <span style={s.balanceLabel}>{t("olivePoint.remainingPointLabel")}</span>
                    <span style={s.balanceValue}>{formatAmountStr(r.remainingAmount)}</span>
                  </div>
                  <div style={s.cardDivider} />
                  {/* 충전 포인트 */}
                  <div style={s.cardRow}>
                    <span style={s.cardLabel}>{t("olivePoint.chargedPoint")}</span>
                    <span style={s.cardValue}>{formatAmountStr(r.chargedAmount)}</span>
                  </div>
                  {/* 충전일시 */}
                  <div style={s.cardRow}>
                    <span style={s.cardLabel}>{t("olivePoint.chargedAt")}</span>
                    <span style={s.cardValueSub}>{r.chargedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "charges" && (() => {
          const filtered = crFilter === "ALL"
            ? mockChargeRefundRecords
            : mockChargeRefundRecords.filter(r => r.type === crFilter);

          return (
            <>
              {/* Filter pills */}
              <div style={s.reqFilterBar}>
                {filters.map((f) => {
                  const active = crFilter === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setCrFilter(f)}
                      style={{
                        ...s.reqFilterPill,
                        backgroundColor: active ? colors.black : colors.white,
                        color: active ? colors.white : colors.gray2,
                        border: active ? "none" : `1px solid ${colors.gray5}`,
                      }}
                    >
                      {t(filterLabelKey[f])}
                    </button>
                  );
                })}
              </div>

              {/* Records */}
              {filtered.length === 0 ? (
                <div style={s.emptyWrap}>
                  <span style={s.emptyText}>{t("common.noData")}</span>
                </div>
              ) : (
                <div style={s.reqList}>
                  {filtered.map((r) => {
                    const cfg = statusConfig[r.type];
                    return (
                      <div
                        key={r.id}
                        style={{ ...s.reqCard, cursor: "pointer" }}
                        onClick={() => {
                          setRefundableReceipt(r.type === "CHARGE");
                          setShowReceipt(true);
                        }}
                      >
                        <div style={s.reqLeft}>
                          <span style={s.reqDate}>{r.date}</span>
                          <span style={s.reqTitle}>{r.method}</span>
                        </div>
                        <div style={s.reqRight}>
                          <span style={{ ...s.reqStatusBadge, backgroundColor: cfg.bg, color: cfg.color }}>
                            {t(cfg.labelKey)}
                          </span>
                          <span style={s.reqAmount}>{formatAmountStr(r.amount)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          );
        })()}

        {activeTab === "payment" && (
          <div style={s.emptyWrap}>
            <span style={s.emptyText}>{t("common.noData")}</span>
          </div>
        )}
      </div>

      {/* ── Bottom Buttons ── */}
      <div style={s.bottomBar}>
        <button style={s.btnRefund} onClick={() => setShowRefund(true)}>{t("olivePoint.refund")}</button>
        <button style={s.btnCharge}>{t("olivePoint.charge")}</button>
      </div>

      {/* ── Receipt Page ── */}
      {showReceipt && (
        <OlivePointReceiptPage
          onBack={() => setShowReceipt(false)}
          refundable={refundableReceipt}
          onRefundComplete={onRefundComplete}
        />
      )}

      {/* ── Refund Page ── */}
      {showRefund && (
        <OlivePointRefundPage
          onBack={() => setShowRefund(false)}
          onRefundComplete={onRefundComplete}
        />
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
    zIndex: 100,
  },

  // Header
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

  // Tab Bar
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
    overflowX: "auto",
    scrollbarWidth: "none",
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
    fontFamily,
    whiteSpace: "nowrap",
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

  // Scroll
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 80,
  },

  // Hero
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

  // Card List
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    padding: "14px 15px 0",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 18,
    paddingRight: 18,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  cardRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
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
    color: colors.primary,
    letterSpacing: -0.5,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.gray5,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.3,
  },
  cardValueSub: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },

  // Filter & Record List
  reqFilterBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: "14px 15px 0",
    overflowX: "auto",
    scrollbarWidth: "none",
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
    fontFamily,
    whiteSpace: "nowrap",
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

  // Empty
  emptyWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray2,
  },

  // Bottom
  bottomBar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    gap: 10,
    padding: "16px 16px 24px",
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
  },
  btnRefund: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.gray6,
    color: colors.black,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily,
  },
  btnCharge: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily,
  },
};
