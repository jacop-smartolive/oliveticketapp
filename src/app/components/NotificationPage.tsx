import { useState, useCallback, useRef } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Check } from "lucide-react";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";
import { showSuccessToast } from "../shared/toast";

// ─── 로컬 컬러 ───────────────────────────────────────────────
const localColors = {
  textRead: "#8E8E93",
  grayLight: "#F3F3F3",
  grayMid: "#C8C8C8",
};

// ─── 카테고리 타입 ────────────────────────────────────────────
type NotifCategory =
  | "cafeteria"
  | "simpleMeal"
  | "cafeteriaCancel"
  | "simpleMealCancel"
  | "inquiry"
  | "notice"
  | "corpPointApply"
  | "corpPointApproved"
  | "corpPointRejected";

interface Notification {
  id: number;
  category: NotifCategory;
  amount?: string;
  timeKey: string;
  timeParams?: Record<string, string | number>;
  initialRead: boolean;
}

// ─── 카테고리 라벨 매핑 ───────────────────────────────────────
function getCategoryLabel(
  category: NotifCategory,
  t: (key: string) => string
): string {
  const map: Record<NotifCategory, string> = {
    cafeteria:        t("notification.cafeteriaPayAlert"),
    simpleMeal:       t("notification.simpleMealAlert"),
    cafeteriaCancel:  t("notification.cafeteriaCancelAlert"),
    simpleMealCancel: t("notification.simpleMealCancelAlert"),
    inquiry:          t("notification.inquiryAnswerAlert"),
    notice:           t("notification.noticeAlert"),
    corpPointApply:   t("notification.corpPointApplyAlert"),
    corpPointApproved:t("notification.corpPointApprovedAlert"),
    corpPointRejected:t("notification.corpPointRejectedAlert"),
  };
  return map[category];
}

// ─── 알림 메시지 매핑 ─────────────────────────────────────────
function getNotifMessage(
  item: Notification,
  t: (key: string, opts?: Record<string, string | number>) => string
): string {
  switch (item.category) {
    case "cafeteria":
      return t("notification.cafeteriaPayMsg", { amount: item.amount ?? "" });
    case "simpleMeal":
      return t("notification.simpleMealMsg", { amount: item.amount ?? "" });
    case "cafeteriaCancel":
      return t("notification.cafeteriaCancelMsg", { amount: item.amount ?? "" });
    case "simpleMealCancel":
      return t("notification.simpleMealCancelMsg", { amount: item.amount ?? "" });
    case "inquiry":
      return t("notification.inquiryAnswerMsg");
    case "notice":
      return t("notification.noticeMsg");
    case "corpPointApply":
      return t("notification.corpPointApplyMsg", { amount: item.amount ?? "" });
    case "corpPointApproved":
      return t("notification.corpPointApprovedMsg", { amount: item.amount ?? "" });
    case "corpPointRejected":
      return t("notification.corpPointRejectedMsg", { amount: item.amount ?? "" });
  }
}

// ─── 더미 데이터 (9건) ────────────────────────────────────────
// 초기 읽음: id 5~9
const INITIAL_READ_IDS = new Set([5, 6, 7, 8, 9]);

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    category: "cafeteria",
    amount: "7,000",
    timeKey: "notification.timeMinAgo",
    timeParams: { min: 5 },
    initialRead: false,
  },
  {
    id: 2,
    category: "cafeteriaCancel",
    amount: "8,000",
    timeKey: "notification.timeHourAgo",
    timeParams: { hour: 2 },
    initialRead: false,
  },
  {
    id: 3,
    category: "simpleMeal",
    amount: "5,500",
    timeKey: "notification.yesterday",
    initialRead: false,
  },
  {
    id: 4,
    category: "simpleMealCancel",
    amount: "4,500",
    timeKey: "notification.timeDayAgo",
    timeParams: { day: 2 },
    initialRead: false,
  },
  {
    id: 5,
    category: "corpPointApply",
    amount: "50,000",
    timeKey: "notification.timeDayAgo",
    timeParams: { day: 4 },
    initialRead: true,
  },
  {
    id: 6,
    category: "corpPointApproved",
    amount: "50,000",
    timeKey: "notification.timeWeekAgo",
    timeParams: { week: 1 },
    initialRead: true,
  },
  {
    id: 7,
    category: "corpPointRejected",
    amount: "30,000",
    timeKey: "notification.timeWeekAgo",
    timeParams: { week: 1 },
    initialRead: true,
  },
  {
    id: 8,
    category: "inquiry",
    timeKey: "notification.timeWeekAgo",
    timeParams: { week: 2 },
    initialRead: true,
  },
  {
    id: 9,
    category: "notice",
    timeKey: "notification.timeWeekAgo",
    timeParams: { week: 2 },
    initialRead: true,
  },
];

