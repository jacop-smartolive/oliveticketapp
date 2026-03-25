export default function Frame() {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[10px] rounded-tr-[10px] size-full">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-between left-1/2 top-1/2 w-[336.266px]">
        <div className="content-stretch flex flex-col gap-[6px] items-start leading-none not-italic relative shrink-0 text-[#191a1c] w-[184px]">
          <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0 text-[11px] tracking-[-0.11px] w-full">주문금액</p>
          <p className="font-['Pretendard:Bold',sans-serif] h-[16.512px] relative shrink-0 text-[19px] tracking-[-0.19px] w-full">17,800</p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[137.638px]">
          <div className="bg-[#ee2b2f] h-[46px] relative rounded-[10px] shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start px-[18px] py-[15px] relative size-full">
              <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center px-[4px] py-[2px] relative rounded-[7.56px] shrink-0 size-[15.121px]">
                  <p className="font-['Pretendard:SemiBold',sans-serif] h-[10.68px] leading-none not-italic relative shrink-0 text-[#ee2b2f] text-[10px] text-center tracking-[-0.1px] w-[7px]">4</p>
                </div>
                <p className="font-['Pretendard:SemiBold',sans-serif] h-[15.547px] leading-none not-italic relative shrink-0 text-[15px] text-white tracking-[-0.15px] w-[81.081px]">장바구니 보기</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}