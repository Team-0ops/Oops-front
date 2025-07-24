import type { OopsPost } from "../../types/OopsList";

interface PostProps {
  post: OopsPost;
  onClick: (id: string) => void;
}

const Post = ({ post, onClick }: PostProps) => {
  return (
    <li
      key={post.id}
      className="flex w-full h-[90px] justify-between items-center bg-[#f0e7e0] cursor-pointer px-[14px] py-[10px] rounded-[10px]"
      onClick={() => onClick(post.id)}
    >
      <div
        className={`flex flex-col justify-between w-full ${post.images?.[0] ? "pr-[12px]" : ""}`}
      >
        <div className="flex justify-between items-center w-full">
          <span className="body4">{post.title}</span>
          <span className="caption2 text-[#999999] whitespace-nowrap ml-2">
            {post.category}
          </span>
        </div>
        <span className="caption3 text-[#262626] max-w-[calc(100%-60px)] truncate">
          {post.content}
        </span>
      </div>
      {post.images?.[0] && (
        <div className="w-[48px] h-[48px] flex-shrink-0 rounded ml-[8px]">
          <img
            src={post.images[0]}
            alt="preview"
            className="object-cover w-full h-full rounded"
          />
        </div>
      )}
    </li>
  );
};

export default Post;
