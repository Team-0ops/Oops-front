
import { axiosInstance } from "../../apis/axios";

export async function submitLesson(
  postId: number,
  title: string,
  content: string,
  tags: string[]
) {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/lessons`, {
      title,
      content,
      tags,
    });
    console.log("성공",response)
    return response.data;
  } catch (error) {
    console.log("에러발생")
    console.error("에러",error);
    throw error;
  }
}
