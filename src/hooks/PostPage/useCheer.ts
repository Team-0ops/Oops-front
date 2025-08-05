import { useState } from "react";
import { axiosInstance } from "../../apis/axios";

export const useCheer = () => {
  const [cheeredPostIds, setCheeredPostIds] = useState<Set<number>>(new Set());

  const toggleCheer = async (postId: number) => {
    try {
      await axiosInstance.post(`/posts/${postId}/cheers`)

      setCheeredPostIds((prev) => {
        const next = new Set(prev);
        if (next.has(postId)) {
          next.delete(postId);
        } else {
          next.add(postId);
        }
        return next;
      });
    } catch (error) {
      console.error("응원 실패:", error);
      alert("응원에 실패했습니다.");
    }
  };

  const isCheered = (postId: number) => cheeredPostIds.has(postId);

  return { toggleCheer, isCheered };
};
