/**
 * 올리브식권 프로젝트 문서 페이지 — 2026.03.11 현재 시점 기준
 * — 페이지 맵 / 네비게이션 플로우 / 스타일 가이드 / 프로젝트 구조
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  UserRound,
  ScrollText,
  ShoppingCart,
  Bell,
  Settings,
  FileText,
  MessageSquare,
  CreditCard,
  QrCode,
  LogIn,
  UserPlus,
  Search,
  Lock,
  Edit,
  Calendar,
  Layers,
  XCircle,
  Package,
  Building2,
  User,
  Trash2,
} from "lucide-react";
import { colors, fontFamily, spacing, radius, pillBadgeBase, headerHeight, headerTitleBase } from "../shared/tokens";
// ─── Types ───────────────────────────────────────────────────
type DocTab = "pagemap" | "navflow" | "styleguide" | "structure";

interface DocsPageProps {
  onBack: () => void;
}

// ─── Page Map Data ──────────────────────────────────────────
interface PageInfo {
  id: string;
  name: string;
  file: string;
  icon: React.ReactNode;
  desc: string;
  children?: PageInfo[];
}

const ICON_SIZE = 16;
const ICON_SW = 2;

const pageTree: PageInfo[] = [
  {
    id: "login",
    name: "로그인",
    file: "LoginPage.tsx",
    icon: <LogIn size={ICON_SIZE} strokeWidth={ICON_SW} />,
    desc: "이메일/비밀번호 입력, 비밀번호 표시 토글, 복수 소속 회사 선택 시트(CompanySelectSheet) 포함",
    children: [
      {
        id: "signup",
        name: "회원가입",
        file: "SignupPage.tsx",
        icon: <UserPlus size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "4스텝 회원가입 폼: Step1 약관 동의 → Step2 기업코드 인증 + 이메일/비밀번호 → Step3 소속 정보 → Step4 개인 정보 → 가입 완료",
      },
      {
        id: "findaccount",
        name: "비밀번호 찾기",
        file: "FindAccountPage.tsx",
        icon: <Search size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "탭 없이 단일 페이지: 이메일 입력 → 인증번호 발송/확인 → 새 비밀번호 입력 → 수정 완료 → 로그인 복귀",
      },
    ],
  },
  {
    id: "home",
    name: "① 홈 (구내식당 / 간편식)",
    file: "App.tsx",
    icon: <Home size={ICON_SIZE} strokeWidth={ICON_SW} />,
    desc: "포인트 카드(→기업포인트), 주간 캘린더(날짜 선택), 아침/점심/저녁 탭, 메뉴 그리드 2열, 간편식 탭 + 날짜 범위 필터, Pull-to-Refresh, 우하단 QR결제 FAB",
    children: [
      {
        id: "menudetail",
        name: "메뉴 상세 (구내식당)",
        file: "MenuDetailPage.tsx",
        icon: <FileText size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "메뉴 이미지 Hero, 스크롤 시 헤더 노출, 코너·영양정보·원산지·운영시간 표시, 하단 '결제하기' 버튼 → QR 결제 페이지로 이동",
      },
      {
        id: "qrpayment",
        name: "QR 결제",
        file: "QrPaymentPage.tsx",
        icon: <QrCode size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "QR 코드 이미지 표시, 기업포인트 정책 카드 리스트(사용가능/불가 구분), 포인트 신청(→PointApplicationPage) 진입, QR 새로고침, 유효시간 표시",
      },
      {
        id: "simplemealdetail",
        name: "간편식 상세",
        file: "SimpleMealDetailPage.tsx",
        icon: <Layers size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "Hero 이미지(noHero 옵션), 잔여수량·마감일·픽업일 정보, 수량 스텝퍼, '장바구니 담기' / '바로 구매' 버튼, quickPurchaseMode(바텀 시트 형태)",
      },
      {
        id: "cart",
        name: "장바구니",
        file: "CartPageOption4.tsx",
        icon: <ShoppingCart size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "담긴 간편식 목록, 수량 ±조절, 개별 삭제(X), 기업포인트 뷰(→CorporatePointPage), 총액 표시, '결제하기' → PaymentConfirmPopup",
      },
      {
        id: "corppoint",
        name: "기업 포인트",
        file: "CorporatePointPage.tsx",
        icon: <CreditCard size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "잔여포인트/충전내역/신청내역 3탭, 포인트 정책 카드 접기/펼치기, 신청 승인 방식 2종(자동 승인: 신청 즉시 포인트 지급 / 관리자 승인: 관리자 승인 처리 시 포인트 지급), 하단 '포인트 신청' 버튼 → PointApplicationPage",
      },
      {
        id: "datepicker",
        name: "날짜 범위 선택",
        file: "DateRangePickerPage.tsx",
        icon: <Calendar size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "달력 기반 시작일~종료일 선택, 간편식 탭 날짜 필터에 사용",
      },
    ],
  },
  {
    id: "receipt",
    name: "② 이용내역",
    file: "PaymentHistoryPage.tsx",
    icon: <ScrollText size={ICON_SIZE} strokeWidth={ICON_SW} />,
    desc: "결제 내역 목록, 전체/구내식당/간편식 탭 필터, 날짜 정렬, 결제상태 Pill 뱃지(결제완료/취소)",
    children: [
      {
        id: "paymentdetail",
        name: "결제 상세",
        file: "PaymentDetailPage.tsx",
        icon: <CreditCard size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "결제 정보(날짜·결제수단·금액·포인트 내역), 픽업 정보 바(간편식), 픽업 QR 버튼, 주문취소 버튼(간편식·픽업예정 상태일 때만 노출) → 취소 확인 팝업",
      },
      {
        id: "pickupqr",
        name: "픽업 QR",
        file: "PickupQrPage.tsx",
        icon: <QrCode size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "2가지 모드 지원: ① QR 체크인(hideQr=false) — QR코드 표시+예약정보+원산지+안내사항(구내식당), ② 예약확인(hideQr=true) — QR 숨김, 예약정보+원산지+안내사항만 표시(간편식 — 픽업 QR 사용안함). PaymentDetailPage 말풍선으로 모드 전환",
      },
    ],
  },
  {
    id: "notification",
    name: "알림 (헤더 벨 아이콘)",
    file: "NotificationPage.tsx",
    icon: <Bell size={ICON_SIZE} strokeWidth={ICON_SW} />,
    desc: "홈/My올리브 헤더의 벨 아이콘 클릭으로 진입 (하단 네비게이션 탭 아님). 9가지 알림 유형(구내식당 결제/취소, 간편식 결제/취소, 기업포인트 신청/승인/승인거부, 문의답변, 공지사항), 읽음/미읽음 도트 표시, 전체 확인 버튼",
  },
  {
    id: "my",
    name: "③ My올리브",
    file: "MyOlivePage.tsx",
    icon: <UserRound size={ICON_SIZE} strokeWidth={ICON_SW} />,
    desc: "프로필 카드(→회원정보), 이벤트 배너, 메뉴 리스트(문의하기/공지사항/환경설정)",
    children: [
      {
        id: "userprofile",
        name: "회원정보",
        file: "UserProfilePage.tsx",
        icon: <Edit size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "계정정보(읽기전용)/개인정보/추가정보 3섹션, 하단 '비밀번호 수정'·'내 정보 수정' 버튼, 로그아웃 확인 팝업, 회원탈퇴 확인 팝업(포인트 경고)",
      },
      {
        id: "userprofileedit",
        name: "내 정보 수정",
        file: "UserProfileEditPage.tsx",
        icon: <Edit size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "닉네임·연락처·이메일·주소 수정 폼, 주소검색 3단계 플로우(검색→확인→상세주소), 저장 시 성공 토스트 노출",
      },
      {
        id: "passwordchange",
        name: "비밀번호 수정",
        file: "PasswordChangePage.tsx",
        icon: <Lock size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "현재 비밀번호 확인 후 새 비밀번호 입력, 저장 시 성공 토스트",
      },
      {
        id: "pointapp",
        name: "기업 포인트 신청 목록",
        file: "PointApplicationPage.tsx",
        icon: <CreditCard size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "정책별 신청 가능 포인트 카드 목록, '신청하기' 버튼 → PointApplicationFormPage",
      },
      {
        id: "pointappform",
        name: "기업 포인트 신청서",
        file: "PointApplicationFormPage.tsx",
        icon: <FileText size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "신청 금액 입력(쉼표 자동 포맷), 사유 입력(100자 제한), 빠른 태그(초과근무/출장), 제출 확인 팝업",
      },
      {
        id: "notice",
        name: "공지사항",
        file: "NoticePage.tsx",
        icon: <FileText size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "공지사항 목록 + 항목 클릭 시 인라인 상세 펼치기",
      },
      {
        id: "inquiry",
        name: "문의하기",
        file: "InquiryPage.tsx",
        icon: <MessageSquare size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "문의 목록(상태 뱃지), 새 문의 작성 폼, 상세(답변 확인)",
      },
      {
        id: "envsettings",
        name: "환경설정",
        file: "EnvironmentSettingsPage.tsx",
        icon: <Settings size={ICON_SIZE} strokeWidth={ICON_SW} />,
        desc: "자동로그인·주문알림·마케팅알림 토글, 언어 설정 팝업(한국어/English/Tiếng Việt) — 언어 선택 후 저장 버튼으로 적용",
      },
    ],
  },
  {
    id: "paymentpopup",
    name: "결제 확인/완료 팝업",
    file: "PaymentPopup.tsx",
    icon: <CreditCard size={ICON_SIZE} strokeWidth={ICON_SW} />,
    desc: "PaymentConfirmPopup(금액 확인) → PaymentCompletePopup(QR결제 완료 팝업) / PaymentCompletePage(간편식 결제 완료 전체 페이지) 분기",
  },
  {
    id: "paymentcomplete",
    name: "결제 완료 (간편식)",
    file: "PaymentCompletePage.tsx",
    icon: <Package size={ICON_SIZE} strokeWidth={ICON_SW} />,
    desc: "슬라이드 인 애니메이션, 주문 아이템 목록, 총 결제금액, 픽업 일시, '추가 구매하기' / '닫기' 버튼",
  },
];

// ─── Navigation Flow Data ────────────────────────────────────
interface FlowStep {
  label: string;
  sub?: string;
  type?: "trigger" | "page" | "popup" | "action" | "end";
}

interface NavFlow {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  steps: FlowStep[];
}

const NAV_FLOWS: NavFlow[] = [
  {
    id: "auth",
    title: "인증 플로우",
    icon: <LogIn size={15} strokeWidth={2} />,
    color: "#5856D6",
    steps: [
      { label: "앱 진입", sub: "isLoggedIn=false", type: "trigger" },
      { label: "로그인 페이지", sub: "LoginPage.tsx", type: "page" },
      { label: "이메일/비밀번호 입력", type: "action" },
      { label: "[복수 소속] 회사 선택 시트", sub: "CompanySelectSheet", type: "popup" },
      { label: "홈 화면 이동", sub: "isLoggedIn=true, activeNav=home", type: "end" },
    ],
  },
  {
    id: "signup",
    title: "회원가입 플로우",
    icon: <UserPlus size={15} strokeWidth={2} />,
    color: "#34C759",
    steps: [
      { label: "로그인 페이지", sub: "LoginPage", type: "page" },
      { label: "'회원가입' 링크 클릭", type: "trigger" },
      { label: "회원가입 페이지", sub: "SignupPage.tsx (4스텝)", type: "page" },
      { label: "Step 1: 약관 동의", sub: "필수 약관 2개 체크 필요", type: "action" },
      { label: "Step 2: 기업코드 인증 → 이메일/비밀번호", sub: "companyCode 인증 → 이메일 인증코드 → 비밀번호 설정", type: "action" },
      { label: "Step 3: 소속 정보 입력", sub: "이름·소속·사번·부서·직급", type: "action" },
      { label: "Step 4: 개인 정보 입력", sub: "닉네임·생년월일·성별·주소 (선택)", type: "action" },
      { label: "가입 완료 → 로그인 페이지 복귀", type: "end" },
    ],
  },
  {
    id: "findaccount",
    title: "비밀번호 찾기 플로우",
    icon: <Search size={15} strokeWidth={2} />,
    color: "#FF9500",
    steps: [
      { label: "로그인 페이지", sub: "LoginPage", type: "page" },
      { label: "'비밀번호 찾기' 링크 클릭", type: "trigger" },
      { label: "비밀번호 찾기 페이지", sub: "FindAccountPage.tsx (탭 없이 단일 페이지)", type: "page" },
      { label: "이메일 입력 → 인증번호 발송", sub: "인증 버튼 클릭 → 타이머 시작 (3분)", type: "action" },
      { label: "인증번호 6자리 입력 → 인증 확인", sub: "이메일 인증 완료 토스트", type: "action" },
      { label: "새 비밀번호 입력 + 확인", sub: "8자 이상, 문자·숫자·특수문자 조합", type: "action" },
      { label: "비밀번호 수정 완료 → 로그인 페이지 복귀", type: "end" },
    ],
  },
  {
    id: "qr-from-fab",
    title: "QR 결제 플로우 (홈 FAB)",
    icon: <QrCode size={15} strokeWidth={2} />,
    color: "#EE2B2F",
    steps: [
      { label: "홈 (구내식당 탭)", sub: "activeTab=CAFETERIA", type: "page" },
      { label: "우하단 QR결제 버튼 탭", sub: "FAB 버튼", type: "trigger" },
      { label: "QR 결제 페이지", sub: "QrPaymentPage.tsx", type: "page" },
      { label: "QR 코드 스캔 또는 기업포인트 확인", type: "action" },
      { label: "[포인트 신청 필요시] 포인트 신청 목록", sub: "PointApplicationPage", type: "popup" },
      { label: "뒤로가기 → 홈", type: "end" },
    ],
  },
  {
    id: "qr-from-detail",
    title: "QR 결제 플로우 (메뉴 상세 → QR)",
    icon: <QrCode size={15} strokeWidth={2} />,
    color: "#EE2B2F",
    steps: [
      { label: "홈 (구내식당 탭)", type: "page" },
      { label: "메뉴 카드 클릭", type: "trigger" },
      { label: "메뉴 상세 페이지", sub: "MenuDetailPage.tsx", type: "page" },
      { label: "원산지·영양정보·운영시간 확인", type: "action" },
      { label: "하단 '결제하기' 버튼 탭", type: "trigger" },
      { label: "메뉴 상세 닫힘 (setSelectedMenu=null)", type: "action" },
      { label: "QR 결제 페이지", sub: "QrPaymentPage.tsx → showQrPayment=true", type: "end" },
    ],
  },
  {
    id: "simplemeal-direct",
    title: "간편식 바로 구매 플로우",
    icon: <Layers size={15} strokeWidth={2} />,
    color: "#007AFF",
    steps: [
      { label: "홈 (간편식 탭)", sub: "activeTab=SIMPLE_MEAL", type: "page" },
      { label: "간편식 카드 '바로 구매' 버튼", sub: "quickPurchaseMode=true", type: "trigger" },
      { label: "간편식 상세 (바텀시트)", sub: "SimpleMealDetailPage.tsx", type: "page" },
      { label: "수량 선택 후 '바로 구매' 탭", type: "action" },
      { label: "결제 확인 팝업", sub: "PaymentConfirmPopup (paymentSource=detail)", type: "popup" },
      { label: "'결제하기' 확인", type: "action" },
      { label: "결제 완료 페이지", sub: "PaymentCompletePage.tsx (슬라이드 인)", type: "end" },
    ],
  },
  {
    id: "simplemeal-cart",
    title: "간편식 장바구니 결제 플로우",
    icon: <ShoppingCart size={15} strokeWidth={2} />,
    color: "#007AFF",
    steps: [
      { label: "홈 (간편식 탭)", type: "page" },
      { label: "간편식 카드 클릭 → 상세 페이지", sub: "SimpleMealDetailPage.tsx", type: "page" },
      { label: "수량 선택 후 '장바구니 담기'", sub: "handleAddToCart()", type: "action" },
      { label: "홈 하단 플로팅 장바구니 바 노출", sub: "cartItems.length > 0", type: "action" },
      { label: "플로팅 바 '장바구니' 클릭 또는 헤더 🛒 아이콘", type: "trigger" },
      { label: "장바구니 페이지", sub: "CartPageOption4.tsx", type: "page" },
      { label: "수량 조절 / 개별 삭제 / 기업포인트 확인", type: "action" },
      { label: "'결제하기' 버튼", sub: "paymentSource=cart", type: "trigger" },
      { label: "결제 확인 팝업", sub: "PaymentConfirmPopup", type: "popup" },
      { label: "결제 완료 페이지", sub: "PaymentCompletePage.tsx", type: "end" },
    ],
  },
  {
    id: "simplemeal-cancel",
    title: "간편식 주문 취소 플로우",
    icon: <XCircle size={15} strokeWidth={2} />,
    color: "#FF3B30",
    steps: [
      { label: "이용내역 탭", sub: "activeNav=receipt", type: "page" },
      { label: "간편식 결제 항목 클릭", sub: "category=SIMPLE_MEAL, status=PAID, pickupStatus=SCHEDULED", type: "trigger" },
      { label: "결제 상세 페이지", sub: "PaymentDetailPage.tsx", type: "page" },
      { label: "하단 '주문 취소' 버튼 클릭", sub: "showCancelBtn 조건 충족 시 노출", type: "trigger" },
      { label: "취소 확인 팝업", sub: "showCancelConfirm=true", type: "popup" },
      { label: "'취소하기' 확인", type: "action" },
      { label: "결제 상세 닫힘 + 홈 이동", sub: "setSelectedPayment(null), setActiveNav(home), toast '주문이 취소되었습니다'", type: "end" },
    ],
  },
  {
    id: "pickup-qr-checkin",
    title: "간편식 픽업 QR — ① QR 체크인 모드",
    icon: <Package size={15} strokeWidth={2} />,
    color: "#FF9500",
    steps: [
      { label: "이용내역 탭", type: "page" },
      { label: "간편식 결제 항목 클릭", sub: "pickupStatus=SCHEDULED", type: "trigger" },
      { label: "결제 상세 페이지", sub: "PaymentDetailPage.tsx", type: "page" },
      { label: "하단 픽업 정보 바 '픽업 QR 보기' 클릭", sub: "isReservationMode=false (기본)", type: "trigger" },
      { label: "픽업 QR 페이지 (QR 체크인)", sub: "PickupQrPage.tsx — hideQr=false", type: "page" },
      { label: "QR 코드 카드 + 예약 정보 + 원산지 + 안내사항", type: "action" },
      { label: "QR 코드 제시 → 픽업 완료", type: "action" },
      { label: "뒤로가기 → 결제 상세", sub: "주문취소는 결제 상세의 '주문 취소' 버튼 사용", type: "end" },
    ],
  },
  {
    id: "pickup-qr-reservation",
    title: "간편식 픽업 QR 사용안함 — ② 예약확인 모드",
    icon: <Package size={15} strokeWidth={2} />,
    color: "#FF9500",
    steps: [
      { label: "결제 상세 페이지", sub: "PaymentDetailPage.tsx", type: "page" },
      { label: "말풍선 'QR 체크인이 아닌 케이스 보기' 클릭", sub: "isReservationMode=true로 전환", type: "trigger" },
      { label: "하단 픽업 바 텍스트 '예약확인 보기'로 변경", type: "action" },
      { label: "'예약확인 보기' 클릭", type: "trigger" },
      { label: "픽업 QR 페이지 (예약확인)", sub: "PickupQrPage.tsx — hideQr=true (QR 숨김)", type: "page" },
      { label: "예약 정보 + 원산지 + 안내사항만 표시", sub: "QR 코드 카드 비노출", type: "action" },
      { label: "뒤로가기 → 결제 상세", type: "end" },
    ],
  },
  {
    id: "corp-point",
    title: "기업 포인트 조회 플로우",
    icon: <Building2 size={15} strokeWidth={2} />,
    color: "#5856D6",
    steps: [
      { label: "홈 화면", type: "page" },
      { label: "상단 포인트 카드 클릭", sub: "showCorporatePoint=true", type: "trigger" },
      { label: "기업 포인트 페이지", sub: "CorporatePointPage.tsx", type: "page" },
      { label: "잔여포인트 탭 — 정책 카드 접기/펼치기", type: "action" },
      { label: "충전내역 탭 — 충전 일자·금액·소진 여부", type: "action" },
      { label: "신청내역 탭 — 신청 상태별 목록", type: "action" },
      { label: "하단 '포인트 신청' 버튼", type: "end" },
    ],
  },
  {
    id: "corp-point-apply",
    title: "기업 포인트 신청 플로우",
    icon: <CreditCard size={15} strokeWidth={2} />,
    color: "#5856D6",
    steps: [
      { label: "기업 포인트 페이지 또는 QR 결제 페이지", sub: "CorporatePointPage / QrPaymentPage", type: "page" },
      { label: "하단 '포인트 신청' 버튼 탭", type: "trigger" },
      { label: "포인트 신청 목록", sub: "PointApplicationPage.tsx", type: "page" },
      { label: "신청 가능한 정책 선택 후 '신청하기'", type: "action" },
      { label: "포인트 신청서", sub: "PointApplicationFormPage.tsx", type: "page" },
      { label: "신청 금액 입력 (쉼표 자동) + 사유 입력", type: "action" },
      { label: "[빠른 태그] 초과근무 / 출장 선택 시 사유 자동 채움", type: "action" },
      { label: "제출 확인 팝업", sub: "showConfirm=true", type: "popup" },
      { label: "[자동 승인] 신청 즉시 포인트 지급 → 승인 완료 토스트", sub: "approvalNotRequired → APPROVED", type: "action" },
      { label: "[관리자 승인] 관리자 승인 처리 시 포인트 지급 → 신청 접수 토스트", sub: "approvalRequired → APPLIED", type: "action" },
      { label: "제출 완료 → 신청내역 탭 자동 이동", type: "end" },
    ],
  },
  {
    id: "my-profile",
    title: "My올리브 → 회원정보 플로우",
    icon: <User size={15} strokeWidth={2} />,
    color: "#34C759",
    steps: [
      { label: "My올리브 탭", sub: "activeNav=my", type: "page" },
      { label: "프로필 카드 클릭", sub: "onProfileClick → showUserProfile=true", type: "trigger" },
      { label: "회원정보 페이지", sub: "UserProfilePage.tsx", type: "page" },
      { label: "계정정보(읽기전용) / 개인정보 / 추가정보 섹션 조회", type: "action" },
      { label: "'비밀번호 수정' 버튼", sub: "PasswordChangePage 모달", type: "popup" },
      { label: "'내 정보 수정' 버튼", sub: "UserProfileEditPage 모달 → 저장 시 성공 토스트", type: "popup" },
    ],
  },
  {
    id: "logout",
    title: "로그아웃 플로우",
    icon: <LogIn size={15} strokeWidth={2} />,
    color: "#8E8E93",
    steps: [
      { label: "회원정보 페이지", sub: "UserProfilePage.tsx", type: "page" },
      { label: "'로그아웃' 링크 클릭", type: "trigger" },
      { label: "로그아웃 확인 팝업", sub: "showLogoutConfirm=true", type: "popup" },
      { label: "'확인' 버튼", type: "action" },
      { label: "로그인 페이지로 이동", sub: "showUserProfile=false, setIsLoggedIn(false)", type: "end" },
    ],
  },
  {
    id: "withdraw",
    title: "회원탈퇴 플로우",
    icon: <Trash2 size={15} strokeWidth={2} />,
    color: "#FF3B30",
    steps: [
      { label: "회원정보 페이지", sub: "UserProfilePage.tsx", type: "page" },
      { label: "'회원탈퇴' 링크 클릭", type: "trigger" },
      { label: "탈퇴 확인 팝업 (경고 아이콘 + 포인트 경고)", sub: "showWithdrawConfirm=true", type: "popup" },
      { label: "[잔여 포인트 > 1,000원] 포인트 환불 경고 배너 노출", type: "action" },
      { label: "'포인트 1,000원 이하 케이스 보기' 말풍선 클릭", sub: "withdrawLowPoint=true → 경고 배너 숨김", type: "action" },
      { label: "하단 'Delete' (영문) / '탈퇴하기' (한국어) 버튼", sub: "deleteAccountBtn 키 사용", type: "trigger" },
      { label: "탈퇴 처리 (TODO) → 팝업 닫힘", type: "end" },
    ],
  },
  {
    id: "env-settings",
    title: "환경설정 플로우",
    icon: <Settings size={15} strokeWidth={2} />,
    color: "#636366",
    steps: [
      { label: "My올리브 탭", type: "page" },
      { label: "'환경설정' 메뉴 클릭", sub: "setEnvironmentSettingsPage(true)", type: "trigger" },
      { label: "환경설정 페이지", sub: "EnvironmentSettingsPage.tsx", type: "page" },
      { label: "자동로그인 / 주문알림 / 마케팅알림 토글 조작", type: "action" },
      { label: "'언어 설정' 행 클릭 → 언어 선택 팝업", sub: "showLangPopup=true", type: "popup" },
      { label: "언어 선택 (한국어/English/Tiếng Việt) 후 '설정'", sub: "pendingLanguage 확정, 팝업 닫기", type: "action" },
      { label: "하단 저장 버튼 클릭", sub: "i18n.changeLanguage() 적용 + 성공 토스트 + onBack()", type: "end" },
    ],
  },
  {
    id: "notice",
    title: "공지사항 플로우",
    icon: <FileText size={15} strokeWidth={2} />,
    color: "#636366",
    steps: [
      { label: "My올리브 탭", type: "page" },
      { label: "'공지사항' 메뉴 클릭", type: "trigger" },
      { label: "공지사항 목록 페이지", sub: "NoticePage.tsx", type: "page" },
      { label: "항목 클릭 → 인라인 상세 펼치기/닫기", type: "action" },
      { label: "뒤로가기 → My올리브", type: "end" },
    ],
  },
  {
    id: "inquiry",
    title: "문의하기 플로우",
    icon: <MessageSquare size={15} strokeWidth={2} />,
    color: "#636366",
    steps: [
      { label: "My올리브 탭", type: "page" },
      { label: "'문의하기' 메뉴 클릭", type: "trigger" },
      { label: "문의 목록 페이지", sub: "InquiryPage.tsx", type: "page" },
      { label: "기존 문의 클릭 → 상세(답변 확인)", type: "action" },
      { label: "'새 문의 작성' 버튼 → 작성 폼", type: "action" },
      { label: "제목·내용 입력 후 제출", type: "end" },
    ],
  },
  {
    id: "notification-triggers",
    title: "알림 발송 시점 정리",
    icon: <Bell size={15} strokeWidth={2} />,
    color: "#007AFF",
    steps: [
      { label: "구내식당 결제 완료", sub: "cafeteria — QR 결제 완료 시 즉시 알림 발송", type: "trigger" },
      { label: "구내식당 결제 취소", sub: "cafeteriaCancel — 구내식당 결제 취소 처리 시 알림 발송", type: "trigger" },
      { label: "간편식 결제 완료", sub: "simpleMeal — 간편식 바로 구매 또는 장바구니 결제 완료 시 알림 발송", type: "trigger" },
      { label: "간편식 주문 취소", sub: "simpleMealCancel — 결제 상세에서 주문취소 확인 시 알림 발송", type: "trigger" },
      { label: "기업포인트 신청", sub: "corpPointApply — 신청서 제출 시 알림 발송 (자동 승인: 즉시 지급 / 관리자 승인: 접수 상태)", type: "trigger" },
      { label: "기업포인트 승인", sub: "corpPointApproved — 관리자 승인 처리 시 포인트 지급 및 알림 발송 (서버)", type: "trigger" },
      { label: "기업포인트 승인거부", sub: "corpPointRejected — 관리자 승인거부 처리 시 알림 발송 (서버)", type: "trigger" },
      { label: "문의 답변", sub: "inquiry — InquiryPage에서 제출한 문의에 관리자 답변 등록 시 알림 발송 (서버)", type: "trigger" },
      { label: "공지사항", sub: "notice — 관리자가 새 공지사항 등록 시 알림 발송 (서버)", type: "trigger" },
      { label: "알림 진입", sub: "홈/My올리브 헤더 벨 아이콘 클릭 → NotificationPage (activeNav='notification')", type: "page" },
      { label: "알림 읽음 처리", sub: "카드 클릭 시 읽음, '모두 확인' 버튼 시 전체 읽음", type: "action" },
    ],
  },
];

// ─── Color Palette Data ──────────────────────────────────────
const COLOR_GROUPS = [
  {
    label: "브랜드",
    items: [
      { name: "primary", value: colors.primary, desc: "포인트 컬러" },
      { name: "primaryDark", value: colors.primaryDark, desc: "다크 변형" },
      { name: "primaryLight", value: colors.primaryLight, desc: "라이트 배경" },
    ],
  },
  {
    label: "시맨틱",
    items: [
      { name: "blue", value: colors.blue, desc: "정보/코너 텍스트" },
      { name: "success", value: colors.success, desc: "성공/완료" },
      { name: "black", value: colors.black, desc: "기본 텍스트" },
      { name: "white", value: colors.white, desc: "배경/텍스트" },
    ],
  },
  {
    label: "그레이스케일",
    items: [
      { name: "gray1", value: "#6E6F70", desc: "보조 텍스트" },
      { name: "gray2", value: colors.gray2, desc: "비활성/힌트" },
      { name: "gray3", value: colors.gray3, desc: "탭 비활성" },
      { name: "gray4", value: colors.gray4, desc: "네비 비활성" },
      { name: "gray5", value: colors.gray5, desc: "구분선/border" },
      { name: "gray6", value: colors.gray6, desc: "밝은 배경 구분" },
      { name: "gray7", value: colors.gray7, desc: "초밝은 배경" },
    ],
  },
  {
    label: "배경",
    items: [
      { name: "bg", value: colors.bg, desc: "앱 전체 배경" },
      { name: "inputBg", value: colors.inputBg, desc: "인풋/읽기전용 배경" },
    ],
  },
];

// ─── Structure Data ──────────────────────────────────────────
const FILE_STRUCTURE = [
  { path: "src/app/App.tsx", desc: "메인 엔트리 — 전체 상태 관리, 홈화면, 하단 탭 네비게이션, sticky 헤더, pull-to-refresh" },
  { path: "src/app/shared/tokens.ts", desc: "디자인 토큰 — colors, fontFamily, spacing, radius, pillBadgeBase, headerHeight" },
  { path: "src/app/shared/enums.ts", desc: "영문 enum — HomeTab, MealTime, PaymentStatus, PickupStatus, PaymentCategory 등" },
  { path: "src/app/shared/formatters.ts", desc: "날짜/시간/금액 포맷 헬퍼 — formatAmount(num), formatAmountStr(str) [vi K접미사], formatMonthDayTime(), formatDateTimeWithDay(), formatDateWithDay(), formatFullDateTime(), formatYearMonth(), formatMonthDay()" },
  { path: "src/app/shared/toast.tsx", desc: "토스트 헬퍼 — showSuccessToast(), showPlainToast()" },
  { path: "src/app/shared/i18n.ts", desc: "i18next 초기화 설정" },
  { path: "src/app/shared/locales/ko.ts", desc: "한국어 번역 파일" },
  { path: "src/app/shared/locales/en.ts", desc: "영어 번역 파일" },
  { path: "src/app/shared/locales/vi.ts", desc: "베트남어 번역 파일" },
  { path: "src/app/components/LoginPage.tsx", desc: "로그인 (복수 소속 회사 선택 포함)" },
  { path: "src/app/components/SignupPage.tsx", desc: "회원가입" },
  { path: "src/app/components/FindAccountPage.tsx", desc: "비밀번호 찾기 (탭 없이 단일 페이지: 이메일 인증 → 새 비밀번호 입력)" },
  { path: "src/app/components/CompanySelectSheet.tsx", desc: "복수 소속 회사 선택 바텀시트" },
  { path: "src/app/components/MenuDetailPage.tsx", desc: "메뉴 상세 — onPay prop으로 QR 결제 연결" },
  { path: "src/app/components/SimpleMealDetailPage.tsx", desc: "간편식 상세 (일반/quickPurchaseMode)" },
  { path: "src/app/components/CartPage.tsx", desc: "장바구니 (기본형, 미사용)" },
  { path: "src/app/components/CartPageOption4.tsx", desc: "장바구니 (현재 사용 — 미니멀+아이콘강화형)" },
  { path: "src/app/components/NotificationPage.tsx", desc: "알림 목록 (9종: 구내식당 결제/취소, 간편식 결제/취소, 기업포인트 신청/승인/승인거부, 문의답변, 공지사항)" },
  { path: "src/app/components/QrPaymentPage.tsx", desc: "QR 결제 (기업포인트 정책 카드 + 신청 진입)" },
  { path: "src/app/components/CorporatePointPage.tsx", desc: "기업 포인트 (잔여/충전/신청 3탭)" },
  { path: "src/app/components/DateRangePickerPage.tsx", desc: "날짜 범위 선택 캘린더" },
  { path: "src/app/components/PaymentHistoryPage.tsx", desc: "이용내역 (결제 목록 + 탭 필터)" },
  { path: "src/app/components/PaymentDetailPage.tsx", desc: "결제 상세 (구내식당/간편식 분기, 주문취소)" },
  { path: "src/app/components/PaymentPopup.tsx", desc: "결제 확인/완료 팝업" },
  { path: "src/app/components/PaymentCompletePage.tsx", desc: "결제 완료 상세 화면 (간편식 전용)" },
  { path: "src/app/components/PickupQrPage.tsx", desc: "픽업 QR (구내식당) / 예약확인 (간편식, hideQr=true — 간편식은 픽업 QR 사용안함)" },
  { path: "src/app/components/MyOlivePage.tsx", desc: "My올리브 탭 페이지" },
  { path: "src/app/components/UserProfilePage.tsx", desc: "회원정보 (로그아웃/회원탈퇴 팝업 포함)" },
  { path: "src/app/components/UserProfileEditPage.tsx", desc: "내 정보 수정 폼 (주소검색 3단계 플로우 포함)" },
  { path: "src/app/components/PasswordChangePage.tsx", desc: "비밀번호 수정" },
  { path: "src/app/components/PointApplicationPage.tsx", desc: "기업 포인트 신청 목록" },
  { path: "src/app/components/PointApplicationFormPage.tsx", desc: "기업 포인트 신청서" },
  { path: "src/app/components/NoticePage.tsx", desc: "공지사항 목록/상세" },
  { path: "src/app/components/InquiryPage.tsx", desc: "문의하기 목록/작성/상세" },
  { path: "src/app/components/EnvironmentSettingsPage.tsx", desc: "환경설정 (i18n 언어 전환 — 저장 버튼으로 적용)" },
  { path: "src/app/components/PointIcon.tsx", desc: "포인트 아이콘 SVG 컴포넌트" },
  { path: "src/app/components/InfoRow.tsx", desc: "공통 정보 행 컴포넌트" },
  { path: "src/app/components/DocsPage.tsx", desc: "이 문서 페이지" },
  { path: "src/app/components/DesignOverviewPage.tsx", desc: "디자인 오버뷰 (컴포넌트 갤러리)" },
];

const DESIGN_RULES = [
  { rule: "포인트 컬러", value: "#EE2B2F" },
  { rule: "borderRadius (공통)", value: "12px" },
  { rule: "폰트", value: "Pretendard, sans-serif" },
  { rule: "아이콘", value: "lucide-react (라인 아이콘)" },
  { rule: "상단 헤더 높이", value: "54px" },
  { rule: "헤더 boxShadow", value: "0 2px 10px rgba(0,0,0,0.06)" },
  { rule: "구분선 색상", value: "#EAEAEA (colors.gray5)" },
  { rule: "하단 고정 버튼 높이", value: "50px" },
  { rule: "하단 고정 버튼 fontSize", value: "17px" },
  { rule: "하단 고정 영역 상단 라운드", value: "16px 16px 0 0" },
  { rule: "Pill 뱃지 패딩", value: "5px 10px 6px (한글 시각 보정)" },
  { rule: "토스트", value: "showSuccessToast() / showPlainToast()" },
  { rule: "background 투명", value: 'backgroundColor: "transparent" (not "none")' },
  { rule: "animation", value: "개별 속성 사용 (shorthand 금지)" },
  { rule: "다국어", value: "react-i18next / locales/ko.ts, en.ts, vi.ts" },
  { rule: "VN 금액 포맷", value: "vi 환경 K 접미사 — formatAmount(37000)→'37K', formatAmountStr('5,500')→'5.5K'" },
  { rule: "언어 전환 시", value: "저장 버튼 클릭 시 i18n.changeLanguage() 적용 (홈 이동 없음)" },
  { rule: "구분선 (탭/캘린더)", value: "#D9D9D9 1px solid (tabsSection, calendarSection)" },
];

// ─── Component ───────────────────────────────────────────────
export default function DocsPage({ onBack }: DocsPageProps) {
  const [activeTab, setActiveTab] = useState<DocTab>("pagemap");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(pageTree.filter((p) => p.children).map((p) => p.id))
  );

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const tabs: { key: DocTab; label: string }[] = [
    { key: "pagemap", label: "페이지 맵" },
    { key: "navflow", label: "네비게이션" },
    { key: "styleguide", label: "스타일" },
    { key: "structure", label: "구조" },
  ];

  return (
    <div style={s.overlay}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <button style={s.backBtn} onClick={onBack}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>프로젝트 문서</span>
          <span style={s.headerDate}>2026.03.11</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabRow}>
        {tabs.map((t) => (
          <button
            key={t.key}
            style={{
              ...s.tabBtn,
              color: activeTab === t.key ? colors.primary : colors.gray2,
              borderBottomColor:
                activeTab === t.key ? colors.primary : "transparent",
            }}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={s.scroll} className="hide-scrollbar">
        {activeTab === "pagemap" && <PageMapTab nodes={pageTree} expanded={expandedNodes} onToggle={toggleNode} />}
        {activeTab === "navflow" && <NavFlowTab />}
        {activeTab === "styleguide" && <StyleGuideTab />}
        {activeTab === "structure" && <StructureTab />}
      </div>
    </div>
  );
}

// ─── Page Map Tab ────────────────────────────────────────────
function PageMapTab({
  nodes,
  expanded,
  onToggle,
}: {
  nodes: PageInfo[];
  expanded: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={s.sectionTitle}>전체 페이지 맵 ({countPages(nodes)}개 화면)</div>
      <p style={s.sectionDesc}>
        올리브식권 앱의 전체 화면 구조입니다. ①②③은 하단 네비게이션 3탭이며, 알림은 헤더 벨 아이콘으로 진입합니다. 화살표를 눌러 하위 페이지를 펼칠 수 있습니다.
      </p>
      {nodes.map((node) => (
        <PageNode key={node.id} node={node} depth={0} expanded={expanded} onToggle={onToggle} />
      ))}
    </div>
  );
}

function countPages(nodes: PageInfo[]): number {
  return nodes.reduce(
    (acc, n) => acc + 1 + (n.children ? countPages(n.children) : 0),
    0
  );
}

function PageNode({
  node,
  depth,
  expanded,
  onToggle,
}: {
  node: PageInfo;
  depth: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const isOpen = expanded.has(node.id);

  return (
    <div>
      <div
        style={{
          ...s.pageNode,
          marginLeft: depth * 24,
          borderLeft: depth > 0 ? `2px solid ${colors.gray5}` : "none",
          paddingLeft: depth > 0 ? 16 : 0,
        }}
        onClick={() => hasChildren && onToggle(node.id)}
      >
        <div style={s.pageNodeLeft}>
          <div style={{
            ...s.pageIcon,
            backgroundColor: depth === 0 ? colors.primaryLight : "#EEF2FF",
            color: depth === 0 ? colors.primary : "#6366F1",
          }}>
            {node.icon}
          </div>
          <div style={s.pageNodeText}>
            <div style={s.pageNodeName}>{node.name}</div>
            <div style={s.pageNodeFile}>{node.file}</div>
          </div>
        </div>
        <div style={s.pageNodeRight}>
          {hasChildren && (
            <ChevronRight
              size={16}
              strokeWidth={2}
              color={colors.gray3}
              style={{
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          )}
        </div>
      </div>
      {/* Description */}
      <div
        style={{
          ...s.pageNodeDesc,
          marginLeft: depth * 24 + (depth > 0 ? 18 : 0),
        }}
      >
        {node.desc}
      </div>
      {/* Children */}
      {hasChildren && isOpen && node.children!.map((child) => (
        <PageNode key={child.id} node={child} depth={depth + 1} expanded={expanded} onToggle={onToggle} />
      ))}
    </div>
  );
}

