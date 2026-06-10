/**
 * 포인트 허브 페이지
 * - 홈 > 포인트 영역 클릭 시 진입
 * - 기업포인트 / 올리브포인트 카드
 * - 포인트 관리 메뉴: 환불하기 / 선물하기 / 선물 쿠폰 등록하기
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight, RefreshCcw, Gift, Ticket } from "lucide-react";
import svgPaths from "../../imports/svg-apf66xr4az";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import { formatAmountStr } from "../shared/formatters";

interface PointHubPageProps {
  onBack: () => void;
  onCorporatePointClick: () => void;
  onOlivePointClick: () => void;
  onRefundClick?: () => void;
  onGiftClick?: () => void;
}

/* 기업포인트용 커스텀 빌딩 아이콘 (네이비) */
function CorporateBuildingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 빌딩 본체 */}
      <rect x="5" y="3" width="14" height="19" rx="1.2" fill="#3B4F73" />
      {/* 창문 (2열 3행) */}
      <rect x="7.5" y="6" width="3.5" height="2" rx="0.4" fill="#A8C5E5" />
      <rect x="13" y="6" width="3.5" height="2" rx="0.4" fill="#A8C5E5" />
      <rect x="7.5" y="10" width="3.5" height="2" rx="0.4" fill="#A8C5E5" />
      <rect x="13" y="10" width="3.5" height="2" rx="0.4" fill="#A8C5E5" />
      <rect x="7.5" y="14" width="3.5" height="2" rx="0.4" fill="#A8C5E5" />
      <rect x="13" y="14" width="3.5" height="2" rx="0.4" fill="#A8C5E5" />
      {/* 출입구 */}
      <rect x="10.25" y="18" width="3.5" height="4" rx="0.4" fill="#A8C5E5" />
      {/* 바닥 라인 */}
      <rect x="1.5" y="21.5" width="21" height="1" rx="0.5" fill="#2C3E5C" />
    </svg>
  );
}

