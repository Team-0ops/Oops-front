import axiosInstance from "../axios";

export async function deleteCommentApi(postId: number, commentId: number) {
    await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);    
}