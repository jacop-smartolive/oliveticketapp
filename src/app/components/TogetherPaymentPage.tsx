/**
 * 같이결제 (대표자) — Phase 1
 * - 가맹점 상세 > 포인트 결제 > "같이 결제" 클릭 시 진입
 * - 상단 주문정보(가맹점명/총금액/인원) + 결제자 리스트(금액 입력) + 인원 추가 + 1/N 나누기
 * ※ 공통 디자인 토큰/규칙 준수
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronDown, Search, X, Check, Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import { formatAmount } from "../shared/formatters";
import { showPlainToast } from "../shared/toast";
import { PaymentCompletePopup } from "./PaymentPopup";

interface Payer {
  id: number;
  nameKey: string;
  deptKey: string;
  amount: number;
  isSelf?: boolean;
}

interface Candidate {
  id: number;
  nameKey: string;
  deptKey: string;
}

// 인원 추가 후보 (같은 회사)
const ADD_POOL: Candidate[] = [
  { id: 101, nameKey: "mock.nameSantos", deptKey: "mock.deptDev" },
  { id: 102, nameKey: "mock.nameChoiGimin", deptKey: "mock.deptStrategyBiz" },
  { id: 103, nameKey: "mock.nameShinJongho", deptKey: "mock.deptStrategyBiz" },
  { id: 104, nameKey: "mock.nameYoonSeoa", deptKey: "mock.deptMarketing" },
  { id: 105, nameKey: "mock.nameShinAra", deptKey: "mock.deptManagement" },
];

// 최근 같이결제자
const RECENT: Candidate[] = [
  { id: 102, nameKey: "mock.nameChoiGimin", deptKey: "mock.deptStrategyBiz" },
  { id: 103, nameKey: "mock.nameShinJongho", deptKey: "mock.deptStrategyBiz" },
];

interface MenuLine {
  label: string;
  price: number; // 단가
  qty: number; // 수량
}

interface TogetherPaymentPageProps {
  storeNameKey: string;
  totalAmount: number;
  onBack: () => void;
  onProceed?: (payers: Payer[]) => void;
  /** "menu": 메뉴보기 노출 / "point": 미노출 */
  mode?: "menu" | "point";
  /** 메뉴결제 시 주문 메뉴 목록 */
  menu?: MenuLine[];
}

