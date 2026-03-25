import clsx from "clsx";
import svgPaths from "./svg-q3qh0m5m5u";
import imgImage970 from "figma:asset/5af74d6eee4a267ca2ecf406c0973d3b9d4fe038.png";
import img1 from "figma:asset/a7e61f0696346bc21a8b5edca97c4ede15af7837.png";
import img2 from "figma:asset/a49cf6858880fcfb572a440e6177f2bf2483d4c5.png";

function ComponentHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[22px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        {children}
      </svg>
    </div>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col gap-[10px] h-[80.114px] items-start left-[14.77px] px-[15px] py-[19px] rounded-[10px] w-[330.47px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
        <Helper text="예약마감" text1="D-7, 19:09:20" />
        <Helper text="픽업" text1="12월 17일 20:00" />
        <div className="bg-[#ee2b2f] content-stretch flex h-[37.635px] items-center justify-center px-[11px] py-[13px] relative rounded-[10px] shrink-0 w-[74px]">
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[13px] text-center text-white tracking-[-0.325px] whitespace-nowrap">{"예약"}</p>
        </div>
      </div>
      <div className="absolute h-[14px] left-[117.41px] top-[33px] w-0">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 14">
            <path d="M0.5 0V14" id="Vector 1" stroke="var(--stroke-0, #C1C1C1)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type HelperProps = {
  text: string;
  text1: string;
};

function Helper({ text, text1 }: HelperProps) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center leading-none not-italic relative shrink-0 text-center w-[92.461px]">
      <p className="font-['Pretendard:Medium',sans-serif] h-[14.28px] relative shrink-0 text-[#191a1c] text-[14px] tracking-[-0.56px] w-full">{text}</p>
      <p className="font-['Pretendard:SemiBold',sans-serif] h-[14.152px] relative shrink-0 text-[#6e6f70] text-[13px] tracking-[-0.52px] w-full">{text1}</p>
    </div>
  );
}
type ImageProps = {
  additionalClassNames?: string;
};

function Image({ additionalClassNames = "" }: ImageProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[70.552px] items-start justify-between left-[14.77px] w-[330.47px]", additionalClassNames)}>
      <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-[133px]">
        <p className="font-['Pretendard:Medium',sans-serif] h-[15.461px] leading-none relative shrink-0 text-[#6e6f70] text-[11px] tracking-[-0.44px] w-full">{"신세계푸드 구내식당"}</p>
        <p className="font-['Pretendard:Bold',sans-serif] leading-none min-w-full relative shrink-0 text-[#191a1c] text-[16px] tracking-[-0.16px] w-[min-content]">{"햄에그 샌드위치"}</p>
        <p className="font-['Pretendard:Bold',sans-serif] leading-[0] relative shrink-0 text-[#191a1c] text-[0px] tracking-[-0.15px] w-[145.858px] whitespace-pre-wrap">
          <span className="leading-none text-[15px]">{`3,700  `}</span>
          <span className="leading-none text-[#ee2b2f] text-[13px]">{"(5개 남음)"}</span>
        </p>
      </div>
      <div className="relative rounded-[5px] shrink-0 size-[70px]" data-name="사진 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
          <div className="absolute inset-0 overflow-hidden rounded-[5px]">
            <img alt="" className="absolute h-full left-[-24.7%] max-w-none top-0 w-[150.12%]" src={img1} />
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-[5px]">
            <img alt="" className="absolute h-[292.68%] left-[-12.93%] max-w-none top-[-96.34%] w-[135.16%]" src={img2} />
          </div>
        </div>
      </div>
    </div>
  );
}
type ComponentProps = {
  className?: string;
  property1?: "Default" | "Variant5" | "Variant7";
};

