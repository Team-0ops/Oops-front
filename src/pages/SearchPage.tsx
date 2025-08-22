import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/common/PostCard";
import SearchHeader from "../components/SearchPage/SearchHeader";
import SearchInput from "../components/SearchPage/SearchInput";
import type { ResponseCategoryPostListDTO } from "../types/post";
import { getSearchedPostList } from "../apis/post";

const SearchPage = () => {
  const location = useLocation();

  const [inputValue, setInputValue] = useState("");
  const [resultList, setResultList] =
    useState<ResponseCategoryPostListDTO | null>(null);

  const lastAutoKeywordRef = useRef<string | null>(null);

  const fetchSearch = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setResultList(null);
      return;
    }
    try {
      const data = await getSearchedPostList({
        keyword: trimmed,
        page: 0,
        limit: 10,
      });
      setResultList(data);
    } catch (error) {
      console.error("검색 실패:", error);
      setResultList(null);
    }
  };

  const handleEnterSubmit = async (value: string) => {
    setInputValue(value);
    await fetchSearch(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = (params.get("keyword") || "").trim();
    if (!keyword) return;

    if (lastAutoKeywordRef.current === keyword) return;
    lastAutoKeywordRef.current = keyword;

    setInputValue(keyword);
    fetchSearch(keyword);
  }, [location.search]);

  return (
    <div className="px-[20px] gap-[30px] flex flex-col bg-[#FFFBF8] min-h-screen">
      <SearchHeader />

      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleEnterSubmit}
      />

      {/* 결과 리스트 */}
      <div className="flex flex-col gap-[12px]">
        {inputValue ? (
          resultList && resultList.result?.posts?.length ? (
            resultList.result.posts.map((post) => (
              <PostCard
                key={post.postId}
                postId={post.postId}
                title={post.title}
                content={post.content}
                imageUrl={post.image ?? "null"}
                likes={post.likes}
                comments={post.comments}
                views={post.views}
                category={post.categoryOrTopicName}
              />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
