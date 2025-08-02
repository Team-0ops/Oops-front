import type { Comment } from "../../types/Comment";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
  postId: number;
}

const CommentList = ({ comments, postId }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="text-center text-[#999999] caption3 py-[20px]">
        작성된 댓글이 아직 없습니다.
      </div>
    );
  }

  // 1. 부모댓글만 걸러내기
  const parentComments = comments.filter((c) => !c.parentId);

  // 2. 특정 부모댓글의 대댓글 반환 함수
  const getReplies = (parentId:string|null) =>
    comments.filter((c) => c.parentId === parentId);
 
  return (
    <div>
      {parentComments.map((comment) => (
        <div key={comment.id}>
          {/* 일반 댓글 */}
          <CommentItem comment={comment} postId={postId} />

          {/* 대댓글 */}
          {getReplies(comment.id).map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              isReply // 대댓글임을 표시
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
