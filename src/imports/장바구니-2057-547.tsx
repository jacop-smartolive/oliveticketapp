import clsx from "clsx";
import svgPaths from "./svg-2zgxdrqmnu";
import img from "figma:asset/a49cf6858880fcfb572a440e6177f2bf2483d4c5.png";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties} className="col-1 flex items-center justify-center ml-[8.75px] mt-[8.75px] relative row-1 size-[7.5px]">
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

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="장바구니">
      <div className="absolute content-stretch flex items-start justify-between left-[15.13px] top-[38.05px] w-[331.682px]">
        <div className="content-stretch flex gap-[23px] items-start relative shrink-0">
          <div className="relative rounded-[10px] shrink-0 size-[70px]" data-name="썸네일">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
              <img alt="" className="absolute h-[292.68%] left-[-12.93%] max-w-none top-[-96.34%] w-[135.16%]" src={img} />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[184.458px]">
            <div className="content-stretch flex flex-col gap-[8px] items-start leading-none not-italic relative shrink-0 text-[#191a1c] w-full">
              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                <p className="font-['Pretendard:Bold',sans-serif] h-[17px] relative shrink-0 text-[16px] tracking-[-0.16px] w-full">튜나 샌드위치</p>
                <div className="content-stretch flex flex-col font-['Pretendard:Regular',sans-serif] gap-[9px] items-start relative shrink-0 text-[11px] tracking-[-0.11px] w-[137px]">
                  <p className="h-[10.911px] relative shrink-0 w-full">디와이 구내식당 코너 B</p>
                  <p className="h-[10.906px] relative shrink-0 w-full">픽업 : 12월 17일 20:00</p>
                </div>
              </div>
              <p className="font-['Pretendard:Bold',sans-serif] h-[17px] relative shrink-0 text-[15px] tracking-[-0.15px] w-full">3,700</p>
            </div>
            <div className="content-stretch flex flex-col h-[30px] items-start px-[7px] py-[8px] relative rounded-[5px] shrink-0 w-[86px]">
              <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                  <div className="col-1 h-px ml-0 mt-0 relative row-1 w-[10px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
                      <g id="Group 1000006352">
                        <path d={svgPaths.pac0cc70} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="font-['Pretendard:Medium',sans-serif] h-[14px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[13px] text-center tracking-[-0.13px] w-[12px]">1</p>
                <div className="relative shrink-0 size-[10px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                    <g id="Group 1000006414">
                      <path d={svgPaths.p203bd800} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
                      <path d={svgPaths.p159b000} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤_2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
            <div className="border border-[#eaeaea] border-solid col-1 ml-0 mt-0 rounded-[5px] row-1 size-[25px]" />
          </div>
          <Wrapper additionalClassNames="rotate-45">
            <path d="M1 1L11.6066 1" id="Line 16" stroke="var(--stroke-0, #A3A3A3)" strokeLinecap="round" strokeWidth="2" />
          </Wrapper>
          <Wrapper additionalClassNames="rotate-135">
            <path d="M1 1L11.6066 1" id="Line 17" stroke="var(--stroke-0, #A3A3A3)" strokeLinecap="round" strokeWidth="2" />
          </Wrapper>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col h-[40px] items-start left-1/2 px-[129px] py-[14px] rounded-[10px] top-[185.53px] w-[324px]">
        <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[12px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g id="Group 1000006416">
                <path d={svgPaths.p3d742800} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤" />
                <path d={svgPaths.p37cd8d00} fill="var(--fill-0, #191A1C)" id="ë§ì´ëì¤_2" />
              </g>
            </svg>
          </div>
          <p className="font-['Pretendard:SemiBold',sans-serif] h-[12.727px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[13px] tracking-[-0.13px] w-[48.05px]">메뉴 추가</p>
        </div>
      </div>
    </div>
  );
}