/**
 * 인원 선택 / 인원 검색 페이지
 * - 포인트 선물하기 > "포인트 선물" 클릭 시 진입
 * - 기본: 최근 선물한 인원 리스트
 * - 검색창 클릭 시 검색 모드 (이름 기반 필터)
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, spacing, headerTitleBase, radius } from "../shared/tokens";

export interface GiftPerson {
  id: number;
  nameKey: string;
  deptKey: string; // mock.deptStrategy 등
}

const recentPeople: GiftPerson[] = [
  { id: 1, nameKey: "mock.nameHong", deptKey: "mock.deptStrategy" },
  { id: 2, nameKey: "mock.nameHong", deptKey: "mock.deptStrategy" },
  { id: 3, nameKey: "mock.nameHong", deptKey: "mock.deptStrategy" },
  { id: 4, nameKey: "mock.nameHong", deptKey: "mock.deptStrategy" },
];

const allPeople: GiftPerson[] = [
  { id: 11, nameKey: "mock.nameShinJung", deptKey: "mock.deptStrategy" },
  { id: 12, nameKey: "mock.nameShinDonghyun", deptKey: "mock.deptStrategy" },
  { id: 13, nameKey: "mock.nameShinYejun", deptKey: "mock.deptStrategy" },
  { id: 14, nameKey: "mock.nameShinAra", deptKey: "mock.deptManagement" },
  { id: 15, nameKey: "mock.nameHong", deptKey: "mock.deptStrategy" },
  { id: 16, nameKey: "mock.nameYoonSeoa", deptKey: "mock.deptMarketing" },
];

interface GiftRecipientSelectPageProps {
  onBack: () => void;
  onSelect: (person: GiftPerson) => void;
}

export default function GiftRecipientSelectPage({ onBack, onSelect }: GiftRecipientSelectPageProps) {
  const { t } = useTranslation();
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? allPeople.filter((p) => t(p.nameKey).includes(query.trim()))
    : [];

  const deptText = (p: GiftPerson) => `${t("mock.company")} | ${t(p.deptKey)}`;

  const exitSearch = () => {
    setSearchMode(false);
    setQuery("");
  };

  return (
    <div style={s.screen}>
      {/* ── Header ── */}
      {searchMode ? (
        <div style={s.header}>
          <div style={s.searchHeaderRow}>
            <button style={s.backBtn} onClick={exitSearch} aria-label={t("common.back")}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <div style={s.searchInputWrap}>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("gift.searchPlaceholder")}
                style={s.searchInput}
              />
              {query && (
                <button style={s.clearBtn} onClick={() => setQuery("")} aria-label="clear">
                  <X size={16} strokeWidth={2.4} color={colors.white} />
                </button>
              )}
            </div>
            <button style={s.cancelBtn} onClick={exitSearch}>{t("common.cancel")}</button>
          </div>
        </div>
      ) : (
        <div style={s.header}>
          <div style={s.headerInner}>
            <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <span style={s.headerTitle}>{t("gift.selectTitle")}</span>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div style={s.scroll}>
        {!searchMode && (
          <button style={s.searchBar} onClick={() => setSearchMode(true)}>
            <Search size={18} strokeWidth={2.2} color={colors.gray2} />
            <span style={s.searchBarText}>{t("gift.searchPlaceholder")}</span>
          </button>
        )}

        {searchMode ? (
          query.trim() === "" ? null : results.length === 0 ? (
            <div style={s.emptyWrap}>
              <span style={s.emptyText}>{t("gift.noResults")}</span>
            </div>
          ) : (
            <div style={s.list}>
              {results.map((p) => (
                <PersonRow key={p.id} name={t(p.nameKey)} dept={deptText(p)} onClick={() => onSelect(p)} />
              ))}
            </div>
          )
        ) : (
          <>
            <div style={s.sectionHeader}>{t("gift.recentTitle")}</div>
            <div style={s.list}>
              {recentPeople.map((p) => (
                <PersonRow key={p.id} name={t(p.nameKey)} dept={deptText(p)} onClick={() => onSelect(p)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PersonRow({ name, dept, onClick }: { name: string; dept: string; onClick: () => void }) {
  return (
    <button style={s.personRow} onClick={onClick}>
      <div style={s.avatar}>{name.charAt(0)}</div>
      <div style={s.personInfo}>
        <span style={s.personName}>{name}</span>
        <span style={s.personDept}>{dept}</span>
      </div>
    </button>
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
    zIndex: 110,
  },

  // Header
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingLeft: spacing.md,
    paddingRight: spacing.lg,
    height: 54,
    zIndex: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
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
    padding: 0,
    cursor: "pointer",
    flexShrink: 0,
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
  },
  // Search header
  searchHeaderRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  searchInputWrap: {
    flex: 1,
    minWidth: 0,
    height: 38,
    display: "flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
    paddingLeft: 14,
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 14,
    color: colors.black,
    letterSpacing: -0.3,
    fontFamily,
  },
  clearBtn: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.gray2,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    padding: 0,
  },
  cancelBtn: {
    flexShrink: 0,
    backgroundColor: "transparent",
    border: "none",
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.3,
    cursor: "pointer",
    fontFamily,
    padding: 0,
  },

  // Body
  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: 15,
  },
  searchBar: {
    width: "100%",
    height: 44,
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
    border: "none",
    paddingLeft: 16,
    paddingRight: 16,
    cursor: "pointer",
    marginBottom: 18,
  },
  searchBarText: {
    fontSize: 14,
    color: colors.gray2,
    letterSpacing: -0.3,
  },

  sectionHeader: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.2,
    marginBottom: 10,
    paddingLeft: 2,
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  personRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 2,
    paddingRight: 2,
    cursor: "pointer",
    textAlign: "left",
    fontFamily,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.gray6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 700,
    color: colors.gray1,
    flexShrink: 0,
  },
  personInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
  personName: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  personDept: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray1,
    letterSpacing: -0.2,
  },

  emptyWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray2,
  },
};
