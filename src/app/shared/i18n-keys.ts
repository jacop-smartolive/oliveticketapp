/**
 * ⑤ 한국어 키 사전 — i18n 적용 시 이 키로 t() 함수 호출
 *
 * 규칙:
 *  - namespace.section.key 형태
 *  - 값은 현재 한국어 원문 (i18n 라이브러리 적용 전까지는 직접 참조용)
 *  - enum labelMap에 이미 등록된 상태 문자열은 제외 (enums.ts에서 관리)
 */

export const ko = {
  // ─── 공통 (common) ────────────────────────────────────────
  common: {
    confirm: "확인",
    cancel: "취소",
    back: "뒤로가기",
    close: "닫기",
    save: "저장",
    delete: "삭제",
    edit: "수정",
    submit: "등록",
    search: "검색",
    more: "더 보기",
    fold: "접기",
    viewList: "목록으로",
    noData: "데이터가 없습니다.",
    loading: "로딩 중...",
    won: "원",
    point: "P",
  },

  // ─── 홈 (home) ───────────────────────────────────────────
  home: {
    title: "올리브식권",
    greeting: "안녕하세요, {name}님",
    availablePoint: "사용가능 포인트",
    corpPoint: "기업포인트",
    olivePoint: "올리브포인트",
    cafeteria: "구내식당",
    simpleMeal: "간편식",
    breakfast: "아침",
    lunch: "점심",
    dinner: "저녁",
    todayMenu: "오늘의 메뉴",
    noMenuAvailable: "아직 등록된 메뉴가 없습니다.",
    addToCart: "담기",
    cart: "장바구니",
    calorie: "kcal",
  },

  // ─── 결제내역 (paymentHistory) ────────────────────────────
  paymentHistory: {
    title: "결제내역",
    all: "전체",
    noPayments: "결제 내역이 없습니다.",
  },

  // ─── 결제상세 (paymentDetail) ─────────────────────────────
  paymentDetail: {
    orderDate: "주문일시",
    reservationDeadline: "예약마감",
    paymentNumber: "결제번호",
    totalQuantity: "총 수량",
    totalOrderAmount: "총 주문금액",
    paymentPoint: "결제 포인트",
    refundPoint: "환불 포인트",
    corpPoint: "기업포인트",
    olivePoint: "올리브 포인트",
    totalPaymentPoint: "총 결제 포인트",
    totalRefundPoint: "총 환불 포인트",
    cancelOrder: "주문취소",
    cancelConfirmTitle: "주문취소",
    cancelConfirmMessage: "주문을 취소하시겠습니까?",
    cancelConfirmNo: "아니오",
    cancelConfirmYes: "취소하기",
    pickup: "픽업",
  },

  // ─── 결제완료 (paymentComplete) ───────────────────────────
  paymentComplete: {
    title: "결제가 완료되었습니다!",
    pickupInfo: "픽업 예약정보",
    paymentInfo: "결제 정보",
    goHome: "홈으로",
  },

  // ─── 기업포인트 (corporatePoint) ──────────────────────────
  corporatePoint: {
    title: "기업포인트",
    remainingPoint: "잔여포인트",
    chargeHistory: "충전내역",
    requestHistory: "신청내역",
    availablePointLabel: "사용가능 포인트",
    remainingPointLabel: "잔여 포인트",
    currentlyAvailable: "현재 사용 가능",
    unavailable: "사용 불가",
    usableDays: "사용가능 일시",
    usageLimit: "사용 한도",
    limitPerUse: "1회 한도",
    limitPerDay: "1일 한도",
    expiryLabel: "사용 기한",
    approvalLabel: "신청 승인여부",
    noLimit: "제한없음",
    approvalNotRequired: "승인 불필요",
    approvalRequired: "승인 필요",
    charged: "충전",
    remaining: "잔여",
    depleted: "소진완료",
    applyPoint: "포인트 신청",
    approvedToast: "기업포인트 신청이 승인되었습니다.",
    submittedToast: "기업포인트 신청이 완료되었습니다.",
    noRequests: "신청내역이 없습니다.",
  },

  // ─── 포인트 신청 (pointApplication) ──────────────────────
  pointApplication: {
    title: "포인트 신청",
    selectPolicy: "신청할 정책을 선택해주세요.",
    applyAmount: "신청 금액",
    applyReason: "신청 사유",
    reasonPlaceholder: "신청 사유를 입력해주세요.",
    overtimeTag: "야근 식대",
    travelTag: "출장 식비",
    confirmTitle: "포인트를 신청하시겠습니까?",
    confirmApplyBtn: "신청하기",
  },

  // ─── 장바구니 (cart) ──────────────────────────────────────
  cart: {
    title: "장바구니",
    emptyCart: "장바구니가 비어 있습니다.",
    totalAmount: "총 결제금액",
    pay: "결제하기",
    deleteItem: "삭제",
    selectAll: "전체선택",
  },

  // ─── 문의하기 (inquiry) ───────────────────────────────────
  inquiry: {
    title: "문의하기",
    resultTitle: "문의결과",
    noInquiries: "문의 내역이 없습니다",
    guideSubtitle: "궁금한 점을 문의해 주세요",
    fieldTitle: "제목",
    fieldContent: "내용",
    titlePlaceholder: "문의 제목을 입력해주세요.",
    contentPlaceholder: "문의 내용을 상세히 입력해주세요",
    infoTitle: "문의 안내",
    infoItem1: "결제 오류 등 앱 기능 관련 문의나 개인 포인트 환불 문의만 처리가 가능합니다.",
    infoItem2: "식당 결제 취소 및 환불 문의는 이용하신 식당에서 직접 처리해 드립니다. 식당으로 문의 부탁드립니다.",
    infoItem3: "기업포인트 사용 및 환불 문의는 해당 기업에서 직접 처리가 가능합니다. 소속 기업 담당처로 문의해 주세요.",
    writtenContent: "문의내용",
    answerComplete: "답변완료",
    answerPreparing: "답변 준비 중입니다",
  },

  // ─── 공지사항 (notice) ────────────────────────────────────
  notice: {
    title: "공지사항",
    noNotices: "공지사항이 없습니다.",
  },

  // ─── 알림 (notification) ──────────────────────────────────
  notification: {
    title: "알림",
    noNotifications: "알림이 없습니다.",
    markAllRead: "모두 읽음",
  },

  // ─── 마이페이지 (my) ──────────────────────────────────────
  my: {
    title: "마이 올리브",
    myInfo: "내 정보 관리",
    paymentHistory: "결제내역",
    inquiry: "문의하기",
    notice: "공지사항",
    envSettings: "환경설정",
    logout: "로그아웃",
    logoutConfirm: "로그아웃 하시겠습니까?",
  },

  // ─── 로그인 (login) ───────────────────────────────────────
  login: {
    title: "로그인",
    emailPlaceholder: "이메일 주소",
    passwordPlaceholder: "비밀번호",
    loginBtn: "로그인",
    signup: "회원가입",
    findAccount: "계정 찾기",
  },

  // ─── 회원가입 (signup) ────────────────────────────────────
  signup: {
    title: "회원가입",
    termsTitle: "서비스 이용을 위해\n약관에 동의해주세요",
    agreeAll: "전체 동의",
    requiredTos: "[필수] 서비스 이용약관",
    requiredPrivacy: "[필수] 개인정보 수집 및 이용 동의",
    optionalMarketing: "[선택] 마케팅 수신 동의",
    view: "보기",
    next: "다음",
    complete: "완료",
  },

  // ─── 계정 찾기 (findAccount) ──────────────────────────────
  findAccount: {
    title: "계정 찾기",
    findId: "아이디 찾기",
    findPassword: "비밀번호 찾기",
  },

  // ─── 비밀번호 변경 (passwordChange) ───────────────────────
  passwordChange: {
    title: "비밀번호 변경",
    currentPw: "현재 비밀번호",
    newPw: "새 비밀번호",
    confirmPw: "비밀번호 확인",
    changeBtn: "변경하기",
    successToast: "비밀번호가 변경되었습니다.",
  },

  // ─── 내 정보 (userProfile) ────────────────────────────────
  userProfile: {
    title: "내 정보 관리",
    name: "이름",
    email: "이메일",
    phone: "전화번호",
    company: "소속 기업",
    editBtn: "수정",
  },

  // ─── 환경설정 (envSettings) ───────────────────────────────
  envSettings: {
    title: "환경설정",
    pushNotification: "푸시 알림",
    marketingConsent: "마케팅 수신 동의",
    version: "앱 버전",
    deleteAccount: "회원 탈퇴",
  },

  // ─── 토스트 (toast) ───────────────────────────────────────
  toast: {
    cartAdded: "장바구니에 담겼습니다.",
    cartRemoved: "장바구니에서 삭제되었습니다.",
    loginSuccess: "로그인되었습니다.",
    logoutSuccess: "로그아웃되었습니다.",
    profileUpdated: "프로필이 수정되었습니다.",
    copied: "복사되었습니다.",
    notificationRead: "모든 알림을 읽었습니다.",
  },
} as const;

/** ko 사전의 전체 키 타입 (flatten 전 — i18n 라이브러리가 알아서 flatten) */
export type KoKeys = typeof ko;
