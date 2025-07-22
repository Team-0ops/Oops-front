import HeartIcon from "../../assets/icons/majesticons_heart.svg?react";
import CommentIcon from "../../assets/icons/fluent_comment-48-filled.svg?react";
import ViewIcon from "../../assets/icons/iconoir_eye-solid.svg?react";

type PostStatsProps = {
  likes: number;
  comments: number;
  views: number;
};

const PostStats = ({ likes, comments, views }: PostStatsProps) => {
  return (
    <div className="flex items-center gap-[8px] text-[12px] text-[#4D4D4D]">
      <span className="flex items-center gap-[4px]">
        <HeartIcon className="w-[14px] h-[14px]" /> {likes}
      </span>
      <span className="flex items-center gap-[4px]">
        <CommentIcon className="w-[14px] h-[14px]" /> {comments}
      </span>
      <span className="flex items-center gap-[4px]">
        <ViewIcon className="w-[14px] h-[14px]" /> {views}
      </span>
    </div>
  );
};

export default PostStats;
