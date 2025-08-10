import { useState } from "react";
import { axiosInstance } from "../../apis/axios"

export const useDeleteComment = () => {
    const [success, setSuccess] = useState(false);

  const deleteComment = async (postId : number, commentId: number)  => {
    setSuccess(false);
    try {
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
      setSuccess(true);
      console.log("성공!")
    } catch (err) {
      console.error(err)
      throw(err)
    } 
  };

  return { deleteComment, success };
}
