/**
 * 공통 InfoRow — 좌측 label / 우측 value 2열 레이아웃
 *
 * - label 은 flex-shrink:0 으로 고정, value 가 길면 자동 줄바꿈
 * - value 는 우측 정렬
 * - valueColor 로 글자색 오버라이드 가능
 */
import type { CSSProperties } from "react";
import { colors } from "../shared/tokens";

interface InfoRowProps {
  label: string;
  value: string;
  valueColor?: string;
}

export function InfoRow({ label, value, valueColor }: InfoRowProps) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <span
        style={{
          ...styles.value,
          ...(valueColor ? { color: valueColor } : undefined),
        }}
      >
        {value}
      </span>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.3,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  value: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: -0.2,
    textAlign: "right" as const,
    wordBreak: "break-word" as const,
    minWidth: 0,
  },
};
