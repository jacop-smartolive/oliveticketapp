/**
 * 구버전 QR 결제 페이지 — 프랜차이즈 / 구내식당 탭
 */
import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Bell, X } from "lucide-react";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import barcodeImg from "../../assets/barcode.png";
import qrcodeImg from "../../assets/qrcode.png";
import cuLogo from "../../assets/brands/cu.png";
import emart24Logo from "../../assets/brands/emart24.png";
import megacoffeeLogo from "../../assets/brands/megacoffee.png";
import parisbaguetteLogo from "../../assets/brands/parisbaguette.png";
import bonjukLogo from "../../assets/brands/bonjuk.png";
// P 아이콘 (하단 버튼용)


type PaymentTab = "franchise" | "cafeteria";

interface OldVersionQrPaymentPageProps {
  onBack: () => void;
  initialTab?: PaymentTab;
}

export default function OldVersionQrPaymentPage({
  onBack,
  initialTab = "franchise",
}: OldVersionQrPaymentPageProps) {
  const [activeTab, setActiveTab] = useState<PaymentTab>(initialTab);
  const [remainingTime, setRemainingTime] = useState(150); // 2:30 in seconds
  const [corporateChecked, setCorporateChecked] = useState(true);
  const [oliveChecked, setOliveChecked] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showBarcodeFullscreen, setShowBarcodeFullscreen] = useState(false);
  const [showQrFullscreen, setShowQrFullscreen] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isFranchise = activeTab === "franchise";

  // 프랜차이즈에서는 올리브포인트 사용불가
  const oliveDisabled = isFranchise;

  const brands = [
    { name: "CU", logo: cuLogo, width: 33 },
    { name: "MEGA COFFEE", logo: megacoffeeLogo, width: 72 },
    { name: "emart24", logo: emart24Logo, width: 60 },
    { name: "본죽&비빔밥카페", logo: bonjukLogo, width: 80 },
    { name: "PARIS BAGUETTE", logo: parisbaguetteLogo, width: 100 },
  ];

  return (
    <div style={s.overlay}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={onBack}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>결제하기</span>
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div style={s.tabBarWrap}>
        <div style={s.tabBar}>
          {(["franchise", "cafeteria"] as const).map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                style={{
                  ...s.tabItem,
                  fontWeight: active ? 700 : 500,
                  color: active ? colors.black : colors.gray3,
                }}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedPoint("corporate");
                }}
              >
                {tab === "franchise" ? "프랜차이즈" : "구내식당"}
                {active && <span style={s.tabIndicator} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        {/* QR / Barcode Card */}
        <div style={s.qrCard}>
          {/* 프랜차이즈: 바코드 + QR */}
          {isFranchise && (
            <div style={s.barcodeArea} onClick={() => setShowBarcodeFullscreen(true)}>
              <img src={barcodeImg} alt="barcode" style={{ width: "100%", height: "auto", cursor: "pointer" }} />
            </div>
          )}

          {/* QR Code */}
          <div
            style={{
              ...s.qrArea,
              width: isFranchise ? 120 : 200,
              height: isFranchise ? 120 : 200,
              cursor: isFranchise ? "pointer" : undefined,
            }}
            onClick={isFranchise ? () => setShowQrFullscreen(true) : undefined}
          >
            <img src={qrcodeImg} alt="QR code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>

          {/* 구분선 + 남은시간 */}
          <div style={s.timerSection}>
            <div style={s.dividerFull} />
            <div style={s.timerRow}>
              <span style={s.timerLabel}>남은시간</span>
              <span style={s.timerValue}>{formatTime(remainingTime)}</span>
            </div>
          </div>
        </div>

        {/* ── 말풍선 (남은시간 바로 아래, 겹침) ── */}
        {!showPaymentPopup && (
          <div style={s.alertChipWrap}>
            <div style={s.alertChipArrow} />
            <button
              onClick={() => setShowPaymentPopup(true)}
              style={s.alertMiniBtn}
            >
              <Bell size={13} strokeWidth={2.4} color="#fff" />
              <span>결제완료 테스트</span>
            </button>
          </div>
        )}

        {/* ── 기업 포인트 ── */}
        <div
          style={{
            ...s.pointCard,
            cursor: "pointer",
          }}
          onClick={() => setCorporateChecked(!corporateChecked)}
        >
          <div style={s.pointLeft}>
            <div style={{
              ...s.checkbox,
              backgroundColor: corporateChecked ? colors.primary : "transparent",
              border: `2px solid ${corporateChecked ? colors.primary : colors.gray3}`,
            }}>
              {corporateChecked ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5L4 7.5L8.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5L4 7.5L8.5 2.5" stroke={colors.gray3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={s.pointLabel}>기업 포인트</span>
          </div>
          <div style={s.pointRight}>
            <span style={{
              ...s.pointValue,
              color: colors.black,
            }}>58,690</span>
            <ChevronRight size={14} strokeWidth={2} color={colors.gray2} />
          </div>
        </div>

        {/* ── 올리브 포인트 ── */}
        <div
          style={{
            ...s.pointCard,
            backgroundColor: oliveDisabled ? "#F7F7F7" : colors.white,
            cursor: oliveDisabled ? "default" : "pointer",
          }}
          onClick={() => {
            if (!oliveDisabled) setOliveChecked(!oliveChecked);
          }}
        >
          <div style={s.pointLeft}>
            <div style={{
              ...s.checkbox,
              backgroundColor: !oliveDisabled && oliveChecked ? colors.primary : "transparent",
              border: `2px solid ${oliveDisabled ? "#D1D1D1" : oliveChecked ? colors.primary : colors.gray3}`,
            }}>
              {!oliveDisabled && oliveChecked ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5L4 7.5L8.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5L4 7.5L8.5 2.5" stroke="#D1D1D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{
              ...s.pointLabel,
              color: oliveDisabled ? colors.gray3 : colors.gray1,
            }}>올리브 포인트</span>
            {oliveDisabled && (
              <span style={s.disabledBadge}>사용불가</span>
            )}
          </div>
          <div style={s.pointRight}>
            <span style={{
              ...s.pointValue,
              color: oliveDisabled ? colors.gray3 : colors.black,
            }}>58,690</span>
            <ChevronRight size={14} strokeWidth={2} color={oliveDisabled ? colors.gray3 : colors.gray2} />
          </div>
        </div>

        {/* ── 이용 가능 브랜드 (프랜차이즈만) ── */}
        {isFranchise && (
          <div style={s.brandCard}>
            <span style={s.brandTitle}>이용 가능 브랜드</span>
            <div style={s.brandGrid}>
              {brands.map((brand) => (
                <div key={brand.name} style={s.brandChip}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={{ width: brand.width, height: "auto", objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}


        {/* 하단 여백 */}
        <div style={{ height: 40 }} />
      </div>

      {/* ── 하단 버튼 (구내식당만) ── */}
      {!isFranchise && (
        <div style={s.bottomBar}>
          <button style={s.chargeBtn}>
            <span style={s.chargePIcon}>P</span>
            올리브포인트 충전
          </button>
        </div>
      )}

      {/* ── 바코드 전체화면 ── */}
      {showBarcodeFullscreen && (
        <div style={s.fullOverlay}>
          <button style={s.fullCloseTopRight} onClick={() => setShowBarcodeFullscreen(false)}>
            <X size={22} strokeWidth={2.2} color={colors.white} />
          </button>
          <div style={s.barcodeFullRow}>
            <span style={s.barcodeFullTimer}>남은시간 <span style={{ color: colors.primary, fontWeight: 700 }}>{formatTime(remainingTime)}</span></span>
            <div style={s.barcodeFullCard}>
              <img src={barcodeImg} alt="barcode" style={s.barcodeFullImg} />
            </div>
            <span style={s.barcodeFullNumber}>2810 0602 5142 8541 3258 1532</span>
          </div>
        </div>
      )}

      {/* ── QR 전체화면 (프랜차이즈) ── */}
      {showQrFullscreen && (
        <div style={s.fullOverlay}>
          <button style={s.fullCloseTopRight} onClick={() => setShowQrFullscreen(false)}>
            <X size={22} strokeWidth={2.2} color={colors.white} />
          </button>
          <div style={s.qrFullCenter}>
            <div style={s.qrFullCard}>
              <img src={qrcodeImg} alt="QR code" style={s.qrFullImg} />
            </div>
          </div>
          <div style={s.fullTimerRow}>
            <span style={s.fullTimerLabel}>남은시간</span>
            <span style={s.fullTimerValue}>{formatTime(remainingTime)}</span>
          </div>
        </div>
      )}

      {/* ── 결제완료 팝업 ── */}
      {showPaymentPopup && (
        <OldPaymentCompletePopup
          onClose={() => setShowPaymentPopup(false)}
          type={activeTab}
        />
      )}
    </div>
  );
}

// ─── Payment Complete Popup (결제내역 상세 팝업과 동일 스타일) ──────
function OldPaymentCompletePopup({ onClose, type }: { onClose: () => void; type: PaymentTab }) {
  const isFranchise = type === "franchise";
  const storeName = isFranchise ? "CU 판교점" : "본사 구내식당";
  const amount = isFranchise ? "7,500" : "4,700";
  const paymentNo = isFranchise ? "7775024071900055" : "4357394287500012";

  const handleCopy = () => {
    navigator.clipboard?.writeText(paymentNo);
  };

  return (
    <div style={popupStyles.overlay} onClick={onClose}>
      <div style={popupStyles.popup} onClick={(e) => e.stopPropagation()}>
        {/* 빨간 헤더 */}
        <div style={popupStyles.popupHeader}>
          <span style={popupStyles.popupHeaderText}>결제완료</span>
        </div>

        {/* 본문 */}
        <div style={popupStyles.popupBody}>
          {/* 결제유형 + 날짜 */}
          <span style={popupStyles.popupDate}>혼자결제 | 2024.07.19 12:00</span>

          {/* 금액 카드 */}
          <div style={popupStyles.popupAmountCard}>
            <span style={popupStyles.popupAmount}>{amount}</span>
          </div>

          {/* 가맹점 카드 */}
          <div style={popupStyles.popupStoreCard}>
            <span style={popupStyles.popupStoreName}>{storeName}</span>
            <div style={popupStyles.popupPaymentNo}>
              <span style={popupStyles.popupPaymentNoText}>결제번호 {paymentNo}</span>
              <button style={popupStyles.popupCopyBtn} onClick={handleCopy}>복사</button>
            </div>
          </div>

          {/* 점선 구분 */}
          <div style={popupStyles.popupDashed} />

          {/* 닫기 버튼 */}
          <button style={popupStyles.popupCloseBtn} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>

      {/* 파란 말풍선 (프랜차이즈만) */}
      {isFranchise && (
        <div style={popupStyles.bubbleWrap}>
          <div style={popupStyles.bubbleArrow} />
          <div style={popupStyles.bubble}>
            <span style={popupStyles.bubbleLine}>브랜드명 + 점포명</span>
            <span style={popupStyles.bubbleLine}>결제번호(포스 거래번호) 노출</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Popup Styles (결제내역 상세 팝업과 동일) ────────────────
const popupStyles: Record<string, CSSProperties> = {
  overlay: {
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
    backgroundColor: colors.primary,
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
  bubbleLine: {
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: -0.13,
  },
};

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 200,
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
    cursor: "pointer",
    padding: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },

  /* Tab Bar */
  tabBarWrap: {
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray5}`,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    flexShrink: 0,
    zIndex: 5,
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: spacing.xl,
  },
  tabItem: {
    position: "relative",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: 24,
    fontSize: 16,
    letterSpacing: -0.3,
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

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: spacing.lg,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingBottom: 120,
  },

  /* QR Card */
  qrCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 24,
  },
  barcodeArea: {
    width: "100%",
  },
  barcodePlaceholder: {
    width: "100%",
    height: 70,
    backgroundColor: colors.gray6,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  barcodeLines: {
    width: "90%",
    height: "80%",
    background: `repeating-linear-gradient(
      90deg,
      ${colors.black} 0px,
      ${colors.black} 2px,
      transparent 2px,
      transparent 5px
    )`,
  },
  qrArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timerSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 12,
  },
  dividerFull: {
    width: "calc(100% + 40px)",
    height: 1,
    backgroundColor: colors.gray6,
    marginLeft: -20,
    alignSelf: "stretch",
  },
  timerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  timerLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.15,
  },
  timerValue: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.15,
  },

  /* Point Cards */
  pointCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointLeft: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  pointLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.13,
  },
  pointRight: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  pointValue: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.16,
  },
  disabledBadge: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.primary,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.primary,
    borderRadius: 999,
    paddingTop: 2,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    lineHeight: 1,
  },

  /* Alert Chip (말풍선) */
  alertChipWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -32,
    marginBottom: 0,
    position: "relative",
    zIndex: 5,
  },
  alertMiniBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingLeft: 14,
    paddingRight: 14,
    height: 32,
    backgroundColor: "#3478F6",
    borderRadius: 100,
    border: "none",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: -0.12,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(52,120,246,0.35)",
    fontFamily,
  },
  alertMiniBtn2Line: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#3478F6",
    borderRadius: 14,
    border: "none",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(52,120,246,0.35)",
    fontFamily,
  },
  alertLine1: {
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: -0.13,
  },
  alertLine2: {
    fontSize: 11,
    fontWeight: 500,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: -0.11,
  },
  alertChipArrow: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "6px solid #3478F6",
    marginBottom: -1,
  },

  /* Brand Card */
  brandCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: "20px 13px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  brandTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.13,
    paddingLeft: 7,
  },
  brandGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
  },
  brandChip: {
    backgroundColor: colors.white,
    borderRadius: 999,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    border: "none",
  },

  /* Shared Fullscreen Overlay */
  fullOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#191A1C",
    zIndex: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    fontFamily,
  },
  fullCloseTopRight: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: radius.full,
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  fullTimerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  fullTimerLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: -0.15,
  },
  fullTimerValue: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.15,
  },

  /* Barcode Fullscreen */
  barcodeFullRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  barcodeFullTimer: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.white,
    fontFamily,
    writingMode: "vertical-rl" as const,
    textOrientation: "sideways" as const,
    whiteSpace: "nowrap" as const,
    userSelect: "none" as const,
    letterSpacing: -0.14,
  },
  barcodeFullNumber: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.white,
    letterSpacing: 1.5,
    fontFamily,
    writingMode: "vertical-lr" as const,
    textOrientation: "mixed" as const,
    userSelect: "none" as const,
  },
  barcodeFullCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.xl,
    width: 160,
    height: 520,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(234,234,234,0.7)",
  },
  barcodeFullImg: {
    width: 500,
    height: "auto",
    transform: "rotate(90deg) scale(3.5)",
    flexShrink: 0,
  },

  /* QR Fullscreen */
  qrFullCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qrFullCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.xxl,
    width: 280,
    height: 280,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 10px rgba(234,234,234,0.7)",
  },
  qrFullImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain" as const,
  },

  /* Bottom Bar */
  bottomBar: {
    position: "relative",
    zIndex: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    flexShrink: 0,
  },
  chargeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.17,
    cursor: "pointer",
    fontFamily,
    gap: 8,
  },
  chargePIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    fontSize: 12,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.17,
  },
};
