/**
 * 내 정보 수정 페이지
 */
import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronDown, Search, MapPin } from "lucide-react";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";

const inputBg = "#F7F7F9";
const shadow = "0 1px 6px rgba(0,0,0,0.06)";

// ─── Mock address data ───────────────────────────────────────
interface AddressResult {
  zipcode: string;
  road: string;
  jibun: string;
}

const MOCK_ADDRESSES: AddressResult[] = [
  { zipcode: "06236", road: "서울 강남구 대치동 번화가로 123", jibun: "서울 강남구 대치동 890-12" },
  { zipcode: "06241", road: "서울 강남구 테헤란로 152", jibun: "서울 강남구 역삼동 737" },
  { zipcode: "06164", road: "서울 강남구 영동대로 513", jibun: "서울 강남구 삼성동 159" },
  { zipcode: "13494", road: "경기 성남시 분당구 판교역로 235", jibun: "경기 성남시 분당구 삼평동 681" },
  { zipcode: "04516", road: "서울 중구 세종대로 110", jibun: "서울 중구 태평로1가 31" },
  { zipcode: "07335", road: "서울 영등포구 여의공원로 101", jibun: "서울 영등포구 여의도동 23" },
];

// ─── Component ───────────────────────────────────────────────
interface UserProfileEditPageProps {
  onBack?: () => void;
  onClose?: () => void;
  onSave?: () => void;
}

