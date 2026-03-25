/**
 * 결제내역 — 하단 네비게이션 "결제내역" 탭 페이지
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, pillBadgeBase, headerTitleBase } from "../shared/tokens";
import {
  PaymentCategory, PaymentStatus, FilterTab, PickupStatus,
  paymentCategoryKey, paymentStatusKey, filterTabKey, pickupStatusKey,
} from "../shared/enums";
import { formatDateTimeWithDay, formatAmountStr } from "../shared/formatters";

// ─── Types ───────────────────────────────────────────────────
export interface PaymentItem {
  id: number;
  category: PaymentCategory;
  status: PaymentStatus;
  storeName: string;
  storeNameKey?: string;
  amount: string;
  date: Date;
  img: string;
  pickupStatus?: PickupStatus;
  pickupDateTime?: Date;
  deadlineDateTime?: Date;
  totalQuantity?: number;
}

// ─── Mock Data ───
const PAYMENTS: PaymentItem[] = [
  {
    id: 1,
    category: PaymentCategory.CAFETERIA,
    status: PaymentStatus.PAID,
    storeName: "신세계 구내식당",
    storeNameKey: "mock.storeName",
    amount: "7,000",
    date: new Date(2025, 2, 8, 12, 30),
    img: "https://images.unsplash.com/photo-1719787770653-a4fefd859db1?w=200",
  },
  {
    id: 2,
    category: PaymentCategory.CAFETERIA,
    status: PaymentStatus.CANCELLED,
    storeName: "신세계 구내식당",
    storeNameKey: "mock.storeName",
    amount: "6,500",
    date: new Date(2025, 2, 7, 11, 45),
    img: "https://images.unsplash.com/photo-1667971286475-8ae561e26a9f?w=200",
  },
  {
    id: 3,
    category: PaymentCategory.SIMPLE_MEAL,
    status: PaymentStatus.PAID,
    storeName: "햄에그 샌드위치",
    storeNameKey: "mock.hamEggSandwich",
    amount: "4,500",
    date: new Date(2025, 2, 7, 8, 20),
    img: "https://images.unsplash.com/photo-1757961048411-73703e333d25?w=200",
    pickupStatus: PickupStatus.SCHEDULED,
    pickupDateTime: new Date(2025, 2, 17, 20, 0),
    deadlineDateTime: new Date(2025, 2, 4, 12, 0),
    totalQuantity: 1,
  },
  {
    id: 7,
    category: PaymentCategory.SIMPLE_MEAL,
    status: PaymentStatus.CANCELLED,
    storeName: "치킨 샐러드 도시락",
    storeNameKey: "mock.chickenSaladLunchbox",
    amount: "4,500",
    date: new Date(2025, 2, 6, 14, 20),
    img: "https://images.unsplash.com/photo-1735279852005-6a81f0482a49?w=200",
    totalQuantity: 2,
  },
  {
    id: 4,
    category: PaymentCategory.CAFETERIA,
    status: PaymentStatus.PAID,
    storeName: "신세계 구내식당",
    storeNameKey: "mock.storeName",
    amount: "8,500",
    date: new Date(2025, 2, 6, 17, 0),
    img: "https://images.unsplash.com/photo-1725121463846-b23056f190df?w=200",
  },
  {
    id: 5,
    category: PaymentCategory.CAFETERIA,
    status: PaymentStatus.PAID,
    storeName: "신세계 구내식당",
    storeNameKey: "mock.storeName",
    amount: "9,000",
    date: new Date(2025, 2, 5, 12, 10),
    img: "https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200",
  },
  {
    id: 8,
    category: PaymentCategory.SIMPLE_MEAL,
    status: PaymentStatus.CANCELLED,
    storeName: "참치 김밥 세트",
    storeNameKey: "mock.tunaKimbapSet",
    amount: "3,200",
    date: new Date(2025, 2, 4, 15, 30),
    img: "https://images.unsplash.com/photo-1709741123566-4083be97eb35?w=200",
    totalQuantity: 1,
  },
  {
    id: 6,
    category: PaymentCategory.SIMPLE_MEAL,
    status: PaymentStatus.PAID,
    storeName: "참치마요 샌드위치",
    storeNameKey: "mock.tunaMayoSandwich",
    amount: "3,800",
    date: new Date(2025, 2, 4, 8, 5),
    img: "https://images.unsplash.com/photo-1757961048411-73703e333d25?w=200",
    pickupStatus: PickupStatus.COMPLETED,
    pickupDateTime: new Date(2025, 2, 4, 12, 0),
    deadlineDateTime: new Date(2025, 2, 2, 18, 0),
    totalQuantity: 1,
  },
  {
    id: 9,
    category: PaymentCategory.SIMPLE_MEAL,
    status: PaymentStatus.CANCELLED,
    storeName: "비빔밥 도시락",
    storeNameKey: "mock.bibimbapLunchbox",
    amount: "5,000",
    date: new Date(2025, 1, 28, 12, 10),
    img: "https://images.unsplash.com/photo-1744957280662-af6472128abd?w=200",
    totalQuantity: 1,
  },
  {
    id: 10,
    category: PaymentCategory.SIMPLE_MEAL,
    status: PaymentStatus.PAID,
    storeName: "참치 김밥 세트",
    storeNameKey: "mock.tunaKimbapSet",
    amount: "3,200",
    date: new Date(2025, 1, 25, 9, 30),
    img: "https://images.unsplash.com/photo-1709741123566-4083be97eb35?w=200",
    pickupStatus: PickupStatus.UNCLAIMED,
    pickupDateTime: new Date(2025, 1, 25, 12, 0),
    deadlineDateTime: new Date(2025, 1, 24, 18, 0),
    totalQuantity: 1,
  },
];

// ─── Component ───────────────────────────────────────────────
interface PaymentHistoryPageProps {
  onBack?: () => void;
  onItemClick?: (item: PaymentItem) => void;
}

export default function PaymentHistoryPage({ onBack, onItemClick }: PaymentHistoryPageProps) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterTab>(FilterTab.ALL);

  const filteredPayments =
    activeFilter === FilterTab.ALL
      ? PAYMENTS
      : PAYMENTS.filter((p) => p.category === activeFilter);

  return (
    <div style={s.container}>
      {/* ── Header ── */}
      <div style={s.header}>
        <p style={s.headerTitle}>{t("paymentHistory.title")}</p>

        {/* ── Filter Tabs ── */}
        <div style={s.tabsRow}>
          {([FilterTab.ALL, FilterTab.CAFETERIA, FilterTab.SIMPLE_MEAL] as FilterTab[]).map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  ...s.tabBtn,
                  color: isActive ? colors.black : colors.gray3,
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {t(filterTabKey[tab])}
                {isActive && <span style={s.tabIndicator} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Payment List ── */}
      <div style={s.scrollArea}>
        {filteredPayments.length === 0 ? (
          <div style={s.emptyState}>
            <p style={s.emptyText}>{t("paymentHistory.noPayments")}</p>
          </div>
        ) : (
          filteredPayments.map((item) => (
            <PaymentRow key={item.id} item={item} onItemClick={onItemClick} />
          ))
        )}
      </div>
    </div>
  );
}

