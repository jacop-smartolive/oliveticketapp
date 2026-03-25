type HelperProps = {
  text: string;
  text1: string;
};

function Helper({ text, text1 }: HelperProps) {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-none not-italic relative shrink-0 w-[102px]">
      <p className="font-['Pretendard:Medium',sans-serif] h-[10.593px] relative shrink-0 text-[#6e6f70] text-[11px] tracking-[-0.44px] w-full">{text}</p>
      <p className="font-['Pretendard:Bold',sans-serif] h-[12.857px] relative shrink-0 text-[#191a1c] text-[13px] tracking-[-0.13px] w-full">{text1}</p>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-white content-stretch flex h-[34px] items-center justify-center px-[15px] py-[10px] relative rounded-[60px] shrink-0 w-[56px]">
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[60px]" />
      <p className="font-['Pretendard:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#a3a3a3] text-[13px] text-center tracking-[-0.325px] whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f2f2f2] relative size-full" data-name="기업포인트_신청내역">
      <div className="absolute bg-white h-[90px] left-0 overflow-clip shadow-[0px_-1px_8px_0px_rgba(163,163,163,0.6)] top-0 w-[360px]">
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17.946px] leading-none left-[calc(50%-135.39px)] not-italic text-[#191a1c] text-[17px] top-[16.66px] tracking-[-0.17px] w-[151px]">기업 포인트</p>
        <div className="absolute flex items-center justify-center left-[21.07px] size-[14.542px] top-[18.36px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
          <div className="-rotate-45 flex-none">
            <div className="relative size-[10.283px]" data-name="이전">
              <div className="absolute inset-[-12.16%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7831 12.7831">
                  <path d="M11.5331 1.25H1.25V11.5331" id="Rectangle 31788" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 top-[98.89%] w-[360px]" data-name="탭 라인">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1">
            <path clipRule="evenodd" d="M360 1H0V0H360V1Z" fill="var(--fill-0, #D9D9D9)" fillRule="evenodd" id="Line 1 (Stroke)" />
          </svg>
        </div>
        <div className="absolute content-stretch flex font-['Pretendard:Medium',sans-serif] items-center leading-none left-[20.45px] not-italic text-[15px] text-center top-[59.06px] tracking-[-0.6px]">
          <p className="h-[16.22px] relative shrink-0 text-[#c1c1c1] w-[106px]">잔여포인트</p>
          <p className="h-[16.22px] relative shrink-0 text-[#c1c1c1] w-[107px]">충전내역</p>
          <p className="h-[16.22px] relative shrink-0 text-[#191a1c] w-[106px]">신청내역</p>
        </div>
        <div className="absolute content-stretch flex items-center left-[20.45px] top-[86.28px]">
          <div className="h-[3px] shrink-0 w-[107px]" data-name="탭" />
          <div className="h-[3px] shrink-0 w-[106px]" data-name="탭" />
          <div className="bg-[#191a1c] h-[3px] shrink-0 w-[106px]" data-name="탭" />
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[19.07px] top-[105.6px]">
        <div className="bg-[#191a1c] content-stretch flex h-[34px] items-center justify-center px-[15px] py-[10px] relative rounded-[60px] shrink-0 w-[56px]" data-name="전체 탭">
          <p className="font-['Pretendard:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[13px] text-center text-white tracking-[-0.325px] whitespace-nowrap">전체</p>
        </div>
        <Text text="신청" />
        <Text text="승인" />
        <Text text="거부" />
      </div>
      <div className="-translate-y-1/2 absolute contents left-[14.49px] top-[calc(50%-202.92px)]">
        <div className="-translate-y-1/2 absolute bg-white content-stretch flex flex-col items-start left-[14.49px] pb-[18px] pt-[14px] px-[15px] rounded-[10px] top-[calc(50%-202.92px)]">
          <div className="content-stretch flex items-end justify-between relative shrink-0 w-[299.572px]">
            <Helper text="3월 5일 (화) 17:00" text1="중식 - 임직원" />
            <div className="content-stretch flex flex-col gap-[10px] items-end justify-center relative shrink-0 w-[68px]">
              <div className="bg-[#ddedff] content-stretch flex h-[20px] items-center justify-center px-[4px] py-[5px] relative rounded-[30px] shrink-0" data-name="신청완료 표시">
                <p className="font-['Pretendard:Medium',sans-serif] h-[10.452px] leading-none not-italic relative shrink-0 text-[#1d8aff] text-[10px] text-center tracking-[-0.4px] w-[39.286px]">승인완료</p>
              </div>
              <p className="font-['Pretendard:ExtraBold',sans-serif] h-[12.95px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[14px] text-right tracking-[-0.14px] w-[58.561px]">130,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute contents left-[14.49px] top-[calc(50%-117.97px)]">
        <div className="-translate-y-1/2 absolute bg-white content-stretch flex flex-col items-start left-[14.49px] pb-[18px] pt-[14px] px-[15px] rounded-[10px] top-[calc(50%-117.97px)]">
          <div className="content-stretch flex items-end justify-between relative shrink-0 w-[299.572px]">
            <Helper text="3월 5일 (화) 17:00" text1="중식 - 임직원" />
            <div className="content-stretch flex flex-col gap-[10px] items-end justify-center relative shrink-0 w-[68px]">
              <div className="bg-[#f3f4f6] content-stretch flex h-[20px] items-center justify-center px-[4px] py-[5px] relative rounded-[30px] shrink-0" data-name="신청완료 표시">
                <p className="font-['Pretendard:Medium',sans-serif] h-[10.452px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[10px] text-center tracking-[-0.4px] w-[39.286px]">신청완료</p>
              </div>
              <p className="font-['Pretendard:ExtraBold',sans-serif] h-[12.95px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[14px] text-right tracking-[-0.14px] w-[58.561px]">130,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute contents left-[14.49px] top-[calc(50%-33.02px)]">
        <div className="-translate-y-1/2 absolute bg-white content-stretch flex flex-col items-start left-[14.49px] pb-[18px] pt-[14px] px-[15px] rounded-[10px] top-[calc(50%-33.02px)]">
          <div className="content-stretch flex items-end justify-between relative shrink-0 w-[299.572px]">
            <Helper text="3월 5일 (화) 17:00" text1="중식 - 임직원" />
            <div className="content-stretch flex flex-col gap-[10px] items-end justify-center relative shrink-0 w-[68px]">
              <div className="bg-[#fff0f1] content-stretch flex h-[20px] items-center justify-center px-[4px] py-[5px] relative rounded-[30px] shrink-0" data-name="신청완료 표시">
                <p className="font-['Pretendard:Medium',sans-serif] h-[10.452px] leading-none not-italic relative shrink-0 text-[#ee2b2f] text-[10px] text-center tracking-[-0.4px] w-[39.286px]">신청거부</p>
              </div>
              <p className="font-['Pretendard:ExtraBold',sans-serif] h-[12.95px] leading-none not-italic relative shrink-0 text-[#191a1c] text-[14px] text-right tracking-[-0.14px] w-[58.561px]">130,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white bottom-0 left-[0.31px] rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-1px_8px_0px_rgba(163,163,163,0.6)] w-[360px]" data-name="하단 고정 버튼">
        <div className="content-stretch flex flex-col items-start p-[10px] relative w-full">
          <div className="h-[46px] relative shrink-0 w-[438px]">
            <div className="absolute bg-[#ee2b2f] h-[46px] left-0 rounded-[10px] top-0 w-[340px]" data-name="라인 버튼" />
            <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] h-[18.012px] leading-none left-[calc(50%-49px)] not-italic text-[17px] text-center text-white top-[calc(50%-9.01px)] tracking-[-0.17px] w-[123.688px]">포인트 신청</p>
          </div>
        </div>
      </div>
    </div>
  );
}