function Component({ className, property1 = "Default" }: ComponentProps) {
  const isVariant5 = property1 === "Variant5";
  const isVariant5OrVariant7 = ["Variant5", "Variant7"].includes(property1);
  const isVariant7 = property1 === "Variant7";
  return (
    <div className={className || "bg-white h-[56px] relative w-[360px]"}>
      <div className={`absolute bottom-0 content-stretch flex gap-[60px] h-[55px] items-center ${isVariant5OrVariant7 ? "left-[42px]" : "-translate-x-1/2 left-1/2"}`}>
        <div className="bg-white content-stretch flex flex-col gap-[6px] h-[56px] items-center px-[16px] py-[10px] relative shrink-0 w-[52px]">
          <ComponentHelper>
            <g id="Frame 1000006407">
              <rect fill="white" height="22" width="22" />
              <path d={svgPaths.p231e6b80} fill={isVariant5OrVariant7 ? "var(--fill-0, #ADAFBB)" : "var(--fill-0, #EE2B2F)"} id="í ìì´ì½" />
            </g>
          </ComponentHelper>
          <p className={`font-["Pretendard:Medium",sans-serif] h-[10px] leading-none not-italic relative shrink-0 text-[9px] text-center tracking-[-0.09px] w-[9px] ${isVariant5OrVariant7 ? "text-[#adafbb]" : "text-[#ee2b2f]"}`}>홈</p>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[6px] h-[56px] items-center px-[8px] py-[10px] relative shrink-0 w-[52px]">
          <div className="bg-white content-stretch flex items-center px-[2px] relative shrink-0 size-[22px]">
            <div className="h-[21px] relative shrink-0 w-[19px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 21">
                <g id="Group 1000006408">
                  <path clipRule="evenodd" d={svgPaths.p3c15080} fill={isVariant5 ? "var(--fill-0, #EE2B2F)" : "var(--fill-0, #ADAFBB)"} fillRule="evenodd" id="Vector" />
                  <path d={svgPaths.p3c9e6e00} fill="var(--fill-0, white)" id="Rectangle 682" />
                  <path d={svgPaths.p5252400} fill="var(--fill-0, white)" id="Rectangle 683" />
                  <path d={svgPaths.pd41ab00} fill="var(--fill-0, white)" id="Rectangle 684" />
                </g>
              </svg>
            </div>
          </div>
          <p className={`font-["Pretendard:Medium",sans-serif] h-[10px] leading-none not-italic relative shrink-0 text-[9px] text-center tracking-[-0.09px] w-[35px] ${isVariant5 ? "text-[#ee2b2f]" : "text-[#adafbb]"}`}>결제내역</p>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[7px] h-[56px] items-center px-[7px] py-[10px] relative shrink-0 w-[52px]">
          <ComponentHelper>
            <g id="Frame 1000006410">
              <rect fill="white" height="22" width="22" />
              <path clipRule="evenodd" d={svgPaths.p4c2e400} fill={isVariant7 ? "var(--fill-0, #EE2B2F)" : "var(--fill-0, #ADAFBB)"} fillRule="evenodd" id="ë§ì´ì¬ë¦¬ë¸ ìì´ì½" />
            </g>
          </ComponentHelper>
          <p className={`font-["Pretendard:Medium",sans-serif] h-[10px] leading-none not-italic relative shrink-0 text-[9px] text-center tracking-[-0.09px] w-[38px] ${isVariant7 ? "text-[#ee2b2f]" : "text-[#adafbb]"}`}>My올리브</p>
        </div>
      </div>
      <div className="absolute bg-[#d9d9d9] inset-[0.1%_0_98.12%_0]" data-name="라인" />
    </div>
  );
}

