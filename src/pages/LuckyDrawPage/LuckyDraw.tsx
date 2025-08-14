import { useEffect, useState } from "react";
import LeftArrow from "../../assets/icons/left-point.svg?react";
import CardFlip from "./CardFlip";
import FullResultCard from "./FullResultCard";
import { useNavigate } from "react-router-dom";
import { requestLuckyDraw, getUserProfile } from "../../apis/luckyDrawApi";
import type { LuckyCard } from "../../types/lucky";
import { AxiosError } from "axios";
import type { CustomAxiosError } from "../../types/AxiosError";

import octoImg from "../../assets/icons/LuckyDraw/octo.png";
import bunnyImg from "../../assets/icons/LuckyDraw/bunny.png";
import whaleImg from "../../assets/icons/LuckyDraw/whale.png";
import penguinImg from "../../assets/icons/LuckyDraw/penguin.png"
import catImg from "../../assets/icons/LuckyDraw/cat.png"
import puppyImg from "../../assets/icons/LuckyDraw/puppy.png"
import turtleImg from "../../assets/icons/LuckyDraw/turtle.png"
import bearImg from "../../assets/icons/LuckyDraw/bear.png"
import crocoImg from "../../assets/icons/LuckyDraw/croco.png"

const Octo = () => <img src={octoImg} alt="문어" className="w-full h-full object-contain" />;
const Bunny = () => <img src={bunnyImg} alt="토끼" className="w-full h-full object-contain" />;
const Whale = () => <img src={whaleImg} alt="고래" className="w-full h-full object-contain" />;
const Penguin = () => <img src={penguinImg} alt="펭귄" className="w-full h-full object-contain" />;
const Cat = () => <img src={catImg} alt="고양이" className="w-full h-full object-contain" />;
const Puppy = () => <img src={puppyImg} alt="강아지" className="w-full h-full object-contain" />;
const Turtle = () => <img src={turtleImg} alt="거북이" className="w-full h-full object-contain" />;
const Bear = () => <img src={bearImg} alt="곰" className="w-full h-full object-contain" />;
const Croco = () => <img src={crocoImg} alt="악어" className="w-full h-full object-contain" />;


const LuckyDraw = () => {
  const [forceStop, setForceStop] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFullCard, setShowFullCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<LuckyCard & { FrontComponent: React.FC } | null>(null);
  const [userPoint, setUserPoint] = useState<number>(0);
  const navigate = useNavigate();

  const cardList = [Octo, Bunny, Whale, Penguin, Cat, Puppy , Turtle, Bear, Croco];

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const res = await getUserProfile();
        setUserPoint(res.result.point);
      } catch (e) {
        console.error("포인트 조회 실패", e);
      }
    };
    fetchPoint();
  }, []);

  const getIndexFromName = (name: string): number => {
    if (name.includes("문어")) return 0;
    if (name.includes("토끼")) return 1;
    if (name.includes("고래")) return 2;
    if (name.includes("펭")) return 3;
    if (name.includes("냥")) return 4;
    if (name.includes("강아지") || name.includes("멍")) return 5;
    if (name.includes("꾸준") || name.includes("거북이")) return 6;
    if (name.includes("곰")) return 7;
    if (name.includes("악어") || name.includes("아거")) return 8;
    return 0;
  };

  const handleCloseResult = () => {
    setShowFullCard(false);
    setShowResult(false);
    setForceStop(false);
    setSelectedIndex(null);
    setSelectedCard(null);
  };

  const handleDrawClick = async () => {
    setForceStop(true);

    try {
      const result = await requestLuckyDraw();
      const luckyCard = result.result;
      if (!luckyCard) throw new Error("부적 정보 없음");

      const index = getIndexFromName(luckyCard.name);
      const frontComponent = cardList[index];

      setSelectedCard({ ...luckyCard, FrontComponent: frontComponent });
      setSelectedIndex(index);

      setTimeout(() => {
        setShowResult(true);
        setTimeout(() => {
          setShowFullCard(true);
        }, 1500);
      }, 500);
    } catch (e: unknown) {
      console.error("API 오류:", e);

      if ((e as AxiosError).isAxiosError) {
        const axiosError = e as CustomAxiosError;
        const serverMessage = axiosError.response?.data?.message;
        console.error("오류 발생:", serverMessage || axiosError.message);
      } else if (e instanceof Error) {
        console.error("오류 발생:", e.message);
      } else {
        console.error("알 수 없는 오류", e);
      }

      alert("부적 뽑기 실패!");
      setForceStop(false);
    }
  };

  const isDrawDisabled = userPoint < 150 || forceStop;

  return (
    <div className="w-full flex flex-col items-center relative bg-[#FFFBF8] min-h-screen px-[20px]">
      {showFullCard && selectedCard && selectedIndex !== null && (
        <FullResultCard
          onClose={handleCloseResult}
          card={selectedCard}
          selectedIndex={selectedIndex}
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
        <p className="text-[14px] text-[#4D4D4D] mb-[12px]">뽑아보세요!</p>
      </div>

      <div className="grid grid-cols-3 gap-[18px] mb-[65px] justify-items-center z-30">
        {cardList.map((CardComponent, idx) => (
          <CardFlip
            key={idx}
            index={idx}
            forceStop={forceStop}
            isWinner={showResult && selectedIndex === idx}
            FrontCard={CardComponent}
          />
        ))}
      </div>

      <button
        onClick={handleDrawClick}
        disabled={isDrawDisabled}
        className={`h-[63px] w-[335px] rounded-[4px] text-[16px] font-semibold mb-[20px] z-30
          ${isDrawDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#B3E378] text-black"
          }`}
      >
        {userPoint < 150
          ? "150포인트가 모이면 뽑을 수 있어요!"
          : "행운 부적 뽑으러 가기"}
      </button>
    </div>
  );
};

export default LuckyDraw;
