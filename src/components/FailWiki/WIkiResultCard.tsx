interface WikiResultProps {
  keyword: string;
  summary: string | null;
  aiTip: string | null;
}
const WikiResultCard = ({ keyword, summary, aiTip }: WikiResultProps) => {
  const result = (aiTip ?? summary ?? "")
    .split(/(?<=[.,?!])\s+/) // 문장부호 뒤 공백 기준으로 split
    .map((s) => s.trim()) // 앞뒤 공백 제거
    .filter(Boolean);

  console.log(result);
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col pt-[24px] pb-[18px] items-center gap-[20px] px-[17px] w-full h-[409px] bg-[#B3E378] rounded-[10px]">
          <div className="flex flex-col items-center gap-[12px]">
            <div className="body4 text-[#FFF] px-[13px] py-[6px] bg-[#1D1D1D] rounded-[20px]">
              {keyword} 실패 위키
            </div>
            <div className="caption3 text-[#666] flex justify-center gap-[11px]">
              <p>#혼자만의 시간</p>
              <p>#자유</p>
              <p>#자기계발</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[42px] w-full items-center pt-[28px] rounded-[4px] border border-[#F6EBE6] bg-[#FFFBF8] shadow-[inset_0_0_5px_rgba(0,0,0,0.25)]">
            <div>
              <span className="border-b-2 border-[#B3E378]">극복 팁 요약</span>
            </div>
            <div className="flex flex-col body4 gap-[22px] justify-center itmes-center text-center">
              {result.map((sentence, idx) => (
                <p key={idx}>{sentence}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WikiResultCard;
