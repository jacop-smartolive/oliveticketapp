/**
 * 공통 토스트 헬퍼 — showSuccessToast / showPlainToast
 */
import type { CSSProperties } from "react";
import { toast } from "sonner";
import { fontFamily } from "./tokens";

export const toastBaseStyle: CSSProperties = {
  background: "rgba(25,26,28,0.92)",
  color: "#fff",
  fontFamily,
  fontSize: 15,
  fontWeight: 600,
  borderRadius: 12,
  border: "none",
  boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
  letterSpacing: -0.3,
  padding: "14px 18px",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

export const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="10" fill="#34C759" />
    <path d="M6 10.5L8.8 13L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 체크 아이콘 포함 성공 토스트 */
export function showSuccessToast(message: string, duration = 1800) {
  toast(message, {
    duration,
    icon: <CheckIcon />,
    style: toastBaseStyle,
  });
}

/** 체크 아이콘 없는 일반 토스트 */
export function showPlainToast(message: string, duration = 2500) {
  toast(message, {
    duration,
    style: toastBaseStyle,
  });
}
