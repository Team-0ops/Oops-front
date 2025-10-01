import { useState } from "react";
import { deleteCommentApi } from "../../../apis/Comment/commentDelete";

/**
 * useDeleteComment 훅
 * - 특정 게시글 내 댓글 삭제 기능 제공
 * - 삭제 성공 여부를 `success` state로 반환
 */
export const useDeleteComment = () => {
  const [success, setSuccess] = useState(false); // 삭제 성공 여부

  /**
   * 댓글 삭제 API 호출
   * @param postId 게시글 ID
   * @param commentId 삭제할 댓글 ID
   */
  const deleteComment = async (postId: number, commentId: number) => {
    setSuccess(false);
    try {
      await deleteCommentApi(postId, commentId)
      setSuccess(true);
      console.log("성공!");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { deleteComment, success };
};
