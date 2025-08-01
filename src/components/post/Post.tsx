import type { PreviousPost } from "../../hooks/usePreviousPosts";

interface PostProps {
  post: PreviousPost
  onClick: (id: number) => void;
}

const Post = ({ post, onClick }: PostProps) => {
  return (
    <li
      key={post.postId}
      className="flex w-full h-[90px] justify-between items-center bg-[#f0e7e0] cursor-pointer px-[14px] py-[10px] rounded-[10px]"
      onClick={() => onClick(post.postId)}
    >
      <div
         className={`flex flex-col justify-between w-full ${post.imageUrls?.[0] ? "pr-[12px]" : ""}`}
      >
        <div className="flex justify-between items-center w-full">
          <span className="body4">{post.title}</span>
          <span className="caption2 text-[#999999] whitespace-nowrap ml-2">
            {post.categoryName}
          </span>
        </div>
        <span className="caption3 text-[#262626] max-w-[calc(100%-60px)] truncate">
          {post.content}
        </span>
      </div>
      {post.imageUrls && (
        <div className="w-[48px] h-[48px] flex-shrink-0 rounded ml-[8px]">
          <img
            src={post.imageUrls[0]}
            alt="preview"
            className="object-cover w-full h-full rounded"
          />
        </div>
      )}
    </li>
  );
};

export default Post;
