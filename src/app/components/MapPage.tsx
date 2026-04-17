/**
 * 지도 페이지 — 주변 식당·카페 검색 (Leaflet 실제 지도)
 */
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, MapPin, Navigation, Building2, Crosshair, Bookmark, Phone, X } from "lucide-react";
import type { CSSProperties } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { colors, fontFamily, spacing, radius, headerTitleBase } from "../shared/tokens";
import { showSuccessToast } from "../shared/toast";

interface MapPageProps {
  onBack: () => void;
}

interface Restaurant {
  id: number;
  name: string;
  address: string;
  fullAddress: string;
  distance: string;
  phone: string;
  badge: string;
  category: "food" | "cafe" | "etc";
  lat: number;
  lng: number;
  img: string;
}

/* 마곡역 주변 mock 가맹점 */
const mockRestaurants: Restaurant[] = [
  { id: 1, name: "옥돌현옥", address: "서울 구로구 · 한식", fullAddress: "서울 강서구 공항대로 627 1층", distance: "100m", phone: "02-1234-5678", badge: "현장결제", category: "food", lat: 37.5595, lng: 126.8290, img: "" },
  { id: 2, name: "소망김밥", address: "서울 구로구 · 분식", fullAddress: "서울 강서구 마곡중앙8로 32", distance: "200m", phone: "02-2345-6789", badge: "현장결제", category: "food", lat: 37.5610, lng: 126.8275, img: "" },
  { id: 3, name: "평양냉면", address: "서울 구로구 · 한식", fullAddress: "서울 강서구 마곡중앙2로 15", distance: "350m", phone: "02-3456-7890", badge: "현장결제", category: "food", lat: 37.5582, lng: 126.8260, img: "" },
  { id: 4, name: "컴포즈커피", address: "서울 구로구 · 카페", fullAddress: "서울 강서구 공항대로 지하 1층", distance: "150m", phone: "02-4567-8901", badge: "현장결제", category: "cafe", lat: 37.5600, lng: 126.8310, img: "" },
  { id: 5, name: "사랑밥상", address: "서울 구로구 · 한식", fullAddress: "서울 강서구 마곡동로3길 28", distance: "400m", phone: "02-5678-9012", badge: "현장결제", category: "food", lat: 37.5575, lng: 126.8320, img: "" },
  { id: 6, name: "벤티프레소", address: "서울 구로구 · 카페", fullAddress: "서울 강서구 마곡중앙8로 50", distance: "180m", phone: "02-6789-0123", badge: "현장결제", category: "cafe", lat: 37.5615, lng: 126.8305, img: "" },
  { id: 7, name: "짝귀 한우 마곡발산점", address: "서울 구로구 · 한식", fullAddress: "서울 강서구 공항대로 614 2층", distance: "120m", phone: "02-7890-1234", badge: "현장결제", category: "food", lat: 37.5604, lng: 126.8295, img: "" },
  { id: 8, name: "키볼", address: "서울 구로구 · 분식", fullAddress: "서울 강서구 마곡중앙6로 20", distance: "130m", phone: "02-8901-2345", badge: "현장결제", category: "food", lat: 37.5608, lng: 126.8300, img: "" },
  { id: 9, name: "댄싱홍콩 마곡점", address: "서울 구로구 · 중식", fullAddress: "서울 강서구 마곡중앙2로 59 1층", distance: "500m", phone: "02-9012-3456", badge: "현장결제", category: "food", lat: 37.5568, lng: 126.8285, img: "" },
  { id: 10, name: "산청숯불가든 마곡", address: "서울 구로구 · 한식", fullAddress: "서울 강서구 소명로6길 12", distance: "650m", phone: "02-0123-4567", badge: "현장결제", category: "food", lat: 37.5555, lng: 126.8282, img: "" },
];

const MAP_CENTER: [number, number] = [37.5595, 126.8290];
const MAP_ZOOM = 16;

type LocationFilter = "nearby" | "company";

