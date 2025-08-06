import { useState } from "react";
import { axiosInstance } from "../../apis/axios"; 

export function useReportPost(postId: number | string) {
  const [success, setSuccess] = useState(false);

  const reportPost = async (content: string) => {
    setSuccess(false);
    try {
      await axiosInstance.post(`/posts/${postId}/reports`, { content });
      setSuccess(true);
    } catch (err) {
      console.error(err)
      throw(err)
    } 
  };

  return { reportPost, success };
}
