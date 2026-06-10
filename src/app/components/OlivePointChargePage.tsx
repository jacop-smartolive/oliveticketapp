/**
 * 올리브포인트 충전 페이지
 * - 올리브포인트 > "충전하기" 진입
 * - 충전 포인트 선택(프리셋 + 다른 금액 입력)
 * - 결제 수단: 올리브 페이 / 일반 결제(퀵계좌이체·신용체크카드·가상계좌)
 * - 약관 동의 + 결제하기
 * ※ 외부 PG(토스/NH페이/은행선택) 화면은 프로토타입에서 스텁 처리
 */
import { useState } from "react";
import type { CSSProperties, UIEvent } from "react";
import { ChevronLeft, ChevronDown, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase, radius } from "../shared/tokens";
import { formatAmount } from "../shared/formatters";
import { showSuccessToast } from "../shared/toast";

type PayMethod = "olive" | "normal";
type NormalTab = "transfer" | "card" | "virtual";
type PresetSel = number | "custom" | null;

const PRESETS = [10000, 20000, 30000, 50000, 100000];
const CARD_OPTIONS = ["농협카드", "KB국민카드", "신한카드", "삼성카드", "현대카드", "롯데카드"];
const REGISTERED_CARDS = [{ id: 1, name: "KB on 체크카드" }];
const MAX_AMOUNT = 100000;

interface OlivePointChargePageProps {
  onBack: () => void;
}

