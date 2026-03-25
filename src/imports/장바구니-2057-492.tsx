import clsx from "clsx";
import svgPaths from "./svg-zq4warfv5w";
import img from "figma:asset/a49cf6858880fcfb572a440e6177f2bf2483d4c5.png";
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties} className="absolute flex items-center justify-center left-[330.56px] size-[7.5px] top-[46.8px]">
      <div className={clsx("flex-none", additionalClassNames)}>
        <div className="h-0 relative w-[10.607px]">
          <div className="absolute inset-[-1px_-9.43%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.6066 2">
              {children}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
        {children}
      </svg>
    </div>
  );
}
type Component2Props = {
  additionalClassNames?: string;
};

function Component2({ additionalClassNames = "" }: Component2Props) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 1.2">
        <path d={svgPaths.paeb1480} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
      </svg>
    </div>
  );
}
type Component1Props = {
  additionalClassNames?: string;
};

function Component1({ additionalClassNames = "" }: Component1Props) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <path d={svgPaths.pac0cc70} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
    </Wrapper>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="장바구니">
      <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[16px] top-[42.05px] tracking-[-0.16px] w-[184px]">튜나 샌드위치</p>
      <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[15px] top-[110.86px] tracking-[-0.15px] w-[184px]">3,700</p>
      <p className="absolute font-['Pretendard:Regular',sans-serif] h-[10.911px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[11px] top-[72.19px] tracking-[-0.11px] w-[137px]">디와이 구내식당 코너 B</p>
      <p className="absolute font-['Pretendard:Regular',sans-serif] h-[10.906px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[11px] top-[92.23px] tracking-[-0.11px] w-[137px]">픽업 : 12월 17일 20:00</p>
      <div className="absolute border border-[#eaeaea] border-solid inset-[47.36%_46.2%_42.78%_29.91%] rounded-[5px]" />
      <p className="absolute font-['Pretendard:Medium',sans-serif] inset-[49.99%_56.48%_45.41%_40.19%] leading-none not-italic text-[#191a1c] text-[13px] text-center tracking-[-0.13px]">1</p>
      <Component1 additionalClassNames="absolute inset-[52.13%_48.43%_47.55%_48.8%]" />
      <div className="absolute flex inset-[50.65%_49.68%_46.06%_50.05%] items-center justify-center">
        <div className="-rotate-90 flex-none h-px w-[10px]">
          <Component1 additionalClassNames="relative size-full" />
        </div>
      </div>
      <div className="absolute contents inset-[52.13%_65.37%_47.55%_31.85%]">
        <Wrapper additionalClassNames="absolute inset-[52.13%_65.37%_47.55%_31.85%]">
          <g id="Group 1000006352">
            <path d={svgPaths.pac0cc70} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
          </g>
        </Wrapper>
      </div>
      <div className="absolute contents inset-[12.52%_3.66%_79.26%_89.39%]">
        <div className="absolute border border-[#eaeaea] border-solid inset-[12.52%_3.66%_79.26%_89.39%] rounded-[5px]" />
      </div>
      <Wrapper1 additionalClassNames="rotate-45">
        <path d="M1 1L11.6066 1" id="Line 16" stroke="var(--stroke-0, #A3A3A3)" strokeLinecap="round" strokeWidth="2" />
      </Wrapper1>
      <Wrapper1 additionalClassNames="rotate-135">
        <path d="M1 1L11.6066 1" id="Line 17" stroke="var(--stroke-0, #A3A3A3)" strokeLinecap="round" strokeWidth="2" />
      </Wrapper1>
      <div className="absolute left-[15.13px] rounded-[10px] size-[70px] top-[42.64px]" data-name="썸네일">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
          <img alt="" className="absolute h-[292.68%] left-[-12.93%] max-w-none top-[-96.34%] w-[135.16%]" src={img} />
        </div>
      </div>
      <Component2 additionalClassNames="absolute inset-[73.53%_55.82%_26.07%_40.84%]" />
      <div className="absolute flex inset-[71.76%_57.32%_24.29%_42.34%] items-center justify-center">
        <div className="-rotate-90 flex-none h-[1.2px] w-[12px]">
          <Component2 additionalClassNames="relative size-full" />
        </div>
      </div>
      <p className="absolute font-['Pretendard:SemiBold',sans-serif] inset-[71.58%_40.84%_24.23%_45.81%] leading-none not-italic text-[#191a1c] text-[13px] tracking-[-0.13px]">메뉴 추가</p>
      <div className="-translate-x-1/2 absolute h-[40px] left-1/2 top-[203.96px] w-[324px]" data-name="Rectangle">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 40">
          <path d={svgPaths.pffb2d80} id="Rectangle" stroke="var(--stroke-0, #EAEAEA)" />
        </svg>
      </div>
    </div>
  );
}