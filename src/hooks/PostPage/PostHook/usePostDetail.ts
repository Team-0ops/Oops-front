import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../apis/axios";
import type {
  PostDetailResponse,
  DetailResultType,
} from "../../../types/post/PostDetail";

/**
 * fetchPostDetail
 * - 게시글 상세 데이터 불러오기 (payload만 반환)
 */
const fetchPostDetail = async (
  postId: number
): Promise<DetailResultType | null> => {
  const { data } = await axiosInstance.get<PostDetailResponse>(
    `/posts/${postId}`
  );
  console.log("상세조회 성공!", data.result);
  return data?.result ?? null;
};

/**
 * usePostDetail 훅
 * - 게시글 상세 데이터를 react-query 캐시에 저장/관리
 * - key: ["postDetail", postId]
 */
export const usePostDetail = (postId: number) => {
  const q = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: () => fetchPostDetail(postId),
    enabled: !!postId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return { postDetail: q.data ?? null, loading: q.isLoading || q.isFetching };
};
