/**
 * ② 상태 타입 영문 enum + i18n 키 맵
 *
 * 사용법:
 *   import { useTranslation } from "react-i18next";
 *   const { t } = useTranslation();
 *   t(paymentStatusKey[PaymentStatus.PAID])  // "결제완료" | "Paid"
 *
 * 키 맵 네이밍: xxxLabel → xxxKey (i18n 키 문자열을 반환)
 */

// ─── 결제 상태 ─────────────────────────────────────────────
export const PaymentStatus = {
  PAID: "PAID",
  CANCELLED: "CANCELLED",
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const paymentStatusKey: Record<PaymentStatus, string> = {
  PAID: "enum.paymentStatus.PAID",
  CANCELLED: "enum.paymentStatus.CANCELLED",
};

// ─── 결제 카테고리 ─────────────────────────────────────────
export const PaymentCategory = {
  CAFETERIA: "CAFETERIA",
  SIMPLE_MEAL: "SIMPLE_MEAL",
} as const;
export type PaymentCategory = (typeof PaymentCategory)[keyof typeof PaymentCategory];

export const paymentCategoryKey: Record<PaymentCategory, string> = {
  CAFETERIA: "enum.paymentCategory.CAFETERIA",
  SIMPLE_MEAL: "enum.paymentCategory.SIMPLE_MEAL",
};

// ─── 결제내역 필터 탭 ──────────────────────────────────────
export const FilterTab = {
  ALL: "ALL",
  CAFETERIA: "CAFETERIA",
  SIMPLE_MEAL: "SIMPLE_MEAL",
} as const;
export type FilterTab = (typeof FilterTab)[keyof typeof FilterTab];

export const filterTabKey: Record<FilterTab, string> = {
  ALL: "enum.filterTab.ALL",
  CAFETERIA: "enum.filterTab.CAFETERIA",
  SIMPLE_MEAL: "enum.filterTab.SIMPLE_MEAL",
};

// ─── 픽업 상태 ─────────────────────────────────────────────
export const PickupStatus = {
  SCHEDULED: "SCHEDULED",
  COMPLETED: "COMPLETED",
  UNCLAIMED: "UNCLAIMED",
} as const;
export type PickupStatus = (typeof PickupStatus)[keyof typeof PickupStatus];

export const pickupStatusKey: Record<PickupStatus, string> = {
  SCHEDULED: "enum.pickupStatus.SCHEDULED",
  COMPLETED: "enum.pickupStatus.COMPLETED",
  UNCLAIMED: "enum.pickupStatus.UNCLAIMED",
};

// ─── 기업포인트 신청 상태 ──────────────────────────────────
export const RequestStatus = {
  APPLIED: "APPLIED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

export const requestStatusKey: Record<RequestStatus, string> = {
  APPLIED: "enum.requestStatus.APPLIED",
  APPROVED: "enum.requestStatus.APPROVED",
  REJECTED: "enum.requestStatus.REJECTED",
};

// ─── 기업포인트 신청내역 필터 ──────────────────────────────
export const RequestFilter = {
  ALL: "ALL",
  APPLIED: "APPLIED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
export type RequestFilter = (typeof RequestFilter)[keyof typeof RequestFilter];

export const requestFilterKey: Record<RequestFilter, string> = {
  ALL: "enum.requestFilter.ALL",
  APPLIED: "enum.requestFilter.APPLIED",
  APPROVED: "enum.requestFilter.APPROVED",
  REJECTED: "enum.requestFilter.REJECTED",
};

// ─── 문의 상태 ─────────────────────────────────────────────
export const InquiryStatus = {
  WAITING: "WAITING",
  ANSWERED: "ANSWERED",
} as const;
export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus];

export const inquiryStatusKey: Record<InquiryStatus, string> = {
  WAITING: "enum.inquiryStatus.WAITING",
  ANSWERED: "enum.inquiryStatus.ANSWERED",
};

// ─── 식사 시간 ─────────────────────────────────────────────
export const MealTime = {
  BREAKFAST: "BREAKFAST",
  LUNCH: "LUNCH",
  DINNER: "DINNER",
} as const;
export type MealTime = (typeof MealTime)[keyof typeof MealTime];

export const mealTimeKey: Record<MealTime, string> = {
  BREAKFAST: "enum.mealTime.BREAKFAST",
  LUNCH: "enum.mealTime.LUNCH",
  DINNER: "enum.mealTime.DINNER",
};

// ─── 홈 탭 ────────────────────────────────────────────────
export const HomeTab = {
  CAFETERIA: "CAFETERIA",
  SIMPLE_MEAL: "SIMPLE_MEAL",
} as const;
export type HomeTab = (typeof HomeTab)[keyof typeof HomeTab];

export const homeTabKey: Record<HomeTab, string> = {
  CAFETERIA: "enum.homeTab.CAFETERIA",
  SIMPLE_MEAL: "enum.homeTab.SIMPLE_MEAL",
};