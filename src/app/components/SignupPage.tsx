/**
 * 회원가입 페이지 (4 스텝 + 완료)
 *
 * Step 1: 약관 동의
 * Step 2: 이메일/비밀번호
 * Step 3: 소속 정보
 * Step 4: 개인 정보
 * Done: 가입 완료
 */
import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Eye, EyeOff, ChevronDown, CheckCircle, Search, MapPin } from "lucide-react";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";
import { showSuccessToast } from "../shared/toast";

// Mock 기업코드 데이터
const MOCK_COMPANY_CODES: Record<string, string> = {
  "1234": "신세계푸드",
  "5678": "삼성전자",
  "9999": "LG전자",
  "0000": "현대자동차",
  "1111": "SK하이닉스",
};

const departments = [
  "경영지원팀", "인사팀", "재무팀", "회계팀", "기획팀",
  "전략기획팀", "영업팀", "마케팅팀", "홍보팀", "개발팀",
  "IT팀", "운영팀", "고객지원팀", "물류팀", "구매팀",
  "법무팀", "연구개발팀",
];
const positions = [
  "사원", "주임", "대리", "과장", "차장", "부장",
  "이사", "상무", "전무", "대표",
];

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
interface SignupPageProps {
  onBack: () => void;
  onGoLogin?: () => void;
}

