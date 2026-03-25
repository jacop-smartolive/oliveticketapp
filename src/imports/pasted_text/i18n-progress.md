i18n 진행 상태
①
공통 토큰 교체
완료
②
상태 타입 영문 enum (enums.ts)
완료
③
통화/날짜 포맷 헬퍼 (formatters.ts)
완료
④
토스트 모듈 분리 (toast.tsx)
완료
⑤
번역 키 사전 추출 (locales/*.ts)
완료
⑥
react-i18next 전체 적용
완료
⑦
한국어 (ko.ts) 번역
완료
⑧
영어 (en.ts) 번역
완료
⑨
베트남어 (vi.ts) 번역
완료
파일 구조 (39개 파일)
src/app/App.tsx
메인 엔트리 — 전체 상태 관리, 홈화면, 하단 탭 네비게이션, sticky 헤더, pull-to-refresh
src/app/shared/tokens.ts
디자인 토큰 — colors, fontFamily, spacing, radius, pillBadgeBase, headerHeight, headerTitleBase
src/app/shared/enums.ts
영문 enum — HomeTab, MealTime, PaymentStatus, PickupStatus, PaymentCategory 등
src/app/shared/formatters.ts
날짜/시간/금액 포맷 헬퍼 — formatAmount(num), formatAmountStr(str) [vi K접미사], formatMonthDayTime(), formatDateTimeWithDay(), formatDateWithDay(), formatFullDateTime(), formatYearMonth(), formatMonthDay()
src/app/shared/toast.tsx
토스트 헬퍼 — showSuccessToast(), showPlainToast()
src/app/shared/i18n.ts
i18next 초기화 설정
src/app/shared/i18n-keys.ts
번역 키 타입 정의
src/app/shared/locales/ko.ts
한국어 번역 파일
src/app/shared/locales/en.ts
영어 번역 파일
src/app/shared/locales/vi.ts
베트남어 번역 파일
src/app/components/LoginPage.tsx
로그인 (복수 소속 회사 선택 포함)
src/app/components/SignupPage.tsx
회원가입
src/app/components/FindAccountPage.tsx
비밀번호 찾기 (탭 없이 단일 페이지: 이메일 인증 → 새 비밀번호 입력)
src/app/components/CompanySelectSheet.tsx
복수 소속 회사 선택 바텀시트
src/app/components/MenuDetailPage.tsx
메뉴 상세 — onPay prop으로 QR 결제 연결
src/app/components/SimpleMealDetailPage.tsx
간편식 상세 (일반/quickPurchaseMode)
src/app/components/CartPage.tsx
장바구니 (기본형, 미사용)
src/app/components/CartPageOption4.tsx
장바구니 (현재 사용 — 미니멀+아이콘강화형)
src/app/components/NotificationPage.tsx
알림 목록 (9종: 구내식당 결제/취소, 간편식 결제/취소, 기업포인트 신청/승인/승인거부, 문의답변, 공지사항)
src/app/components/QrPaymentPage.tsx
QR 결제 (기업포인트 정책 카드 + 신청 진입)
src/app/components/CorporatePointPage.tsx
기업 포인트 (잔여/충전/신청 3탭)
src/app/components/DateRangePickerPage.tsx
날짜 범위 선택 캘린더
src/app/components/PaymentHistoryPage.tsx
이용내역 (결제 목록 + 탭 필터)
src/app/components/PaymentDetailPage.tsx
결제 상세 (구내식당/간편식 분기, 주문취소)
src/app/components/PaymentPopup.tsx
결제 확인/완료 팝업
src/app/components/PaymentCompletePage.tsx
결제 완료 상세 화면 (간편식 전용)
src/app/components/PickupQrPage.tsx
픽업 QR (구내식당) / 예약확인 (간편식, hideQr=true — 간편식은 픽업 QR 사용안함)
src/app/components/MyOlivePage.tsx
My올리브 탭 페이지
src/app/components/UserProfilePage.tsx
회원정보 (로그아웃/회원탈퇴 팝업 포함)
src/app/components/UserProfileEditPage.tsx
내 정보 수정 폼 (주소검색 3단계 플로우 포함)
src/app/components/PasswordChangePage.tsx
비밀번호 수정
src/app/components/PointApplicationPage.tsx
기업 포인트 신청 목록
src/app/components/PointApplicationFormPage.tsx
기업 포인트 신청서
src/app/components/NoticePage.tsx
공지사항 목록/상세
src/app/components/InquiryPage.tsx
문의하기 목록/작성/상세
src/app/components/EnvironmentSettingsPage.tsx
환경설정 (i18n 언어 전환 — 저장 버튼으로 적용)
src/app/components/PointIcon.tsx
포인트 아이콘 SVG 컴포넌트
src/app/components/InfoRow.tsx
공통 정보 행 컴포넌트
src/app/components/DocsPage.tsx
이 문서 페이지
src/app/components/DesignOverviewPage.tsx
디자인 오버뷰 (컴포넌트 갤러리)
src/app/components/figma/ImageWithFallback.tsx
이미지 폴백 컴포넌트 (시스템 보호 파일)
src/app/components/ui/
공통 UI 유틸 컴포넌트 디렉토리
공유 모듈
shared/tokens.ts
colors, fontFamily, spacing, radius, pillBadgeBase, headerHeight, headerTitleBase
shared/toast.tsx
toastBaseStyle, showSuccessToast(), showPlainToast(), CheckIcon
shared/enums.ts
HomeTab, MealTime, PaymentStatus, PickupStatus, PaymentCategory, FilterTab, RequestStatus 등
shared/formatters.ts
formatAmount(), formatAmountStr() [vi K접미사], formatMonthDayTime(), formatDateTimeWithDay(), formatDateWithDay(), formatFullDateTime(), formatYearMonth(), formatMonthDay()
shared/i18n.ts
i18next 초기화, ko/en/vi 리소스 등록
shared/i18n-keys.ts
번역 키 타입 정의 (TranslationKeys)
shared/locales/
ko.ts (한국어), en.ts (영어), vi.ts (베트남어)
네비게이션 맵 (현행 코드 기준)
[비로그인 흐름] isLoggedIn=false
LoginPage
├─ onSignup → SignupPage
│   └─ onBack / onGoLogin → LoginPage
├─ onFindAccount → FindAccountPage
│   └─ onBack / onGoLogin → LoginPage
└─ onLogin → Home (isLoggedIn=true)
[로그인 후] 하단 네비 (activeNav)
home — 홈
receipt — 이용내역
notification — 알림
my — My올리브
[홈 탭] home > activeTab
├─ CAFETERIA (구내식당)
│   ├─ 포인트 카드 클릭 → CorporatePointPage
│   │   └─ PointApplicationPage → PointApplicationFormPage
│   ├─ 메뉴 카드 클릭 → MenuDetailPage
│   │   └─ onPay → QrPaymentPage
│   ├─ 플로팅 QR 버튼 → QrPaymentPage
│   │   ├─ 포인트 신청 → PointApplicationPage → PointApplicationFormPage
│   │   └─ 결제 완료 → PaymentCompletePopup (내부)
│   ├─ 장바구니 아이콘 → CartPageOption4
│   └─ 벨 아이콘 → notification
└─ SIMPLE_MEAL (간편식)
    ├─ 날짜 범위 바 → DateRangePickerPage
    ├─ 간편식 카드 → SimpleMealDetailPage
    │   ├─ 장바구니 담기 → 홈 복귀 (플로팅 카트 바 표시)
    │   └─ 바로결제 → PaymentConfirmPopup → PaymentCompletePage
    └─ 플로팅 카트 바 / 장바구니 아이콘 → CartPageOption4
        ├─ 메뉴 추가 → 홈 간편식 탭 복귀
        └─ 결제하기 → PaymentConfirmPopup → PaymentCompletePage
[이용내역 탭] receipt
└─ PaymentHistoryPage → PaymentDetailPage
    ├─ 픽업 QR → PickupQrPage (hideQr=false, 구내식당)
    ├─ 예약 확인 → PickupQrPage (hideQr=true, 간편식 — 픽업 QR 사용안함)
    └─ 주문 취소 → 확인 다이얼로그 → 홈 복귀 + 토스트
[알림 탭] notification
└─ NotificationPage (asNavTab=true, 전체화면 대체)
    ├─ 9종 알림 카테고리:
    │   cafeteria (구내식당 결제), cafeteriaCancel (구내식당 결제취소),
    │   simpleMeal (간편식 결제), simpleMealCancel (간편식 결제취소),
    │   corpPointApply (기업포인트 신청), corpPointApproved (기업포인트 승인),
    │   corpPointRejected (기업포인트 승인거부),
    │   inquiry (문의 답변), notice (공지사항)
    ├─ 카드 클릭 → 읽음 처리 (dot 애니메이션)
    ├─ '모두 확인' 버튼 → 전체 읽음 (stagger 80ms)
    └─ onBack → home
[My올리브 탭] my
├─ 프로필 카드 클릭 → UserProfilePage (App에서 렌더)
│   ├─ 내 정보 수정 → UserProfileEditPage (주소검색 3단계 포함)
│   ├─ 비밀번호 수정 → PasswordChangePage
│   ├─ 로그아웃 → LoginPage (isLoggedIn=false)
│   └─ 회원 탈퇴 → 확인 다이얼로그
├─ 문의하기 → InquiryPage (MyOlivePage 내부)
├─ 공지사항 → NoticePage (MyOlivePage 내부)
└─ 환경설정 → EnvironmentSettingsPage (MyOlivePage 내부)
[기타]
홈 헤더 타이틀 클릭 → DocsPage
PaymentPopup.tsx — PaymentConfirmPopup / PaymentCompletePopup 2개 export (App에서 사용)
PaymentCompletePage.tsx — 간편식 결제 완료 전체 화면 (onClose, onAdditionalPay)
CompanySelectSheet.tsx — LoginPage 내부 바텀시트
PickupQrPage.tsx — PaymentDetailPage 내부에서 호출
PointApplicationPage.tsx — QrPaymentPage / CorporatePointPage 내부에서 호출
PointApplicationFormPage.tsx — PointApplicationPage 내부에서 호출