// ─── Sub Components ──────────────────────────────────────────

function PaymentRow({ item, onItemClick }: { item: PaymentItem; onItemClick?: (item: PaymentItem) => void }) {
  const { t } = useTranslation();
  const isCancelled = item.status === PaymentStatus.CANCELLED;
  const textColor = isCancelled ? colors.gray3 : colors.black;

  return (
    <div style={s.paymentItem} onClick={() => onItemClick?.(item)}>
      {/* 날짜 */}
      <p style={s.dateText}>{formatDateTimeWithDay(item.date)}</p>

      {/* 결제 정보 */}
      <div style={s.paymentContent}>
        {/* 왼쪽: 태그 + 상점명 + 금액 */}
        <div style={s.paymentInfo}>
          <div style={s.tagsRow}>
            <span style={s.categoryTag}>{t(paymentCategoryKey[item.category])}</span>
            <span
              style={{
                ...s.statusTag,
                ...(isCancelled
                  ? { backgroundColor: "#FFF0F1", color: colors.primary }
                  : {}),
              }}
            >
              {t(paymentStatusKey[item.status])}
            </span>
          </div>
          <p style={{ ...s.storeName, color: textColor }}>{item.storeNameKey ? t(item.storeNameKey) : item.storeName}</p>
          <div style={s.amountRow}>
            {item.pickupStatus && item.pickupStatus !== PickupStatus.UNCLAIMED && (
              <span style={{
                ...s.pickupBadge,
                ...(item.pickupStatus === PickupStatus.COMPLETED
                  ? { backgroundColor: "#A3A3A3", color: "#FFFFFF" }
                  : {}),
              }}>
                {t(pickupStatusKey[item.pickupStatus])}
              </span>
            )}
            <p style={{ ...s.amount, color: textColor }}>{formatAmountStr(item.amount)}</p>
          </div>
        </div>

        {/* 오른쪽: 썸네일 */}
        <div style={s.thumbWrap}>
          <img
            src={item.img}
            alt={item.storeName}
            style={s.thumbImg}
          />
        </div>
      </div>

      {/* 구분선 */}
      <div style={s.divider} />
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
    minHeight: "100%",
  },

  /* ── Header ── */
  header: {
    position: "sticky",
    top: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    zIndex: 10,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
    margin: 0,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  tabsRow: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 16,
    overflowX: "auto" as const,
    scrollbarWidth: "none" as const,
  },
  tabBtn: {
    position: "relative",
    paddingTop: 8,
    paddingBottom: 10,
    marginRight: 24,
    backgroundColor: "transparent",
    border: "none",
    fontSize: 16,
    letterSpacing: -0.6,
    textAlign: "left",
    cursor: "pointer",
    fontFamily,
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

  /* ── Scroll Area ── */
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: colors.white,
  },

  /* ── Payment Item ── */
  paymentItem: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    position: "relative",
  },
  dateText: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.44,
    margin: 0,
    marginBottom: 16,
  },
  paymentContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  paymentInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  tagsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  categoryTag: {
    ...pillBadgeBase,
    backgroundColor: "#F3F4F6",
    color: colors.black,
  },
  statusTag: {
    ...pillBadgeBase,
    backgroundColor: "#F3F4F6",
    color: colors.black,
  },
  storeName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
    margin: 0,
  },
  amountRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pickupBadge: {
    ...pillBadgeBase,
    backgroundColor: "rgba(29,138,255,0.1)",
    border: "none",
    color: "#1D8AFF",
  },
  amount: {
    fontSize: 17,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.15,
    margin: 0,
  },
  thumbWrap: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: "hidden",
    flexShrink: 0,
  },
  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  /* ── Divider ── */
  divider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 20,
  },

  /* ── Empty State ── */
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.3,
  },
};