export default function SignupPage({ onBack, onGoLogin }: SignupPageProps) {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language === "ko";
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Step 1: 약관
  const [chkAll, setChkAll] = useState(false);
  const [chk1, setChk1] = useState(false);
  const [chk2, setChk2] = useState(false);
  const [chk3, setChk3] = useState(false);

  // Step 2: 이메일/비밀번호
  const [companyCode, setCompanyCode] = useState("");
  const [companyVerified, setCompanyVerified] = useState(false);
  const [verifiedCompanyName, setVerifiedCompanyName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [timer, setTimer] = useState(180);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showPwFields, setShowPwFields] = useState(false);
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // Step 3: 소속 정보
  const [empName, setEmpName] = useState("");
  const [empOrg, setEmpOrg] = useState("");
  const [empId, setEmpId] = useState("");
  const [empDept, setEmpDept] = useState("");
  const [empPosition, setEmpPosition] = useState("");

  // Step 4: 개인 정보
  const [nickname, setNickname] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // ── Address search state ──
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const [addrStep, setAddrStep] = useState<"search" | "confirm" | "detail">("search");
  const [addrQuery, setAddrQuery] = useState("");
  const [addrResults, setAddrResults] = useState<AddressResult[]>([]);
  const [addrSearched, setAddrSearched] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState<AddressResult | null>(null);
  const [newDetail, setNewDetail] = useState("");
  const addrInputRef = useRef<HTMLInputElement>(null);

  // Done
  const [isDone, setIsDone] = useState(false);

  // Validation — field-level inline errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const validationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFieldError = (field: string, msg: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: msg }));
    if (validationTimer.current) clearTimeout(validationTimer.current);
    validationTimer.current = setTimeout(() => setFieldErrors({}), 4000);
  };

  const clearFieldErrors = () => setFieldErrors({});

  // legacy compat — Step 1 terms 등 특정 필드 없는 경우
  const showValidation = (msg: string) => {
    showFieldError("_general", msg);
  };

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(180);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (validationTimer.current) clearTimeout(validationTimer.current);
    };
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const ss = sec % 60;
    return `${m}:${ss < 10 ? "0" : ""}${ss}`;
  };

  // ── Address search functions ──
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

  const handleToggleAll = () => {
    const next = !chkAll;
    setChkAll(next);
    setChk1(next);
    setChk2(next);
    setChk3(next);
  };

  const updateAll = (c1: boolean, c2: boolean, c3: boolean) => {
    setChkAll(c1 && c2 && c3);
  };

  const handleNext = () => {
    clearFieldErrors();
    // ── Step별 유효성 검사 ──
    if (step === 1) {
      if (!chk1 || !chk2) {
        showFieldError("_general", t("signup.valRequiredTerms"));
        return;
      }
    } else if (step === 2) {
      if (!signupEmail.trim()) {
        showFieldError("signupEmail", t("signup.valEmail"));
        return;
      }
      if (!emailVerified) {
        showFieldError("signupEmail", t("signup.valEmailVerify"));
        return;
      }
      if (!pw1.trim()) {
        showFieldError("pw1", t("signup.valPassword"));
        return;
      }
      if (pw1.length < 8) {
        showFieldError("pw1", t("signup.valPasswordLength"));
        return;
      }
      if (!pw2.trim()) {
        showFieldError("pw2", t("signup.valPasswordReenter"));
        return;
      }
      if (pw1 !== pw2) {
        showFieldError("pw2", t("signup.valPasswordMismatch"));
        return;
      }
    } else if (step === 3) {
      if (!empName.trim()) {
        showFieldError("empName", t("signup.valName"));
        return;
      }
      if (!empId.trim()) {
        showFieldError("empId", t("signup.valEmpId"));
        return;
      }
      if (!empDept) {
        showFieldError("empDept", t("signup.valDept"));
        return;
      }
      if (!empPosition) {
        showFieldError("empPosition", t("signup.valPosition"));
        return;
      }
    }
    // Step 4는 모두 선택사항이므로 검사 없음

    clearFieldErrors();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsDone(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const getInputStyle = (field: string, extra?: CSSProperties): CSSProperties => ({
    ...s.input,
    ...extra,
    backgroundColor: focusedField === field ? colors.white : "#FAFAFA",
    ...(fieldErrors[field] ? { borderColor: colors.primary } : {}),
  });

  const getSelectStyle = (field: string): CSSProperties => ({
    ...s.select,
    backgroundColor: focusedField === field ? colors.white : "#FAFAFA",
    ...(fieldErrors[field] ? { borderColor: colors.primary } : {}),
  });

  const pwMatchMsg =
    pw2.length > 0 && focusedField !== "pw2"
      ? pw1 === pw2
        ? { text: t("signup.passwordMatch"), color: colors.success }
        : { text: t("signup.passwordMismatch"), color: colors.primary }
      : null;

  const nextBtnText = step === totalSteps ? t("signup.complete") : t("signup.next");

  // ── 인라인 필드 에러 렌더 헬퍼 ──
  const renderFieldError = (field: string) =>
    fieldErrors[field] ? (
      <span style={s.fieldError}>{fieldErrors[field]}</span>
    ) : null;

  // ── 완료 화면 ──
  if (isDone) {
    return (
      <div style={s.overlay}>
        <div style={s.doneWrap}>
          <div style={s.doneIcon}>
            <CheckCircle size={32} strokeWidth={2} color={colors.primary} />
          </div>
          <div style={s.doneTitle}>{t("signup.doneTitle")}</div>
          <div style={s.doneDesc}>
            {t("signup.doneDesc").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </div>
          <button style={s.doneBtnPrimary} onClick={onGoLogin || onBack}>
            {t("signup.goLogin")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.overlay}>
      {/* ── Header with Step Bar ── */}
      <div style={s.headerCol}>
        <div style={s.headerTop}>
          <div style={s.headerLeftGroup}>
            <button onClick={handlePrev} style={s.backBtn}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("signup.title")}</span>
          </div>
          <span style={s.stepCount}>{step} / {totalSteps}</span>
        </div>
        <div style={s.stepBar}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              style={{
                ...s.stepSeg,
                backgroundColor: i < step ? colors.primary : colors.gray5,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        {/* ──── STEP 1: 약관 동의 ──── */}
        {step === 1 && (
          <div style={s.stepContent}>
            <div style={s.pageTitle}>
              {t("signup.termsTitle").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </div>
            <div style={s.termsBox}>
              <div style={s.termsAll} onClick={handleToggleAll}>
                <Checkbox checked={chkAll} onChange={handleToggleAll} />
                <span style={s.termsAllLabel}>{t("signup.agreeAll")}</span>
              </div>
              <div style={s.termsRow}>
                <div style={s.termsRowLeft}>
                  <Checkbox
                    checked={chk1}
                    onChange={() => {
                      const next = !chk1;
                      setChk1(next);
                      updateAll(next, chk2, chk3);
                    }}
                  />
                  <span style={s.termsLabel}>{t("signup.requiredTos")}</span>
                </div>
                <span style={s.termsDetail}>{t("signup.view")}</span>
              </div>
              <div style={s.termsRow}>
                <div style={s.termsRowLeft}>
                  <Checkbox
                    checked={chk2}
                    onChange={() => {
                      const next = !chk2;
                      setChk2(next);
                      updateAll(chk1, next, chk3);
                    }}
                  />
                  <span style={s.termsLabel}>{t("signup.requiredPrivacy")}</span>
                </div>
                <span style={s.termsDetail}>{t("signup.view")}</span>
              </div>
              <div style={{ ...s.termsRow, borderBottom: "none" }}>
                <div style={s.termsRowLeft}>
                  <Checkbox
                    checked={chk3}
                    onChange={() => {
                      const next = !chk3;
                      setChk3(next);
                      updateAll(chk1, chk2, next);
                    }}
                  />
                  <span style={s.termsLabel}>{t("signup.optionalMarketing")}</span>
                </div>
                <span style={s.termsDetail}>{t("signup.view")}</span>
              </div>
            </div>
            {fieldErrors["_general"] && (
              <div style={s.fieldError}>{fieldErrors["_general"]}</div>
            )}
          </div>
        )}

        {/* ──── STEP 2: 이메일 + 비밀번호 ──── */}
        {step === 2 && (
          <div style={s.stepContent}>
            <div style={s.pageTitle}>
              {t("signup.step2Title").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </div>
            <div style={s.pageSub}>{t("signup.step2Sub")}</div>
            <div style={s.fieldsWrap}>
              {/* ── 기업코드 인증 ── */}
              <div style={s.field}>
                <label style={s.fieldLabel}>
                  {t("companyCode.label")} <span style={s.required}>*</span>
                </label>
                <div style={s.inputWithBtn}>
                  <input
                    style={{
                      ...getInputStyle("companyCode", { flex: 1 }),
                      ...(companyVerified
                        ? { backgroundColor: "#FAFAFA", color: colors.black, pointerEvents: "none" as const }
                        : {}),
                    }}
                    type="text"
                    placeholder={companyVerified ? verifiedCompanyName : t("companyCode.placeholder")}
                    value={companyVerified ? verifiedCompanyName : companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    onFocus={() => setFocusedField("companyCode")}
                    onBlur={() => setFocusedField(null)}
                    readOnly={companyVerified}
                  />
                  {!companyVerified && (
                    <button
                      style={s.verifyBtn}
                      onClick={() => {
                        const name = MOCK_COMPANY_CODES[companyCode.trim()];
                        if (name) {
                          setVerifiedCompanyName(name);
                          setCompanyVerified(true);
                          setEmpOrg(name);
                          showSuccessToast(t("companyCode.successToast"));
                        } else {
                          showFieldError("companyCode", t("companyCode.invalidCode"));
                        }
                      }}
                    >
                      {t("companyCode.verifyBtn")}
                    </button>
                  )}
                  {companyVerified && (
                    <button
                      style={{ ...s.verifyBtn, backgroundColor: "#888" }}
                      onClick={() => {
                        setCompanyVerified(false);
                        setVerifiedCompanyName("");
                        setCompanyCode("");
                        setEmpOrg("");
                      }}
                    >
                      {t("companyCode.reverifyBtn")}
                    </button>
                  )}
                </div>
                {renderFieldError("companyCode")}
              </div>

              <div style={s.field}>
                <label style={s.fieldLabel}>
                  {t("signup.emailLabel")} <span style={s.required}>*</span>
                </label>
                <div style={s.inputWithBtn}>
                  <input
                    style={{
                      ...getInputStyle("signupEmail", { flex: 1 }),
                      ...(emailVerified ? { backgroundColor: "#FAFAFA", color: colors.black, pointerEvents: "none" } : {}),
                    }}
                    type="email"
                    placeholder={t("signup.emailInput")}
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    onFocus={() => setFocusedField("signupEmail")}
                    onBlur={() => setFocusedField(null)}
                    readOnly={emailVerified}
                  />
                  {!emailVerified && (
                    <button
                      style={{
                        ...s.verifyBtn,
                        ...(codeSent ? { backgroundColor: "#888" } : {}),
                      }}
                      onClick={() => {
                        if (!signupEmail.trim()) {
                          showFieldError("signupEmail", t("signup.valEmail"));
                          return;
                        }
                        setCodeSent(true);
                        startTimer();
                        alert(t("signup.emailSentAlert"));
                      }}
                    >
                      {codeSent ? t("signup.resendBtn") : t("signup.verifyBtn")}
                    </button>
                  )}
                </div>
                {renderFieldError("signupEmail")}
              </div>

              {codeSent && !emailVerified && (
                <div style={s.field}>
                  <label style={s.fieldLabel}>
                    {t("signup.verifyCodeLabel")} <span style={s.required}>*</span>
                  </label>
                  <div style={s.inputWithBtn}>
                    <input
                      style={getInputStyle("verifyCode", { flex: 1 })}
                      type="text"
                      placeholder={t("signup.verifyCodeInput")}
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      onFocus={() => setFocusedField("verifyCode")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <button
                      style={s.verifyBtn}
                      onClick={() => {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setEmailVerified(true);
                        setShowPwFields(true);
                        showSuccessToast(t("signup.emailVerifiedToast"));
                      }}
                    >
                      {t("common.confirm")}
                    </button>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: timer > 0 ? colors.primary : colors.gray2 }}>
                    {timer > 0 ? formatTimer(timer) : t("signup.timerExpired")}
                  </span>
                </div>
              )}

              <div style={s.field}>
                <label style={s.fieldLabel}>
                  {t("signup.passwordLabel")} <span style={s.required}>*</span>
                </label>
                <div style={s.inputWrapPw}>
                  <input
                    style={getInputStyle("pw1", { paddingRight: 44 })}
                    type={showPw1 ? "text" : "password"}
                    placeholder={t("signup.passwordInput")}
                    value={pw1}
                    onChange={(e) => setPw1(e.target.value)}
                    onFocus={() => setFocusedField("pw1")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button style={s.eyeBtn} onClick={() => setShowPw1(!showPw1)}>
                    {showPw1 ? (
                      <Eye size={18} strokeWidth={1.8} color={colors.gray2} />
                    ) : (
                      <EyeOff size={18} strokeWidth={1.8} color={colors.gray2} />
                    )}
                  </button>
                </div>
                {!fieldErrors["pw1"] && (
                  <span style={s.hint}>{t("signup.passwordHint")}</span>
                )}
                {renderFieldError("pw1")}
              </div>
              <div style={s.field}>
                <label style={s.fieldLabel}>
                  {t("signup.passwordConfirmLabel")} <span style={s.required}>*</span>
                </label>
                <div style={s.inputWrapPw}>
                  <input
                    style={getInputStyle("pw2", { paddingRight: 44 })}
                    type={showPw2 ? "text" : "password"}
                    placeholder={t("signup.passwordConfirmInput")}
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                    onFocus={() => setFocusedField("pw2")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button style={s.eyeBtn} onClick={() => setShowPw2(!showPw2)}>
                    {showPw2 ? (
                      <Eye size={18} strokeWidth={1.8} color={colors.gray2} />
                    ) : (
                      <EyeOff size={18} strokeWidth={1.8} color={colors.gray2} />
                    )}
                  </button>
                </div>
                {!fieldErrors["pw2"] && pwMatchMsg && (
                  <span style={{ fontSize: 12, color: pwMatchMsg.color }}>{pwMatchMsg.text}</span>
                )}
                {renderFieldError("pw2")}
              </div>
            </div>
          </div>
        )}

        {/* ──── STEP 3: 소속 정보 ──── */}
        {step === 3 && (
          <div style={s.stepContent}>
            <div style={s.pageTitle}>
              {t("signup.step3Title").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </div>
            <div style={s.fieldsWrap}>
              <div style={s.field}>
                <label style={s.fieldLabel}>{t("signup.nameLabel")} <span style={s.required}>*</span></label>
                <input
                  style={getInputStyle("empName")}
                  type="text"
                  placeholder={t("signup.nameInput")}
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  onFocus={() => setFocusedField("empName")}
                  onBlur={() => setFocusedField(null)}
                />
                {renderFieldError("empName")}
              </div>
              <div style={s.field}>
                <label style={s.fieldLabel}>{t("signup.empIdLabel")} <span style={s.required}>*</span></label>
                <input
                  style={getInputStyle("empId")}
                  type="text"
                  placeholder={t("signup.empIdInput")}
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  onFocus={() => setFocusedField("empId")}
                  onBlur={() => setFocusedField(null)}
                />
                {renderFieldError("empId")}
              </div>
              <div style={s.field}>
                <label style={s.fieldLabel}>{t("signup.deptLabel")} <span style={s.required}>*</span></label>
                <div style={s.selectWrap}>
                  <select
                    style={{ ...getSelectStyle("empDept"), color: empDept ? colors.black : colors.gray2 }}
                    value={empDept}
                    onChange={(e) => setEmpDept(e.target.value)}
                    onFocus={() => setFocusedField("empDept")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">{t("signup.deptSelect")}</option>
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.gray2} style={selectIconStyle} />
                </div>
                {renderFieldError("empDept")}
              </div>
              <div style={s.field}>
                <label style={s.fieldLabel}>{t("signup.positionLabel")} <span style={s.required}>*</span></label>
                <div style={s.selectWrap}>
                  <select
                    style={{ ...getSelectStyle("empPosition"), color: empPosition ? colors.black : colors.gray2 }}
                    value={empPosition}
                    onChange={(e) => setEmpPosition(e.target.value)}
                    onFocus={() => setFocusedField("empPosition")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">{t("signup.positionSelect")}</option>
                    {positions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.gray2} style={selectIconStyle} />
                </div>
                {renderFieldError("empPosition")}
              </div>
            </div>
          </div>
        )}

        {/* ──── STEP 4: 개인 정보 ──── */}
        {step === 4 && (
          <div style={s.stepContent}>
            <div style={s.pageTitle}>
              {t("signup.step4Title").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </div>
            <div style={s.fieldsWrap}>
              <div style={s.field}>
                <label style={s.fieldLabel}>{t("signup.nicknameLabel")}</label>
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
              <div style={s.field}>
                <label style={s.fieldLabel}>{t("signup.birthdayLabel")}</label>
                <div style={s.dateRow}>
                  <div style={s.selectWrap}>
                    <select
                      style={{ ...getSelectStyle("birthYear"), color: birthYear ? colors.black : colors.gray2 }}
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      onFocus={() => setFocusedField("birthYear")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="">{t("signup.yearSelect")}</option>
                      {Array.from({ length: 61 }, (_, i) => 1950 + i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} strokeWidth={2.5} color={colors.gray2} style={selectIconStyle} />
                  </div>
                  <div style={s.selectWrap}>
                    <select
                      style={{ ...getSelectStyle("birthMonth"), color: birthMonth ? colors.black : colors.gray2 }}
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      onFocus={() => setFocusedField("birthMonth")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="">{t("signup.monthSelect")}</option>
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} strokeWidth={2.5} color={colors.gray2} style={selectIconStyle} />
                  </div>
                  <div style={s.selectWrap}>
                    <select
                      style={{ ...getSelectStyle("birthDay"), color: birthDay ? colors.black : colors.gray2 }}
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      onFocus={() => setFocusedField("birthDay")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="">{t("signup.daySelect")}</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} strokeWidth={2.5} color={colors.gray2} style={selectIconStyle} />
                  </div>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.fieldLabel}>{t("signup.genderLabel")}</label>
                <div style={s.radioGroup}>
                  <label style={s.radioItem}>
                    <span
                      style={{
                        ...s.radioCircle,
                        borderColor: gender === "male" ? colors.primary : colors.gray5,
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
                        borderColor: gender === "female" ? colors.primary : colors.gray5,
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
                <label style={s.fieldLabel}>{t("signup.addressLabel")}</label>
                {isKo ? (
                  /* 한국어: 주소 검색 모달 방식 */
                  address ? (
                    <div style={s.addrCard}>
                      <div style={s.addrCardHeader}>
                        <span style={s.addrZipcode}>({addressZipcode})</span>
                        <button style={s.addrSearchBtn} onClick={openAddressSearch}>
                          {t("signup.addressSearchBtn")}
                        </button>
                      </div>
                      <div style={s.addrCardContent}>
                        <span style={s.addrFullText}>
                          {address}{addressDetail ? `, ${addressDetail}` : ""}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button style={s.addrEmptyBtn} onClick={openAddressSearch}>
                      <Search size={16} strokeWidth={2} color={colors.gray2} />
                      <span>{t("signup.addressInput")}</span>
                    </button>
                  )
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
        )}
      </div>

      {/* ── 하단 고정 버튼 — QR결제하기 동일 ── */}
      <div style={s.bottomBar}>
        <div style={s.bottomBtnRow}>
          {step > 1 && (
            <button style={s.btnPrev} onClick={handlePrev}>
              {t("signup.prevStep")}
            </button>
          )}
          <button style={s.btnPrimary} onClick={handleNext}>
            {nextBtnText}
          </button>
        </div>
      </div>

      {/* ── Address Search Modal (한국어 전용) ── */}
      {isKo && showAddressSearch && (
        <SignupAddressSearchModal
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

// ─── Checkbox Component ──────────────────────────────────────
function Checkbox({ checked, onChange }: { checked: boolean; onChange?: () => void }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: 6,
        border: `2px solid ${checked ? colors.primary : colors.gray3}`,
        backgroundColor: checked ? colors.primary : "transparent",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.15s",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onChange?.();
      }}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M1.5 5.5L4 7.5L8.5 2.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

// ─── Select Icon Position ────────────────────────────────────
const selectIconStyle: CSSProperties = {
  position: "absolute",
  right: 14,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
};

// ─── Address Search Modal ──────────────────────────────────
interface SignupAddressSearchModalProps {
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

function SignupAddressSearchModal({
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
}: SignupAddressSearchModalProps) {
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
    <div style={{ ...am.overlay, opacity: slideIn ? 1 : 0 }}>
      <div style={{ ...am.page, transform: slideIn ? "translateX(0)" : "translateX(100%)" }}>
        {/* Header */}
        <div style={am.header}>
          <div style={am.headerInner}>
            <div style={am.headerLeftGroup}>
              <button style={am.backBtn} onClick={step === "confirm" ? onReSearch : step === "detail" ? onConfirm : handleClose}>
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
                  <MapPin size={40} strokeWidth={1.5} color={colors.gray3} />
                  <p style={am.emptyText}>{t("signup.addressSearchNoResult")}</p>
                </div>
              )}
              {results.map((addr, idx) => (
                <button key={idx} style={am.resultItem} onClick={() => onSelect(addr)}>
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
            <button style={am.completeBtn} onClick={onComplete}>
              {t("signup.addressComplete")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Address Modal Styles ───────────────────────────────────
const inputBg = "#F7F7F9";
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

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 220,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
  },

  /* Header */
  headerCol: {
    backgroundColor: colors.white,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    zIndex: 10,
  },
  headerTop: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 12,
    paddingRight: 16,
    height: 54,
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
    cursor: "pointer",
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },
  stepCount: {
    fontSize: 12,
    color: colors.gray2,
    fontWeight: 500,
  },

  /* Step Bar */
  stepBar: {
    display: "flex",
    gap: 4,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
  },
  stepSeg: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    transition: "background 0.3s",
  },

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
    paddingTop: 28,
    paddingRight: 24,
    paddingBottom: 120,
    paddingLeft: 24,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  stepContent: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  /* Title */
  pageTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.5,
    lineHeight: "1.45",
  },
  pageSub: {
    fontSize: 13,
    color: colors.gray2,
    marginTop: -12,
  },

  /* Fields */
  fieldsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  required: {
    color: colors.primary,
  },
  input: {
    width: "100%",
    paddingTop: 13,
    paddingRight: 16,
    paddingBottom: 13,
    paddingLeft: 16,
    border: `1px solid ${colors.gray5}`,
    borderRadius: 10,
    backgroundColor: colors.bg,
    fontSize: 14,
    color: colors.black,
    fontFamily,
    outline: "none",
    transition: "background 0.2s",
  },
  inputWithBtn: {
    display: "flex",
    gap: 8,
  },
  inputWrapPw: {
    position: "relative",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: colors.gray2,
    display: "flex",
    alignItems: "center",
    padding: 4,
  },
  verifyBtn: {
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    border: "none",
    borderRadius: 10,
    backgroundColor: colors.black,
    fontSize: 13,
    fontWeight: 600,
    color: colors.white,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
    maxWidth: "40%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  hint: {
    fontSize: 12,
    color: colors.gray2,
  },

  /* Select */
  selectWrap: {
    position: "relative",
  },
  select: {
    width: "100%",
    paddingTop: 13,
    paddingRight: 40,
    paddingBottom: 13,
    paddingLeft: 16,
    border: `1.5px solid ${colors.gray5}`,
    borderRadius: 10,
    backgroundColor: colors.bg,
    fontSize: 14,
    color: colors.black,
    fontFamily,
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    transition: "background 0.2s",
    lineHeight: "1.4",
  },
  dateRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
  },

  /* Radio */
  radioGroup: {
    display: "flex",
    gap: 24,
    paddingTop: 2,
  },
  radioItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  radioCircle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: `2px solid ${colors.gray5}`,
    flexShrink: 0,
    transition: "border-color 0.15s",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
  },

  /* Terms */
  termsBox: {
    border: `1.5px solid ${colors.border}`,
    borderRadius: 14,
    overflow: "hidden",
  },
  termsAll: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "16px 18px",
    backgroundColor: colors.bg,
    borderBottom: `1.5px solid ${colors.border}`,
    cursor: "pointer",
  },
  termsAllLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
  },
  termsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: `1px solid ${colors.gray5}`,
    gap: 8,
  },
  termsRowLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  termsLabel: {
    fontSize: 13,
    color: colors.gray1,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
    minWidth: 0,
  },
  termsDetail: {
    fontSize: 12,
    color: colors.gray2,
    textDecoration: "underline",
    textUnderlineOffset: 2,
    flexShrink: 0,
    cursor: "pointer",
  },

  /* Done */
  doneWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: "40px 24px",
    textAlign: "center",
  },
  doneIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#FFF0EE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  doneTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.5,
  },
  doneDesc: {
    fontSize: 14,
    color: colors.gray2,
    lineHeight: "1.7",
  },
  doneBtnPrimary: {
    marginTop: 8,
    width: "100%",
    padding: 16,
    border: "none",
    borderRadius: 14,
    backgroundColor: colors.primary,
    fontSize: 15,
    fontWeight: 600,
    color: colors.white,
    cursor: "pointer",
    fontFamily,
  },

  /* Bottom Bar — QR결제하기 동일 */
  bottomBar: {
    position: "relative",
    zIndex: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    padding: 16,
    paddingBottom: 20,
  },
  bottomBtnRow: {
    display: "flex",
    gap: 10,
  },
  btnPrev: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    width: 100,
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 12,
    border: `1.5px solid ${colors.gray5}`,
    color: colors.gray1,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: -0.16,
    fontFamily,
    cursor: "pointer",
  },
  btnPrimary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.16,
    fontFamily,
    cursor: "pointer",
  },
  fieldError: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },

  /* Address Card — UserProfileEditPage 동일 */
  addrCard: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    border: `1px solid ${colors.gray5}`,
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
  addrEmptyBtn: {
    width: "100%",
    padding: "13px 16px",
    border: `1px solid ${colors.gray5}`,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    fontSize: 14,
    fontWeight: 400,
    color: colors.gray2,
    cursor: "pointer",
    fontFamily,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
};