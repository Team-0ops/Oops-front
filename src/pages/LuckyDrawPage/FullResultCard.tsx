import { motion } from "framer-motion";
import Octo from "../../assets/icons/LuckyDrawOcto.svg?react";

interface FullResultCardProps {
  onClose: () => void;
}

const FullResultCard = ({ onClose }: FullResultCardProps) => {
  return (
    <>
      {/* 🔹 dim + blur 처리된 배경 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
        onClick={onClose}
      />

      {/* 🔹 확대되는 카드 및 설명 텍스트 */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-[24px]"
      >
        {/* 제목 */}
        <h2 className="text-[#1D1D1D] text-[24px] font-bold mb-[12px] text-center">
          문어지지마! 부적
        </h2>

        {/* 설명 텍스트 */}
        <p className="text-[#4D4D4D] text-[14px] font-semibold text-center leading-snug mb-[24px]">
          당신이 몇 번을 실패하고 실수하며 넘어져도<br />
          무너지지 않도록 마음가짐을 도와주는 부적이무너!
        </p>

        {/* 카드 이미지 */}
        <div className="w-[250px] h-[353px] mb-[24px] rounded-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden bg-white">
          <Octo className="w-full h-full" />
        </div>

        {/* 저장하기 버튼 */}
        <button
          onClick={onClose}
          className="bg-[#B3E378] text-[16px] font-semibold py-[12px] h-[48px] w-[200px] rounded-[4px]"
        >
          저장하기
        </button>
      </motion.div>
    </>
  );
};

export default FullResultCard;
