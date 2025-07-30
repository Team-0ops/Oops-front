import { motion } from "framer-motion";
import Octo from "../../assets/icons/LuckyDrawOcto.svg?react";
import LeftArrow from "../../assets/icons/left-point.svg?react";

const FullResultCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-[100] bg-[#FFFBF8] flex flex-col items-center px-[24px] pt-[48px] pb-[32px]"
    >
      {/* 상단 뒤로가기 버튼 */}
      <button className="self-start mb-[21px]">
        <LeftArrow className="w-[24px] h-[24px]" />
      </button>

      {/* 제목 */}
      <h2 className="text-[#1D1D1D] text-[24px] font-bold mb-[12px]">문어지지마! 부적</h2>

      {/* 설명 텍스트 */}
      <p className="text-[#4D4D4D] text-[14px] text-semibold text-center leading-snug mb-[34px]">
        당신이 몇 번을 실패하고 실수하며 넘어져도<br />
        무너지지 않도록 마음가짐을 도와주는 부적이무너!
      </p>

      {/* 카드 이미지 */}
      <div className="w-[250px] h-[353px] mb-[78px] rounded-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <Octo className="w-full h-full rounded-[4px]" />
      </div>

      {/* 저장하기 버튼 */}
      <button className="bg-[#B3E378] text-[16px] font-semibold py-[12px] h-[63px] w-[335px] rounded-[4px]">
        저장하기
      </button>
    </motion.div>
  );
};

export default FullResultCard;
