import { useState } from "react";
import type { Comment } from "../../types/Comment";
import Report from "../modals/Report";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

import NoColorReport from "../../assets/icons/NoColorReport.svg?react";
import NoColorLike from "../../assets/icons/gray_heart.svg?react";
import GrayComment from "../../assets/icons/gray_comment.svg?react";
import ColorLike from "../../assets/icons/ColorHeart.svg?react";

import { useDeleteComment } from "../../hooks/PostPage/useDeleteComment";
import { useCommentLikeOptimistic } from "../../hooks/Mutation/useCommentLikeOptimistic";

interface CommentProps {
  comment: Comment;
  postId: number;
  isReply?: boolean;
  onReplySubmit?: (parentId: string, text: string) => void;
}

const CommentItem = ({
  comment,
  postId,
  isReply = false,
  onReplySubmit
}: CommentProps) => {
  //userId 뽑아오기 (내 게시글인지 인식표)
  const userId = useSelector((state: RootState) => state.user.userId);

  const [isReportOpen, setIsReportOpen] = useState(false);

  const { deleteComment, success } = useDeleteComment();

  const [selectedReply, setSelectedReply] = useState<Comment | null>(null);

  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatRelativeTime = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffMs = now.getTime() - createdDate.getTime();

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return "방금 전";
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 4) return `${diffDays}일 전`;

    // 4일 이상이면 날짜로 표시
    return `${createdDate.getMonth() + 1}월 ${createdDate.getDate()}일`;
  };

  const {
    liked,
    likes,
    toggle: toggleCommentLike,
  } = useCommentLikeOptimistic({
    postId,
    commentId: comment.id,           // 문자열/숫자 모두 허용
    initialLiked: comment.liked,
    initialLikes: comment.likes,
    // extraInvalidateKeys: [["feed"]], // 필요 시 목록 캐시도 무효화
  });
  
  // 클릭 핸들러
  const handleLikeClick = () => {
    if (!comment.id) return; // 방어
    toggleCommentLike();
  };

  const handleReplySubmit = async (text: string) => {
    // 부모로 위임 → 옵티미스틱 처리/롤백/치환은 부모 훅이 수행
    if (!text.trim()) return;
    onReplySubmit?.(String(comment.id), text);
    setShowReplyForm(false);
  };

  return (
    <>
      {/* 댓글 본문 */}
      <div className={`flex flex-col ${isReply ? "ml-[34px]" : ""}`}>
        <div className="flex flex-col w-full pl-[34px] pr-[20px] py-[13px] bg-[#fbf3ec] border border-[#f0e7e0]">
          <div className="mb-[4px] flex justify-between items-center">
            <span className="body5 text-[#808080]">
              {Number(userId) === comment.userId ? "나" : comment.userName}
            </span>
            {Number(userId) === comment.userId ? (
              <>
                <button
                  className="caption2 text-[#808080] h-[24px] bg-[#f0e7e0] p-[4px] rounded-[4px]"
                  onClick={() => {
                    deleteComment(Number(postId), Number(comment.id));
                    {
                      if (success) alert("삭제되었습니다.");
                    }
                  }}
                >
                  삭제하기
                </button>
              </>
            ) : (
              <NoColorReport
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={() => setIsReportOpen(true)}
              />
            )}
          </div>

          <div className="flex justify-start">
            <span className="body5 text-[#1d1d1d] break-words w-full">
              {comment.content}
            </span>
          </div>

          <div
            className={`flex items-center mt-[12px] ${isReply ? "" : "mr-[36px]"}`}
          >
            <span className="caption3 text-[#b3b3b3]">
              {formatRelativeTime(comment.createdAt)}
            </span>
            <div className="flex gap-[4px] ml-auto">
              <button
                className="flex items-center bg-none border-none p-0 cursor-pointer"
                onClick={handleLikeClick}
              >
                {liked ? (
                  <ColorLike className="w-[14px] h-[14px]" />
                ) : (
                  <NoColorLike className="w-[14px] h-[14px]" />
                )}
              </button>
              <p
                className={`caption3 ${liked ? "text-[#ff8080]" : "text-[#b3b3b3]"}`}
              >
                {likes > 0 ? likes : "공감"}
              </p>
              {/* 일반 댓글만 대댓글달기 버튼 */}
              {!isReply && (
                <div className="flex justify-center gap-[4px] ml-[18px]">
                  <GrayComment className="w-[14px] h-[14px]" />
                  <button onClick={() => setShowReplyForm(!showReplyForm)}>
                    <p className="caption3 text-[#b3b3b3]">대댓글 달기</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 대댓글 작성 폼 */}
      {showReplyForm && (
        <CommentForm
          comment={comment}
          postId={postId}
          parentId={comment.id}
          onSubmit={handleReplySubmit}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {/* 대댓글 신고 모달 */}
      {selectedReply && (
        <Report
          comment={{
            type: "reComment", // ✅ 대댓글 신고 타입 지정
            id: selectedReply.id,
            author: selectedReply.userName,
            content:
              selectedReply.content.length > 20
                ? selectedReply.content.slice(0, 20) + "..."
                : selectedReply.content,
          }}
          onClose={() => setSelectedReply(null)}
        />
      )}

      {/* 일반 댓글 신고 모달 */}
      {isReportOpen && (
        <Report
          comment={{
            type: "comment",
            id: comment.id,
            author: comment.userName,
            content:
              comment.content.length > 20
                ? comment.content.slice(0, 20) + "..."
                : comment.content,
          }}
          onClose={() => setIsReportOpen(false)}
        />
      )}
    </>
  );
};

export default CommentItem;
