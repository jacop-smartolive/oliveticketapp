/**
 * 구버전 My올리브 페이지
 */
import type { CSSProperties } from "react";
import { useState } from "react";
import { Bell, Settings, ChevronRight, CreditCard, Smartphone, Check } from "lucide-react";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import EnvironmentSettingsPage from "./EnvironmentSettingsPage";

export default function OldVersionMyOlivePage({
  onProfileClick,
  onSave,
  appVersion,
  onVersionChange,
}: {
  onProfileClick?: () => void;
  onSave?: (toastMessage: string) => void;
  appVersion?: "new" | "old";
  onVersionChange?: (version: "new" | "old") => void;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showVersionPopup, setShowVersionPopup] = useState(false);
  const [pendingVersion, setPendingVersion] = useState<"new" | "old">(appVersion || "old");

  return (
    <div style={s.container}>
      {/* ── 헤더 ── */}
      <div style={s.header}>
        <button style={s.iconBtn}>
          <Bell size={24} strokeWidth={2.2} color={colors.black} />
        </button>
        <span style={s.headerTitle}>My 올리브</span>
        <button style={s.iconBtn} onClick={() => setShowSettings(true)}>
          <Settings size={24} strokeWidth={2.2} color={colors.black} />
        </button>
      </div>

      {/* ── 스크롤 영역 ── */}
      <div style={s.scroll}>
        {/* 프로필 */}
        <div style={s.profileSection} onClick={onProfileClick}>
          <div>
            <span style={s.profileName}>스마트올리브이성해</span>
            <span style={s.profileDept}>이마트 본사 / (주)이마트</span>
          </div>
          <ChevronRight size={20} strokeWidth={2} color={colors.gray2} />
        </div>

        {/* 모바일 사원증 */}
        <div style={s.card}>
          <div style={s.cardRow}>
            <span style={s.cardLabel}>모바일 사원증</span>
            <CreditCard size={22} strokeWidth={1.8} color={colors.gray2} />
          </div>
        </div>

        {/* 모바일 사원증 말풍선 */}
        <div style={s.bubbleWrap}>
          <div style={s.bubbleArrow} />
          <div style={s.bubbleBtn}>
            <span style={s.bubbleText}>모바일 사원증 삭제, 결제 버튼으로 대체</span>
          </div>
        </div>

        {/* 기업 포인트 */}
        <div style={s.cardBorder}>
          <div style={s.cardRow}>
            <span style={s.cardLabel}>기업 포인트</span>
            <div style={s.pointRight}>
              <span style={s.pointValue}>0P</span>
              <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
            </div>
          </div>
          <div style={s.cardRowSub}>
            <span style={s.cardSubLabel}>사용가능</span>
            <span style={s.cardSubValue}>0P</span>
          </div>
        </div>

        {/* 올리브 포인트 */}
        <div style={s.cardBorder}>
          <div style={s.cardRow}>
            <span style={s.cardLabel}>올리브 포인트</span>
            <div style={s.pointRight}>
              <span style={s.pointValue}>0P</span>
              <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
            </div>
          </div>
          <div style={s.chargeRow}>
            <span style={s.chargeLabel}>올리브 포인트 충전하기</span>
            <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
          </div>
        </div>

        {/* 앱 버전 설정 */}
        <div style={s.menuItem} onClick={() => {
          setPendingVersion(appVersion || "old");
          setShowVersionPopup(true);
        }}>
          <span style={s.menuLabel}>앱 버전 설정</span>
          <div style={s.versionBadge}>
            <span style={s.versionText}>{appVersion === "new" ? "NEW버전" : "구버전"}</span>
            <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
          </div>
        </div>
        <div style={s.menuDivider} />

        {/* 선물 쿠폰 등록하기 */}
        <div style={s.menuItem}>
          <span style={s.menuLabel}>선물 쿠폰 등록하기</span>
        </div>
        <div style={s.menuDivider} />

        {/* 같이결제 위임 */}
        <div style={s.menuItem}>
          <span style={s.menuLabel}>같이결제 위임</span>
        </div>
        <div style={s.menuDivider} />

        {/* 고객센터 문의하기 */}
        <div style={s.menuItem}>
          <span style={s.menuLabel}>고객센터 문의하기</span>
        </div>
        <div style={s.menuDivider} />
      </div>

      {/* ── 버전 선택 팝업 ── */}
      {showVersionPopup && (
        <div style={s.dimOverlay} onClick={() => setShowVersionPopup(false)}>
          <div style={s.popup} onClick={(e) => e.stopPropagation()}>
            <div style={s.popupHeader}>
              <Smartphone size={18} strokeWidth={2.2} color={colors.primary} />
              <span style={s.popupTitle}>앱 버전</span>
            </div>
            <p style={s.popupDesc}>사용할 앱 버전을 선택해주세요.</p>

            <div style={s.versionList}>
              {([
                { code: "new" as const, label: "NEW버전", desc: "새로운 UI/UX" },
                { code: "old" as const, label: "구버전", desc: "기존 UI/UX" },
              ]).map((opt) => {
                const selected = opt.code === pendingVersion;
                return (
                  <div
                    key={opt.code}
                    style={{
                      ...s.versionOption,
                      backgroundColor: selected ? colors.primaryLight : "transparent",
                      border: selected
                        ? `1.5px solid ${colors.primary}`
                        : `1.5px solid ${colors.gray5}`,
                    }}
                    onClick={() => setPendingVersion(opt.code)}
                  >
                    <div style={s.versionOptionText}>
                      <span style={{
                        fontSize: 15,
                        fontWeight: selected ? 700 : 500,
                        color: selected ? colors.primary : colors.black,
                      }}>{opt.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: colors.gray1 }}>{opt.desc}</span>
                    </div>
                    {selected && <Check size={18} strokeWidth={2.8} color={colors.primary} />}
                  </div>
                );
              })}
            </div>

            <div style={s.popupBtns}>
              <button style={s.popupBtnCancel} onClick={() => setShowVersionPopup(false)}>취소</button>
              <button style={s.popupBtnConfirm} onClick={() => {
                onVersionChange?.(pendingVersion);
                setShowVersionPopup(false);
              }}>설정</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 환경설정 페이지 ── */}
      {showSettings && (
        <EnvironmentSettingsPage
          onBack={() => setShowSettings(false)}
          onSave={onSave}
          appVersion={appVersion}
          onVersionChange={onVersionChange}
        />
      )}
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: colors.white,
    fontFamily,
  },

  /* Header */
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    height: 54,
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray5}`,
    flexShrink: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },
  iconBtn: {
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: `0 ${spacing.lg}px`,
  },

  /* Profile */
  profileSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 24,
    paddingBottom: 20,
    cursor: "pointer",
  },
  profileName: {
    display: "block",
    fontSize: 22,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  profileDept: {
    display: "block",
    fontSize: 14,
    fontWeight: 400,
    color: colors.gray2,
  },

  /* Card (no border) */
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    border: `1px solid ${colors.gray5}`,
    padding: "16px 20px",
    marginBottom: 10,
  },

  /* Card (with border) */
  cardBorder: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    border: `1px solid ${colors.gray5}`,
    padding: "16px 20px",
    marginBottom: 10,
  },
  cardRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardRowSub: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.2,
  },
  cardSubLabel: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  cardSubValue: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  pointRight: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  pointValue: {
    fontSize: 18,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.2,
  },

  /* Menu Items */
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingBottom: 22,
    cursor: "pointer",
  },
  menuLabel: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.gray5,
  },
  versionBadge: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  versionText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
  },
  chargeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginLeft: -20,
    marginRight: -20,
    marginBottom: -16,
    padding: "14px 20px",
    backgroundColor: "#F7F7F9",
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    borderTop: `1px solid ${colors.gray5}`,
    cursor: "pointer",
  },
  chargeLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.2,
  },

  /* Bubble */
  bubbleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -16,
    marginBottom: -22,
    position: "relative",
    zIndex: 5,
  },
  bubbleArrow: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "6px solid #3478F6",
    marginBottom: -1,
  },
  bubbleBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 14,
    height: 32,
    backgroundColor: "#3478F6",
    borderRadius: 100,
    boxShadow: "0 2px 8px rgba(52,120,246,0.35)",
  },
  bubbleText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#fff",
    letterSpacing: -0.12,
  },

  /* Popup */
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
    margin: 0,
  },
  versionList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  versionOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderRadius: 12,
    cursor: "pointer",
  },
  versionOptionText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
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
