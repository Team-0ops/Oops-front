import type { Comment } from "../../types/comment/Comment";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[]; // 전체 댓글 목록
  postId: number; // 댓글이 속한 게시글 id
  onReplySubmit?: (parentId: string, text: string) => void; // 대댓글 작성 콜백
}

/**
 * CommentList 컴포넌트
 * - 댓글 리스트와 대댓글을 계층적으로 렌더링
 * - 부모 댓글과 자식 댓글을 구분하여 표시
 */
const CommentList = ({ comments, postId, onReplySubmit }: CommentListProps) => {
  // 댓글이 없는 경우 안내 메시지 출력
  if (comments.length === 0) {
    return (
      <div className="text-center text-[#999999] caption3 py-[20px]">
        작성된 댓글이 아직 없습니다.
      </div>
    );
  }

  /**
   * 부모 댓글만 필터링
   * parentId가 null 또는 undefined인 댓글 -> 최상위 댓글
   */
  const parentComments = comments.filter((c) => !c.parentId);

  /**
   * 특정 부모 댓글의 대댓글만 반환하는 함수
   * @param 부모댓글 id
   */
  const getReplies = (parentId: string | null) =>
    comments.filter((c) => Number(c.parentId) === Number(parentId));

  return (
    <div>
      {parentComments.map((comment) => (
        <div key={comment.id}>
          {/* 일반 댓글 */}
          <CommentItem
            comment={comment}
            postId={postId}
            onReplySubmit={onReplySubmit}
          />

          {/* 대댓글 */}
          {getReplies(comment.id).map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              isReply // 대댓글임을 표시 (들여쓰기 적용)
              onReplySubmit={onReplySubmit}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
