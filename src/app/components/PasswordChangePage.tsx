/**
 * 비밀번호 수정 페이지
 *
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";

const inputBg = "#F7F7F9";
const shadow = "0 1px 6px rgba(0,0,0,0.06)";

// ─── Component ───────────────────────────────────────────────
interface PasswordChangePageProps {
  onBack?: () => void;
  onClose?: () => void;
  onSave?: () => void;
}

export default function PasswordChangePage({ onBack, onClose, onSave }: PasswordChangePageProps) {
  const goBack = () => onClose?.() ?? onBack?.();
  const { t } = useTranslation();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogFadeIn, setDialogFadeIn] = useState(false);

  // Validation
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=]).{8,}$/;
  const isNewPwValid = newPw.length === 0 || pwRegex.test(newPw);
  const isConfirmMatch = confirmPw.length === 0 || newPw === confirmPw;
  const canSubmit =
    currentPw.length > 0 &&
    newPw.length > 0 &&
    confirmPw.length > 0 &&
    pwRegex.test(newPw) &&
    newPw === confirmPw;

  const getInputStyle = (
    fieldName: string,
    hasError: boolean,
  ): CSSProperties => ({
    ...s.input,
    borderColor: hasError ? colors.primary : colors.gray5,
    boxShadow: hasError ? `0 0 0 3px rgba(238,43,47,0.08)` : "none",
    backgroundColor:
      focusedField === fieldName ? colors.white : inputBg,
  });

  return (
    <div style={s.overlay}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={goBack}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("passwordChange.title")}</span>
          </div>
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        {/* 현재 비밀번호 카드 */}
        <div style={s.card}>
          <div style={s.field}>
            <label style={s.fieldLabel}>{t("passwordChange.currentPw")}</label>
            <div style={s.inputWrap}>
              <input
                style={getInputStyle("current", false)}
                type={showCurrent ? "text" : "password"}
                placeholder={t("passwordChange.currentPw")}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                onFocus={() => setFocusedField("current")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                style={s.eyeBtn}
                onClick={() => setShowCurrent(!showCurrent)}
                type="button"
              >
                {showCurrent ? (
                  <Eye size={18} strokeWidth={1.8} color={colors.gray2} />
                ) : (
                  <EyeOff size={18} strokeWidth={1.8} color={colors.gray2} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 새 비밀번호 카드 */}
        <div style={s.card}>
          <div style={s.field}>
            <label style={s.fieldLabel}>{t("passwordChange.newPw")}</label>
            <div style={s.inputWrap}>
              <input
                style={getInputStyle("new", !isNewPwValid)}
                type={showNew ? "text" : "password"}
                placeholder={t("passwordChange.newPw")}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                onFocus={() => setFocusedField("new")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                style={s.eyeBtn}
                onClick={() => setShowNew(!showNew)}
                type="button"
              >
                {showNew ? (
                  <Eye size={18} strokeWidth={1.8} color={colors.gray2} />
                ) : (
                  <EyeOff size={18} strokeWidth={1.8} color={colors.gray2} />
                )}
              </button>
            </div>
            {!isNewPwValid && (
              <span style={s.errorHint}>
                {t("passwordChange.passwordRule")}
              </span>
            )}
          </div>

          <div style={s.field}>
            <label style={s.fieldLabel}>{t("passwordChange.confirmPw")}</label>
            <div style={s.inputWrap}>
              <input
                style={getInputStyle("confirm", !isConfirmMatch)}
                type={showConfirm ? "text" : "password"}
                placeholder={t("passwordChange.confirmPw")}
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                onFocus={() => setFocusedField("confirm")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                style={s.eyeBtn}
                onClick={() => setShowConfirm(!showConfirm)}
                type="button"
              >
                {showConfirm ? (
                  <Eye size={18} strokeWidth={1.8} color={colors.gray2} />
                ) : (
                  <EyeOff size={18} strokeWidth={1.8} color={colors.gray2} />
                )}
              </button>
            </div>
            {!isConfirmMatch && (
              <span style={s.errorHint}>{t("signup.passwordMismatch")}</span>
            )}
          </div>

          <p style={s.hint}>{t("signup.passwordHint")}</p>
        </div>
      </div>

      {/* ── 하단 고정 버튼 ── */}
      <div style={s.bottomBar}>
        <div style={s.bottomBtns}>
          <button style={s.btnSecondary} onClick={goBack}>
            {t("common.cancel")}
          </button>
          <button
            style={{
              ...s.btnPrimary,
              opacity: canSubmit ? 1 : 0.45,
            }}
            disabled={!canSubmit}
            onClick={() => { if (canSubmit) setShowConfirmDialog(true); }}
          >
            {t("common.save")}
          </button>
        </div>
      </div>

      {/* ── Confirm Dialog ── */}
      {showConfirmDialog && (
        <ConfirmDialog
          message={t("passwordChange.confirmMessage")}
          onCancel={() => setShowConfirmDialog(false)}
          onConfirm={() => {
            setShowConfirmDialog(false);
            onSave?.();
          }}
        />
      )}
    </div>
  );
}

// ─── Confirm Dialog ─────────────────────────────────────────
function ConfirmDialog({
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
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    paddingTop: 13,
    paddingRight: 44,
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
  eyeBtn: {
    position: "absolute",
    right: 12,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: colors.gray2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },

  /* Hints */
  hint: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: 500,
    paddingTop: 2,
    paddingRight: 0,
    paddingBottom: 2,
    paddingLeft: 0,
  },
  errorHint: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: 500,
    marginTop: 2,
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
};