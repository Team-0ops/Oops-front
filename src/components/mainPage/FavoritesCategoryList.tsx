import Star from "../../assets/icons/star.svg?react";
import type { Post } from "../../types/post";
import PostCard from "../common/PostCard";
import FeedCard from "./FeedCard";
import ToSeeButton from "./ToSeeButton";

interface FavoritesCategoryListProps {
  favoritesPosts: Post[];
}
const FavoritesCategoryList = ({
  favoritesPosts,
}: FavoritesCategoryListProps) => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-[4px] items-center">
            <Star />
            <h1 className="h2 flex">즐겨찾기한 카테고리</h1>
          </div>
          <ToSeeButton nav="favorite-feed" />
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-[16px]">
          {favoritesPosts?.map((post) => (
            <PostCard
              key={post.postId}
              title={post.title}
              content={post.content}
              imageUrl={post.image ?? "null"} // null이면 기본 이미지
              likes={post.likes}
              comments={post.comments}
              views={post.views}
              category={post.categoryName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesCategoryList;
