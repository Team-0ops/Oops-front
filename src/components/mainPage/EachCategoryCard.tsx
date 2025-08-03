import { categoryMap } from "../../types/common";
import type { Post } from "../../types/post";
import PostCard from "../common/PostCard";
import ToSeeButton from "./ToSeeButton";
interface EachCategoryCardProps {
  post: Post;
}

const EachCategoryCard = ({ post }: EachCategoryCardProps) => {
  const navKey = Object.keys(categoryMap).find(
    (key) => categoryMap[key] === post.categoryName
  );

  return (
    <>
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between itmes-center w-full">
          <div className="flex gap-[6px] items-center">
            <div className="w-[8px] h-[20px] bg-[#B3E378]"></div>
            <span className="body4 text-[#1D1D1D]">{post?.categoryName}</span>
          </div>

          <ToSeeButton
            nav={navKey ? `category-feed/${navKey}` : "category-feed"}
          />
        </div>
        <div className="flex justify-center items-center">
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
        </div>
      </div>
    </>
  );
};

export default EachCategoryCard;
