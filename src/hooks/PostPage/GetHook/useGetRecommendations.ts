import { useState, useEffect } from "react";
import axiosInstance from "../../../apis/axios";

interface PostItem {
  postId: number;
  title: string;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
}

interface RecommendationsResponse {
  similarPosts: PostItem[]; // 유사한 게시글 목록
  bestFailers: PostItem[]; // 실패 경험이 많은 사용자 추천 글
}

/**
 * useGetRecommendations 훅
 * - 게시글 ID를 기반으로 추천 글 목록을 불러옴
 * - similarPosts / bestFailers 로 분류된 데이터 반환
 */
export const useGetRecommendations = (postId: number) => {
  const [data, setData] = useState<RecommendationsResponse | null>(null);
  const [loadingRecommendation, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/posts/${postId}/recommendations`);
        if (res.data) {
          setData(res.data.result);
        } else {
          throw new Error(res.data?.message || "실패!");
        }
      } catch (err: any) {
        console.log("추천글 불러오기 실패");
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [postId]);

  return { data, loadingRecommendation, error };
};
