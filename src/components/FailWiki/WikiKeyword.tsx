interface WikiKeywordProps {
  onSelect: (keyword: string) => void;
}

const WikiKeyword = ({ onSelect }: WikiKeywordProps) => {
  const keywords = [
    "대입",
    "면접",
    "연애",
    "창업",
    "인간관계",
    "이직",
    "자격증",
  ];

  return (
    <div className="flex flex-col gap-[6px]">
      <p className="body4 self-stretch text-[#666]">인기 키워드</p>

      <div className="flex flex-wrap caption3 gap-[11px] text-[#666]">
        {keywords.map((word) => (
          <p
            key={word}
            className="cursor-pointer hover:underline"
            onClick={() => onSelect(word)} // 클릭 시 부모로 전달
          >
            #{word}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WikiKeyword;
