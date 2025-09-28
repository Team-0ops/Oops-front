interface WikiCardProps {
  keyword: string;
  aiTip: string;
}
const WikiCategoryCard = ({ keyword, aiTip }: WikiCardProps) => {
  const result = aiTip
    .split(/(?<=[.,?!])\s+/) // .,?! 뒤 공백 기준
    .flatMap((part) => {
      // 2. 길이 제한 적용 (10자로 가정)
      const maxLen = 10;
      if (part.length <= maxLen) return [part.trim()];

      const chunks: string[] = [];
      for (let i = 0; i < part.length; i += maxLen) {
        chunks.push(part.slice(i, i + maxLen).trim());
      }
      return chunks;
    })
    .filter(Boolean) // 빈 문자열 제거
    .slice(0, 3); // 3개만 가져오기

  return (
    <>
      <div
        className="flex flex-col w-[144px] h-[144px] gap-[18px] items-center 
                   pt-[14px] px-[11px] bg-[#B3E378] rounded-[10px]"
      >
        <div className="caption1 text-[#FFF] px-[13px] py-[6px] bg-[#1D1D1D] rounded-[20px]">
          {keyword} 실패 위키
        </div>
        <div className="caption3 text-[#4D4D4D] flex flex-col gap-[10px]">
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
    </>
  );
};

export default WikiCategoryCard;
