/**
 * 포인트 아이콘 - P 문자 원형 아이콘
 */
interface PointIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function PointIcon({ 
  size = 20, 
  color = "#EE2B2F",
  strokeWidth = 1.5 
}: PointIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 원형 배경 */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* P 문자 */}
      <path
        d="M9 7H13C14.6569 7 16 8.34315 16 10C16 11.6569 14.6569 13 13 13H9V7Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="9"
        y1="13"
        x2="9"
        y2="17"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
