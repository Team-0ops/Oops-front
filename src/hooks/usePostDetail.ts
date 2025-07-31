import { useEffect, useState } from "react";
import type { DetailResponse } from "../types/OopsList";
import { axiosInstance } from "../apis/axios";

export const usePostDetail = (postId: number) => {
  const [postDetail, setPostDetail] = useState<DetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await axiosInstance.get<DetailResponse>(
          `/posts/3`,
        );
        setPostDetail(res.data);
        console.log(res.data)
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
