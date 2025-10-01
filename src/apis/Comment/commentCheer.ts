import axiosInstance from "../axios";

export async function cheerCommentApi(commentId:number) {
    await axiosInstance.post(`/comments/${commentId}/cheers`);
}