// ─── Navigation Flow Tab ─────────────────────────────────────
function NavFlowTab() {
  const [expandedFlows, setExpandedFlows] = useState<Set<string>>(
    new Set(NAV_FLOWS.map((f) => f.id))
  );

  const toggleFlow = (id: string) => {
    setExpandedFlows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={s.sectionTitle}>전체 네비게이션 플로우 ({NAV_FLOWS.length}개)</div>
      <p style={s.sectionDesc}>
        각 기능별 사용자 이동 경로입니다. 헤더를 탭하면 펼치거나 접을 수 있습니다.
      </p>

      {/* 범례 */}
      <div style={s.legendRow}>
        {[
          { type: "page", label: "페이지", bg: "#EEF2FF", border: "#6366F1" },
          { type: "trigger", label: "트리거", bg: "#FFF7ED", border: "#F97316" },
          { type: "action", label: "액션", bg: "#F0FDF4", border: "#22C55E" },
          { type: "popup", label: "팝업", bg: "#FFF1F2", border: "#EE2B2F" },
          { type: "end", label: "종료", bg: "#F1F5F9", border: "#64748B" },
        ].map((l) => (
          <div key={l.type} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{
              width: 10, height: 10, borderRadius: 3,
              backgroundColor: l.bg,
              border: `1.5px solid ${l.border}`,
            }} />
            <span style={{ fontSize: 11, color: colors.gray2, fontFamily }}>{l.label}</span>
          </div>
        ))}
      </div>

      {NAV_FLOWS.map((flow) => {
        const isOpen = expandedFlows.has(flow.id);
        return (
          <div key={flow.id} style={s.flowCard}>
            {/* Flow Header */}
            <div
              style={{
                ...s.flowHeader,
                borderLeft: `4px solid ${flow.color}`,
              }}
              onClick={() => toggleFlow(flow.id)}
            >
              <div style={s.flowHeaderLeft}>
                <div style={{ ...s.flowIcon, color: flow.color }}>
                  {flow.icon}
                </div>
                <span style={s.flowTitle}>{flow.title}</span>
                <span style={{ ...s.flowStepCount, backgroundColor: `${flow.color}18`, color: flow.color }}>
                  {flow.steps.length}단계
                </span>
              </div>
              <ChevronRight
                size={15}
                strokeWidth={2}
                color={colors.gray3}
                style={{
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
              />
            </div>

            {/* Flow Steps */}
            {isOpen && (
              <div style={s.flowStepList}>
                {flow.steps.map((step, idx) => {
                  const isLast = idx === flow.steps.length - 1;
                  const stepStyle = getStepStyle(step.type);
                  return (
                    <div key={idx} style={s.flowStepRow}>
                      {/* Connector */}
                      <div style={s.flowConnectorCol}>
                        <div style={{
                          ...s.flowStepDot,
                          backgroundColor: stepStyle.border,
                        }} />
                        {!isLast && <div style={{ ...s.flowLine, backgroundColor: flow.color + "30" }} />}
                      </div>
                      {/* Content */}
                      <div style={{
                        ...s.flowStepBox,
                        backgroundColor: stepStyle.bg,
                        borderColor: stepStyle.border,
                        marginBottom: isLast ? 0 : 4,
                      }}>
                        <div style={s.flowStepLabel}>{step.label}</div>
                        {step.sub && (
                          <div style={{ ...s.flowStepSub, color: stepStyle.border }}>
                            {step.sub}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getStepStyle(type?: FlowStep["type"]) {
  switch (type) {
    case "page":
      return { bg: "#EEF2FF", border: "#6366F1" };
    case "trigger":
      return { bg: "#FFF7ED", border: "#F97316" };
    case "action":
      return { bg: "#F0FDF4", border: "#22C55E" };
    case "popup":
      return { bg: "#FFF1F2", border: "#EE2B2F" };
    case "end":
      return { bg: "#F1F5F9", border: "#64748B" };
    default:
      return { bg: "#F8F8F8", border: "#AAAAAA" };
  }
}

// ─── Style Guide Tab ─────────────────────────────────────────
function StyleGuideTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Design Rules */}
      <div>
        <div style={s.sectionTitle}>공통 디자인 규칙</div>
        <div style={s.rulesGrid}>
          {DESIGN_RULES.map((r, i) => (
            <div key={i} style={s.ruleRow}>
              <span style={s.ruleLabel}>{r.rule}</span>
              <span style={s.ruleValue}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <div style={s.sectionTitle}>컬러 팔레트</div>
        {COLOR_GROUPS.map((group) => (
          <div key={group.label} style={{ marginBottom: 16 }}>
            <div style={s.colorGroupLabel}>{group.label}</div>
            <div style={s.colorGrid}>
              {group.items.map((c) => (
                <div key={c.name} style={s.colorItem}>
                  <div
                    style={{
                      ...s.colorSwatch,
                      backgroundColor: c.value,
                      border: c.value === "#FFFFFF" ? `1px solid ${colors.gray5}` : "none",
                    }}
                  />
                  <div style={s.colorName}>{c.name}</div>
                  <div style={s.colorHex}>{c.value}</div>
                  <div style={s.colorDesc}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Spacing */}
      <div>
        <div style={s.sectionTitle}>Spacing 토큰</div>
        <div style={s.spacingGrid}>
          {Object.entries(spacing).map(([key, val]) => (
            <div key={key} style={s.spacingItem}>
              <div style={s.spacingBar}>
                <div style={{ width: val * 2, height: 12, borderRadius: 3, backgroundColor: colors.primary, opacity: 0.7 }} />
              </div>
              <span style={s.spacingLabel}>{key}</span>
              <span style={s.spacingValue}>{val}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Radius */}
      <div>
        <div style={s.sectionTitle}>Border Radius 토큰</div>
        <div style={s.radiusGrid}>
          {Object.entries(radius).map(([key, val]) => (
            <div key={key} style={s.radiusItem}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: val,
                  border: `2px solid ${colors.primary}`,
                  backgroundColor: colors.primaryLight,
                }}
              />
              <span style={s.spacingLabel}>{key}</span>
              <span style={s.spacingValue}>{val}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Components */}
      <div>
        <div style={s.sectionTitle}>공통 컴포넌트 샘플</div>

        {/* Pill Badge — 결제내역 */}
        <div style={s.componentSection}>
          <div style={s.componentLabel}>Pill 뱃지 — 결제내역 (pillBadgeBase)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ ...pillBadgeBase, backgroundColor: "#F3F4F6", color: "#191A1C" }}>결제완료</span>
            <span style={{ ...pillBadgeBase, backgroundColor: "#FFF0F1", color: colors.primary }}>취소</span>
            <span style={{ ...pillBadgeBase, backgroundColor: "rgba(29,138,255,0.1)", color: "#1D8AFF" }}>픽업예정</span>
            <span style={{ ...pillBadgeBase, backgroundColor: "#A3A3A3", color: "#FFFFFF" }}>픽업완료</span>
          </div>
        </div>

        {/* Pill Badge — 기업포인트 */}
        <div style={s.componentSection}>
          <div style={s.componentLabel}>Pill 뱃지 — 기업포인트 (pillBadgeBase)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ ...pillBadgeBase, backgroundColor: "#DDEDFF", color: "#1D8AFF" }}>승인완료</span>
            <span style={{ ...pillBadgeBase, backgroundColor: "#F3F4F6", color: "#191A1C" }}>신청완료</span>
            <span style={{ ...pillBadgeBase, backgroundColor: "#FFF0F1", color: colors.primary }}>승인거부</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={s.componentSection}>
          <div style={s.componentLabel}>버튼</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button style={s.sampleBtnPrimary}>결제하기</button>
            <button style={s.sampleBtnSecondary}>취소</button>
            <button style={s.sampleBtnOutline}>선택</button>
          </div>
        </div>

        {/* Header */}
        <div style={s.componentSection}>
          <div style={s.componentLabel}>상단 헤더 (height: 54, ChevronLeft)</div>
          <div style={s.sampleHeader}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.black }}>페이지 타이틀</span>
          </div>
        </div>

        {/* Toast */}
        <div style={s.componentSection}>
          <div style={s.componentLabel}>토스트 (다크 배경, borderRadius: 12)</div>
          <div style={s.sampleToast}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="10" cy="10" r="10" fill="#34C759" />
              <path d="M6 10.5L8.8 13L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>저장되었습니다.</span>
          </div>
        </div>

        {/* Card */}
        <div style={s.componentSection}>
          <div style={s.componentLabel}>카드 (borderRadius: 12, boxShadow)</div>
          <div style={s.sampleCard}>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors.gray2 }}>잔여 올리브 포인트</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: colors.black }}>12,500</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Structure Tab ───────────────────────────────────────────
function StructureTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* i18n Status */}
      <div>
        <div style={s.sectionTitle}>i18n 진행 상태</div>
        <div style={s.i18nGrid}>
          {[
            { step: "①", name: "공통 토큰 교체", status: "완료", done: true },
            { step: "②", name: "상태 타입 영문 enum (enums.ts)", status: "완료", done: true },
            { step: "③", name: "통화/날짜 포맷 헬퍼 (formatters.ts)", status: "완료", done: true },
            { step: "④", name: "토스트 모듈 분리 (toast.tsx)", status: "완료", done: true },
            { step: "⑤", name: "번역 키 사전 추출 (locales/*.ts)", status: "완료", done: true },
            { step: "⑥", name: "react-i18next 전체 적용", status: "완료", done: true },
            { step: "⑦", name: "한국어 (ko.ts) 번역", status: "완료", done: true },
            { step: "⑧", name: "영어 (en.ts) 번역", status: "완료", done: true },
            { step: "⑨", name: "베트남어 (vi.ts) 번역", status: "완료", done: true },
          ].map((item) => (
            <div key={item.step} style={s.i18nRow}>
              <div
                style={{
                  ...s.i18nStep,
                  backgroundColor: item.done ? colors.success : colors.gray5,
                  color: item.done ? colors.white : colors.gray2,
                }}
              >
                {item.step}
              </div>
              <div style={s.i18nName}>{item.name}</div>
              <div
                style={{
                  ...pillBadgeBase,
                  fontSize: 11,
                  backgroundColor: item.done ? "#E8F5E9" : colors.inputBg,
                  color: item.done ? "#2E7D32" : colors.gray2,
                }}
              >
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File List */}
      <div>
        <div style={s.sectionTitle}>파일 구조 ({FILE_STRUCTURE.length}개 파일)</div>
        <div style={s.fileGrid}>
          {FILE_STRUCTURE.map((f, i) => (
            <div key={i} style={s.fileRow}>
              <div style={s.filePath}>{f.path}</div>
              <div style={s.fileDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Modules */}
      <div>
        <div style={s.sectionTitle}>공유 모듈</div>
        <div style={s.sharedGrid}>
          <div style={s.sharedCard}>
            <div style={s.sharedName}>shared/tokens.ts</div>
            <div style={s.sharedContent}>
              colors, fontFamily, spacing, radius, pillBadgeBase, headerHeight
            </div>
          </div>
          <div style={s.sharedCard}>
            <div style={s.sharedName}>shared/toast.tsx</div>
            <div style={s.sharedContent}>
              toastBaseStyle, showSuccessToast(), showPlainToast(), CheckIcon
            </div>
          </div>
          <div style={s.sharedCard}>
            <div style={s.sharedName}>shared/enums.ts</div>
            <div style={s.sharedContent}>
              HomeTab, MealTime, PaymentStatus, PickupStatus, PaymentCategory, FilterTab, RequestStatus 등
            </div>
          </div>
          <div style={s.sharedCard}>
            <div style={s.sharedName}>shared/formatters.ts</div>
            <div style={s.sharedContent}>
              formatAmount(), formatAmountStr() [vi K접미사], formatMonthDayTime(), formatDateTimeWithDay(), formatFullDateTime(), formatYearMonth()
            </div>
          </div>
          <div style={s.sharedCard}>
            <div style={s.sharedName}>shared/i18n.ts</div>
            <div style={s.sharedContent}>
              i18next 초기화, ko/en/vi 리소스 등록
            </div>
          </div>
          <div style={s.sharedCard}>
            <div style={s.sharedName}>shared/locales/</div>
            <div style={s.sharedContent}>
              ko.ts (한국어), en.ts (영어), vi.ts (베트남어)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 200,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    paddingLeft: 12,
    paddingRight: 16,
    height: headerHeight,
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    zIndex: 10,
    flexShrink: 0,
  },
  headerInner: {
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
    flex: 1,
  },
  headerDate: {
    fontSize: 11,
    color: colors.gray3,
    fontFamily,
  },

  /* Tabs */
  tabRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray5}`,
    flexShrink: 0,
  },
  tabBtn: {
    flex: 1,
    padding: "12px 0",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "2.5px solid transparent",
    fontSize: 13,
    fontWeight: 700,
    fontFamily,
    cursor: "pointer",
    letterSpacing: -0.3,
    transition: "color 0.2s, border-color 0.2s",
  },

  /* Scroll */
  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 16px 40px",
    backgroundColor: colors.white,
  },

  /* Section */
  sectionTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.black,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  sectionDesc: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 1.5,
    marginBottom: 12,
    letterSpacing: -0.2,
  },

  /* Page Node */
  pageNode: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    cursor: "pointer",
    backgroundColor: colors.white,
    borderRadius: 10,
    border: `1px solid ${colors.gray5}`,
  },
  pageNodeLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  pageIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  pageNodeText: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  pageNodeName: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  pageNodeFile: {
    fontSize: 11,
    color: "#6B7280",
    fontFamily: "monospace",
  },
  pageNodeRight: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 8,
  },
  pageNodeDesc: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 1.6,
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    letterSpacing: -0.2,
    backgroundColor: "#F9FAFB",
    borderRadius: "0 0 10px 10px",
    borderLeft: `1px solid ${colors.gray5}`,
    borderRight: `1px solid ${colors.gray5}`,
    borderBottom: `1px solid ${colors.gray5}`,
    marginBottom: 6,
  },

  /* Navigation Flow */
  legendRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 12,
    borderBottom: `1px solid ${colors.gray6}`,
    marginBottom: 4,
  },
  flowCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  flowHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 14px 13px 16px",
    backgroundColor: colors.white,
    cursor: "pointer",
  },
  flowHeaderLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  flowIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  flowTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    flex: 1,
  },
  flowStepCount: {
    fontSize: 11,
    fontWeight: 700,
    borderRadius: 20,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    flexShrink: 0,
  },
  flowStepList: {
    paddingLeft: 16,
    paddingRight: 14,
    paddingBottom: 14,
    paddingTop: 4,
    borderTop: `1px solid ${colors.gray7}`,
    display: "flex",
    flexDirection: "column",
  },
  flowStepRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    gap: 10,
  },
  flowConnectorCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 10,
    flexShrink: 0,
    paddingTop: 10,
  },
  flowStepDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
  flowLine: {
    width: 2,
    flex: 1,
    minHeight: 6,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 2,
  },
  flowStepBox: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  flowStepLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.25,
  },
  flowStepSub: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: -0.1,
    fontFamily: "monospace",
  },

  /* Style Guide */
  rulesGrid: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  ruleRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottom: `1px solid ${colors.gray7}`,
    gap: 12,
  },
  ruleLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    flexShrink: 0,
  },
  ruleValue: {
    fontSize: 12,
    color: colors.gray2,
    textAlign: "right",
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
  colorGroupLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.gray2,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  colorGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  colorItem: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    width: 72,
  },
  colorSwatch: {
    width: 72,
    height: 44,
    borderRadius: 8,
  },
  colorName: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.1,
  },
  colorHex: {
    fontSize: 10,
    color: colors.gray2,
    fontFamily: "monospace",
  },
  colorDesc: {
    fontSize: 10,
    color: colors.gray3,
  },
  spacingGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  spacingItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  spacingBar: {
    width: 80,
    display: "flex",
    alignItems: "center",
  },
  spacingLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.black,
    width: 36,
  },
  spacingValue: {
    fontSize: 11,
    color: colors.gray2,
    fontFamily: "monospace",
  },
  radiusGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "flex-end",
  },
  radiusItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
  },
  componentSection: {
    marginBottom: 20,
  },
  componentLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.gray2,
    marginBottom: 10,
    letterSpacing: -0.1,
  },
  sampleBtnPrimary: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 12,
    border: "none",
    fontSize: 14,
    fontWeight: 700,
    fontFamily,
    cursor: "pointer",
  },
  sampleBtnSecondary: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.inputBg,
    color: colors.gray2,
    borderRadius: 12,
    border: "none",
    fontSize: 14,
    fontWeight: 700,
    fontFamily,
    cursor: "pointer",
  },
  sampleBtnOutline: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "transparent",
    color: colors.black,
    borderRadius: 12,
    border: `1.5px solid ${colors.gray5}`,
    fontSize: 14,
    fontWeight: 700,
    fontFamily,
    cursor: "pointer",
  },
  sampleHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: "12px 16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  sampleToast: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#1C1C1E",
    color: colors.white,
    borderRadius: 12,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 14,
    fontWeight: 500,
    fontFamily,
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
  },
  sampleCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: "16px 20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },

  /* Structure */
  i18nGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  i18nRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: "10px 14px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  i18nStep: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
    fontFamily,
  },
  i18nName: {
    flex: 1,
    fontSize: 13,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
  },
  fileGrid: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  fileRow: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottom: `1px solid ${colors.gray7}`,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  filePath: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.primary,
    fontFamily: "monospace",
    letterSpacing: -0.1,
  },
  fileDesc: {
    fontSize: 12,
    color: colors.gray2,
    letterSpacing: -0.1,
  },
  sharedGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sharedCard: {
    flexBasis: "calc(50% - 4px)",
    minWidth: 0,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: "12px 14px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  sharedName: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.black,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  sharedContent: {
    fontSize: 11,
    color: colors.gray2,
    lineHeight: 1.5,
  },
};
