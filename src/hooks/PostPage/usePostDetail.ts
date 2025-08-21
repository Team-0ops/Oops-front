import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import type {
  PostDetailResponse,
  DetailResultType,
} from "../../types/post/PostDetail";

/**
 * Fetcher: returns only the payload (result) so react-query cache can be patched by useCheer
 */
const fetchPostDetail = async (
  postId: number
): Promise<DetailResultType | null> => {
  const { data } = await axiosInstance.get<PostDetailResponse>(
    `/posts/${postId}`
  );
  console.log("상세조회 성공!", data.result)
  return data?.result ?? null;
};

/**
 * React Query version — key is exactly ["postDetail", postId]
 * so useCheer.ts can setQueryData/invalidate reliably.
 */
export const usePostDetail = (postId: number) => {
  const q = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: () => fetchPostDetail(postId),
    enabled: !!postId,
    staleTime: Infinity, // keep fresh for a bit to avoid immediate refetch
    refetchOnWindowFocus: false, // do not override optimistic overlay
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return { postDetail: q.data ?? null, loading: q.isLoading || q.isFetching };
};
