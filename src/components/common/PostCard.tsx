import { useNavigate } from "react-router-dom";
import PostStats from "./PostStats";
import type React from "react";
//import defaultAvatar from "../../assets/icons/othersprofile.svg";
import { useState } from "react";

interface PostCardProps {
  postId: number;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  views: number;
  category?: string;

  author?: {
    id: string | number;
    name: string;
    avatar?: string | null;
  };
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
  author,
}: PostCardProps) => {
  const navigate = useNavigate();

  // 썸네일/아바타 표시 여부
  const [showThumb, setShowThumb] = useState(Boolean(imageUrl));
  const [showAvatar, setShowAvatar] = useState(Boolean(author?.avatar));

  const goPost = () => navigate(`/post/${postId}`);
  const goAuthor = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 전체 클릭 이벤트와 분리
    if (author?.id !== undefined) {
      navigate(`/users/${author.id}`);
    }
  };
  return (
    <div
      onClick={goPost}
      //onClick={(): void | Promise<void> => navigate(`/post/${postId}`)}
      className=" relative w-full lex px-[12px] py-[10px] bg-[#F0E7E0] rounded-[10px] h-[85px]"
    >
      <div className="w-full">
        {/* 프로필영역 */}
        {author && (
          <div className="mb-[6px] flex items-center gap-2">
            {/* 아바타가 있으면 이미지, 없거나 실패면 회색 플레이스홀더 */}
            {showAvatar && author.avatar ? (
              <img
                src={author.avatar}
                alt="author"
                className="w-6 h-6 rounded-[6px] cursor-pointer object-cover"
                onClick={goAuthor}
                onError={() => setShowAvatar(false)}
              />
            ) : (
              // 세번째 이미지처럼 보이도록 회색 플레이스홀더
              <div
                className="w-6 h-6 rounded-[6px] bg-[#CFCFCF]"
                onClick={goAuthor}
              />
            )}

            <button
              className="text-[12px] font-semibold hover:underline"
              onClick={goAuthor}
            >
              {author.name}
            </button>
          </div>
        )}
        <div>
          <div className="flex items-center">
            <h3 className="text-[16px] font-semibold mb-[4px] line-clamp-1 pr-[130px]">
              {title}
            </h3>
            {/*  카테고리가 있을 때만 출력 */}
            {category && (
              <span className="text-[12px] text-[#999999] absolute right-[85px]">
                {category}
              </span>
            )}
          </div>
          <p className="text-[12px] font-regular mb-[10px] line-clamp-1 leading-tight pr-[70px]">
            {content}
          </p>

          {/* 좋아요 댓글수 조회수 상태 컴포넌트*/}
          <PostStats likes={likes} comments={comments} views={views} />
        </div>
      </div>
      {/* 썸네일 없거나 로드 실패 시 아예 렌더링 안 함 */}
      <div className="flex items-center absolute right-[12px] top-[12.5px]">
        {showThumb && imageUrl ? (
          <img
            src={imageUrl}
            alt="post image"
            className="w-[60px] h-[60px] rounded-[4px] object-cover"
            onError={() => setShowThumb(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PostCard;
