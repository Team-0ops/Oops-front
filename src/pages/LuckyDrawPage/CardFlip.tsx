import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Verso from "../../assets/icons/luckyDraw1.svg?react";
import Octo from "../../assets/icons/LuckyDrawOcto.svg?react";

interface Props {
  index: number;
  forceStop: boolean;
  isWinner?: boolean;
}

const CardFlip = ({ forceStop, isWinner }: Props) => {
  const [rotateY, setRotateY] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (forceStop) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      setRotateY(isWinner ? 0 : 180);
    }
  }, [forceStop, isWinner]);

  return (
    <motion.div
      animate={{
        rotateY,
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-[78px] h-[110px] relative [transform-style:preserve-3d]"
    >
      <div className="absolute w-full h-full backface-hidden">
        <Octo />
      </div>
      <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden">
        <Verso />
      </div>
    </motion.div>
  );
};

export default CardFlip;
