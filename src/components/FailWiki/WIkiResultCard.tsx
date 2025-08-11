interface WikiResultProps {
  keyword: string;
  summary: string | null;
  aiTip: string | null;
}
const WikiResultCard = ({ keyword, summary, aiTip }: WikiResultProps) => {
  const result = (summary ?? aiTip ?? "")
    // 1차: . , 뒤 공백 기준 split
    .split(/(?<=[.,])\s+/)
    .flatMap((part) => {
      // 2차: 길이 제한 적용
      if (part.length <= 25) {
        return part.trim();
      }

      const chunks: string[] = [];
      let start = 0;
      while (start < part.length) {
        chunks.push(part.slice(start, start + 25).trim());
        start += 25;
      }
      return chunks;
    })
    .filter(Boolean); // 빈 문자열 제거

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
              {result.length == 0 ? (
                <>
                  <p>극복 팁을 모으기에</p>
                  <p>아직 {keyword} 관련 실패담이 더 필요해요!</p>
                  <p>실패를 공유하며 다함께 성장해요!</p>
                </>
              ) : (
                result.map((sentence, idx) => <p key={idx}>{sentence}</p>)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WikiResultCard;