export default function UserProfileEditPage({
  onBack,
  onClose,
  onSave,
}: UserProfileEditPageProps) {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language === "ko";
  const goBack = onClose || onBack || (() => {});

  // ── Form state ──
  const [name, setName] = useState("홍길동");
  const [nickname, setNickname] = useState("제이콤");

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [addressZipcode, setAddressZipcode] = useState("06236");
  const [address, setAddress] = useState(
    "서울 강남구 대치동 번화가로 대치타워존",
  );
  const [addressDetail, setAddressDetail] = useState("201-20");

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // ── Address search state ──
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const [addrStep, setAddrStep] = useState<"search" | "confirm" | "detail">("search");
  const [addrQuery, setAddrQuery] = useState("");
  const [addrResults, setAddrResults] = useState<AddressResult[]>([]);
  const [addrSearched, setAddrSearched] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState<AddressResult | null>(null);
  const [newDetail, setNewDetail] = useState("");
  const addrInputRef = useRef<HTMLInputElement>(null);

  const openAddressSearch = () => {
    setShowAddressSearch(true);
    setAddrStep("search");
    setAddrQuery("");
    setAddrResults([]);
    setAddrSearched(false);
    setSelectedAddr(null);
    setNewDetail("");
  };

  const handleAddrSearch = () => {
    if (!addrQuery.trim()) return;
    const q = addrQuery.trim().toLowerCase();
    const filtered = MOCK_ADDRESSES.filter(
      (a) =>
        a.road.toLowerCase().includes(q) ||
        a.jibun.toLowerCase().includes(q) ||
        a.zipcode.includes(q),
    );
    setAddrResults(filtered);
    setAddrSearched(true);
  };

  const handleAddrSelect = (addr: AddressResult) => {
    setSelectedAddr(addr);
    setAddrStep("confirm");
  };

  const handleAddrConfirm = () => {
    setAddrStep("detail");
    setNewDetail("");
  };

  const handleAddrComplete = () => {
    if (selectedAddr) {
      const full = newDetail.trim()
        ? `${selectedAddr.road} ${newDetail.trim()}`
        : selectedAddr.road;
      setAddress(full);
      setAddressDetail(newDetail.trim());
      setAddressZipcode(selectedAddr.zipcode);
    }
    setShowAddressSearch(false);
  };

  useEffect(() => {
    if (showAddressSearch && addrStep === "search") {
      setTimeout(() => addrInputRef.current?.focus(), 200);
    }
  }, [showAddressSearch, addrStep]);

  // ── Input style helper ──
  const getInputStyle = (fieldName: string): CSSProperties => ({
    ...s.input,
    backgroundColor: focusedField === fieldName ? colors.white : inputBg,
  });

  const getSelectStyle = (fieldName: string, hasValue: boolean): CSSProperties => ({
    ...s.select,
    backgroundColor: focusedField === fieldName ? colors.white : inputBg,
    color: hasValue || focusedField === fieldName ? colors.black : colors.gray2,
  });

  // ── Year / Month / Day options ──
  const currentYear = 2026;
  const years = Array.from({ length: 80 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={s.overlay}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={goBack}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("userProfile.editTitle")}</span>
          </div>
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        {/* 개인 정보 */}
        <div style={s.card}>
          <div style={s.field}>
            <span style={s.fieldLabel}>{t("userProfile.name")}</span>
            <input
              style={getInputStyle("name")}
              type="text"
              placeholder={t("signup.nameInput")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div style={s.field}>
            <span style={s.fieldLabel}>{t("userProfile.nickname")}</span>
            <input
              style={getInputStyle("nickname")}
              type="text"
              placeholder={t("signup.nicknameInput")}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onFocus={() => setFocusedField("nickname")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        {/* 추가 정보 */}
        <div style={s.card}>
          <div style={s.field}>
            <span style={s.fieldLabel}>{t("userProfile.birthday")}</span>
            <div style={s.selectGroup}>
              <div style={s.selectWrap}>
                <select
                  style={getSelectStyle("year", !!birthYear)}
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  onFocus={() => setFocusedField("year")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">{t("signup.yearSelect")}</option>
                  {years.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  color={colors.gray2}
                  style={s.selectChevron}
                />
              </div>
              <div style={s.selectWrap}>
                <select
                  style={getSelectStyle("month", !!birthMonth)}
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  onFocus={() => setFocusedField("month")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">{t("signup.monthSelect")}</option>
                  {months.map((m) => (
                    <option key={m} value={String(m)}>
                      {m}월
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  color={colors.gray2}
                  style={s.selectChevron}
                />
              </div>
              <div style={s.selectWrap}>
                <select
                  style={getSelectStyle("day", !!birthDay)}
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  onFocus={() => setFocusedField("day")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">{t("signup.daySelect")}</option>
                  {days.map((d) => (
                    <option key={d} value={String(d)}>
                      {d}일
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  color={colors.gray2}
                  style={s.selectChevron}
                />
              </div>
            </div>
          </div>

          <div style={s.field}>
            <span style={s.fieldLabel}>{t("userProfile.gender")}</span>
            <div style={s.radioGroup}>
              <label style={s.radioItem}>
                <span
                  style={{
                    ...s.radioCircle,
                    borderColor:
                      gender === "male" ? colors.primary : colors.gray5,
                  }}
                >
                  {gender === "male" && <span style={s.radioDot} />}
                </span>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  style={{ display: "none" }}
                />
                <span style={s.radioLabel}>{t("signup.male")}</span>
              </label>
              <label style={s.radioItem}>
                <span
                  style={{
                    ...s.radioCircle,
                    borderColor:
                      gender === "female" ? colors.primary : colors.gray5,
                  }}
                >
                  {gender === "female" && <span style={s.radioDot} />}
                </span>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  style={{ display: "none" }}
                />
                <span style={s.radioLabel}>{t("signup.female")}</span>
              </label>
            </div>
          </div>

          <div style={s.field}>
            <span style={s.fieldLabel}>{t("userProfile.address")}</span>
            {isKo ? (
              /* 한국어: 주소 검색 모달 방식 */
              <div style={s.addrCard}>
                {/* 헤더 영역 */}
                <div style={s.addrCardHeader}>
                  <span style={s.addrZipcode}>({addressZipcode})</span>
                  <button style={s.addrSearchBtn} onClick={openAddressSearch}>
                    {t("signup.addressSearchBtn")}
                  </button>
                </div>
                {/* 콘텐츠 영역: 주소 전체 텍스트 */}
                <div style={s.addrCardContent}>
                  <span style={s.addrFullText}>
                    {address}{addressDetail ? `, ${addressDetail}` : ""}
                  </span>
                </div>
              </div>
            ) : (
              /* 영어/베트남어: 입력창만 노출 (최대 3줄 자동 확장) */
              <textarea
                style={{
                  ...getInputStyle("address"),
                  resize: "none" as const,
                  overflow: "hidden",
                  minHeight: 46,
                  maxHeight: 46 + 24 * 2,
                  lineHeight: "24px",
                }}
                rows={1}
                placeholder={t("signup.addressInput")}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  const el = e.target;
                  el.style.height = "auto";
                  el.style.height = `${Math.min(el.scrollHeight, 46 + 24 * 2)}px`;
                }}
                onFocus={(e) => {
                  setFocusedField("address");
                  const el = e.target;
                  el.style.height = "auto";
                  el.style.height = `${Math.min(el.scrollHeight, 46 + 24 * 2)}px`;
                }}
                onBlur={() => setFocusedField(null)}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── 하단 고정 버튼 ── */}
      <div style={s.bottomBar}>
        <div style={s.bottomBtns}>
          <button style={s.btnSecondary} onClick={goBack}>
            {t("common.cancel")}
          </button>
          <button style={s.btnPrimary} onClick={() => setShowConfirmDialog(true)}>
            {t("common.save")}
          </button>
        </div>
      </div>

      {/* ── Confirm Dialog ── */}
      {showConfirmDialog && (
        <EditConfirmDialog
          message={t("userProfile.saveConfirmTitle")}
          onCancel={() => setShowConfirmDialog(false)}
          onConfirm={() => {
            setShowConfirmDialog(false);
            onSave?.();
          }}
        />
      )}

      {/* ── Address Search Modal (한국어 전용) ── */}
      {isKo && showAddressSearch && (
        <AddressSearchModal
          step={addrStep}
          query={addrQuery}
          onQueryChange={setAddrQuery}
          onSearch={handleAddrSearch}
          results={addrResults}
          searched={addrSearched}
          onSelect={handleAddrSelect}
          selectedAddr={selectedAddr}
          onConfirm={handleAddrConfirm}
          onReSearch={() => setAddrStep("search")}
          detailValue={newDetail}
          onDetailChange={setNewDetail}
          onComplete={handleAddrComplete}
          onClose={() => setShowAddressSearch(false)}
          inputRef={addrInputRef}
        />
      )}
    </div>
  );
}

// ─── Address Search Modal ──────────────────────────────────
interface AddressSearchModalProps {
  step: "search" | "confirm" | "detail";
  query: string;
  onQueryChange: (v: string) => void;
  onSearch: () => void;
  results: AddressResult[];
  searched: boolean;
  onSelect: (addr: AddressResult) => void;
  selectedAddr: AddressResult | null;
  onConfirm: () => void;
  onReSearch: () => void;
  detailValue: string;
  onDetailChange: (v: string) => void;
  onComplete: () => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function AddressSearchModal({
  step,
  query,
  onQueryChange,
  onSearch,
  results,
  searched,
  onSelect,
  selectedAddr,
  onConfirm,
  onReSearch,
  detailValue,
  onDetailChange,
  onComplete,
  onClose,
  inputRef,
}: AddressSearchModalProps) {
  const { t } = useTranslation();
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setSlideIn(true));
  }, []);

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(onClose, 250);
  };

  const stepTitle =
    step === "search"
      ? t("signup.addressSearchTitle")
      : step === "confirm"
        ? t("signup.addressConfirmTitle")
        : t("signup.addressDetailTitle");

  return (
    <div
      style={{
        ...am.overlay,
        opacity: slideIn ? 1 : 0,
      }}
    >
      <div
        style={{
          ...am.page,
          transform: slideIn ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div style={am.header}>
          <div style={am.headerInner}>
            <div style={am.headerLeftGroup}>
              <button style={am.backBtn} onClick={step === "detail" ? () => onConfirm : step === "confirm" ? onReSearch : handleClose}>
                <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
              </button>
              <span style={am.headerTitle}>{stepTitle}</span>
            </div>
          </div>
        </div>

        {/* Step 1: Search */}
        {step === "search" && (
          <div style={am.content}>
            <div style={am.searchBar}>
              <input
                ref={inputRef}
                style={am.searchInput}
                type="text"
                placeholder={t("signup.addressSearchPlaceholder")}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />
              <button style={am.searchBtn} onClick={onSearch}>
                <Search size={18} strokeWidth={2.4} color={colors.white} />
              </button>
            </div>
            <p style={am.hint}>{t("signup.addressSearchHint")}</p>

            <div style={am.resultArea}>
              {searched && results.length === 0 && (
                <div style={am.emptyWrap}>
                  <MapPin size={40} strokeWidth={1.5} color={colors.gray4} />
                  <p style={am.emptyText}>{t("signup.addressSearchNoResult")}</p>
                </div>
              )}
              {results.map((addr, idx) => (
                <button
                  key={idx}
                  style={am.resultItem}
                  onClick={() => onSelect(addr)}
                >
                  <div style={am.resultInfo}>
                    <span style={am.resultRoad}>({addr.zipcode}) {addr.road}</span>
                    <div style={am.resultBadgeRow}>
                      <span style={am.badgeJibun}>{t("signup.addressJibun")}</span>
                      <span style={am.resultJibun}>{addr.jibun}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Confirm */}
        {step === "confirm" && selectedAddr && (
          <div style={am.content}>
            <p style={am.confirmGuide}>{t("signup.addressConfirmGuide")}</p>
            <div style={am.confirmCard}>
              <div style={am.confirmInfo}>
                <span style={{ ...am.resultRoad, fontSize: 15 }}>({selectedAddr.zipcode}) {selectedAddr.road}</span>
                <div style={am.resultBadgeRow}>
                  <span style={am.badgeJibun}>{t("signup.addressJibun")}</span>
                  <span style={am.resultJibun}>{selectedAddr.jibun}</span>
                </div>
              </div>
            </div>
            <div style={am.confirmBtns}>
              <button style={am.reSearchBtn} onClick={onReSearch}>
                {t("signup.addressReSearch")}
              </button>
              <button style={am.confirmBtn} onClick={onConfirm}>
                {t("common.confirm")}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Detail address */}
        {step === "detail" && selectedAddr && (
          <div style={am.content}>
            <p style={am.confirmGuide}>{t("signup.addressDetailGuide")}</p>
            <div style={am.detailSelectedCard}>
              <span style={am.detailZipcode}>({selectedAddr.zipcode})</span>
              <span style={am.detailSelectedText}>{selectedAddr.road}</span>
            </div>
            <input
              style={am.detailInput}
              type="text"
              placeholder={t("signup.addressDetailPlaceholder")}
              value={detailValue}
              onChange={(e) => onDetailChange(e.target.value)}
              autoFocus
            />
            <button
              style={{
                ...am.completeBtn,
                opacity: 1,
              }}
              onClick={onComplete}
            >
              {t("signup.addressComplete")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Address Modal Styles ───────────────────────────────────
const am: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "transparent",
    zIndex: 500,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    transition: "opacity 0.25s ease",
    fontFamily,
  },
  page: {
    width: "100%",
    maxWidth: 420,
    height: "100%",
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
    overflow: "hidden",
  },
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
    width: 30, height: 30,
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "transparent", border: "none", cursor: "pointer", padding: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },
  closeBtn: {
    width: 30, height: 30,
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "transparent", border: "none", cursor: "pointer", padding: 0,
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  searchBar: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingTop: 13, paddingRight: 16, paddingBottom: 13, paddingLeft: 16,
    border: `1.5px solid ${colors.gray5}`,
    borderRadius: 10,
    backgroundColor: inputBg,
    fontSize: 15,
    fontWeight: 400,
    color: colors.black,
    fontFamily,
    outline: "none",
  },
  searchBtn: {
    width: 48, height: 48,
    borderRadius: 10,
    backgroundColor: colors.primary,
    border: "none",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  hint: {
    fontSize: 13,
    color: colors.gray2,
    marginTop: 10,
    marginBottom: 0,
  },
  resultArea: {
    marginTop: 16,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  emptyWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: colors.gray2,
    margin: 0,
  },
  resultItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "14px 4px",
    borderBottom: `1px solid ${colors.gray5}`,
    backgroundColor: "transparent",
    border: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid" as const,
    borderBottomColor: colors.gray5,
    cursor: "pointer",
    textAlign: "left" as const,
    fontFamily,
    width: "100%",
  },
  resultIcon: {
    width: 32, height: 32,
    borderRadius: "50%",
    backgroundColor: "#FFF0F0",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  resultInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  resultBadgeRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  badgeRoad: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.primary,
    backgroundColor: "#FFF0F0",
    borderRadius: 4,
    paddingTop: 2, paddingRight: 6, paddingBottom: 2, paddingLeft: 6,
    flexShrink: 0,
  },
  badgeJibun: {
    fontSize: 11,
    fontWeight: 600,
    color: "#8E8E93",
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    paddingTop: 2, paddingRight: 6, paddingBottom: 2, paddingLeft: 6,
    flexShrink: 0,
  },
  resultRoad: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
  },
  resultJibun: {
    fontSize: 13,
    fontWeight: 400,
    color: colors.gray2,
  },
  resultZip: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.gray3,
    marginTop: 2,
  },
  confirmGuide: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    marginTop: 0,
    marginBottom: 20,
  },
  confirmCard: {
    display: "flex",
    gap: 14,
    padding: 20,
    backgroundColor: "transparent",
    borderRadius: 12,
    border: `1px solid ${colors.gray5}`,
  },
  confirmInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  confirmBtns: {
    display: "flex",
    gap: 10,
    marginTop: 24,
  },
  reSearchBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: "#F3F4F6",
    fontSize: 16,
    fontWeight: 700,
    color: "#6E6F70",
    cursor: "pointer",
    fontFamily,
  },
  confirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.primary,
    fontSize: 16,
    fontWeight: 700,
    color: colors.white,
    cursor: "pointer",
    fontFamily,
  },
  detailSelectedCard: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    border: `1px solid ${colors.gray5}`,
    marginBottom: 12,
  },
  detailZipcode: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
  },
  detailSelectedText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
  },
  detailInput: {
    width: "100%",
    paddingTop: 13, paddingRight: 16, paddingBottom: 13, paddingLeft: 16,
    border: `1.5px solid ${colors.primary}`,
    borderRadius: 10,
    backgroundColor: colors.white,
    fontSize: 15,
    fontWeight: 400,
    color: colors.black,
    fontFamily,
    outline: "none",
  },
  completeBtn: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: colors.primary,
    fontSize: 16,
    fontWeight: 700,
    color: colors.white,
    cursor: "pointer",
    fontFamily,
    marginTop: 20,
  },
};

// ─── Confirm Dialog ────────────────────────────────────────
function EditConfirmDialog({
  message,
  onCancel,
  onConfirm,
}: {
  message: string;
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
        ...cd.overlay,
        opacity: fadeIn ? 1 : 0,
      }}
      onClick={handleCancel}
    >
      <div
        style={{
          ...cd.dialog,
          transform: fadeIn ? "scale(1)" : "scale(0.92)",
          opacity: fadeIn ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={cd.message}>{message}</p>
        <div style={cd.btnRow}>
          <button style={cd.cancelBtn} onClick={handleCancel}>
            {t("common.cancel")}
          </button>
          <button style={cd.confirmBtn} onClick={handleConfirm}>
            {t("common.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

const cd: Record<string, CSSProperties> = {
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
    transition: "transform 0.2s ease, opacity 0.2s ease",
  },
  message: {
    fontSize: 17,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    margin: 0,
    marginBottom: 28,
    textAlign: "center",
  },
  btnRow: {
    display: "flex",
    width: "100%",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    border: "none",
    backgroundColor: "#F3F4F6",
    fontSize: 16,
    fontWeight: 700,
    color: "#6E6F70",
    letterSpacing: -0.16,
    cursor: "pointer",
    fontFamily,
  },
  confirmBtn: {
    flex: 1,
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

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 210,
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

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 130,
    paddingLeft: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  /* Card */
  card: {
    background: colors.white,
    borderRadius: 12,
    boxShadow: shadow,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  /* Field */
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
  },

  /* Input */
  input: {
    width: "100%",
    paddingTop: 13,
    paddingRight: 16,
    paddingBottom: 13,
    paddingLeft: 16,
    border: `1.5px solid ${colors.gray5}`,
    borderRadius: 10,
    backgroundColor: inputBg,
    fontSize: 15,
    fontWeight: 400,
    color: colors.black,
    fontFamily,
    outline: "none",
  },
  readonlyInput: {
    backgroundColor: "#F0F0F2",
    color: colors.gray2,
    cursor: "default",
  },

  /* Address row */
  addressRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  addrSearchBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
    paddingRight: 14,
    paddingBottom: 6,
    paddingLeft: 14,
    backgroundColor: colors.primary,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    flexShrink: 0,
    whiteSpace: "nowrap" as const,
    fontSize: 13,
    fontWeight: 600,
    color: colors.white,
    fontFamily,
  },
  addrSearchBtnText: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.white,
    fontFamily,
  },

  /* Input with action button */
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputWithAction: {
    paddingRight: 68,
  },
  inputActionBtn: {
    position: "absolute",
    right: 8,
    paddingTop: 6,
    paddingRight: 14,
    paddingBottom: 6,
    paddingLeft: 14,
    background: colors.primary,
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    color: colors.white,
    cursor: "pointer",
    fontFamily,
  },

  /* Select group (생년월일) */
  selectGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
  },
  selectWrap: {
    position: "relative",
  },
  select: {
    width: "100%",
    paddingTop: 13,
    paddingRight: 28,
    paddingBottom: 13,
    paddingLeft: 14,
    border: `1.5px solid ${colors.gray5}`,
    borderRadius: 10,
    backgroundColor: inputBg,
    fontSize: 14,
    color: colors.gray2,
    fontFamily,
    outline: "none",
    appearance: "none" as const,
    cursor: "pointer",
    WebkitAppearance: "none" as const,
  },
  selectChevron: {
    position: "absolute" as const,
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none" as const,
  },

  /* Radio group (성별) */
  radioGroup: {
    display: "flex",
    gap: 20,
    paddingTop: 2,
  },
  radioItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: `2px solid ${colors.gray5}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.black,
  },

  /* Bottom Bar */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
  },
  bottomBtns: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  btnSecondary: {
    flex: 1,
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: "#6E6F70",
    letterSpacing: -0.15,
    fontFamily,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  },
  btnPrimary: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
    fontFamily,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  },

  /* Bubble Button */
  bubbleWrap: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 2,
  },
  bubbleArrow: {
    position: "absolute",
    top: -6,
    left: 24,
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: `6px solid ${colors.gray5}`,
  },
  bubbleBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    paddingTop: 9,
    paddingRight: 14,
    paddingBottom: 9,
    paddingLeft: 14,
    background: colors.white,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 20,
    cursor: "pointer",
    fontFamily,
  },
  bubbleIcon: {
    width: 19,
    height: 19,
    borderRadius: "50%",
    backgroundColor: "#EAEAEA",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    color: colors.black,
    lineHeight: 1,
    flexShrink: 0,
  },
  bubbleText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
    whiteSpace: "nowrap" as const,
  },

  /* Phone Notice */
  phoneNotice: {
    marginTop: 2,
    paddingTop: 2,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 2,
  },
  phoneNoticeText: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.primary,
    lineHeight: 1.5,
  },

  /* Address Card */
  addrCard: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    backgroundColor: inputBg,
    borderRadius: 10,
    border: `1.5px solid ${colors.gray5}`,
    padding: 16,
  },
  addrCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addrZipcode: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
  },
  addrCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  addrFullText: {
    fontSize: 15,
    fontWeight: 400,
    color: colors.black,
  },
};