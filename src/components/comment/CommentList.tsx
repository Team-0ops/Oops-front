import type { Comment } from "../../types/Comment";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="text-center text-[#999999] caption3 py-[20px]">
        작성된 댓글이 아직 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
