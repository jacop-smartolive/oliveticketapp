/**
 * ③ 통화 · 날짜 포맷 헬퍼
 * i18n 적용 — lang 파라미터로 언어별 포맷 분기
 */

import i18n from "./i18n";

const DEFAULT_LOCALE = "ko-KR";

// ─── 통화 ──────────────────────────────────────────────────

/** 숫자 → 콤마 포맷 (예: 130000 → "130,000") */
export function formatNumber(value: number | string, locale = DEFAULT_LOCALE): string {
  const num = typeof value === "string" ? Number(value.replace(/[^0-9.-]/g, "")) : value;
  if (Number.isNaN(num)) return "0";
  return new Intl.NumberFormat(locale).format(num);
}

/** 숫자 → 통화 문자열 (예: 130000 → "130,000원") */
export function formatCurrency(
  value: number | string,
  suffix = "원",
  locale = DEFAULT_LOCALE,
): string {
  return `${formatNumber(value, locale)}${suffix}`;
}

/** 콤마 문자열 → 숫자 (예: "130,000" → 130000) */
export function parseCurrencyString(value: string): number {
  return Number(value.replace(/[^0-9.-]/g, "")) || 0;
}

/**
 * 언어별 금액 포맷
 * - vi: 1000단위 K 표기 (예: 37000 → "37K")
 * - 그 외: 콤마 포맷 (예: 37000 → "37,000")
 */
export function formatAmount(value: number, lang?: string): string {
  const l = lang || getLang();
  if (l === "vi") {
    const k = value / 1000;
    return Number.isInteger(k) ? `${k}K` : `${parseFloat(k.toFixed(1))}K`;
  }
  return value.toLocaleString();
}

/**
 * 콤마 포함 문자열 금액을 언어에 맞게 포맷
 * (예: "37,000" → vi:"37K" / ko:"37,000")
 */
export function formatAmountStr(strValue: string, lang?: string): string {
  const num = Number(strValue.replace(/[^0-9.-]/g, ""));
  if (Number.isNaN(num)) return strValue;
  return formatAmount(num, lang);
}

// ─── 날짜 ──────────────────────────────────────────────────

/** 현재 i18n 언어 코드를 반환 */
function getLang(): string {
  return i18n.language || "ko";
}

/** i18n 리소스에서 monthShort 배열을 가져옴 */
function getMonthShortNames(lang?: string): string[] {
  const l = lang || getLang();
  const csv = i18n.t("dateFormat.monthShort", { lng: l }) as string;
  return csv.split(",");
}

const DAY_NAMES_KO = ["일", "월", "화", "수", "목", "금", "토"] as const;
const DAY_NAMES_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const DAY_NAMES_VI = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"] as const;

/** 요일 이름 반환 */
function getDayName(date: Date, lang?: string): string {
  const l = lang || getLang();
  if (l === "ko") return DAY_NAMES_KO[date.getDay()];
  if (l === "vi") return DAY_NAMES_VI[date.getDay()];
  return DAY_NAMES_EN[date.getDay()];
}

/** Date → "2026.03.10" (ko) / "03/10/2026" (en) */
export function formatDate(
  date: Date,
  separator = ".",
  locale = DEFAULT_LOCALE,
): string {
  if (locale === "ko-KR") {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}${separator}${m}${separator}${d}`;
  }
  return date.toLocaleDateString(locale);
}

/** Date → "2026.03.10 14:30" */
export function formatDateTime(date: Date, separator = "."): string {
  const datePart = formatDate(date, separator);
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${datePart} ${h}:${min}`;
}

/**
 * Date → "3월 10일 (화)" (ko) / "Tue, Mar 10" (en) / "Th 3, 10 Th3" (vi)
 * i18n dateFormat.monthDay 키 사용
 */
export function formatDateWithDay(date: Date, lang?: string): string {
  const l = lang || getLang();
  const m = date.getMonth(); // 0-based
  const d = date.getDate();
  const dow = getDayName(date, l);
  const months = getMonthShortNames(l);

  if (l === "ko") {
    return `${m + 1}월 ${d}일 (${dow})`;
  }
  if (l === "vi") {
    return `${dow}, ${d} ${months[m]}`;
  }
  // en: "Tue, Mar 10"
  return `${dow}, ${months[m]} ${d}`;
}

/**
 * Date → "3월 10일 (화) 14:30" (ko) / "Tue, Mar 10, 14:30" (en) / "Th 3, 10 Th3 14:30" (vi)
 */
export function formatDateTimeWithDay(date: Date, lang?: string): string {
  const l = lang || getLang();
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  if (l === "ko") {
    return `${formatDateWithDay(date, l)} ${h}:${min}`;
  }
  if (l === "vi") {
    return `${formatDateWithDay(date, l)} ${h}:${min}`;
  }
  // en: "Tue, Mar 10, 14:30"
  return `${formatDateWithDay(date, l)}, ${h}:${min}`;
}

/**
 * Date → "12월 17일 20:00" (ko) / "17 Dec 20:00" (en) / "17 Th12 20:00" (vi)
 * 요일 없이 월·일·시간만 표시
 */
export function formatMonthDayTime(date: Date, lang?: string): string {
  const l = lang || getLang();
  const m = date.getMonth(); // 0-based
  const d = date.getDate();
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const time = `${h}:${min}`;
  const months = getMonthShortNames(l);

  if (l === "ko") {
    return `${m + 1}월 ${d}일 ${time}`;
  }
  if (l === "vi") {
    return `${d} ${months[m]} ${time}`;
  }
  // en: "17 Dec 20:00"
  return `${d} ${months[m]} ${time}`;
}

/**
 * Date → "3월 10일" (ko) / "Mar 10" (en) / "10 Th3" (vi)
 * 요일·시간 없이 월·일만 표시
 */
export function formatMonthDay(date: Date, lang?: string): string {
  const l = lang || getLang();
  const m = date.getMonth();
  const d = date.getDate();
  const months = getMonthShortNames(l);

  if (l === "ko") {
    return `${m + 1}월 ${d}일`;
  }
  if (l === "vi") {
    return `${d} ${months[m]}`;
  }
  return `${months[m]} ${d}`;
}

/**
 * Date → "2026년 3월" (ko) / "Mar 2026" (en) / "Th3 2026" (vi)
 */
export function formatYearMonth(date: Date, lang?: string): string {
  const l = lang || getLang();
  const y = date.getFullYear();
  const m = date.getMonth();
  const months = getMonthShortNames(l);

  if (l === "ko") {
    return `${y}년 ${m + 1}월`;
  }
  if (l === "vi") {
    return `${months[m]} ${y}`;
  }
  return `${months[m]} ${y}`;
}

/**
 * Date → "2026.03.09 15:13" (ko) / "Mar 9, 2026 15:13" (en) / "9 Th3, 2026 15:13" (vi)
 * 년월일+시간, 요일 없음 — 공지사항/문의하기 등에서 사용
 */
export function formatFullDateTime(date: Date, lang?: string): string {
  const l = lang || getLang();
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const time = `${h}:${min}`;

  if (l === "ko") {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}.${m}.${d} ${time}`;
  }
  const months = getMonthShortNames(l);
  if (l === "vi") {
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} ${time}`;
  }
  // en: "Mar 9, 2026 15:13"
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${time}`;
}

/**
 * monthsAgo → "23개월 전" (ko) / "23 months ago" (en)
 */
export function formatRelativeMonths(months: number, lang?: string): string {
  const l = lang || getLang();
  return i18n.t("dateFormat.monthsAgo", { count: months, lng: l });
}