import ReportIcon from "../assets/icons/ReportIcon.svg?react";
import LeftIcon from "../assets/icons/left-point.svg?react";

import { useState } from "react";

const PostDetail = () => {
  const states = ["웁스 중", "극복 중", "극복 완료"];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col bg-[#fffbf8]">
      <div
        className="
            flex justify-start items-center gap-[10px]
            text-[20px] font-[pretendard]
            h-[24px]
            ml-[20px] my-[20px]
            "
      >
        <LeftIcon className="w-[24px] h-[24px]" />
        진로 / 취업 카테고리
      </div>

      <section className=" font-[pretendard] w-full px-[20px]">
        {/* 상태 표시 바 - 가운데만 초록색 */}
        <div
          className="
          relative flex items-center justify-between 
          px-2 mb-4"
        >
          {/* 가운데 점선 라인 */}
          <div
            className="
            absolute top-1/2 left-0 right-0 
            h-[2px] 
            border-dashed border-t-2 border-gray-300 z-0"
          />

          {states.map((state, index) => {
            const position =
              index === 0
                ? "justify-start"
                : index === 1
                ? "justify-center"
                : "justify-end";

            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`flex w-1/3 z-10 ${position}`}
              >
                <button
                  className={`text-sm px-4 py-1 rounded-full font-semibold cursor-pointer transition
                  ${
                    isActive
                      ? "bg-[#B3E378] text-black"
                      : "bg-[#E6E6E6] text-[#A0A0A0]"
                  }`}
                  onClick={() => handleSlide(index)}
                >
                  {state}
                </button>
              </div>
            );
          })}
        </div>

          {/* 본문: 슬라이드 X, 상태에 따라 고정 렌더링 */}
        <div className="mt-6 bg-white p-6 rounded-[10px] shadow text-center text-gray-700">
          {activeIndex === 0 && <div>🟢 웁스 중인 글의 본문입니다.</div>}
          {activeIndex === 1 && <div>🟡 극복 중인 글의 본문입니다.</div>}
          {activeIndex === 2 && <div>🔵 극복 완료한 글의 본문입니다.</div>}
        </div>
        
        {/* 인디케이터 */}
        <div className="flex justify-center gap-2 mt-[18px]">
          {states.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlide(index)}
              className={`w-[8px] h-[8px] rounded-full transition ${
                index === activeIndex ? "bg-[#1d1d1d]" : "bg-[#D9D9D9]"
              }`}
            />
          ))}
        </div>

      </section>
    </div>
  );
};

export default PostDetail;
