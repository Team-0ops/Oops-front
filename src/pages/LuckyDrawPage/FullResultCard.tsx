import { motion } from "framer-motion";
import CloseBtn from "../../assets/icons/white_close.svg?react";
import type { LuckyCard } from "../../types/lucky";

interface FullResultCardProps {
  onClose: () => void;
  card: LuckyCard & { FrontComponent: React.FC };
  selectedIndex: number;
}

// public 폴더 이미지 index 매핑
const imageFiles = [
  "/octo.jpg",     // 0: 문어
  "/bunny.jpg",    // 1: 토끼
  "/whale.jpg",    // 2: 고래
  "/penguin.jpg",  // 3: 펭귄
  "/cat.png",      // 4: 고양이
  "/puppy.webp",   // 5: 강아지
  "/sloth.jpg",    // 6: 늘보
  "/bear.jpg",     // 7: 곰
  "/croco.png"     // 8: 악어
];

const FullResultCard = ({ onClose, card, selectedIndex }: FullResultCardProps) => {
  const { name, content, FrontComponent } = card;

  const handleDownload = () => {
    const imageUrl = imageFiles[selectedIndex] || "/octo.jpg";
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${name}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-[24px]"
      >
        <div className="mb-[6px] relative left-[150px]">
          <CloseBtn className="w-[16px] h-[16px]" onClick={onClose} />
        </div>

        <h2 className="text-[#FFFBF8] text-[24px] font-bold mb-[12px] text-center">
          {name}
        </h2>

        <p className="text-[#FFFBF8] text-[14px] font-semibold text-center leading-snug mb-[24px]">
          {content}
        </p>

        <div className="w-[250px] h-[353px] mb-[46px] rounded-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden bg-white">
          <FrontComponent />
        </div>

        <button
          onClick={handleDownload}
          className="bg-[#B3E378] text-[16px] font-semibold py-[12px] h-[63px] w-[335px] rounded-[4px]"
        >
          저장하기
        </button>
      </motion.div>
    </>
  );
};

export default FullResultCard;