/* 카테고리별 SVG 아이콘 (기본/선택) */
function getCategoryIcon(category: "food" | "cafe" | "etc", selected: boolean) {
  const s = selected ? 18 : 13;
  const sc = selected ? 16 : 12;
  const icons = {
    food: `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><ellipse cx="18" cy="6" rx="3.5" ry="4.5"/><path d="M18 10.5v11.5"/></svg>`,
    cafe: `<svg xmlns="http://www.w3.org/2000/svg" width="${sc}" height="${sc}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v1"/><path d="M14 2v1"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"/><path d="M6 2v1"/></svg>`,
    etc: `<svg xmlns="http://www.w3.org/2000/svg" width="${sc}" height="${sc}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  };
  return icons[category];
}

/* 네이버맵 스타일 마커 */
function createMarkerIcon(category: "food" | "cafe" | "etc", name: string, isSelected: boolean) {
  const icon = getCategoryIcon(category, isSelected);

  if (isSelected) {
    /* 선택 시: 물방울 핀 형태 + 확대 */
    return L.divIcon({
      className: "",
      iconSize: [120, 70],
      iconAnchor: [60, 58],
      html: `
        <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none">
          <div style="
            position:relative;
            width:44px;height:54px;
            pointer-events:auto;
          ">
            <svg width="44" height="54" viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 52C22 52 40 34 40 20C40 10.06 31.94 2 22 2C12.06 2 4 10.06 4 20C4 34 22 52 22 52Z" fill="#EE2B2F" stroke="white" stroke-width="2"/>
            </svg>
            <div style="
              position:absolute;top:8px;left:50%;
              transform:translateX(-50%);
              width:26px;height:26px;
              border-radius:50%;
              background:transparent;
              display:flex;align-items:center;justify-content:center;
            ">${icon}</div>
          </div>
          <div style="
            margin-top:2px;
            background:white;
            border-radius:4px;
            padding:2px 6px;
            box-shadow:0 1px 3px rgba(0,0,0,0.15);
            font-size:11px;
            font-weight:700;
            font-family:'Pretendard',sans-serif;
            color:#333;
            white-space:nowrap;
            pointer-events:auto;
          ">${name}</div>
        </div>
      `,
    });
  }

  /* 기본: 둥근 원 + 아이콘 */
  return L.divIcon({
    className: "",
    iconSize: [120, 44],
    iconAnchor: [60, 13],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none">
        <div style="
          width:26px;height:26px;
          border-radius:50%;
          background:#EE2B2F;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 1px 4px rgba(0,0,0,0.2);
          border:1px solid white;
          pointer-events:auto;
        ">${icon}</div>
        <div style="
          margin-top:2px;
          background:white;
          border-radius:4px;
          padding:1px 5px;
          box-shadow:0 1px 3px rgba(0,0,0,0.12);
          font-size:11px;
          font-weight:700;
          font-family:'Pretendard',sans-serif;
          color:#333;
          white-space:nowrap;
          pointer-events:auto;
        ">${name}</div>
      </div>
    `,
  });
}

/* My location blue dot */
const myLocationIcon = L.divIcon({
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  html: `<div style="width:20px;height:20px;position:relative;display:flex;align-items:center;justify-content:center"><div style="width:14px;height:14px;border-radius:50%;background:${colors.blue};border:2.5px solid white;box-shadow:0 0 0 1px rgba(29,138,255,0.3),0 2px 6px rgba(0,0,0,0.2);z-index:2"></div><div style="position:absolute;width:36px;height:36px;border-radius:50%;background:rgba(29,138,255,0.12);z-index:1"></div></div>`,
});

/* 바텀시트 높이 (%) */
const SHEET_PEEK = 35;    /* 접힌 상태 */
const SHEET_EXPAND = 75;  /* 펼친 상태 */

