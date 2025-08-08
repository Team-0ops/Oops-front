import { useState } from "react";
import { axiosInstance } from "../../apis/axios"; 

export function useCheerComment() {
  const [success, setSuccess] = useState(false);

  const cheerComment = async (commentId : number)  => {
    setSuccess(false);
    try {
      await axiosInstance.post(`/comments/${commentId}/cheers`);
      setSuccess(true);
      console.log("성공!")
    } catch (err) {
      console.error(err)
      throw(err)
    } 
  };

  return { cheerComment, success };
}
