import X from "../../assets/icons/X.svg?react";
const SearchHeader = () => {
  return (
    <>
      {/* 상단 헤더 */}
      <div className="w-full relative flex items-center justify-center mt-[27px]">
        {/* 가운데 텍스트 */}
        <h1 className="text-base font-bold">검색</h1>
        {/* 좌측 X 버튼 */}
        <button className="absolute right-0">
          <X />
        </button>
      </div>
    </>
  );
};

export default SearchHeader;
