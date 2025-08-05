import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import versoImage from "../../assets/icons/LuckyDraw/verso.jpg";

const Verso = () => (
  <img src={versoImage} alt="카드 뒷면" className="w-full h-full object-cover" />
);

interface Props {
  index: number;
  forceStop: boolean;
  isWinner?: boolean;
  FrontCard: React.FC;
}

const CardFlip = ({ forceStop, isWinner, FrontCard }: Props) => {
  const [rotateY, setRotateY] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // forceStop 상태 변화에 따라 애니메이션 루프 제어
  useEffect(() => {
    if (!forceStop) {
      const startDelay = Math.random() * 1000;

      const loop = () => {
        setRotateY((prev) => (prev + 180) % 360);
        const nextDelay = Math.random() * 2000 + 800;
        intervalRef.current = window.setTimeout(loop, nextDelay);
      };

      const startTimeout = window.setTimeout(loop, startDelay);

      return () => {
        clearTimeout(startTimeout);
        if (intervalRef.current) clearTimeout(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      setRotateY(isWinner ? 0 : 180);
    }
  }, [forceStop, isWinner]);

  return (
    <motion.div
      animate={{ rotateY }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-[78px] h-[110px] relative [transform-style:preserve-3d]"
    >
      <div className="absolute w-full h-full backface-hidden rounded-[4px] overflow-hidden">
        <FrontCard />
      </div>

      <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden rounded-[4px] overflow-hidden">
        <Verso />
      </div>
    </motion.div>
  );
};

export default CardFlip;
