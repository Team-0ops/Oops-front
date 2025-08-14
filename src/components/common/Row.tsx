export type Situation = "OOPS" | "OVERCOMING" | "OVERCOME";

const badgeClassBySituation: Record<Situation, string> = {
  OOPS: "body4 bg-[#B3E378] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px]",
  OVERCOMING:
    "body4 bg-[#14441a] text-[#b3e378] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px]",
  OVERCOME:
    "body4 bg-[#1d1d1d] text-[#b3e378] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px] ",
};

export const situationLabel: Record<Situation, string> = {
  OOPS: "웁스 중",
  OVERCOMING: "극복 중",
  OVERCOME: "극복 완",
};

interface RowProps {
  title: string;
  situation: Situation;
  onClick: () => void;
}

export const SituationRow: React.FC<RowProps> = ({
  title,
  situation,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="caption2 h-[34px] text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full pl-[38px] pr-[20px] py-[8px] text-left hover:bg-[#fff5ee] transition-colors"
  >
    <span className="truncate mr-[12px]">{title}</span>
    <span className={badgeClassBySituation[situation]}>
      {situationLabel[situation]}
    </span>
  </button>
);
