import { ChevronLeft, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import PickupQrPage from "./PickupQrPage";
import { colors, fontFamily, pillBadgeBase, headerTitleBase } from "../shared/tokens";
import {
  PaymentStatus, PaymentCategory, PickupStatus,
  paymentStatusKey, paymentCategoryKey, pickupStatusKey,
} from "../shared/enums";
import { formatDateTimeWithDay, formatAmountStr } from "../shared/formatters";
import { InfoRow } from "./InfoRow";

// ─── Types ───────────────────────────────────────────────────
export interface PaymentDetailData {
  category: PaymentCategory;
  status: PaymentStatus;
  storeName: string;
  storeNameKey?: string;
  amount: string;
  date: Date;
  img: string;
  /** 상세 정보 — 선택적 확장 */
  dateTime?: string;
  paymentMethod?: string;
  paymentNumber?: string;
  totalOrderAmount?: string;
  corpPoint?: string;
  olivePoint?: string;
  totalPoint?: string;
  /** 간편식 전용 */
  pickupStatus?: PickupStatus;
  pickupDateTime?: Date;
  deadlineDateTime?: Date;
  totalQuantity?: number;
}

interface PaymentDetailPageProps {
  payment: PaymentDetailData;
  onBack: () => void;
  onCancelOrder?: () => void;
}

export default function PaymentDetailPage({
  payment,
  onBack,
  onCancelOrder,
}: PaymentDetailPageProps) {
  const { t } = useTranslation();
  const isCancelled = payment.status === PaymentStatus.CANCELLED;
  const itemTextColor = isCancelled ? colors.gray3 : colors.black;
  const isSimpleMeal = payment.category === PaymentCategory.SIMPLE_MEAL;
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showPickupQr, setShowPickupQr] = useState(false);
  const [isReservationMode, setIsReservationMode] = useState(false);

  // 주문취소 버튼 노출 조건
  const showCancelBtn =
    isSimpleMeal &&
    payment.pickupStatus === PickupStatus.SCHEDULED &&
    !isCancelled;

  // 픽업 QR 버튼 노출 조건: 간편식 && 픽업예정 && 결제취소 아닌 경우
  const showPickupQrBtn =
    isSimpleMeal &&
    payment.pickupStatus === PickupStatus.SCHEDULED &&
    !isCancelled &&
    !!payment.pickupDateTime;

  // 기본값 세팅
  const dateTime = payment.dateTime ?? "2025.03.08 12:30";
  const paymentNumber = payment.paymentNumber ?? "7773023090610785040";
  const totalOrderAmount =
    payment.totalOrderAmount ?? payment.amount ?? "115,000";
  const corpPoint = payment.corpPoint ?? "23,000";
  const olivePoint = payment.olivePoint ?? "1,700";
  const totalPoint = payment.totalPoint ?? "25,000";

  return (
    <div style={s.overlay}>
      {/* ── 상단 바 ── */}
      <div style={s.topBar}>
        <button style={s.backBtn} onClick={onBack}>
          <ChevronLeft size={24} strokeWidth={2.2} color={colors.black} />
        </button>
        <p style={s.topBarTitle}>{t(paymentStatusKey[payment.status])}</p>
      </div>

      {/* ── 스크롤 영역 ── */}
      <div style={s.scrollArea}>
        {/* ── 상태 배너 ── */}
        <div style={s.statusBanner}>
          <p
            style={{
              ...s.statusText,
              color: isCancelled ? colors.primary : colors.black,
            }}
          >
            {t(paymentStatusKey[payment.status])}
          </p>
        </div>

        {/* ── 결제 정보 섹션 ── */}
        <div style={s.infoSection}>
          <InfoRow label={t("paymentDetail.orderDate")} value={dateTime} />
          {isSimpleMeal && payment.deadlineDateTime && (
            <InfoRow label={t("paymentDetail.reservationDeadline")} value={formatDateTimeWithDay(payment.deadlineDateTime)} />
          )}
          <InfoRow label={t("paymentDetail.paymentNumber")} value={paymentNumber} />
        </div>

        {/* ── 메뉴 아이템 섹션 ── */}
        <div style={s.menuSection}>
          <div style={s.menuContent}>
            {/* 왼쪽: 태그 + 상점명 + 금액 */}
            <div style={s.menuInfo}>
              <div style={s.tagsRow}>
                <span style={s.categoryTag}>{t(paymentCategoryKey[payment.category])}</span>
                <span
                  style={{
                    ...s.statusTag,
                    ...(isCancelled
                      ? { backgroundColor: "#FFF0F1", color: colors.primary }
                      : {}),
                  }}
                >
                  {t(paymentStatusKey[payment.status])}
                </span>
              </div>
              <p style={{ ...s.storeName, color: itemTextColor }}>
                {payment.storeNameKey ? t(payment.storeNameKey) : payment.storeName}
              </p>
              {/* 간편식: 픽업상태 pill + 금액 / 구내식당: 금액만 */}
              {isSimpleMeal && payment.pickupStatus ? (
                <div style={s.amountRow}>
                  <span
                    style={{
                      ...s.pickupBadge,
                      ...(payment.pickupStatus === PickupStatus.COMPLETED
                        ? {
                            backgroundColor: "#A3A3A3",
                            color: "#FFFFFF",
                          }
                        : payment.pickupStatus === PickupStatus.UNCLAIMED
                        ? {
                            backgroundColor: "#FFF0F1",
                            color: colors.primary,
                          }
                        : {}),
                    }}
                  >
                    {t(pickupStatusKey[payment.pickupStatus])}
                  </span>
                  <p style={{ ...s.amount, color: itemTextColor, margin: 0 }}>
                    {formatAmountStr(payment.amount)}
                  </p>
                </div>
              ) : (
                <p style={{ ...s.amount, color: itemTextColor }}>
                  {formatAmountStr(payment.amount)}
                </p>
              )}
            </div>

            {/* 오른쪽: 썸네일 */}
            <div style={s.thumbWrap}>
              <img
                src={payment.img}
                alt={payment.storeName}
                style={s.thumbImg}
              />
            </div>
          </div>
        </div>

        {/* ── 픽업 QR 버튼 카드 (간편식 && 픽업예정) ── */}
        {showPickupQrBtn && (
          <>
            <button style={s.pickupQrCard} onClick={() => setShowPickupQr(true)}>
              {/* 왼쪽: 아이콘 + 픽업 일시 */}
              <div style={s.pickupQrLeft}>
                <div style={s.pickupQrIconBox}>
                  <Clock size={17} strokeWidth={2.2} color={colors.gray2} />
                </div>
                <div style={s.pickupQrTextBlock}>
                  <span style={s.pickupQrDateTime}>
                    {formatDateTimeWithDay(payment.pickupDateTime)}
                  </span>
                </div>
              </div>

              {/* 오른쪽: QR 버튼 */}
              <div style={s.pickupQrRightBtn}>
                <span style={s.pickupQrRightText}>
                  {isReservationMode
                    ? t("paymentDetail.viewReservation")
                    : t("paymentDetail.viewPickupQr")}
                </span>
              </div>
            </button>

            {/* ── 말풍선: QR 체크인이 아닌 케이스 보기 (클릭 시 예약확인 모드로 전환) ── */}
            {!isReservationMode && (
              <div style={s.speechBubbleWrap}>
                <div style={s.speechBubbleTail} />
                <button style={s.speechBubble} onClick={() => setIsReservationMode(true)}>
                  <span style={s.speechBubbleText}>
                    {t("paymentDetail.viewNonQrCases")}
                  </span>
                </button>
              </div>
            )}
          </>
        )}

        {/* ── 총 수량 + 총 주문금액 ── */}
        <div style={s.totalSection}>
          {isSimpleMeal && (
            <div style={s.totalRow}>
              <p style={s.totalQtyLabel}>{t("paymentDetail.totalQuantity")}</p>
              <p style={s.totalQtyValue}>{payment.totalQuantity ?? 1}</p>
            </div>
          )}
          <div style={s.totalRow}>
            <p style={s.totalLabel}>{t("paymentDetail.totalOrderAmount")}</p>
            <p style={s.totalValue}>{formatAmountStr(totalOrderAmount)}</p>
          </div>
        </div>

        {/* ── 회색 ���경 영역: 결제 포인트 ── */}
        <div style={{
          ...s.pointBg,
          paddingBottom: showCancelBtn ? 90 : 0,
        }}>
          <div style={s.pointSection}>
            <p style={s.pointTitle}>
              {isCancelled ? t("paymentDetail.refundPoint") : t("paymentDetail.paymentPoint")}
            </p>
            <PointRow label={t("paymentDetail.corpPoint")} value={corpPoint} />
            <PointRow label={t("paymentDetail.olivePoint")} value={olivePoint} />
            <div style={s.pointDivider} />
            <PointRow
              label={isCancelled ? t("paymentDetail.totalRefundPoint") : t("paymentDetail.totalPaymentPoint")}
              value={totalPoint}
            />
          </div>
        </div>
      </div>

      {/* ── 하단 고정 주문취소 버튼 (간편식 && 픽업예정 && 취소 아닌 경우) ── */}
      {showCancelBtn && (
        <div style={s.bottomBar}>
          <button style={s.cancelBtn} onClick={() => setShowCancelConfirm(true)}>
            <span style={s.cancelBtnText}>{t("paymentDetail.cancelOrder")}</span>
          </button>
        </div>
      )}

      {/* ── 주문취소 컨펌 다이얼로그 ── */}
      {showCancelConfirm && (
        <CancelConfirmDialog
          onCancel={() => setShowCancelConfirm(false)}
          onConfirm={() => {
            setShowCancelConfirm(false);
            onCancelOrder?.();
          }}
        />
      )}

      {/* ── 픽업 QR 코드 다이얼로그 ── */}
      {showPickupQr && (
        <PickupQrPage
          menuName={payment.storeNameKey ? t(payment.storeNameKey) : payment.storeName}
          menuImg={payment.img}
          price={payment.amount}
          pickupStatus={payment.pickupStatus}
          pickupDateTime={payment.pickupDateTime}
          deadlineDateTime={payment.deadlineDateTime}
          hideQr={isReservationMode}
          onBack={() => setShowPickupQr(false)}
          onCancel={() => {
            setShowPickupQr(false);
            setShowCancelConfirm(true);
          }}
        />
      )}
    </div>
  );
}

