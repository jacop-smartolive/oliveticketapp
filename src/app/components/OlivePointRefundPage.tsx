/**
 * 올리브포인트 환불하기 페이지
 * - 올리브포인트 > 잔여포인트/충전·환불 탭 하단 "환불하기" 버튼
 * - 포인트 허브 > 포인트 관리 > 올리브포인트 환불하기
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase, radius, pillBadgeBase } from "../shared/tokens";
import { formatAmountStr } from "../shared/formatters";
import { showSuccessToast } from "../shared/toast";

interface RefundItem {
  id: number;
  date: string;
  title: string;
  amount: string;
}

const mockRefundItems: RefundItem[] = [
  { id: 1, date: "3월 5일 (화) 17:00", title: "중식 - 임직원", amount: "7,000" },
  { id: 2, date: "3월 5일 (화) 17:00", title: "중식 - 임직원", amount: "7,000" },
  { id: 3, date: "3월 5일 (화) 17:00", title: "중식 - 임직원", amount: "7,000" },
];

interface OlivePointRefundPageProps {
  onBack: () => void;
  onRefundItem?: (id: number) => void;
  onRefundComplete?: () => void;
}

export default function OlivePointRefundPage({ onBack, onRefundItem, onRefundComplete }: OlivePointRefundPageProps) {
  const { t } = useTranslation();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (confirmId !== null) {
      const timer = setTimeout(() => setFadeIn(true), 10);
      return () => clearTimeout(timer);
    } else {
      setFadeIn(false);
    }
  }, [confirmId]);

  const closeConfirm = () => {
    setFadeIn(false);
    setTimeout(() => setConfirmId(null), 200);
  };

  const submitRefund = () => {
    const id = confirmId;
    closeConfirm();
    setTimeout(() => {
      if (id !== null) onRefundItem?.(id);
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
          <span style={s.headerTitle}>{t("olivePointRefund.title")}</span>
        </div>
      </div>

      {/* List */}
      <div style={s.scroll}>
        {mockRefundItems.map((item) => (
          <div key={item.id} style={s.card}>
            <div style={s.topRow}>
              <div style={s.leftCol}>
                <span style={s.date}>{item.date}</span>
                <span style={s.title}>{item.title}</span>
              </div>
              <div style={s.rightCol}>
                <span style={s.badge}>{t("olivePointRefund.statusUsed")}</span>
                <span style={s.amount}>{formatAmountStr(item.amount)}</span>
              </div>
            </div>

            <button
              style={s.refundActionBtn}
              onClick={() => setConfirmId(item.id)}
            >
              {t("olivePointRefund.refundPoint")}
            </button>
          </div>
        ))}
      </div>

      {/* ── Confirm Dialog ── */}
      {confirmId !== null && (
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
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: "18px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  date: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.44,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.13,
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },
  badge: {
    ...pillBadgeBase,
    backgroundColor: "#F3F4F6",
    color: colors.black,
  },
  amount: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.14,
  },

  refundActionBtn: {
    width: "100%",
    height: 44,
    borderRadius: radius.full,
    border: "none",
    backgroundColor: colors.gray6,
    color: colors.black,
    fontSize: 15,
    fontWeight: 600,
    fontFamily,
    cursor: "pointer",
    letterSpacing: -0.3,
  },
};