export default function Component1() {
  return (
    <div className="bg-white relative size-full" data-name="홈 > 간편식">
      <div className="absolute inset-[6.21%_-0.01%_76.91%_0.01%]" data-name="영역">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 135.039">
          <path d={svgPaths.p14b2c680} fill="var(--fill-0, #F2F2F2)" id="ìì­" stroke="var(--stroke-0, #F7F8FA)" />
        </svg>
      </div>
      <div className="absolute inset-[8.09%_4.18%_84.41%_4.15%]" data-name="포인트">
        <div className="absolute inset-[-16.67%_-3.03%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350 80">
            <g filter="url(#filter0_d_2017_387)" id="í¬ì¸í¸">
              <path d={svgPaths.p3713dc00} fill="var(--fill-0, white)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="80" id="filter0_d_2017_387" width="350" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation="5" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.918823 0 0 0 0 0.918823 0 0 0 0 0.918823 0 0 0 0.7 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2017_387" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2017_387" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute contents inset-[11.03%_61.68%_87.35%_9.71%]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] inset-[11.03%_61.68%_87.35%_9.71%] leading-none not-italic text-[#6e6f70] text-[13px] tracking-[-0.13px]">사용 가능 포인트</p>
      </div>
      <p className="absolute font-['Pretendard:ExtraBold',sans-serif] inset-[10.51%_12.18%_86.83%_64.21%] leading-none not-italic text-[#191a1c] text-[20px] text-right tracking-[-0.2px]">58,690</p>
      <div className="-translate-y-1/2 absolute aspect-[5/8.333333015441895] left-[90.26%] right-[8.35%] top-[calc(50%-305.3px)]" data-name="Vector (Stroke)">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8.33333">
          <path clipRule="evenodd" d={svgPaths.p12ed2d80} fill="var(--fill-0, #6E6F70)" fillRule="evenodd" id="Vector (Stroke)" />
        </svg>
      </div>
      <div className="absolute bottom-[76.91%] contents left-0 top-[19.23%]">
        <div className="absolute bottom-[76.91%] left-0 top-[22.97%] w-[360px]" data-name="탭 라인">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1">
            <path clipRule="evenodd" d="M360 1H0V0H360V1Z" fill="var(--fill-0, #D9D9D9)" fillRule="evenodd" id="í­ ë¼ì¸" />
          </svg>
        </div>
        <p className="absolute font-['Pretendard:Medium',sans-serif] inset-[19.23%_76.18%_78.75%_9.77%] leading-none not-italic text-[#c1c1c1] text-[15px] text-center tracking-[-0.6px]">구내식당</p>
        <p className="absolute font-['Pretendard:Medium',sans-serif] inset-[19.23%_53.96%_78.75%_31.99%] leading-none not-italic text-[#191a1c] text-[15px] text-center tracking-[-0.6px]">간편식</p>
        <div className="absolute inset-[22.59%_72.1%_77.03%_5.68%]" data-name="탭" />
        <div className="absolute bg-[#191a1c] inset-[22.59%_49.87%_77.03%_27.9%]" data-name="탭" />
        <div className="absolute inset-[22.59%_27.65%_77.03%_50.13%]" data-name="탭" />
        <div className="absolute inset-[22.59%_5.43%_77.03%_72.35%]" data-name="탭" />
      </div>
      <div className="absolute bg-white left-[-0.2px] shadow-[0px_-1px_8px_0px_rgba(163,163,163,0.6)] top-[-0.03px] w-[360px]" data-name="상단 내비케이션바">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[20px] py-[9px] relative w-full">
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
              <div className="h-[24px] relative shrink-0 w-[24.004px]" data-name="로고">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0042 24">
                  <g id="ë¡ê³">
                    <path d={svgPaths.p18d9400} fill="url(#paint0_linear_2017_373)" id="Ellipse 262" />
                    <ellipse cx="12.0061" cy="12" fill="var(--fill-0, white)" id="Ellipse 263" rx="7.57869" ry="7.45444" />
                    <path d={svgPaths.p3e161500} fill="var(--fill-0, #EE2B2F)" id="Ellipse 264" />
                  </g>
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2017_373" x1="12.0021" x2="12.0021" y1="0" y2="24">
                      <stop stopColor="#FF4048" />
                      <stop offset="0.5" stopColor="#ED1B24" />
                      <stop offset="1" stopColor="#FF4048" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <p className="col-1 font-['Pretendard:Bold',sans-serif] leading-none ml-0 mt-0 not-italic relative row-1 text-[#191a1c] text-[18px] tracking-[-0.18px] w-[220px]">Olive Cafeteria</p>
              </div>
              <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                <div className="relative shrink-0 size-[30px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
                    <g id="Frame 1000006182">
                      <rect fill="white" height="30" width="30" />
                      <path d={svgPaths.p2cb7c600} fill="var(--fill-0, #191A1C)" id="ì¥ë°êµ¬ë ìì´ì½" />
                    </g>
                  </svg>
                </div>
                <div className="bg-white content-stretch flex items-center justify-center px-[3px] py-px relative shrink-0 size-[30px]">
                  <div className="h-[19px] relative shrink-0 w-[15.696px]" data-name="알림 아이콘">
                    <div className="absolute inset-[-0.79%_-0.96%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9956 19.3">
                        <g id="ìë¦¼ ìì´ì½">
                          <path d={svgPaths.p27852480} fill="var(--fill-0, #191A1C)" id="ì¢" stroke="var(--stroke-0, black)" strokeWidth="0.3" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Component className="absolute bg-white bottom-0 h-[56px] left-0 overflow-clip w-[360px]" property1="Variant7" />
      <div className="absolute h-[40px] left-[15px] top-[204.84px] w-[330px]" data-name="날짜 선택 영역 (조회값 노출)">
        <div className="absolute content-stretch flex flex-col inset-0 items-start px-[18px] py-[13px] rounded-[13px]">
          <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[13px]" />
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="h-[15px] relative shrink-0 w-[13.333px]" data-name="달력 아이콘">
              <div className="absolute inset-[-3.33%_-3.75%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3333 16">
                  <path d={svgPaths.p21399400} id="ë¬ë ¥ ìì´ì½" stroke="var(--stroke-0, #6E6F70)" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <p className="font-['Pretendard:Bold',sans-serif] h-[13px] leading-none not-italic relative shrink-0 text-[#6e6f70] text-[12px] tracking-[-0.48px] w-[103.224px]">4월 27일 ~ 5월 3일</p>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[15.34px] top-[264.84px]">
        <div className="absolute h-[101.17px] left-[15.34px] rounded-[10px] top-[264.84px] w-[330.191px]" data-name="image 970">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
            <img alt="" className="absolute h-full left-[-1.69%] max-w-none top-0 w-[101.69%]" src={imgImage970} />
          </div>
        </div>
        <div className="absolute contents left-[45.53px] not-italic text-white top-[284.7px]">
          <div className="absolute font-['Pretendard:SemiBold',sans-serif] h-[41.358px] leading-[1.2] left-[45.53px] text-[0px] top-[304.8px] tracking-[-0.4px] w-[154.919px]">
            <p className="mb-0 text-[13px]">올리브식권 만족도 설문</p>
            <p className="font-['Pretendard:ExtraBold',sans-serif] text-[20px]">먹고싶은 메뉴</p>
          </div>
          <p className="absolute font-['Pretendard:Regular',sans-serif] leading-none left-[45.53px] text-[11px] top-[284.7px] w-[136.247px]">OPEN EVENT</p>
        </div>
      </div>
      <div className="absolute contents left-[14.77px] top-[386.01px]">
        <Image additionalClassNames="top-[386.01px]" />
        <Helper1 additionalClassNames="top-[476.57px]" />
      </div>
      <div className="absolute contents left-[14.77px] top-[586.68px]">
        <Image additionalClassNames="top-[586.68px]" />
        <Helper1 additionalClassNames="top-[677.23px]" />
      </div>
    </div>
  );
}