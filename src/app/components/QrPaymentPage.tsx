/**
 * QR 결제 페이지 (신버전) — 구버전 디자인 이식
 * 구내식당 / 프랜차이즈 2탭, 체크박스형 포인트(기업+올리브),
 * 브랜드 스와이프, 바코드/QR 전체화면, 센터 결제완료 팝업.
 * QR 코드는 동적 생성(QrCodeSvg) 유지.
 */
import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Bell, X } from "lucide-react";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import { formatAmountStr } from "../shared/formatters";
import QrIcon from "../../imports/QrIcon";
import barcodeImg from "../../assets/barcode.png";
import roundEmart24Logo from "../../assets/brands/round_emart24.png";
import roundCuLogo from "../../assets/brands/round_cu.png";
import roundSevenelevenLogo from "../../assets/brands/round_seveneleven.png";
import roundParisbaguetteLogo from "../../assets/brands/round_parisbaguette.png";
import roundBonjukLogo from "../../assets/brands/round_bonjuk.png";

type PaymentTab = "franchise" | "cafeteria";

interface QrPaymentPageProps {
  onBack: () => void;
  initialTab?: PaymentTab;
}

export default function QrPaymentPage({
  onBack,
  initialTab = "cafeteria",
}: QrPaymentPageProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PaymentTab>(initialTab);
  const [remainingTime, setRemainingTime] = useState(150); // 2:30
  const [corporateChecked, setCorporateChecked] = useState(true);
  const [oliveChecked, setOliveChecked] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showBarcodeFullscreen, setShowBarcodeFullscreen] = useState(false);
  const [showQrFullscreen, setShowQrFullscreen] = useState(false);

  // 카운트다운 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const isFranchise = activeTab === "franchise";
  // 프랜차이즈에서는 올리브포인트 사용불가
  const oliveDisabled = isFranchise;

  const brands = [
    { nameKey: "mock.brandEmart24", logo: roundEmart24Logo },
    { nameKey: "mock.brandCU", logo: roundCuLogo },
    { nameKey: "mock.brand7Eleven", logo: roundSevenelevenLogo },
    { nameKey: "mock.brandParisBaguette", logo: roundParisbaguetteLogo },
    { nameKey: "mock.brandBonjuk", logo: roundBonjukLogo },
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
            <span style={s.headerTitle}>{t("qrPay.headerTitle")}</span>
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div style={s.tabBarWrap}>
        <div style={s.tabBar}>
          {(["cafeteria", "franchise"] as const).map((tab) => {
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
                  setCorporateChecked(true);
                }}
              >
                {tab === "franchise" ? t("qrPay.tabFranchise") : t("qrPay.tabCafeteria")}
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
          {isFranchise ? (
            <>
              {/* 프랜차이즈: 바코드 + QR 일렬 배치 */}
              <div style={s.barcodeQrRow}>
                <div style={s.barcodeAreaInline} onClick={() => setShowBarcodeFullscreen(true)}>
                  <img
                    src={barcodeImg}
                    alt="barcode"
                    style={{ width: "100%", height: "100%", display: "block", cursor: "pointer" }}
                  />
                </div>
                <div style={s.qrAreaInline} onClick={() => setShowQrFullscreen(true)}>
                  <QrCodeSvg size={80} seed={42} />
                </div>
              </div>

              <div style={s.dividerFull} />

              {/* 이용 가능 브랜드 */}
              <div style={s.brandSection}>
                <span style={s.brandLabel}>{t("qrPay.availableBrands")}</span>
                <div style={s.brandSwipeWrap}>
                  <div style={s.brandSwipeRow}>
                    {brands.map((brand) => (
                      <div key={brand.nameKey} style={s.brandItem}>
                        <img src={brand.logo} alt={t(brand.nameKey)} style={s.brandRoundLogo} />
                        <span style={s.brandName}>{t(brand.nameKey)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={s.brandFadeLeft} />
                  <div style={s.brandFadeRight} />
                </div>
              </div>

              {/* 구분선 + 남은시간 */}
              <div style={s.timerSection}>
                <div style={s.dividerFull} />
                <div style={s.timerRow}>
                  <span style={s.timerLabel}>{t("qrPay.remainingTime")}</span>
                  <span style={s.timerValue}>{formatTime(remainingTime)}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 구내식당: QR만 */}
              <div style={{ ...s.qrArea, width: 200, height: 200 }}>
                <QrCodeSvg size={200} seed={42} />
              </div>

              {/* 구분선 + 남은시간 */}
              <div style={s.timerSection}>
                <div style={s.dividerFull} />
                <div style={s.timerRow}>
                  <span style={s.timerLabel}>{t("qrPay.remainingTime")}</span>
                  <span style={s.timerValue}>{formatTime(remainingTime)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── 말풍선 (남은시간 바로 아래, 겹침) ── */}
        {!showPaymentPopup && (
          <div style={s.alertChipWrap}>
            <div style={s.alertChipArrow} />
            <button onClick={() => setShowPaymentPopup(true)} style={s.alertMiniBtn}>
              <Bell size={13} strokeWidth={2.4} color="#fff" />
              <span>{t("qrPay.paymentTest")}</span>
            </button>
          </div>
        )}

        {/* ── 기업 포인트 ── */}
        <div
          style={{ ...s.pointCard, cursor: "pointer" }}
          onClick={() => setCorporateChecked(!corporateChecked)}
        >
          <div style={s.pointLeft}>
            <div style={{
              ...s.checkbox,
              backgroundColor: corporateChecked ? colors.primary : "transparent",
              border: `2px solid ${corporateChecked ? colors.primary : colors.gray3}`,
            }}>
              <CheckMark color={corporateChecked ? "white" : colors.gray3} />
            </div>
            <span style={s.pointLabel}>{t("qrPay.corpPoint")}</span>
          </div>
          <div style={s.pointRight}>
            <span style={{ ...s.pointValue, color: colors.black }}>{formatAmountStr("58,690")}</span>
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
              <CheckMark color={!oliveDisabled && oliveChecked ? "white" : "#D1D1D1"} />
            </div>
            <span style={{
              ...s.pointLabel,
              color: oliveDisabled ? colors.gray3 : colors.gray1,
            }}>{t("qrPay.olivePoint")}</span>
            {oliveDisabled && <span style={s.disabledBadge}>{t("qrPay.olivePointDisabled")}</span>}
          </div>
          <div style={s.pointRight}>
            <span style={{
              ...s.pointValue,
              color: oliveDisabled ? colors.gray3 : colors.black,
            }}>{formatAmountStr("58,690")}</span>
            <ChevronRight size={14} strokeWidth={2} color={oliveDisabled ? colors.gray3 : colors.gray2} />
          </div>
        </div>

        {/* 하단 여백 */}
        <div style={{ height: 40 }} />
      </div>

      {/* ── 하단 버튼 (구내식당만) ── */}
      {!isFranchise && (
        <div style={s.bottomBar}>
          <button style={s.chargeBtn}>
            <span style={s.chargePIcon}>P</span>
            {t("qrPay.oliveCharge")}
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
            <span style={s.barcodeFullTimer}>
              {t("qrPay.remainingTime")}{" "}
              <span style={{ color: colors.primary, fontWeight: 700 }}>{formatTime(remainingTime)}</span>
            </span>
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
              <QrCodeSvg size={248} seed={42} />
            </div>
          </div>
          <div style={s.fullTimerRow}>
            <span style={s.fullTimerLabel}>{t("qrPay.remainingTime")}</span>
            <span style={s.fullTimerValue}>{formatTime(remainingTime)}</span>
          </div>
        </div>
      )}

      {/* ── 결제완료 팝업 ── */}
      {showPaymentPopup && (
        <PaymentCompletePopup
          onClose={() => setShowPaymentPopup(false)}
          type={activeTab}
        />
      )}
    </div>
  );
}

// ─── 체크 아이콘 ──────────────────────────────────────────────
function CheckMark({ color }: { color: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5.5L4 7.5L8.5 2.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Payment Complete Popup (바텀시트 레이어) ─────────────────
function PaymentCompletePopup({ onClose, type }: { onClose: () => void; type: PaymentTab }) {
  const { t } = useTranslation();
  const [slideIn, setSlideIn] = useState(false);
  const isFranchise = type === "franchise";
  const storeName = isFranchise ? t("qrPay.storeFranchise") : t("qrPay.cafeteriaName");
  const amount = isFranchise ? "7,500" : "4,700";
  const paymentNo = isFranchise ? "7775024071900055" : "43573942875";

  useEffect(() => {
    requestAnimationFrame(() => setSlideIn(true));
  }, []);

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(onClose, 280);
  };

  return (
    <div
      style={{ ...popupStyles.overlay, opacity: slideIn ? 1 : 0 }}
      onClick={handleClose}
    >
      <div
        style={{ ...popupStyles.sheet, transform: slideIn ? "translateY(0)" : "translateY(100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div style={popupStyles.sheetHeader}>
          <span style={popupStyles.sheetTitle}>{t("qrPay.paymentComplete")}</span>
          <button style={popupStyles.sheetClose} onClick={handleClose} aria-label={t("common.close")}>
            <X size={18} strokeWidth={2.4} color={colors.gray1} />
          </button>
        </div>

        {/* 금액 + 추가결제 */}
        <div style={popupStyles.amountRow}>
          <span style={popupStyles.amount}>{formatAmountStr(amount)}</span>
          <button style={popupStyles.addPayBtn} onClick={handleClose}>
            <div style={{ width: 16, height: 13, flexShrink: 0 }}><QrIcon /></div>
            {t("qrPay.additionalPay")}
          </button>
        </div>

        {/* 상세 */}
        <div style={popupStyles.detailSection}>
          <div style={popupStyles.detailRow}>
            <span style={popupStyles.detailLabel}>{t("qrPay.paymentDate")}</span>
            <span style={popupStyles.detailValue}>2023.09.06 11:13</span>
          </div>
          <div style={popupStyles.detailRow}>
            <span style={popupStyles.detailLabel}>{t("qrPay.paymentNumber")}</span>
            <span style={popupStyles.detailValue}>{paymentNo}</span>
          </div>
          <div style={popupStyles.detailRow}>
            <span style={popupStyles.detailLabel}>{t("qrPay.paymentPlace")}</span>
            <span style={popupStyles.detailValue}>{storeName}</span>
          </div>
        </div>

        {/* 이벤트 배너 */}
        <div style={popupStyles.banner}>
          <div style={popupStyles.bannerText}>
            <span style={popupStyles.bannerTag}>{t("restaurantCafe.bannerTag")}</span>
            <span style={popupStyles.bannerSub}>{t("qrPay.surveyBannerSub")}</span>
            <span style={popupStyles.bannerTitle}>{t("qrPay.surveyBannerTitle")}</span>
          </div>
          <span style={popupStyles.bannerEmoji}>👍</span>
        </div>
      </div>
    </div>
  );
}

// ─── QR Code Generator ───────────────────────────────────────
function generateQrMatrix(seed: number): boolean[][] {
  const size = 25;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Finder patterns (3 corners)
  const drawFinder = (r: number, c: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const isOuter = i === 0 || i === 6 || j === 0 || j === 6;
        const isInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        matrix[r + i][c + j] = isOuter || isInner;
      }
    }
  };
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Separator (white border around finders)
  const clearSep = (r: number, c: number, h: boolean) => {
    for (let i = 0; i < 8; i++) {
      if (h) {
        if (r >= 0 && r < size && c + i >= 0 && c + i < size) matrix[r][c + i] = false;
      } else {
        if (r + i >= 0 && r + i < size && c >= 0 && c < size) matrix[r + i][c] = false;
      }
    }
  };
  clearSep(7, 0, true); clearSep(0, 7, false);
  clearSep(7, size - 8, true); clearSep(0, size - 8, false);
  clearSep(size - 8, 0, true); clearSep(size - 7, 7, false);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Alignment pattern
  const drawAlignment = (r: number, c: number) => {
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const isOuter = Math.abs(i) === 2 || Math.abs(j) === 2;
        const isCenter = i === 0 && j === 0;
        matrix[r + i][c + j] = isOuter || isCenter;
      }
    }
  };
  drawAlignment(size - 9, size - 9);

  // Data area - pseudo-random fill
  let rng = seed;
  const nextRng = () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return rng;
  };
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inFinder =
        (r < 8 && c < 8) ||
        (r < 8 && c >= size - 8) ||
        (r >= size - 8 && c < 8);
      const inAlignment =
        r >= size - 11 && r <= size - 7 && c >= size - 11 && c <= size - 7;
      const isTiming = r === 6 || c === 6;
      if (!inFinder && !inAlignment && !isTiming) {
        matrix[r][c] = nextRng() % 3 !== 0;
      }
    }
  }

  return matrix;
}

function QrCodeSvg({ size = 160, seed = 42 }: { size?: number; seed?: number }) {
  const matrix = useMemo(() => generateQrMatrix(seed), [seed]);
  const moduleCount = matrix.length;
  const moduleSize = size / (moduleCount + 2); // +2 for quiet zone
  const offset = moduleSize; // quiet zone

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={offset + c * moduleSize}
              y={offset + r * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill={colors.black}
            />
          ) : null
        )
      )}
    </svg>
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
    backgroundColor: "rgba(25,26,28,0.45)",
    zIndex: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    transition: "opacity 0.28s ease",
    fontFamily,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingBottom: 28,
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1)",
  },
  sheetHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  sheetClose: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: colors.gray6,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  },
  amountRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  amount: {
    fontSize: 30,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.4,
  },
  addPayBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    height: 36,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.primary,
    borderRadius: 100,
    border: "none",
    color: colors.white,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: -0.13,
    cursor: "pointer",
    fontFamily,
    flexShrink: 0,
  },
  detailSection: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginBottom: 24,
  },
  detailRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.14,
    flexShrink: 0,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.14,
    textAlign: "right",
  },
  banner: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
    height: 92,
    background: "linear-gradient(120deg, #FF7AA2 0%, #FF6B5B 60%, #FF8A4C 100%)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 16,
  },
  bannerText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  bannerTag: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 0.3,
  },
  bannerSub: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.white,
    letterSpacing: -0.2,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.4,
  },
  bannerEmoji: {
    fontSize: 38,
    flexShrink: 0,
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
  barcodeQrRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    gap: 26,
  },
  barcodeAreaInline: {
    flex: 1,
  },
  qrAreaInline: {
    width: 80,
    height: 80,
    flexShrink: 0,
  },
  qrArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  brandLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.13,
  },
  brandSwipeWrap: {
    position: "relative",
    overflow: "hidden",
    marginLeft: -20,
    marginRight: -20,
  },
  brandFadeLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 40,
    background: "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1))",
    pointerEvents: "none",
    zIndex: 1,
  },
  brandFadeRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 40,
    background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))",
    pointerEvents: "none",
    zIndex: 1,
  },
  brandSwipeRow: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    overflowX: "auto",
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  } as CSSProperties,
  brandItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
    flexShrink: 0,
  },
  brandRoundLogo: {
    width: 64,
    height: 64,
    borderRadius: 999,
    objectFit: "cover" as const,
  },
  brandName: {
    fontSize: 11,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.11,
    whiteSpace: "nowrap" as const,
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
  alertChipArrow: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "6px solid #3478F6",
    marginBottom: -1,
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
