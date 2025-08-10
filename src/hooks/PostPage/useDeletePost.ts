import { useState } from "react";
import { axiosInstance } from "../../apis/axios"; 

export function useDeletePost() {
  const [success, setSuccess] = useState(false);

  const deletePost = async (postId:number)  => {
    setSuccess(false);
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      setSuccess(true);
      console.log("성공");
    } catch (err) {
      console.error(err)
      throw(err)
    } 
  };

  return { deletePost, success };
}
