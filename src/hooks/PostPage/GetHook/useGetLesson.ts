import { useState, useEffect } from "react";
import { axiosInstance } from "../../../apis/axios";

/**
 * 특정 게시글에 등록된 교훈(lesson)을 불러오는 API
 */
export const getLesson = async (postId: number) => {
  const { data } = await axiosInstance.get(`/posts/${postId}/lessons`);
  return data.result;
};

/**
 * useGetLesson 훅
 * - 교훈 데이터를 가져와 상태로 관리
 * - 로딩/에러 상태 포함
 */
export const useGetLesson = (postId?: number) => {
  const [lesson, setLesson] = useState<any | null>(null); // 교훈 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(""); // 에러 메시지

  useEffect(() => {
    if (!postId) return; // postId 없으면 실행 안 함

    const fetchLesson = async () => {
      try {
        setLoading(true);
        const result = await getLesson(postId);
        setLesson(result);
      } catch (e) {
        setError("교훈을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [postId]);

  return { lesson, loading, error };
};
