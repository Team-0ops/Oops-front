import { useNavigate } from "react-router-dom";
import X from "../../assets/icons/X.svg?react";
const SearchHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* 상단 헤더 */}
      <div className="w-full relative flex items-center justify-center mt-[27px]">
        {/* 가운데 텍스트 */}
        <p className="h2">검색</p>
        {/* 좌측 X 버튼 */}
        <button
          className="absolute right-0"
          onClick={() => {
            navigate(-1);
          }}
        >
          <X />
        </button>
      </div>
    </>
  );
};

export default SearchHeader;
