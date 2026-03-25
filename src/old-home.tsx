import { createRoot } from "react-dom/client";
import { useState } from "react";
import OldVersionHomePage from "./app/components/OldVersionHomePage";
import OldVersionQrPaymentPage from "./app/components/OldVersionQrPaymentPage";
import { Home, ScrollText, UserRound } from "lucide-react";
import { colors, fontFamily } from "./app/shared/tokens";
import QrIcon from "./imports/QrIcon";
import "./styles/index.css";

function OldHomeApp() {
  const [activeNav, setActiveNav] = useState<"home" | "receipt" | "my">("home");
  const [showQrPayment, setShowQrPayment] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", backgroundColor: "#fff", fontFamily }}>
      {/* 스크롤 영역 */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <OldVersionHomePage onQrPayment={() => setShowQrPayment(true)} />
      </div>

      {/* 결제하기 FAB */}
      <button
        onClick={() => setShowQrPayment(true)}
        style={{
          position: "absolute",
          right: 16,
          bottom: 70,
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: colors.primary,
          border: "none",
          borderRadius: 999,
          paddingTop: 14,
          paddingBottom: 14,
          paddingLeft: 20,
          paddingRight: 24,
          boxShadow: "0 4px 16px rgba(238,43,47,0.35)",
          cursor: "pointer",
          zIndex: 10,
          color: colors.white,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: -0.2,
          fontFamily,
        }}
      >
        <div style={{ width: 20, height: 17, flexShrink: 0 }}>
          <QrIcon />
        </div>
        결제하기
      </button>

      {/* 하단 네비게이션 */}
      <div style={{
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 12,
        borderTop: "1px solid #F0F0F0",
        flexShrink: 0,
        zIndex: 10,
      }}>
        {([
          { key: "home", icon: Home, label: "홈" },
          { key: "receipt", icon: ScrollText, label: "결제내역" },
          { key: "my", icon: UserRound, label: "My 올리브" },
        ] as const).map((item) => {
          const active = activeNav === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
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

createRoot(document.getElementById("root")!).render(<OldHomeApp />);
