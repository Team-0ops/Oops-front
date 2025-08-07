import { useState } from "react";
import { axiosInstance } from "../../apis/axios"; 

export function useDeletePost(postId: number | string) {
  const [success, setSuccess] = useState(false);

  const deletePost = async ()  => {
    setSuccess(false);
    try {
      await axiosInstance.post(`/posts/${postId}`);
      setSuccess(true);
    } catch (err) {
      console.error(err)
      throw(err)
    } 
  };

  return { deletePost, success };
}
