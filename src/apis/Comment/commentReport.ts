import axiosInstance from "../axios";

export async function reportCommentApi(commentId:number|string, content:string) {
    await axiosInstance.post(`/comments/${commentId}/reports`, { content });    
}