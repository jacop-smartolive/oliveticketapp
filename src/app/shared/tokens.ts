/**
 * 공통 디자인 토큰 — 전체 앱에서 import하여 사용
 * 올리브식권 Design System
 */

export const colors = {
  primary: "#EE2B2F",
  primaryDark: "#C91020",
  primaryLight: "#FFF0F1",
  blue: "#1D8AFF",
  black: "#191A1C",
  /** 본문 보조 텍스트 (중간 회색) */
  gray1: "#6E6F70",
  /** 비활성/힌트 텍스트 */
  gray2: "#A3A3A3",
  /** 탭 비활성, 약한 텍스트 */
  gray3: "#C1C1C1",
  /** 하단 네비 비활성 아이콘 */
  gray4: "#ADAFBB",
  /** 구분선, border 공통 */
  gray5: "#EAEAEA",
  /** 밝은 배경 구분 */
  gray6: "#F0F0F0",
  gray7: "#EFEFEF",
  /** 앱 전체 배경 */
  bg: "#F2F2F2",
  white: "#FFFFFF",
  success: "#34C759",
  /** 홈 헤더 포인트 라벨용 (블루그레이) */
  blueGray: "#8C96A8",
  /** border alias → gray5 (#EAEAEA) */
  border: "#EAEAEA",
  /** bgLight alias → bg (#F2F2F2) */
  bgLight: "#F2F2F2",
  /** input 배경 (읽기전용/비활성 공통) */
  inputBg: "#F7F7F9",
  /** 토글 off 색상 */
  toggleOff: "#D1D1D6",
  /** 탭 비활성 텍스트 (gray3 alias) */
  grayTab: "#C1C1C1",
} as const;

export const fontFamily = "'Pretendard', sans-serif";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

/** 상단 헤더 공통 높이 */
export const headerHeight = 54;

/** pill 뱃지 공통 베이스 스타일 */
export const pillBadgeBase: import("react").CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: -0.4,
  lineHeight: 1,
  height: 22,
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 10,
  paddingRight: 10,
  whiteSpace: "nowrap",
  flexShrink: 0,
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

/** 헤더 타이틀 공통 베이스 — 긴 텍스트(i18n) 대비 */
export const headerTitleBase: import("react").CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: -0.17,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
};