import clsx from "clsx";
import svgPaths from "./svg-4og8z4bl8t";
import imgImageEvent from "figma:asset/a8cdd84614f54ea09a6823f36ed3415fe5e12fef.png";
import imgImage from "figma:asset/67263215bda51bbde90c3ac7a4c1985de233c912.png";
import imgImage1 from "figma:asset/7380b8da4eefb142a56a6cc0fd9fa1f394d297cf.png";
import imgImage2 from "figma:asset/b05bbdcedcc27ff8836b926c10dc880b0ef515d7.png";
import imgImageEventBanner from "figma:asset/5af74d6eee4a267ca2ecf406c0973d3b9d4fe038.png";
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.989px] items-center relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">{children}</div>
    </div>
  );
}
type GroupVectorBackgroundImage1Props = {
  additionalClassNames?: string;
};

function GroupVectorBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<GroupVectorBackgroundImage1Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.77205 3.42516">
        {children}
      </svg>
    </div>
  );
}
type GroupVectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function GroupVectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<GroupVectorBackgroundImageProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.77202 3.42516">
        {children}
      </svg>
    </div>
  );
}
type TextBackgroundImageProps = {
  additionalClassNames?: string;
};

function TextBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<TextBackgroundImageProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">{children}</div>
    </div>
  );
}
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage1Props>) {
  return (
    <div className={clsx("size-[23.99px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.99 23.99">
        {children}
      </svg>
    </div>
  );
}

function ButtonBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] h-[57.985px] min-h-px min-w-px relative rounded-[12px]">
      <div aria-hidden="true" className="absolute border-[2.216px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.991px] items-center justify-center p-[2.216px] relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("h-[23.99px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("relative shrink-0 w-[174.629px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function IconBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[21.999px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9995 21.9995">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type TextBackgroundImageAndText4Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText4({ text, additionalClassNames = "" }: TextBackgroundImageAndText4Props) {
  return (
    <div className={clsx("h-[23.99px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[24px] left-[10px] not-italic text-[#191a1c] text-[16px] text-center top-[-0.78px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type TextBackgroundImageAndText3Props = {
  text: string;
};

function TextBackgroundImageAndText3({ text }: TextBackgroundImageAndText3Props) {
  return (
    <div className="h-[17.984px] relative shrink-0 w-[10.385px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Pretendard:Medium',sans-serif] leading-[18px] left-[5px] not-italic text-[#a3a3a3] text-[12px] text-center top-[-0.89px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
};

function TextBackgroundImageAndText2({ text }: TextBackgroundImageAndText2Props) {
  return (
    <BackgroundImage additionalClassNames="h-[41.991px]">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#8c96a8] text-[14px] top-[-0.89px] tracking-[-0.3px] w-[165px]">{text}</p>
    </BackgroundImage>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
};

function ContainerBackgroundImageAndText({ text }: ContainerBackgroundImageAndTextProps) {
  return (
    <BackgroundImage additionalClassNames="h-[25.496px]">
      <p className="absolute font-['Pretendard:Extra_Bold',sans-serif] leading-[25.5px] left-0 not-italic text-[#191a1c] text-[17px] top-[-0.78px] whitespace-nowrap">{text}</p>
    </BackgroundImage>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
};

function TextBackgroundImageAndText1({ text }: TextBackgroundImageAndText1Props) {
  return (
    <div className="h-[22.086px] relative shrink-0 w-[174.629px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Pretendard:Bold',sans-serif] leading-[22.1px] min-h-px min-w-px not-italic relative text-[#191a1c] text-[17px] tracking-[-0.4px]">{text}</p>
      </div>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage additionalClassNames="h-[19.49px]">
      <p className="absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[19.5px] left-0 not-italic text-[#1d8aff] text-[13px] top-[-0.89px] tracking-[-0.3px] whitespace-nowrap">{text}</p>
    </BackgroundImage>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
};

function ButtonBackgroundImageAndText({ text }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className="bg-white h-[37.699px] relative rounded-[999px] shrink-0 w-[64.06px]">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Pretendard:Medium',sans-serif] leading-[19.5px] left-[32.1px] not-italic text-[#a3a3a3] text-[13px] text-center top-[8.21px] tracking-[-0.3px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphBackgroundImageAndText({ text, additionalClassNames = "" }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[29.979px]", additionalClassNames)}>
      <p className="absolute font-['Pretendard:Extra_Bold',sans-serif] leading-[30px] left-0 not-italic text-[20px] text-white top-[-0.68px] tracking-[-0.5px] whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="올리브식권_APP">
      <div className="bg-white content-stretch flex flex-col h-[851.87px] items-start overflow-clip relative shrink-0 w-full" data-name="sC">
        <div className="h-0 shrink-0 w-full" data-name="Section" />
        <div className="bg-white h-[851.87px] overflow-clip relative shrink-0 w-full" data-name="App">
          <div className="absolute bg-white h-[729.791px] left-0 overflow-clip top-[53.99px] w-[393.256px]" data-name="Container">
            <div className="absolute bg-[#f2f2f2] content-stretch flex flex-col h-[96.964px] items-start left-0 pt-[15.993px] px-[15.993px] top-[-309.07px] w-[393.256px]" data-name="Container">
              <div className="bg-white h-[64.977px] relative rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)] shrink-0 w-full" data-name="Container">
                <div className="absolute h-[22.501px] left-[19.99px] top-[19.23px] w-[94.42px]" data-name="Paragraph">
                  <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#8c96a8] text-[15px] top-[0.22px] whitespace-nowrap">사용가능 포인트</p>
                </div>
                <div className="absolute content-stretch flex gap-[1.991px] h-[32.991px] items-center left-[250.72px] top-[15.99px] w-[94.558px]" data-name="Container">
                  <div className="h-[32.991px] relative shrink-0 w-[74.584px]" data-name="Paragraph">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <p className="absolute font-['Pretendard:Extra_Bold',sans-serif] leading-[33px] left-0 not-italic text-[#191a1c] text-[22px] top-[-1.78px] tracking-[-0.5px] whitespace-nowrap">58,690</p>
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[17.984px]" data-name="Icon">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9839 17.9839">
                      <g id="Icon">
                        <path d={svgPaths.p20a0db00} id="Vector" stroke="var(--stroke-0, #A3A3A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.87332" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col h-[113.978px] items-start left-0 pt-[13.986px] px-[15.993px] top-[-71.05px] w-[393.256px]" data-name="Container">
              <div className="h-[99.993px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(164.529deg, rgb(255, 75, 80) 0%, rgb(232, 24, 46) 60%, rgb(201, 16, 32) 100%)" }}>
                <div className="absolute bg-[rgba(255,255,255,0.08)] left-[261.28px] rounded-[999px] size-[119.985px] top-[-30px]" data-name="Container" />
                <div className="absolute bg-[rgba(255,255,255,0.06)] left-[221.29px] rounded-[999px] size-[79.984px] top-[40px]" data-name="Container" />
                <div className="absolute h-[99.993px] left-0 top-0 w-[361.269px]" data-name="Container">
                  <div className="absolute h-[15.007px] left-[19.99px] top-[14.76px] w-[213.279px]" data-name="Paragraph">
                    <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.75)] top-[-0.89px] tracking-[1px] whitespace-nowrap">RECOMMENDED MENU</p>
                  </div>
                  <div className="absolute h-[19.49px] left-[19.99px] top-[33.77px] w-[213.279px]" data-name="Paragraph">
                    <p className="absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[19.5px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.9)] top-[-0.89px] whitespace-nowrap">올리브 추천</p>
                  </div>
                  <ParagraphBackgroundImageAndText text="이번주 인기 메뉴" additionalClassNames="left-[19.99px] top-[55.25px] w-[213.279px]" />
                </div>
                <div className="absolute h-[99.993px] left-[241.28px] top-0 w-[119.985px]" data-name="Image (event)">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageEvent} />
                </div>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex gap-[7.997px] h-[61.689px] items-start left-0 overflow-clip pl-[15.993px] pt-[15.993px] top-[42.93px] w-[393.256px]" data-name="Container">
              <ButtonBackgroundImageAndText text="아침" />
              <div className="bg-[#191a1c] h-[37.699px] relative rounded-[999px] shrink-0 w-[61.844px]" data-name="Button">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                  <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] leading-[19.5px] left-[30.99px] not-italic text-[13px] text-center text-white top-[8.21px] tracking-[-0.3px] whitespace-nowrap">점심</p>
                </div>
              </div>
              <ButtonBackgroundImageAndText text="저녁" />
            </div>
            <div className="absolute bg-white h-[626.008px] left-0 top-[104.61px] w-[393.256px]" data-name="Container">
              <div className="absolute bg-white content-stretch flex flex-col h-[291.013px] items-start left-[15.99px] top-[8px] w-[174.629px]" data-name="MenuCard">
                <div className="bg-[#f0f0f0] h-[139.994px] relative rounded-[12px] shrink-0 w-[174.629px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                    <div className="h-[51.996px] relative shrink-0 w-[63.991px]" data-name="Icon">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63.9907 51.9957">
                        <g id="Icon">
                          <path d={svgPaths.p32b87900} fill="var(--fill-0, #D9D9D9)" id="Vector" />
                          <path d={svgPaths.pf091ec0} fill="var(--fill-0, #E0E0E0)" id="Vector_2" />
                          <path d="M7.99883 39.9958H55.9918" id="Vector_3" stroke="var(--stroke-0, #D0D0D0)" strokeWidth="1.49978" />
                          <path d={svgPaths.p1cc3d580} fill="var(--fill-0, #CDCDCD)" id="Vector_4" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-[1_0_0] min-h-px min-w-px relative w-[174.629px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5.989px] items-start pt-[11.995px] relative size-full">
                    <TextBackgroundImageAndText text="분식 코너" />
                    <TextBackgroundImageAndText1 text="떡볶이 세트" />
                    <BackgroundImage additionalClassNames="h-[41.991px]">
                      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#8c96a8] text-[14px] top-[-0.89px] tracking-[-0.3px] w-[173px]">치즈 떡볶이, 전통 순대, 고구마튀김, 야채튀김</p>
                    </BackgroundImage>
                    <ContainerBackgroundImageAndText text="6,500" />
                  </div>
                </div>
              </div>
              <div className="absolute bg-white h-[291.013px] left-[202.62px] top-[8px] w-[174.629px]" data-name="MenuCard">
                <div className="absolute content-stretch flex flex-col gap-[5.989px] h-[151.019px] items-start left-0 pt-[11.995px] top-[139.99px] w-[174.629px]" data-name="Container">
                  <TextBackgroundImageAndText text="한식 코너" />
                  <TextBackgroundImageAndText1 text="비빔밥 세트" />
                  <TextBackgroundImageAndText2 text="돌솥 비빔밥, 된장국, 김치, 계절 나물 3종" />
                  <ContainerBackgroundImageAndText text="7,000" />
                </div>
                <div className="absolute content-stretch flex flex-col h-[139.994px] items-start left-0 overflow-clip rounded-[12px] top-0 w-[174.629px]" data-name="Container">
                  <div className="h-[139.994px] relative shrink-0 w-full" data-name="Image (비빔밥 세트)">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
                  </div>
                </div>
              </div>
              <div className="absolute bg-white h-[291.013px] left-[15.99px] top-[311px] w-[174.629px]" data-name="MenuCard">
                <div className="absolute content-stretch flex flex-col gap-[5.989px] h-[151.019px] items-start left-0 pt-[11.995px] top-[139.99px] w-[174.629px]" data-name="Container">
                  <TextBackgroundImageAndText text="양식 코너" />
                  <TextBackgroundImageAndText1 text="우동 세트" />
                  <TextBackgroundImageAndText2 text="가쓰오 우동, 유부초밥 2p, 단무지" />
                  <ContainerBackgroundImageAndText text="6,000" />
                </div>
                <div className="absolute content-stretch flex flex-col h-[139.994px] items-start left-0 overflow-clip rounded-[12px] top-0 w-[174.629px]" data-name="Container">
                  <div className="h-[139.994px] relative shrink-0 w-full" data-name="Image (우동 세트)">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
                  </div>
                </div>
              </div>
              <div className="absolute bg-white h-[291.013px] left-[202.62px] top-[311px] w-[174.629px]" data-name="MenuCard">
                <div className="absolute content-stretch flex flex-col gap-[5.989px] h-[151.019px] items-start left-0 pt-[11.995px] top-[139.99px] w-[174.629px]" data-name="Container">
                  <TextBackgroundImageAndText text="한식 코너" />
                  <TextBackgroundImageAndText1 text="닭볶음탕 정식" />
                  <TextBackgroundImageAndText2 text="닭볶음탕, 공기밥, 김치, 계절 반찬 2종" />
                  <ContainerBackgroundImageAndText text="7,500" />
                </div>
                <div className="absolute content-stretch flex flex-col h-[139.994px] items-start left-0 overflow-clip rounded-[12px] top-0 w-[174.629px]" data-name="Container">
                  <div className="h-[139.994px] relative shrink-0 w-full" data-name="Image (닭볶음탕 정식)">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col h-[141.049px] items-start left-0 top-0 w-[393.256px]" data-name="Container">
              <div className="bg-white content-stretch flex flex-col h-[55.077px] items-start pb-[1.108px] relative shrink-0 w-full" data-name="Container">
                <div aria-hidden="true" className="absolute border-[#efefef] border-b-[1.108px] border-solid inset-0 pointer-events-none" />
                <div className="h-[53.969px] overflow-clip relative shrink-0 w-full" data-name="Container">
                  <div className="absolute h-[53.969px] left-[19.99px] top-0 w-[54.107px]" data-name="Button">
                    <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] leading-[24px] left-[27px] not-italic text-[#191a1c] text-[16px] text-center top-[14.2px] tracking-[-0.3px] whitespace-nowrap">구내식당</p>
                    <div className="absolute bg-[#191a1c] h-[2.994px] left-0 rounded-[999px] top-[50.97px] w-[54.107px]" data-name="Text" />
                  </div>
                  <div className="absolute h-[53.969px] left-[98.09px] top-0 w-[40.589px]" data-name="Button">
                    <p className="-translate-x-1/2 absolute font-['Pretendard:Medium',sans-serif] leading-[24px] left-[20px] not-italic text-[#c1c1c1] text-[16px] text-center top-[14.2px] tracking-[-0.3px] whitespace-nowrap">간편식</p>
                  </div>
                </div>
              </div>
              <div className="bg-white h-[85.973px] relative shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] shrink-0 w-full" data-name="Container">
                <div className="content-stretch flex flex-col items-start pt-[11.995px] px-[15.993px] relative size-full">
                  <div className="content-stretch flex h-[57.985px] items-center justify-between pr-[-0.035px] relative shrink-0 w-full" data-name="Container">
                    <ButtonBackgroundImage>
                      <TextBackgroundImageAndText3 text="월" />
                      <TextBackgroundImageAndText4 text="23" additionalClassNames="w-[19.749px]" />
                    </ButtonBackgroundImage>
                    <ButtonBackgroundImage>
                      <TextBackgroundImageAndText3 text="화" />
                      <TextBackgroundImageAndText4 text="24" additionalClassNames="w-[19.732px]" />
                    </ButtonBackgroundImage>
                    <ButtonBackgroundImage>
                      <TextBackgroundImageAndText3 text="수" />
                      <TextBackgroundImageAndText4 text="25" additionalClassNames="w-[19.524px]" />
                    </ButtonBackgroundImage>
                    <div className="bg-white flex-[1_0_0] h-[57.985px] min-h-px min-w-px relative rounded-[12px]" data-name="Button">
                      <div aria-hidden="true" className="absolute border-[#191a1c] border-[2.216px] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)]" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.991px] items-center justify-center pb-[2.216px] pt-[2.233px] px-[2.216px] relative size-full">
                        <div className="h-[16.513px] relative shrink-0 w-[19.005px]" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                            <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] leading-[16.5px] left-[10.5px] not-italic text-[#191a1c] text-[11px] text-center top-[-0.89px] whitespace-nowrap">오늘</p>
                          </div>
                        </div>
                        <BackgroundImage1 additionalClassNames="w-[20.355px]">
                          <p className="-translate-x-1/2 absolute font-['Pretendard:Extra_Bold',sans-serif] leading-[24px] left-[10px] not-italic text-[#191a1c] text-[16px] text-center top-[-0.78px] whitespace-nowrap">26</p>
                        </BackgroundImage1>
                      </div>
                    </div>
                    <ButtonBackgroundImage>
                      <TextBackgroundImageAndText3 text="금" />
                      <BackgroundImage1 additionalClassNames="w-[18.728px]">
                        <p className="-translate-x-1/2 absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[24px] left-[9px] not-italic text-[#191a1c] text-[16px] text-center top-[-0.78px] whitespace-nowrap">27</p>
                      </BackgroundImage1>
                    </ButtonBackgroundImage>
                    <ButtonBackgroundImage>
                      <TextBackgroundImageAndText3 text="토" />
                      <BackgroundImage1 additionalClassNames="w-[19.732px]">
                        <p className="-translate-x-1/2 absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[24px] left-[10px] not-italic text-[#1d8aff] text-[16px] text-center top-[-0.78px] whitespace-nowrap">28</p>
                      </BackgroundImage1>
                    </ButtonBackgroundImage>
                    <ButtonBackgroundImage>
                      <TextBackgroundImageAndText3 text="일" />
                      <BackgroundImage1 additionalClassNames="w-[19.767px]">
                        <p className="-translate-x-1/2 absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[24px] left-[10px] not-italic text-[#ee2b2f] text-[16px] text-center top-[-0.78px] whitespace-nowrap">29</p>
                      </BackgroundImage1>
                    </ButtonBackgroundImage>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-white content-stretch flex h-[53.986px] items-center justify-between left-0 px-[19.992px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] top-0 w-[393.256px]" data-name="Header">
            <div className="h-[27.988px] relative shrink-0 w-[113.217px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9.987px] items-center relative size-full">
                <div className="relative shrink-0 size-[27.988px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="h-[27.988px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                      <div className="absolute inset-[0.01%_0]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.9884 27.9801">
                          <path d={svgPaths.p3e0a2d00} fill="url(#paint0_linear_2484_3777)" id="Vector" />
                          <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2484_3777" x1="13.9942" x2="13.9942" y1="0" y2="27.9801">
                              <stop stopColor="#FF4048" />
                              <stop offset="0.5" stopColor="#ED1B24" />
                              <stop offset="1" stopColor="#FF4048" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="absolute inset-[18.95%_18.42%_18.95%_18.44%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.671 17.3813">
                          <path d={svgPaths.pda51b80} fill="var(--fill-0, white)" id="Vector" />
                        </svg>
                      </div>
                      <div className="absolute inset-[33.64%_33.93%_34.21%_33.95%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.98831 8.99944">
                          <path d={svgPaths.p3619fd00} fill="var(--fill-0, #EE2B2F)" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[27.002px] relative shrink-0 w-[75.241px]" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className="absolute font-['Pretendard:Bold',sans-serif] leading-[27px] left-0 not-italic text-[#191a1c] text-[18px] top-[-0.78px] tracking-[-0.5px] whitespace-nowrap">올리브식권</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[43.999px] relative shrink-0 w-[91.996px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <div className="absolute content-stretch flex items-center justify-center left-0 size-[43.999px] top-0" data-name="Button">
                  <IconBackgroundImage1 additionalClassNames="relative shrink-0">
                    <g clipPath="url(#clip0_2484_3772)" id="Icon">
                      <path d={svgPaths.p3997e500} id="Vector" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.19908" />
                      <path d={svgPaths.p1b4f2a00} id="Vector_2" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.19908" />
                      <path d={svgPaths.pdbe5780} id="Vector_3" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.19908" />
                    </g>
                    <defs>
                      <clipPath id="clip0_2484_3772">
                        <rect fill="white" height="23.99" width="23.99" />
                      </clipPath>
                    </defs>
                  </IconBackgroundImage1>
                </div>
                <div className="absolute left-[48px] size-[43.999px] top-0" data-name="Button">
                  <IconBackgroundImage1 additionalClassNames="absolute left-[10px] top-[10px]">
                    <g clipPath="url(#clip0_2484_3743)" id="Icon">
                      <path d={svgPaths.p37b04400} id="Vector" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.19908" />
                      <path d={svgPaths.p3e3b0c70} id="Vector_2" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.19908" />
                    </g>
                    <defs>
                      <clipPath id="clip0_2484_3743">
                        <rect fill="white" height="23.99" width="23.99" />
                      </clipPath>
                    </defs>
                  </IconBackgroundImage1>
                  <div className="absolute bg-[#ee2b2f] border-[1.108px] border-solid border-white left-[28.01px] rounded-[999px] size-[7.997px] top-[8px]" data-name="Text" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-white border-[#f0f0f0] border-solid border-t-[1.108px] h-[68.093px] left-0 top-[783.78px] w-[393.256px]" data-name="Container">
            <div className="absolute content-stretch flex flex-col gap-[1.99px] h-[46.993px] items-center left-[15.99px] overflow-clip py-[3.998px] top-[8px] w-[120.417px]" data-name="NavBtn">
              <IconBackgroundImage>
                <path d={svgPaths.p1b9dff6c} id="Vector" stroke="var(--stroke-0, #EE2B2F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.01662" />
                <path d={svgPaths.p3bdf300} id="Vector_2" stroke="var(--stroke-0, #EE2B2F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.01662" />
              </IconBackgroundImage>
              <TextBackgroundImage additionalClassNames="h-[15.007px] w-[8.551px]">
                <p className="-translate-x-1/2 absolute font-['Pretendard:Medium',sans-serif] leading-[15px] left-[4px] not-italic text-[#ee2b2f] text-[10px] text-center top-[-0.89px] tracking-[-0.1px] whitespace-nowrap">홈</p>
              </TextBackgroundImage>
            </div>
            <div className="absolute content-stretch flex flex-col gap-[1.99px] h-[46.993px] items-center left-[136.41px] overflow-clip py-[3.998px] top-[8px] w-[120.417px]" data-name="NavBtn">
              <IconBackgroundImage>
                <path d="M13.7497 10.9997H9.16646" id="Vector" stroke="var(--stroke-0, #ADAFBB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.64996" />
                <path d="M13.7497 7.33317H9.16646" id="Vector_2" stroke="var(--stroke-0, #ADAFBB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.64996" />
                <path d={svgPaths.p36c37680} id="Vector_3" stroke="var(--stroke-0, #ADAFBB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.64996" />
                <path d={svgPaths.p36ee5a40} id="Vector_4" stroke="var(--stroke-0, #ADAFBB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.64996" />
              </IconBackgroundImage>
              <TextBackgroundImage additionalClassNames="h-[15.007px] w-[34.15px]">
                <p className="-translate-x-1/2 absolute font-['Pretendard:Medium',sans-serif] leading-[15px] left-[17.5px] not-italic text-[#adafbb] text-[10px] text-center top-[-0.89px] tracking-[-0.1px] whitespace-nowrap">결제내역</p>
              </TextBackgroundImage>
            </div>
            <div className="absolute content-stretch flex flex-col gap-[1.99px] h-[46.993px] items-center left-[256.83px] overflow-clip py-[3.998px] top-[8px] w-[120.417px]" data-name="NavBtn">
              <IconBackgroundImage>
                <path d={svgPaths.pc26a780} id="Vector" stroke="var(--stroke-0, #ADAFBB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.64996" />
                <path d={svgPaths.p7c28428} id="Vector_2" stroke="var(--stroke-0, #ADAFBB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.64996" />
              </IconBackgroundImage>
              <TextBackgroundImage additionalClassNames="h-[15.007px] w-[41.766px]">
                <p className="-translate-x-1/2 absolute font-['Pretendard:Medium',sans-serif] leading-[15px] left-[21px] not-italic text-[#adafbb] text-[10px] text-center top-[-0.89px] tracking-[-0.1px] whitespace-nowrap">My 올리브</p>
              </TextBackgroundImage>
            </div>
          </div>
          <div className="absolute bg-[#ee2b2f] h-[44.986px] left-[262.51px] rounded-[999px] shadow-[0px_4px_16px_0px_rgba(238,43,47,0.4)] top-[724.89px] w-[110.759px]" data-name="Button">
            <div className="absolute content-stretch flex flex-col h-[16.997px] items-start left-[19.99px] top-[13.99px] w-[19.992px]" data-name="Container">
              <div className="h-[16.997px] overflow-clip relative shrink-0 w-full" data-name="QrIcon">
                <div className="absolute contents inset-[0.99%_0]" data-name="Group">
                  <div className="absolute inset-[0.99%_8.68%_63.18%_63.01%]" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.65826 6.08917">
                      <path d={svgPaths.p1368cc00} fill="var(--fill-0, white)" id="Vector" />
                    </svg>
                  </div>
                  <div className="absolute inset-[0.99%_63.37%_63.18%_8.33%]" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.65802 6.08917">
                      <path d={svgPaths.p26e9ca00} fill="var(--fill-0, white)" id="Vector" />
                    </svg>
                  </div>
                  <div className="absolute inset-[58.7%_9.11%_0.99%_62.59%]" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.65807 6.8503">
                      <path d={svgPaths.p1aef200} fill="var(--fill-0, white)" id="Vector" />
                    </svg>
                  </div>
                  <div className="absolute inset-[58.7%_63.37%_0.99%_8.33%]" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.65803 6.85028">
                      <path d={svgPaths.p24867c80} fill="var(--fill-0, white)" id="Vector" />
                    </svg>
                  </div>
                  <GroupVectorBackgroundImage additionalClassNames="inset-[22.88%_53.16%_56.97%_27.97%]">
                    <path d={svgPaths.pb634100} fill="var(--fill-0, white)" id="Vector" />
                  </GroupVectorBackgroundImage>
                  <GroupVectorBackgroundImage1 additionalClassNames="inset-[22.88%_28.63%_56.97%_52.5%]">
                    <path d={svgPaths.p18bea800} fill="var(--fill-0, white)" id="Vector" />
                  </GroupVectorBackgroundImage1>
                  <GroupVectorBackgroundImage additionalClassNames="inset-[56.47%_53.16%_23.38%_27.97%]">
                    <path d={svgPaths.p1fccca00} fill="var(--fill-0, white)" id="Vector" />
                  </GroupVectorBackgroundImage>
                  <GroupVectorBackgroundImage1 additionalClassNames="inset-[56.47%_28.63%_23.38%_52.5%]">
                    <path d={svgPaths.p9bcef80} fill="var(--fill-0, white)" id="Vector" />
                  </GroupVectorBackgroundImage1>
                  <div className="absolute inset-[51.99%_0_40.18%_0]" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9917 1.332">
                      <path d={svgPaths.p1ec07400} fill="var(--fill-0, white)" fillOpacity="0.6" id="Vector" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] leading-[21px] left-[69.48px] not-italic text-[14px] text-center text-white top-[11.1px] tracking-[-0.2px] whitespace-nowrap">QR결제</p>
          </div>
          <div className="absolute bg-[#f2f2f2] h-[851.87px] left-0 top-0 w-[393.256px]" data-name="QrPaymentPage">
            <div className="absolute h-[711.911px] left-0 overflow-clip top-[53.99px] w-[393.256px]" data-name="Container">
              <div className="absolute h-[100.997px] left-[15.99px] overflow-clip rounded-[12px] top-[19.99px] w-[361.269px]" data-name="Container">
                <div className="absolute h-[100.997px] left-0 top-0 w-[361.269px]" data-name="Image (event banner)">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageEventBanner} />
                </div>
                <div className="absolute h-[100.997px] left-0 top-0 w-[361.269px]" data-name="Container">
                  <div className="absolute h-[16.513px] left-[30px] top-[14.5px] w-[211.289px]" data-name="Paragraph">
                    <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[11px] text-white top-[-0.89px] whitespace-nowrap">OPEN EVENT</p>
                  </div>
                  <div className="absolute h-[19.49px] left-[30px] top-[35.02px] w-[211.289px]" data-name="Paragraph">
                    <p className="absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[19.5px] left-0 not-italic text-[13px] text-white top-[-0.89px] tracking-[-0.4px] whitespace-nowrap">올리브식권 만족도 설문</p>
                  </div>
                  <ParagraphBackgroundImageAndText text="먹고싶은 메뉴" additionalClassNames="left-[30px] top-[56.5px] w-[211.289px]" />
                </div>
              </div>
              <div className="absolute bg-white content-stretch flex flex-col gap-[19.992px] h-[274.448px] items-center left-[15.99px] pb-[31.987px] pt-[39.983px] rounded-[12px] shadow-[0px_0px_10px_0px_rgba(234,234,234,0.7)] top-[136.98px] w-[361.269px]" data-name="Container">
                <BackgroundImage2 additionalClassNames="size-[159.985px]">
                  <div className="relative shrink-0 size-[149.998px]" data-name="QrCodeSvg">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 149.998 149.998">
                      <g clipPath="url(#clip0_2484_3348)" id="QrCodeSvg">
                        <path d={svgPaths.p31c2fd00} fill="var(--fill-0, white)" id="Vector" />
                        <path d={svgPaths.p2a2c0e00} fill="var(--fill-0, #191A1C)" id="Vector_2" />
                        <path d={svgPaths.p128161f0} fill="var(--fill-0, #191A1C)" id="Vector_3" />
                        <path d={svgPaths.p2e63680} fill="var(--fill-0, #191A1C)" id="Vector_4" />
                        <path d={svgPaths.pabe3100} fill="var(--fill-0, #191A1C)" id="Vector_5" />
                        <path d={svgPaths.p20ea2300} fill="var(--fill-0, #191A1C)" id="Vector_6" />
                        <path d={svgPaths.p284d0880} fill="var(--fill-0, #191A1C)" id="Vector_7" />
                        <path d={svgPaths.pc7ee200} fill="var(--fill-0, #191A1C)" id="Vector_8" />
                        <path d={svgPaths.p233d500} fill="var(--fill-0, #191A1C)" id="Vector_9" />
                        <path d={svgPaths.p107b5d80} fill="var(--fill-0, #191A1C)" id="Vector_10" />
                        <path d={svgPaths.p1975d00} fill="var(--fill-0, #191A1C)" id="Vector_11" />
                        <path d={svgPaths.p36a30c20} fill="var(--fill-0, #191A1C)" id="Vector_12" />
                        <path d={svgPaths.p2a919580} fill="var(--fill-0, #191A1C)" id="Vector_13" />
                        <path d={svgPaths.p10ca1700} fill="var(--fill-0, #191A1C)" id="Vector_14" />
                        <path d={svgPaths.p29cae100} fill="var(--fill-0, #191A1C)" id="Vector_15" />
                        <path d={svgPaths.p50e86f0} fill="var(--fill-0, #191A1C)" id="Vector_16" />
                        <path d={svgPaths.p2457ae80} fill="var(--fill-0, #191A1C)" id="Vector_17" />
                        <path d={svgPaths.p1e745500} fill="var(--fill-0, #191A1C)" id="Vector_18" />
                        <path d={svgPaths.p2b6d8480} fill="var(--fill-0, #191A1C)" id="Vector_19" />
                        <path d={svgPaths.pbc76b00} fill="var(--fill-0, #191A1C)" id="Vector_20" />
                        <path d={svgPaths.p25744700} fill="var(--fill-0, #191A1C)" id="Vector_21" />
                        <path d={svgPaths.p21b87f0} fill="var(--fill-0, #191A1C)" id="Vector_22" />
                        <path d={svgPaths.paebcc80} fill="var(--fill-0, #191A1C)" id="Vector_23" />
                        <path d={svgPaths.p34fafd40} fill="var(--fill-0, #191A1C)" id="Vector_24" />
                        <path d={svgPaths.p110e3e30} fill="var(--fill-0, #191A1C)" id="Vector_25" />
                        <path d={svgPaths.pf4d0d00} fill="var(--fill-0, #191A1C)" id="Vector_26" />
                        <path d={svgPaths.p216e0400} fill="var(--fill-0, #191A1C)" id="Vector_27" />
                        <path d={svgPaths.p2096000} fill="var(--fill-0, #191A1C)" id="Vector_28" />
                        <path d={svgPaths.p2a3bda80} fill="var(--fill-0, #191A1C)" id="Vector_29" />
                        <path d={svgPaths.pa56c700} fill="var(--fill-0, #191A1C)" id="Vector_30" />
                        <path d={svgPaths.p8310200} fill="var(--fill-0, #191A1C)" id="Vector_31" />
                        <path d={svgPaths.p12582000} fill="var(--fill-0, #191A1C)" id="Vector_32" />
                        <path d={svgPaths.p21dc4900} fill="var(--fill-0, #191A1C)" id="Vector_33" />
                        <path d={svgPaths.p27534500} fill="var(--fill-0, #191A1C)" id="Vector_34" />
                        <path d={svgPaths.p2e8bb500} fill="var(--fill-0, #191A1C)" id="Vector_35" />
                        <path d={svgPaths.p33825280} fill="var(--fill-0, #191A1C)" id="Vector_36" />
                        <path d={svgPaths.p31e32480} fill="var(--fill-0, #191A1C)" id="Vector_37" />
                        <path d={svgPaths.p750db00} fill="var(--fill-0, #191A1C)" id="Vector_38" />
                        <path d={svgPaths.p191bdd70} fill="var(--fill-0, #191A1C)" id="Vector_39" />
                        <path d={svgPaths.p36f09540} fill="var(--fill-0, #191A1C)" id="Vector_40" />
                        <path d={svgPaths.p3c0db680} fill="var(--fill-0, #191A1C)" id="Vector_41" />
                        <path d={svgPaths.p126eba00} fill="var(--fill-0, #191A1C)" id="Vector_42" />
                        <path d={svgPaths.p1f5c5d80} fill="var(--fill-0, #191A1C)" id="Vector_43" />
                        <path d={svgPaths.p17654380} fill="var(--fill-0, #191A1C)" id="Vector_44" />
                        <path d={svgPaths.pf19ee80} fill="var(--fill-0, #191A1C)" id="Vector_45" />
                        <path d={svgPaths.p7ae7040} fill="var(--fill-0, #191A1C)" id="Vector_46" />
                        <path d={svgPaths.p32b1b980} fill="var(--fill-0, #191A1C)" id="Vector_47" />
                        <path d={svgPaths.p37019d80} fill="var(--fill-0, #191A1C)" id="Vector_48" />
                        <path d={svgPaths.pbb98000} fill="var(--fill-0, #191A1C)" id="Vector_49" />
                        <path d={svgPaths.p359da00} fill="var(--fill-0, #191A1C)" id="Vector_50" />
                        <path d={svgPaths.p11c02000} fill="var(--fill-0, #191A1C)" id="Vector_51" />
                        <path d={svgPaths.p28811780} fill="var(--fill-0, #191A1C)" id="Vector_52" />
                        <path d={svgPaths.p34322f00} fill="var(--fill-0, #191A1C)" id="Vector_53" />
                        <path d={svgPaths.p387e2700} fill="var(--fill-0, #191A1C)" id="Vector_54" />
                        <path d={svgPaths.p26668110} fill="var(--fill-0, #191A1C)" id="Vector_55" />
                        <path d={svgPaths.p2b2e2d80} fill="var(--fill-0, #191A1C)" id="Vector_56" />
                        <path d={svgPaths.p728b580} fill="var(--fill-0, #191A1C)" id="Vector_57" />
                        <path d={svgPaths.p3fb87900} fill="var(--fill-0, #191A1C)" id="Vector_58" />
                        <path d={svgPaths.p22b8f880} fill="var(--fill-0, #191A1C)" id="Vector_59" />
                        <path d={svgPaths.p367c9f0} fill="var(--fill-0, #191A1C)" id="Vector_60" />
                        <path d={svgPaths.p1a714600} fill="var(--fill-0, #191A1C)" id="Vector_61" />
                        <path d={svgPaths.p2a5f9300} fill="var(--fill-0, #191A1C)" id="Vector_62" />
                        <path d={svgPaths.p858180} fill="var(--fill-0, #191A1C)" id="Vector_63" />
                        <path d={svgPaths.p393fe700} fill="var(--fill-0, #191A1C)" id="Vector_64" />
                        <path d={svgPaths.p6f92300} fill="var(--fill-0, #191A1C)" id="Vector_65" />
                        <path d={svgPaths.p24acc100} fill="var(--fill-0, #191A1C)" id="Vector_66" />
                        <path d={svgPaths.p391a7b00} fill="var(--fill-0, #191A1C)" id="Vector_67" />
                        <path d={svgPaths.p6707e00} fill="var(--fill-0, #191A1C)" id="Vector_68" />
                        <path d={svgPaths.p14d08380} fill="var(--fill-0, #191A1C)" id="Vector_69" />
                        <path d={svgPaths.p29135d00} fill="var(--fill-0, #191A1C)" id="Vector_70" />
                        <path d={svgPaths.p26f40b00} fill="var(--fill-0, #191A1C)" id="Vector_71" />
                        <path d={svgPaths.p23908e80} fill="var(--fill-0, #191A1C)" id="Vector_72" />
                        <path d={svgPaths.p3a932e00} fill="var(--fill-0, #191A1C)" id="Vector_73" />
                        <path d={svgPaths.p2a9b8300} fill="var(--fill-0, #191A1C)" id="Vector_74" />
                        <path d={svgPaths.p35ef6080} fill="var(--fill-0, #191A1C)" id="Vector_75" />
                        <path d={svgPaths.p23bfa880} fill="var(--fill-0, #191A1C)" id="Vector_76" />
                        <path d={svgPaths.p2db75480} fill="var(--fill-0, #191A1C)" id="Vector_77" />
                        <path d={svgPaths.p3c586f00} fill="var(--fill-0, #191A1C)" id="Vector_78" />
                        <path d={svgPaths.pd3ee00} fill="var(--fill-0, #191A1C)" id="Vector_79" />
                        <path d={svgPaths.p2a9b7200} fill="var(--fill-0, #191A1C)" id="Vector_80" />
                        <path d={svgPaths.p11ea4400} fill="var(--fill-0, #191A1C)" id="Vector_81" />
                        <path d={svgPaths.p24973700} fill="var(--fill-0, #191A1C)" id="Vector_82" />
                        <path d={svgPaths.p3bfd290} fill="var(--fill-0, #191A1C)" id="Vector_83" />
                        <path d={svgPaths.p37816e00} fill="var(--fill-0, #191A1C)" id="Vector_84" />
                        <path d={svgPaths.pf75ab00} fill="var(--fill-0, #191A1C)" id="Vector_85" />
                        <path d={svgPaths.pc12da00} fill="var(--fill-0, #191A1C)" id="Vector_86" />
                        <path d={svgPaths.p62ab4f0} fill="var(--fill-0, #191A1C)" id="Vector_87" />
                        <path d={svgPaths.p35bb2a00} fill="var(--fill-0, #191A1C)" id="Vector_88" />
                        <path d={svgPaths.p1cc5e480} fill="var(--fill-0, #191A1C)" id="Vector_89" />
                        <path d={svgPaths.p1a144980} fill="var(--fill-0, #191A1C)" id="Vector_90" />
                        <path d={svgPaths.p3232100} fill="var(--fill-0, #191A1C)" id="Vector_91" />
                        <path d={svgPaths.p31ce3370} fill="var(--fill-0, #191A1C)" id="Vector_92" />
                        <path d={svgPaths.p310c3e00} fill="var(--fill-0, #191A1C)" id="Vector_93" />
                        <path d={svgPaths.p3eee4f00} fill="var(--fill-0, #191A1C)" id="Vector_94" />
                        <path d={svgPaths.p131bb100} fill="var(--fill-0, #191A1C)" id="Vector_95" />
                        <path d={svgPaths.p2ba6b380} fill="var(--fill-0, #191A1C)" id="Vector_96" />
                        <path d={svgPaths.p26081100} fill="var(--fill-0, #191A1C)" id="Vector_97" />
                        <path d={svgPaths.p31dcbc00} fill="var(--fill-0, #191A1C)" id="Vector_98" />
                        <path d={svgPaths.p69ab880} fill="var(--fill-0, #191A1C)" id="Vector_99" />
                        <path d={svgPaths.p3a590900} fill="var(--fill-0, #191A1C)" id="Vector_100" />
                        <path d={svgPaths.p183452f0} fill="var(--fill-0, #191A1C)" id="Vector_101" />
                        <path d={svgPaths.p15389670} fill="var(--fill-0, #191A1C)" id="Vector_102" />
                        <path d={svgPaths.pe54fe00} fill="var(--fill-0, #191A1C)" id="Vector_103" />
                        <path d={svgPaths.p3e51c500} fill="var(--fill-0, #191A1C)" id="Vector_104" />
                        <path d={svgPaths.pc100770} fill="var(--fill-0, #191A1C)" id="Vector_105" />
                        <path d={svgPaths.p3283e180} fill="var(--fill-0, #191A1C)" id="Vector_106" />
                        <path d={svgPaths.pd4f6000} fill="var(--fill-0, #191A1C)" id="Vector_107" />
                        <path d={svgPaths.p3448c800} fill="var(--fill-0, #191A1C)" id="Vector_108" />
                        <path d={svgPaths.p13296600} fill="var(--fill-0, #191A1C)" id="Vector_109" />
                        <path d={svgPaths.p2bce3480} fill="var(--fill-0, #191A1C)" id="Vector_110" />
                        <path d={svgPaths.p1573ba00} fill="var(--fill-0, #191A1C)" id="Vector_111" />
                        <path d={svgPaths.p1d4ead00} fill="var(--fill-0, #191A1C)" id="Vector_112" />
                        <path d={svgPaths.p39f42670} fill="var(--fill-0, #191A1C)" id="Vector_113" />
                        <path d={svgPaths.p7d41f00} fill="var(--fill-0, #191A1C)" id="Vector_114" />
                        <path d={svgPaths.p2b350100} fill="var(--fill-0, #191A1C)" id="Vector_115" />
                        <path d={svgPaths.p29468400} fill="var(--fill-0, #191A1C)" id="Vector_116" />
                        <path d={svgPaths.p395ffa00} fill="var(--fill-0, #191A1C)" id="Vector_117" />
                        <path d={svgPaths.p306ef500} fill="var(--fill-0, #191A1C)" id="Vector_118" />
                        <path d={svgPaths.p3be3c300} fill="var(--fill-0, #191A1C)" id="Vector_119" />
                        <path d={svgPaths.p2b261d00} fill="var(--fill-0, #191A1C)" id="Vector_120" />
                        <path d={svgPaths.p1c8a4c00} fill="var(--fill-0, #191A1C)" id="Vector_121" />
                        <path d={svgPaths.p966c900} fill="var(--fill-0, #191A1C)" id="Vector_122" />
                        <path d={svgPaths.p5d5600} fill="var(--fill-0, #191A1C)" id="Vector_123" />
                        <path d={svgPaths.p26972d00} fill="var(--fill-0, #191A1C)" id="Vector_124" />
                        <path d={svgPaths.p3bb20e00} fill="var(--fill-0, #191A1C)" id="Vector_125" />
                        <path d={svgPaths.p21584770} fill="var(--fill-0, #191A1C)" id="Vector_126" />
                        <path d={svgPaths.p15702380} fill="var(--fill-0, #191A1C)" id="Vector_127" />
                        <path d={svgPaths.pced99f0} fill="var(--fill-0, #191A1C)" id="Vector_128" />
                        <path d={svgPaths.p297ed000} fill="var(--fill-0, #191A1C)" id="Vector_129" />
                        <path d={svgPaths.p36304b00} fill="var(--fill-0, #191A1C)" id="Vector_130" />
                        <path d={svgPaths.p1a3c7100} fill="var(--fill-0, #191A1C)" id="Vector_131" />
                        <path d={svgPaths.p1efe7100} fill="var(--fill-0, #191A1C)" id="Vector_132" />
                        <path d={svgPaths.p188fc00} fill="var(--fill-0, #191A1C)" id="Vector_133" />
                        <path d={svgPaths.p331d1e70} fill="var(--fill-0, #191A1C)" id="Vector_134" />
                        <path d={svgPaths.p181c2880} fill="var(--fill-0, #191A1C)" id="Vector_135" />
                        <path d={svgPaths.p37142400} fill="var(--fill-0, #191A1C)" id="Vector_136" />
                        <path d={svgPaths.p3f8cb200} fill="var(--fill-0, #191A1C)" id="Vector_137" />
                        <path d={svgPaths.pccfc710} fill="var(--fill-0, #191A1C)" id="Vector_138" />
                        <path d={svgPaths.p1221280} fill="var(--fill-0, #191A1C)" id="Vector_139" />
                        <path d={svgPaths.p255c3000} fill="var(--fill-0, #191A1C)" id="Vector_140" />
                        <path d={svgPaths.p147de380} fill="var(--fill-0, #191A1C)" id="Vector_141" />
                        <path d={svgPaths.p3ed8ad00} fill="var(--fill-0, #191A1C)" id="Vector_142" />
                        <path d={svgPaths.p3abff100} fill="var(--fill-0, #191A1C)" id="Vector_143" />
                        <path d={svgPaths.pdcebd00} fill="var(--fill-0, #191A1C)" id="Vector_144" />
                        <path d={svgPaths.pe74ee00} fill="var(--fill-0, #191A1C)" id="Vector_145" />
                        <path d={svgPaths.p88c5100} fill="var(--fill-0, #191A1C)" id="Vector_146" />
                        <path d={svgPaths.p1422f140} fill="var(--fill-0, #191A1C)" id="Vector_147" />
                        <path d={svgPaths.p321e5700} fill="var(--fill-0, #191A1C)" id="Vector_148" />
                        <path d={svgPaths.p20826a80} fill="var(--fill-0, #191A1C)" id="Vector_149" />
                        <path d={svgPaths.p387fc8e0} fill="var(--fill-0, #191A1C)" id="Vector_150" />
                        <path d={svgPaths.pc966800} fill="var(--fill-0, #191A1C)" id="Vector_151" />
                        <path d={svgPaths.p17e03900} fill="var(--fill-0, #191A1C)" id="Vector_152" />
                        <path d={svgPaths.p4661700} fill="var(--fill-0, #191A1C)" id="Vector_153" />
                        <path d={svgPaths.p23ccf10} fill="var(--fill-0, #191A1C)" id="Vector_154" />
                        <path d={svgPaths.p1f227980} fill="var(--fill-0, #191A1C)" id="Vector_155" />
                        <path d={svgPaths.paf47600} fill="var(--fill-0, #191A1C)" id="Vector_156" />
                        <path d={svgPaths.p35333280} fill="var(--fill-0, #191A1C)" id="Vector_157" />
                        <path d={svgPaths.p2f6cf300} fill="var(--fill-0, #191A1C)" id="Vector_158" />
                        <path d={svgPaths.pbe3fe00} fill="var(--fill-0, #191A1C)" id="Vector_159" />
                        <path d={svgPaths.p26fcbf00} fill="var(--fill-0, #191A1C)" id="Vector_160" />
                        <path d={svgPaths.p3da5a180} fill="var(--fill-0, #191A1C)" id="Vector_161" />
                        <path d={svgPaths.pebf000} fill="var(--fill-0, #191A1C)" id="Vector_162" />
                        <path d={svgPaths.p8b8e410} fill="var(--fill-0, #191A1C)" id="Vector_163" />
                        <path d={svgPaths.p378a9d80} fill="var(--fill-0, #191A1C)" id="Vector_164" />
                        <path d={svgPaths.p299b8100} fill="var(--fill-0, #191A1C)" id="Vector_165" />
                        <path d={svgPaths.p31b90380} fill="var(--fill-0, #191A1C)" id="Vector_166" />
                        <path d={svgPaths.pe85500} fill="var(--fill-0, #191A1C)" id="Vector_167" />
                        <path d={svgPaths.p1709c900} fill="var(--fill-0, #191A1C)" id="Vector_168" />
                        <path d={svgPaths.p2a9d0200} fill="var(--fill-0, #191A1C)" id="Vector_169" />
                        <path d={svgPaths.p1d00b500} fill="var(--fill-0, #191A1C)" id="Vector_170" />
                        <path d={svgPaths.p1f65c2e0} fill="var(--fill-0, #191A1C)" id="Vector_171" />
                        <path d={svgPaths.p3c097300} fill="var(--fill-0, #191A1C)" id="Vector_172" />
                        <path d={svgPaths.p3a9d3500} fill="var(--fill-0, #191A1C)" id="Vector_173" />
                        <path d={svgPaths.p2e4b9e00} fill="var(--fill-0, #191A1C)" id="Vector_174" />
                        <path d={svgPaths.p16081300} fill="var(--fill-0, #191A1C)" id="Vector_175" />
                        <path d={svgPaths.p1abb6700} fill="var(--fill-0, #191A1C)" id="Vector_176" />
                        <path d={svgPaths.p11891240} fill="var(--fill-0, #191A1C)" id="Vector_177" />
                        <path d={svgPaths.p342c8000} fill="var(--fill-0, #191A1C)" id="Vector_178" />
                        <path d={svgPaths.p11673600} fill="var(--fill-0, #191A1C)" id="Vector_179" />
                        <path d={svgPaths.pc8065e0} fill="var(--fill-0, #191A1C)" id="Vector_180" />
                        <path d={svgPaths.p612e280} fill="var(--fill-0, #191A1C)" id="Vector_181" />
                        <path d={svgPaths.p35435100} fill="var(--fill-0, #191A1C)" id="Vector_182" />
                        <path d={svgPaths.p341ed980} fill="var(--fill-0, #191A1C)" id="Vector_183" />
                        <path d={svgPaths.p3a0fb300} fill="var(--fill-0, #191A1C)" id="Vector_184" />
                        <path d={svgPaths.p1e932bf0} fill="var(--fill-0, #191A1C)" id="Vector_185" />
                        <path d={svgPaths.p199b1f00} fill="var(--fill-0, #191A1C)" id="Vector_186" />
                        <path d={svgPaths.p19cdfd80} fill="var(--fill-0, #191A1C)" id="Vector_187" />
                        <path d={svgPaths.p3fb97e1} fill="var(--fill-0, #191A1C)" id="Vector_188" />
                        <path d={svgPaths.p208781e0} fill="var(--fill-0, #191A1C)" id="Vector_189" />
                        <path d={svgPaths.p2904fd80} fill="var(--fill-0, #191A1C)" id="Vector_190" />
                        <path d={svgPaths.p18955680} fill="var(--fill-0, #191A1C)" id="Vector_191" />
                        <path d={svgPaths.p3769f8c0} fill="var(--fill-0, #191A1C)" id="Vector_192" />
                        <path d={svgPaths.p2b432e80} fill="var(--fill-0, #191A1C)" id="Vector_193" />
                        <path d={svgPaths.p1868e600} fill="var(--fill-0, #191A1C)" id="Vector_194" />
                        <path d={svgPaths.p2ab89ec0} fill="var(--fill-0, #191A1C)" id="Vector_195" />
                        <path d={svgPaths.p11546100} fill="var(--fill-0, #191A1C)" id="Vector_196" />
                        <path d={svgPaths.p2b7b7000} fill="var(--fill-0, #191A1C)" id="Vector_197" />
                        <path d={svgPaths.p2178c600} fill="var(--fill-0, #191A1C)" id="Vector_198" />
                        <path d={svgPaths.p13e4e500} fill="var(--fill-0, #191A1C)" id="Vector_199" />
                        <path d={svgPaths.p1575ca00} fill="var(--fill-0, #191A1C)" id="Vector_200" />
                        <path d={svgPaths.p36365100} fill="var(--fill-0, #191A1C)" id="Vector_201" />
                        <path d={svgPaths.p27460300} fill="var(--fill-0, #191A1C)" id="Vector_202" />
                        <path d={svgPaths.p1e5bb4b0} fill="var(--fill-0, #191A1C)" id="Vector_203" />
                        <path d={svgPaths.p1260440} fill="var(--fill-0, #191A1C)" id="Vector_204" />
                        <path d={svgPaths.p185e7900} fill="var(--fill-0, #191A1C)" id="Vector_205" />
                        <path d={svgPaths.p1ebc7900} fill="var(--fill-0, #191A1C)" id="Vector_206" />
                        <path d={svgPaths.p3ea57800} fill="var(--fill-0, #191A1C)" id="Vector_207" />
                        <path d={svgPaths.p33487740} fill="var(--fill-0, #191A1C)" id="Vector_208" />
                        <path d={svgPaths.p3426ad80} fill="var(--fill-0, #191A1C)" id="Vector_209" />
                        <path d={svgPaths.p277a5180} fill="var(--fill-0, #191A1C)" id="Vector_210" />
                        <path d={svgPaths.p1a5c5c80} fill="var(--fill-0, #191A1C)" id="Vector_211" />
                        <path d={svgPaths.p117fb00} fill="var(--fill-0, #191A1C)" id="Vector_212" />
                        <path d={svgPaths.pdb42300} fill="var(--fill-0, #191A1C)" id="Vector_213" />
                        <path d={svgPaths.p23028580} fill="var(--fill-0, #191A1C)" id="Vector_214" />
                        <path d={svgPaths.p394e4400} fill="var(--fill-0, #191A1C)" id="Vector_215" />
                        <path d={svgPaths.pf453af0} fill="var(--fill-0, #191A1C)" id="Vector_216" />
                        <path d={svgPaths.p3303e080} fill="var(--fill-0, #191A1C)" id="Vector_217" />
                        <path d={svgPaths.p17c79390} fill="var(--fill-0, #191A1C)" id="Vector_218" />
                        <path d={svgPaths.p11a5f80} fill="var(--fill-0, #191A1C)" id="Vector_219" />
                        <path d={svgPaths.p715b200} fill="var(--fill-0, #191A1C)" id="Vector_220" />
                        <path d={svgPaths.p24420c80} fill="var(--fill-0, #191A1C)" id="Vector_221" />
                        <path d={svgPaths.p3b0fcb70} fill="var(--fill-0, #191A1C)" id="Vector_222" />
                        <path d={svgPaths.p147a6b80} fill="var(--fill-0, #191A1C)" id="Vector_223" />
                        <path d={svgPaths.p2d489480} fill="var(--fill-0, #191A1C)" id="Vector_224" />
                        <path d={svgPaths.p14326680} fill="var(--fill-0, #191A1C)" id="Vector_225" />
                        <path d={svgPaths.p2990000} fill="var(--fill-0, #191A1C)" id="Vector_226" />
                        <path d={svgPaths.p1bd43a00} fill="var(--fill-0, #191A1C)" id="Vector_227" />
                        <path d={svgPaths.p589b380} fill="var(--fill-0, #191A1C)" id="Vector_228" />
                        <path d={svgPaths.pbcb3380} fill="var(--fill-0, #191A1C)" id="Vector_229" />
                        <path d={svgPaths.p2b78ca80} fill="var(--fill-0, #191A1C)" id="Vector_230" />
                        <path d={svgPaths.p30fd0980} fill="var(--fill-0, #191A1C)" id="Vector_231" />
                        <path d={svgPaths.p23079000} fill="var(--fill-0, #191A1C)" id="Vector_232" />
                        <path d={svgPaths.p39b56540} fill="var(--fill-0, #191A1C)" id="Vector_233" />
                        <path d={svgPaths.p1cf3ea80} fill="var(--fill-0, #191A1C)" id="Vector_234" />
                        <path d={svgPaths.p471f000} fill="var(--fill-0, #191A1C)" id="Vector_235" />
                        <path d={svgPaths.p37a04780} fill="var(--fill-0, #191A1C)" id="Vector_236" />
                        <path d={svgPaths.pdf39b00} fill="var(--fill-0, #191A1C)" id="Vector_237" />
                        <path d={svgPaths.p37f59300} fill="var(--fill-0, #191A1C)" id="Vector_238" />
                        <path d={svgPaths.p293431c0} fill="var(--fill-0, #191A1C)" id="Vector_239" />
                        <path d={svgPaths.p30115200} fill="var(--fill-0, #191A1C)" id="Vector_240" />
                        <path d={svgPaths.p1192a100} fill="var(--fill-0, #191A1C)" id="Vector_241" />
                        <path d={svgPaths.p1135c580} fill="var(--fill-0, #191A1C)" id="Vector_242" />
                        <path d={svgPaths.pf381b00} fill="var(--fill-0, #191A1C)" id="Vector_243" />
                        <path d={svgPaths.p20712800} fill="var(--fill-0, #191A1C)" id="Vector_244" />
                        <path d={svgPaths.p148caf80} fill="var(--fill-0, #191A1C)" id="Vector_245" />
                        <path d={svgPaths.p9142700} fill="var(--fill-0, #191A1C)" id="Vector_246" />
                        <path d={svgPaths.p35259b40} fill="var(--fill-0, #191A1C)" id="Vector_247" />
                        <path d={svgPaths.p2e4747c0} fill="var(--fill-0, #191A1C)" id="Vector_248" />
                        <path d={svgPaths.p967aff2} fill="var(--fill-0, #191A1C)" id="Vector_249" />
                        <path d={svgPaths.p23245580} fill="var(--fill-0, #191A1C)" id="Vector_250" />
                        <path d={svgPaths.p329d0700} fill="var(--fill-0, #191A1C)" id="Vector_251" />
                        <path d={svgPaths.p1f73ce70} fill="var(--fill-0, #191A1C)" id="Vector_252" />
                        <path d={svgPaths.p6531c80} fill="var(--fill-0, #191A1C)" id="Vector_253" />
                        <path d={svgPaths.p241e2100} fill="var(--fill-0, #191A1C)" id="Vector_254" />
                        <path d={svgPaths.p23df8800} fill="var(--fill-0, #191A1C)" id="Vector_255" />
                        <path d={svgPaths.p1d8a4c00} fill="var(--fill-0, #191A1C)" id="Vector_256" />
                        <path d={svgPaths.p24a05270} fill="var(--fill-0, #191A1C)" id="Vector_257" />
                        <path d={svgPaths.p23139d80} fill="var(--fill-0, #191A1C)" id="Vector_258" />
                        <path d={svgPaths.p35500300} fill="var(--fill-0, #191A1C)" id="Vector_259" />
                        <path d={svgPaths.p1e543d00} fill="var(--fill-0, #191A1C)" id="Vector_260" />
                        <path d={svgPaths.p3a726700} fill="var(--fill-0, #191A1C)" id="Vector_261" />
                        <path d={svgPaths.p3923d100} fill="var(--fill-0, #191A1C)" id="Vector_262" />
                        <path d={svgPaths.p201241f0} fill="var(--fill-0, #191A1C)" id="Vector_263" />
                        <path d={svgPaths.p3409ad00} fill="var(--fill-0, #191A1C)" id="Vector_264" />
                        <path d={svgPaths.p1ae03e80} fill="var(--fill-0, #191A1C)" id="Vector_265" />
                        <path d={svgPaths.p1274b980} fill="var(--fill-0, #191A1C)" id="Vector_266" />
                        <path d={svgPaths.pb6aff0} fill="var(--fill-0, #191A1C)" id="Vector_267" />
                        <path d={svgPaths.p1b4c5700} fill="var(--fill-0, #191A1C)" id="Vector_268" />
                        <path d={svgPaths.p14c67a80} fill="var(--fill-0, #191A1C)" id="Vector_269" />
                        <path d={svgPaths.p22709500} fill="var(--fill-0, #191A1C)" id="Vector_270" />
                        <path d={svgPaths.p2f883c00} fill="var(--fill-0, #191A1C)" id="Vector_271" />
                        <path d={svgPaths.p142c8e00} fill="var(--fill-0, #191A1C)" id="Vector_272" />
                        <path d={svgPaths.p23afec00} fill="var(--fill-0, #191A1C)" id="Vector_273" />
                        <path d={svgPaths.p1927d800} fill="var(--fill-0, #191A1C)" id="Vector_274" />
                        <path d={svgPaths.p3fcfbf00} fill="var(--fill-0, #191A1C)" id="Vector_275" />
                        <path d={svgPaths.p118f4f80} fill="var(--fill-0, #191A1C)" id="Vector_276" />
                        <path d={svgPaths.p35cd8c00} fill="var(--fill-0, #191A1C)" id="Vector_277" />
                        <path d={svgPaths.p2b0a4980} fill="var(--fill-0, #191A1C)" id="Vector_278" />
                        <path d={svgPaths.p1d080000} fill="var(--fill-0, #191A1C)" id="Vector_279" />
                        <path d={svgPaths.p289c5a00} fill="var(--fill-0, #191A1C)" id="Vector_280" />
                        <path d={svgPaths.p19b44300} fill="var(--fill-0, #191A1C)" id="Vector_281" />
                        <path d={svgPaths.p3e7f300} fill="var(--fill-0, #191A1C)" id="Vector_282" />
                        <path d={svgPaths.p24986880} fill="var(--fill-0, #191A1C)" id="Vector_283" />
                        <path d={svgPaths.p1b4fdc80} fill="var(--fill-0, #191A1C)" id="Vector_284" />
                        <path d={svgPaths.pfd63440} fill="var(--fill-0, #191A1C)" id="Vector_285" />
                        <path d={svgPaths.p260c9b80} fill="var(--fill-0, #191A1C)" id="Vector_286" />
                        <path d={svgPaths.p22fa6c00} fill="var(--fill-0, #191A1C)" id="Vector_287" />
                        <path d={svgPaths.pfd9c4b2} fill="var(--fill-0, #191A1C)" id="Vector_288" />
                        <path d={svgPaths.p25eea280} fill="var(--fill-0, #191A1C)" id="Vector_289" />
                        <path d={svgPaths.p27e84e00} fill="var(--fill-0, #191A1C)" id="Vector_290" />
                        <path d={svgPaths.pb11dd00} fill="var(--fill-0, #191A1C)" id="Vector_291" />
                        <path d={svgPaths.p1255a480} fill="var(--fill-0, #191A1C)" id="Vector_292" />
                        <path d={svgPaths.p4f6c300} fill="var(--fill-0, #191A1C)" id="Vector_293" />
                        <path d={svgPaths.p22045f80} fill="var(--fill-0, #191A1C)" id="Vector_294" />
                        <path d={svgPaths.p1343fd00} fill="var(--fill-0, #191A1C)" id="Vector_295" />
                        <path d={svgPaths.p3a524700} fill="var(--fill-0, #191A1C)" id="Vector_296" />
                        <path d={svgPaths.p3fac5600} fill="var(--fill-0, #191A1C)" id="Vector_297" />
                        <path d={svgPaths.p43f5480} fill="var(--fill-0, #191A1C)" id="Vector_298" />
                        <path d={svgPaths.p16897700} fill="var(--fill-0, #191A1C)" id="Vector_299" />
                        <path d={svgPaths.p1f740a00} fill="var(--fill-0, #191A1C)" id="Vector_300" />
                        <path d={svgPaths.p10dd180} fill="var(--fill-0, #191A1C)" id="Vector_301" />
                        <path d={svgPaths.pcbff940} fill="var(--fill-0, #191A1C)" id="Vector_302" />
                        <path d={svgPaths.p3f5ab400} fill="var(--fill-0, #191A1C)" id="Vector_303" />
                        <path d={svgPaths.p31fca0c0} fill="var(--fill-0, #191A1C)" id="Vector_304" />
                        <path d={svgPaths.p38d92200} fill="var(--fill-0, #191A1C)" id="Vector_305" />
                        <path d={svgPaths.p30dd5f30} fill="var(--fill-0, #191A1C)" id="Vector_306" />
                        <path d={svgPaths.pb153d80} fill="var(--fill-0, #191A1C)" id="Vector_307" />
                        <path d={svgPaths.p15104b00} fill="var(--fill-0, #191A1C)" id="Vector_308" />
                        <path d={svgPaths.p36df6600} fill="var(--fill-0, #191A1C)" id="Vector_309" />
                        <path d={svgPaths.p17ef4e00} fill="var(--fill-0, #191A1C)" id="Vector_310" />
                        <path d={svgPaths.p2170c740} fill="var(--fill-0, #191A1C)" id="Vector_311" />
                        <path d={svgPaths.p2793c600} fill="var(--fill-0, #191A1C)" id="Vector_312" />
                        <path d={svgPaths.p2834280} fill="var(--fill-0, #191A1C)" id="Vector_313" />
                        <path d={svgPaths.p2aefe000} fill="var(--fill-0, #191A1C)" id="Vector_314" />
                        <path d={svgPaths.p2ff8f380} fill="var(--fill-0, #191A1C)" id="Vector_315" />
                        <path d={svgPaths.p132436f0} fill="var(--fill-0, #191A1C)" id="Vector_316" />
                        <path d={svgPaths.p9c69770} fill="var(--fill-0, #191A1C)" id="Vector_317" />
                        <path d={svgPaths.p2132fbc0} fill="var(--fill-0, #191A1C)" id="Vector_318" />
                        <path d={svgPaths.p2440f400} fill="var(--fill-0, #191A1C)" id="Vector_319" />
                        <path d={svgPaths.pe644300} fill="var(--fill-0, #191A1C)" id="Vector_320" />
                        <path d={svgPaths.p4f2f900} fill="var(--fill-0, #191A1C)" id="Vector_321" />
                        <path d={svgPaths.p1bebd500} fill="var(--fill-0, #191A1C)" id="Vector_322" />
                        <path d={svgPaths.pa1c5af0} fill="var(--fill-0, #191A1C)" id="Vector_323" />
                        <path d={svgPaths.p3f2ddc80} fill="var(--fill-0, #191A1C)" id="Vector_324" />
                        <path d={svgPaths.p1a00abc0} fill="var(--fill-0, #191A1C)" id="Vector_325" />
                        <path d={svgPaths.p1eca7480} fill="var(--fill-0, #191A1C)" id="Vector_326" />
                        <path d={svgPaths.pdaa6900} fill="var(--fill-0, #191A1C)" id="Vector_327" />
                        <path d={svgPaths.p2f61da00} fill="var(--fill-0, #191A1C)" id="Vector_328" />
                        <path d={svgPaths.p2b5c4d80} fill="var(--fill-0, #191A1C)" id="Vector_329" />
                        <path d={svgPaths.p25281fc0} fill="var(--fill-0, #191A1C)" id="Vector_330" />
                        <path d={svgPaths.p1fc61400} fill="var(--fill-0, #191A1C)" id="Vector_331" />
                        <path d={svgPaths.pa5de000} fill="var(--fill-0, #191A1C)" id="Vector_332" />
                        <path d={svgPaths.p1be49040} fill="var(--fill-0, #191A1C)" id="Vector_333" />
                        <path d={svgPaths.p273b5e80} fill="var(--fill-0, #191A1C)" id="Vector_334" />
                        <path d={svgPaths.p3e037a80} fill="var(--fill-0, #191A1C)" id="Vector_335" />
                        <path d={svgPaths.p2800d00} fill="var(--fill-0, #191A1C)" id="Vector_336" />
                        <path d={svgPaths.p7ef3180} fill="var(--fill-0, #191A1C)" id="Vector_337" />
                        <path d={svgPaths.p194ad000} fill="var(--fill-0, #191A1C)" id="Vector_338" />
                        <path d={svgPaths.p269e4600} fill="var(--fill-0, #191A1C)" id="Vector_339" />
                        <path d={svgPaths.p22e79fc0} fill="var(--fill-0, #191A1C)" id="Vector_340" />
                        <path d={svgPaths.p17067200} fill="var(--fill-0, #191A1C)" id="Vector_341" />
                        <path d={svgPaths.p5aecd00} fill="var(--fill-0, #191A1C)" id="Vector_342" />
                        <path d={svgPaths.p7d5d372} fill="var(--fill-0, #191A1C)" id="Vector_343" />
                        <path d={svgPaths.p4907fc0} fill="var(--fill-0, #191A1C)" id="Vector_344" />
                        <path d={svgPaths.p252b4350} fill="var(--fill-0, #191A1C)" id="Vector_345" />
                        <path d={svgPaths.pb716b00} fill="var(--fill-0, #191A1C)" id="Vector_346" />
                        <path d={svgPaths.p1816f500} fill="var(--fill-0, #191A1C)" id="Vector_347" />
                        <path d={svgPaths.p12d8ff10} fill="var(--fill-0, #191A1C)" id="Vector_348" />
                        <path d={svgPaths.p2d190200} fill="var(--fill-0, #191A1C)" id="Vector_349" />
                        <path d={svgPaths.pa62400} fill="var(--fill-0, #191A1C)" id="Vector_350" />
                        <path d={svgPaths.p2de84e00} fill="var(--fill-0, #191A1C)" id="Vector_351" />
                        <path d={svgPaths.p236d2280} fill="var(--fill-0, #191A1C)" id="Vector_352" />
                        <path d={svgPaths.p14f60330} fill="var(--fill-0, #191A1C)" id="Vector_353" />
                        <path d={svgPaths.p2da5a600} fill="var(--fill-0, #191A1C)" id="Vector_354" />
                        <path d={svgPaths.p80f980} fill="var(--fill-0, #191A1C)" id="Vector_355" />
                        <path d={svgPaths.p3a5a2e00} fill="var(--fill-0, #191A1C)" id="Vector_356" />
                        <path d={svgPaths.p2a3fe080} fill="var(--fill-0, #191A1C)" id="Vector_357" />
                        <path d={svgPaths.p368deb00} fill="var(--fill-0, #191A1C)" id="Vector_358" />
                        <path d={svgPaths.p3b9bf780} fill="var(--fill-0, #191A1C)" id="Vector_359" />
                        <path d={svgPaths.p2ae7d570} fill="var(--fill-0, #191A1C)" id="Vector_360" />
                        <path d={svgPaths.p2c885180} fill="var(--fill-0, #191A1C)" id="Vector_361" />
                        <path d={svgPaths.p12d4f600} fill="var(--fill-0, #191A1C)" id="Vector_362" />
                        <path d={svgPaths.p2b513d00} fill="var(--fill-0, #191A1C)" id="Vector_363" />
                        <path d={svgPaths.p3a5ce132} fill="var(--fill-0, #191A1C)" id="Vector_364" />
                        <path d={svgPaths.p266c4700} fill="var(--fill-0, #191A1C)" id="Vector_365" />
                        <path d={svgPaths.p3adb6d00} fill="var(--fill-0, #191A1C)" id="Vector_366" />
                        <path d={svgPaths.p26399c00} fill="var(--fill-0, #191A1C)" id="Vector_367" />
                        <path d={svgPaths.p3ac4f500} fill="var(--fill-0, #191A1C)" id="Vector_368" />
                        <path d={svgPaths.p25047400} fill="var(--fill-0, #191A1C)" id="Vector_369" />
                        <path d={svgPaths.p1de40240} fill="var(--fill-0, #191A1C)" id="Vector_370" />
                        <path d={svgPaths.p1d356500} fill="var(--fill-0, #191A1C)" id="Vector_371" />
                        <path d={svgPaths.p2c3e1600} fill="var(--fill-0, #191A1C)" id="Vector_372" />
                        <path d={svgPaths.p24245bf0} fill="var(--fill-0, #191A1C)" id="Vector_373" />
                        <path d={svgPaths.pa4d7900} fill="var(--fill-0, #191A1C)" id="Vector_374" />
                        <path d={svgPaths.p243b1700} fill="var(--fill-0, #191A1C)" id="Vector_375" />
                        <path d={svgPaths.p1f168980} fill="var(--fill-0, #191A1C)" id="Vector_376" />
                        <path d={svgPaths.p383b800} fill="var(--fill-0, #191A1C)" id="Vector_377" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2484_3348">
                          <rect fill="white" height="149.998" width="149.998" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </BackgroundImage2>
                <div className="h-[22.501px] relative shrink-0 w-[94.783px]" data-name="Paragraph">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] leading-[22.5px] left-[47.5px] not-italic text-[#ee2b2f] text-[15px] text-center top-[0.22px] tracking-[-0.15px] whitespace-nowrap">유효시간 01:40</p>
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col gap-[11.995px] h-[141.984px] items-start left-0 pt-[15.993px] px-[15.993px] top-[411.43px] w-[393.256px]" data-name="Container">
                <div className="bg-white h-[61.464px] relative rounded-[12px] shadow-[0px_0px_10px_0px_rgba(234,234,234,0.7)] shrink-0 w-full" data-name="Container">
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex items-center justify-between px-[19.992px] relative size-full">
                      <div className="h-[22.501px] relative shrink-0 w-[93.277px]" data-name="Text">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[#6e6f70] text-[15px] top-[0.22px] tracking-[-0.13px] whitespace-nowrap">사용가능 포인트</p>
                        </div>
                      </div>
                      <ContainerBackgroundImage additionalClassNames="h-[25.496px] w-[77.717px]">
                        <div className="h-[25.496px] relative shrink-0 w-[57.742px]" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                            <p className="absolute font-['Pretendard:Bold',sans-serif] leading-[25.5px] left-0 not-italic text-[#0a0a0a] text-[17px] top-[-0.78px] tracking-[-0.16px] whitespace-nowrap">58,690</p>
                          </div>
                        </div>
                        <div className="relative shrink-0 size-[13.986px]" data-name="Icon">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9855 13.9855">
                            <g id="Icon">
                              <path d={svgPaths.p3edfae40} id="Vector" stroke="var(--stroke-0, #6E6F70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45682" />
                            </g>
                          </svg>
                        </div>
                      </ContainerBackgroundImage>
                    </div>
                  </div>
                </div>
                <div className="h-[36.539px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute border-[rgba(0,0,0,0)] border-b-[5.539px] border-l-[5.539px] border-r-[5.539px] border-solid h-[5.539px] left-[175.1px] top-0 w-[11.078px]" data-name="Container" />
                  <div className="absolute bg-[#3478f6] content-stretch flex gap-[4.985px] h-[31.987px] items-center justify-center left-[119.85px] rounded-[100px] shadow-[0px_2px_8px_0px_rgba(52,120,246,0.35)] top-[4.55px] w-[121.577px]" data-name="Button">
                    <div className="relative shrink-0 size-[12.999px]" data-name="Icon">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9989 12.9989">
                        <g clipPath="url(#clip0_2484_3342)" id="Icon">
                          <path d={svgPaths.p48ffd80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.29989" />
                          <path d={svgPaths.p13e5b00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.29989" />
                        </g>
                        <defs>
                          <clipPath id="clip0_2484_3342">
                            <rect fill="white" height="12.9989" width="12.9989" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="h-[17.984px] relative shrink-0 w-[75.622px]" data-name="Text">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                        <p className="-translate-x-1/2 absolute font-['Pretendard:Semi_Bold',sans-serif] leading-[18px] left-[38.5px] not-italic text-[12px] text-center text-white top-[-0.89px] tracking-[-0.12px] whitespace-nowrap">QR 결제 후 팝업</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col h-[53.986px] items-start justify-center left-0 pl-[11.995px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] top-0 w-[393.256px]" data-name="Container">
              <div className="h-[29.996px] relative shrink-0 w-[365.268px]" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
                  <ContainerBackgroundImage additionalClassNames="h-[29.996px] w-[66.743px]">
                    <BackgroundImage2 additionalClassNames="size-[29.996px]">
                      <div className="relative shrink-0 size-[25.998px]" data-name="Icon">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.9978 25.9978">
                          <g id="Icon">
                            <path d={svgPaths.p52ca240} id="Vector" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.38313" />
                          </g>
                        </svg>
                      </div>
                    </BackgroundImage2>
                    <TextBackgroundImage additionalClassNames="h-[27.002px] w-[30.758px]">
                      <p className="absolute font-['Pretendard:Bold',sans-serif] leading-[27px] left-0 not-italic text-[#191a1c] text-[18px] top-[-0.78px] tracking-[-0.17px] whitespace-nowrap">결제</p>
                    </TextBackgroundImage>
                  </ContainerBackgroundImage>
                  <div className="relative shrink-0 size-[29.996px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                      <div className="relative shrink-0 size-[19.992px]" data-name="Icon">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9917 19.9917">
                          <g id="Icon">
                            <path d={svgPaths.p266b1300} id="Vector" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83257" />
                            <path d={svgPaths.p34c3c040} id="Vector_2" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83257" />
                            <path d={svgPaths.p3b78c260} id="Vector_3" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83257" />
                            <path d={svgPaths.p332b5200} id="Vector_4" stroke="var(--stroke-0, #191A1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83257" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col h-[85.973px] items-start left-0 pt-[15.993px] px-[15.993px] rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_-1px_8px_0px_rgba(163,163,163,0.6)] top-[765.9px] w-[393.256px]" data-name="Container">
              <div className="bg-[#ee2b2f] h-[49.988px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
                <div className="absolute bg-[rgba(255,255,255,0.3)] content-stretch flex items-center justify-center left-[129.47px] rounded-[6px] size-[19.992px] top-[14.99px]" data-name="Text">
                  <p className="font-['Pretendard:Extra_Bold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[-0.17px] whitespace-nowrap">P</p>
                </div>
                <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] leading-[25.5px] left-[193.95px] not-italic text-[17px] text-center text-white top-[11.45px] tracking-[-0.17px] whitespace-nowrap">포인트 신청</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}