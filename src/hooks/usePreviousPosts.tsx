import { useEffect, useState } from "react";
import {axiosInstance} from "../apis/axios";

export interface PreviousPost {
  postId: number;
  title: string;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
}

export const usePreviousPosts = () => {
  const [posts, setPosts] = useState<PreviousPost[]>([]);

  const fetchPreviousPosts = async () => {
    const res = await axiosInstance.get("/posts/previous");
    setPosts(res.data.result);
  };

  useEffect(() => {
    fetchPreviousPosts();
  }, []);

  return { posts, fetchPreviousPosts };
};