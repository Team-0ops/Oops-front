import PostCard from "../components/common/PostCard";
import SearchHeader from "../components/SearchPage/SearchHeader";
import SearchInput from "../components/SearchPage/SearchInput";
const SearchPage = () => {
  return (
    <>
      <div className="px-[20px] gap-[30px] flex flex-col justify-center">
        <div>
          <SearchHeader />
        </div>

        {/* 검색창 (query state 없이 단순 UI용) */}
        <div>
          <SearchInput />
        </div>

        {/* 결과 리스트 (PostCard는 미리 구현된 컴포넌트 사용) */}
        <div className="flex flex-col gap-[12px]">
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
