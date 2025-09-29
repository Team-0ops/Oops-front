import { useState } from "react";
import type { Comment } from "../../types/comment/Comment";
import Report from "../modals/report/Report";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

import NoColorReport from "../../assets/icons/NoColorReport.svg?react";
import NoColorLike from "../../assets/icons/gray_heart.svg?react";
import GrayComment from "../../assets/icons/gray_comment.svg?react";
import ColorLike from "../../assets/icons/ColorHeart.svg?react";

import { useDeleteComment } from "../../hooks/PostPage/DeleteHook/useDeleteComment";
import { useCommentLikeOptimistic } from "../../hooks/Mutation/useCommentLikeOptimistic";

interface CommentProps {
  comment: Comment; // 댓글 데이터
  postId: number; // 댓글이 속한 게시글 id
  isReply?: boolean; // 대댓글 여부
  onReplySubmit?: (parentId: string, text: string) => void; // 대댓글 작성 시 부모로 전달되는 콜백
}

/*
CommentItem 컴포넌트
- 댓글/대댓글 하나를 화면에 표시
- 공감, 삭제, 신고, 대댓글 작성 기능 포함
*/

const CommentItem = ({
  comment,
  postId,
  isReply = false,
  onReplySubmit
}: CommentProps) => {
  // userId 뽑아오기 (내 게시글인지 인식표)
  const userId = useSelector((state: RootState) => state.user.userId);

  // 신고 모달 open 상태
  const [isReportOpen, setIsReportOpen] = useState(false);

  // 댓글 삭제 훅
  const { deleteComment, success } = useDeleteComment();

  // 선택된 대댓글 (신고할 때 활용)
  const [selectedReply, setSelectedReply] = useState<Comment | null>(null);

  // 대댓글 입력창 open 여부
  const [showReplyForm, setShowReplyForm] = useState(false);

  /**
   * 작성 시간을 "방금 전/ N분전/ N시간 전/ 형식으로 변환"
   */
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

  /**
   * 댓글 공감 기능 (optimistic ui 적용)
   * - liked : 내가 공감을 눌렀는지 여부
   * - likes : 총 공감 수
   * - toggle : 공감 상태 토글 (하트 색이 바뀌게 랜더링)
   */
  const {
    liked,
    likes,
    toggle: toggleCommentLike,
  } = useCommentLikeOptimistic({
    postId,
    commentId: comment.id,           // 문자열/숫자 모두 허용
    initialLiked: comment.liked,
    initialLikes: comment.likes,
  });
  
  // 클릭 핸들러 (공감 버튼)
  const handleLikeClick = () => {
    if (!comment.id) return; // 방어
    toggleCommentLike();
  };

  // 대댓글 작성 완료 시 부모 컴포넌트로 전달
  const handleReplySubmit = async (text: string) => {
    // 부모로 위임 → 옵티미스틱 처리/롤백/치환은 부모 훅이 수행
    if (!text.trim()) return;
    onReplySubmit?.(String(comment.id), text);
    setShowReplyForm(false);
  };

  return (
    <>
      {/* 댓글 본문 isReply가 true라면 들여쓰기 적용 */}
      <div className={`flex flex-col ${isReply ? "ml-[34px]" : ""}`}> 
        <div className="flex flex-col w-full pl-[34px] pr-[20px] py-[13px] bg-[#fbf3ec] border border-[#f0e7e0]">
          <div className="mb-[4px] flex justify-between items-center">
            <span className="body5 text-[#808080]">
              {Number(userId) === comment.userId ? "나" : comment.userName}
            </span>
            {Number(userId) === comment.userId ? (
              // 본인 댓글일 경우 삭제 버튼 랜더링
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
              // 다른 사람 댓글일 경우 신고 버튼 랜더링
              <NoColorReport
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={() => setIsReportOpen(true)}
              />
            )}
          </div>

            {/* 댓글 내용 */}
          <div className="flex justify-start">
            <span className="body5 text-[#1d1d1d] break-words w-full">
              {comment.content}
            </span>
          </div>

            {/* 시간/공감/대댓글 달기 버튼 */}
          <div
            className={`flex items-center mt-[12px] ${isReply ? "" : "mr-[36px]"}`}
          >
            <span className="caption3 text-[#b3b3b3]">
              {formatRelativeTime(comment.createdAt)}
            </span>
            <div className="flex gap-[4px] ml-auto">
              {/* 공감 버튼 */}
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
              {/* 일반 댓글일 때만 대댓글달기 버튼 표시 */}
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
            type: "reComment", // 대댓글 신고 타입 지정
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
