import { useState, useMemo, useCallback, useRef } from "react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Calendar } from "lucide-react";
import { colors, fontFamily, radius } from "../shared/tokens";
import type { TFunction } from "i18next";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerPageProps {
  onBack: () => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onLabelChange?: (label: string) => void;
}

// ─── Helpers ─────────────────────────────────────────────────
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Mon=0 ... Sun=6
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}

function formatRangeLabel(range: DateRange, t: TFunction): string {
  if (!range.start) return "";
  const months = (t("dateFormat.monthShort") as string).split(",");
  const s = range.start;
  const sMonth = months[s.getMonth()];
  const startStr = t("dateFormat.monthDay", { month: sMonth, monthShort: sMonth, day: s.getDate() });
  if (!range.end || isSameDay(range.start, range.end)) return startStr;
  const e = range.end;
  const eMonth = months[e.getMonth()];
  const endStr = t("dateFormat.monthDay", { month: eMonth, monthShort: eMonth, day: e.getDate() });
  const sep = t("dateFormat.rangeSeparator") as string;
  return `${startStr}${sep}${endStr}`;
}

function generateMonths(): { year: number; month: number }[] {
  const months: { year: number; month: number }[] = [];
  // Show Aug 2025 → Jan 2026
  for (let i = 0; i < 6; i++) {
    const d = new Date(2025, 7 + i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() });
  }
  return months;
}

// ─── Component ──────────────────────────────────────────────
export default function DateRangePickerPage({
  onBack,
  dateRange,
  onDateRangeChange,
  onLabelChange,
}: DateRangePickerPageProps) {
  const { t } = useTranslation();
  const [range, setRange] = useState<DateRange>(dateRange);
  const scrollRef = useRef<HTMLDivElement>(null);
  const months = useMemo(() => generateMonths(), []);

  const handleDateTap = useCallback(
    (date: Date) => {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: date, end: null });
      } else {
        if (date.getTime() < range.start.getTime()) {
          setRange({ start: date, end: range.start });
        } else if (isSameDay(date, range.start)) {
          setRange({ start: date, end: date });
        } else {
          setRange({ start: range.start, end: date });
        }
      }
    },
    [range]
  );

  const handleConfirm = () => {
    const finalRange: DateRange = {
      start: range.start,
      end: range.end ?? range.start,
    };
    onDateRangeChange(finalRange);
    if (onLabelChange) {
      onLabelChange(formatRangeLabel(finalRange, t));
    }
    onBack();
  };

  const displayLabel = formatRangeLabel({
    start: range.start,
    end: range.end ?? range.start,
  }, t);

  return (
    <div style={s.overlay}>
      {/* ── Header: always collapsed style (back + date input inline) ── */}
      <div style={s.dateInputWrapCollapsed}>
        <button style={s.backBtn} onClick={onBack}>
          <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
        </button>
        <div style={{ ...s.dateInputBox, flex: 1 }}>
          <Calendar
            size={15}
            strokeWidth={2.2}
            color={colors.black}
            style={{ flexShrink: 0 }}
          />
          <span style={s.dateInputText}>
            {displayLabel || t("dateRange.title")}
          </span>
        </div>
      </div>

      {/* ── Weekday Header ── */}
      <div style={s.weekdayRow}>
        {t("dateRange.weekdays").split(",").map((d: string, i: number) => (
          <span
            key={d}
            style={{
              ...s.weekdayCell,
              color:
                i === 5
                  ? colors.blue
                  : i === 6
                  ? colors.primary
                  : colors.black,
            }}
          >
            {d}
          </span>
        ))}
      </div>

      {/* ── Calendar Scroll ── */}
      <div style={s.calendarScroll} ref={scrollRef}>
        {months.map(({ year, month }) => (
          <MonthGrid
            key={`${year}-${month}`}
            year={year}
            month={month}
            range={range}
            onDateTap={handleDateTap}
          />
        ))}
        <div style={{ height: 100 }} />
      </div>

      {/* ── Bottom Button ── */}
      <div style={s.bottomBar}>
        <button
          style={{
            ...s.confirmBtn,
            opacity: range.start ? 1 : 0.5,
          }}
          onClick={handleConfirm}
          disabled={!range.start}
        >
          {t("dateRange.confirmBtn")}
        </button>
      </div>
    </div>
  );
}

