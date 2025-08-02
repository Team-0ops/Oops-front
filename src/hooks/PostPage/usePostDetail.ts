import { useEffect, useState } from "react";
import { axiosInstance } from "../../apis/axios";
import type { ServerResponse, DetailResultType } from "../../types/post/PostDetail";

export const usePostDetail = (postId: number) => {
  const [postDetail, setPostDetail] = useState<DetailResultType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await axiosInstance.get<ServerResponse>(
          `/posts/${postId}`,
        );
        setPostDetail(res.data.result);
        console.log("상세 조회 성공:", res.data.result);
      } catch (error) {
        console.error("상세 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  return { postDetail, loading };
};