import { useEffect, useState } from "react";
import axios from "axios";
import type { DetailResponse } from "../types/OopsList";

export const usePostDetail = (postId: number) => {
  const [postDetail, setPostDetail] = useState<DetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const token = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await axios.get<DetailResponse>(
          `/api/posts/${postId}`,
          {
            headers: {
              AccessToken : `Bearer ${token}`,
            },
          }
        );
        setPostDetail(res.data);
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
