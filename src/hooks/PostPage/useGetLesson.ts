import { useState, useEffect } from "react";
import { axiosInstance } from "../../apis/axios";

export const getLesson = async (postId: number) => {
  const { data } = await axiosInstance.get(`/posts/${postId}/lessons`);
  return data.result;
};

export const useGetLesson = (postId?: number) => {
  const [lesson, setLesson] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!postId) return;

    const fetchLesson = async () => {
      try {
        setLoading(true);
        const result = await getLesson(postId); // ✅ 분리된 API 사용
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