// ─── MonthGrid ──────────────────────────────────────────────
function MonthGrid({
  year,
  month,
  range,
  onDateTap,
}: {
  year: number;
  month: number;
  range: DateRange;
  onDateTap: (d: Date) => void;
}) {
  const { t } = useTranslation();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevDaysInMonth = getDaysInMonth(prevYear, prevMonth);

  const cells: {
    date: Date;
    day: number;
    isCurrentMonth: boolean;
  }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevDaysInMonth - i;
    cells.push({
      date: new Date(prevYear, prevMonth, d),
      day: d,
      isCurrentMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(year, month, d),
      day: d,
      isCurrentMonth: true,
    });
  }

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const trailing = 7 - (cells.length % 7);
  if (trailing < 7) {
    for (let d = 1; d <= trailing; d++) {
      cells.push({
        date: new Date(nextYear, nextMonth, d),
        day: d,
        isCurrentMonth: false,
      });
    }
  }

  const rows: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  const monthNames = (t("dateFormat.monthShort") as string).split(",");
  const monthLabel = t("dateFormat.yearMonth", {
    year,
    month: month + 1,
    monthShort: monthNames[month],
  });

  return (
    <div style={s.monthContainer}>
      <p style={s.monthLabel}>{monthLabel}</p>
      {rows.map((row, ri) => (
        <div key={ri} style={s.calendarRow}>
          {row.map((cell, ci) => {
            const isStart = isSameDay(cell.date, range.start);
            const isEnd = isSameDay(cell.date, range.end);
            const inRange = isInRange(cell.date, range.start, range.end);
            const isSelected = isStart || isEnd;
            const hasFullRange = range.start && range.end && !isSameDay(range.start, range.end);

            let bgStyle: CSSProperties = {};
            if (inRange && cell.isCurrentMonth) {
              bgStyle = { backgroundColor: colors.primaryLight };
            }
            if (isStart && hasFullRange && cell.isCurrentMonth) {
              bgStyle = {
                background: `linear-gradient(to right, transparent 50%, ${colors.primaryLight} 50%)`,
              };
            }
            if (isEnd && hasFullRange && cell.isCurrentMonth) {
              bgStyle = {
                background: `linear-gradient(to left, transparent 50%, ${colors.primaryLight} 50%)`,
              };
            }

            const actualDow = cell.date.getDay(); // 0=Sun

            return (
              <div
                key={ci}
                style={{ ...s.dayCell }}
                onClick={() => cell.isCurrentMonth && onDateTap(cell.date)}
              >
                {/* Range highlight bar – 원형 높이(42px)에 맞춤 */}
                {(inRange || ((isStart || isEnd) && hasFullRange)) && (
                  <div
                    style={{
                      position: "absolute",
                      top: 7,
                      bottom: 7,
                      left: (isStart && cell.isCurrentMonth) ? "50%" : 0,
                      right: (isEnd && cell.isCurrentMonth) ? "50%" : 0,
                      backgroundColor: colors.primaryLight,
                    }}
                  />
                )}
                <div
                  style={{
                    ...s.dayInner,
                    backgroundColor:
                      isSelected && cell.isCurrentMonth
                        ? colors.primary
                        : "transparent",
                    borderRadius: radius.full,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      ...s.dayText,
                      color: !cell.isCurrentMonth
                        ? colors.gray2
                        : isSelected
                        ? colors.white
                        : actualDow === 0
                        ? colors.primary
                        : actualDow === 6
                        ? colors.blue
                        : colors.black,
                      fontWeight: isSelected ? 700 : 500,
                    }}
                  >
                    {cell.day}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────
const s: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    fontFamily: fontFamily,
  },
  dateInputWrapCollapsed: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    paddingLeft: 6,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: colors.bg,
  },
  dateInputBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: "none",
    borderRadius: radius.md,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: colors.white,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  dateInputText: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.48,
  },
  weekdayRow: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: colors.bg,
    borderBottom: `1px solid ${colors.gray6}`,
  },
  weekdayCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.48,
  },
  calendarScroll: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
  monthContainer: {
    paddingTop: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  monthLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.48,
    marginBottom: 14,
    paddingLeft: 20,
  },
  calendarRow: {
    display: "flex",
    flexDirection: "row",
  },
  dayCell: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    cursor: "pointer",
    position: "relative",
  },
  dayInner: {
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.48,
    textAlign: "center",
  },
  bottomBar: {
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
    backgroundColor: colors.white,
    boxShadow: "0 -1px 8px rgba(163,163,163,0.6)",
  },
  confirmBtn: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    border: "none",
    fontSize: 17,
    fontWeight: 700,
    color: colors.white,
    letterSpacing: -0.17,
    cursor: "pointer",
  },
};