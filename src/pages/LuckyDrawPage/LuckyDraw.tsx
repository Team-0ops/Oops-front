import { useState, useEffect } from "react";
import LeftArrow from "../../assets/icons/left-point.svg?react";
import CardFlip from "./CardFlip";
import FullResultCard from "./FullResultCard";
import { useNavigate } from "react-router-dom";
import { getUserProfile, requestLuckyDraw } from "./luckyDrawApi";

const LuckyDraw = () => {
  const [forceStop, setForceStop] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFullCard, setShowFullCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [userPoint, setUserPoint] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 포인트 조회 (mock or 실제 구현)
  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const res = await getUserProfile();
        setUserPoint(res.result.point);
      } catch (e) {
        console.error("❌ 포인트 조회 실패:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoint();
  }, []);

  // 뽑기 버튼 클릭 시
  const handleDrawClick = async () => {
    setForceStop(true);

    try {
      const result = await requestLuckyDraw();
      const luckyCard = result.result;

      console.log("🎯 받아온 부적:", luckyCard);

      if (!luckyCard) {
        throw new Error("서버로부터 부적 정보를 받지 못했습니다.");
      }

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
      console.error("❌ 최종 에러:", e.response?.data || e.message);
      alert("부적 뽑기 중 오류 발생!");
      setForceStop(false); // 다시 뽑을 수 있게 풀어줌
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
        disabled={forceStop || (userPoint !== null && userPoint < 150)}
        className={`h-[63px] w-[335px] rounded-[4px] text-[16px] font-semibold mb-[20px] z-30 ${
          userPoint !== null && userPoint < 150
            ? "bg-[#D9D9D9] text-[#999999]"
            : "bg-[#B3E378] text-black"
        }`}
      >
        {isLoading
          ? "로딩 중..."
          : userPoint !== null && userPoint < 150
          ? "150 포인트가 모이면 뽑을 수 있어요!"
          : "행운 부적 뽑으러 가기"}
      </button>
    </div>
  );
};

export default LuckyDraw;
