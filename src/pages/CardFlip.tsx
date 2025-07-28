import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Verso from "../assets/icons/luckyDraw1.svg?react";
import Octo from "../assets/icons/LuckyDrawOcto.svg?react";

interface Props {
  index: number;
  forceStop: boolean;
}

const CardFlip = ({ index, forceStop }: Props) => {
  const [rotateY, setRotateY] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // 무작위로 계속 앞뒤 flip
  useEffect(() => {
    const startDelay = Math.random() * 1000;

    const loop = () => {
      setRotateY((prev) => (prev + 180) % 360);
      const nextDelay = Math.random() * 2000 + 800; // 0.8~2.8초
      intervalRef.current = window.setTimeout(loop, nextDelay);
    };

    const startTimeout = window.setTimeout(loop, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  // 정지 요청 시 → 뒷면으로 고정
  useEffect(() => {
    if (forceStop) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      setRotateY(180); // 뒷면 고정
    }
  }, [forceStop]);

  return (
    <motion.div
      animate={{ rotateY }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-[78px] h-[110px] relative [transform-style:preserve-3d]"
    >
      {/* 앞면 */}
      <div className="absolute w-full h-full backface-hidden">
        <Octo />
      </div>
      {/* 뒷면 */}
      <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden">
        <Verso />
      </div>
    </motion.div>
  );
};

export default CardFlip;
