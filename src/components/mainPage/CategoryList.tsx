import type { Post } from "../../types/post";
import EachCategoryCard from "./EachCategoryCard";
interface CategoryListProps {
  categoryPosts?: Post[]; // 카테고리 게시물 배열
}

const CategoryList = ({ categoryPosts }: CategoryListProps) => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="h2 flex">카테고리 목록</h1>
        </div>
        {categoryPosts?.map((post) => (
          <EachCategoryCard post={post} />
        ))}
      </div>
    </>
  );
};

export default CategoryList;
