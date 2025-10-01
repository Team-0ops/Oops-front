import { useState } from "react";
import { reportCommentApi } from "../../../apis/Comment/commentReport";

/**
 * useReportComment 훅
 * - 댓글/대댓글 신고 API 호출 기능
 */
export function useReportComment(commentId: number | string) {
  const [success, setSuccess] = useState(false);

  const reportComment = async (content: string) => {
    setSuccess(false);
    try {
      await reportCommentApi(commentId, content);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { reportComment, success };
}
