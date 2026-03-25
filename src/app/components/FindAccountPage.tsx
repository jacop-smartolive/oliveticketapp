/**
 * 비밀번호 찾기 페이지
 */
import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";
import { showSuccessToast } from "../shared/toast";

// ─── Component ───────────────────────────────────────────────
interface FindAccountPageProps {
  onBack: () => void;
  onGoLogin?: () => void;
}

type FindPwState = "form" | "newPw" | "result";

export default function FindAccountPage({
  onBack,
  onGoLogin,
}: FindAccountPageProps) {
  const { t } = useTranslation();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // ── 비밀번호 찾기 상태 ──
  const [findPwState, setFindPwState] = useState<FindPwState>("form");
  const [pwEmail, setPwEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [pwCode, setPwCode] = useState("");
  const [pwTimer, setPwTimer] = useState(180);
  const pwTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [newPw1, setNewPw1] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [showNewPw1, setShowNewPw1] = useState(false);
  const [showNewPw2, setShowNewPw2] = useState(false);

  // ── Timer 관리 ──
  const startPwTimer = useCallback(() => {
    if (pwTimerRef.current) clearInterval(pwTimerRef.current);
    setPwTimer(180);
    pwTimerRef.current = setInterval(() => {
      setPwTimer((prev) => {
        if (prev <= 1) {
          if (pwTimerRef.current) clearInterval(pwTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (pwTimerRef.current) clearInterval(pwTimerRef.current);
    };
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const getInputStyle = (field: string, extra?: CSSProperties): CSSProperties => ({
    ...s.input,
    ...extra,
    backgroundColor: focusedField === field ? colors.white : colors.bg,
  });

  const pwMatchMsg =
    newPw2.length > 0
      ? newPw1 === newPw2
        ? { text: t("findAccount.passwordMatch"), color: colors.success }
        : { text: t("findAccount.passwordMismatch"), color: colors.primary }
      : null;

  return (
    <div style={s.overlay}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button onClick={onBack} style={s.backBtn}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("findAccount.findPassword")}</span>
          </div>
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        {/* ════ 비밀번호 찾기 ════ */}
        {(findPwState === "form" || findPwState === "newPw") && (
          <div style={s.fieldsWrap}>
            {/* 이메일 (아이디) + 인증 버튼 — 회원가입과 동일 패턴 */}
            <div style={s.field}>
              <label style={s.fieldLabel}>{t("findAccount.accountEmail")}</label>
              <div style={s.inputWithBtn}>
                <input
                  style={{
                    ...getInputStyle("pwEmail", { flex: 1 }),
                    ...(emailVerified ? { backgroundColor: colors.gray7, color: colors.black, pointerEvents: "none" as const } : {}),
                  }}
                  type="email"
                  placeholder={t("findAccount.emailInput")}
                  value={pwEmail}
                  onChange={(e) => setPwEmail(e.target.value)}
                  onFocus={() => setFocusedField("pwEmail")}
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
                      if (!pwEmail.trim()) return;
                      setCodeSent(true);
                      startPwTimer();
                    }}
                  >
                    {codeSent ? t("findAccount.resendBtn") : t("findAccount.verifyBtn")}
                  </button>
                )}
              </div>
            </div>

            {/* 인증번호 입력 — 인증 발송 후 노출, 인증 완료 시 숨김 */}
            {codeSent && !emailVerified && (
              <div style={s.field}>
                <label style={s.fieldLabel}>{t("findAccount.verifyCodeLabel")}</label>
                <div style={s.inputWithBtn}>
                  <input
                    style={getInputStyle("pwCode", { flex: 1 })}
                    type="text"
                    placeholder={t("findAccount.verifyCodeInput")}
                    value={pwCode}
                    onChange={(e) => setPwCode(e.target.value)}
                    onFocus={() => setFocusedField("pwCode")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button
                    style={s.verifyBtn}
                    onClick={() => {
                      if (pwTimerRef.current) clearInterval(pwTimerRef.current);
                      setEmailVerified(true);
                      setFindPwState("newPw");
                      showSuccessToast(t("findAccount.emailVerifiedToast"));
                    }}
                  >
                    {t("common.confirm")}
                  </button>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: pwTimer > 0 ? colors.primary : colors.gray2 }}>
                  {pwTimer > 0 ? formatTimer(pwTimer) : t("findAccount.timerExpired")}
                </span>
              </div>
            )}

            {/* 새 비밀번호 — 이메일 인증 완료 후 노출 */}
            {findPwState === "newPw" && (
              <>
                <div style={s.field}>
                  <label style={s.fieldLabel}>{t("findAccount.newPassword")}</label>
                  <div style={s.inputWrapPw}>
                    <input
                      style={getInputStyle("newPw1", { paddingRight: 44 })}
                      type={showNewPw1 ? "text" : "password"}
                      placeholder={t("findAccount.newPasswordInput")}
                      value={newPw1}
                      onChange={(e) => setNewPw1(e.target.value)}
                      onFocus={() => setFocusedField("newPw1")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <button style={s.eyeBtn} onClick={() => setShowNewPw1(!showNewPw1)}>
                      {showNewPw1 ? (
                        <Eye size={18} strokeWidth={1.8} color={colors.gray2} />
                      ) : (
                        <EyeOff size={18} strokeWidth={1.8} color={colors.gray2} />
                      )}
                    </button>
                  </div>
                  <span style={s.hint}>{t("findAccount.passwordHint")}</span>
                </div>
                <div style={s.field}>
                  <label style={s.fieldLabel}>{t("findAccount.newPasswordConfirm")}</label>
                  <div style={s.inputWrapPw}>
                    <input
                      style={getInputStyle("newPw2", { paddingRight: 44 })}
                      type={showNewPw2 ? "text" : "password"}
                      placeholder={t("findAccount.newPasswordConfirmInput")}
                      value={newPw2}
                      onChange={(e) => setNewPw2(e.target.value)}
                      onFocus={() => setFocusedField("newPw2")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <button style={s.eyeBtn} onClick={() => setShowNewPw2(!showNewPw2)}>
                      {showNewPw2 ? (
                        <Eye size={18} strokeWidth={1.8} color={colors.gray2} />
                      ) : (
                        <EyeOff size={18} strokeWidth={1.8} color={colors.gray2} />
                      )}
                    </button>
                  </div>
                  {pwMatchMsg && (
                    <span style={{ fontSize: 12, color: pwMatchMsg.color }}>{pwMatchMsg.text}</span>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {findPwState === "result" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={s.resultCard}>
              <div style={s.resultIcon}>
                <CheckCircle size={24} strokeWidth={1.8} color={colors.primary} />
              </div>
              <div style={s.resultTitle}>{t("findAccount.pwResultTitle")}</div>
              <div style={s.resultDesc}>{t("findAccount.pwResultDesc")}</div>
            </div>
            <button style={s.btnPrimaryFull} onClick={onGoLogin || onBack}>
              {t("findAccount.goLogin")}
            </button>
          </div>
        )}
      </div>

      {/* ── 하단 고정 버튼 ── */}
      {findPwState === "newPw" && (
        <div style={s.bottomBar}>
          <button
            style={s.btnPrimary}
            onClick={() => setFindPwState("result")}
          >
            {t("findAccount.changePw")}
          </button>
        </div>
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
    zIndex: 220,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
  },

  /* Header — 공통 1줄 헤더 */
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
    paddingBottom: 120,
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
    border: `1.5px solid ${colors.border}`,
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
    transition: "opacity 0.15s",
  },
  hint: {
    fontSize: 12,
    color: colors.gray2,
  },

  /* Result Card */
  resultCard: {
    border: `1.5px solid ${colors.border}`,
    borderRadius: 18,
    paddingTop: 28,
    paddingRight: 20,
    paddingBottom: 28,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
  },
  resultIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFF0EE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.primary,
  },
  resultDesc: {
    fontSize: 13,
    color: colors.gray2,
    lineHeight: "1.6",
  },

  /* Buttons */
  btnPrimaryFull: {
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
  btnSecondaryFull: {
    width: "100%",
    padding: 16,
    border: `1.5px solid ${colors.border}`,
    borderRadius: 14,
    backgroundColor: colors.white,
    fontSize: 15,
    fontWeight: 600,
    color: colors.gray1,
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
};