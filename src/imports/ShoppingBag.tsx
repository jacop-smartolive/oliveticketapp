import svgPaths from "./svg-cvnqmzjx6l";

interface ShoppingBagProps {
  color?: string;
  size?: number;
}

export default function ShoppingBag({ color = "#A3A3A3", size = 12 }: ShoppingBagProps) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 11.995 11.995">
      <g clipPath="url(#clip0_2086_871)" id="ShoppingBag">
        <path d={svgPaths.p2450ab00} id="Vector" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999584" />
        <path d="M1.49938 2.99875H10.4956" id="Vector_2" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999584" />
        <path d={svgPaths.p31a79840} id="Vector_3" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999584" />
      </g>
      <defs>
        <clipPath id="clip0_2086_871">
          <rect fill="white" height="11.995" width="11.995" />
        </clipPath>
      </defs>
    </svg>
  );
}