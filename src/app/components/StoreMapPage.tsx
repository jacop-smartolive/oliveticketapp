/**
 * 단일 매장 지도 페이지
 * - 가맹점 상세 > "지도" 클릭 시 진입
 * - 해당 가맹점 위치 1곳만 마커 표시 + 매장 정보 패널
 * - 지도 페이지의 매장 선택 화면과 동일 (단, 닫기 X 버튼 없음)
 */
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, Phone } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
import { colors, fontFamily, radius, spacing } from "../shared/tokens";

const CENTER: [number, number] = [37.5595, 126.8290];

function markerIcon(name: string) {
  return L.divIcon({
    className: "",
    iconSize: [140, 70],
    iconAnchor: [70, 58],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none">
        <div style="position:relative;width:44px;height:54px;">
          <svg width="44" height="54" viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 52C22 52 40 34 40 20C40 10.06 31.94 2 22 2C12.06 2 4 10.06 4 20C4 34 22 52 22 52Z" fill="#EE2B2F" stroke="white" stroke-width="2"/>
          </svg>
          <div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);width:26px;height:26px;display:flex;align-items:center;justify-content:center;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><ellipse cx="18" cy="6" rx="3.5" ry="4.5"/><path d="M18 10.5v11.5"/></svg>
          </div>
        </div>
        <div style="margin-top:2px;background:white;border-radius:4px;padding:2px 6px;box-shadow:0 1px 3px rgba(0,0,0,0.15);font-size:11px;font-weight:700;font-family:'Pretendard',sans-serif;color:#333;white-space:nowrap;">${name}</div>
      </div>
    `,
  });
}

interface StoreMapPageProps {
  nameKey: string;
  addressKey?: string;
  onBack: () => void;
}

export default function StoreMapPage({ nameKey, addressKey = "mock.storeAddr1", onBack }: StoreMapPageProps) {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current, {
      center: CENTER,
      zoom: 17,
      zoomControl: false,
      attributionControl: false,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    L.marker(CENTER, { icon: markerIcon(t(nameKey)) }).addTo(map);
    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={s.screen}>
      <div ref={mapRef} style={s.map} />

      {/* 뒤로가기 */}
      <button style={s.backBtn} onClick={onBack} aria-label={t("common.back")}>
        <ChevronLeft size={24} strokeWidth={2.4} color={colors.black} />
      </button>

      {/* 매장 정보 패널 */}
      <div style={s.panel}>
        <div style={s.handle}><div style={s.handleBar} /></div>

        <div style={s.topRow}>
          <div style={s.badgeRow}>
            <span style={s.badge}>{t("map.onSitePayment")}</span>
            <span style={s.badge}>{t("restaurantCafe.preOrder")}</span>
          </div>
          <button style={s.circleBtn} aria-label="call">
            <Phone size={16} strokeWidth={0} fill={colors.gray1} color={colors.gray1} />
          </button>
        </div>

        <span style={s.name}>{t(nameKey)}</span>

        <div style={s.infoRows}>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>{t("map.location")}</span>
            <span style={s.infoValue}>{t("map.fromCurrentLocation")} <span style={{ color: colors.primary, fontWeight: 600 }}>100m</span></span>
          </div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>{t("map.address")}</span>
            <span style={s.infoValue}>{t(addressKey)}</span>
          </div>
        </div>

        <div style={s.btnRow}>
          <button style={s.outlineBtn}>{t("map.findRoute")}</button>
          <button style={s.primaryBtn}>{t("map.order")}</button>
        </div>
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
    backgroundColor: colors.bg,
    fontFamily,
    zIndex: 140,
    overflow: "hidden",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.95)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    zIndex: 10,
  },

  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingBottom: 28,
    boxShadow: "0 -2px 16px rgba(0,0,0,0.12)",
    zIndex: 10,
  },
  handle: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 6,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.gray5,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  badgeRow: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    height: 24,
    paddingLeft: 9,
    paddingRight: 9,
    borderRadius: 6,
    backgroundColor: colors.gray6,
    fontSize: 12,
    fontWeight: 600,
    color: colors.gray1,
    letterSpacing: -0.2,
    whiteSpace: "nowrap",
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.gray6,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  },
  name: {
    display: "block",
    fontSize: 20,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
    marginTop: 14,
  },
  infoRows: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  infoLabel: {
    flexShrink: 0,
    width: 44,
    fontSize: 14,
    fontWeight: 500,
    color: colors.gray2,
    letterSpacing: -0.2,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
    letterSpacing: -0.2,
  },
  btnRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  outlineBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: `1.5px solid ${colors.primary}`,
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily,
  },
  primaryBtn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily,
  },
};
