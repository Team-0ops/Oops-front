import { useState } from "react";
import LeftArrow from "../../assets/icons/left-point.svg?react";
import CardFlip from "./CardFlip";
import FullResultCard from "./FullResultCard";
import { useNavigate } from "react-router-dom";
import { requestLuckyDraw } from "./luckyDrawApi";

const LuckyDraw = () => {
  const [forceStop, setForceStop] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFullCard, setShowFullCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const navigate = useNavigate();

  const handleDrawClick = async () => {
    setForceStop(true);

    try {
      const result = await requestLuckyDraw();
      const luckyCard = result.result;

      if (!luckyCard) throw new Error("부적 정보 없음");

      const randomIndex = Math.floor(Math.random() * 9);

      setSelectedCard(luckyCard);
      setSelectedIndex(randomIndex);

      setTimeout(() => {
        setShowResult(true);
        setTimeout(() => {
          setShowFullCard(true);
        }, 600);
      }, 500);
    } catch (e: any) {
      console.error("❌ 오류 발생:", e.response?.data || e.message);
      alert("부적 뽑기 실패!");
      setForceStop(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative bg-[#FFFBF8] min-h-screen px-[20px]">
      {showFullCard && (
        <FullResultCard
          onClose={() => setShowFullCard(false)}
          card={selectedCard}
        />
      )}

      <button
        onClick={() => navigate("/")}
        className="w-[24px] h-[24px] self-start mt-[20px] z-30"
      >
        <LeftArrow />
      </button>

      <div className="flex flex-col items-center z-30">
        <h1 className="text-[24px] font-bold mt-[21px] mb-[12px]">행운 부적 추첨</h1>
        <p className="text-[14px] text-[#4D4D4D]">나에게 행운을 가져다줄 행운 부적을</p>
        <p className="text-[14px] text-[#4D4D4D] mb-[34px]">뽑아보세요!</p>
      </div>

      <div className="grid grid-cols-3 gap-[18px] mb-[65px] justify-items-center z-30">
        {Array.from({ length: 9 }).map((_, idx) => (
          <CardFlip
            key={idx}
            index={idx}
            forceStop={forceStop}
            isWinner={showResult && selectedIndex === idx}
          />
        ))}
      </div>

      <button
        onClick={handleDrawClick}
        disabled={forceStop}
        className="h-[63px] w-[335px] rounded-[4px] text-[16px] font-semibold mb-[20px] z-30 bg-[#B3E378] text-black"
      >
        행운 부적 뽑으러 가기
      </button>
    </div>
  );
};

export default LuckyDraw;
