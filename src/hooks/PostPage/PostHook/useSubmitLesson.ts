import { axiosInstance } from "../../../apis/axios";

/**
 * submitLesson
 * - 특정 게시글에 교훈(lesson)을 작성하는 API 호출 함수
 * @param postId 게시글 ID
 * @param title 교훈 제목
 * @param content 교훈 내용
 * @param tags 교훈 태그 배열
 */
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
    console.log("성공", response);
    return response.data;
  } catch (error) {
    console.log("에러발생");
    console.error("에러", error);
    throw error;
  }
}
