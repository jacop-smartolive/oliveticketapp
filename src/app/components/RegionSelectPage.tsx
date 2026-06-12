/**
 * 지역 선택 페이지
 * - 정렬 시트 > "내 지역 설정" 클릭 시 진입
 * - 시·도 그리드 선택 + 구 단위 칩 다중 선택
 * - 초기화 / 취소 / 저장
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";

const PROVINCES = [
  "region.provSeoul", "region.provGyeonggi", "region.provIncheon", "region.provBucheon", "region.provDaejeon",
  "region.provSejong", "region.provBusan", "region.provDaegu", "region.provGwangju", "region.provUlsan",
  "region.provGangwon", "region.provChungbuk", "region.provChungnam", "region.provJeonbuk", "region.provJeonnam",
  "region.provGyeongbuk", "region.provGyeongnam", "region.provJeju",
];

// 시·도별 구 단위 (그 외 시·도는 "전체"만)
const SEOUL_DISTRICTS = [
  "region.d1", "region.d2", "region.d3", "region.d4", "region.d5", "region.d6",
  "region.d7", "region.d8", "region.d9", "region.d10", "region.d11", "region.d12",
  "region.d13", "region.d14", "region.d15", "region.d16", "region.d17", "region.d18",
];
const GYEONGGI_DISTRICTS = [
  "region.g1", "region.g2", "region.g3", "region.g4", "region.g5", "region.g6",
  "region.g7", "region.g8", "region.g9", "region.g10", "region.g11", "region.g12",
  "region.g13", "region.g14", "region.g15", "region.g16", "region.g17", "region.g18",
];
const INCHEON_DISTRICTS = ["region.i1", "region.i2", "region.i3", "region.i4", "region.i5"];
const DAEJEON_DISTRICTS = ["region.dj1", "region.dj2", "region.dj3", "region.dj4", "region.dj5"];
const DISTRICTS_BY_PROVINCE: Record<string, string[]> = {
  "region.provSeoul": SEOUL_DISTRICTS,
  "region.provGyeonggi": GYEONGGI_DISTRICTS,
  "region.provIncheon": INCHEON_DISTRICTS,
  "region.provBucheon": INCHEON_DISTRICTS,
  "region.provDaejeon": DAEJEON_DISTRICTS,
};

interface RegionSelectPageProps {
  onBack: () => void;
}

export default function RegionSelectPage({ onBack }: RegionSelectPageProps) {
  const { t } = useTranslation();
  const [province, setProvince] = useState("region.provSeoul");
  const [selected, setSelected] = useState<Set<string>>(new Set(["region.d1"]));

  const allKey = `all:${province}`;
  const districts = DISTRICTS_BY_PROVINCE[province] ?? [];

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const reset = () => {
    setProvince("region.provSeoul");
    setSelected(new Set());
  };

  const allLabel = `${t(province)} ${t("region.all")}`;

  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
            <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
          </button>
          <span style={s.headerTitle}>{t("region.title")}</span>
        </div>
        <button style={s.resetBtn} onClick={reset}>{t("pointApplication.resetBtn")}</button>
      </div>

      {/* 시·도 그리드 */}
      <div style={s.provinceGrid}>
        {PROVINCES.map((p) => {
          const active = province === p;
          return (
            <button
              key={p}
              style={{ ...s.provinceItem, ...(active ? s.provinceItemActive : {}) }}
              onClick={() => setProvince(p)}
            >
              {t(p)}
            </button>
          );
        })}
      </div>

      {/* 구 단위 칩 */}
      <div style={s.districtScroll}>
        <div style={s.districtWrap}>
          {/* 전체 */}
          <button
            style={{ ...s.districtChip, ...(selected.has(allKey) ? s.districtChipActive : {}) }}
            onClick={() => toggle(allKey)}
          >
            {allLabel}
          </button>
          {districts.map((d) => (
            <button
              key={d}
              style={{ ...s.districtChip, ...(selected.has(d) ? s.districtChipActive : {}) }}
              onClick={() => toggle(d)}
            >
              {t(d)}
            </button>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div style={s.bottomBar}>
        <button style={s.cancelBtn} onClick={onBack}>{t("common.cancel")}</button>
        <button style={s.saveBtn} onClick={onBack}>{t("common.save")}</button>
      </div>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  screen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
    zIndex: 250,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingLeft: spacing.md,
    paddingRight: spacing.lg,
    height: 54,
    flexShrink: 0,
    zIndex: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: 0,
  },
  backBtn: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },
  resetBtn: {
    display: "inline-flex",
    alignItems: "center",
    height: 30,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: radius.full,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    flexShrink: 0,
  },

  // 시·도 그리드
  provinceGrid: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: colors.bg,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    flexShrink: 0,
  },
  provinceItem: {
    flexBasis: "20%",
    maxWidth: "20%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "2px solid transparent",
    borderRadius: radius.full,
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap",
  },
  provinceItemActive: {
    border: `2px solid ${colors.black}`,
    fontWeight: 700,
    color: colors.black,
  },

  // 구 단위
  districtScroll: {
    flex: 1,
    overflowY: "auto",
    padding: spacing.lg,
    paddingBottom: 100,
  },
  districtWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  districtChip: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: radius.sm,
    border: `1px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    fontSize: 13,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.2,
    cursor: "pointer",
    fontFamily,
    whiteSpace: "nowrap",
  },
  districtChipActive: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.white,
    color: colors.primary,
  },

  // 하단
  bottomBar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    gap: 10,
    padding: "16px 16px 24px",
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
    flexShrink: 0,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.gray6,
    color: colors.black,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily,
  },
  saveBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily,
  },
};
