import { axiosInstance } from "../../apis/axios";

// 댓글 작성
export async function submitComment(
  postId: number,
  content: string,
  parentId: string | null
) {
  console.log(postId, content, parentId);
  try{
  const response = await axiosInstance.post(`/posts/${postId}/comments`, {
    parentId,
    content,
  });
  return response.data;
} catch(e) {
    console.log("실패");
    throw(e)
}
  
}