export default function MapPage({ onBack }: MapPageProps) {
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("nearby");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [sheetHeight, setSheetHeight] = useState(SHEET_PEEK);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(SHEET_PEEK);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const listScrollRef = useRef<HTMLDivElement>(null);
  const isExpanded = sheetHeight >= SHEET_EXPAND - 1;

  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    dragStartY.current = clientY;
    dragStartHeight.current = sheetHeight;
  };
  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;
    const deltaPercent = ((dragStartY.current - clientY) / window.innerHeight) * 100;
    const next = Math.min(SHEET_EXPAND, Math.max(SHEET_PEEK, dragStartHeight.current + deltaPercent));
    setSheetHeight(next);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    const mid = (SHEET_PEEK + SHEET_EXPAND) / 2;
    setSheetHeight(sheetHeight > mid ? SHEET_EXPAND : SHEET_PEEK);
  };

  /* 리스트 영역 터치: 펼쳐지지 않았으면 시트 드래그, 펼쳐졌으면 스크롤 (스크롤 top이면 다시 드래그) */
  const handleListTouchStart = (e: React.TouchEvent) => {
    const scrollEl = listScrollRef.current;
    if (!isExpanded || (scrollEl && scrollEl.scrollTop <= 0)) {
      handleDragStart(e.touches[0].clientY);
    }
  };
  const handleListTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleDragMove(e.touches[0].clientY);
    e.preventDefault();
  };
  const handleListTouchEnd = () => {
    if (isDragging) handleDragEnd();
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    /* My location marker */
    L.marker(MAP_CENTER, { icon: myLocationIcon }).addTo(map);

    /* Restaurant markers */
    mockRestaurants.forEach((r) => {
      const marker = L.marker([r.lat, r.lng], {
        icon: createMarkerIcon(r.category, r.name, false),
      }).addTo(map);

      marker.on("click", () => {
        setSelectedId(r.id);
        markersRef.current.forEach((m, i) => {
          m.setIcon(createMarkerIcon(mockRestaurants[i].category, mockRestaurants[i].name, mockRestaurants[i].id === r.id));
        });
      });

      markersRef.current.push(marker);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = [];
    };
  }, []);

  return (
    <div style={s.overlay}>
      {/* Leaflet label style override */}
      <style>{leafletStyles}</style>

      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeftGroup}>
            <button style={s.backBtn} onClick={onBack} aria-label="뒤로가기">
              <ChevronLeft size={26} strokeWidth={2.2} color={colors.black} />
            </button>
            <h1 style={s.headerTitle}>지도</h1>
          </div>
        </div>
      </div>

      {/* ── Map Area ── */}
      <div style={s.mapArea}>
        <div ref={mapRef} style={s.mapContainer} />

        {/* Search pill */}
        <div style={s.mapSearchPill}>
          <Navigation size={14} strokeWidth={2.2} color={colors.blue} />
          <span style={s.mapSearchText}>현 지도에서 검색</span>
        </div>

        {/* Right side action buttons */}
        <div style={{ ...s.filterGroup, bottom: `calc(${sheetHeight}% + 26px)` }}>
          <button style={s.companyBtn}>
            <Crosshair size={17} strokeWidth={2} color={colors.gray1} />
            <span style={s.companyBtnLabel}>내위치</span>
          </button>
          <button style={s.companyBtn}>
            <Building2 size={17} strokeWidth={2} color={colors.gray1} />
            <span style={s.companyBtnLabel}>회사</span>
          </button>
        </div>
      </div>

      {/* ── Store Detail Panel ── */}
      {selectedId && (() => {
        const store = mockRestaurants.find(r => r.id === selectedId);
        if (!store) return null;
        const closeStore = () => {
          setSelectedId(null);
          markersRef.current.forEach((m, i) => {
            m.setIcon(createMarkerIcon(mockRestaurants[i].category, mockRestaurants[i].name, false));
          });
        };
        return (
          <div style={s.storePanel}>
            {/* Handle bar */}
            <div style={s.sheetHandle}><div style={s.sheetHandleBar} /></div>
            {/* Badge + buttons row */}
            <div style={s.storePanelTopRow}>
              <span style={s.storePanelBadge}>{store.badge}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button style={s.storePanelCircleBtn}>
                  <Phone size={16} strokeWidth={0} fill={colors.gray1} color={colors.gray1} />
                </button>
                <button style={s.storePanelCircleBtn} onClick={closeStore}>
                  <X size={18} strokeWidth={2.5} color={colors.gray1} />
                </button>
              </div>
            </div>
            {/* Name */}
            <div style={s.storePanelNameRow}>
              <span style={s.storePanelName}>{store.name}</span>
            </div>
            {/* Info */}
            <div style={s.storePanelContent}>
              <div style={s.storePanelInfoRow}>
                <span style={s.storePanelLabel}>위치</span>
                <span style={s.storePanelValue}>현재 위치기준 <span style={{ color: colors.primary, fontWeight: 600 }}>{store.distance}</span></span>
              </div>
              <div style={s.storePanelInfoRow}>
                <span style={s.storePanelLabel}>주소</span>
                <span style={s.storePanelValue}>{store.fullAddress}</span>
              </div>
            </div>
            {/* Buttons */}
            <div style={s.storePanelBtnGroup}>
              <button style={s.storePanelBtnOutline}>길 찾기</button>
              <button style={s.storePanelBtnPrimary}>주문하기</button>
            </div>
          </div>
        );
      })()}

      {/* ── Restaurant List (Bottom Sheet) ── */}
      {!selectedId && (
      <div
        style={{
          ...s.listArea,
          height: `${sheetHeight}%`,
          transition: isDragging ? "none" : "height 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Drag handle */}
        <div
          style={s.sheetHandle}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => {
            handleDragStart(e.clientY);
            const onMove = (ev: MouseEvent) => handleDragMove(ev.clientY);
            const onUp = () => { handleDragEnd(); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          <div style={s.sheetHandleBar} />
        </div>

        <div
          style={s.listHeader}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
        >
          <span style={s.listTitle}>주변 식당 · 카페</span>
          <span style={s.listCount}>{mockRestaurants.length}곳</span>
        </div>

        <div
          ref={listScrollRef}
          style={{ ...s.listScroll, WebkitOverflowScrolling: "touch" as any, overflowY: isExpanded ? "auto" : "hidden" }}
          onTouchStart={handleListTouchStart}
          onTouchMove={handleListTouchMove}
          onTouchEnd={handleListTouchEnd}
        >
          {mockRestaurants.map((r) => (
            <div
              key={r.id}
              style={{
                ...s.card,
                ...(selectedId === r.id ? s.cardSelected : {}),
              }}
              onClick={() => {
                setSelectedId(r.id);
                markersRef.current.forEach((m, i) => {
                  m.setIcon(createMarkerIcon(mockRestaurants[i].category, mockRestaurants[i].name, mockRestaurants[i].id === r.id));
                });
                mapInstanceRef.current?.setView([r.lat, r.lng], 17, { animate: true });
              }}
            >
              <div style={s.cardInfo}>
                <div
                  style={{ ...s.cardIcon, cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const next = new Set(savedIds);
                    if (next.has(r.id)) {
                      next.delete(r.id);
                    } else {
                      next.add(r.id);
                      showSuccessToast("저장되었습니다.");
                    }
                    setSavedIds(next);
                  }}
                >
                  <Bookmark
                    size={20}
                    strokeWidth={savedIds.has(r.id) ? 0 : 2}
                    fill={savedIds.has(r.id) ? colors.primary : "none"}
                    color={savedIds.has(r.id) ? colors.primary : colors.gray2}
                  />
                </div>
                <div style={s.cardText}>
                  <span style={s.cardName}>{r.name}</span>
                  <span style={s.cardAddress}>{r.address}</span>
                  <span style={s.cardBadge}>{r.badge}</span>
                </div>
              </div>
              <div style={s.cardImgPlaceholder}>
                <MapPin size={20} strokeWidth={1.5} color={colors.gray3} />
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}

/* ── Leaflet style override ── */
const leafletStyles = `
  .leaflet-container {
    font-family: 'Pretendard', sans-serif !important;
    z-index: 1 !important;
  }
`;

/* ── Styles ── */
const s: Record<string, CSSProperties> = {
  overlay: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    fontFamily,
    overflow: "hidden",
    position: "relative",
  },

  /* Header */
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    paddingLeft: 12,
    paddingRight: 16,
    height: 54,
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    zIndex: 10,
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
  },
  headerTitle: {
    ...headerTitleBase,
    color: colors.black,
    margin: 0,
  },

  /* Map Area */
  mapArea: {
    position: "relative",
    flex: 1,
    minHeight: 0,
  },
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  mapSearchPill: {
    position: "absolute",
    top: 12,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: radius.full,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    zIndex: 1000,
  },
  mapSearchText: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.blue,
    letterSpacing: -0.3,
  },

  /* Filter Buttons */
  filterGroup: {
    position: "absolute",
    right: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    zIndex: 200,
  },
  filterCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray5}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    padding: 0,
  },
  filterCircleBtnActive: {
    borderColor: colors.black,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  companyBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: "50%",
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray5}`,
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    padding: 0,
    gap: 1,
  },
  companyBtnLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.gray1,
    letterSpacing: -0.3,
    lineHeight: 1,
  },

  /* List Area (Bottom Sheet) */
  listArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    boxShadow: "0 -4px 16px rgba(0,0,0,0.1)",
    zIndex: 300,
  },
  sheetHandle: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 6,
    cursor: "grab",
    touchAction: "none",
  },
  sheetHandleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray3,
  },
  listHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingTop: 16,
    paddingBottom: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.3,
  },
  listCount: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: -0.3,
  },
  listScroll: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingBottom: 40,
    minHeight: 0,
  },

  /* Card */
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottom: `1px solid ${colors.gray6}`,
    cursor: "pointer",
  },
  cardSelected: {
    backgroundColor: colors.primaryLight,
    marginLeft: -spacing.xl,
    marginRight: -spacing.xl,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
  },
  cardInfo: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  cardIcon: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  cardText: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
  cardName: {
    fontSize: 17,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
  },
  cardAddress: {
    fontSize: 14,
    color: colors.gray1,
    letterSpacing: -0.3,
  },
  cardBadge: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: 600,
    color: colors.blue,
    backgroundColor: "rgba(29, 138, 255, 0.08)",
    borderRadius: radius.full,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  /* Store Detail Panel */
  storePanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    boxShadow: "0 -4px 16px rgba(0,0,0,0.1)",
    zIndex: 300,
    display: "flex",
    flexDirection: "column",
  },
  storePanelTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingBottom: 6,
  },
  storePanelBadge: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: 600,
    color: colors.blue,
    backgroundColor: "rgba(29, 138, 255, 0.08)",
    borderRadius: radius.full,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
  },
  storePanelNameRow: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingBottom: 14,
  },
  storePanelName: {
    fontSize: 19,
    fontWeight: 700,
    color: colors.black,
    letterSpacing: -0.16,
  },
  storePanelCircleBtn: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray6,
    border: "none",
    borderRadius: "50%",
    padding: 0,
    cursor: "pointer",
  },
  storePanelContent: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  storePanelPhoneBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
    border: `1.5px solid ${colors.black}`,
    borderRadius: radius.full,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 7,
    paddingBottom: 7,
    cursor: "pointer",
  },
  storePanelInfoRow: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  storePanelLabel: {
    fontSize: 13,
    color: colors.gray2,
    fontWeight: 500,
    letterSpacing: -0.2,
    minWidth: 32,
    flexShrink: 0,
  },
  storePanelValue: {
    fontSize: 15,
    color: colors.black,
    fontWeight: 600,
    letterSpacing: -0.3,
    lineHeight: 1.5,
  },
  storePanelBtnGroup: {
    display: "flex",
    gap: 10,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    paddingTop: 8,
    paddingBottom: 24,
  },
  storePanelBtnOutline: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: `1px solid ${colors.primary}`,
    backgroundColor: "transparent",
    color: colors.primary,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
  },
  storePanelBtnPrimary: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
  },

  cardBookmark: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
  },
  cardImgPlaceholder: {
    width: 82,
    height: 82,
    borderRadius: radius.md,
    backgroundColor: colors.gray6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginLeft: 12,
  },
};
