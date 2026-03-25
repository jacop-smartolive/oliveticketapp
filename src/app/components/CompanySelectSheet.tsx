/**
 * 소속 선택 바텀시트
 * 로그인 시 중복 소속 유저가 기업을 선택하는 UI
 */
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { colors, fontFamily, radius } from "../shared/tokens";

// ─── Types ───────────────────────────────────────────────────
export interface CompanyOption {
  code: string;
  name: string;
}

interface CompanySelectSheetProps {
  companies: CompanyOption[];
  onSelect: (company: CompanyOption) => void;
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────────────
export default function CompanySelectSheet({
  companies,
  onSelect,
  onClose,
}: CompanySelectSheetProps) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 280);
  };

  const handleConfirm = () => {
    const company = companies.find((c) => c.code === selected);
    if (!company) return;
    setShow(false);
    setTimeout(() => onSelect(company), 280);
  };

  return (
    <>
      <style>{keyframes}</style>
      {/* ── Backdrop ── */}
      <div
        style={{
          ...s.backdrop,
          opacity: show ? 1 : 0,
        }}
        onClick={handleClose}
      />

      {/* ── Sheet ── */}
      <div
        style={{
          ...s.sheet,
          transform: show ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {/* Handle bar */}
        <div style={s.handleBar}>
          <div style={s.handle} />
        </div>

        {/* Title */}
        <div style={s.titleArea}>
          <p style={s.title}>{t("login.selectCompanyTitle")}</p>
          <p style={s.desc}>{t("login.selectCompanyDesc")}</p>
        </div>

        {/* Company list */}
        <div style={s.listWrap}>
          {companies.map((company) => {
            const isSelected = selected === company.code;
            return (
              <button
                key={company.code}
                style={{
                  ...s.item,
                  backgroundColor: isSelected ? colors.primaryLight : colors.white,
                  borderColor: isSelected ? colors.primary : colors.gray5,
                }}
                onClick={() => setSelected(company.code)}
              >
                <div style={s.itemLeft}>
                  {/* 선택 인디케이터 바 */}
                  <div
                    style={{
                      ...s.accentBar,
                      backgroundColor: isSelected ? colors.primary : colors.gray5,
                    }}
                  />
                  <span
                    style={{
                      ...s.companyName,
                      color: isSelected ? colors.primary : colors.black,
                    }}
                  >
                    {company.name}
                  </span>
                </div>
                {isSelected ? (
                  <div style={s.checkCircle}>
                    <Check size={14} strokeWidth={2.5} color={colors.white} />
                  </div>
                ) : (
                  <div style={s.emptyCircle} />
                )}
              </button>
            );
          })}
        </div>

        {/* Confirm button */}
        <div style={s.bottomBar}>
          <button
            style={{
              ...s.confirmBtn,
              backgroundColor: selected ? colors.primary : colors.gray3,
              cursor: selected ? "pointer" : "not-allowed",
            }}
            disabled={!selected}
            onClick={handleConfirm}
          >
            {t("login.selectCompanyConfirm")}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Keyframes ───────────────────────────────────────────────
const keyframes = `
@keyframes sheetSlideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
`;

// ─── Styles ──────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(25,26,28,0.45)",
    zIndex: 500,
    transition: "opacity 0.28s ease",
  },
  sheet: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 510,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    flexDirection: "column",
    maxHeight: "70vh",
    transition: "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
    fontFamily,
    boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
  },
  handleBar: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 4,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray3,
  },

  /* Title */
  titleArea: {
    padding: "16px 24px 8px",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.4,
    margin: 0,
  },
  desc: {
    fontSize: 14,
    color: colors.gray1,
    marginTop: 6,
    marginBottom: 0,
    letterSpacing: -0.2,
  },

  /* List */
  listWrap: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 24px 8px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 18px",
    borderRadius: radius.md,
    border: "1.5px solid",
    backgroundColor: colors.white,
    fontFamily,
    cursor: "pointer",
    transition: "all 0.18s ease",
    width: "100%",
    textAlign: "left",
  },
  itemLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  accentBar: {
    width: 4,
    height: 22,
    borderRadius: 2,
    transition: "background 0.18s ease",
    flexShrink: 0,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: -0.3,
    transition: "color 0.18s ease",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    border: `2px solid ${colors.gray5}`,
    backgroundColor: colors.white,
    flexShrink: 0,
  },

  /* Bottom */
  bottomBar: {
    padding: "12px 24px 24px",
  },
  confirmBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    borderRadius: radius.md,
    border: "none",
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.16,
    fontFamily,
    transition: "background 0.2s ease",
  },
};