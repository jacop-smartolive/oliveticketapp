/**
 * 기업포인트 신청서 페이지 – 모던 리디자인
 */
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, pillBadgeBase, headerTitleBase } from "../shared/tokens";

/** 페이지 고유 색상 */
const inputBg = "#F2F3F5";
const cardShadow = "0 2px 12px rgba(0,0,0,0.06)";

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

interface PointApplicationFormPageProps {
  onBack: () => void;
  policy: PointPolicy;
  onSubmit?: (policy: PointPolicy, type: string, amount: string, reason: string) => void;
}

export default function PointApplicationFormPage({
  policy,
  onBack,
  onSubmit,
}: PointApplicationFormPageProps) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(policy.remainingPoint.replace(/[^0-9,]/g, ""));
  const [reason, setReason] = useState("");
  const [focusAmount, setFocusAmount] = useState(false);
  const [focusReason, setFocusReason] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmFadeIn, setConfirmFadeIn] = useState(false);

  const REASON_MAX = 100;
  const TAGS = [
    { label: t("pointApplication.overtimeTag"), text: t("pointApplication.overtimeReason") },
    { label: t("pointApplication.travelTag"), text: t("pointApplication.travelReason") },
  ];

  const handleAmountChange = (val: string) => {
    const raw = val.replace(/[^0-9]/g, "");
    if (!raw) {
      setAmount("");
      return;
    }
    setAmount(Number(raw).toLocaleString());
  };

  const handleResetAmount = () => {
    setAmount("");
  };

  const handleTagSelect = (tag: { label: string; text: string }) => {
    if (selectedTag === tag.label) {
      setSelectedTag(null);
      setReason("");
    } else {
      setSelectedTag(tag.label);
      setReason(tag.text);
    }
  };

  const handleDirectInput = () => {
    if (selectedTag === t("pointApplication.directInput")) {
      setSelectedTag(null);
    } else {
      setSelectedTag(t("pointApplication.directInput"));
      setReason("");
    }
  };

  const handleSubmitClick = () => {
    setShowConfirm(true);
    requestAnimationFrame(() => setConfirmFadeIn(true));
  };

  const handleConfirmCancel = () => {
    setConfirmFadeIn(false);
    setTimeout(() => setShowConfirm(false), 200);
  };

  const handleConfirmSubmit = () => {
    setConfirmFadeIn(false);
    setTimeout(() => {
      setShowConfirm(false);
      onSubmit?.(policy, "now", amount, reason);
    }, 200);
  };

  const ok = policy.available;

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
        {/* ══════════════════════════════════════════════════
            Card 1: 정책 정보
           ══════════════════════════════════════════════════ */}
        <div style={s.card}>
          {/* Title */}
          <div style={s.cardHeader}>
            <span style={s.cardTitle}>{policy.title}</span>
          </div>

          {/* 신청가능 포인트 (잔여포인트 카드와 동일) */}
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

          {/* 사용가능 일시 */}
          <div style={s.infoSection}>
            <InfoRow label={t("corporatePoint.usableDays")}>
              {t(policy.daysKey)}
              <br />
              {t(policy.timeKey)}
            </InfoRow>
          </div>

          {/* Divider */}
          <div style={s.cardDivider} />

          {/* 사용 한도 / 사용 기한 / 신청 승인여부 */}
          <div style={s.infoSection}>
            <InfoRow label={t("corporatePoint.usageLimit")}>
              {t("pointApplication.limitPerUse")} - {t(policy.limitPerUseKey || "pointApplication.noLimit")}
              <br />
              {t("pointApplication.limitPerDay")} - {t(policy.limitPerDayKey || "pointApplication.noLimit")}
            </InfoRow>
            <InfoRow label={t("corporatePoint.expiryLabel")}>
              {policy.expiryKey ? t(policy.expiryKey) : "-"}
            </InfoRow>
            <InfoRow label={t("corporatePoint.approvalLabel")}>
              {policy.approvalKey ? t(policy.approvalKey) : "-"}
            </InfoRow>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            Card 2: 신청 포인트
           ══════════════════════════════════════════════════ */}
        <div style={s.card}>
          {/* 라벨 + 초기화 */}
          <div style={s.pointLabelRow}>
            <span style={s.pointLabel}>{t("pointApplication.applyAmount")}</span>
            <button style={s.resetBtn} onClick={handleResetAmount}>
              {t("pointApplication.resetBtn")}
            </button>
          </div>

          {/* 입력 필드 – surface 배경 */}
          <div
            style={{
              ...s.amountInputWrap,
              backgroundColor: focusAmount ? "#FFFFFF" : inputBg,
            }}
          >
            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              onFocus={() => setFocusAmount(true)}
              onBlur={() => setFocusAmount(false)}
              style={s.amountInput}
              placeholder="0"
            />
          </div>

          {/* 안내 문구 – accent 배경 + 보더 */}
          <div style={s.noticeBox}>
            <div style={s.noticeIconRow}>
              <div style={s.noticeIconCircle}>
                <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, lineHeight: 1 }}>!</span>
              </div>
              <span style={s.noticeTitle}>{t("pointApplication.title")}</span>
            </div>
            <p style={s.noticeHighlight}>{t("pointApplication.noticeCharge")}</p>
            <div style={s.noticeList}>
              <p style={s.noticeItem}>
                {t("pointApplication.noticeLimit")}
              </p>
              <p style={s.noticeItem}>
                {t("pointApplication.noticeComplete")}
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            Card 3: 신청 사유
           ══════════════════════════════════════════════════ */}
        <div style={s.card}>
          {/* 라 + 글자수 카운터 */}
          <div style={s.reasonLabelRow}>
            <span style={s.pointLabel}>{t("pointApplication.applyReason")}</span>
            <span style={s.reasonCount}>
              {reason.length} / {REASON_MAX}
            </span>
          </div>
          <textarea
            value={reason}
            onChange={(e) => {
              if (e.target.value.length <= REASON_MAX) {
                setReason(e.target.value);
                // 태그로 입력된 텍스트가 수정되면 직접입력 탭으로 전환
                if (selectedTag && selectedTag !== t("pointApplication.directInput")) {
                  const matchedTag = TAGS.find((t) => t.label === selectedTag);
                  if (matchedTag && e.target.value !== matchedTag.text) {
                    setSelectedTag(t("pointApplication.directInput"));
                  }
                }
              }
            }}
            onFocus={() => setFocusReason(true)}
            onBlur={() => setFocusReason(false)}
            style={{
              ...s.reasonInput,
              backgroundColor: focusReason ? "#FFFFFF" : inputBg,
            }}
            placeholder={t("pointApplication.reasonPlaceholder")}
            maxLength={REASON_MAX}
            rows={3}
          />
          {/* 빠른 선택 태그 */}
          <div style={s.tagContainer}>
            {TAGS.map((tag) => (
              <button
                key={tag.label}
                style={{
                  ...s.tag,
                  borderColor:
                    selectedTag === tag.label ? colors.primary : colors.gray5,
                  backgroundColor:
                    selectedTag === tag.label ? colors.primaryLight : colors.bg,
                  color:
                    selectedTag === tag.label ? colors.primary : colors.gray1,
                }}
                onClick={() => handleTagSelect(tag)}
              >
                {tag.label}
              </button>
            ))}
            <button
              style={{
                ...s.tag,
                borderColor:
                  selectedTag === t("pointApplication.directInput") ? colors.primary : colors.gray5,
                backgroundColor:
                  selectedTag === t("pointApplication.directInput") ? colors.primaryLight : colors.bg,
                color:
                  selectedTag === t("pointApplication.directInput") ? colors.primary : colors.gray1,
              }}
              onClick={handleDirectInput}
            >
              {t("pointApplication.directInput")}
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Buttons ── */}
      <div style={s.bottomBar}>
        <button
          style={s.chargeBtn}
          onClick={handleSubmitClick}
        >
          {t("pointApplication.submitComplete")}
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
            opacity: confirmFadeIn ? 1 : 0,
            fontFamily: fontFamily,
          }}
          onClick={handleConfirmCancel}
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
              transform: confirmFadeIn ? "scale(1)" : "scale(0.92)",
              opacity: confirmFadeIn ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{
              fontSize: 32,
              fontWeight: 800,
              color: colors.black,
              letterSpacing: -0.5,
              margin: 0,
              marginBottom: 8,
            }}>
              {amount || "0"}
            </p>
            <p style={{
              fontSize: 16,
              fontWeight: 500,
              color: colors.gray1,
              letterSpacing: -0.16,
              margin: 0,
              marginBottom: 28,
            }}>
              {t("pointApplication.confirmMessage")}
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
                  fontFamily: fontFamily,
                }}
                onClick={handleConfirmCancel}
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
                  fontFamily: fontFamily,
                }}
                onClick={handleConfirmSubmit}
              >
                {t("pointApplication.submitBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Info Row ────────────────────────────────────────────────
function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={s.infoRow}>
      <span style={s.infoLabel}>{label}</span>
      <div style={s.infoValue}>{children}</div>
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
    fontFamily: fontFamily,
    zIndex: 120,
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
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 14,
    paddingRight: 15,
    paddingBottom: 24,
    paddingLeft: 15,
  },

  // ── Card ──
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
    boxShadow: cardShadow,
  },

  // ── Card 1: Policy ──
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
    color: colors.black,
    letterSpacing: -0.45,
  },
  statusBadge: {
    ...pillBadgeBase,
    gap: 5,
    letterSpacing: -0.36,
  },

  // ── Balance Row (잔여포인트 카드와 동일) ──
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

  // ── Card Divider ──
  cardDivider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 12,
    marginLeft: 0,
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
    whiteSpace: "nowrap",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.36,
    textAlign: "right",
    lineHeight: 1.6,
  },

  // ── Section Label ──
  sectionLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.45,
    display: "block",
    marginBottom: 14,
  },

  // ── Amount Input ──
  amountInputWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: `1.5px solid ${colors.gray7}`,
    borderRadius: 12,
    backgroundColor: inputBg,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    height: 50,
    marginBottom: 16,
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  amountInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 20,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.5,
    textAlign: "right",
    backgroundColor: "transparent",
    fontFamily: fontFamily,
    paddingTop: 14,
    paddingRight: 0,
    paddingBottom: 14,
    paddingLeft: 0,
    width: "100%",
  },
  amountUnit: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.gray2,
    marginLeft: 6,
  },

  // ── Notice Box (callout) ──
  noticeBox: {
    backgroundColor: colors.primaryLight,
    border: `1px solid #FFCFCC`,
    borderRadius: 12,
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
  },
  noticeIconRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.primary,
    letterSpacing: -0.36,
  },
  noticeList: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    paddingLeft: 0,
  },
  noticeRed: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.primary,
    letterSpacing: -0.36,
    lineHeight: 1.55,
    margin: 0,
  },
  noticeGray: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.36,
    lineHeight: 1.55,
    margin: 0,
  },

  // ── Reason ──
  reasonInput: {
    width: "100%",
    minHeight: 90,
    border: `1.5px solid ${colors.gray7}`,
    borderRadius: 12,
    backgroundColor: inputBg,
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    height: 50,
    fontSize: 15,
    fontWeight: 400,
    color: colors.black,
    outline: "none",
    resize: "none",
    fontFamily: fontFamily,
    boxSizing: "border-box",
    lineHeight: 1.6,
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },
  tag: {
    paddingTop: 5,
    paddingRight: 12,
    paddingBottom: 5,
    paddingLeft: 12,
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: -0.36,
    cursor: "pointer",
    border: "1.5px solid",
    fontFamily: fontFamily,
    transition: "all 0.15s ease",
    whiteSpace: "nowrap" as const,
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  // ── Bottom Bar ──
  bottomBar: {
    position: "relative",
    zIndex: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
  },
  bottomBtnRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  preBtn: {
    flex: 1,
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 12,
    border: `1.5px solid #D5D5D5`,
    fontSize: 17,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.15,
    fontFamily: fontFamily,
  },
  nowBtn: {
    flex: 2,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
    fontFamily: fontFamily,
  },

  // ── Point Label Row ──
  pointLabelRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pointLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.45,
  },
  resetBtn: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.36,
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
  },

  // ── Reason Label Row ──
  reasonLabelRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  reasonCount: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.36,
  },

  // ── Notice Box (accent) ──
  noticeIconCircle: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noticeHighlight: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.primary,
    letterSpacing: -0.36,
    lineHeight: 1.55,
    margin: 0,
  },
  noticeItem: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.36,
    lineHeight: 1.55,
    margin: 0,
  },

  // ── Charge Button ──
  chargeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.16,
    cursor: "pointer",
    fontFamily: fontFamily,
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
};