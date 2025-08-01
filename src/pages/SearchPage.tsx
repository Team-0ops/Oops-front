import { useState } from "react";
import PostCard from "../components/common/PostCard";
import SearchHeader from "../components/SearchPage/SearchHeader";
import SearchInput from "../components/SearchPage/SearchInput";
import { dummyPostList } from "../apis/post";
const SearchPage = () => {
  const [keyword, setKeyword] = useState("");

  const filteredPosts =
    keyword.trim() === ""
      ? []
      : dummyPostList.filter((post) =>
          [post.title].some((field) =>
            field.toLowerCase().includes(keyword.toLowerCase())
          )
        );

  return (
    <>
      <div className="px-[20px] gap-[30px] flex flex-col  bg-[#FFFBF8] min-h-screen">
        <div>
          <SearchHeader />
        </div>

        {/* 검색창 (query state 없이 단순 UI용) */}
        <div>
          <SearchInput onChange={(value) => setKeyword(value)} />
        </div>

        {/* 결과 리스트 (PostCard는 미리 구현된 컴포넌트 사용) */}
        <div className="flex flex-col gap-[12px]">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.postId}
                title={post.title}
                content={post.content}
                imageUrl={post.image ?? "null"}
                likes={post.likes}
                comments={post.comments}
                views={post.views}
                category={post.categoryName}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
