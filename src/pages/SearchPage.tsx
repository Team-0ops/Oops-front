import { useState } from "react";
import PostCard from "../components/common/PostCard";
import SearchHeader from "../components/SearchPage/SearchHeader";
import SearchInput from "../components/SearchPage/SearchInput";
// import useGetSearchedPostList from "../hooks/SearchPage/useGeSearchedPostList";
import type { ResponseCategoryPostListDTO } from "../types/post";
import { getSearchedPostList } from "../apis/post";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [resultList, setResultList] =
    useState<ResponseCategoryPostListDTO | null>(null);

  const handleEnterSubmit = async (value: string) => {
    setInputValue(value);
    try {
      if (value.trim() !== "") {
        const data = await getSearchedPostList({
          keyword: value,
          page: 0,
          limit: 10,
        });
        setResultList(data);
      }
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  return (
    <>
      <div className="px-[20px] gap-[30px] flex flex-col  bg-[#FFFBF8] min-h-screen">
        <div>
          <SearchHeader />
        </div>

        {/* 검색창 (query state 없이 단순 UI용) */}
        <div>
          <SearchInput onSubmit={handleEnterSubmit} />
        </div>

        {/* 결과 리스트 (PostCard는 미리 구현된 컴포넌트 사용) */}
        <div className="flex flex-col gap-[12px]">
          {inputValue ? (
            <>
              {resultList ? (
                resultList?.result?.posts.map((post) => (
                  <PostCard
                    postId={post.postId}
                    title={post.title}
                    content={post.content}
                    imageUrl={post.image ?? "null"} // null이면 기본 이미지
                    likes={post.likes}
                    comments={post.comments}
                    views={post.views}
                    category={post.categoryName}
                  />
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
