import { submitCommentApi } from "../../../apis/Comment/commentSubmit";

/**
 * submitComment
 * - 새로운 댓글/대댓글을 등록하는 API 호출 함수
 * @param postId 게시글 ID
 * @param content 댓글 내용
 * @param parentId 부모 댓글 ID (null이면 일반 댓글)
 */
export async function submitComment(
  postId: number,
  content: string,
  parentId: string | null
) {
  console.log(postId, content, parentId);
  try {
    const response = await submitCommentApi(postId,content,parentId)
    console.log(response)
    return response.data;
  } catch (e) {
    console.log("실패");
    throw e;
  }
}
