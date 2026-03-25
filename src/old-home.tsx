import "./app/shared/i18n";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import OldVersionHomePage from "./app/components/OldVersionHomePage";
import OldVersionQrPaymentPage from "./app/components/OldVersionQrPaymentPage";
import OldVersionPaymentHistoryPage from "./app/components/OldVersionPaymentHistoryPage";
import OldVersionMyOlivePage from "./app/components/OldVersionMyOlivePage";
import { Home, ScrollText, UserRound } from "lucide-react";
import { colors, fontFamily, spacing, radius } from "./app/shared/tokens";
import QrIcon from "./imports/QrIcon";
import "./styles/index.css";

function OldHomeApp() {
  const [activeNav, setActiveNav] = useState<"home" | "receipt" | "my">("home");
  const [showQrPayment, setShowQrPayment] = useState(false);
  const [appVersion, setAppVersion] = useState<"new" | "old">("old");

  return (
    <div style={s.screen}>
      {/* 스크롤 영역 */}
      <div style={s.scrollArea}>
        {activeNav === "home" && (
          <OldVersionHomePage onQrPayment={() => setShowQrPayment(true)} />
        )}
        {activeNav === "receipt" && (
          <OldVersionPaymentHistoryPage />
        )}
        {activeNav === "my" && (
          <OldVersionMyOlivePage
            appVersion={appVersion}
            onVersionChange={setAppVersion}
          />
        )}
      </div>

      {/* 결제하기 FAB (홈에서만) */}
      {activeNav === "home" && (
        <button onClick={() => setShowQrPayment(true)} style={s.floatingQR}>
          <div style={{ width: 20, height: 17, flexShrink: 0 }}>
            <QrIcon />
          </div>
          결제하기
        </button>
      )}

      {/* 하단 네비게이션 */}
      <div style={s.bottomNav}>
        {([
          { key: "home" as const, icon: Home, label: "홈" },
          { key: "receipt" as const, icon: ScrollText, label: "결제내역" },
          { key: "my" as const, icon: UserRound, label: "My 올리브" },
        ]).map((item) => {
          const active = activeNav === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              style={s.navBtn}
            >
              <item.icon size={22} strokeWidth={active ? 2.4 : 1.8} color={active ? colors.primary : "#ADAFBB"} />
              <span style={{
                fontSize: 11,
                fontWeight: active ? 700 : 500,
                color: active ? colors.primary : "#ADAFBB",
                letterSpacing: -0.2,
              }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* QR 결제 페이지 */}
      {showQrPayment && (
        <OldVersionQrPaymentPage onBack={() => setShowQrPayment(false)} />
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  screen: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.white,
    fontFamily,
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: colors.white,
  },
  floatingQR: {
    position: "absolute",
    right: spacing.xl,
    bottom: 82,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    boxShadow: "0 4px 16px rgba(238,43,47,0.4)",
    color: colors.white,
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: -0.2,
    zIndex: 20,
    border: "none",
    cursor: "pointer",
    fontFamily,
  },
  bottomNav: {
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTop: `1px solid ${colors.gray6}`,
    flexShrink: 0,
    zIndex: 10,
  },
  navBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px 16px",
  },
};

createRoot(document.getElementById("root")!).render(<OldHomeApp />);
