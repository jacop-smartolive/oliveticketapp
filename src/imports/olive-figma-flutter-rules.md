올리브식권 Figma Make 플러터 상세 규칙
🎨 1. 디자인 토큰
항목	값
포인트 컬러

#EE2B2F

borderRadius

공통 12

폰트

Pretendard 우선, fallback Noto Sans KR

아이콘 strokeWidth

기본 2.2 / 보조 2.5

🏗️ 2. 레이아웃 규칙
규칙	이유
✅

flex 레이아웃 위주

RN/Flutter 공통 지원

✅

인라인 스타일 사용

RN StyleSheet 패턴과 동일

✅

토큰 기반 색상 (colors.*)

ThemeData 변환 용이

✅

position: absolute 최소화

Stack/Positioned 최소화

✅

lucide-react 아이콘 사용

RN/Flutter 교체 용이

❌

CSS Grid 사용 금지

RN/Flutter 미지원

❌

hover, transition 금지

웹 전용 CSS

❌

cursor: pointer 금지

모바일 불필요

⚠️

boxShadow 주의

수동 처리 필요

⚠️

% width 주의

Dimensions/MediaQuery 방식 권장

🏷️ 3. 변환 태그 규칙
{/* ⚠️ RN-XX: 설명 */}      // oliveticket-web 저장소
{/* ⚠️ Flutter-XX: 설명 */} // oliveticket-web-flutter 저장소