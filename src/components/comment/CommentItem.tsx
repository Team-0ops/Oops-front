import { useState } from "react";
import type { Comment } from "../../types/Comment";
import Report from "../modals/Report";
import CommentForm from "./CommentForm";

import NoColorReport from "../../assets/icons/NoColorReport.svg?react";
import NoColorLike from "../../assets/icons/gray_heart.svg?react";
import GrayComment from "../../assets/icons/gray_comment.svg?react";
import ColorLike from "../../assets/icons/ColorHeart.svg?react";

import { submitComment } from "../../hooks/PostPage/useSubmitComment";

interface CommentProps {
  comment: Comment;
  postId: number;
  isReply?: boolean;
}

const CommentItem = ({ comment, postId, isReply = false }: CommentProps) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [selectedReply, setSelectedReply] = useState<Comment | null>(null);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState<Comment[]>([]);

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

  const handleLikeClick = () => {
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  const handleReplySubmit = async (text: string) => {
    try {
      await submitComment(Number(postId), text, comment.id); // comment.id가 부모
      // 대댓글 새로고침 or 추가 로직
      console.log("대댓글 성공", comment.id);
      setShowReplyForm(false); // 작성 후 폼 닫기
    } catch (e) {
      console.log("대댓글 작성 실패!");
      throw e;
    }
  };

  return (
    <>
      {/* 댓글 본문 */}
      <div className={`flex flex-col ${isReply ? "ml-[34px]" : ""}`}>
        <div className="flex flex-col w-full pl-[34px] pr-[20px] py-[13px] bg-[#fbf3ec] border border-[#f0e7e0]">
          <div className="mb-[4px] flex justify-between items-center">
            <span className="body5 text-[#808080]">{comment.author}</span>
            <NoColorReport
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => setIsReportOpen(true)}
            />
          </div>

          <div className="flex justify-start">
            <span className="body5 text-[#1d1d1d] break-words w-full">
              {comment.content}
            </span>
          </div>

          <div className="flex justify-between items-center mt-[12px] mr-[36px]">
            <span className="caption3 text-[#b3b3b3]">
              {formatRelativeTime(comment.createdAt)}
            </span>
            <div className="flex justify-center gap-[4px]">
              <button
                className="flex items-center bg-none border-none p-0 cursor-pointer"
                onClick={handleLikeClick}
              >
                {isLiked ? (
                  <ColorLike className="w-[14px] h-[14px]" />
                ) : (
                  <NoColorLike className="w-[14px] h-[14px]" />
                )}
              </button>
              <p
                className={`caption3 ${likeCount > 0 ? "text-[#ff8080]" : "text-[#b3b3b3]"}`}
              >
                {likeCount > 0 ? likeCount : "공감"}
              </p>
              <div className="flex justify-center gap-[4px] ml-[18px]">
                <GrayComment className="w-[14px] h-[14px]" />
                <button onClick={() => setShowReplyForm(!showReplyForm)}>
                  <p className="caption3 text-[#b3b3b3]">대댓글 달기</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 대댓글 작성 폼 */}
      {showReplyForm && (
        <CommentForm
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
            author: selectedReply.author,
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
            author: comment.author,
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

// 대댓글용 공감 버튼 분리
const ReplyLike = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="flex justify-center gap-[4px]">
      <button
        onClick={handleLike}
        className="flex items-center"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        {isLiked ? (
          <ColorLike className="w-[14px] h-[14px]" />
        ) : (
          <NoColorLike className="w-[14px] h-[14px]" />
        )}
      </button>
      <p
        className={`caption3 ${likeCount > 0 ? "text-[#ff8080]" : "text-[#b3b3b3]"}`}
      >
        {likeCount > 0 ? likeCount : "공감"}
      </p>
    </div>
  );
};
