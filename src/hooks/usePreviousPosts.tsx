import { useEffect, useState } from "react";
import {axiosInstance} from "../apis/axios";

export interface PreviousPost {
  postId: number;
  title: string;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
  content: string;
  categoryName: string;
  imageUrls: string[];
}

export const usePreviousPosts = () => {
  const [posts, setPosts] = useState<PreviousPost[]>([]);

  const fetchPreviousPosts = async () => {
    const res = await axiosInstance.get("/posts/my");
    setPosts(res.data.result);
    console.log("이전 게시물 조회 성공:", res.data.result);
  };

  useEffect(() => {
    fetchPreviousPosts();
  }, []);

  return { posts, fetchPreviousPosts };
};