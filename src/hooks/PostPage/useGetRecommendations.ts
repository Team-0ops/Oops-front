import { useState, useEffect } from "react";
import axiosInstance from "../../apis/axios";

interface PostItem {
    postId: number;
    title: string;
    situation: "OOPS" | "OVERCOMING" | "OVERCOME" ;
}

interface RecommendationsResponse {
    similarPosts: PostItem[];
    bestFailers: PostItem[];
}

export const useGetRecommendations = (postId: number) => {
    const [data, setData] = useState<RecommendationsResponse | null>(null);
    const [loadingRecommendation, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if (!postId) return;

        const fetchRecommendations = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosInstance.get(`/posts/${postId}/recommendations`);
                if (res.data) {
                    setData(res.data.result);
                } else {
                    throw new Error(res.data?.message || "실패!");
                }
            } catch (err: any) {
                console.log("추천글 불러오기 실패");
                throw(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
     }, [postId]);

     return {data, loadingRecommendation, error};
}