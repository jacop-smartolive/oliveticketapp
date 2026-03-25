import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, pillBadgeBase, headerTitleBase } from "../shared/tokens";
import { PickupStatus, pickupStatusKey } from "../shared/enums";
import { formatAmount } from "../shared/formatters";

export interface PaymentCompleteItem {
  name: string;
  price: number;
  quantity: number;
  img: string;
  pickupStatus: PickupStatus;
  pickupDateTime: string;
  paymentNumber: string;
}

interface PaymentCompletePageProps {
  totalAmount: number;
  items: PaymentCompleteItem[];
  onClose: () => void;
}

export default function PaymentCompletePage({
  totalAmount,
  items,
  onClose,
}: PaymentCompletePageProps) {
  const [slideIn, setSlideIn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    requestAnimationFrame(() => setSlideIn(true));
  }, []);

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(onClose, 250);
  };

  const now = new Date();
  const orderDateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        ...s.screen,
        transform: slideIn ? "translateX(0)" : "translateX(100%)",
      }}
    >
      {/* ── Header ── */}
      <div style={s.header}>
        <span style={s.headerTitle}>{t("paymentComplete.title")}</span>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scrollArea}>
        {/* ── 결제 금액 영역 ── */}
        <div style={s.amountSection}>
          <p style={s.amountLabel}>{t("paymentComplete.totalPayment")}</p>
          <p style={s.amountValue}>{formatAmount(totalAmount)}</p>
        </div>

        {/* ── 주문 공통정보 ── */}
        <div style={s.summarySection}>
          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>{t("paymentDetail.orderDate")}</span>
            <span style={s.summaryValue}>{orderDateStr}</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>{t("paymentDetail.totalQuantity")}</span>
            <span style={s.summaryValue}>{totalQuantity}{t("cart.itemCount", { count: totalQuantity }).replace(String(totalQuantity), "")}</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>{t("paymentDetail.totalOrderAmount")}</span>
            <span style={{ ...s.summaryValue, fontWeight: 800 }}>
              {formatAmount(totalAmount)}
            </span>
          </div>
        </div>

        {/* ── 구매 리스트 ── */}
        <div style={s.listSection}>
          {items.map((item, idx) => (
            <div key={idx} style={s.itemWrap}>
              {/* ── 아이템 콘텐츠: 왼쪽 텍스트 + 오른쪽 썸네일 ── */}
              <div style={s.itemContent}>
                {/* 왼쪽: 텍스트 정보 */}
                <div style={s.itemInfo}>
                  {/* 태그 row: 간편식 + 픽업상태 */}
                  <div style={s.tagsRow}>
                    <span style={s.categoryTag}>{t("enum.paymentCategory.SIMPLE_MEAL")}</span>
                    <span
                      style={{
                        ...s.pickupBadge,
                        ...(item.pickupStatus === PickupStatus.COMPLETED
                          ? {
                              backgroundColor: "#A3A3A3",
                              color: "#FFFFFF",
                            }
                          : {}),
                      }}
                    >
                      {t(pickupStatusKey[item.pickupStatus])}
                    </span>
                  </div>

                  {/* 메뉴명 */}
                  <p style={s.itemName}>{item.name}</p>

                  {/* 금액 */}
                  <p style={s.itemAmount}>
                    {formatAmount(item.price * item.quantity)}
                  </p>
                </div>

                {/* 오른쪽: 썸네일 */}
                <div style={s.thumbWrap}>
                  <img src={item.img} alt={item.name} style={s.thumbImg} />
                </div>
              </div>

              {/* ── 메타 정보: 결제번호 / 픽업일시 ── */}
              <div style={s.metaSection}>
                <div style={s.metaRow}>
                  <span style={s.metaLabel}>{t("paymentDetail.paymentNumber")}</span>
                  <span style={s.metaValue}>{item.paymentNumber}</span>
                </div>
                <div style={s.metaRow}>
                  <span style={s.metaLabel}>{t("pickupQr.pickupSchedule")}</span>
                  <span style={s.metaValue}>{item.pickupDateTime}</span>
                </div>
                {item.quantity > 1 && (
                  <div style={s.metaRow}>
                    <span style={s.metaLabel}>{t("paymentDetail.totalQuantity")}</span>
                    <span style={s.metaValue}>{item.quantity}{t("cart.itemCount", { count: item.quantity }).replace(String(item.quantity), "")}</span>
                  </div>
                )}
              </div>

              {/* 구분선 */}
              {idx < items.length - 1 && <div style={s.divider} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── 하단 버튼 ── */}
      <div style={s.bottomBar}>
        <button onClick={handleClose} style={s.confirmBtn}>
          {t("common.confirm")}
        </button>
      </div>
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  screen: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    zIndex: 300,
    display: "flex",
    flexDirection: "column",
    fontFamily: fontFamily,
    transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    paddingLeft: 20,
    paddingRight: 12,
    height: 54,
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    zIndex: 10,
    flexShrink: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
  },

  // ── 결제금액 ──
  amountSection: {
    backgroundColor: colors.white,
    padding: "28px 20px 24px",
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    margin: 0,
    marginBottom: 6,
  },
  amountValue: {
    fontSize: 30,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.3,
    margin: 0,
  },

  // ── 주문 공통정보 ──
  summarySection: {
    backgroundColor: colors.white,
    padding: "20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 10,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.15,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.15,
    textAlign: "right" as const,
  },

  // ── 주문 내역 리스트 ──
  listSection: {
    backgroundColor: colors.white,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 16,
    marginTop: 10,
  },

  itemWrap: {
    paddingTop: 20,
  },

  // 아이템 콘텐츠: 왼쪽 텍스트 + 오른쪽 썸네일 (PaymentHistoryPage 패턴)
  itemContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },

  // 태그 row
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
  pickupBadge: {
    ...pillBadgeBase,
    border: "none",
    backgroundColor: "rgba(29,138,255,0.1)",
    color: colors.blue,
  },

  // 메뉴명
  itemName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
    margin: 0,
  },

  // 금액
  itemAmount: {
    fontSize: 17,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.15,
    margin: 0,
  },

  // 썸네일 (PaymentHistoryPage 동일: 70x70, borderRadius 12)
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
    objectFit: "cover" as const,
    display: "block",
  },

  // 메타 정보 (결제번호, 픽업일시)
  metaSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
    paddingTop: 14,
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.44,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.44,
    textAlign: "right" as const,
  },

  // 구분선 (PaymentHistoryPage 동일)
  divider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 20,
    marginLeft: -16,
    marginRight: -16,
  },

  // ── 하단 버튼 ──
  bottomBar: {
    display: "flex",
    gap: 10,
    padding: "12px 20px",
    paddingBottom: 28,
    backgroundColor: colors.white,
    borderTop: `1px solid ${colors.gray5}`,
    flexShrink: 0,
  },
  confirmBtn: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    border: "none",
    backgroundColor: "#EE2B2F",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.17,
    cursor: "pointer",
  },
};