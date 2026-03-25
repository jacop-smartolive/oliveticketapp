/**
 * My 올리브 — 하단 네비게이션 "My올리브" 탭 페이지
 * HTML 디자인 기반 → React 컴포넌트 변환
 */
import type { CSSProperties } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SquarePen,
  Megaphone,
  Settings,
  Layers,
  ChevronRight,
} from "lucide-react";
import NoticePage from "./NoticePage";
import InquiryPage from "./InquiryPage";
import EnvironmentSettingsPage from "./EnvironmentSettingsPage";
import { colors, fontFamily } from "../shared/tokens";

const shadow = "0 1px 6px rgba(0,0,0,0.06)";

// ─── Types ───────────────────────────────────────────────────
interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

// ─── Component ───────────────────────────────────────────────
export default function MyOlivePage({
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
  const { t } = useTranslation();
  const [noticePage, setNoticePage] = useState(false);
  const [inquiryPage, setInquiryPage] = useState(false);
  const [environmentSettingsPage, setEnvironmentSettingsPage] = useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: <SquarePen size={17} strokeWidth={2.4} />,
      label: t("my.inquiry"),
      onClick: () => {
        setInquiryPage(true);
      },
    },
    {
      icon: <Megaphone size={17} strokeWidth={2.4} />,
      label: t("my.notice"),
      onClick: () => {
        setNoticePage(true);
      },
    },
    {
      icon: <Settings size={17} strokeWidth={2.4} />,
      label: t("my.envSettings"),
      onClick: () => {
        setEnvironmentSettingsPage(true);
      },
    },
  ];

  return (
    <div style={s.container}>
      {/* ── Profile Card ── */}
      <div style={{ ...s.profileCard, cursor: "pointer" }} onClick={onProfileClick}>
        <div style={s.profileLeft}>
          <div style={s.profileNameRow}>
            <span style={s.profileName}>{t("mock.profileName")}</span>
            <span style={s.profileBadge}>{t("mock.profileBadge")}</span>
          </div>
          <span style={s.profileDept}>{t("mock.profileDept")}</span>
        </div>
        <ChevronRight size={19} strokeWidth={2} color={colors.gray2} />
      </div>

      {/* ── Event Banner ── */}
      <div style={s.banner}>
        <div style={s.bannerBgCircle1} />
        <div style={s.bannerBgCircle2} />
        <div style={s.bannerText}>
          <div style={s.bannerEyebrow}>OPEN EVENT</div>
          <div style={s.bannerTitle}>
            {t("mock.bannerSurvey")}
            <br />
            {t("mock.bannerFavorite")}
          </div>
        </div>
        <div style={s.bannerArrow}>
          <ChevronRight size={19} strokeWidth={2} />
        </div>
      </div>

      {/* ── Menu Section ── */}
      <div style={s.sectionGroup}>
        <div style={s.sectionHeader}>{t("my.inquiry")}/{t("my.envSettings")}</div>

        {menuItems.map((item, idx) => (
          <div
            key={item.label}
            style={{
              ...s.menuItem,
              borderTop: idx === 0 ? "none" : `1px solid ${colors.border}`,
            }}
            onClick={item.onClick}
          >
            <div style={s.menuLeft}>
              <div style={s.menuIcon}>{item.icon}</div>
              <span style={s.menuText}>{item.label}</span>
            </div>
            <ChevronRight
              size={17}
              strokeWidth={2}
              color={colors.gray2}
            />
          </div>
        ))}

        {/* Version Row */}
        <div style={s.versionRow}>
          <div style={s.menuLeft}>
            <div style={s.menuIcon}>
              <Layers size={17} strokeWidth={2.4} />
            </div>
            <span style={s.menuText}>{t("my.version")}</span>
          </div>
          <span style={s.versionNum}>0.001 ver</span>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div style={s.copyright}>
        Copyright Olive Pass, All Rights Reserved
      </div>

      {/* ── Notice Page ── */}
      {noticePage && <NoticePage onBack={() => setNoticePage(false)} />}

      {/* ── Inquiry Page ── */}
      {inquiryPage && <InquiryPage onBack={() => setInquiryPage(false)} />}

      {/* ── Environment Settings Page ── */}
      {environmentSettingsPage && (
        <EnvironmentSettingsPage
          onBack={() => setEnvironmentSettingsPage(false)}
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
    gap: 11,
    padding: "21px 17px 41px",
    backgroundColor: colors.bg,
    minHeight: "100%",
    fontFamily,
  },

  /* ── Profile Card ── */
  profileCard: {
    background: colors.white,
    borderRadius: 19,
    padding: 21,
    boxShadow: shadow,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  profileNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 9,
  },
  profileName: {
    fontSize: 19,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.4,
  },
  profileBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFF0EF",
    color: colors.primary,
    fontSize: 12,
    fontWeight: 600,
    padding: "5px 9px",
    borderRadius: 999,
    letterSpacing: 0.2,
    lineHeight: 1,
  },
  profileDept: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.gray2,
  },
  profileAvatar: {
    width: 49,
    height: 49,
    borderRadius: "50%",
    background: `linear-gradient(135deg, #FF6B63, ${colors.primary})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* ── Banner ── */
  banner: {
    borderRadius: 19,
    overflow: "hidden",
    boxShadow: shadow,
    position: "relative",
    height: 101,
    background: `linear-gradient(120deg, #FF6B30 0%, ${colors.primary} 50%, #FF1744 100%)`,
    display: "flex",
    alignItems: "center",
    padding: "0 21px",
    cursor: "pointer",
  },
  bannerBgCircle1: {
    position: "absolute",
    right: -10,
    top: -20,
    width: 131,
    height: 131,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
  },
  bannerBgCircle2: {
    position: "absolute",
    right: 50,
    bottom: -30,
    width: 91,
    height: 91,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
  },
  bannerText: {
    position: "relative",
    zIndex: 1,
  },
  bannerEyebrow: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 1,
    textTransform: "uppercase" as const,
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: -0.3,
    lineHeight: "1.35",
  },
  bannerArrow: {
    position: "absolute",
    right: 21,
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* ── Section Group ── */
  sectionGroup: {
    background: colors.white,
    borderRadius: 19,
    boxShadow: shadow,
    overflow: "hidden",
  },
  sectionHeader: {
    padding: "17px 21px 11px",
    fontSize: 12,
    fontWeight: 600,
    color: colors.gray2,
    letterSpacing: 0.8,
    textTransform: "uppercase" as const,
  },

  /* ── Menu Item ── */
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 21px",
    cursor: "pointer",
  },
  menuLeft: {
    display: "flex",
    alignItems: "center",
    gap: 13,
  },
  menuIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    background: colors.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.gray1,
    flexShrink: 0,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
  },

  /* ── Version Row ── */
  versionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 21px",
    borderTop: `1px solid ${colors.border}`,
  },
  versionNum: {
    fontSize: 14,
    color: colors.gray2,
    fontWeight: 400,
  },

  /* ── Copyright ── */
  copyright: {
    textAlign: "center",
    fontSize: 12,
    color: colors.gray2,
    padding: "9px 0 5px",
    letterSpacing: 0.1,
  },
};