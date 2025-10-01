import axiosInstance from "../axios";

export async function submitCommentApi(
  postId: number,
  content: string,
  parentId: string | null
) {
  const {data} = await axiosInstance.post(`/posts/${postId}/comments`, {
    parentId,
    content,
  });

  return data
}
