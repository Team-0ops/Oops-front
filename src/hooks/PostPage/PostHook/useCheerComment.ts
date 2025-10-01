import { useState } from "react";
import { cheerCommentApi } from "../../../apis/Comment/commentCheer";

/**
 * useCheerComment 훅
 * - 댓글 좋아요/공감을 토글하는 API 호출 기능
 */
export function useCheerComment() {
  const [success, setSuccess] = useState(false);

  const cheerComment = async (commentId: number) => {
    setSuccess(false);
    try {
      await cheerCommentApi(commentId);
      setSuccess(true);
      console.log("성공!");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { cheerComment, success };
}
