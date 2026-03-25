/**
 * 예약 확인 — 간편식 결제내역 상세에서 메뉴 클릭 시 노출
 * SimpleMealDetailPage 디자인 구조 동일 적용
 */
import { useState, useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Calendar, Flag, Info } from "lucide-react";
import { colors, fontFamily } from "../shared/tokens";
import { pillBadgeBase, headerTitleBase } from "../shared/tokens";
import { PickupStatus, pickupStatusKey } from "../shared/enums";
import { formatDateTimeWithDay } from "../shared/formatters";
import { InfoRow } from "./InfoRow";
import qrSvgPaths from "../../imports/svg-xaybx19wq5";

// ─── Types ───────────────────────────────────────────────────
interface PickupQrPageProps {
  menuName: string;
  menuImg: string;
  price: string;
  pickupStatus?: PickupStatus;
  pickupDateTime?: Date;
  deadlineDateTime?: Date;
  onBack: () => void;
  onCancel?: () => void;
  /** true 이면 결제 QR 카드 숨김 (예약확인 모드) */
  hideQr?: boolean;
}

export default function PickupQrPage({
  menuName,
  menuImg,
  price,
  pickupStatus,
  pickupDateTime,
  deadlineDateTime,
  onBack,
  onCancel,
  hideQr = false,
}: PickupQrPageProps) {
  const { t } = useTranslation();
  const showCancel = pickupStatus === PickupStatus.SCHEDULED;
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => setScrolled(el.scrollTop > 0);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const originInfo = [
    t("mock.originDisclaimer"),
    t("mock.originPork"),
    t("mock.originChicken"),
    t("mock.originSoy"),
    t("mock.originSquid"),
    t("mock.originKimchi"),
    t("mock.originGeotjeori"),
  ];

  return (
    <div style={s.overlay}>
      <style>{keyframes}</style>

      {/* ── 상단 헤더 바 ── */}
      <div style={{
        ...s.topBar,
        boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.06)" : "none",
      }}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.topTitle}>{t("pickupQr.title")}</span>
          </div>
        </div>
      </div>

      {/* ── 헤더 / 메뉴바 구분선 ── */}
      {!scrolled && <div style={s.headerDivider} />}

      <div style={s.scroll} ref={scrollRef}>
        {/* ── 메뉴 정보 바 (썸네일 + 정보 + 가격) ── */}
        <div style={s.menuBar}>
          <img src={menuImg} alt={menuName} style={s.thumb} />
          <div style={s.menuInfo}>
            <span style={s.menuBadge}>{t("pickupQr.simpleMeal")}</span>
            <span style={s.menuName}>{menuName}</span>
          </div>
          <div style={s.priceArea}>
            {pickupStatus && (
              <span
                style={{
                  ...s.statusBadge,
                  ...(pickupStatus === PickupStatus.COMPLETED
                    ? { backgroundColor: "#A3A3A3", color: "#FFFFFF" }
                    : {}),
                }}
              >
                {pickupStatus ? t(pickupStatusKey[pickupStatus]) : ""}
              </span>
            )}
          </div>
        </div>

        {/* ── 정보 카드들 ── */}
        <div style={s.cardArea}>
          {/* 결제 QR — hideQr=true 이면 숨김 */}
          {!hideQr && (
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div style={{ width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 19.9061 16.5884"
                    style={{ width: "100%", height: "100%", display: "block" }}
                  >
                    <g>
                      <path d={qrSvgPaths.p17c1c880} fill={colors.gray2} />
                      <path d={qrSvgPaths.p2b566c80} fill={colors.gray2} />
                      <path d={qrSvgPaths.p3f7ac380} fill={colors.gray2} />
                      <path d={qrSvgPaths.p3c20900} fill={colors.gray2} />
                      <path d={qrSvgPaths.p458eb80} fill={colors.gray2} />
                      <path d={qrSvgPaths.p3b73e980} fill={colors.gray2} />
                      <path d={qrSvgPaths.p384a4030} fill={colors.gray2} />
                      <path d={qrSvgPaths.p2c096b80} fill={colors.gray2} />
                    </g>
                  </svg>
                </div>
                <span style={s.cardHeaderText}>{t("pickupQr.paymentQr")}</span>
              </div>
              <div style={s.divider} />
              <div style={s.qrContent}>
                <div style={s.qrBox}>
                  {/* QR 코드 시각 표현 */}
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    {/* Position Detection Patterns */}
                    <rect x="4" y="4" width="36" height="36" rx="4" stroke="#191A1C" strokeWidth="4" fill="none" />
                    <rect x="12" y="12" width="20" height="20" rx="2" fill="#191A1C" />
                    <rect x="100" y="4" width="36" height="36" rx="4" stroke="#191A1C" strokeWidth="4" fill="none" />
                    <rect x="108" y="12" width="20" height="20" rx="2" fill="#191A1C" />
                    <rect x="4" y="100" width="36" height="36" rx="4" stroke="#191A1C" strokeWidth="4" fill="none" />
                    <rect x="12" y="108" width="20" height="20" rx="2" fill="#191A1C" />
                    {/* Data modules (simplified pattern) */}
                    {[
                      [48,8],[56,8],[64,8],[48,16],[64,16],[48,24],[56,24],[64,24],[72,24],[80,24],[88,24],
                      [8,48],[16,48],[24,48],[48,48],[56,48],[64,48],[72,48],[80,48],[88,48],[104,48],[112,48],[120,48],[128,48],
                      [8,56],[24,56],[48,56],[72,56],[88,56],[104,56],[128,56],
                      [8,64],[16,64],[24,64],[48,64],[56,64],[64,64],[72,64],[80,64],[88,64],[104,64],[112,64],[120,64],[128,64],
                      [48,72],[64,72],[80,72],[88,72],
                      [48,80],[56,80],[72,80],[88,80],
                      [48,88],[64,88],[72,88],[80,88],[88,88],
                      [48,96],[56,96],[64,96],[72,96],[88,96],
                      [104,100],[112,100],[120,100],[128,100],
                      [104,108],[128,108],
                      [104,116],[112,116],[120,116],[128,116],
                      [104,124],[128,124],
                      [104,132],[112,132],[120,132],[128,132],
                    ].map(([x, y], i) => (
                      <rect key={i} x={x} y={y} width="6" height="6" rx="1" fill="#191A1C" />
                    ))}
                  </svg>
                </div>
                <p style={s.qrGuide}>{t("pickupQr.qrScanGuide")}</p>
              </div>
            </div>
          )}

          {/* 예약 정보 */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <Calendar size={16} strokeWidth={2.2} color={colors.gray2} />
              <span style={s.cardHeaderText}>{t("pickupQr.reservationInfo")}</span>
            </div>
            <div style={s.divider} />
            {pickupDateTime && (
              <InfoRow label={t("pickupQr.pickupSchedule")} value={formatDateTimeWithDay(pickupDateTime)} />
            )}
            <InfoRow label={t("pickupQr.paymentAmount")} value={price} />
          </div>

          {/* 원산지 정보 */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <Flag size={16} strokeWidth={2.2} color={colors.gray2} />
              <span style={s.cardHeaderText}>{t("pickupQr.originInfo")}</span>
            </div>
            <div style={s.divider} />
            <div style={s.originBox}>
              {originInfo.map((line, i) => (
                <p
                  key={i}
                  style={{
                    ...s.originLine,
                    color: i === 0 ? colors.primary : colors.gray1,
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* 안내사항 */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <Info size={16} strokeWidth={2.2} color={colors.gray2} />
              <span style={s.cardHeaderText}>{t("pickupQr.noticeTitle")}</span>
            </div>
            <div style={s.divider} />
            <div style={s.originBox}>
              <p style={s.originLine}>{t("pickupQr.noticeCancel")}</p>
              <p style={s.originLine}>{t("pickupQr.noticePickup")}</p>
              <p style={s.originLine}>{t("pickupQr.noticeNoRefund")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Keyframes ───────────────────────────────────────────────
const keyframes = `
@keyframes slideUpPickupQr {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
`;

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.bg,
    fontFamily,
    zIndex: 250,
    animation: "slideUpPickupQr 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
  },

  /* ── Scroll ── */
  scroll: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },

  /* ── Top Bar ── */
  topBar: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    paddingLeft: 12,
    paddingRight: 16,
    height: 54,
    justifyContent: "center",
    zIndex: 10,
    transition: "box-shadow 0.2s ease",
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
  },
  topTitle: {
    ...headerTitleBase,
    color: colors.black,
  },

  /* ── Header Divider ── */
  headerDivider: {
    height: 1,
    backgroundColor: colors.gray5,
    flexShrink: 0,
  },

  /* ── Menu Bar ── */
  menuBar: {
    display: "flex",
    alignItems: "center",
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    backgroundColor: colors.white,
    gap: 14,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  thumb: {
    width: 60,
    height: 60,
    objectFit: "cover",
    borderRadius: 10,
    flexShrink: 0,
  },
  menuInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  menuBadge: {
    ...pillBadgeBase,
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    color: colors.black,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.4,
    margin: 0,
    lineHeight: "1.3",
  },
  menuMeta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  menuMetaText: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.3,
  },
  priceArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
    flexShrink: 0,
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 1,
  },
  priceValue: {
    fontSize: 19,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.5,
  },
  priceUnit: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.3,
  },
  statusBadge: {
    ...pillBadgeBase,
    border: "none",
    backgroundColor: "rgba(29,138,255,0.1)",
    color: "#1D8AFF",
    marginRight: 6,
  },

  /* ── Card Area ── */
  cardArea: {
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingTop: 16,
    paddingRight: 18,
    paddingBottom: 16,
    paddingLeft: 18,
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray6,
    marginTop: 12,
    marginRight: 0,
    marginBottom: 12,
    marginLeft: 0,
  },

  /* ── QR Section ── */
  qrIconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qrContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  qrBox: {
    width: 160,
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    border: `1px solid ${colors.gray5}`,
  },
  qrGuide: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.3,
    margin: 0,
  },

  /* ── Origin Info ── */
  originBox: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  originLine: {
    fontSize: 13.5,
    fontWeight: 400,
    color: colors.gray1,
    letterSpacing: -0.4,
    lineHeight: "1.6",
    margin: 0,
  },

  /* ── Bottom Bar ── */
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
    background: "transparent",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
  },
  cancelBtnText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.15,
  },
};