export default function TogetherPaymentPage({
  storeNameKey,
  totalAmount,
  onBack,
  onProceed,
  mode = "menu",
  menu = [],
}: TogetherPaymentPageProps) {
  const { t } = useTranslation();

  const [payers, setPayers] = useState<Payer[]>([
    { id: 0, nameKey: "mock.nameHong", deptKey: "mock.deptStrategy", amount: 0, isSelf: true },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true); // 디폴트: 펼친 상태
  const [applyMenu, setApplyMenu] = useState<MenuLine | null>(null); // 메뉴 금액 적용 팝업
  const [assignQty, setAssignQty] = useState<Record<number, number>>({}); // 메뉴별 인원 수량 배정

  const openApply = (m: MenuLine) => {
    setApplyMenu(m);
    setAssignQty({});
  };
  const assignedTotal = Object.values(assignQty).reduce((s, n) => s + n, 0);
  const remainingQty = applyMenu ? applyMenu.qty - assignedTotal : 0;
  const incAssign = (id: number) => {
    if (remainingQty <= 0) return;
    setAssignQty((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const decAssign = (id: number) => {
    setAssignQty((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  };
  const commitAssign = () => {
    if (!applyMenu) return;
    const unit = applyMenu.price;
    setPayers((prev) =>
      prev.map((p) => {
        const n = assignQty[p.id] || 0;
        return n > 0 ? { ...p, amount: p.amount + n * unit } : p;
      })
    );
    setApplyMenu(null);
    setAssignQty({});
  };

  // Phase 2 — 허용요청 → 결제(QR 팝업) → 완료
  const [step, setStep] = useState<"config" | "allow">("config");
  const [allowedIds, setAllowedIds] = useState<Set<number>>(new Set());
  const [showQr, setShowQr] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const others = payers.filter((p) => !p.isSelf);
  const allAllowed = others.length === 0 || others.every((p) => allowedIds.has(p.id));

  const handleBack = () => {
    if (step === "allow") setStep("config");
    else onBack();
  };
  const goAllow = () => {
    onProceed?.(payers);
    setStep("allow");
  };
  const confirmAllows = () => {
    // 결제 허용 확인 — 새로고침 시 허용된 인원 반영 (mock: 전원 허용)
    setAllowedIds(new Set(others.map((o) => o.id)));
  };
  const requestAllow = () => showPlainToast(t("togetherPay.allowRequestSent"));
  const goPay = () => {
    if (!allAllowed) {
      showPlainToast(t("togetherPay.notAllAllowedMsg"));
      return;
    }
    setShowQr(true);
  };

  const isMenuMode = mode === "menu" && menu.length > 0;
  const computedTotal = isMenuMode
    ? menu.reduce((sum, m) => sum + m.price * m.qty, 0)
    : totalAmount;

  const addPayer = (c: Candidate) => {
    setPayers((prev) => {
      if (prev.some((p) => p.id === c.id)) return prev;
      return [...prev, { id: c.id, nameKey: c.nameKey, deptKey: c.deptKey, amount: 0 }];
    });
  };
  const removePayer = (id: number) => {
    setPayers((prev) => prev.filter((p) => p.id !== id));
  };
  const setAmount = (id: number, raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    const val = digits ? parseInt(digits, 10) : 0;
    setPayers((prev) => prev.map((p) => (p.id === id ? { ...p, amount: val } : p)));
  };

  // 1/N 나누기 — 비대표자는 10원 단위 내림, 대표자가 나머지 흡수
  const applySplit = () => {
    const n = payers.length;
    if (n === 0) return;
    const base = Math.floor(computedTotal / n / 10) * 10;
    const rest = computedTotal - base * (n - 1);
    setPayers((prev) =>
      prev.map((p) => ({ ...p, amount: p.isSelf ? rest : base }))
    );
    setShowSplit(false);
  };

  const deptText = (deptKey: string) => `${t("mock.company")} | ${t(deptKey)}`;

  return (
    <div style={s.screen}>
      {/* ── Header ── */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={handleBack} aria-label={t("common.back")}>
          <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
        </button>
        <h1 style={s.headerTitle}>{t("togetherPay.title")}</h1>
      </div>

      {/* ── 인원/금액 구성 (config) ── */}
      {step === "config" && (
      <>
      <div style={s.scroll}>
        {/* 주문 정보 */}
        <div style={s.orderBox}>
          <div style={s.storeRow}>
            <span style={s.storeName}>{t(storeNameKey)}</span>
            {isMenuMode && (
              <button style={s.menuToggle} onClick={() => setMenuOpen((v) => !v)}>
                <span style={s.menuToggleText}>{t("togetherPay.viewMenu")}</span>
                <ChevronDown
                  size={16}
                  strokeWidth={2.2}
                  color={colors.gray1}
                  style={{
                    transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>
            )}
          </div>

          {/* 메뉴 리스트 (메뉴결제 + 펼침) */}
          {isMenuMode && menuOpen && (
            <div style={s.menuList}>
              {menu.map((m, i) => (
                <div
                  key={i}
                  style={{ ...s.menuRow, ...(i === menu.length - 1 ? { borderBottom: "none" } : {}) }}
                >
                  <div style={s.menuInfo}>
                    <span style={s.menuName}>{m.label}</span>
                    <span style={s.menuSub}>
                      {t("togetherPay.qtyUnit", { count: m.qty })} · {t("togetherPay.unitPriceLabel")} {formatAmount(m.price)}
                    </span>
                  </div>
                  <div style={s.menuRight}>
                    <span style={s.menuPrice}>{formatAmount(m.price * m.qty)}</span>
                    <button style={s.menuSelectBtn} onClick={() => openApply(m)}>
                      {t("togetherPay.select")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={s.orderRow}>
            <span style={s.orderLabel}>{t("togetherPay.totalLabel")}</span>
            <div style={s.orderRight}>
              <span style={s.orderAmount}>{formatAmount(computedTotal)}</span>
              <span style={s.orderPeople}>{t("togetherPay.peopleUnit", { count: payers.length })}</span>
            </div>
          </div>
        </div>

        {/* 결제자 리스트 */}
        <div style={s.payerList}>
          {payers.map((p) => (
            <div key={p.id} style={s.payerRow}>
              <div style={s.payerInfo}>
                <div style={s.payerNameRow}>
                  <span style={s.payerName}>{t(p.nameKey)}</span>
                  {p.isSelf && <span style={s.meBadge}>{t("togetherPay.me")}</span>}
                </div>
                <span style={s.payerDept}>{t(p.deptKey)}</span>
              </div>
              <div style={s.amountBox}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={p.amount > 0 ? p.amount.toLocaleString() : ""}
                  onChange={(e) => setAmount(p.id, e.target.value)}
                  placeholder="0"
                  style={s.amountInput}
                />
              </div>
              {p.isSelf ? (
                <div style={s.selfCheck}>
                  <Check size={14} strokeWidth={3} color={colors.white} />
                </div>
              ) : (
                <button style={s.removeBtn} onClick={() => removePayer(p.id)} aria-label={t("common.delete")}>
                  <X size={16} strokeWidth={2.4} color={colors.gray2} />
                </button>
              )}
            </div>
          ))}

          {/* 인원 추가 / 1/N 나누기 */}
          <div style={s.actionRow}>
            <button style={s.addPersonBtn} onClick={() => setShowAdd(true)}>
              <Plus size={14} strokeWidth={2.6} color={colors.primary} />
              <span style={s.addPersonText}>{t("togetherPay.addPerson")}</span>
            </button>
            <button style={s.splitBtn} onClick={() => setShowSplit(true)}>
              {t("togetherPay.splitN")}
            </button>
          </div>
        </div>

        {/* 최근 같이결제자 */}
        <div style={s.recentSection}>
          <span style={s.recentTitle}>{t("togetherPay.recentPayers")}</span>
          <div style={s.recentChips}>
            {RECENT.map((c) => (
              <button key={c.id} style={s.recentChip} onClick={() => addPayer(c)}>
                <Plus size={13} strokeWidth={2.6} color={colors.white} />
                <span style={s.recentChipText}>{t(c.nameKey)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 하단 버튼 ── */}
      <div style={s.bottomBar}>
        <button style={s.cancelBtn} onClick={onBack}>{t("common.cancel")}</button>
        <button style={s.nextBtn} onClick={goAllow}>{t("togetherPay.next")}</button>
      </div>
      </>
      )}

      {/* ── 결제 허용 여부 (allow) ── */}
      {step === "allow" && (
      <>
      <div style={s.scroll}>
        <div style={s.orderBox}>
          <span style={s.storeName}>{t(storeNameKey)}</span>
          <div style={s.orderRow}>
            <span style={s.orderLabel}>{t("togetherPay.totalLabel")}</span>
            <div style={s.orderRight}>
              <span style={s.orderAmount}>{formatAmount(computedTotal)}</span>
              <span style={s.orderPeople}>{t("togetherPay.peopleUnit", { count: payers.length })}</span>
            </div>
          </div>
        </div>

        <div style={s.allowList}>
          {payers.map((p) => {
            const isAllowed = p.isSelf || allowedIds.has(p.id);
            return (
              <div key={p.id} style={s.allowRow}>
                <div style={s.payerInfo}>
                  <div style={s.payerNameRow}>
                    <span style={s.payerName}>{t(p.nameKey)}</span>
                  </div>
                  <span style={s.payerDept}>{t(p.deptKey)}</span>
                </div>
                <span style={s.allowAmount}>{formatAmount(p.amount)}</span>
                {p.isSelf ? (
                  <span style={s.repBadge}>{t("togetherPay.representative")}</span>
                ) : (
                  <button
                    style={isAllowed ? s.allowedBadge : s.pendingBadge}
                    onClick={isAllowed ? undefined : requestAllow}
                  >
                    {isAllowed ? t("togetherPay.allowed") : t("togetherPay.notAllowed")}
                  </button>
                )}
              </div>
            );
          })}

          <button style={s.allowConfirmBtn} onClick={confirmAllows}>
            {t("togetherPay.allowConfirm")}
          </button>

          <div style={s.allowNoteBox}>
            <span style={s.allowNote}>{t("togetherPay.allowNote")}</span>
          </div>
        </div>
      </div>

      <div style={s.bottomBar}>
        <button style={s.cancelBtn} onClick={onBack}>{t("common.cancel")}</button>
        <button
          style={{ ...s.nextBtn, ...(allAllowed ? {} : { opacity: 0.5 }) }}
          onClick={goPay}
        >
          {t("togetherPay.pay")}
        </button>
      </div>
      </>
      )}

      {/* ── 결제하기 (QR 팝업) ── */}
      {showQr && (
        <div style={s.qrOverlay} onClick={() => setShowQr(false)}>
          <div style={s.qrCard} onClick={(e) => e.stopPropagation()}>
            <span style={s.qrTitle}>{t("togetherPay.qrTitle")}</span>
            <span style={s.qrMeta}>{t("togetherPay.title")} | 2023.09.06 11:13</span>
            <button style={s.qrPressBtn} onClick={() => { setShowQr(false); setShowComplete(true); }}>
              <span style={s.qrPressAmount}>{formatAmount(computedTotal)}</span>
              <span style={s.qrPressText}>{t("togetherPay.qrPress")}</span>
            </button>
            <span style={s.qrGuide}>{t("togetherPay.qrGuide")}</span>
            <button style={s.qrCancelBtn} onClick={() => setShowQr(false)}>{t("togetherPay.qrCancel")}</button>
            <div style={s.qrDivider} />
            <div style={s.qrInfoRow}>
              <span style={s.qrInfoLabel}>{t("togetherPay.qrPayNumber")}</span>
              <span style={s.qrInfoValue}>43573942875</span>
            </div>
            <div style={s.qrInfoRow}>
              <span style={s.qrInfoLabel}>{t("togetherPay.qrStore")}</span>
              <span style={s.qrInfoValue}>{t(storeNameKey)}</span>
            </div>
            <div style={s.barcode} />
          </div>
        </div>
      )}

      {/* ── 결제 완료 ── */}
      {showComplete && (
        <PaymentCompletePopup
          amount={computedTotal}
          onClose={onBack}
          onAdditionalPay={onBack}
        />
      )}

      {/* ── 인원 추가 ── */}
      {showAdd && (
        <AddPersonSheet
          existing={payers.map((p) => p.id)}
          onClose={() => setShowAdd(false)}
          onConfirm={(cs) => {
            cs.forEach(addPayer);
            setShowAdd(false);
          }}
        />
      )}

      {/* ── 1/N 나누기 ── */}
      {showSplit && (
        <div style={s.splitOverlay} onClick={() => setShowSplit(false)}>
          <div style={s.splitSheet} onClick={(e) => e.stopPropagation()}>
            <span style={s.splitTitle}>{t("togetherPay.splitTitle")}</span>
            <div style={s.splitRow}>
              <span style={s.splitLabel}>{t("togetherPay.splitTotalAmount")}</span>
              <span style={s.splitValue}>{formatAmount(computedTotal)}</span>
            </div>
            <div style={s.splitRow}>
              <span style={s.splitLabel}>{t("togetherPay.splitTotalPeople")}</span>
              <span style={s.splitValue}>{t("togetherPay.peopleUnit", { count: payers.length })}</span>
            </div>
            <div style={s.splitNoteBox}>
              <span style={s.splitNote}>* {t("togetherPay.splitNote1")}</span>
              <span style={s.splitNote}>* {t("togetherPay.splitNote2")}</span>
            </div>
            <div style={s.splitBtnRow}>
              <button style={s.splitCancelBtn} onClick={() => setShowSplit(false)}>{t("common.cancel")}</button>
              <button style={s.splitApplyBtn} onClick={applySplit}>{t("togetherPay.apply")}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 메뉴 금액 적용 (사람별 수량 배정) ── */}
      {applyMenu && (
        <div style={s.splitOverlay} onClick={() => setApplyMenu(null)}>
          <div style={s.applySheet} onClick={(e) => e.stopPropagation()}>
            <div style={s.applyHeader}>
              <span style={s.applyTitle}>{t("togetherPay.applyMenuTitle")}</span>
              <button style={s.applyClose} onClick={() => setApplyMenu(null)} aria-label={t("common.cancel")}>
                <X size={18} strokeWidth={2.4} color={colors.gray1} />
              </button>
            </div>
            <div style={s.applyMenuRow}>
              <div style={s.menuInfo}>
                <span style={s.applyMenuName}>{applyMenu.label}</span>
                <span style={s.applyMenuSub}>
                  {t("togetherPay.unitPriceLabel")} {formatAmount(applyMenu.price)} · {t("togetherPay.remainingQty", { count: remainingQty })}
                </span>
              </div>
              <span style={s.applyMenuPrice}>{formatAmount(applyMenu.price * applyMenu.qty)}</span>
            </div>
            <div style={s.applyPayerList}>
              {payers.map((p) => {
                const n = assignQty[p.id] || 0;
                return (
                  <div key={p.id} style={s.applyPayerRow}>
                    <div style={s.applyPayerInfo}>
                      <div style={s.payerNameRow}>
                        <span style={s.applyPayerName}>{t(p.nameKey)}</span>
                        {p.isSelf && <span style={s.meBadge}>{t("togetherPay.me")}</span>}
                      </div>
                      <span style={s.payerDept}>{t(p.deptKey)}</span>
                    </div>
                    <div style={s.stepper}>
                      <button
                        style={s.stepBtn}
                        onClick={() => decAssign(p.id)}
                        aria-label={t("common.decreaseQty")}
                      >
                        <Minus size={16} strokeWidth={2} color={n <= 0 ? colors.gray3 : colors.black} />
                      </button>
                      <span style={s.stepVal}>{n}</span>
                      <button
                        style={s.stepBtn}
                        onClick={() => incAssign(p.id)}
                        aria-label={t("common.increaseQty")}
                      >
                        <Plus size={16} strokeWidth={2} color={remainingQty <= 0 ? colors.gray3 : colors.black} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              style={{ ...s.applyConfirmBtn, ...(assignedTotal === 0 ? { opacity: 0.4 } : {}) }}
              disabled={assignedTotal === 0}
              onClick={commitAssign}
            >
              {t("togetherPay.apply")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 인원 추가 시트 (검색 + 라디오 선택) ──────────────────────────
function AddPersonSheet({
  existing,
  onClose,
  onConfirm,
}: {
  existing: number[];
  onClose: () => void;
  onConfirm: (cs: Candidate[]) => void;
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [selIds, setSelIds] = useState<Set<number>>(new Set());
  const toggleSel = (id: number) =>
    setSelIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const list = query.trim()
    ? ADD_POOL.filter((c) => t(c.nameKey).includes(query.trim()))
    : ADD_POOL;

  const deptText = (deptKey: string) => `${t("mock.company")} | ${t(deptKey)}`;

  return (
    <div style={s.addScreen}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={onClose} aria-label={t("common.back")}>
          <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
        </button>
        <h1 style={s.headerTitle}>{t("togetherPay.addPerson")}</h1>
      </div>

      {/* 검색 */}
      <div style={s.searchWrap}>
        <div style={s.searchBox}>
          <Search size={18} strokeWidth={2} color={colors.gray2} />
          <input
            style={s.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={t("togetherPay.searchPlaceholder")}
          />
          {query && (
            <button style={s.searchClear} onClick={() => setQuery("")} aria-label={t("common.delete")}>
              <X size={16} strokeWidth={2.4} color={colors.white} />
            </button>
          )}
        </div>
        {focused && (
          <button style={s.searchCancel} onClick={() => { setQuery(""); setFocused(false); }}>
            {t("common.cancel")}
          </button>
        )}
      </div>

      {/* 목록 */}
      <div style={s.addList}>
        {list.map((c) => {
          const added = existing.includes(c.id);
          const selected = selIds.has(c.id);
          return (
            <button
              key={c.id}
              style={s.addRow}
              disabled={added}
              onClick={() => toggleSel(c.id)}
            >
              <span
                style={{
                  ...s.radio,
                  ...(selected
                    ? { backgroundColor: colors.primary, border: "none" }
                    : { border: `2px solid ${colors.gray3}` }),
                  ...(added ? { opacity: 0.4 } : {}),
                }}
              >
                {selected && <Check size={12} strokeWidth={3} color={colors.white} />}
              </span>
              <div style={s.addInfo}>
                <div style={s.addNameRow}>
                  <span style={{ ...s.addName, ...(added ? { color: colors.gray3 } : {}) }}>{t(c.nameKey)}</span>
                  <span style={s.addNick}>hong</span>
                </div>
                <span style={s.addDept}>{deptText(c.deptKey)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 하단 */}
      <div style={s.bottomBar}>
        <button style={s.cancelBtn} onClick={onClose}>{t("common.cancel")}</button>
        <button
          style={{ ...s.nextBtn, ...(selIds.size === 0 ? { opacity: 0.4 } : {}) }}
          disabled={selIds.size === 0}
          onClick={() => {
            const cs = ADD_POOL.filter((x) => selIds.has(x.id));
            if (cs.length) onConfirm(cs);
          }}
        >
          {t("togetherPay.confirm")}
        </button>
      </div>
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
    backgroundColor: colors.bg,
    fontFamily,
    zIndex: 210,
  },
  addScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
    zIndex: 220,
  },

  /* Header */
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 54,
    paddingLeft: 10,
    paddingRight: 16,
    backgroundColor: colors.white,
    flexShrink: 0,
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    zIndex: 2,
  },
  backBtn: {
    width: 34,
    height: 34,
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

  scroll: {
    flex: 1,
    overflowY: "auto",
  },

  /* 주문 정보 */
  orderBox: {
    backgroundColor: colors.white,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  storeName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  orderRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  orderRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.3,
  },
  orderPeople: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },

  /* 결제자 리스트 */
  payerList: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingTop: 8,
    paddingBottom: 20,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  payerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  payerInfo: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  payerNameRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  payerName: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  meBadge: {
    display: "inline-flex",
    alignItems: "center",
    height: 18,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: radius.full,
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: -0.2,
  },
  payerDept: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  amountBox: {
    width: 120,
    height: 44,
    display: "flex",
    alignItems: "center",
    border: `1px solid ${colors.gray5}`,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: colors.white,
    flexShrink: 0,
  },
  amountInput: {
    width: "100%",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    textAlign: "right",
    fontFamily,
    padding: 0,
  },
  selfCheck: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    backgroundColor: colors.gray3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  removeBtn: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    backgroundColor: colors.gray6,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    padding: 0,
  },

  /* 인원추가 / 1N */
  actionRow: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  addPersonBtn: {
    flex: 1,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 10,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.white,
    cursor: "pointer",
    fontFamily,
  },
  addPersonText: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.2,
  },
  splitBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },

  /* 최근 */
  recentSection: {
    marginTop: 8,
    backgroundColor: colors.white,
    paddingTop: 18,
    paddingBottom: 24,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  recentChips: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  recentChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    height: 34,
    paddingLeft: 12,
    paddingRight: 14,
    borderRadius: radius.full,
    backgroundColor: "#3A3B3D",
    border: "none",
    cursor: "pointer",
    fontFamily,
  },
  recentChipText: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.white,
    letterSpacing: -0.2,
  },

  /* 하단 버튼 */
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: "12px 16px 20px",
    backgroundColor: colors.white,
    boxShadow: "0 -1px 8px rgba(0,0,0,0.06)",
    flexShrink: 0,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.gray6,
    color: colors.gray1,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
  nextBtn: {
    flex: 2,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },

  /* 인원추가 검색 */
  searchWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    backgroundColor: colors.white,
    flexShrink: 0,
  },
  searchBox: {
    flex: 1,
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    backgroundColor: colors.inputBg,
    paddingLeft: 12,
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
    fontFamily,
    padding: 0,
  },
  searchClear: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: colors.gray3,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    padding: 0,
  },
  searchCancel: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    flexShrink: 0,
  },

  /* 인원추가 목록 */
  addList: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  addRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: `1px solid ${colors.gray6}`,
    cursor: "pointer",
    fontFamily,
    textAlign: "left",
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  addInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  addNameRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  addName: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  addNick: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  addDept: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
  },

  /* 1/N 시트 */
  splitOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 230,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    fontFamily,
  },
  splitSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
  },
  splitTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    marginBottom: 16,
  },
  splitRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingBottom: 6,
  },
  splitLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  splitValue: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  splitNoteBox: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    marginBottom: 16,
  },
  splitNote: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    lineHeight: 1.5,
  },
  splitBtnRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  splitCancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.gray6,
    color: colors.gray1,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
  splitApplyBtn: {
    flex: 2,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },

  /* ── 메뉴 보기 (메뉴결제) ── */
  storeRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  menuToggle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontFamily,
    flexShrink: 0,
  },
  menuToggleText: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  menuList: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${colors.gray5}`,
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 12,
    marginBottom: 4,
  },
  menuRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottom: `1px solid ${colors.gray6}`,
  },
  menuInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  menuName: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
    minWidth: 0,
  },
  menuSub: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  menuRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },
  menuPrice: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  menuSelectBtn: {
    height: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: radius.full,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    flexShrink: 0,
  },

  /* ── 메뉴 금액 적용 시트 ── */
  applySheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 18,
    paddingRight: 20,
    paddingBottom: 24,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    maxHeight: "80%",
  },
  applyHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  applyTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  applyClose: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.gray6,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  },
  applyMenuRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 8,
  },
  applyMenuName: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    minWidth: 0,
  },
  applyMenuSub: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  stepper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 96,
    height: 34,
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 8,
    paddingLeft: 2,
    paddingRight: 2,
    flexShrink: 0,
  },
  stepBtn: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    flexShrink: 0,
  },
  stepVal: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  applyConfirmBtn: {
    width: "100%",
    height: 50,
    marginTop: 16,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
  },
  applyMenuPrice: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  applyPayerList: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  applyPayerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 14,
    paddingBottom: 14,
    borderBottom: `1px solid ${colors.gray6}`,
  },
  applyPayerInfo: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  applyPayerName: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  applyBtn: {
    height: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: radius.full,
    border: "none",
    backgroundColor: "#3A3B3D",
    color: colors.white,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    flexShrink: 0,
  },

  /* ── 결제 허용 여부 (allow) ── */
  allowList: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 24,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  allowRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  allowAmount: {
    fontSize: 15,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  repBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    minWidth: 54,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: radius.full,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  allowedBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    minWidth: 54,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: radius.full,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "default",
    fontFamily,
    flexShrink: 0,
  },
  pendingBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    minWidth: 54,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: radius.full,
    border: `1px solid ${colors.gray3}`,
    backgroundColor: colors.white,
    color: colors.gray2,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    flexShrink: 0,
  },
  allowConfirmBtn: {
    width: "100%",
    height: 46,
    borderRadius: 10,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    marginTop: 4,
  },
  allowNoteBox: {
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    padding: 14,
  },
  allowNote: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    lineHeight: 1.6,
    whiteSpace: "pre-line",
  },

  /* ── 결제하기 (QR 팝업) ── */
  qrOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 240,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    overflowY: "auto",
  },
  qrCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.white,
    borderRadius: 16,
    boxShadow: "0 12px 40px rgba(0,0,0,0.24)",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  qrMeta: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    marginTop: 8,
  },
  qrPressBtn: {
    width: "100%",
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    fontFamily,
  },
  qrPressAmount: {
    fontSize: 30,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: -0.5,
  },
  qrPressText: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.white,
    letterSpacing: -0.2,
  },
  qrGuide: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    textAlign: "center",
    lineHeight: 1.5,
    marginTop: 14,
  },
  qrCancelBtn: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    marginTop: 14,
  },
  qrDivider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.gray5,
    marginTop: 18,
    marginBottom: 14,
  },
  qrInfoRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 4,
  },
  qrInfoLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },
  qrInfoValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  barcode: {
    width: "100%",
    height: 64,
    marginTop: 16,
    borderRadius: 6,
    background:
      "repeating-linear-gradient(90deg, #191A1C 0, #191A1C 2px, transparent 2px, transparent 4px, #191A1C 4px, #191A1C 7px, transparent 7px, transparent 9px)",
  },
};