export default function OlivePointChargePage({ onBack }: OlivePointChargePageProps) {
  const { t } = useTranslation();
  const [preset, setPreset] = useState<PresetSel>(null);
  const [customAmount, setCustomAmount] = useState(0);
  const [payMethod, setPayMethod] = useState<PayMethod>("olive");
  const [normalTab, setNormalTab] = useState<NormalTab>("transfer");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  const handleCardScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const per = el.scrollWidth / (REGISTERED_CARDS.length + 1);
    setActiveCard(Math.round(el.scrollLeft / per));
  };

  const amount = preset === "custom" ? customAmount : typeof preset === "number" ? preset : 0;

  const handleCustomChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    const n = digits ? parseInt(digits, 10) : 0;
    setCustomAmount(Math.min(n, MAX_AMOUNT));
  };

  const canPay = amount > 0;

  const handlePay = () => {
    if (!canPay) return;
    if (payMethod === "normal" && normalTab === "card" && !selectedCard) {
      setCardError(true);
      return;
    }
    showSuccessToast(t("oliveCharge.completeToast"));
    onBack();
  };

  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>{t("oliveCharge.title")}</span>
        </div>
      </div>

      {/* Scroll */}
      <div style={s.scroll}>
        {/* 충전 포인트 */}
        <div style={s.section}>
          <span style={s.sectionTitle}>{t("oliveCharge.chargePoint")}</span>
          <div style={s.presetGrid}>
            {PRESETS.map((p) => {
              const active = preset === p;
              return (
                <button
                  key={p}
                  style={{ ...s.presetBtn, ...(active ? s.presetBtnActive : {}) }}
                  onClick={() => setPreset(p)}
                >
                  {formatAmount(p)}
                </button>
              );
            })}
            <button
              style={{ ...s.presetBtn, ...(preset === "custom" ? s.presetBtnActive : {}) }}
              onClick={() => setPreset("custom")}
            >
              {t("oliveCharge.customAmount")}
            </button>
          </div>

          {preset === "custom" && (
            <>
              <div style={s.customInputWrap}>
                <input
                  inputMode="numeric"
                  value={customAmount > 0 ? customAmount.toLocaleString() : ""}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  placeholder={t("oliveCharge.customPlaceholder")}
                  style={s.customInput}
                />
                {customAmount > 0 && (
                  <button style={s.clearBtn} onClick={() => setCustomAmount(0)} aria-label="clear">
                    <X size={12} strokeWidth={2.6} color={colors.white} />
                  </button>
                )}
              </div>
              <span style={s.customHint}>{t("oliveCharge.customHint")}</span>
            </>
          )}
        </div>

        <div style={s.gap} />

        {/* 결제금액 */}
        <div style={s.section}>
          <div style={s.amountRow}>
            <span style={s.sectionTitle}>{t("oliveCharge.paymentAmount")}</span>
            <span style={s.amountValue}>{formatAmount(amount)}</span>
          </div>
        </div>

        <div style={s.gap} />

        {/* 결제 수단 */}
        <div style={s.section}>
          <span style={s.sectionTitle}>{t("oliveCharge.paymentMethod")}</span>

          {/* 올리브 페이 */}
          <button style={s.radioRow} onClick={() => setPayMethod("olive")}>
            <Radio selected={payMethod === "olive"} />
            <span style={s.radioLabel}>{t("oliveCharge.olivePay")}</span>
          </button>

          {payMethod === "olive" && (
            <>
              {/* 카드 캐러셀 (스와이프) */}
              <div style={s.cardCarousel} onScroll={handleCardScroll}>
                {REGISTERED_CARDS.map((c) => (
                  <div key={c.id} style={s.cardSlide}>
                    <div style={s.creditCard}>
                      <div style={s.cardChip} />
                      <div style={s.creditCardBottom}>
                        <span style={s.creditCardName}>{c.name}</span>
                        <span style={s.creditCardBrand}>Check</span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* 카드 추가 */}
                <div style={s.cardSlide}>
                  <button style={s.addCard} onClick={() => {}}>
                    <div style={s.plusCircle}>
                      <Plus size={20} strokeWidth={2.4} color={colors.primary} />
                    </div>
                    <span style={s.olivePayTitle}>{t("oliveCharge.quickCardTitle")}</span>
                    <span style={s.olivePayDesc}>{t("oliveCharge.quickCardDesc")}</span>
                  </button>
                </div>
              </div>

              {/* 등록 카드 상세 (추가 카드 슬라이드에서는 숨김) */}
              {activeCard < REGISTERED_CARDS.length && (
                <>
                  <div style={s.installmentBox}>
                    <span style={s.installmentLabel}>{t("oliveCharge.cardInstallment")}</span>
                    <span style={s.installmentValue}>{t("oliveCharge.installmentOnce")}</span>
                  </div>
                  <div style={s.cardNameBox}>
                    <span style={s.cardNameText}>{REGISTERED_CARDS[activeCard].name}</span>
                    <span style={s.cardSettingLink}>{t("oliveCharge.cardSetting")}</span>
                  </div>
                </>
              )}
            </>
          )}

          {/* 일반 결제 */}
          <button style={{ ...s.radioRow, marginTop: 8 }} onClick={() => setPayMethod("normal")}>
            <Radio selected={payMethod === "normal"} />
            <span style={s.radioLabel}>{t("oliveCharge.normalPay")}</span>
          </button>

          {payMethod === "normal" && (
            <>
              {/* 서브 탭 */}
              <div style={s.subTabRow}>
                {(["transfer", "card", "virtual"] as NormalTab[]).map((tab) => {
                  const active = normalTab === tab;
                  const label =
                    tab === "transfer" ? t("oliveCharge.tabTransfer")
                    : tab === "card" ? t("oliveCharge.tabCard")
                    : t("oliveCharge.tabVirtual");
                  return (
                    <button
                      key={tab}
                      style={{ ...s.subTab, ...(active ? s.subTabActive : {}) }}
                      onClick={() => { setNormalTab(tab); setCardError(false); }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* 신용 · 체크카드 */}
              {normalTab === "card" && (
                <>
                  <div style={s.cardSelectWrap}>
                    <button
                      style={{
                        ...s.cardSelect,
                        borderColor: selectedCard || cardError ? colors.primary : colors.gray5,
                        backgroundColor: selectedCard ? colors.primaryLight : colors.white,
                      }}
                      onClick={() => setCardOpen((v) => !v)}
                    >
                      <span style={{ ...s.cardSelectLabel, color: selectedCard ? colors.primary : colors.black }}>
                        {t("oliveCharge.cardLabel")}
                      </span>
                      <span style={{ ...s.cardSelectValue, color: selectedCard ? colors.primary : colors.gray2 }}>
                        {selectedCard ?? t("oliveCharge.cardUnselected")}
                      </span>
                      <ChevronDown size={16} strokeWidth={2} color={selectedCard ? colors.primary : colors.gray2} />
                    </button>
                    {cardOpen && (
                      <div style={s.cardList}>
                        {CARD_OPTIONS.map((c) => (
                          <button
                            key={c}
                            style={s.cardOption}
                            onClick={() => { setSelectedCard(c); setCardOpen(false); setCardError(false); }}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedCard && (
                    <div style={s.installmentBox}>
                      <span style={s.installmentLabel}>{t("oliveCharge.cardInstallment")}</span>
                      <span style={s.installmentValue}>{t("oliveCharge.installmentOnce")}</span>
                    </div>
                  )}

                  {cardError && !selectedCard && (
                    <span style={s.errorMsg}>{t("oliveCharge.selectCardMsg")}</span>
                  )}
                </>
              )}

              {/* 가상계좌 */}
              {normalTab === "virtual" && (
                <div style={s.virtualBox}>
                  <span style={s.virtualNotice}>{t("oliveCharge.virtualNotice")}</span>
                </div>
              )}
            </>
          )}
        </div>

        <div style={s.gap} />

        {/* 유의사항 및 약관 */}
        <div style={s.noticeSection}>
          <span style={s.sectionTitle}>{t("oliveCharge.termsTitle")}</span>
          <div style={s.noticeBox}>
            <div style={s.noticeHead}>
              <span style={s.noticeTitle}>{t("oliveCharge.noticeTitle")}</span>
              <span style={s.detailLink}>{t("oliveCharge.detail")}</span>
            </div>
            <p style={s.noticeDesc}>{t("oliveCharge.noticeDesc")}</p>
          </div>

          <div style={s.noticeBox}>
            <span style={s.noticeTitle}>{t("oliveCharge.agreeTitle")}</span>
            <div style={s.agreeRow}>
              <span style={s.agreeText}>{t("oliveCharge.agreePrivacy")}</span>
              <span style={s.detailLink}>{t("oliveCharge.detail")}</span>
            </div>
            <div style={s.agreeRow}>
              <span style={s.agreeText}>{t("oliveCharge.agreeEpay")}</span>
              <span style={s.detailLink}>{t("oliveCharge.detail")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 결제하기 */}
      <div style={s.bottomBar}>
        <button
          style={{
            ...s.payBtn,
            backgroundColor: canPay ? colors.primary : colors.gray3,
            cursor: canPay ? "pointer" : "default",
          }}
          disabled={!canPay}
          onClick={handlePay}
        >
          {t("oliveCharge.payBtn")}
        </button>
      </div>
    </div>
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <div style={{
      width: 22,
      height: 22,
      borderRadius: radius.full,
      backgroundColor: selected ? colors.primary : colors.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
      {selected && (
        <div style={{ width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.white }} />
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
    backgroundColor: colors.white,
    fontFamily,
    zIndex: 115,
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
    flexShrink: 0,
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

  scroll: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 100,
  },
  gap: {
    height: 8,
    backgroundColor: colors.bg,
  },

  section: {
    backgroundColor: colors.white,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingTop: 22,
    paddingBottom: 22,
    display: "flex",
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },

  // 프리셋
  presetGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  presetBtn: {
    flexBasis: "calc(33.333% - 6px)",
    maxWidth: "calc(33.333% - 6px)",
    height: 48,
    borderRadius: 10,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
  presetBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
  },
  customInputWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    height: 50,
    border: `1.5px solid ${colors.gray7}`,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
    paddingLeft: 16,
    paddingRight: 12,
  },
  customInput: {
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 15,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
    fontFamily,
  },
  clearBtn: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.gray2,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    padding: 0,
  },
  customHint: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
    marginTop: 8,
  },

  // 결제금액
  amountRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountValue: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.3,
  },

  // 결제 수단
  radioRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    paddingTop: 14,
    paddingBottom: 6,
    paddingLeft: 0,
    paddingRight: 0,
    cursor: "pointer",
    textAlign: "left",
    fontFamily,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
  },
  cardCarousel: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    marginTop: 10,
    paddingBottom: 4,
    scrollbarWidth: "none",
    WebkitOverflowScrolling: "touch",
  } as CSSProperties,
  cardSlide: {
    flexShrink: 0,
    width: "84%",
    scrollSnapAlign: "start",
  },
  creditCard: {
    width: "100%",
    height: 178,
    borderRadius: 14,
    background: "linear-gradient(135deg, #5CC6F0 0%, #2BA8E8 55%, #1C7FCF 100%)",
    position: "relative",
    overflow: "hidden",
    padding: 18,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 14px rgba(30,127,207,0.25)",
    boxSizing: "border-box",
  },
  cardChip: {
    width: 40,
    height: 30,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  creditCardBottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  creditCardName: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.2,
  },
  creditCardBrand: {
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: -0.1,
  },
  addCard: {
    width: "100%",
    height: 178,
    borderRadius: 14,
    border: `1.5px dashed ${colors.gray3}`,
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    cursor: "pointer",
    fontFamily,
    boxSizing: "border-box",
  },
  cardNameBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 12,
  },
  cardNameText: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  cardSettingLink: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
    textDecoration: "underline",
    cursor: "pointer",
  },
  plusCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  olivePayTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  olivePayDesc: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
  },

  subTabRow: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  subTab: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 13,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap",
  },
  subTabActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
  },

  cardSelectWrap: {
    marginTop: 12,
    position: "relative",
  },
  cardSelect: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
    height: 50,
    border: `1.5px solid ${colors.gray5}`,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingLeft: 16,
    paddingRight: 14,
    cursor: "pointer",
    fontFamily,
  },
  cardSelectLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  cardSelectValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: -0.2,
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    marginTop: 6,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  cardOption: {
    height: 46,
    backgroundColor: colors.white,
    border: "none",
    borderBottom: `1px solid ${colors.gray6}`,
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    textAlign: "left",
    paddingLeft: 16,
  },
  installmentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.inputBg,
    borderRadius: 12,
  },
  installmentLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
  },
  installmentValue: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  errorMsg: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.2,
    marginTop: 10,
  },
  virtualBox: {
    marginTop: 12,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.inputBg,
    borderRadius: 12,
  },
  virtualNotice: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.2,
  },

  // 약관
  noticeSection: {
    backgroundColor: colors.white,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingTop: 22,
    paddingBottom: 22,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  noticeBox: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  noticeHead: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  noticeDesc: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    lineHeight: 1.5,
    margin: 0,
  },
  agreeRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  agreeText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    flex: 1,
    minWidth: 0,
  },
  detailLink: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
    textDecoration: "underline",
    cursor: "pointer",
    flexShrink: 0,
  },

  // 하단 버튼
  bottomBar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    padding: "16px 16px 24px",
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    flexShrink: 0,
  },
  payBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    fontFamily,
  },
};
