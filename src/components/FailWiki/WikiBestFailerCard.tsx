interface FailerCardProps {
  postId: number;
  text: string;
}

const WikiBestFailerCard = (bestFailer: FailerCardProps) => {
  return (
    <div className="caption2 flex w-full h-[34px] px-[38px] items-center text-[#666666] border-b border-[#E9E5E2]">
      <p>{bestFailer.text}</p>
    </div>
  );
};

export default WikiBestFailerCard;
