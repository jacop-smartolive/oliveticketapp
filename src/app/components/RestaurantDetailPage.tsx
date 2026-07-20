/**
 * 가맹점 상세 페이지
 * - 식당·카페 > 가맹점 클릭 시 진입
 * - 히어로 이미지 + 플로팅 버튼 / 이름·지도 / 현장결제·미리주문 탭
 * - 메뉴결제·포인트결제 토글 / 메뉴 리스트
 * ※ 레이아웃만 참고, 공통 디자인 토큰/규칙 준수
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ShoppingCart, Phone, Bookmark, MapPin, ChevronRight, Check, HelpCircle, Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import { formatAmountStr, formatAmount } from "../shared/formatters";
import { showSuccessToast } from "../shared/toast";
import StoreMapPage from "./StoreMapPage";
import type { SimpleMealData } from "./SimpleMealDetailPage";

const HERO_IMG = "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800";

// 메뉴 이미지 없음 → 회색 박스 플레이스홀더 (장바구니/완료화면 공용)
const GRAY_IMG =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23E9EAEC'/%3E%3C/svg%3E";

// 매장+메뉴 기반 고유 id (간편식 id와 충돌 방지: 1,000,000 이상)
function menuHashId(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return 1_000_000 + (Math.abs(h) % 1_000_000);
}

const MENU = [
  { nameKey: "restaurantDetail.m1", price: "3,700" },
  { nameKey: "restaurantDetail.m2", price: "4,500" },
  { nameKey: "restaurantDetail.m3", price: "3,000" },
  { nameKey: "restaurantDetail.m4", price: "4,800" },
  { nameKey: "restaurantDetail.m5", price: "2,500" },
];

const CATEGORIES = [
  "restaurantDetail.catCoffeeHot",
  "restaurantDetail.catCoffeeIce",
  "restaurantDetail.catDecaf",
  "restaurantDetail.catSmoothie",
  "restaurantDetail.catTea",
];

type Tab = "onsite" | "preorder";
type PayMode = "menu" | "point";

interface RestaurantDetailPageProps {
  nameKey: string;
  cuisineKey: string;
  onBack: () => void;
  onAddToCart?: (item: SimpleMealData, quantity: number) => void;
  onDirectPay?: (item: SimpleMealData, quantity: number) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  emoji?: string;
  thumbBg?: string;
}

export default function RestaurantDetailPage({ nameKey, onBack, onAddToCart, onDirectPay, cartCount = 0, onOpenCart, emoji, thumbBg }: RestaurantDetailPageProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("onsite");
  const [payMode, setPayMode] = useState<PayMode>("menu");
  const [pointAmount, setPointAmount] = useState(0);
  const [preorderCat, setPreorderCat] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked((prev) => {
      const next = !prev;
      if (next) showSuccessToast(t("map.saved"));
      return next;
    });
  };

  const [showCall, setShowCall] = useState(false);
  const [callIn, setCallIn] = useState(false);
  useEffect(() => {
    if (showCall) {
      const tm = setTimeout(() => setCallIn(true), 10);
      return () => clearTimeout(tm);
    }
    setCallIn(false);
  }, [showCall]);
  const closeCall = () => {
    setCallIn(false);
    setTimeout(() => setShowCall(false), 240);
  };

  const handlePointChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    setPointAmount(digits ? parseInt(digits, 10) : 0);
  };

  const [selectedPts, setSelectedPts] = useState<Set<string>>(new Set(["corp"]));
  const togglePt = (k: string) => {
    setSelectedPts((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k); else n.add(k);
      return n;
    });
  };
  const corpOn = selectedPts.has("corp");
  const oliveOn = selectedPts.has("olive");

  // ── 메뉴 클릭 → 주문 팝업 (현장결제/미리주문 공용) ──
  const [orderMenu, setOrderMenu] = useState<{ nameKey: string; price: string } | null>(null);
  const [orderQty, setOrderQty] = useState(1);
  const openOrder = (m: { nameKey: string; price: string }) => {
    setOrderMenu(m);
    setOrderQty(1);
  };
  const orderUnitPrice = orderMenu ? parseInt(orderMenu.price.replace(/,/g, ""), 10) : 0;

  const buildMeal = (m: { nameKey: string; price: string }): SimpleMealData =>
    ({
      id: menuHashId(`${nameKey}::${m.nameKey}`),
      store: t(nameKey),
      name: t(m.nameKey),
      nameKey: m.nameKey,
      storeKey: nameKey,
      price: m.price,
      remaining: 99,
      img: GRAY_IMG,
      deadlineValue: "",
      pickupDate: new Date(),
      // 장바구니 배지용 출처/썸네일 정보 (구조적 확장)
      sourceType: "restaurant",
      emoji,
      thumbBg,
    } as SimpleMealData);

  const handleOrderAddCart = () => {
    if (orderMenu) onAddToCart?.(buildMeal(orderMenu), orderQty);
    setOrderMenu(null);
  };
  const handleOrderDirectPay = () => {
    if (orderMenu) onDirectPay?.(buildMeal(orderMenu), orderQty);
    setOrderMenu(null);
  };

  return (
    <div style={s.screen}>
      <div style={s.scroll}>
        {/* ── 히어로 이미지 + 플로팅 버튼 ── */}
        <div style={s.hero}>
          <img src={HERO_IMG} alt="" style={s.heroImg} />
          <button style={{ ...s.circleBtn, ...s.heroBack }} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={24} strokeWidth={2.4} color={colors.black} />
          </button>
          <div style={s.heroActions}>
            <button style={s.circleBtn} aria-label="cart" onClick={onOpenCart}>
              <ShoppingCart size={19} strokeWidth={2.2} color={colors.black} />
              {cartCount > 0 && (
                <span style={s.cartBadge}>{cartCount > 99 ? "99+" : cartCount}</span>
              )}
            </button>
            <button style={s.circleBtn} aria-label="call" onClick={() => setShowCall(true)}>
              <Phone size={18} strokeWidth={2.2} color={colors.black} />
            </button>
            <button style={s.circleBtn} aria-label="bookmark" onClick={toggleBookmark}>
              <Bookmark
                size={19}
                strokeWidth={bookmarked ? 0 : 2.2}
                fill={bookmarked ? colors.primary : "none"}
                color={bookmarked ? colors.primary : colors.black}
              />
            </button>
          </div>
        </div>

        {/* ── 이름 + 지도 ── */}
        <div style={s.titleSection}>
          <div style={s.titleRow}>
            <h1 style={s.name}>{t(nameKey)}</h1>
            <button style={s.mapBtn} onClick={() => setShowMap(true)}>
              <MapPin size={14} strokeWidth={2.2} color={colors.black} style={{ flexShrink: 0 }} />
              {t("map.title")}
            </button>
          </div>
          <p style={s.greeting}>{t("restaurantDetail.greeting")}</p>

          {/* 태그 버튼 (현장결제 / 미리주문) */}
          <div style={s.infoTagRow}>
            <button style={s.infoTag}>
              {t("restaurantCafe.onSite")}
              <HelpCircle size={12} strokeWidth={2} color={colors.gray2} />
            </button>
            <button style={s.infoTag}>
              {t("restaurantCafe.preOrder")}
              <HelpCircle size={12} strokeWidth={2} color={colors.gray2} />
            </button>
          </div>
        </div>

        {/* ── 굵은 구분 밴드 ── */}
        <div style={s.sectionBand} />

        {/* ── 탭 (현장결제 / 미리주문) ── */}
        <div style={s.tabBar}>
          {(["onsite", "preorder"] as Tab[]).map((tb) => {
            const active = tab === tb;
            return (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                style={{
                  ...s.tabItem,
                  color: active ? colors.black : colors.gray3,
                  fontWeight: active ? 700 : 500,
                }}
              >
                {tb === "onsite" ? t("restaurantCafe.onSite") : t("restaurantCafe.preOrder")}
                {active && <span style={s.tabIndicator} />}
              </button>
            );
          })}
        </div>

        {/* ── 현장결제 탭 (메뉴결제/포인트결제) ── */}
        {tab === "onsite" && (
        <div style={{ ...s.belowTab, backgroundColor: payMode === "point" ? "#F7F7F7" : colors.white }}>
        {/* ── 결제 토글 (메뉴 결제 / 포인트 결제) ── */}
        <div style={s.toggleWrap}>
          <div style={s.toggleTrack}>
            {(["menu", "point"] as PayMode[]).map((pm) => {
              const active = payMode === pm;
              return (
                <button
                  key={pm}
                  onClick={() => setPayMode(pm)}
                  style={{
                    ...s.toggleBtn,
                    backgroundColor: active ? colors.white : "transparent",
                    color: active ? colors.black : colors.gray2,
                    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {pm === "menu" ? t("restaurantDetail.menuPay") : t("restaurantDetail.pointPay")}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 메뉴 결제: 메뉴 리스트 ── */}
        {payMode === "menu" && (
          <div style={s.menuList}>
            {MENU.map((m, i) => (
              <div key={i} style={s.menuRow} onClick={() => openOrder(m)} role="button" tabIndex={0}>
                <div style={s.menuInfo}>
                  <span style={s.menuName}>{t(m.nameKey)}</span>
                  <span style={s.menuPrice}>{formatAmountStr(m.price)}</span>
                </div>
                <div style={s.menuThumb} />
              </div>
            ))}
          </div>
        )}

        {/* ── 포인트 결제 ── */}
        {payMode === "point" && (
          <div style={s.pointArea}>
            {/* 포인트 입력 카드 */}
            <div style={s.ptCard}>
              <span style={s.ptCardTitle}>{t("restaurantDetail.pointInput")}</span>
              <div style={s.ptInputBox}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={pointAmount > 0 ? pointAmount.toLocaleString() : ""}
                  onChange={(e) => handlePointChange(e.target.value)}
                  placeholder="0"
                  style={s.ptInput}
                />
              </div>
            </div>

            {/* 결제수단 카드 */}
            <div style={s.ptCard}>
              <div style={s.ptPayHeader}>
                <span style={s.ptCardTitle}>{t("gift.paymentMethod")}</span>
                <span style={s.ptBadge}>
                  {t("restaurantDetail.availableTotal", { amount: formatAmountStr("167,000") })}
                </span>
              </div>
              <div style={s.ptMethodList}>
                {/* 기업포인트 (선택) */}
                <button style={s.ptRowBtn} onClick={() => togglePt("corp")}>
                  <div style={s.ptRowLeft}>
                    <PtCheck checked={corpOn} />
                    <span style={s.ptLabel}>{t("gift.corpPoint")}</span>
                  </div>
                  <div style={s.ptRight}>
                    <span style={{ ...s.ptValue, color: colors.gray1 }}>{formatAmountStr("37,000")}</span>
                    <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
                  </div>
                </button>
                {/* 사용가능 포인트 (기업포인트 종속) */}
                <div style={s.ptSubBox}>
                  <span style={s.ptSubLabel}>{t("gift.corpAvailable")}</span>
                  <span style={s.ptSubAmount}>{formatAmountStr("29,000")}</span>
                </div>

                <div style={s.ptDivider} />

                {/* 올리브 포인트 (선택) */}
                <button style={s.ptRowBtn} onClick={() => togglePt("olive")}>
                  <div style={s.ptRowLeft}>
                    <PtCheck checked={oliveOn} />
                    <span style={s.ptLabel}>{t("gift.olivePoint")}</span>
                  </div>
                  <div style={s.ptRight}>
                    <span style={s.ptValue}>{formatAmountStr("138,000")}</span>
                    <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
        )}

        {/* ── 미리주문 탭 (카테고리 + 메뉴) ── */}
        {tab === "preorder" && (
          <div style={s.preorderArea}>
            <div style={s.catChipRow}>
              {CATEGORIES.map((c, i) => {
                const active = preorderCat === i;
                return (
                  <button
                    key={c}
                    onClick={() => setPreorderCat(i)}
                    style={{
                      ...s.catChip,
                      backgroundColor: active ? colors.black : colors.white,
                      color: active ? colors.white : colors.gray2,
                      border: active ? "none" : `1px solid ${colors.gray5}`,
                    }}
                  >
                    {t(c)}
                  </button>
                );
              })}
            </div>
            <div style={s.menuList}>
              {MENU.map((m, i) => (
                <div key={i} style={s.menuRow} onClick={() => openOrder(m)} role="button" tabIndex={0}>
                  <div style={s.menuInfo}>
                    <span style={s.menuName}>{t(m.nameKey)}</span>
                    <span style={s.menuPrice}>{formatAmountStr(m.price)}</span>
                  </div>
                  <div style={s.menuThumb} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 하단 버튼 (포인트 결제) ── */}
      {tab === "onsite" && payMode === "point" && (
        <div style={s.bottomBar}>
          <button style={s.payTogetherBtn}>{t("restaurantDetail.payTogether")}</button>
          <button style={s.paySoloBtn}>{t("restaurantDetail.paySolo")}</button>
        </div>
      )}

      {/* ── 매장 지도 ── */}
      {showMap && <StoreMapPage nameKey={nameKey} onBack={() => setShowMap(false)} />}

      {/* ── 전화 액션시트 (iOS 스타일) ── */}
      {showCall && (
        <div
          style={{ ...s.actionOverlay, opacity: callIn ? 1 : 0 }}
          onClick={closeCall}
        >
          <div
            style={{ ...s.actionWrap, transform: callIn ? "translateY(0)" : "translateY(100%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={s.actionGroup}>
              <div style={s.actionHeader}>02-1234-5678</div>
              <div style={s.actionSep} />
              <button style={s.actionCall} onClick={closeCall}>{t("restaurantDetail.call")}</button>
            </div>
            <button style={s.actionCancel} onClick={closeCall}>{t("common.cancel")}</button>
          </div>
        </div>
      )}

      {/* ── 메뉴 주문 팝업 (간편식 주문 패널과 동일 디자인) ── */}
      {orderMenu && (
        <div style={s.orderOverlay} onClick={() => setOrderMenu(null)}>
          <div style={s.orderSheet} onClick={(e) => e.stopPropagation()}>
            {/* 수량 선택 */}
            <div style={s.orderQtySection}>
              <div style={s.orderHeaderRow}>
                <span style={s.orderName}>{t(orderMenu.nameKey)}</span>
                <span style={s.orderTotal}>{formatAmount(orderUnitPrice * orderQty)}</span>
              </div>
              <div style={s.orderQtyRow}>
                <div style={s.orderQtyControl}>
                  <button
                    style={s.orderQtyBtn}
                    onClick={() => setOrderQty((q) => Math.max(1, q - 1))}
                    aria-label={t("common.decreaseQty")}
                  >
                    <Minus size={17} strokeWidth={2} color={orderQty <= 1 ? colors.gray3 : colors.black} />
                  </button>
                  <span style={s.orderQtyValue}>{orderQty}</span>
                  <button
                    style={s.orderQtyBtn}
                    onClick={() => setOrderQty((q) => q + 1)}
                    aria-label={t("common.increaseQty")}
                  >
                    <Plus size={17} strokeWidth={2} color={colors.black} />
                  </button>
                </div>
              </div>
            </div>

            {/* 담기 / 바로 결제 */}
            <div style={s.orderBtnRow}>
              <button style={s.orderCartBtn} onClick={handleOrderAddCart}>
                <ShoppingCart size={16} strokeWidth={2.2} color={colors.primary} />
                <span style={s.orderCartText}>{t("simpleMealDetail.addToCart")}</span>
              </button>
              <button style={s.orderPayBtn} onClick={handleOrderDirectPay}>
                <span style={s.orderPayText}>{t("simpleMealDetail.directPay")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PtCheck({ checked }: { checked: boolean }) {
  return (
    <div style={{
      width: 22,
      height: 22,
      borderRadius: radius.full,
      border: checked ? "none" : `2px solid ${colors.gray3}`,
      backgroundColor: checked ? colors.primary : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
      {checked && <Check size={13} strokeWidth={3} color={colors.white} />}
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
    zIndex: 130,
  },
  scroll: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  belowTab: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F7F7F7",
    paddingBottom: 40,
  },

  // 히어로
  hero: {
    position: "relative",
    width: "100%",
    height: 240,
    backgroundColor: colors.gray6,
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  circleBtn: {
    width: 38,
    height: 38,
    minWidth: 38,
    minHeight: 38,
    flexShrink: 0,
    boxSizing: "border-box",
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.92)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 11,
    fontWeight: 700,
    lineHeight: "18px",
    textAlign: "center",
    boxSizing: "border-box",
    boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
  },
  heroBack: {
    position: "absolute",
    top: 14,
    left: spacing.lg,
  },
  heroActions: {
    position: "absolute",
    top: 14,
    right: spacing.lg,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },

  // 이름
  titleSection: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: 20,
    paddingBottom: 16,
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  name: {
    ...headerTitleBase,
    fontSize: 22,
    color: colors.black,
    margin: 0,
    whiteSpace: "normal",
    flex: 1,
    minWidth: 0,
  },
  mapBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    height: 34,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: radius.full,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 13,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    flexShrink: 0,
  },
  greeting: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    margin: 0,
    marginTop: 8,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.gray7,
    marginTop: 16,
    marginBottom: 14,
  },
  infoTagRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  infoTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    height: 28,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    backgroundColor: colors.gray6,
    border: "none",
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },

  sectionBand: {
    height: 8,
    backgroundColor: colors.gray6,
    flexShrink: 0,
    marginTop: 8,
  },

  // 탭
  tabBar: {
    display: "flex",
    flexDirection: "row",
    borderBottom: `1px solid ${colors.gray5}`,
  },
  tabItem: {
    position: "relative",
    flex: 1,
    backgroundColor: "transparent",
    border: "none",
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 16,
    letterSpacing: -0.3,
    cursor: "pointer",
    fontFamily,
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.black,
  },

  // 결제 토글
  toggleWrap: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: 16,
    paddingBottom: 8,
  },
  toggleTrack: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    padding: 4,
    backgroundColor: colors.gray5,
    borderRadius: radius.full,
  },
  toggleBtn: {
    flex: 1,
    height: 40,
    borderRadius: radius.full,
    border: "none",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    transition: "background-color 0.15s, color 0.15s",
  },

  // 미리주문 (카테고리 + 메뉴)
  preorderArea: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
  },
  catChipRow: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: 16,
    paddingBottom: 8,
    overflowX: "auto",
    scrollbarWidth: "none",
  } as CSSProperties,
  catChip: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: radius.full,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  // 메뉴 리스트
  menuList: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 8,
    backgroundColor: colors.white,
  },
  menuRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    borderBottom: `1px solid ${colors.gray6}`,
    cursor: "pointer",
  },
  menuInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
    flex: 1,
  },
  menuName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  menuPrice: {
    fontSize: 17,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.3,
  },
  menuThumb: {
    width: 82,
    height: 82,
    borderRadius: 12,
    backgroundColor: colors.gray6,
    flexShrink: 0,
  },

  // ── 포인트 결제 (카드형) ──
  pointArea: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    backgroundColor: "#F7F7F7",
    padding: spacing.lg,
  },
  ptCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: "18px 18px",
    display: "flex",
    flexDirection: "column",
  },
  ptCardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ptCardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
  },
  ptReset: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary,
    letterSpacing: -0.3,
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    fontFamily,
  },
  ptInputBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    border: `1.5px solid ${colors.gray7}`,
    borderRadius: 12,
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 14,
    backgroundColor: "#F7F7F7",
  },
  ptInput: {
    flex: 1,
    minWidth: 0,
    width: "100%",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 17,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.3,
    textAlign: "left",
    fontFamily,
    padding: 0,
  },
  ptPayHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  ptBadge: {
    display: "inline-flex",
    alignItems: "center",
    height: 26,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    fontSize: 12,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.2,
  },
  ptSubBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginLeft: 34,
    marginTop: 2,
    marginBottom: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
  },
  ptSubLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  ptSubAmount: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  ptMethodList: {
    display: "flex",
    flexDirection: "column",
    marginTop: 6,
  },
  ptRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 18,
    paddingBottom: 18,
  },
  ptRowBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 18,
    paddingBottom: 18,
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily,
  },
  ptRowLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  ptIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.gray6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  ptLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.16,
  },
  ptRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  ptValue: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.18,
  },
  ptDivider: {
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 14,
    marginBottom: 8,
  },

  // 하단 버튼
  bottomBar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    gap: 10,
    padding: "16px 16px 24px",
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    flexShrink: 0,
  },
  payTogetherBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: `1.5px solid ${colors.primary}`,
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily,
  },
  paySoloBtn: {
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

  // 전화 액션시트 (iOS 스타일)
  actionOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 8,
    transition: "opacity 0.24s ease",
    fontFamily,
  },
  actionWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    transition: "transform 0.24s cubic-bezier(0.22,1,0.36,1)",
  },
  actionGroup: {
    backgroundColor: "rgba(249,249,249,0.94)",
    borderRadius: 14,
    overflow: "hidden",
    backdropFilter: "blur(10px)",
  } as CSSProperties,
  actionHeader: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    paddingTop: 14,
    paddingBottom: 14,
  },
  actionSep: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  actionCall: {
    width: "100%",
    height: 56,
    border: "none",
    backgroundColor: "transparent",
    fontSize: 18,
    fontWeight: 600,
    color: colors.primary,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
  actionCancel: {
    width: "100%",
    height: 56,
    borderRadius: 14,
    border: "none",
    backgroundColor: colors.white,
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },

  // ── 메뉴 주문 팝업 (간편식 주문 패널과 동일) ──
  orderOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    fontFamily,
  },
  orderSheet: {
    position: "relative",
    zIndex: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
    flexShrink: 0,
  },
  orderQtySection: {
    backgroundColor: colors.bg,
    borderRadius: 12,
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    marginBottom: 14,
  },
  orderHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 12,
  },
  orderName: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    lineHeight: "15px",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
    flex: 1,
  },
  orderTotal: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.17,
    lineHeight: "15px",
    flexShrink: 0,
  },
  orderQtyRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  orderQtyControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 90,
    height: 32,
    backgroundColor: colors.white,
    borderRadius: 6,
    border: `1px solid ${colors.gray5}`,
    paddingTop: 0,
    paddingRight: 2,
    paddingBottom: 0,
    paddingLeft: 2,
  },
  orderQtyBtn: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    flexShrink: 0,
  },
  orderQtyValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.14,
    textAlign: "center",
    lineHeight: "20px",
    minWidth: 20,
    flex: 1,
  },
  orderBtnRow: {
    display: "flex",
    gap: 10,
  },
  orderCartBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 48,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 12,
    border: `1.5px solid ${colors.primary}`,
    backgroundColor: colors.white,
    flexShrink: 0,
    cursor: "pointer",
    fontFamily,
  },
  orderCartText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.15,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  orderPayBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.primary,
    overflow: "hidden",
    cursor: "pointer",
    fontFamily,
  },
  orderPayText: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};
