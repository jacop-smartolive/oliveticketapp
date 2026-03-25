import svgPaths from "./svg-8oonl1aqgn";
import img1 from "figma:asset/a7e61f0696346bc21a8b5edca97c4ede15af7837.png";
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
type HelperProps = {
  text: string;
  text1: string;
};

function Helper({ text, text1 }: HelperProps) {
  return (
    <div className="content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-none not-italic relative shrink-0 text-[#191a1c] text-[13px] tracking-[-0.13px] w-full">
      <p className="h-[13px] relative shrink-0 w-[110.355px]">{text}</p>
      <p className="h-[13px] relative shrink-0 text-right w-[75.005px]">{text1}</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="결제내역 상세 11">
      <div className="absolute bg-[#eaeaea] h-px left-0 top-[114.49px] w-[360px]" data-name="라인 2" />
      <div className="absolute bg-white content-stretch flex flex-col h-[132px] items-center justify-center left-0 px-[13px] py-[29px] top-[115.49px] w-[360px]">
        <div className="content-stretch flex flex-col font-['Pretendard:Regular',sans-serif] gap-[17px] items-start leading-none not-italic relative shrink-0 text-[#191a1c] text-[13px] tracking-[-0.13px] w-[330px]">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="h-[12.783px] relative shrink-0 w-[150px]">일시</p>
            <p className="h-[12.783px] relative shrink-0 text-right w-[147.171px]">2023.09.06 11:13</p>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="h-[13.247px] relative shrink-0 w-[150px]">결제 방식</p>
            <p className="h-[13.247px] relative shrink-0 text-right w-[139.168px]">혼자결제</p>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="h-[12.728px] relative shrink-0 w-[150px]">결제번호</p>
            <p className="h-[11.23px] relative shrink-0 text-right w-[148px]">7773023090610785040</p>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#eaeaea] h-px left-0 top-[246.49px] w-[360px]" data-name="라인 7" />
      <div className="absolute bg-[#eaeaea] h-px left-0 top-[377.49px] w-[360px]" data-name="라인 8" />
      <div className="absolute bg-white content-stretch flex flex-col h-[76px] items-start left-0 px-[15px] py-[28px] top-[378.49px] w-[360px]">
        <div className="content-stretch flex font-['Pretendard:Bold',sans-serif] items-center justify-between leading-none not-italic relative shrink-0 text-[#191a1c] w-[330px]">
          <p className="h-[17px] relative shrink-0 text-[17px] tracking-[-0.17px] w-[110.355px]">총 주문금액</p>
          <p className="h-[18.606px] relative shrink-0 text-[19px] text-right tracking-[-0.19px] w-[110.355px]">115,000</p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#f3f4f6] bottom-[41.94%] left-1/2 top-[56.81%] w-[360px]" />
      <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[15px] top-[494.49px] w-[330px]">
        <p className="font-['Pretendard:Bold',sans-serif] h-[13px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[13px] tracking-[-0.13px] w-full">결제 포인트</p>
        <Helper text="기업포인트" text1="23,000" />
        <Helper text="올리브 포인트" text1="1,700" />
        <div className="bg-[#eaeaea] h-px shrink-0 w-full" data-name="라인 9" />
        <Helper text="총 결제 포인트" text1="25,000" />
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[15.35px] top-[274.99px] w-[330px]">
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[101.733px]">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
              <Text text="구내식당" />
              <Text text="결제완료" />
            </div>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#191a1c] text-[16px] tracking-[-0.16px] w-full">신세계 구내식당</p>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#191a1c] text-[15px] tracking-[-0.15px] w-full">10,000</p>
          </div>
          <div className="relative rounded-[5px] shrink-0 size-[70px]" data-name="사진 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
              <img alt="" className="absolute h-full left-[-24.7%] max-w-none top-0 w-[150.12%]" src={img1} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#f7f8fa] content-stretch flex h-[64px] items-center justify-center left-0 px-[82px] py-[24px] top-[50.49px] w-[360px]">
        <p className="font-['Pretendard:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#191a1c] text-[15px] text-center tracking-[-0.15px] whitespace-nowrap">결제완료</p>
      </div>
      <div className="absolute h-[130px] left-0 top-[247.49px] w-[360px]" data-name="영역">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 130">
          <path d="M0 0H360V130H0V0Z" fill="var(--fill-0, white)" id="ìì­" />
        </svg>
      </div>
      <div className="absolute bg-white h-[50px] left-[0.16px] overflow-clip shadow-[0px_-1px_8px_0px_rgba(163,163,163,0.6)] top-0 w-[360px]" data-name="상단 바">
        <p className="absolute font-['Pretendard:Bold',sans-serif] inset-[32.13%_33.7%_29.88%_11.57%] leading-none not-italic text-[#191a1c] text-[17px] tracking-[-0.17px]">결제내역</p>
        <div className="absolute left-[10px] size-[30px] top-[10px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
            <g id="Frame 1000006416">
              <rect fill="white" height="30" width="30" />
              <path d={svgPaths.p1d0f0100} fill="var(--fill-0, #191A1C)" id="Subtract" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}