export default function PointHubPage({ onBack, onCorporatePointClick, onOlivePointClick, onRefundClick, onGiftClick }: PointHubPageProps) {
  const { t } = useTranslation();

  // ── 선물 쿠폰 등록 ──
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponFadeIn, setCouponFadeIn] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [showComplete, setShowComplete] = useState(false);
  const [completeFadeIn, setCompleteFadeIn] = useState(false);
  const chargedAmount = "5,000";

  useEffect(() => {
    if (showCoupon) {
      const timer = setTimeout(() => setCouponFadeIn(true), 10);
      return () => clearTimeout(timer);
    }
    setCouponFadeIn(false);
  }, [showCoupon]);

  useEffect(() => {
    if (showComplete) {
      const timer = setTimeout(() => setCompleteFadeIn(true), 10);
      return () => clearTimeout(timer);
    }
    setCompleteFadeIn(false);
  }, [showComplete]);

  const closeCoupon = () => {
    setCouponFadeIn(false);
    setTimeout(() => {
      setShowCoupon(false);
      setCouponCode("");
    }, 200);
  };

  const submitCoupon = () => {
    if (!couponCode.trim()) return;
    setCouponFadeIn(false);
    setTimeout(() => {
      setShowCoupon(false);
      setCouponCode("");
      setShowComplete(true);
    }, 200);
  };

  const closeComplete = () => {
    setCompleteFadeIn(false);
    setTimeout(() => setShowComplete(false), 200);
  };

  return (
    <div style={s.overlay}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <h1 style={s.headerTitle}>{t("pointHub.title")}</h1>
        </div>
      </div>

      {/* ── Scroll ── */}
      <div style={s.scroll}>
        {/* 기업포인트 카드 */}
        <button style={s.pointCard} onClick={onCorporatePointClick}>
          <div style={{ ...s.pointCardIcon, background: "#E8F0FB" }}>
            <CorporateBuildingIcon />
          </div>
          <div style={s.pointCardLeft}>
            <span style={s.pointCardTitle}>{t("pointHub.corporatePoint")}</span>
            <span style={s.pointCardDesc}>{t("pointHub.corporatePointDesc")}</span>
          </div>
          <div style={s.pointCardRight}>
            <span style={s.pointCardValue}>{formatAmountStr("20,000")}</span>
            <ChevronRight size={18} strokeWidth={2} color={colors.gray2} />
          </div>
        </button>

        {/* 올리브포인트 카드 */}
        <button style={s.pointCard} onClick={onOlivePointClick}>
          <div style={{ ...s.pointCardIcon, background: colors.primaryLight }}>
            <svg viewBox="0 0 466.474 466.337" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 22, height: 22 }}>
              <defs>
                <linearGradient id="oliveLogoGrad" x1="233.237" x2="233.237" y1="0" y2="466.337" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF4048" />
                  <stop offset="0.5" stopColor="#ED1B24" />
                  <stop offset="1" stopColor="#FF4048" />
                </linearGradient>
              </defs>
              <path d={svgPaths.p1734a880} fill="url(#oliveLogoGrad)" />
              <ellipse cx="233.284" cy="233.165" fill="white" rx="147.259" ry="144.845" />
              <path d={svgPaths.pcd2280} fill="#EE2B2F" />
            </svg>
          </div>
          <div style={s.pointCardLeft}>
            <span style={s.pointCardTitle}>{t("pointHub.olivePoint")}</span>
            <span style={s.pointCardDesc}>{t("pointHub.olivePointDesc")}</span>
          </div>
          <div style={s.pointCardRight}>
            <span style={s.pointCardValue}>{formatAmountStr("20,000")}</span>
            <ChevronRight size={18} strokeWidth={2} color={colors.gray2} />
          </div>
        </button>

        {/* 포인트 관리 */}
        <div style={s.managementSection}>
          <div style={s.sectionHeader}>{t("pointHub.management")}</div>

          <div style={s.menuItem} onClick={onRefundClick}>
            <div style={s.menuLeft}>
              <div style={s.menuIcon}><RefreshCcw size={17} strokeWidth={2.4} /></div>
              <span style={s.menuText}>{t("pointHub.refund")}</span>
            </div>
            <ChevronRight size={17} strokeWidth={2} color={colors.gray2} />
          </div>

          <div style={{ ...s.menuItem, borderTop: `1px solid ${colors.border}` }} onClick={onGiftClick}>
            <div style={s.menuLeft}>
              <div style={s.menuIcon}><Gift size={19} strokeWidth={2.4} /></div>
              <span style={s.menuText}>{t("pointHub.gift")}</span>
            </div>
            <ChevronRight size={17} strokeWidth={2} color={colors.gray2} />
          </div>

          <div style={{ ...s.menuItem, borderTop: `1px solid ${colors.border}` }} onClick={() => setShowCoupon(true)}>
            <div style={s.menuLeft}>
              <div style={s.menuIcon}><Ticket size={17} strokeWidth={2.4} /></div>
              <span style={s.menuText}>{t("pointHub.registerGiftCoupon")}</span>
            </div>
            <ChevronRight size={17} strokeWidth={2} color={colors.gray2} />
          </div>
        </div>
      </div>

      {/* ── 선물 쿠폰 등록 팝업 ── */}
      {showCoupon && (
        <div
          style={{ ...s.dialogOverlay, opacity: couponFadeIn ? 1 : 0 }}
          onClick={closeCoupon}
        >
          <div
            style={{
              ...s.dialogCard,
              transform: couponFadeIn ? "scale(1)" : "scale(0.92)",
              opacity: couponFadeIn ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={s.dialogTitle}>{t("gift.couponTitle")}</p>
            <input
              autoFocus
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder={t("gift.couponPlaceholder")}
              style={s.couponInput}
            />
            <div style={s.dialogBtnRow}>
              <button style={s.dialogCancelBtn} onClick={closeCoupon}>{t("common.cancel")}</button>
              <button
                style={{
                  ...s.dialogPrimaryBtn,
                  backgroundColor: couponCode.trim() ? colors.primary : colors.gray3,
                  cursor: couponCode.trim() ? "pointer" : "default",
                }}
                disabled={!couponCode.trim()}
                onClick={submitCoupon}
              >
                {t("gift.couponRegister")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 선물 포인트 충전완료 팝업 ── */}
      {showComplete && (
        <div
          style={{ ...s.dialogOverlay, opacity: completeFadeIn ? 1 : 0 }}
          onClick={closeComplete}
        >
          <div
            style={{
              ...s.dialogCard,
              transform: completeFadeIn ? "scale(1)" : "scale(0.92)",
              opacity: completeFadeIn ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={s.dialogTitle}>{t("gift.couponChargeComplete")}</p>
            <p style={s.chargedAmount}>{formatAmountStr(chargedAmount)}{t("gift.pointUnit")}</p>
            <button style={s.dialogConfirmBtn} onClick={closeComplete}>{t("common.confirm")}</button>
          </div>
        </div>
      )}
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.bg,
    fontFamily,
  },

  /* Header */
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
    margin: 0,
  },

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: 16,
    paddingBottom: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  /* Point Card */
  pointCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingLeft: 20,
    paddingRight: 16,
    paddingTop: 18,
    paddingBottom: 18,
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    fontFamily,
  },
  pointCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: colors.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  pointCardLeft: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  pointCardRight: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  pointCardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  pointCardDesc: {
    fontSize: 13,
    color: colors.gray1,
    fontWeight: 400,
    letterSpacing: -0.2,
  },
  pointCardValue: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.3,
  },

  /* Management Section (My올리브 동일 스타일) */
  managementSection: {
    backgroundColor: colors.white,
    borderRadius: 19,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    overflow: "hidden",
    marginTop: 4,
  },
  sectionHeader: {
    padding: "17px 21px 11px",
    fontSize: 12,
    fontWeight: 600,
    color: colors.gray2,
    letterSpacing: 0.8,
    textTransform: "uppercase" as const,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 21px",
    cursor: "pointer",
  },
  menuLeft: {
    display: "flex",
    alignItems: "center",
    gap: 13,
  },
  menuIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    background: colors.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.gray1,
    flexShrink: 0,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
  },

  /* ── 선물 쿠폰 다이얼로그 (공통 패턴) ── */
  dialogOverlay: {
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
    fontFamily,
  },
  dialogCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: "28px 24px 24px",
    width: "calc(100% - 56px)",
    maxWidth: 320,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s ease, opacity 0.2s ease",
  },
  dialogTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    margin: 0,
    marginBottom: 20,
    textAlign: "center",
  },
  couponInput: {
    width: "100%",
    height: 48,
    border: `1.5px solid ${colors.gray7}`,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 15,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
    outline: "none",
    fontFamily,
    boxSizing: "border-box",
    marginBottom: 16,
  },
  dialogBtnRow: {
    display: "flex",
    width: "100%",
    gap: 10,
  },
  dialogCancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.gray6,
    fontSize: 16,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.16,
    cursor: "pointer",
    fontFamily,
  },
  dialogPrimaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    border: "none",
    fontSize: 16,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.16,
    fontFamily,
  },
  chargedAmount: {
    fontSize: 28,
    fontWeight: 800,
    color: colors.primary,
    letterSpacing: -0.5,
    margin: 0,
    marginBottom: 24,
    textAlign: "center",
  },
  dialogConfirmBtn: {
    width: "100%",
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
  },
};
