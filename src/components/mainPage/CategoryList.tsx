import type { Post } from "../../types/post";
import EachCategoryCard from "./EachCategoryCard";
interface CategoryListProps {
  categoryPosts?: Post[]; // 카테고리 게시물 배열
}
/*
  카테고리 리스트 컴포넌트
  EachCategoryCard 컴포넌트 사용 -> props로 값 넘겨줌

  map을 통해 list로 넘어온 카테고리 별 Post를 eachCategoryCard 컴포넌트에 하나씩 넘겨줌
*/

const CategoryList = ({ categoryPosts }: CategoryListProps) => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="h2 flex">카테고리 목록</h1>
        </div>
        {categoryPosts?.map((post) => (
          <EachCategoryCard key={post.postId} post={post} />
        ))}
      </div>
    </>
  );
};

export default CategoryList;
