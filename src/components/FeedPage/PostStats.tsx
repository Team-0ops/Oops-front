type PostStatsProps = {
  likes: number;
  comments: number;
  views: number;
};

const PostStats = ({ likes, comments, views }: PostStatsProps) => {
  return (
    <div className="flex items-center gap-[8px] text-[12px] text-[#4D4D4D]">
      <span className="flex items-center gap-[4px]">
        <img src="src/assets/icons/majesticons_heart.svg" alt="likes" /> {likes}
      </span>
      <span className="flex items-center gap-[4px]">
        <img src="src/assets/icons/fluent_comment-48-filled.svg" alt="comments" /> {comments}
      </span>
      <span className="flex items-center gap-[4px]">
        <img src="src/assets/icons/iconoir_eye-solid.svg" alt="views" /> {views}
      </span>
    </div>
  );
};

export default PostStats;

