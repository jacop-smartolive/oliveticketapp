/**
 * 회원정보 페이지 — My올리브 > 프로필 카드 클릭 시 진입
 */
import type { CSSProperties } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, TriangleAlert, Info } from "lucide-react";
import PasswordChangePage from "./PasswordChangePage";
import UserProfileEditPage from "./UserProfileEditPage";
import { colors, fontFamily, headerTitleBase } from "../shared/tokens";

const shadow = "0 1px 6px rgba(0,0,0,0.06)";

// ─── Mock Data ───────────────────────────────────────────────
const accountInfo = {
  id: "olive@smartolive.com",
  company: "스마트올리브",
  department: "전략기획팀",
};

const personalInfo = {
  name: "홍길동",
  nickname: "제이콤",
  phone: "010-0000-0000",
  email: "000@korea.com",
};

const additionalInfo = {
  birthday: "2025.05.06",
  gender: "남성",
  address: "서울 강남구 대치동 번화가로 대치타워존 201-20",
};

// ─── Component ───────────────────────────────────────────────
interface UserProfilePageProps {
  onBack: () => void;
  onSave?: (toastMessage: string) => void;
  onLogout?: () => void;
}

export default function UserProfilePage({ onBack, onSave, onLogout }: UserProfilePageProps) {
  const { t } = useTranslation();
  const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [isProfileEditVisible, setProfileEditVisible] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [withdrawLowPoint, setWithdrawLowPoint] = useState(false);

  return (
    <div style={s.overlay}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={onBack}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("userProfile.title")}</span>
          </div>
        </div>
      </div>

      {/* ── Scroll Content ── */}
      <div style={s.scroll}>
        {/* 계정 정보 (읽기 전용 / 회색 배경) */}
        <div style={{ ...s.card, backgroundColor: colors.inputBg }}>
          <FieldRow label={t("userProfile.accountId")} value={accountInfo.id} muted />
          <FieldRow label={t("userProfile.companyName")} value={accountInfo.company} muted />
          <FieldRow label={t("userProfile.department")} value={accountInfo.department} muted />
        </div>

        {/* 개인 정보 */}
        <div style={s.card}>
          <FieldRow label={t("userProfile.name")} value={personalInfo.name} />
          <FieldRow label={t("userProfile.nickname")} value={personalInfo.nickname} />
        </div>

        {/* 추가 정보 */}
        <div style={s.card}>
          <FieldRow label={t("userProfile.birthday")} value={additionalInfo.birthday} />
          <FieldRow label={t("userProfile.gender")} value={additionalInfo.gender} />
          <FieldRow label={t("userProfile.address")} value={additionalInfo.address} />
        </div>

        {/* 로그아웃 / 회원탈퇴 */}
        <div style={s.linksRow}>
          <span style={s.linkText} onClick={() => setShowLogoutConfirm(true)}>{t("my.logout")}</span>
          <span style={s.linkSep}>|</span>
          <span style={s.linkText} onClick={() => setShowWithdrawConfirm(true)}>{t("envSettings.deleteAccount")}</span>
        </div>
      </div>

      {/* ── 하단 고정 버튼 ── */}
      <div style={s.bottomBar}>
        <div style={s.bottomBtns}>
          <button
            style={s.btnSecondary}
            onClick={() => setPasswordChangeVisible(true)}
          >
            {t("userProfile.passwordChange")}
          </button>
          <button
            style={s.btnPrimary}
            onClick={() => setProfileEditVisible(true)}
          >
            {t("userProfile.editTitle")}
          </button>
        </div>
      </div>

      {/* ── 비밀번호 수정 모달 ── */}
      {isPasswordChangeVisible && (
        <PasswordChangePage
          onClose={() => setPasswordChangeVisible(false)}
          onSave={() => {
            setPasswordChangeVisible(false);
            onSave?.(t("passwordChange.successToast"));
          }}
        />
      )}

      {/* ── 내 정보 수정 모달 ── */}
      {isProfileEditVisible && (
        <UserProfileEditPage
          onClose={() => setProfileEditVisible(false)}
          onSave={() => {
            setProfileEditVisible(false);
            onSave?.(t("toast.profileUpdated"));
          }}
        />
      )}

      {/* ── 로그아웃 확인 팝업 ── */}
      {showLogoutConfirm && (
        <div style={s.confirmOverlay}>
          <div style={s.confirmBox}>
            <p style={s.confirmTitle}>{t("my.logout")}</p>
            <p style={s.confirmMsg}>{t("my.logoutConfirm")}</p>
            <div style={s.confirmBtns}>
              <button
                style={s.confirmBtnCancel}
                onClick={() => setShowLogoutConfirm(false)}
              >
                {t("common.cancel")}
              </button>
              <button
                style={s.confirmBtnOk}
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout?.();
                }}
              >
                {t("common.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 회원탈퇴 확인 팝업 ── */}
      {showWithdrawConfirm && (
        <div style={s.confirmOverlay}>
          <div style={w.dialogWrap}>
            <div style={w.dialog}>
              <div style={w.body}>
                {/* 경고 아이콘 */}
                <div style={w.iconCircle}>
                  <TriangleAlert size={30} strokeWidth={2} color={colors.primary} />
                </div>

                <p style={w.title}>{t("envSettings.deleteAccountConfirm")}</p>

                {/* 잔여 포인트 블록 — 1,000원 이하 케이스에서는 숨김 */}
                {!withdrawLowPoint && (
                  <div style={w.pointBlock}>
                    <span style={w.pointLabel}>잔여 올리브 포인트</span>
                    <span style={w.pointValue}>12,500</span>
                  </div>
                )}

                {/* 경고 배너 — 1,000원 이하 케이스에서는 숨김 */}
                {!withdrawLowPoint && (
                  <div style={w.warnBanner}>
                    <Info size={15} strokeWidth={2} color={colors.primary} style={{ flexShrink: 0, marginTop: 1 }} />
                    <p style={w.warnText}>
                      탈퇴 전 반드시 포인트를 환불해 주세요.<br />
                      탈퇴 후에는 포인트가 소멸됩니다.
                    </p>
                  </div>
                )}
              </div>

              <div style={w.actions}>
                <button
                  style={w.btnRed}
                  onClick={() => {
                    setShowWithdrawConfirm(false);
                    setWithdrawLowPoint(false);
                    // TODO: 실제 탈퇴 처리
                  }}
                >
                  {t("envSettings.deleteAccountBtn")}
                </button>
                <button
                  style={w.btnCancel}
                  onClick={() => {
                    setShowWithdrawConfirm(false);
                    setWithdrawLowPoint(false);
                  }}
                >
                  {t("common.cancel")}
                </button>
              </div>
            </div>

            {/* 말풍선: 포인트 1,000원 이하 케이스 보기 — 팝업 바깥 하단, 윗꼬리 */}
            {!withdrawLowPoint && (
              <div style={w.speechWrap}>
                <div style={w.speechArrow} />
                <button
                  style={w.speechBubble}
                  onClick={() => setWithdrawLowPoint(true)}
                >
                  <span style={w.speechText}>포인트 1,000원 이하 케이스 보기</span>
                  <ChevronRight size={13} strokeWidth={2.5} color={colors.white} style={{ flexShrink: 0 }} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub Components ──────────────────────────────────────────
function FieldRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div style={s.field}>
      <span style={s.fieldLabel}>{label}</span>
      <span
        style={{
          ...s.fieldValue,
          color: muted ? colors.gray1 : colors.black,
          fontWeight: muted ? 400 : 500,
        }}
      >
        {value}
      </span>
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
    zIndex: 200,
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
  fieldValue: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
    paddingTop: 4,
    paddingRight: 0,
    paddingBottom: 4,
    paddingLeft: 0,
  },

  /* Links */
  linksRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,
    paddingRight: 0,
    paddingBottom: 4,
    paddingLeft: 0,
  },
  linkText: {
    fontSize: 14,
    color: colors.gray2,
    paddingTop: 4,
    paddingRight: 16,
    paddingBottom: 4,
    paddingLeft: 16,
    cursor: "pointer",
  },
  linkSep: {
    fontSize: 12,
    color: colors.gray3,
    userSelect: "none",
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

  /* Confirm Overlay */
  confirmOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 300,
  },
  confirmBox: {
    background: colors.white,
    borderRadius: 12,
    paddingTop: 28,
    paddingRight: 24,
    paddingBottom: 20,
    paddingLeft: 24,
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
    width: "calc(100% - 64px)",
    maxWidth: 320,
  },
  confirmTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  confirmMsg: {
    fontSize: 14,
    color: colors.gray2,
    marginBottom: 24,
    letterSpacing: -0.2,
    lineHeight: 1.4,
  },
  confirmBtns: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  confirmBtnCancel: {
    flex: 1,
    height: 46,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    border: "none",
    fontSize: 15,
    fontWeight: 700,
    color: "#6E6F70",
    letterSpacing: -0.15,
    fontFamily,
    cursor: "pointer",
  },
  confirmBtnOk: {
    flex: 1,
    height: 46,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    fontSize: 15,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
    fontFamily,
    cursor: "pointer",
  },
};

const w: Record<string, CSSProperties> = {
  dialogWrap: {
    position: "relative",
  },
  dialog: {
    background: colors.white,
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 28px 72px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.10)",
    width: 295,
  },
  body: {
    paddingTop: 28,
    paddingRight: 22,
    paddingBottom: 0,
    paddingLeft: 22,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "linear-gradient(145deg, #FFE8EA 0%, #FFD5D8 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1C1C1E",
    marginBottom: 8,
    lineHeight: "1.35",
  },
  pointBlock: {
    width: "100%",
    backgroundColor: "#F7F7FA",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.10)",
    borderRadius: 16,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  pointLabel: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 500,
    color: "#8E8E93",
  },
  pointValue: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1C1C1E",
    letterSpacing: "-0.03em",
  },
  warnBanner: {
    width: "100%",
    backgroundColor: "rgba(232,25,44,0.07)",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "rgba(232,25,44,0.18)",
    borderRadius: 16,
    paddingTop: 11,
    paddingRight: 14,
    paddingBottom: 11,
    paddingLeft: 14,
    display: "flex",
    alignItems: "flex-start",
    gap: 7,
    marginTop: 8,
    textAlign: "left",
  },
  warnText: {
    fontSize: 12,
    lineHeight: "1.65",
    color: colors.primary,
    fontWeight: 500,
  },
  actions: {
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 22,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
    position: "relative",
  },
  btnRed: {
    flex: 1,
    height: 49,
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    backgroundColor: colors.primary,
    letterSpacing: "-0.15px",
    fontFamily,
    cursor: "pointer",
  },
  btnCancel: {
    flex: 1,
    height: 49,
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: "#6E6F70",
    backgroundColor: "#F3F4F6",
    letterSpacing: "-0.15px",
    fontFamily,
    cursor: "pointer",
  },
  speechWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 12,
    position: "relative",
  },
  speechBubble: {
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
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(52,120,246,0.35)",
  },
  speechText: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.white,
    letterSpacing: -0.12,
    whiteSpace: "nowrap" as const,
  },
  speechArrow: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "6px solid #3478F6",
    marginBottom: -1,
  },
};