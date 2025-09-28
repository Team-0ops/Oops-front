import type { Post } from "../../types/post";
import PostCard from "../common/PostCard";
import ToSeeButton from "./ToSeeButton";
interface BestFailerListProps {
  bestPosts: Post[];
}

const BestFailerList = ({ bestPosts }: BestFailerListProps) => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="h2 flex">베스트 Failer</h1>
          <ToSeeButton nav="best-feed" />
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-[16px]">
          {bestPosts?.map((post) => (
            <PostCard
              key={post.postId}
              postId={post.postId}
              title={post.title}
              content={post.content}
              imageUrl={post.image ?? "null"} // null이면 기본 이미지
              likes={post.likes}
              comments={post.comments}
              views={post.views}
              category={post.categoryOrTopicName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestFailerList;