// ── Sub Components ─────────────────────────────────────────

function PointRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={s.pointRow}>
      <p style={s.pointLabel}>{label}</p>
      <p style={s.pointValue}>{formatAmountStr(value)}</p>
    </div>
  );
}

// ─── 주문취소 컨펌 다이얼로그 ─────────────────────────────────
function CancelConfirmDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { t } = useTranslation();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setFadeIn(true));
  }, []);

  const handleCancel = () => {
    setFadeIn(false);
    setTimeout(onCancel, 200);
  };

  const handleConfirm = () => {
    setFadeIn(false);
    setTimeout(onConfirm, 200);
  };

  return (
    <div
      style={{
        ...confirmStyles.overlay,
        opacity: fadeIn ? 1 : 0,
      }}
      onClick={handleCancel}
    >
      <div
        style={{
          ...confirmStyles.dialog,
          transform: fadeIn ? "scale(1)" : "scale(0.92)",
          opacity: fadeIn ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={confirmStyles.title}>{t("paymentDetail.cancelConfirmTitle")}</p>
        <p style={confirmStyles.message}>{t("paymentDetail.cancelConfirmMessage")}</p>
        <div style={confirmStyles.btnRow}>
          <button style={confirmStyles.cancelBtn} onClick={handleCancel}>
            {t("paymentDetail.cancelConfirmNo")}
          </button>
          <button style={confirmStyles.confirmBtn} onClick={handleConfirm}>
            {t("paymentDetail.cancelConfirmYes")}
          </button>
        </div>
      </div>
    </div>
  );
}

const confirmStyles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(25,26,28,0.5)",
    zIndex: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s ease",
    fontFamily,
  },
  dialog: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingTop: 36,
    paddingRight: 28,
    paddingBottom: 24,
    paddingLeft: 28,
    width: "calc(100% - 56px)",
    maxWidth: 340,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    transition: "transform 0.2s ease, opacity 0.2s ease",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.18,
    margin: 0,
  },
  message: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.gray1,
    letterSpacing: -0.14,
    margin: 0,
    marginBottom: 10,
  },
  btnRow: {
    display: "flex",
    gap: 10,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    height: 46,
    border: "none",
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.15,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  confirmBtn: {
    flex: 1,
    height: 46,
    border: "none",
    borderRadius: 10,
    backgroundColor: colors.primary,
    fontSize: 15,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  // ⚠️ Flutter-05: position:absolute overlay → Navigator.push full-screen route
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
    zIndex: 200,
  },

  /* ── 상단 바 ── */
  // ⚠️ Flutter-11: boxShadow → BoxDecoration(boxShadow: [...])
  topBar: {
    display: "flex",
    alignItems: "center",
    height: 54,
    backgroundColor: colors.white,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    position: "relative",
    zIndex: 10,
    flexShrink: 0,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "transparent",
    border: "none",
    paddingLeft: 10,
  },
  topBarTitle: {
    ...headerTitleBase,
    color: colors.black,
    margin: 0,
    marginLeft: 2,
  },

  /* ── 스크롤 영역 ── */
  scrollArea: {
    flex: 1,
    overflowY: "auto",
  },

  /* ── 상태 배너 ── */
  statusBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 64,
    backgroundColor: colors.bg,
  },
  statusText: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.15,
    margin: 0,
  },

  /* ── 구분선 ── */
  divider: {
    height: 1,
    minHeight: 1,
    backgroundColor: colors.gray5,
    flexShrink: 0,
    marginLeft: 15,
    marginRight: 15,
  },

  /* ── 결제 정보 섹션 ── */
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: 17,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 29,
    paddingBottom: 29,
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray5}`,
  },

  /* ── 메뉴 아이템 ── */
  menuSection: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 28,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderBottom: "none",
  },
  menuContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  menuInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flex: 1,
  },
  tagsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  categoryTag: {
    ...pillBadgeBase,
    backgroundColor: "#F3F4F6",
    color: colors.black,
  },
  statusTag: {
    ...pillBadgeBase,
    backgroundColor: colors.bg,
    color: colors.black,
  },
  storeName: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.16,
    margin: 0,
  },
  amount: {
    fontSize: 17,
    fontWeight: 800,
    letterSpacing: -0.15,
    margin: 0,
  },
  amountRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  pickupBadge: {
    ...pillBadgeBase,
    backgroundColor: "rgba(29,138,255,0.1)",
    border: "none",
    color: "#1D8AFF",
  },
  // ⚠️ Flutter-10: borderRadius 공통 12
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

  /* ── 픽업 QR 버튼 카드 ── */
  pickupQrCard: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 0,
    marginBottom: 16,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: "transparent",
    border: `1.5px solid ${colors.gray5}`,
    borderRadius: 12,
    cursor: "pointer",
    width: "calc(100% - 30px)",
    textAlign: "left" as const,
  },
  pickupQrLeft: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  pickupQrIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.gray6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  pickupQrTextBlock: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 3,
    minWidth: 0,
    flex: 1,
    justifyContent: "center",
  },
  pickupQrDateTime: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  pickupQrRightBtn: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    flexShrink: 0,
    marginLeft: 10,
  },
  pickupQrRightText: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.2,
    whiteSpace: "nowrap" as const,
  },

  /* ── 말풍선: QR 체크인이 아닌 케이스 보기 ── */
  speechBubbleWrap: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginTop: 0,
    marginBottom: 16,
    marginLeft: 15,
    marginRight: 15,
  },
  speechBubbleTail: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "6px solid #3478F6",
    marginBottom: -1,
  },
  speechBubble: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 14,
    height: 32,
    backgroundColor: "#3478F6",
    borderRadius: 100,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(52,120,246,0.35)",
  },
  speechBubbleText: {
    fontSize: 12,
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: -0.12,
    whiteSpace: "nowrap" as const,
  },

  /* ── 총 주문금액 ── */
  totalSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 28,
    backgroundColor: colors.white,
    borderTop: `1px solid ${colors.gray5}`,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalQtyLabel: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
  },
  totalQtyValue: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
    textAlign: "right",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.17,
    margin: 0,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.19,
    margin: 0,
    textAlign: "right",
  },

  /* ── 결제 포인트 (회색 배경) ── */
  pointBg: {
    backgroundColor: colors.bg,
    flex: 1,
    minHeight: 200,
  },
  pointSection: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 40,
    paddingBottom: 40,
  },
  pointTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
  },
  pointRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointLabel: {
    fontSize: 15,
    fontWeight: 400,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
  },
  pointValue: {
    fontSize: 15,
    fontWeight: 400,
    color: colors.black,
    letterSpacing: -0.13,
    margin: 0,
    textAlign: "right",
  },
  pointDivider: {
    height: 1,
    backgroundColor: colors.gray5,
  },

  /* ── 하단 고정 바 ── */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
  cancelBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    backgroundColor: "#FFF0F1",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
  },
  cancelBtnText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.15,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};