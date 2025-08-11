import { useNavigate } from "react-router-dom";
import PostStats from "./PostStats";

interface PostCardProps {
  postId: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  likes: number;
  comments: number;
  views: number;
  category?: string;
}

const PostCard = ({
  postId,
  title,
  content,
  imageUrl,
  likes,
  comments,
  views,
  category,
}: PostCardProps) => {
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_FILE_BASE?.replace(/\/+$/, "") || "";


  const finalImageUrl =
    imageUrl && !/^https?:\/\//.test(imageUrl)
      ? `${baseUrl}/${imageUrl.replace(/^\/+/, "")}`
      : imageUrl || "";



  return (
    <div
      onClick={() => navigate(`/post/${postId}`)}
      className="relative w-full flex px-[12px] py-[10px] bg-[#F0E7E0] rounded-[10px] h-[85px]"
    >
      <div>
        <div className="flex items-center">
          <h3 className="text-[16px] font-semibold mb-[4px] line-clamp-1 pr-[130px]">
            {title}
          </h3>
          {category && (
            <span className="text-[12px] text-[#999999] absolute right-[85px]">
              {category}
            </span>
          )}
        </div>
        <p className="text-[12px] font-regular mb-[10px] line-clamp-1 leading-tight pr-[70px]">
          {content}
        </p>
        <PostStats likes={likes} comments={comments} views={views} />
      </div>
      <div className="flex items-center absolute right-[12px] top-[12.5px]">
        {finalImageUrl && finalImageUrl.trim() !== "" && (
  <img
    src={finalImageUrl}
    alt="post image"
    className="w-[60px] h-[60px] rounded-[4px] object-cover"
    onLoad={() =>
      console.info(`[PostCard] 이미지 로드 성공: ${finalImageUrl}`)
    }
    onError={(e) => {
      console.error(`[PostCard] 이미지 로드 실패: ${finalImageUrl}`);
      (e.currentTarget as HTMLImageElement).style.display = "none";
    }}
  />
)}

      </div>
    </div>
  );
};

export default PostCard;
