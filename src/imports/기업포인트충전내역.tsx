type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="content-stretch flex items-end justify-between leading-none not-italic relative shrink-0 w-[299.572px]">
      <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[102px]">
        <p className="font-['Pretendard:Medium',sans-serif] h-[10.593px] relative shrink-0 text-[#6e6f70] text-[11px] tracking-[-0.44px] w-full">{"3월 5일 (화) 17:00"}</p>
        <p className="font-['Pretendard:Bold',sans-serif] h-[12.857px] relative shrink-0 text-[#191a1c] text-[13px] tracking-[-0.13px] w-full">{"중식 - 임직원"}</p>
      </div>
      <p className="font-['Pretendard:ExtraBold',sans-serif] h-[12.95px] relative shrink-0 text-[#191a1c] text-[14px] text-right tracking-[-0.14px] w-[58.561px]">{text}</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f2f2f2] relative size-full" data-name="기업포인트_충전내역">
      <div className="absolute bg-white h-[90px] left-0 overflow-clip shadow-[0px_-1px_8px_0px_rgba(163,163,163,0.6)] top-0 w-[360px]">
        <p className="absolute font-['Pretendard:Bold',sans-serif] h-[17.946px] leading-none left-[calc(50%-135.39px)] not-italic text-[#191a1c] text-[17px] top-[16.66px] tracking-[-0.17px] w-[151px]">기업 포인트</p>
        <div className="absolute flex items-center justify-center left-[21.07px] size-[14.542px] top-[18.36px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
          <div className="-rotate-45 flex-none">
            <div className="relative size-[10.283px]" data-name="이전">
              <div className="absolute inset-[-12.16%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7831 12.7831">
                  <path d="M11.5331 1.25H1.25V11.5331" id="ì´ì " stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 top-[98.89%] w-[360px]" data-name="탭 라인">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1">
            <path clipRule="evenodd" d="M360 1H0V0H360V1Z" fill="var(--fill-0, #D9D9D9)" fillRule="evenodd" id="í­ ë¼ì¸" />
          </svg>
        </div>
        <div className="absolute content-stretch flex font-['Pretendard:Medium',sans-serif] items-center leading-none left-[20.45px] not-italic text-[15px] text-center top-[59.06px] tracking-[-0.6px]">
          <p className="h-[16.22px] relative shrink-0 text-[#c1c1c1] w-[106px]">잔여포인트</p>
          <p className="h-[16.22px] relative shrink-0 text-[#191a1c] w-[107px]">충전내역</p>
          <p className="h-[16.22px] relative shrink-0 text-[#c1c1c1] w-[106px]">신청내역</p>
        </div>
        <div className="absolute content-stretch flex items-center left-[20.45px] top-[86.28px]">
          <div className="h-[3px] shrink-0 w-[107px]" data-name="탭" />
          <div className="bg-[#191a1c] h-[3px] shrink-0 w-[106px]" data-name="탭" />
          <div className="h-[3px] shrink-0 w-[106px]" data-name="탭" />
        </div>
      </div>
      <div className="absolute contents left-[14.49px] top-[111px]">
        <div className="absolute bg-white content-stretch flex flex-col h-[75.798px] items-start left-[14.49px] px-[15px] py-[18px] rounded-[10px] top-[111px] w-[330px]">
          <Text text="130,000" />
        </div>
      </div>
      <div className="absolute contents left-[14.49px] top-[196.8px]">
        <div className="absolute bg-white content-stretch flex flex-col h-[75.798px] items-start left-[14.49px] px-[15px] py-[18px] rounded-[10px] top-[196.8px] w-[330px]">
          <Text text="130,000" />
        </div>
      </div>
      <div className="absolute contents left-[14.49px] top-[282.6px]">
        <div className="absolute bg-white content-stretch flex flex-col h-[75.798px] items-start left-[14.49px] px-[15px] py-[18px] rounded-[10px] top-[282.6px] w-[330px]">
          <Text text="130,000" />
        </div>
      </div>
      <div className="absolute contents left-[14.49px] top-[368.4px]">
        <div className="absolute bg-white content-stretch flex flex-col h-[75.798px] items-start left-[14.49px] px-[15px] py-[18px] rounded-[10px] top-[368.4px] w-[330px]">
          <Text text="130,000" />
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