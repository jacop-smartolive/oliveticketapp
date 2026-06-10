/**
 * 포인트 선물 입력 / 결제 페이지 (선물 포인트 보내기)
 * - 인원 선택 후 진입
 * - 받는 사람 + 선물 포인트 입력칸
 * - 결제수단: 아이콘 + 라벨 + 금액 (행 탭 시 상세 페이지)
 * - "선물 보내기" → 컨펌 다이얼로그
 * ※ 공통 디자인 토큰/규칙 준수 (헤더 54·headerTitleBase, primary 버튼, 카드 radius 12)
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { X, RefreshCcw, ChevronRight, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase, radius } from "../shared/tokens";
import { formatAmount } from "../shared/formatters";
import PointIcon from "./PointIcon";
import CorporatePointPage from "./CorporatePointPage";
import type { GiftPerson } from "./GiftRecipientSelectPage";

// Mock 잔액 (숫자)
const CORP_TOTAL = 37000;       // 기업포인트 총액
const CORP_AVAILABLE = 29000;   // 사용가능 포인트
const TOTAL = CORP_AVAILABLE;   // 선물 가능 한도

interface GiftAmountPageProps {
  recipient: GiftPerson;
  onBack: () => void;
  onComplete: () => void;
}

export default function GiftAmountPage({ recipient, onBack, onComplete }: GiftAmountPageProps) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(0);
  const [focusAmount, setFocusAmount] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showCorp, setShowCorp] = useState(false);

  useEffect(() => {
    if (showConfirm) {
      const timer = setTimeout(() => setFadeIn(true), 10);
      return () => clearTimeout(timer);
    } else {
      setFadeIn(false);
    }
  }, [showConfirm]);

  const handleAmountChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    const next = digits ? parseInt(digits, 10) : 0;
    setAmount(Math.min(next, TOTAL));
  };

  const closeConfirm = () => {
    setFadeIn(false);
    setTimeout(() => setShowConfirm(false), 200);
  };

  const submitGift = () => {
    closeConfirm();
    setTimeout(onComplete, 220);
  };

  const canSubmit = amount > 0;

  return (
    <div style={s.screen}>
      {/* Header (공통 규격) */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <span style={s.headerTitle}>{t("gift.sendTitle")}</span>
        </div>
        <button style={s.closeBtn} onClick={onBack} aria-label={t("common.close")}>
          <X size={22} strokeWidth={2.2} color={colors.black} />
        </button>
      </div>

      {/* Scroll */}
      <div style={s.scroll}>
        {/* 받는 사람 */}
        <div style={s.card}>
          <span style={s.cardLabel}>{t("gift.recipientLabel")}</span>
          <div style={s.recipientRow}>
            <div style={s.avatar}>{recipient.name.charAt(0)}</div>
            <div style={s.recipientInfo}>
              <span style={s.recipientName}>{recipient.name}</span>
              <span style={s.recipientDept}>{recipient.dept}</span>
            </div>
          </div>
        </div>

        {/* 선물 포인트 */}
        <div style={s.card}>
          <div style={s.pointHeader}>
            <span style={s.cardLabel}>{t("gift.pointAmountLabel")}</span>
            <button style={s.resetBtn} onClick={() => setAmount(0)}>
              <RefreshCcw size={13} strokeWidth={2.2} color={colors.primary} />
              {t("pointApplication.resetBtn")}
            </button>
          </div>

          {/* 입력칸 (신청금액 스타일 박스) */}
          <div
            style={{
              ...s.amountInputWrap,
              backgroundColor: focusAmount ? colors.white : colors.inputBg,
              borderColor: focusAmount ? colors.gray5 : colors.gray7,
            }}
          >
            <input
              type="text"
              inputMode="numeric"
              value={amount > 0 ? amount.toLocaleString() : ""}
              onChange={(e) => handleAmountChange(e.target.value)}
              onFocus={() => setFocusAmount(true)}
              onBlur={() => setFocusAmount(false)}
              placeholder={t("gift.pointPlaceholder")}
              style={s.amountField}
            />
            <span style={s.amountUnit}>{t("gift.pointUnit")}</span>
          </div>
        </div>

        {/* 결제수단 (간편식 장바구니와 동일 디자인) */}
        <div style={s.card}>
          <span style={s.paymentTitle}>{t("gift.paymentMethod")}</span>
          <div style={s.pointContainer}>
            {/* 기업포인트 */}
            <div style={s.pointItem}>
              <div style={s.pointItemRow}>
                <div style={s.pointItemHeader}>
                  <div style={s.iconWrapper}>
                    <Building2 size={20} strokeWidth={1.5} color={colors.gray1} />
                  </div>
                  <span style={s.pointItemLabel}>{t("gift.corpPoint")}</span>
                </div>
                <div style={s.pointItemAmountWithArrow}>
                  <span style={s.pointItemValue}>{formatAmount(CORP_TOTAL)}</span>
                  <ChevronRight size={16} strokeWidth={2} color="transparent" />
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div style={s.divider} />

            {/* 사용가능 포인트 */}
            <div style={{ ...s.pointItemActive, cursor: "pointer" }} onClick={() => setShowCorp(true)}>
              <div style={s.pointItemRow}>
                <div style={s.pointItemHeader}>
                  <div style={s.iconWrapperActive}>
                    <PointIcon size={20} strokeWidth={1.5} color={colors.primary} />
                  </div>
                  <span style={s.pointItemLabelActive}>{t("gift.corpAvailable")}</span>
                </div>
                <div style={s.pointItemAmountWithArrow}>
                  <span style={s.pointItemValueActive}>{formatAmount(CORP_AVAILABLE)}</span>
                  <ChevronRight size={16} strokeWidth={2} color={colors.primary} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button (공통 규격) */}
      <div style={s.bottomBar}>
        <button
          style={{
            ...s.sendBtn,
            backgroundColor: canSubmit ? colors.primary : colors.gray3,
            cursor: canSubmit ? "pointer" : "default",
          }}
          disabled={!canSubmit}
          onClick={() => setShowConfirm(true)}
        >
          {t("gift.sendBtn")}
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
              {t("gift.confirmTitle")}
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
              {t("gift.confirmMessage", { name: recipient.name, amount: amount.toLocaleString() })}
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
                onClick={submitGift}
              >
                {t("gift.sendBtn")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 기업포인트 페이지 ── */}
      {showCorp && <CorporatePointPage onBack={() => setShowCorp(false)} />}
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
    zIndex: 115,
  },

  // Header (공통 규격)
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    height: 54,
    flexShrink: 0,
    zIndex: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },
  closeBtn: {
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

  // Scroll
  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: spacing.lg,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingBottom: 100,
  },

  // Card
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: "18px 18px",
    display: "flex",
    flexDirection: "column",
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
  },

  // 받는 사람
  recipientRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 14,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.gray6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 700,
    color: colors.gray1,
    flexShrink: 0,
  },
  recipientInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  recipientDept: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },

  // 선물 포인트
  pointHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resetBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.3,
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    fontFamily,
  },
  amountInputWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    border: `1.5px solid ${colors.gray7}`,
    borderRadius: 12,
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 14,
    transition: "border-color 0.2s, background-color 0.2s",
  },
  amountField: {
    flex: 1,
    minWidth: 0,
    width: "100%",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.5,
    textAlign: "right",
    fontFamily,
    padding: 0,
  },
  amountUnit: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.gray2,
    flexShrink: 0,
  },

  // 결제수단 (CartPageOption4와 동일)
  paymentTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
    marginBottom: 16,
  },
  pointContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  pointItem: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 18,
    paddingBottom: 18,
  },
  pointItemActive: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 18,
    paddingBottom: 18,
  },
  pointItemRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  pointItemHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray6,
    borderRadius: 10,
    flexShrink: 0,
  },
  iconWrapperActive: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    flexShrink: 0,
  },
  pointItemLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.16,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  pointItemLabelActive: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.primary,
    letterSpacing: -0.16,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  pointItemAmountWithArrow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  pointItemValue: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.18,
  },
  pointItemValueActive: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.18,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 3,
    marginBottom: 3,
  },

  // Bottom (공통 규격)
  bottomBar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    padding: "16px 16px 24px",
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    flexShrink: 0,
  },
  sendBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    fontFamily,
  },
};
