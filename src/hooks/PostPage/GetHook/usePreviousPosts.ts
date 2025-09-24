import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axios";

export interface PreviousPost {
  postId: number; // 게시글 ID
  title: string; // 게시글 제목
  situation: "OOPS" | "OVERCOMING" | "OVERCOME"; // 상황 단계
  content: string; // 게시글 내용
  categoryName: string; // 카테고리명
  topicName: string; // 토픽명
  imageUrls: string[]; // 이미지 URL 배열
}

/**
 * usePreviousPosts 훅
 * - 내가 작성한 게시글 목록을 가져옴
 * - fetchPreviousPosts 호출 시 갱신 가능
 */
export const usePreviousPosts = () => {
  const [posts, setPosts] = useState<PreviousPost[]>([]);

  // 내 게시글 조회 API 호출
  const fetchPreviousPosts = async () => {
    const res = await axiosInstance.get("/posts/my");
    setPosts(res.data.result);
    console.log("이전 게시물 조회 성공:", res.data.result);
  };

  // 컴포넌트 마운트 시 자동 호출
  useEffect(() => {
    fetchPreviousPosts();
  }, []);

  return { posts, fetchPreviousPosts };
};
