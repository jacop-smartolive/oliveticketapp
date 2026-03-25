import { useState } from "react";
import { ChevronLeft, ChevronDown, ChevronUp, Plus } from "lucide-react";

const pointsData = [
  {
    id: 1,
    title: "중식 - 임직원",
    status: "사용 가능",
    active: true,
    balance: 29000,
    days: "월, 화, 수, 목, 금, 토, 일, 공휴일",
    time: "00:00 - 23:50",
    limitPerUse: "제한없음",
    limitPerDay: "제한없음",
    expiry: "충전일 ~ 무기한",
    approval: "승인 불필요",
  },
  {
    id: 2,
    title: "석식 - 임직원",
    status: "사용 가능",
    active: true,
    balance: 29000,
    days: "월, 화, 수, 목, 금, 토, 일, 공휴일",
    time: "00:00 - 23:50",
    limitPerUse: "제한없음",
    limitPerDay: "제한없음",
    expiry: "충전일 ~ 무기한",
    approval: "승인 불필요",
  },
  {
    id: 3,
    title: "석식 - 임직원",
    status: "사용 불가",
    active: false,
    balance: 29000,
    days: "월, 화, 수, 목, 금, 토, 일, 공휴일",
    time: "00:00 - 23:50",
    limitPerUse: "제한없음",
    limitPerDay: "제한없음",
    expiry: "충전일 ~ 무기한",
    approval: "승인 불필요",
  },
];

function PointCard({ item }) {
  const [expanded, setExpanded] = useState(item.id === 1);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        marginBottom: 10,
        overflow: "hidden",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        border: "1px solid #f0f0f0",
        opacity: item.active ? 1 : 0.6,
      }}
    >
      {/* Card Header */}
      <div style={{ padding: "14px 16px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", letterSpacing: "-0.3px" }}>
            {item.title}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: 20,
              background: item.active ? "#fff0f0" : "#f5f5f5",
              color: item.active ? "#e53e3e" : "#999",
              letterSpacing: "-0.2px",
            }}
          >
            {item.active ? "● " : "○ "}{item.status}
          </span>
        </div>

        {/* Balance row */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "#888" }}>잔여 포인트</span>
          <span style={{ fontWeight: 700, fontSize: 18, color: item.active ? "#e53e3e" : "#bbb", letterSpacing: "-0.5px" }}>
            {item.balance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#f5f5f5", margin: "0 16px" }} />

      {/* Always-visible info */}
      <div style={{ padding: "10px 16px" }}>
        <InfoRow label="사용가능 일시">
          <span style={{ color: "#444", fontSize: 12, textAlign: "right" }}>
            {item.days}<br />{item.time}
          </span>
        </InfoRow>
      </div>

      {/* Expandable detail */}
      {expanded && (
        <div style={{ padding: "0 16px 10px" }}>
          <div style={{ height: 1, background: "#f5f5f5", marginBottom: 10 }} />
          <InfoRow label="사용 한도">
            <span style={{ color: "#444", fontSize: 12, textAlign: "right" }}>
              1회 한도 - {item.limitPerUse}<br />1일 한도 - {item.limitPerDay}
            </span>
          </InfoRow>
          <InfoRow label="사용 기한">
            <span style={{ color: "#444", fontSize: 12 }}>{item.expiry}</span>
          </InfoRow>
          <InfoRow label="신청 승인여부">
            <span style={{ color: "#444", fontSize: 12 }}>{item.approval}</span>
          </InfoRow>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          borderTop: "1px solid #f5f5f5",
          padding: "9px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          cursor: "pointer",
          color: "#aaa",
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {expanded ? (
          <><ChevronUp size={14} /> 접기</>
        ) : (
          <><ChevronDown size={14} /> 더 보기</>
        )}
      </button>
    </div>
  );
}

function InfoRow({ label, children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 7,
        gap: 12,
      }}
    >
      <span style={{ fontSize: 12, color: "#aaa", whiteSpace: "nowrap", flexShrink: 0 }}>{label}</span>
      <div style={{ textAlign: "right" }}>{children}</div>
    </div>
  );
}

export default function CorporatePoints() {
  const [tab, setTab] = useState(0);
  const tabs = ["잔여포인트", "충전내역", "신청내역"];
  const totalPoints = pointsData.reduce((sum, p) => sum + p.balance, 0);

  return (
    <div
      style={{
        fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        maxWidth: 390,
        margin: "0 auto",
        minHeight: "100vh",
        background: "#f8f8f8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          padding: "16px 16px 0",
          borderBottom: "1px solid #efefef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <ChevronLeft size={22} color="#1a1a1a" style={{ marginLeft: -4, cursor: "pointer" }} />
          <span style={{ fontWeight: 700, fontSize: 17, marginLeft: 4, letterSpacing: "-0.4px" }}>
            기업 포인트
          </span>
        </div>

        {/* Compact points summary */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff5f5",
            border: "1px solid #fde0e0",
            borderRadius: 12,
            padding: "10px 14px",
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "#e53e3e", fontWeight: 600, marginBottom: 2, letterSpacing: "-0.2px" }}>
              사용가능 포인트
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#e53e3e", letterSpacing: "-1px" }}>
              {totalPoints.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#e53e3e",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: 18 }}>P</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0 }}>
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                borderBottom: tab === i ? "2px solid #e53e3e" : "2px solid transparent",
                padding: "10px 0",
                fontSize: 13,
                fontWeight: tab === i ? 700 : 400,
                color: tab === i ? "#e53e3e" : "#aaa",
                cursor: "pointer",
                letterSpacing: "-0.3px",
                transition: "all 0.15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "14px 14px 100px" }}>
        {tab === 0 && pointsData.map((item) => (
          <PointCard key={item.id} item={item} />
        ))}
        {tab !== 0 && (
          <div style={{ textAlign: "center", color: "#ccc", marginTop: 80, fontSize: 14 }}>
            내역이 없습니다
          </div>
        )}
      </div>

      {/* FAB */}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", maxWidth: 390, width: "100%", display: "flex", justifyContent: "flex-end", padding: "0 16px", boxSizing: "border-box" }}>
        <button
          style={{
            background: "#e53e3e",
            color: "#fff",
            border: "none",
            borderRadius: 24,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(229,62,62,0.35)",
            letterSpacing: "-0.3px",
          }}
        >
          <Plus size={16} /> 포인트 신청
        </button>
      </div>
    </div>
  );
}