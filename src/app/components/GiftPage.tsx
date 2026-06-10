/**
 * 포인트 선물하기 페이지
 * - 포인트 허브 > 포인트 관리 > 올리브포인트 선물하기 진입
 * - 탭: 전체 / 보냄 / 받음
 * - 리스트: 일시, 보낸/받은 사람, 보냄·받음 뱃지, 금액
 * - 하단 고정 "포인트 선물" → 인원 선택 → 포인트 입력
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase, radius, pillBadgeBase } from "../shared/tokens";
import { formatAmountStr } from "../shared/formatters";
import { showSuccessToast } from "../shared/toast";
import GiftRecipientSelectPage from "./GiftRecipientSelectPage";
import type { GiftPerson } from "./GiftRecipientSelectPage";
import GiftAmountPage from "./GiftAmountPage";

type GiftType = "sent" | "received";

interface GiftRecord {
  id: number;
  date: string;
  name: string;
  amount: string;
  type: GiftType;
}

const mockGifts: GiftRecord[] = [
  { id: 1, date: "3월 5일 (화) 17:00", name: "홍길동", amount: "7,000", type: "sent" },
  { id: 2, date: "3월 9일 (화) 17:00", name: "윤서아", amount: "7,000", type: "received" },
  { id: 3, date: "3월 9일 (화) 17:00", name: "홍길동", amount: "7,000", type: "sent" },
  { id: 4, date: "2월 5일 (화) 17:00", name: "윤채아", amount: "7,000", type: "received" },
];

type Tab = "all" | GiftType;
const TABS: Tab[] = ["all", "sent", "received"];
const tabLabelKey: Record<Tab, string> = {
  all: "gift.tabAll",
  sent: "gift.tabSent",
  received: "gift.tabReceived",
};

// 보냄 = blue, 받음 = red (메모리 Pill 팔레트 기준)
const badgeConfig: Record<GiftType, { labelKey: string; bg: string; color: string }> = {
  sent: { labelKey: "gift.badgeSent", bg: "rgba(29,138,255,0.1)", color: colors.blue },
  received: { labelKey: "gift.badgeReceived", bg: colors.primaryLight, color: colors.primary },
};

interface GiftPageProps {
  onBack: () => void;
}

export default function GiftPage({ onBack }: GiftPageProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("all");
  const [showRecipient, setShowRecipient] = useState(false);
  const [recipient, setRecipient] = useState<GiftPerson | null>(null);
  const [showAmount, setShowAmount] = useState(false);

  const filtered = tab === "all" ? mockGifts : mockGifts.filter((g) => g.type === tab);

  const handleComplete = () => {
    setShowAmount(false);
    setShowRecipient(false);
    setRecipient(null);
    showSuccessToast(t("gift.sentToast"));
  };

  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>{t("gift.title")}</span>
        </div>
      </div>

      {/* Tabs (filter pills) */}
      <div style={s.filterBar}>
        {TABS.map((tb) => {
          const active = tab === tb;
          return (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              style={{
                ...s.filterPill,
                backgroundColor: active ? colors.black : colors.white,
                color: active ? colors.white : colors.gray2,
                border: active ? "none" : `1px solid ${colors.gray5}`,
              }}
            >
              {t(tabLabelKey[tb])}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div style={s.scroll}>
        {filtered.length === 0 ? (
          <div style={s.emptyWrap}>
            <span style={s.emptyText}>{t("common.noData")}</span>
          </div>
        ) : (
          <div style={s.list}>
            {filtered.map((g) => {
              const cfg = badgeConfig[g.type];
              return (
                <div key={g.id} style={s.card}>
                  <div style={s.cardLeft}>
                    <span style={s.date}>{g.date}</span>
                    <span style={s.name}>{g.name}</span>
                  </div>
                  <div style={s.cardRight}>
                    <span style={{ ...s.badge, backgroundColor: cfg.bg, color: cfg.color }}>
                      {t(cfg.labelKey)}
                    </span>
                    <span style={s.amount}>{formatAmountStr(g.amount)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div style={s.bottomBar}>
        <button style={s.giftBtn} onClick={() => setShowRecipient(true)}>
          {t("gift.giftPointBtn")}
        </button>
      </div>

      {/* 인원 선택 */}
      {showRecipient && (
        <GiftRecipientSelectPage
          onBack={() => setShowRecipient(false)}
          onSelect={(person) => {
            setRecipient(person);
            setShowAmount(true);
          }}
        />
      )}

      {/* 포인트 입력/결제 */}
      {showAmount && recipient && (
        <GiftAmountPage
          recipient={recipient}
          onBack={() => setShowAmount(false)}
          onComplete={handleComplete}
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

  // Filter pills
  filterBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: "14px 15px",
    backgroundColor: colors.bg,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  filterPill: {
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

  // List
  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: "0 15px",
    paddingBottom: 100,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: "18px 16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardLeft: {
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
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.13,
  },
  cardRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },
  badge: {
    ...pillBadgeBase,
  },
  amount: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.14,
  },

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

  bottomBar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    padding: "16px 16px 24px",
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
  },
  giftBtn: {
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
