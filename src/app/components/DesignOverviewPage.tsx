/**
 * DesignOverviewPage – 모든 페이지를 폰 프레임으로 나열하는 디자인 프로젝트 뷰
 */
import { useState, type CSSProperties, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { X, ZoomIn, ZoomOut, Globe, ChevronLeft } from "lucide-react";
import i18n from "../shared/i18n";
import { colors, fontFamily } from "../shared/tokens";
import { PickupStatus, PaymentStatus, PaymentCategory } from "../shared/enums";

// ─── Page Imports ────────────────────────────────────────────
import QrPaymentPage from "./QrPaymentPage";
import NotificationPage from "./NotificationPage";
import CorporatePointPage from "./CorporatePointPage";
import MenuDetailPage from "./MenuDetailPage";
import SimpleMealDetailPage from "./SimpleMealDetailPage";
import CartPageOption4 from "./CartPageOption4";
import PaymentHistoryPage from "./PaymentHistoryPage";
import PaymentDetailPage from "./PaymentDetailPage";
import PaymentCompletePage from "./PaymentCompletePage";
import MyOlivePage from "./MyOlivePage";
import UserProfilePage from "./UserProfilePage";
import UserProfileEditPage from "./UserProfileEditPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import FindAccountPage from "./FindAccountPage";
import DateRangePickerPage from "./DateRangePickerPage";
import InquiryPage from "./InquiryPage";
import NoticePage from "./NoticePage";
import DocsPage from "./DocsPage";
import PickupQrPage from "./PickupQrPage";
import PointApplicationPage from "./PointApplicationPage";
import EnvironmentSettingsPage from "./EnvironmentSettingsPage";
import PasswordChangePage from "./PasswordChangePage";

// ─── Constants ───────────────────────────────────────────────
const PHONE_W = 375;
const PHONE_H = 812;
const noop = () => {};

interface FrameEntry {
  label: string;
  labelEn: string;
  node: ReactNode;
}

function useFrames(): FrameEntry[] {
  const { t } = useTranslation();

  return [
    {
      label: "QR 결제",
      labelEn: "QR Payment",
      node: <QrPaymentPage onBack={noop} />,
    },
    {
      label: "알림",
      labelEn: "Notifications",
      node: <NotificationPage onBack={noop} />,
    },
    {
      label: "법인포인트",
      labelEn: "Corporate Point",
      node: <CorporatePointPage onBack={noop} />,
    },
    {
      label: "메뉴 상세",
      labelEn: "Menu Detail",
      node: (
        <MenuDetailPage
          menu={{
            id: 1,
            corner: t("mock.cornerKorean"),
            name: t("mock.bibimbapSetName"),
            desc: t("mock.bibimbapSetDesc"),
            img: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400",
            kcal: "650kcal",
            price: "6,000",
          }}
          onBack={noop}
        />
      ),
    },
    {
      label: "간편식 상세",
      labelEn: "Simple Meal Detail",
      node: (
        <SimpleMealDetailPage
          item={{
            id: 1,
            store: t("mock.storeName"),
            name: t("mock.hamEggSandwich"),
            img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
            price: "4,500",
            remaining: 12,
            deadlineValue: "20:00",
            pickupDate: new Date(2025, 2, 8),
          }}
          onBack={noop}
        />
      ),
    },
    {
      label: "장바구니",
      labelEn: "Cart",
      node: (
        <CartPageOption4
          items={[
            {
              id: 1,
              store: t("mock.storeName"),
              name: t("mock.hamEggSandwich"),
              quantity: 2,
              price: 4500,
              img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
              pickupTime: "12:30",
            },
            {
              id: 2,
              store: t("mock.storeName"),
              name: t("mock.chickenSaladLunchbox"),
              quantity: 1,
              price: 5500,
              img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
              pickupTime: "12:30",
            },
          ]}
          onBack={noop}
          onUpdateQuantity={noop}
          onRemoveItem={noop}
          onAddMenu={noop}
          onCheckout={noop}
        />
      ),
    },
    {
      label: "결제내역",
      labelEn: "Payment History",
      node: <PaymentHistoryPage />,
    },
    {
      label: "결제 상세",
      labelEn: "Payment Detail",
      node: (
        <PaymentDetailPage
          payment={{
            category: PaymentCategory.CAFETERIA,
            status: PaymentStatus.PAID,
            storeName: t("mock.storeName"),
            amount: "7,000",
            date: new Date(2025, 2, 8, 12, 30),
            img: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400",
          }}
          onBack={noop}
        />
      ),
    },
    {
      label: "결제 완료",
      labelEn: "Payment Complete",
      node: (
        <PaymentCompletePage
          totalAmount={6000}
          items={[
            {
              name: t("mock.bibimbapSetName"),
              quantity: 1,
              price: 6000,
              img: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400",
              pickupStatus: PickupStatus.SCHEDULED,
              pickupDateTime: "2025.03.08 12:30",
              paymentNumber: "OLV-20250308-001",
            },
          ]}
          onClose={noop}
        />
      ),
    },
    {
      label: "My 올리브",
      labelEn: "My Olive",
      node: <MyOlivePage />,
    },
    {
      label: "내 정보",
      labelEn: "User Profile",
      node: <UserProfilePage onBack={noop} />,
    },
    {
      label: "정보 수정",
      labelEn: "Profile Edit",
      node: <UserProfileEditPage onBack={noop} />,
    },
    {
      label: "로그인",
      labelEn: "Login",
      node: <LoginPage onBack={noop} onLogin={noop} onSignup={noop} onFindAccount={noop} />,
    },
    {
      label: "회원가입",
      labelEn: "Sign Up",
      node: <SignupPage onBack={noop} onGoLogin={noop} />,
    },
    {
      label: "아이디 찾기",
      labelEn: "Find Account",
      node: <FindAccountPage onBack={noop} />,
    },
    {
      label: "날짜 선택",
      labelEn: "Date Picker",
      node: (
        <DateRangePickerPage
          dateRange={{ start: new Date(2025, 3, 27), end: new Date(2025, 4, 3) }}
          onDateRangeChange={noop}
          onBack={noop}
        />
      ),
    },
    {
      label: "1:1 문의",
      labelEn: "Inquiry",
      node: <InquiryPage onBack={noop} />,
    },
    {
      label: "공지사항",
      labelEn: "Notices",
      node: <NoticePage onBack={noop} />,
    },
    {
      label: "이용약관",
      labelEn: "Docs",
      node: <DocsPage onBack={noop} />,
    },
    {
      label: "픽업 QR",
      labelEn: "Pickup QR",
      node: (
        <PickupQrPage
          menuName={t("mock.bibimbapSetName")}
          menuImg="https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400"
          price="6,000"
          pickupStatus={PickupStatus.SCHEDULED}
          pickupDateTime={new Date(2025, 2, 8, 12, 30)}
          deadlineDateTime={new Date(2025, 2, 8, 13, 0)}
          onBack={noop}
        />
      ),
    },
    {
      label: "포인트 신청",
      labelEn: "Point Application",
      node: (
        <PointApplicationPage
          onBack={noop}
          policies={[
            {
              id: 1,
              title: t("mock.lunchEmployee"),
              statusLabelKey: "pointApplication.statusAvailable",
              available: true,
              remainingPoint: "150,000",
              daysKey: "pointApplication.weekdays",
              timeKey: "pointApplication.lunchTime",
              limitPerUseKey: "pointApplication.limitPerUse",
              limitPerDayKey: "pointApplication.limitPerDay",
              expiryKey: "pointApplication.expiry",
              approvalKey: "pointApplication.autoApproval",
            },
            {
              id: 2,
              title: t("mock.dinnerEmployee"),
              statusLabelKey: "pointApplication.statusUnavailable",
              available: false,
              remainingPoint: "0",
              daysKey: "pointApplication.weekdays",
              timeKey: "pointApplication.dinnerTime",
            },
          ]}
        />
      ),
    },
    {
      label: "환경설정",
      labelEn: "Settings",
      node: <EnvironmentSettingsPage onBack={noop} />,
    },
    {
      label: "비밀번호 변경",
      labelEn: "Password Change",
      node: <PasswordChangePage onBack={noop} />,
    },
  ];
}

// ─── PhoneFrame ──────────────────────────────────────────────
function PhoneFrame({
  label,
  scale,
  children,
}: {
  label: string;
  scale: number;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {/* Label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: colors.black,
          letterSpacing: -0.3,
          fontFamily,
          textAlign: "center",
          maxWidth: PHONE_W * scale,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Phone bezel */}
      <div
        style={{
          width: PHONE_W * scale,
          height: PHONE_H * scale,
          borderRadius: 24 * scale,
          border: "2px solid #D1D5DB",
          overflow: "hidden",
          backgroundColor: colors.white,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        {/* Scaled content */}
        <div
          style={{
            width: PHONE_W,
            height: PHONE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── DesignOverviewPage ──────────────────────────────────────
interface DesignOverviewPageProps {
  onClose?: () => void;
  /** true = render inline (no fixed overlay, no header) */
  embedded?: boolean;
}

export default function DesignOverviewPage({ onClose, embedded }: DesignOverviewPageProps) {
  const [scale, setScale] = useState(0.38);
  const [search, setSearch] = useState("");
  const lang = i18n.language;

  const frames = useFrames();

  const filteredFrames = frames.filter((f) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return f.label.toLowerCase().includes(q) || f.labelEn.toLowerCase().includes(q);
  });

  const toggleLang = () => {
    i18n.changeLanguage(lang === "ko" ? "en" : "ko");
  };

  // ── Embedded mode: no fixed overlay, no header row 1 ──
  if (embedded) {
    return (
      <div style={{ display: "flex", flexDirection: "column", fontFamily }}>
        {/* Controls bar */}
        <div style={s.embeddedToolbar}>
          <input
            type="text"
            placeholder={lang === "ko" ? "페이지 검색..." : "Search pages..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.searchInput}
          />
          <div style={s.controls}>
            <span style={s.pageCount}>
              {filteredFrames.length}
            </span>
            <button onClick={toggleLang} style={s.toolBtn} title="Toggle language">
              <Globe size={16} color="#555" />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#555" }}>
                {lang.toUpperCase()}
              </span>
            </button>
            <button
              onClick={() => setScale((prev) => Math.max(0.2, prev - 0.05))}
              style={s.toolBtn}
              title="Zoom out"
            >
              <ZoomOut size={16} color="#555" />
            </button>
            <span style={s.zoomLabel}>{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((prev) => Math.min(1, prev + 0.05))}
              style={s.toolBtn}
              title="Zoom in"
            >
              <ZoomIn size={16} color="#555" />
            </button>
          </div>
        </div>

        {/* Phone frame grid */}
        <div style={{ padding: 16, backgroundColor: "#F0F2F5" }}>
          <div style={s.grid}>
            {filteredFrames.map((frame) => (
              <PhoneFrame
                key={frame.labelEn}
                label={lang === "ko" ? frame.label : frame.labelEn}
                scale={scale}
              >
                {frame.node}
              </PhoneFrame>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Full-screen overlay mode ──
  return (
    <div style={s.root}>
      {/* ── Toolbar Row 1 ── */}
      <div style={s.toolbar}>
        <div style={s.toolbarLeft}>
          <button onClick={onClose} style={s.backBtn} title="Back">
            <ChevronLeft size={24} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.toolbarTitle}>Design Overview</span>
          <span style={s.pageCount}>
            {filteredFrames.length} {lang === "ko" ? "페이지" : "pages"}
          </span>
        </div>

        <button onClick={onClose} style={s.closeBtn} title="Close overview">
          <X size={18} color="#fff" />
        </button>
      </div>

      {/* ── Toolbar Row 2: search + controls ── */}
      <div style={s.toolbar2}>
        <input
          type="text"
          placeholder={lang === "ko" ? "페이지 검색..." : "Search pages..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={s.searchInput}
        />

        <div style={s.controls}>
          {/* Language toggle */}
          <button onClick={toggleLang} style={s.toolBtn} title="Toggle language">
            <Globe size={16} color="#555" />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#555" }}>
              {lang.toUpperCase()}
            </span>
          </button>

          {/* Zoom controls */}
          <button
            onClick={() => setScale((prev) => Math.max(0.2, prev - 0.05))}
            style={s.toolBtn}
            title="Zoom out"
          >
            <ZoomOut size={16} color="#555" />
          </button>
          <span style={s.zoomLabel}>{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((prev) => Math.min(1, prev + 0.05))}
            style={s.toolBtn}
            title="Zoom in"
          >
            <ZoomIn size={16} color="#555" />
          </button>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div style={s.canvas}>
        <div style={s.grid}>
          {filteredFrames.map((frame) => (
            <PhoneFrame
              key={frame.labelEn}
              label={lang === "ko" ? frame.label : frame.labelEn}
              scale={scale}
            >
              {frame.node}
            </PhoneFrame>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  root: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F0F2F5",
    fontFamily,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderBottom: "1px solid #E5E7EB",
    flexShrink: 0,
    gap: 16,
  },
  toolbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },
  backBtn: {
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  toolbarTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.black,
    letterSpacing: -0.5,
  },
  pageCount: {
    fontSize: 12,
    fontWeight: 600,
    color: "#9CA3AF",
    backgroundColor: "#F3F4F6",
    paddingTop: 3,
    paddingRight: 10,
    paddingBottom: 3,
    paddingLeft: 10,
    borderRadius: 100,
  },
  toolbar2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderBottom: "1px solid #E5E7EB",
    flexShrink: 0,
    gap: 16,
  },
  searchInput: {
    width: "100%",
    height: 34,
    borderRadius: 8,
    border: "1px solid #D1D5DB",
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 13,
    fontFamily,
    outline: "none",
    backgroundColor: "#F9FAFB",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  toolBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
    paddingLeft: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E5E7EB",
    borderRadius: 8,
    cursor: "pointer",
  },
  zoomLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#6B7280",
    minWidth: 36,
    textAlign: "center" as const,
  },
  closeBtn: {
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginLeft: 4,
  },
  canvas: {
    flex: 1,
    overflow: "auto",
    padding: 32,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 32,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  embeddedToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderBottom: "1px solid #E5E7EB",
    flexShrink: 0,
    gap: 16,
  },
};