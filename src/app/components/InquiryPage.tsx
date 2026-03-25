/**
 * 문의하기 페이지 — 리스트 + 작성 + 상세
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Clock, List, MessageSquare } from "lucide-react";
import { colors, fontFamily, pillBadgeBase, headerTitleBase } from "../shared/tokens";
import { InquiryStatus, inquiryStatusKey } from "../shared/enums";
import { formatFullDateTime } from "../shared/formatters";
import { showSuccessToast } from "../shared/toast";

const shadow = "0 1px 6px rgba(0,0,0,0.06)";

// ─── Types ───────────────────────────────────────────────────
interface InquiryItem {
  id: number;
  titleKey?: string;
  titleRaw?: string;
  bodyKey?: string;
  bodyRaw?: string;
  date: Date;
  status: InquiryStatus;
  answer?: {
    textKey?: string;
    textRaw?: string;
    date: Date;
  } | null;
}

interface InquiryPageProps {
  onBack: () => void;
}

type PageView = "list" | "write" | "detail";

// ─── Mock Data ───────────────────────────────────────────────
const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 1,
    titleKey: "inquiry.mock1Title",
    bodyKey: "inquiry.mock1Body",
    date: new Date(2026, 2, 9, 15, 13),
    status: InquiryStatus.WAITING,
    answer: null,
  },
  {
    id: 2,
    titleKey: "inquiry.mock2Title",
    bodyKey: "inquiry.mock2Body",
    date: new Date(2026, 2, 8, 10, 22),
    status: InquiryStatus.ANSWERED,
    answer: {
      textKey: "inquiry.mock2Answer",
      date: new Date(2026, 2, 8, 14, 5),
    },
  },
  {
    id: 3,
    titleKey: "inquiry.mock3Title",
    bodyKey: "inquiry.mock3Body",
    date: new Date(2026, 2, 5, 9, 11),
    status: InquiryStatus.ANSWERED,
    answer: {
      textKey: "inquiry.mock3Answer",
      date: new Date(2026, 2, 5, 11, 30),
    },
  },
];

// ─── Component ───────────────────────────────────────────────
export default function InquiryPage({ onBack }: InquiryPageProps) {
  const { t } = useTranslation();
  // helpers to resolve i18n key vs raw text
  const txt = (key?: string, raw?: string) => (key ? t(key) : raw ?? "");
  const [currentView, setCurrentView] = useState<PageView>("list");
  const [inquiries, setInquiries] = useState<InquiryItem[]>(INITIAL_INQUIRIES);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [writeTitle, setWriteTitle] = useState("");
  const [writeBody, setWriteBody] = useState("");
  const MAX_CHARS = 500;

  const handleGoDetail = (inquiry: InquiryItem) => {
    setSelectedInquiry(inquiry);
    setCurrentView("detail");
  };

  const handleGoWrite = () => {
    setWriteTitle("");
    setWriteBody("");
    setCurrentView("write");
  };

  const handleGoList = () => {
    setCurrentView("list");
    setSelectedInquiry(null);
  };

  const handleSubmit = () => {
    const trimmedTitle = writeTitle.trim();
    const trimmedBody = writeBody.trim();

    if (!trimmedTitle) {
      alert(t("inquiry.valTitleRequired"));
      return;
    }
    if (!trimmedBody) {
      alert(t("inquiry.valContentRequired"));
      return;
    }

    const now = new Date();

    const newInquiry: InquiryItem = {
      id: inquiries.length + 1,
      titleRaw: trimmedTitle,
      bodyRaw: trimmedBody,
      date: now,
      status: InquiryStatus.WAITING,
      answer: null,
    };

    setInquiries([newInquiry, ...inquiries]);
    setWriteTitle("");
    setWriteBody("");
    setCurrentView("list");
    showSuccessToast(t("inquiry.submitSuccess"));
  };

  const handleBodyChange = (value: string) => {
    if (value.length <= MAX_CHARS) {
      setWriteBody(value);
    } else {
      setWriteBody(value.slice(0, MAX_CHARS));
    }
  };

  return (
    <div style={styles.container}>
      {/* ═══ LIST VIEW ═══ */}
      {currentView === "list" && (
        <>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerInner}>
              <div style={styles.headerLeftGroup}>
                <button style={styles.backBtn} onClick={onBack} aria-label={t("common.back")}>
                  <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
                </button>
                <span style={styles.headerTitle}>{t("inquiry.title")}</span>
              </div>
            </div>
          </div>

          {/* Scroll Content */}
          <div style={styles.scroll}>
            {inquiries.length === 0 ? (
              <div style={styles.empty}>
                <div style={styles.emptyIcon}>
                  <MessageSquare size={24} strokeWidth={1.8} />
                </div>
                <span style={styles.emptyText}>{t("inquiry.noInquiries")}</span>
                <span style={styles.emptySub}>{t("inquiry.guideSubtitle")}</span>
              </div>
            ) : (
              <div style={styles.inquiryCard}>
                {inquiries.map((item) => (
                  <div
                    key={item.id}
                    style={styles.inquiryItem}
                    onClick={() => handleGoDetail(item)}
                  >
                    <div style={styles.inquiryItemLeft}>
                      <div style={styles.inquiryItemTop}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            ...(item.status === InquiryStatus.WAITING
                              ? styles.statusBadgeWaiting
                              : styles.statusBadgeAnswered),
                          }}
                        >
                          {t(inquiryStatusKey[item.status])}
                        </span>
                        <span style={styles.inquiryTitle}>{txt(item.titleKey, item.titleRaw)}</span>
                      </div>
                      <span style={styles.inquiryDate}>{formatFullDateTime(item.date)}</span>
                    </div>
                    <ChevronRight size={16} strokeWidth={2} color={colors.gray2} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Button */}
          <div style={styles.bottomAction}>
            <button style={styles.btnPrimary} onClick={handleGoWrite}>
              {t("inquiry.submitInquiry")}
            </button>
          </div>
        </>
      )}

      {/* ═══ WRITE VIEW ═══ */}
      {currentView === "write" && (
        <>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerInner}>
              <div style={styles.headerLeftGroup}>
                <button style={styles.backBtn} onClick={handleGoList} aria-label={t("common.back")}>
                  <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
                </button>
                <span style={styles.headerTitle}>{t("inquiry.title")}</span>
              </div>
            </div>
          </div>

          {/* Scroll Content */}
          <div style={styles.scroll}>
            <div style={styles.writeCard}>
              {/* 제목 */}
              <div style={styles.writeCardHeader}>
                <label style={styles.fieldLabel}>{t("inquiry.fieldTitle")}</label>
                <input
                  className="inquiry-input"
                  style={styles.writeInput}
                  type="text"
                  placeholder={t("inquiry.titlePlaceholder")}
                  value={writeTitle}
                  onChange={(e) => setWriteTitle(e.target.value)}
                />
              </div>

              {/* 내용 */}
              <div style={styles.writeCardHeader}>
                <label style={styles.fieldLabel}>{t("inquiry.fieldContent")}</label>
                <textarea
                  className="inquiry-textarea"
                  style={styles.writeTextarea}
                  placeholder={t("inquiry.contentPlaceholder")}
                  value={writeBody}
                  onChange={(e) => handleBodyChange(e.target.value)}
                />
                <div style={styles.charCount}>
                  <span>{writeBody.length}</span> / {MAX_CHARS}
                </div>
              </div>

              {/* 문의 안내 박스 */}
              <div style={styles.infoBox}>
                <div style={styles.infoBoxHeader}>
                  <div style={styles.infoBoxIcon}>
                    <span style={{ color: colors.white, fontSize: 11, fontWeight: 800, lineHeight: 1 }}>!</span>
                  </div>
                  <span style={styles.infoBoxTitle}>{t("inquiry.infoTitle")}</span>
                </div>
                <div style={styles.infoBoxList}>
                  <div className="inquiry-info-item inquiry-info-item-red" style={styles.infoBoxItemRed}>
                    {t("inquiry.infoItem1")}
                  </div>
                  <div className="inquiry-info-item" style={styles.infoBoxItem}>
                    {t("inquiry.infoItem2")}
                  </div>
                  <div className="inquiry-info-item" style={styles.infoBoxItem}>
                    {t("inquiry.infoItem3")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div style={styles.writeBottomBar}>
            <div style={styles.writeBottomBtns}>
              <button style={styles.cancelBtn} onClick={handleGoList}>
                {t("common.cancel")}
              </button>
              <button style={styles.submitBtn} onClick={handleSubmit}>
                {t("common.submit")}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ═══ DETAIL VIEW ═══ */}
      {currentView === "detail" && selectedInquiry && (
        <>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerInner}>
              <div style={styles.headerLeftGroup}>
                <button style={styles.backBtn} onClick={handleGoList} aria-label={t("common.back")}>
                  <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
                </button>
                <span style={styles.headerTitle}>{t("inquiry.resultTitle")}</span>
              </div>
            </div>
          </div>

          {/* Scroll Content */}
          <div style={styles.scroll}>
            <div style={styles.detailCard}>
              {/* 질문 영역 */}
              <div style={styles.detailQ}>
                <div style={styles.detailMeta}>
                  <span style={styles.detailWho}>{t("inquiry.writtenContent")}</span>
                  <span style={styles.detailDateSm}>{formatFullDateTime(selectedInquiry.date)}</span>
                </div>
                <div style={styles.detailTitleText}>{txt(selectedInquiry.titleKey, selectedInquiry.titleRaw)}</div>
                <div style={styles.detailBodyText}>{txt(selectedInquiry.bodyKey, selectedInquiry.bodyRaw)}</div>
              </div>

              {/* 답변 영역 */}
              {selectedInquiry.answer ? (
                <div style={styles.detailA}>
                  <div style={styles.detailMeta}>
                    <span style={{ ...styles.detailWho, ...styles.detailWhoAnswer }}>
                      {t("inquiry.answerComplete")}
                    </span>
                    <span style={styles.detailDateSm}>{formatFullDateTime(selectedInquiry.answer.date)}</span>
                  </div>
                  <div style={styles.detailBodyText}>{txt(selectedInquiry.answer.textKey, selectedInquiry.answer.textRaw)}</div>
                </div>
              ) : (
                <div style={styles.answerPending}>
                  <div style={styles.answerPendingIcon}>
                    <Clock size={20} strokeWidth={1.8} />
                  </div>
                  <span style={styles.answerPendingText}>{t("inquiry.answerPreparing")}</span>
                </div>
              )}

              {/* 목록으로 버튼 — 카드 안쪽 하단 중앙 */}
              <div style={styles.listBtnWrap}>
                <button style={styles.listBtn} onClick={handleGoList}>
                  <List size={14} strokeWidth={1.8} />
                  {t("common.viewList")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Global Styles */}
      <style>{`
        .inquiry-input:focus,
        .inquiry-textarea:focus {
          background-color: ${colors.white} !important;
        }
        .inquiry-info-item {
          position: relative;
          padding-left: 10px;
        }
        .inquiry-info-item::before {
          content: '*';
          position: absolute;
          left: 0;
          color: ${colors.gray2};
        }
        .inquiry-info-item-red::before {
          color: ${colors.primary} !important;
        }
      `}</style>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const styles: Record<string, CSSProperties> = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: colors.bg,
    display: "flex",
    flexDirection: "column",
    fontFamily,
    zIndex: 1000,
  },

  // ─── Header ───
  header: {
    flexShrink: 0,
    height: "54px",
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "12px",
    paddingRight: "17px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    zIndex: 100,
  },
  headerInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "6px",
  },
  backBtn: {
    width: "30px",
    height: "30px",
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
  },

  // ─── Scroll ───
  scroll: {
    flex: 1,
    overflowY: "auto",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 100,
    paddingLeft: 16,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  // ─── Empty State ───
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    paddingBottom: "60px",
  },
  emptyIcon: {
    width: "56px",
    height: "56px",
    backgroundColor: colors.border,
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.gray2,
    marginBottom: "4px",
  },
  emptyText: {
    fontSize: "16px",
    fontWeight: 600,
    color: colors.gray1,
  },
  emptySub: {
    fontSize: "14px",
    color: colors.gray2,
  },

  // ─── List Card ───
  inquiryCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    boxShadow: shadow,
    overflow: "hidden",
  },
  inquiryItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    borderBottom: `1px solid ${colors.gray5}`,
    cursor: "pointer",
    gap: "12px",
  },
  inquiryItemLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    minWidth: 0,
  },
  inquiryItemTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  inquiryTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: colors.black,
    letterSpacing: "-0.2px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
  },
  statusBadge: {
    ...pillBadgeBase,
    fontSize: "12px",
    borderRadius: "999px",
    flexShrink: 0,
  },
  statusBadgeWaiting: {
    backgroundColor: colors.bgLight,
    color: colors.gray2,
  },
  statusBadgeAnswered: {
    backgroundColor: "#FFF0EE",
    color: colors.primary,
  },
  inquiryDate: {
    fontSize: "13px",
    color: colors.gray2,
  },

  // ─── Write Card ───
  writeCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    boxShadow: shadow,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  writeCardHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  fieldLabel: {
    fontSize: "14px",
    fontWeight: 500,
    color: colors.gray1,
  },
  writeInput: {
    width: "100%",
    paddingTop: 13,
    paddingRight: 16,
    paddingBottom: 13,
    paddingLeft: 16,
    border: `1.5px solid ${colors.border}`,
    borderRadius: 10,
    backgroundColor: colors.bgLight,
    fontSize: "15px",
    color: colors.black,
    fontFamily,
    outline: "none",
    transition: "background-color 0.2s",
  },
  writeTextarea: {
    width: "100%",
    paddingTop: 13,
    paddingRight: 16,
    paddingBottom: 13,
    paddingLeft: 16,
    border: `1.5px solid ${colors.border}`,
    borderRadius: 10,
    backgroundColor: colors.bgLight,
    fontSize: "15px",
    color: colors.black,
    fontFamily,
    outline: "none",
    resize: "none",
    height: "160px",
    lineHeight: 1.7,
    transition: "background-color 0.2s",
  },
  charCount: {
    fontSize: "13px",
    color: colors.gray2,
    textAlign: "right",
    marginTop: "4px",
  },

  // ─── Info Box ───
  infoBox: {
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    backgroundColor: "#FFF2F1",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FFCFCC",
    borderRadius: 12,
    wordBreak: "keep-all" as const,
    overflowWrap: "break-word" as const,
  },
  infoBoxHeader: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "10px",
  },
  infoBoxIcon: {
    width: "18px",
    height: "18px",
    backgroundColor: colors.primary,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoBoxTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: colors.primary,
    flex: 1,
    minWidth: 0,
  },
  infoBoxList: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  infoBoxItem: {
    fontSize: "13.5px",
    color: colors.gray1,
    lineHeight: 1.6,
    wordBreak: "keep-all" as const,
    overflowWrap: "break-word" as const,
  },
  infoBoxItemRed: {
    fontSize: "13.5px",
    color: colors.primary,
    fontWeight: 700,
    lineHeight: 1.6,
    wordBreak: "keep-all" as const,
    overflowWrap: "break-word" as const,
  },

  // ─── Detail Card ───
  detailCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    boxShadow: shadow,
    overflow: "hidden",
  },
  detailQ: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: colors.white,
  },
  detailMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  detailWho: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.4px",
    paddingTop: 3,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    borderRadius: 999,
    backgroundColor: colors.bgLight,
    color: colors.gray2,
  },
  detailWhoAnswer: {
    backgroundColor: "#FFF0EE",
    color: colors.primary,
  },
  detailDateSm: {
    fontSize: "13px",
    color: colors.gray2,
  },
  detailTitleText: {
    fontSize: "16px",
    fontWeight: 700,
    color: colors.black,
    letterSpacing: "-0.3px",
    lineHeight: 1.45,
  },
  detailBodyText: {
    fontSize: "15px",
    color: colors.gray1,
    lineHeight: 1.8,
    whiteSpace: "pre-line",
    marginTop: "2px",
  },
  detailA: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: colors.white,
    borderTop: `1px solid ${colors.gray5}`,
  },

  // ─── Answer Pending ───
  answerPending: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    paddingTop: 28,
    paddingRight: 20,
    paddingBottom: 28,
    paddingLeft: 20,
    backgroundColor: colors.white,
    borderTop: `1px solid ${colors.gray5}`,
  },
  answerPendingIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    backgroundColor: "#F0F0F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.gray2,
    marginBottom: "2px",
  },
  answerPendingText: {
    fontSize: "14px",
    color: colors.gray2,
    fontWeight: 500,
  },

  // ─── List Button (pill outline — 공지사항과 동일) ───
  listBtnWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  listBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    paddingTop: 9,
    paddingRight: 20,
    paddingBottom: 9,
    paddingLeft: 20,
    backgroundColor: "transparent",
    color: "#777",
    fontSize: 13,
    fontWeight: 500,
    fontFamily,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ddd",
    borderRadius: 20,
    cursor: "pointer",
    letterSpacing: -0.15,
  },

  // ─── Bottom Action ───
  bottomAction: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 28,
    paddingLeft: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  btnSecondary: {
    height: 50,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    border: `1.5px solid ${colors.border}`,
    borderRadius: "12px",
    backgroundColor: colors.white,
    fontSize: "17px",
    fontWeight: 600,
    color: colors.gray1,
    cursor: "pointer",
    fontFamily,
    boxShadow: shadow,
    transition: "all 0.15s",
  },
  btnPrimary: {
    width: "100%",
    height: 50,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    border: "none",
    borderRadius: "12px",
    backgroundColor: colors.primary,
    fontSize: "17px",
    fontWeight: 600,
    color: colors.white,
    cursor: "pointer",
    fontFamily,
    boxShadow: "none",
    transition: "all 0.15s",
  },

  // ─── Bottom Write Button ───
  writeBottomBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
  },
  writeBottomBtns: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  writeBottomInput: {
    height: 50,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    border: `1.5px solid ${colors.border}`,
    borderRadius: 12,
    backgroundColor: colors.white,
    fontSize: "17px",
    fontWeight: 600,
    color: colors.gray1,
    cursor: "pointer",
    fontFamily,
    boxShadow: shadow,
    transition: "all 0.15s",
  },
  writeBottomSubmit: {
    height: 50,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    border: "none",
    borderRadius: 12,
    backgroundColor: colors.primary,
    fontSize: "17px",
    fontWeight: 600,
    color: colors.white,
    cursor: "pointer",
    fontFamily,
    boxShadow: "none",
    transition: "all 0.15s",
  },

  // ─── Write Actions ───
  writeActions: {
    paddingTop: 28,
    paddingRight: 20,
    paddingBottom: 28,
    paddingLeft: 20,
    backgroundColor: colors.white,
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: "#6E6F70",
    letterSpacing: -0.15,
    fontFamily,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  },
  submitBtn: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.15,
    fontFamily,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  },
};