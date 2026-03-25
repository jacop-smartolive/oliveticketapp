/**
 * 로그인 페이지
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Eye, EyeOff, ChevronRight } from "lucide-react";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";
import CompanySelectSheet from "./CompanySelectSheet";
import type { CompanyOption } from "./CompanySelectSheet";
import { showSuccessToast } from "../shared/toast";

// ─── Mock: 가입된 이메일 목록 ──────────────────────────────
const REGISTERED_EMAILS = [
  "test@olive.com",
  "demo@olive.com",
  "olive@shinsegae.com",
  "admin@olive.com",
];

// ─── Mock: 중복 소속 유저 매핑 ──────────────────────────────
// 이메일 → 소속 기업 목록 (복수 소속 케이스)
const MULTI_COMPANY_USERS: Record<string, CompanyOption[]> = {
  "test@olive.com": [
    { code: "1234", name: "신세계푸드" },
    { code: "5678", name: "삼성전자" },
  ],
  "demo@olive.com": [
    { code: "9999", name: "LG전자" },
    { code: "0000", name: "현대자동차" },
    { code: "1111", name: "SK하이닉스" },
  ],
};

// ─── Component ───────────────────────────────────────────────
interface LoginPageProps {
  onBack: () => void;
  onLogin?: (company?: CompanyOption) => void;
  onFindAccount?: () => void;
  onSignup?: () => void;
}

export default function LoginPage({
  onBack,
  onLogin,
  onFindAccount,
  onSignup,
}: LoginPageProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showCompanySheet, setShowCompanySheet] = useState(false);
  const [matchedCompanies, setMatchedCompanies] = useState<CompanyOption[]>([]);
  const [emailCheckMsg, setEmailCheckMsg] = useState<{ text: string; color: string } | null>(null);
  const [showGuideCard, setShowGuideCard] = useState(false);

  const getInputStyle = (field: string): CSSProperties => ({
    ...s.input,
    ...(field === "password" ? { paddingRight: 44 } : {}),
    backgroundColor: focusedField === field ? colors.white : colors.bg,
  });

  const handleLogin = () => {
    // 중복 소속 체크 — 매칭되는 이메일이 있으면 해당 목록, 없으면 기본 목록 노출
    const emailKey = email.trim().toLowerCase();
    const companies = MULTI_COMPANY_USERS[emailKey] ?? [
      { code: "1234", name: "신세계푸드" },
      { code: "5678", name: "삼성전자" },
    ];
    setMatchedCompanies(companies);
    setShowCompanySheet(true);
  };

  const handleCompanySelect = (company: CompanyOption) => {
    setShowCompanySheet(false);
    showSuccessToast(`${company.name} ${t("login.selectCompanyConfirm")}`);
    onLogin?.(company);
  };

  const handleCheckSignup = () => {
    setEmail("test@naver.com");
    setEmailCheckMsg({ text: t("login.emailNotRegistered"), color: colors.primary });
    setShowGuideCard(true);
  };

  const handleBack = () => {
    setEmail("");
    setPassword("");
    setEmailCheckMsg(null);
    setShowPw(false);
    onBack();
  };

  return (
    <div style={s.overlay}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button onClick={handleBack} style={s.backBtn}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("login.title")}</span>
          </div>
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        <div style={s.fieldsWrap}>
          {/* 아이디 (이메일) */}
          <div style={s.field}>
            <label style={s.fieldLabel}>{t("login.emailLabel")}</label>
            <input
              style={{
                ...getInputStyle("email"),
                ...(emailCheckMsg && emailCheckMsg.color === colors.primary
                  ? { borderColor: colors.primary }
                  : {}),
              }}
              type="email"
              placeholder={t("login.emailInput")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailCheckMsg(null);
              }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
            {emailCheckMsg && (
              <span style={{ fontSize: 12, fontWeight: 600, color: emailCheckMsg.color, marginTop: 2 }}>
                {emailCheckMsg.text}
              </span>
            )}
          </div>

          {/* 비밀번호 */}
          <div style={s.field}>
            <label style={s.fieldLabel}>{t("login.passwordLabel")}</label>
            <div style={s.inputWrap}>
              <input
                style={getInputStyle("password")}
                type={showPw ? "text" : "password"}
                placeholder={t("login.passwordInput")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <button style={s.eyeBtn} onClick={() => setShowPw(!showPw)}>
                {showPw ? (
                  <Eye size={18} strokeWidth={1.8} color={colors.gray2} />
                ) : (
                  <EyeOff size={18} strokeWidth={1.8} color={colors.gray2} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div style={s.loginBtnWrap}>
          <button style={s.btnPrimary} onClick={handleLogin}>
            {t("login.loginBtn")}
          </button>
        </div>

        {/* 링크 영역 */}
        <div
          style={s.centerLink}
          onClick={onFindAccount}
        >
          <span>{t("login.findIdPw")}</span>
          <ChevronRight size={14} strokeWidth={2.2} color={colors.black} />
        </div>

        {/* 가입유무 확인 — 말풍선 (비밀번호 찾기 바로 아래, 우측 정렬) */}
        <div style={s.alertChipWrap}>
          <div style={s.alertChipInner}>
            <div style={s.alertChipArrow} />
            <button style={s.alertMiniBtn} onClick={handleCheckSignup}>
              <span>{t("login.checkSignupLabel")}</span>
              <ChevronRight size={12} strokeWidth={2.5} color="#fff" />
            </button>
          </div>
        </div>

        <div style={s.joinRow}>
          <span>{t("login.notMember")}</span>
          <span style={s.joinLink} onClick={onSignup}>
            {t("login.signup")}
          </span>
        </div>

        {/* ── 가입유무 확인 설명 카드 ── */}
        {showGuideCard && (
        <div style={s.guideCard}>
          <div style={s.guideCardTitle}>💡 아이디찾기(삭제) → 가입유무 확인으로 대체</div>
          <div style={s.guideSteps}>
            <div style={s.guideStep}>
              <span style={s.guideLabel}>이메일:</span>
              <span style={s.guideValue}>olive@test.com</span>
            </div>
            <div style={s.guideStep}>
              <span style={s.guideLabel}>비밀번호:</span>
              <span style={s.guideValue}>****</span>
            </div>
            <div style={s.guideArrow}>↓ 로그인 클릭</div>
            <div style={s.guideErrorRow}>
              <span style={s.guideErrorX}>✕</span>
              <span style={s.guideErrorMsg}>"가입되지 않은 이메일입니다"</span>
              <span style={s.guideErrorHint}>← 인라인 에러 메시지</span>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* ── 소속 선택 바텀시트 ── */}
      {showCompanySheet && (
        <CompanySelectSheet
          companies={matchedCompanies}
          onSelect={handleCompanySelect}
          onClose={() => setShowCompanySheet(false)}
        />
      )}
    </div>
  );
}

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
    backgroundColor: colors.white,
    fontFamily,
  },

  /* Header — QR결제하기 동일 */
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
    cursor: "pointer",
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
    paddingTop: 28,
    paddingRight: 24,
    paddingBottom: 40,
    paddingLeft: 24,
    display: "flex",
    flexDirection: "column",
    gap: 20,
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
  },
  input: {
    width: "100%",
    paddingTop: 13,
    paddingRight: 16,
    paddingBottom: 13,
    paddingLeft: 16,
    border: `1.5px solid ${colors.gray5}`,
    borderRadius: 10,
    backgroundColor: colors.bg,
    fontSize: 14,
    color: colors.black,
    fontFamily,
    outline: "none",
    transition: "background-color 0.2s",
  },
  inputWrap: {
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

  /* Links */
  centerLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 2,
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    cursor: "pointer",
    paddingTop: 4,
    paddingRight: 0,
    paddingBottom: 4,
    paddingLeft: 0,
  },
  joinRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingTop: 8,
    paddingRight: 0,
    paddingBottom: 8,
    paddingLeft: 0,
    fontSize: 14,
    color: colors.gray2,
    flexWrap: "wrap",
    textAlign: "center",
  },
  joinLink: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },

  /* Bottom Bar — QR결제하기 동일 */
  bottomBar: {
    position: "relative",
    zIndex: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
  },
  btnPrimary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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

  /* Login Button Wrap */
  loginBtnWrap: {
    paddingTop: 4,
  },

  /* Alert Chip — QR결제 후 팝업 말풍선 동일 */
  alertChipWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: -8,
    position: "relative",
  },
  alertChipInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  alertChipArrow: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "6px solid #3478F6",
    marginBottom: -1,
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

  /* 가입유무 확인 설명 카드 */
  guideCard: {
    backgroundColor: colors.bg,
    borderRadius: 10,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  guideCardTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    marginBottom: 8,
  },
  guideSteps: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  guideStep: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  guideLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray1,
  },
  guideValue: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.black,
  },
  guideArrow: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
    textAlign: "center",
    marginTop: 4,
  },
  guideErrorRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  guideErrorX: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
  },
  guideErrorMsg: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.primary,
  },
  guideErrorHint: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.gray2,
  },
};