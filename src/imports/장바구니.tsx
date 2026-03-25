import clsx from "clsx";
import svgPaths from "./svg-kh2j7dfm67";
import img from "figma:asset/a49cf6858880fcfb572a440e6177f2bf2483d4c5.png";
import imgImage1186 from "figma:asset/07a712b12a56254a252188ed674d867723a75d3f.png";
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties} className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      {children}
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <Wrapper2 additionalClassNames={clsx("left-[330.56px] size-[7.5px]", additionalClassNames)}>
      <div className={clsx("flex-none", additionalClassNames)}>
        <div className="h-0 relative w-[10.607px]">
          <div className="absolute inset-[-1px_-9.43%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.6066 2">
              {children}
            </svg>
          </div>
        </div>
      </div>
    </Wrapper2>
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
type Component1Props = {
  additionalClassNames?: string;
};

function Component1({ additionalClassNames = "" }: Component1Props) {
  return (
    <div className={clsx("-translate-x-1/2 absolute left-[calc(50%-0.33px)] w-[329.083px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 329.083 1">
        <path clipRule="evenodd" d="M329.083 1H0V0H329.083V1Z" fill="var(--fill-0, #EAEAEA)" fillRule="evenodd" id="ë¼ì¸" />
      </svg>
    </div>
  );
}
type GroupProps = {
  additionalClassNames?: string;
};

function Group({ additionalClassNames = "" }: GroupProps) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 1.2">
        <path d={svgPaths.paeb1480} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
      </svg>
    </div>
  );
}
type ImageProps = {
  additionalClassNames?: string;
};

function Image({ additionalClassNames = "" }: ImageProps) {
  return (
    <div className={clsx("absolute left-[15.13px] rounded-[10px] size-[70px]", additionalClassNames)}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
        <img alt="" className="absolute h-[292.68%] left-[-12.93%] max-w-none top-[-96.34%] w-[135.16%]" src={img} />
      </div>
    </div>
  );
}
type Helper4Props = {
  additionalClassNames?: string;
};

function Helper4({ additionalClassNames = "" }: Helper4Props) {
  return (
    <Wrapper1 additionalClassNames={additionalClassNames} additionalClassNames="rotate-135">
      <path d="M1 1L11.6066 1" id="Line 17" stroke="var(--stroke-0, #A3A3A3)" strokeLinecap="round" strokeWidth="2" />
    </Wrapper1>
  );
}
type Helper3Props = {
  additionalClassNames?: string;
};

function Helper3({ additionalClassNames = "" }: Helper3Props) {
  return (
    <Wrapper1 additionalClassNames={additionalClassNames} additionalClassNames="rotate-45">
      <path d="M1 1L11.6066 1" id="Line 16" stroke="var(--stroke-0, #A3A3A3)" strokeLinecap="round" strokeWidth="2" />
    </Wrapper1>
  );
}
type Helper2Props = {
  additionalClassNames?: string;
};

