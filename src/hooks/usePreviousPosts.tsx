import { useEffect, useState } from "react";
import axios from "axios";

export interface PreviousPost {
  postId: number;
  title: string;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
}

export const usePreviousPosts = () => {
  const [posts, setPosts] = useState<PreviousPost[]>([]);
  const token = import.meta.env.VITE_API_KEY;

  const fetchPreviousPosts = async () => {
    const res = await axios.get("/api/posts/previous");
    setPosts(res.data.result);
  };

  useEffect(() => {
    fetchPreviousPosts();
  }, []);

  return { posts, fetchPreviousPosts };
};