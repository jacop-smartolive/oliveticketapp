/**
 * 공지사항 페이지 — 리스트 + 상세
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";
import { formatRelativeMonths } from "../shared/formatters";

const shadow = "0 1px 6px rgba(0,0,0,0.06)";

// ─── Mock Data ───────────────────────────────────────────────
interface NoticeItem {
  id: number;
  titleKey: string;
  monthsAgo: number;
  bodyKey: string;
}

const NOTICES: NoticeItem[] = [
  { id: 1, titleKey: "notice.mock1Title", monthsAgo: 23, bodyKey: "notice.mock1Body" },
  { id: 2, titleKey: "notice.mock2Title", monthsAgo: 23, bodyKey: "notice.mock2Body" },
  { id: 3, titleKey: "notice.mock3Title", monthsAgo: 23, bodyKey: "notice.mock3Body" },
  { id: 4, titleKey: "notice.mock4Title", monthsAgo: 24, bodyKey: "notice.mock4Body" },
  { id: 5, titleKey: "notice.mock5Title", monthsAgo: 25, bodyKey: "notice.mock5Body" },
  { id: 6, titleKey: "notice.mock6Title", monthsAgo: 25, bodyKey: "notice.mock6Body" },
  { id: 7, titleKey: "notice.mock7Title", monthsAgo: 26, bodyKey: "notice.mock7Body" },
  { id: 8, titleKey: "notice.mock8Title", monthsAgo: 26, bodyKey: "notice.mock8Body" },
  { id: 9, titleKey: "notice.mock9Title", monthsAgo: 27, bodyKey: "notice.mock9Body" },
  { id: 10, titleKey: "notice.mock10Title", monthsAgo: 28, bodyKey: "notice.mock10Body" },
  { id: 11, titleKey: "notice.mock11Title", monthsAgo: 29, bodyKey: "notice.mock11Body" },
  { id: 12, titleKey: "notice.mock12Title", monthsAgo: 30, bodyKey: "notice.mock12Body" },
];

// ─── Component ───────────────────────────────────────────────
interface NoticePageProps {
  onBack: () => void;
}

export default function NoticePage({ onBack }: NoticePageProps) {
  const { t } = useTranslation();
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setFadeIn(true));
  }, [selectedNotice]);

  const handleSelectNotice = (notice: NoticeItem) => {
    setFadeIn(false);
    setTimeout(() => {
      setSelectedNotice(notice);
      setFadeIn(false);
      requestAnimationFrame(() => setFadeIn(true));
    }, 80);
  };

  const handleBackToList = () => {
    setFadeIn(false);
    setTimeout(() => {
      setSelectedNotice(null);
      setFadeIn(false);
      requestAnimationFrame(() => setFadeIn(true));
    }, 80);
  };

  // ── Detail View ──
  if (selectedNotice) {
    return (
      <div style={s.overlay}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.headerInner}>
            <div style={s.headerLeftGroup}>
              <button style={s.backBtn} onClick={handleBackToList}>
                <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
              </button>
              <span style={s.headerTitle}>{t("notice.title")}</span>
            </div>
          </div>
        </div>

        {/* Detail Content */}
        <div style={s.detailScroll}>
          <div
            style={{
              ...s.detailCard,
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <h2 style={s.detailTitle}>{t(selectedNotice.titleKey)}</h2>
            <span style={s.detailDate}>{formatRelativeMonths(selectedNotice.monthsAgo)}</span>
            <div style={s.detailDivider} />
            <p style={s.detailBody}>{t(selectedNotice.bodyKey)}</p>

            {/* 목록으로 버튼 — 카드 안쪽 하단 중앙 */}
            <div style={s.listBtnWrap}>
              <button style={s.listBtn} onClick={handleBackToList}>
                <List size={14} strokeWidth={1.8} />
                {t("common.viewList")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── List View ──
  return (
    <div style={s.overlay}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={onBack}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("notice.title")}</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div style={s.listScroll}>
        <div
          style={{
            ...s.listCard,
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {NOTICES.map((notice, idx) => (
            <div
              key={notice.id}
              style={{
                ...s.noticeItem,
                borderBottom:
                  idx === NOTICES.length - 1
                    ? "none"
                    : `1px solid ${colors.gray5}`,
              }}
              onClick={() => handleSelectNotice(notice)}
            >
              <div style={s.noticeItemLeft}>
                <span style={s.noticeTitle}>{t(notice.titleKey)}</span>
                <span style={s.noticeDate}>{formatRelativeMonths(notice.monthsAgo)}</span>
              </div>
              <ChevronRight
                size={16}
                strokeWidth={2}
                color={colors.gray2}
                style={{ flexShrink: 0 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 210,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.bg,
    fontFamily,
  },

  /* Header — QR결제 동일 */
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
    flexShrink: 0,
  },
  backBtn: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },

  /* ── List ── */
  listScroll: {
    flex: 1,
    overflowY: "auto",
    padding: 16,
    display: "flex",
    flexDirection: "column",
  },
  listCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    boxShadow: shadow,
    overflow: "hidden",
  },
  noticeItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    cursor: "pointer",
    gap: 12,
  },
  noticeItemLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    lineHeight: 1.4,
  },
  noticeDate: {
    fontSize: 13,
    color: colors.gray2,
    fontWeight: 400,
  },

  /* ── Detail ── */
  detailScroll: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 16px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  detailCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    boxShadow: shadow,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  detailTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    lineHeight: 1.45,
    margin: 0,
  },
  detailDate: {
    fontSize: 13,
    color: colors.gray2,
    fontWeight: 400,
    marginTop: -10,
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 0,
    marginRight: -20,
    marginBottom: 0,
    marginLeft: -20,
  },
  detailBody: {
    fontSize: 15,
    fontWeight: 400,
    color: colors.gray1,
    lineHeight: 1.8,
    letterSpacing: -0.1,
    whiteSpace: "pre-line",
    margin: 0,
  },

  /* ── 목록 버튼 (pill outline) ── */
  listBtnWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "9px 20px",
    backgroundColor: "transparent",
    color: "#777",
    fontSize: 13,
    fontWeight: 500,
    fontFamily,
    border: "1px solid #ddd",
    borderRadius: 20,
    cursor: "pointer",
    letterSpacing: -0.15,
  },

  /* ── Header Inner ── */
  headerInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
};