function Helper2({ additionalClassNames = "" }: Helper2Props) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="-rotate-90 flex-none h-px w-[10px]">
        <Helper1 additionalClassNames="relative size-full" />
      </div>
    </div>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <path d={svgPaths.pac0cc70} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
    </Wrapper>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <Wrapper additionalClassNames={clsx("absolute", additionalClassNames)}>
      <g id="Group 1000006352">
        <path d={svgPaths.pac0cc70} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
      </g>
    </Wrapper>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="장바구니">
      <div className="absolute inset-[0_-0.01%_95.79%_0.01%]">
        <div className="absolute inset-[-16%_-2.78%_-24%_-2.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 380 70">
            <g filter="url(#filter0_d_2057_392)" id="Rectangle 664">
              <path d="M10 8H370V58H10V8Z" fill="white" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="70" id="filter0_d_2057_392" width="380" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2057_392" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2057_392" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute font-['Pretendard:Bold',sans-serif] h-[19px] leading-none left-[calc(50%-137.77px)] not-italic text-[#191a1c] text-[17px] top-[16.35px] tracking-[-0.17px] w-[227.77px]">
        <p className="mb-px">결제하기</p>
        <p>&nbsp;</p>
      </div>
      <Wrapper2 additionalClassNames="left-[20.79px] size-[14.542px] top-[18.36px]">
        <div className="-rotate-45 flex-none">
          <div className="relative size-[10.283px]">
            <div className="absolute inset-[-12.16%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7831 12.7831">
                <path d="M11.5331 1.25H1.25V11.5331" id="Rectangle 31788" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </svg>
            </div>
          </div>
        </div>
      </Wrapper2>
      <div className="absolute inset-[4.21%_-0.01%_95.7%_0.01%]" data-name="Line 1 (Stroke)">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1">
          <path clipRule="evenodd" d="M360 1H0V0H360V1Z" fill="var(--fill-0, #D9D9D9)" fillRule="evenodd" id="Line 1 (Stroke)" />
        </svg>
      </div>
      <div className="absolute contents left-[15.13px] top-[132.83px]">
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[16px] top-[136.83px] tracking-[-0.16px] w-[184px]">햄에그 샌드위치</p>
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[15px] top-[205.63px] tracking-[-0.15px] w-[184px]">3,700</p>
        <p className="absolute font-['Pretendard:Regular',sans-serif] h-[10.911px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[11px] top-[166.96px] tracking-[-0.11px] w-[137px]">신세계푸드 구내식당 코너 A</p>
        <p className="absolute font-['Pretendard:Regular',sans-serif] h-[10.906px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[11px] top-[187px] tracking-[-0.11px] w-[137px]">12월 17일 20:00</p>
        <div className="absolute border border-[#eaeaea] border-solid inset-[20.11%_46.2%_77.36%_29.91%] rounded-[5px]" />
        <p className="absolute font-['Pretendard:Medium',sans-serif] inset-[20.79%_56.48%_78.03%_40.19%] leading-none not-italic text-[#191a1c] text-[13px] text-center tracking-[-0.13px]">1</p>
        <Helper1 additionalClassNames="absolute inset-[21.33%_48.43%_78.58%_48.8%]" />
        <Helper2 additionalClassNames="inset-[20.95%_49.68%_78.2%_50.05%]" />
        <div className="absolute contents inset-[21.33%_65.37%_78.58%_31.85%]">
          <Helper additionalClassNames="inset-[21.33%_65.37%_78.58%_31.85%]" />
        </div>
        <div className="absolute contents inset-[11.19%_3.66%_86.7%_89.39%]">
          <div className="absolute border border-[#eaeaea] border-solid inset-[11.19%_3.66%_86.7%_89.39%] rounded-[5px]" />
        </div>
        <Helper3 additionalClassNames="top-[141.58px]" />
        <Helper4 additionalClassNames="top-[141.58px]" />
        <Image additionalClassNames="top-[137.41px]" />
      </div>
      <Component1 additionalClassNames="bottom-[75.59%] top-[24.32%]" />
      <div className="absolute contents left-[15.13px] top-[309.74px]">
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[16px] top-[313.74px] tracking-[-0.16px] w-[184px]">튜나 샌드위치</p>
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[15px] top-[382.54px] tracking-[-0.15px] w-[184px]">3,700</p>
        <p className="absolute font-['Pretendard:Regular',sans-serif] h-[10.911px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[11px] top-[343.87px] tracking-[-0.11px] w-[137px]">디와이 구내식당 코너 B</p>
        <p className="absolute font-['Pretendard:Regular',sans-serif] h-[10.906px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[11px] top-[363.91px] tracking-[-0.11px] w-[137px]">12월 17일 20:00</p>
        <div className="absolute border border-[#eaeaea] border-solid inset-[35.02%_46.2%_62.46%_29.91%] rounded-[5px]" />
        <p className="absolute font-['Pretendard:Medium',sans-serif] inset-[35.69%_56.48%_63.13%_40.19%] leading-none not-italic text-[#191a1c] text-[13px] text-center tracking-[-0.13px]">1</p>
        <Helper1 additionalClassNames="absolute inset-[36.24%_48.43%_63.68%_48.8%]" />
        <Helper2 additionalClassNames="inset-[35.86%_49.68%_63.3%_50.05%]" />
        <div className="absolute contents inset-[36.24%_65.37%_63.68%_31.85%]">
          <Helper additionalClassNames="inset-[36.24%_65.37%_63.68%_31.85%]" />
        </div>
        <div className="absolute contents inset-[26.09%_3.66%_71.8%_89.39%]">
          <div className="absolute border border-[#eaeaea] border-solid inset-[26.09%_3.66%_71.8%_89.39%] rounded-[5px]" />
        </div>
        <Helper3 additionalClassNames="top-[318.49px]" />
        <Helper4 additionalClassNames="top-[318.49px]" />
        <Image additionalClassNames="top-[314.32px]" />
      </div>
      <Component1 additionalClassNames="bottom-[60.69%] top-[39.23%]" />
      <div className="absolute contents left-[15.13px] top-[496.65px]">
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[16px] top-[500.65px] tracking-[-0.16px] w-[184px]">튜나 샌드위치</p>
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[15px] top-[569.45px] tracking-[-0.15px] w-[184px]">3,700</p>
        <p className="absolute font-['Pretendard:Regular',sans-serif] h-[10.911px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[11px] top-[530.78px] tracking-[-0.11px] w-[137px]">디와이 구내식당 코너 B</p>
        <p className="absolute font-['Pretendard:Regular',sans-serif] h-[10.906px] leading-none left-[calc(50%-72.33px)] not-italic text-[#191a1c] text-[11px] top-[550.82px] tracking-[-0.11px] w-[137px]">12월 17일 20:00</p>
        <div className="absolute border border-[#eaeaea] border-solid inset-[50.76%_46.2%_46.71%_29.91%] rounded-[5px]" />
        <p className="absolute font-['Pretendard:Medium',sans-serif] inset-[51.44%_56.48%_47.38%_40.19%] leading-none not-italic text-[#191a1c] text-[13px] text-center tracking-[-0.13px]">1</p>
        <Helper1 additionalClassNames="absolute inset-[51.98%_48.43%_47.93%_48.8%]" />
        <Helper2 additionalClassNames="inset-[51.61%_49.68%_47.55%_50.05%]" />
        <div className="absolute contents inset-[51.98%_65.37%_47.93%_31.85%]">
          <Helper additionalClassNames="inset-[51.98%_65.37%_47.93%_31.85%]" />
        </div>
        <div className="absolute contents inset-[41.84%_3.66%_56.05%_89.39%]">
          <div className="absolute border border-[#eaeaea] border-solid inset-[41.84%_3.66%_56.05%_89.39%] rounded-[5px]" />
        </div>
        <Helper3 additionalClassNames="top-[505.4px]" />
        <Helper4 additionalClassNames="top-[505.4px]" />
        <Image additionalClassNames="top-[501.23px]" />
      </div>
      <div className="absolute contents left-[-0.46px] top-[732.56px]">
        <div className="absolute bg-white h-[104px] left-[-0.46px] top-[742.56px] w-[360px]" />
        <p className="absolute font-['Pretendard:Bold',sans-serif] inset-[67.57%_65.27%_31%_4.08%] leading-none not-italic text-[#191a1c] text-[17px] tracking-[-0.17px]">총 주문금액</p>
        <p className="absolute font-['Pretendard:Bold',sans-serif] inset-[67.5%_4.26%_30.93%_65.09%] leading-none not-italic text-[#191a1c] text-[19px] text-right tracking-[-0.19px]">12,700</p>
        <p className="absolute font-['Pretendard:Regular',sans-serif] h-[15px] leading-none left-[calc(50%-165.32px)] not-italic text-[#191a1c] text-[14px] top-[779.54px] tracking-[-0.14px] w-[110.355px]">총 수량</p>
        <p className="-translate-x-full absolute font-['Pretendard:Regular',sans-serif] h-[15px] leading-none left-[calc(50%+164.68px)] not-italic text-[#191a1c] text-[14px] text-right top-[769.6px] tracking-[-0.14px] w-[103px]">3</p>
        <div className="absolute bg-[#f3f4f6] border border-[#f2f2f2] border-solid inset-[61.71%_-0.03%_37.44%_0.03%]" />
        <div className="absolute bg-[#f3f4f6] border border-[#f2f2f2] border-solid inset-[71.32%_0_27.84%_0]" />
        <div className="absolute h-[213px] left-[15.42px] overflow-clip top-[876.56px] w-[330px]" data-name="포인트">
          <div className="absolute content-stretch flex items-center justify-between left-0 top-0 w-[329.942px]">
            <p className="font-['Pretendard:Bold',sans-serif] h-[16.947px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[16px] tracking-[-0.16px] w-[110.355px]">결제수단</p>
            <div className="bg-[#fff0f1] content-stretch flex h-[30px] items-center justify-center px-[15px] py-[10px] relative rounded-[1000px] shrink-0 w-[134px]">
              <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#ee2b2f] text-[11px] text-center tracking-[-0.11px] whitespace-nowrap">총 167,000 사용가능</p>
            </div>
          </div>
          <div className="absolute bg-[#f3f4f6] content-stretch flex flex-col h-[90px] items-start left-0 px-[15px] py-[17px] rounded-[10px] top-[45px] w-[330px]">
            <div aria-hidden="true" className="absolute border border-[#f2f2f2] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
            <div className="content-stretch flex flex-col gap-[19px] items-start relative shrink-0 w-[300px]">
              <div className="content-stretch flex items-center justify-between leading-none not-italic relative shrink-0 text-[#6e6f70] text-[15px] tracking-[-0.15px] w-[284px]">
                <p className="font-['Pretendard:Medium',sans-serif] h-[14.82px] relative shrink-0 w-[74px]">기업포인트</p>
                <p className="font-['Pretendard:Bold',sans-serif] h-[14.82px] relative shrink-0 text-right w-[74px]">37,000</p>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                  <p className="font-['Pretendard:Medium',sans-serif] h-[15.35px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[15px] tracking-[-0.15px] w-[103px]">사용가능 포인트</p>
                </div>
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                  <p className="font-['Pretendard:Bold',sans-serif] h-[14.824px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[15px] text-right tracking-[-0.15px] w-[52.889px]">29,000</p>
                  <div className="h-[10px] relative shrink-0 w-[6px]" data-name="Vector (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
                      <path clipRule="evenodd" d={svgPaths.p6b77e80} fill="var(--fill-0, #6E6F70)" fillRule="evenodd" id="Vector (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents right-0 top-[50.74px]">
        <div className="absolute bg-[#f3f4f6] h-[62.086px] left-0 top-[50.74px] w-[360px]" />
        <div className="-translate-y-1/2 absolute aspect-[5/8.333333015441895] left-[23.8%] right-[74.81%] top-[calc(50%-513.74px)]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8.33333">
            <path clipRule="evenodd" d={svgPaths.p12ed2d80} fill="var(--fill-0, #6E6F70)" fillRule="evenodd" id="Vector (Stroke)" />
          </svg>
        </div>
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[12.748px] leading-none left-[calc(50%-132.44px)] not-italic text-[#191a1c] text-[13px] top-[73.39px] tracking-[-0.13px] w-[33.702px]">간편식</p>
        <div className="absolute contents left-[17.72px] top-[68.74px]">
          <div className="-translate-x-1/2 absolute aspect-[100/100] bg-white bottom-[92.19%] left-[calc(50%-150.28px)] rounded-[5px] top-[5.79%]" data-name="Rectangle" />
          <div className="absolute h-[17.529px] left-[19.86px] top-[71.98px] w-[20.384px]" data-name="image 1186">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[165.59%] left-0 max-w-none top-[-65.59%] w-[139.81%]" src={imgImage1186} />
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute contents left-1/2 top-[662.56px]">
        <Group additionalClassNames="absolute inset-[57.47%_55.82%_42.43%_40.84%]" />
        <div className="absolute flex inset-[57.01%_57.32%_41.98%_42.34%] items-center justify-center">
          <div className="-rotate-90 flex-none h-[1.2px] w-[12px]">
            <Group additionalClassNames="relative size-full" />
          </div>
        </div>
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] inset-[56.97%_40.84%_41.96%_45.81%] leading-none not-italic text-[#191a1c] text-[13px] tracking-[-0.13px]">메뉴 추가</p>
        <div className="-translate-x-1/2 absolute h-[40px] left-1/2 top-[662.56px] w-[324px]" data-name="Rectangle">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 40">
            <path d={svgPaths.pffb2d80} id="Rectangle" stroke="var(--stroke-0, #EAEAEA)" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[6.67%] contents left-[-0.13px] top-[87.77%]">
        <div className="-translate-x-1/2 absolute bottom-[6.67%] left-[calc(50%-0.13px)] top-[87.77%] w-[360px]">
          <div className="absolute inset-[-13.64%_-2.22%_-10.61%_-2.22%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 376 82">
              <g filter="url(#filter0_d_2057_401)" id="Rectangle 34625408">
                <path d={svgPaths.p64fc700} fill="var(--fill-0, white)" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="82" id="filter0_d_2057_401" width="376" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="-1" />
                  <feGaussianBlur stdDeviation="4" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.6375 0 0 0 0 0.6375 0 0 0 0 0.6375 0 0 0 0.6 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2057_401" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_2057_401" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute bg-[#ee2b2f] inset-[88.62%_2.81%_7.51%_2.74%] rounded-[10px]" data-name="라인 버튼" />
        <div className="absolute font-['Pretendard:Bold',sans-serif] inset-[89.77%_20.5%_8.66%_20.43%] leading-none not-italic text-[17px] text-center text-white tracking-[-0.17px]">
          <p className="mb-px">결제하기</p>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}