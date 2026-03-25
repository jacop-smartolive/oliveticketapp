/**
 * 구버전 결제내역 페이지
 */
import type { CSSProperties } from "react";
import { useState } from "react";
import { colors, fontFamily, spacing, radius, pillBadgeBase, headerTitleBase } from "../shared/tokens";

interface PaymentItem {
  date: string;
  store: string;
  amount: string;
  status: "complete" | "cancel";
}

const mockData: PaymentItem[] = [
  { date: "2024.07.19 12:00", store: "CU 판교점", amount: "53,000", status: "complete" },
  { date: "2024.07.15 11:14", store: "식사 | 이마트 본사 A코너", amount: "5,300", status: "cancel" },
  { date: "2024.07.15 11:13", store: "식사 | 이마트 본사 B코너", amount: "5,300", status: "cancel" },
  { date: "2023.07.31 14:15", store: "식사 | 테스트_이마트본사 구내식당 코너A", amount: "5,150", status: "cancel" },
  { date: "2023.07.31 14:14", store: "식사 | 테스트_이마트본사 구내식당 코너A", amount: "5,150", status: "cancel" },
  { date: "2023.07.31 13:53", store: "식사 | 이마트본사 그랜드델리아", amount: "5,150", status: "cancel" },
];

export default function OldVersionPaymentHistoryPage() {
  const [selectedItem, setSelectedItem] = useState<PaymentItem | null>(null);

  return (
    <div style={s.container}>
      {/* ── 헤더 ── */}
      <div style={s.header}>
        <span style={s.headerTitle}>결제내역</span>
      </div>

      {/* ── 탭 ── */}
      <div style={s.tabBarWrap}>
        <div style={s.tabBar}>
          <button style={s.tabItemActive}>
            결제내역
            <span style={s.tabIndicator} />
          </button>
        </div>
      </div>

      {/* ── 리스트 ── */}
      <div style={s.scroll}>
        {mockData.map((item, idx) => (
          <div
            key={idx}
            style={{
              ...s.listItem,
              borderTop: idx === 0 ? "none" : `1px solid ${colors.gray5}`,
            }}
            onClick={() => setSelectedItem(item)}
          >
            {/* 상단: 날짜 + 뱃지 */}
            <div style={s.itemTop}>
              <span style={s.itemDate}>{item.date}</span>
              <span style={{
                ...s.badge,
                backgroundColor: item.status === "complete" ? "#F3F4F6" : colors.primaryLight,
                color: item.status === "complete" ? colors.black : colors.primary,
              }}>
                {item.status === "complete" ? "결제완료" : "결제취소"}
              </span>
            </div>
            {/* 하단: 가맹점 + 금액 */}
            <div style={s.itemBottom}>
              <span style={s.itemStore}>{item.store}</span>
              <span style={s.itemAmount}>{item.amount}원</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── 결제 상세 팝업 ── */}
      {selectedItem && (
        <div style={s.popupOverlay} onClick={() => setSelectedItem(null)}>
          <div style={s.popup} onClick={(e) => e.stopPropagation()}>
            {/* 빨간 헤더 */}
            <div style={{
              ...s.popupHeader,
              backgroundColor: selectedItem.status === "complete" ? colors.primary : "#888",
            }}>
              <span style={s.popupHeaderText}>
                {selectedItem.status === "complete" ? "결제완료" : "결제취소"}
              </span>
            </div>

            {/* 본문 */}
            <div style={s.popupBody}>
              {/* 결제유형 + 날짜 */}
              <span style={s.popupDate}>혼자결제 | {selectedItem.date}</span>

              {/* 금액 카드 */}
              <div style={s.popupAmountCard}>
                <span style={s.popupAmount}>{selectedItem.amount}</span>
              </div>

              {/* 가맹점 카드 */}
              <div style={s.popupStoreCard}>
                <span style={s.popupStoreName}>{selectedItem.store}</span>
                <div style={s.popupPaymentNo}>
                  <span style={s.popupPaymentNoText}>결제번호 7775024071900055</span>
                  <button style={s.popupCopyBtn}>복사</button>
                </div>
              </div>

              {/* 점선 구분 */}
              <div style={s.popupDashed} />

              {/* 닫기 버튼 */}
              <button style={s.popupCloseBtn} onClick={() => setSelectedItem(null)}>
                닫기
              </button>
            </div>
          </div>

          {/* 브랜드+결제번호 말풍선 (팝업 바깥) */}
          <div style={s.bubbleWrap}>
            <div style={s.bubbleArrow} />
            <div style={s.bubble}>
              <span style={s.bubbleLine1}>브랜드명 + 점포명</span>
              <span style={s.bubbleLine2}>결제번호(포스 거래번호) 노출</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: colors.white,
    fontFamily,
  },

  /* Header */
  header: {
    display: "flex",
    alignItems: "center",
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    height: 54,
    backgroundColor: colors.white,
    flexShrink: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },

  /* Tab Bar */
  tabBarWrap: {
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray5}`,
    flexShrink: 0,
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: spacing.xl,
  },
  tabItemActive: {
    position: "relative",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: 24,
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap" as const,
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

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
  },

  /* List Item */
  listItem: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    cursor: "pointer",
  },
  itemTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemDate: {
    fontSize: 13,
    fontWeight: 400,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  badge: {
    ...pillBadgeBase,
  },
  itemBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  itemStore: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    flex: 1,
    minWidth: 0,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    flexShrink: 0,
  },

  /* Popup */
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  popup: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
  },
  popupHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
  popupHeaderText: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.2,
  },
  popupBody: {
    padding: "24px 20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  popupDate: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
  },
  popupAmountCard: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px 0",
    border: `1px solid ${colors.gray5}`,
    borderRadius: 12,
  },
  popupAmount: {
    fontSize: 36,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.5,
  },
  popupStoreCard: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: "20px 0",
    backgroundColor: colors.gray7,
    borderRadius: 12,
  },
  popupStoreName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  popupPaymentNo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  popupPaymentNoText: {
    fontSize: 13,
    fontWeight: 400,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  popupCopyBtn: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.gray1,
    backgroundColor: "transparent",
    border: `1px solid ${colors.gray3}`,
    borderRadius: 999,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: "pointer",
    fontFamily,
  },
  popupDashed: {
    width: "100%",
    borderTop: `2px dashed ${colors.gray5}`,
  },
  popupCloseBtn: {
    width: "100%",
    height: 50,
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    cursor: "pointer",
    fontFamily,
  },

  /* 말풍선 */
  bubbleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 4,
  },
  bubbleArrow: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "6px solid #3478F6",
    marginBottom: -1,
  },
  bubble: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: "#3478F6",
    borderRadius: 14,
    boxShadow: "0 2px 8px rgba(52,120,246,0.35)",
  },
  bubbleLine1: {
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: -0.13,
  },
  bubbleLine2: {
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: -0.13,
  },
};
