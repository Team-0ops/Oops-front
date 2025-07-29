import { useState } from "react";
import LeftArrow from "../assets/icons/left-point.svg?react";
import CardFlip from "../pages/CardFlip";
import { useNavigate } from "react-router-dom";

const LuckyDraw = () => {
  const [forceStop, setForceStop] = useState(false);
  const navigate = useNavigate();

  const handleDrawClick = () => {
    setForceStop(true); // 모든 카드 뒷면으로 고정
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button onClick={() => navigate("/")} className="w-[24px] h-[24px] self-start mt-[20px]">
        <LeftArrow />
      </button>
      <div className="flex flex-col items-center">
        <h1 className="text-[24px] font-bold mt-[21px] mb-[12px]">행운 부적 추첨</h1>
        <p className="text-[14px] text-[#4D4D4D]">나에게 행운을 가져다줄 행운 부적을</p>
        <p className="text-[14px] text-[#4D4D4D] mb-[34px]">뽑아보세요!</p>
      </div>

      <div className="grid grid-cols-3 gap-[18px] mb-[65px] justify-items-center">
        {Array.from({ length: 9 }).map((_, idx) => (
          <CardFlip key={idx} index={idx} forceStop={forceStop} />
        ))}
      </div>

      <button
        onClick={handleDrawClick}
        disabled={forceStop}
        className="h-[63px] w-[335px] rounded-[4px] text-[16px] font-semibold mb-[20px] bg-[#B3E378]"
      >
        행운 부적 뽑으러 가기
      </button>
    </div>
  );
};

export default LuckyDraw;