// ─── 트랜지션 CSS ─────────────────────────────────────────────
const TRANSITION_CSS = `
  .notif-dot {
    width: 8px; height: 8px; border-radius: 50%;
    flex-shrink: 0; margin-top: 5px;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .notif-dot-unread { background: #EE2B2F; opacity: 1; transform: scale(1); }
  .notif-dot-read   { background: #EE2B2F; opacity: 0; transform: scale(0.4); }
  .notif-dot-placeholder { background: transparent; opacity: 0; }
`;

interface NotificationPageProps {
  onBack: () => void;
  asNavTab?: boolean;
}

export default function NotificationPage({ onBack, asNavTab }: NotificationPageProps) {
  const { t } = useTranslation();
  const [readSet, setReadSet] = useState<Set<number>>(() => new Set(INITIAL_READ_IDS));
  const [allMarked, setAllMarked] = useState(false);
  const staggerRef = useRef(false);

  const markOne = useCallback((id: number) => {
    setReadSet((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleMarkAll = useCallback(() => {
    if (staggerRef.current || allMarked) return;
    staggerRef.current = true;

    const unread = NOTIFICATIONS.filter((n) => !readSet.has(n.id));
    if (unread.length === 0) {
      setAllMarked(true);
      staggerRef.current = false;
      return;
    }

    unread.forEach((item, i) => {
      setTimeout(() => {
        markOne(item.id);
        if (i === unread.length - 1) {
          setAllMarked(true);
          staggerRef.current = false;
          showSuccessToast(t("notification.markAllDone"));
        }
      }, i * 80);
    });
  }, [readSet, allMarked, markOne, t]);

  const hasUnread = NOTIFICATIONS.some((n) => !readSet.has(n.id));

  return (
    <div style={asNavTab ? styles.screenNav : styles.screen}>
      <style>{TRANSITION_CSS}</style>

      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerLeftGroup}>
            <button onClick={onBack} style={styles.backBtn}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={styles.headerTitle}>{t("notification.title")}</span>
          </div>
          <button
            style={{
              ...styles.markAllBtn,
              backgroundColor: !hasUnread ? localColors.grayLight : colors.primary,
            }}
            onClick={handleMarkAll}
          >
            <Check
              size={13}
              strokeWidth={2.5}
              color={!hasUnread ? localColors.grayMid : colors.white}
            />
            <span
              style={{
                ...styles.markAllText,
                color: !hasUnread ? localColors.grayMid : colors.white,
              }}
            >
              {t("notification.markAllBtn")}
            </span>
          </button>
        </div>
      </div>

      {/* ── Notification List ── */}
      <div style={styles.scrollArea}>
        {NOTIFICATIONS.map((item) => {
          const isRead = readSet.has(item.id);
          const textColor = isRead ? localColors.textRead : colors.black;
          const label = getCategoryLabel(item.category, t);
          const message = getNotifMessage(item, t);
          const timeStr = t(item.timeKey, item.timeParams ?? {});

          return (
            <div
              key={item.id}
              style={styles.notificationItem}
              onClick={() => markOne(item.id)}
            >
              {/* 좌측 미읽음 점 */}
              <div
                className={`notif-dot ${
                  item.initialRead
                    ? "notif-dot-placeholder"
                    : isRead
                    ? "notif-dot-read"
                    : "notif-dot-unread"
                }`}
              />

              {/* 텍스트 영역 */}
              <div style={styles.notificationContent}>
                <p style={{ ...styles.notificationText, color: textColor }}>
                  <span style={{ fontWeight: 700, color: textColor }}>
                    [{label}]{" "}
                  </span>
                  <span style={{ fontWeight: 400, color: textColor }}>
                    {message}
                  </span>
                </p>
                <p style={styles.notificationTime}>{timeStr}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const styles: Record<string, CSSProperties> = {
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
  screenNav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.bg,
    fontFamily,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    paddingLeft: 16,
    paddingRight: 16,
    height: 54,
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    zIndex: 10,
    flexShrink: 0,
  },
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
  markAllBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 100,
    border: "none",
    cursor: "pointer",
  },
  markAllText: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: -0.1,
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
  },
  notificationItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottom: `1px solid ${colors.gray6}`,
    backgroundColor: colors.white,
    cursor: "pointer",
  },
  notificationContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  notificationText: {
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 1.5,
    margin: 0,
  },
  notificationTime: {
    fontSize: 13,
    fontWeight: 500,
    color: localColors.textRead,
    margin: 0,
  },
};