import { useState } from "react";
import { axiosInstance } from "../../../apis/axios";

/**
 * useDeletePost 훅
 * - 게시글 삭제 기능 제공
 * - 삭제 성공 여부를 `success` state로 반환
 */
export function useDeletePost() {
  const [success, setSuccess] = useState(false); // 삭제 성공 여부

  /**
   * 게시글 삭제 API 호출
   * @param postId 삭제할 게시글 ID
   */
  const deletePost = async (postId: number) => {
    setSuccess(false);
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      setSuccess(true);
      console.log("성공");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { deletePost, success };
}
