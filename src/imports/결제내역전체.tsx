import clsx from "clsx";
import svgPaths from "./svg-km1t4p00p8";
import img1 from "figma:asset/a7e61f0696346bc21a8b5edca97c4ede15af7837.png";
import img from "figma:asset/a49cf6858880fcfb572a440e6177f2bf2483d4c5.png";

function ComponentHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[22px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative rounded-[5px] shrink-0 size-[70px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">{children}</div>
    </div>
  );
}
type Component2Props = {
  additionalClassNames?: string;
};

function Component2({ additionalClassNames = "" }: Component2Props) {
  return (
    <div className={clsx("-translate-x-1/2 absolute left-[calc(50%-0.37px)] w-[329.083px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 329.083 1">
        <path clipRule="evenodd" d="M329.083 1H0V0H329.083V1Z" fill="var(--fill-0, #EAEAEA)" fillRule="evenodd" id="ë¼ì¸" />
      </svg>
    </div>
  );
}

function Image() {
  return (
    <Wrapper>
      <img alt="" className="absolute h-full left-[-24.7%] max-w-none top-0 w-[150.12%]" src={img1} />
    </Wrapper>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip px-[6px] py-[5px] relative rounded-[30px] shrink-0">
      <p className="font-['Pretendard:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#191a1c] text-[10px] text-center tracking-[-0.4px] whitespace-nowrap">{text}</p>
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
    <div className="bg-white relative size-full" data-name="결제내역_전체">
      <Component2 additionalClassNames="bottom-[49.81%] top-[50.06%]" />
      <Component2 additionalClassNames="bottom-[69.5%] top-[30.37%]" />
      <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[15.35px] top-[112.48px] w-[330.041px]">
        <p className="font-['Pretendard:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#6e6f70] text-[11px] tracking-[-0.44px] w-full">3월 5일 (화) 17:00</p>
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[101.733px]">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
              <Text text="구내식당" />
              <Text text="결제완료" />
            </div>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#191a1c] text-[16px] tracking-[-0.16px] w-full">신세계 구내식당</p>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#191a1c] text-[15px] tracking-[-0.15px] w-full">10,000</p>
          </div>
          <Image />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[15.35px] top-[424.48px] w-[330.041px]">
        <p className="font-['Pretendard:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#6e6f70] text-[11px] tracking-[-0.44px] w-full">3월 5일 (화) 17:00</p>
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[101.733px]">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
              <Text text="간편식" />
              <Text text="결제완료" />
            </div>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#191a1c] text-[16px] tracking-[-0.16px] w-full">햄에그 샌드위치</p>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#191a1c] text-[15px] tracking-[-0.15px] w-full">10,000</p>
          </div>
          <Wrapper>
            <img alt="" className="absolute h-[292.68%] left-[-12.93%] max-w-none top-[-96.34%] w-[135.16%]" src={img} />
          </Wrapper>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[15.35px] top-[268.48px] w-[330.041px]">
        <p className="font-['Pretendard:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#6e6f70] text-[11px] tracking-[-0.44px] w-full">3월 5일 (화) 17:00</p>
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[101.733px]">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
              <Text text="구내식당" />
              <div className="bg-[#fff0f1] content-stretch flex flex-col items-center justify-center overflow-clip px-[6px] py-[5px] relative rounded-[30px] shrink-0">
                <p className="font-['Pretendard:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#ee2b2f] text-[10px] text-center tracking-[-0.4px] whitespace-nowrap">결제완료</p>
              </div>
            </div>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#c1c1c1] text-[16px] tracking-[-0.16px] w-full">신세계 구내식당</p>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#c1c1c1] text-[15px] tracking-[-0.15px] w-full">10,000</p>
          </div>
          <Image />
        </div>
      </div>
      <div className="absolute bg-white h-[90px] left-0 overflow-clip shadow-[0px_-1px_8px_0px_rgba(163,163,163,0.6)] top-0 w-[360px]" data-name="결제내역">
        <div className="absolute bottom-0 left-0 top-[98.89%] w-[360px]" data-name="탭 라인">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1">
            <path clipRule="evenodd" d="M360 1H0V0H360V1Z" fill="var(--fill-0, #D9D9D9)" fillRule="evenodd" id="í­ ë¼ì¸" />
          </svg>
        </div>
        <div className="absolute content-stretch flex font-['Pretendard:Medium',sans-serif] items-center leading-none left-[9.86px] not-italic text-[15px] text-center top-[59.06px] tracking-[-0.6px]">
          <p className="h-[16.22px] relative shrink-0 text-[#191a1c] w-[68px]">전체</p>
          <p className="h-[16.22px] relative shrink-0 text-[#c1c1c1] w-[68px]">구내식당</p>
          <p className="h-[16.22px] relative shrink-0 text-[#c1c1c1] w-[68px]">간편식</p>
        </div>
        <div className="absolute content-stretch flex items-center left-[9.86px] top-[86.28px]">
          <div className="bg-[#191a1c] h-[3px] shrink-0 w-[68px]" data-name="탭" />
          <div className="h-[3px] shrink-0 w-[68px]" data-name="탭" />
          <div className="h-[3px] shrink-0 w-[68px]" data-name="탭" />
          <div className="h-[3px] shrink-0 w-[68px]" data-name="탭" />
          <div className="h-[3px] shrink-0 w-[68px]" data-name="탭" />
        </div>
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[19px] leading-none left-[calc(50%-159.28px)] not-italic text-[#191a1c] text-[17px] top-[15.67px] tracking-[-0.17px] w-[151px]">결제내역</p>
      </div>
      <Component className="absolute bg-white bottom-0 h-[56px] left-0 overflow-clip w-[360px]" property1="Variant5" />
    </div>
  );
}