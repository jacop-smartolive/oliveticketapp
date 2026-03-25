import img from "figma:asset/a49cf6858880fcfb572a440e6177f2bf2483d4c5.png";

function Image() {
  return (
    <div className="relative rounded-[5px] shrink-0 size-[70px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
        <img alt="" className="absolute h-[292.68%] left-[-12.93%] max-w-none top-[-96.34%] w-[135.16%]" src={img} />
      </div>
    </div>
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

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute content-stretch flex flex-col items-start left-[14.54px] top-[45px] w-[330.389px]">
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[101.733px]">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
              <Text text="간편식" />
              <Text text="결제완료" />
            </div>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none min-w-full not-italic relative shrink-0 text-[#191a1c] text-[16px] tracking-[-0.16px] w-[min-content]">햄에그 샌드위치</p>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[137px]">
              <div className="content-stretch flex items-center justify-center px-[10px] py-[5px] relative rounded-[40px] shrink-0">
                <div aria-hidden="true" className="absolute border border-[#ee2b2f] border-solid inset-0 pointer-events-none rounded-[40px]" />
                <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ee2b2f] text-[10px] text-center tracking-[-0.4px] whitespace-nowrap">
                  <p className="leading-none">픽업예정</p>
                </div>
              </div>
              <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#191a1c] text-[15px] tracking-[-0.15px] whitespace-nowrap">
                <p className="leading-none">10,000</p>
              </div>
            </div>
          </div>
          <Image />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[14.54px] top-[147px] w-[330.389px]">
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[101.733px]">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
              <Text text="간편식" />
              <Text text="결제완료" />
            </div>
            <p className="font-['Pretendard:Bold',sans-serif] leading-none min-w-full not-italic relative shrink-0 text-[#191a1c] text-[16px] tracking-[-0.16px] w-[min-content]">햄에그 샌드위치</p>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[137px]">
              <div className="content-stretch flex items-center justify-center px-[10px] py-[5px] relative rounded-[40px] shrink-0">
                <div aria-hidden="true" className="absolute border border-[#a3a3a3] border-solid inset-0 pointer-events-none rounded-[40px]" />
                <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[10px] text-center tracking-[-0.4px] whitespace-nowrap">
                  <p className="leading-none">픽업완료</p>
                </div>
              </div>
              <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#191a1c] text-[15px] tracking-[-0.15px] whitespace-nowrap">
                <p className="leading-none">10,000</p>
              </div>
            </div>
          </div>
          <Image />
        </div>
      </div>
    </div>
  );
}