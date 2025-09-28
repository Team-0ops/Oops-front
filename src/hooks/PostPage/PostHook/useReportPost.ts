import { useState } from "react";
import { axiosInstance } from "../../../apis/axios";

/**
 * useReportPost 훅
 * - 게시글 신고 API 호출 기능
 */
export function useReportPost(postId: number | string) {
  const [success, setSuccess] = useState(false);

  const reportPost = async (content: string) => {
    setSuccess(false);
    try {
      await axiosInstance.post(`/posts/${postId}/reports`, { content });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { reportPost, success };
}
