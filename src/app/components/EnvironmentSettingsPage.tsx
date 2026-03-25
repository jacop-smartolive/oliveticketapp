/**
 * 환경설정 페이지 — My올리브 > 환경설정 메뉴 클릭 시 진입
 */
import type { CSSProperties } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Check, Globe, Smartphone } from "lucide-react";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";
import { showSuccessToast } from "../shared/toast";

const toggleOff = "#D1D1D6";
const shadow = "0 1px 6px rgba(0,0,0,0.06)";

type AppLanguage = "ko" | "en" | "vi";
type AppVersion = "new" | "old";

// ─── Component ───────────────────────────────────────────────
interface EnvironmentSettingsPageProps {
  onBack: () => void;
  onSave?: (toastMessage: string) => void;
  appVersion?: "new" | "old";
  onVersionChange?: (version: "new" | "old") => void;
}

export default function EnvironmentSettingsPage({
  onBack,
  onSave,
  appVersion: externalVersion = "new",
  onVersionChange,
}: EnvironmentSettingsPageProps) {
  const { t, i18n } = useTranslation();
  const [autoLogin, setAutoLogin] = useState(true);
  const [orderNotification, setOrderNotification] = useState(true);
  const [marketingNotification, setMarketingNotification] = useState(false);
  const [language, setLanguage] = useState<AppLanguage>(
    (i18n.language as AppLanguage) || "ko"
  );
  const [pendingLanguage, setPendingLanguage] = useState<AppLanguage>(language);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [appVersion, setAppVersion] = useState<AppVersion>(externalVersion);
  const [pendingVersion, setPendingVersion] = useState<AppVersion>(appVersion);
  const [showVersionPopup, setShowVersionPopup] = useState(false);

  /* 언어 팝업 "설정" 클릭 → pendingLanguage만 확정, 팝업 닫기 (실제 i18n 전환은 저장 시) */
  const handleApplyLanguage = () => {
    setLanguage(pendingLanguage);
    setShowLangPopup(false);
  };

  /* 취소 시 pendingLanguage 원복 */
  const handleCancelLanguage = () => {
    setPendingLanguage(language);
    setShowLangPopup(false);
  };

  const handleSave = () => {
    // 언어가 변경되었으면 i18n 전환 적용
    if (language !== (i18n.language as AppLanguage)) {
      i18n.changeLanguage(language);
      const tNew = i18n.getFixedT(language);
      showSuccessToast(tNew("envSettings.langChangedToast"));
    }
    onSave?.(t("envSettings.saveSuccess"));
    onBack();
  };

  const handleApplyVersion = () => {
    setAppVersion(pendingVersion);
    onVersionChange?.(pendingVersion);
    setShowVersionPopup(false);
  };

  const handleCancelVersion = () => {
    setPendingVersion(appVersion);
    setShowVersionPopup(false);
  };

  const versionOptions: { code: AppVersion; label: string; desc: string }[] = [
    { code: "new", label: "NEW버전", desc: "새로운 UI/UX" },
    { code: "old", label: "구버전", desc: "기존 UI/UX" },
  ];

  const languageOptions: { code: AppLanguage; label: string; native: string }[] = [
    { code: "ko", label: t("envSettings.langKo"), native: "한국어" },
    { code: "en", label: t("envSettings.langEn"), native: "English" },
    { code: "vi", label: t("envSettings.langVi"), native: "Tiếng Việt" },
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
            <span style={s.headerTitle}>{t("envSettings.title")}</span>
          </div>
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        {/* 로그인 */}
        <div style={s.sectionLabel}>{t("envSettings.loginSection")}</div>
        <div style={s.sectionGroup}>
          <div style={s.settingRow}>
            <span style={s.settingLabel}>{t("envSettings.autoLogin")}</span>
            <ToggleSwitch
              checked={autoLogin}
              onChange={setAutoLogin}
            />
          </div>
        </div>

        {/* 알림 */}
        <div style={{ ...s.sectionLabel, marginTop: 12 }}>{t("envSettings.notifSection")}</div>
        <div style={s.sectionGroup}>
          <div style={s.settingRow}>
            <span style={s.settingLabel}>{t("envSettings.orderPayment")}</span>
            <ToggleSwitch
              checked={orderNotification}
              onChange={setOrderNotification}
            />
          </div>
          <div style={{ height: 1, backgroundColor: colors.gray5 }} />
          <div style={s.settingRow}>
            <span style={s.settingLabel}>{t("envSettings.eventMarketing")}</span>
            <ToggleSwitch
              checked={marketingNotification}
              onChange={setMarketingNotification}
            />
          </div>
        </div>

        {/* 언어 설정 */}
        <div style={{ ...s.sectionLabel, marginTop: 12 }}>{t("envSettings.language")}</div>
        <div style={s.sectionGroup}>
          <div
            style={{ ...s.settingRow, cursor: "pointer" }}
            onClick={() => setShowLangPopup(true)}
          >
            <span style={s.settingLabel}>{t("envSettings.appLanguage")}</span>
            <div style={s.langValue}>
              <span>{languageOptions.find((l) => l.code === language)?.label}</span>
              <ChevronRight size={14} strokeWidth={2} color={colors.gray1} />
            </div>
          </div>
        </div>

        {/* 버전 설정 */}
        <div style={{ ...s.sectionLabel, marginTop: 12 }}>버전 설정</div>
        <div style={s.sectionGroup}>
          <div
            style={{ ...s.settingRow, cursor: "pointer" }}
            onClick={() => setShowVersionPopup(true)}
          >
            <span style={s.settingLabel}>앱 버전</span>
            <div style={s.langValue}>
              <span>{versionOptions.find((v) => v.code === appVersion)?.label}</span>
              <ChevronRight size={14} strokeWidth={2} color={colors.gray1} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 하단 고정 버튼 ── */}
      <div style={s.bottomBar}>
        <div style={s.bottomBtns}>
          <button style={s.btnSecondary} onClick={onBack}>
            {t("common.cancel")}
          </button>
          <button style={s.btnPrimary} onClick={handleSave}>
            {t("common.save")}
          </button>
        </div>
      </div>

      {/* ── 언어 선택 팝업 ── */}
      {showLangPopup && (
        <div style={s.dimOverlay} onClick={handleCancelLanguage}>
          <div style={s.popup} onClick={(e) => e.stopPropagation()}>
            {/* 팝업 헤더 */}
            <div style={s.popupHeader}>
              <Globe size={18} strokeWidth={2.2} color={colors.primary} />
              <span style={s.popupTitle}>{t("envSettings.appLanguage")}</span>
            </div>
            <p style={s.popupDesc}>{t("envSettings.langSelectDesc")}</p>

            {/* 언어 옵션 리스트 */}
            <div style={s.langList}>
              {languageOptions.map((opt) => {
                const selected = opt.code === pendingLanguage;
                return (
                  <div
                    key={opt.code}
                    style={{
                      ...s.langOption,
                      backgroundColor: selected ? colors.primaryLight : "transparent",
                      border: selected
                        ? `1.5px solid ${colors.primary}`
                        : `1.5px solid ${colors.gray5}`,
                    }}
                    onClick={() => setPendingLanguage(opt.code)}
                  >
                    <div style={s.langOptionText}>
                      <span
                        style={{
                          ...s.langOptionLabel,
                          color: selected ? colors.primary : colors.black,
                          fontWeight: selected ? 700 : 500,
                        }}
                      >
                        {opt.label}
                      </span>
                      <span style={s.langOptionNative}>{opt.native}</span>
                    </div>
                    {selected && (
                      <Check size={18} strokeWidth={2.8} color={colors.primary} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* 팝업 버튼 */}
            <div style={s.popupBtns}>
              <button
                style={s.popupBtnCancel}
                onClick={handleCancelLanguage}
              >
                {t("common.cancel")}
              </button>
              <button
                style={s.popupBtnConfirm}
                onClick={handleApplyLanguage}
              >
                {t("envSettings.applyBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── 버전 선택 팝업 ── */}
      {showVersionPopup && (
        <div style={s.dimOverlay} onClick={handleCancelVersion}>
          <div style={s.popup} onClick={(e) => e.stopPropagation()}>
            <div style={s.popupHeader}>
              <Smartphone size={18} strokeWidth={2.2} color={colors.primary} />
              <span style={s.popupTitle}>앱 버전</span>
            </div>
            <p style={s.popupDesc}>사용할 앱 버전을 선택해주세요.</p>

            <div style={s.langList}>
              {versionOptions.map((opt) => {
                const selected = opt.code === pendingVersion;
                return (
                  <div
                    key={opt.code}
                    style={{
                      ...s.langOption,
                      backgroundColor: selected ? colors.primaryLight : "transparent",
                      border: selected
                        ? `1.5px solid ${colors.primary}`
                        : `1.5px solid ${colors.gray5}`,
                    }}
                    onClick={() => setPendingVersion(opt.code)}
                  >
                    <div style={s.langOptionText}>
                      <span
                        style={{
                          ...s.langOptionLabel,
                          color: selected ? colors.primary : colors.black,
                          fontWeight: selected ? 700 : 500,
                        }}
                      >
                        {opt.label}
                      </span>
                      <span style={s.langOptionNative}>{opt.desc}</span>
                    </div>
                    {selected && (
                      <Check size={18} strokeWidth={2.8} color={colors.primary} />
                    )}
                  </div>
                );
              })}
            </div>

            <div style={s.popupBtns}>
              <button style={s.popupBtnCancel} onClick={handleCancelVersion}>
                {t("common.cancel")}
              </button>
              <button style={s.popupBtnConfirm} onClick={handleApplyVersion}>
                {t("envSettings.applyBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Toggle Switch Component ─────────────────────────────────
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <label style={toggleStyles.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={toggleStyles.input}
      />
      <div
        style={{
          ...toggleStyles.track,
          backgroundColor: checked ? colors.primary : toggleOff,
        }}
      >
        <div
          style={{
            ...toggleStyles.thumb,
            transform: checked ? "translateX(20px)" : "translateX(0)",
          }}
        />
      </div>
    </label>
  );
}

const toggleStyles: Record<string, CSSProperties> = {
  toggle: {
    position: "relative",
    width: 48,
    height: 28,
    flexShrink: 0,
    cursor: "pointer",
  },
  input: {
    opacity: 0,
    width: 0,
    height: 0,
    position: "absolute",
  },
  track: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 14,
    transition: "background-color 0.2s",
  },
  thumb: {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: "50%",
    backgroundColor: colors.white,
    top: 3,
    left: 3,
    transition: "transform 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
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
    gap: 8,
  },

  /* Section Label */
  sectionLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: "0.5px",
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 6,
    paddingLeft: 4,
  },

  /* Section Group */
  sectionGroup: {
    background: colors.white,
    borderRadius: 18,
    boxShadow: shadow,
    overflow: "hidden",
    paddingRight: 20,
    paddingLeft: 20,
  },

  /* Setting Row */
  settingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 54,
    boxSizing: "border-box" as const,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
  },

  /* Language Value */
  langValue: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    cursor: "pointer",
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
    height: 49,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: "#6E6F70",
    letterSpacing: "-0.15px",
    fontFamily,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  },
  btnPrimary: {
    flex: 1,
    height: 49,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: "-0.15px",
    fontFamily,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  },

  /* Language Popup */
  dimOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    width: 300,
    backgroundColor: colors.white,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 24,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  popupHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.17,
  },
  popupDesc: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: "0.5px",
  },
  langList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  langOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderRadius: 12,
    cursor: "pointer",
  },
  langOptionText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  langOptionLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
  },
  langOptionNative: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
  },
  popupBtns: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  popupBtnCancel: {
    flex: 1,
    height: 49,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: "#6E6F70",
    letterSpacing: "-0.15px",
    fontFamily,
    cursor: "pointer",
  },
  popupBtnConfirm: {
    flex: 1,
    height: 49,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: "-0.15px",
    fontFamily,
    cursor: "pointer",
  },
};