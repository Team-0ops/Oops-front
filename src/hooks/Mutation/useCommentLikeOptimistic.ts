import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCheerComment } from "../PostPage/PostHook/useCheerComment";

type Params = {
  postId: number;             // invalidate 대상 게시글 ID (쿼리 무효화용)
  commentId: string | number; // 좋아요 API 호출 시 필요한 댓글 ID
  initialLiked: boolean;      // 초기 "좋아요 여부"
  initialLikes: number;       // 초기 "좋아요 수"
  onServerSync?: (liked: boolean, likes: number) => void; // 서버 동기화 시 외부에 값 전달
  extraInvalidateKeys?: Array<unknown[]>; // 추가적으로 무효화할 queryKey 배열
};

/**
 * useCommentLikeOptimistic 훅
 * - 댓글 공감(좋아요) 기능을 Optimistic UI 방식으로 구현
 * - 즉시 UI에 반영 후, 실패 시 롤백 / 성공 시 서버와 동기화
 */
export function useCommentLikeOptimistic({
  postId,
  commentId,
  initialLiked,
  initialLikes,
  onServerSync,
  extraInvalidateKeys = [],
}: Params) {
  const qc = useQueryClient();         // react-query QueryClient
  const { cheerComment } = useCheerComment(); // 댓글 좋아요 API 호출 훅

  // 로컬 표시 상태 (Optimistic UI)
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [likes, setLikes] = useState<number>(initialLikes);

  /**
   * props 변경 시 서버 값으로 동기화
   * - 서버 재검증 이후 최신 값이 들어오면 로컬 상태도 맞춰줌
   */
  const prevSyncRef = useRef({ initialLiked, initialLikes });
  useEffect(() => {
    if (
      prevSyncRef.current.initialLiked !== initialLiked ||
      prevSyncRef.current.initialLikes !== initialLikes
    ) {
      setLiked(initialLiked);
      setLikes(initialLikes);
      prevSyncRef.current = { initialLiked, initialLikes };
      onServerSync?.(initialLiked, initialLikes); // 부모에서도 값 동기화 필요 시 전달
    }
  }, [initialLiked, initialLikes, onServerSync]);

  /**
   * 댓글 좋아요 토글 Mutation
   * - onMutate: UI 즉시 업데이트 (Optimistic)
   * - onError: 실패 시 이전 상태로 롤백
   * - onSettled: 성공/실패 무관 서버값 재검증
   */
  const { mutate: toggle, isPending } = useMutation({
    mutationFn: async () => {
      await cheerComment(Number(commentId)); // 댓글 좋아요 API 호출
    },
    // ✅ 낙관적 업데이트 (즉시 반영)
    onMutate: async () => {
      const prev = { liked, likes };  // 롤백 대비 기존 값 저장
      const nextLiked = !liked;
      const nextLikes = likes + (liked ? -1 : 1);

      setLiked(nextLiked);
      setLikes(nextLikes);

      // 관련 쿼리 취소 (postDetail 무효화 준비)
      await qc.cancelQueries({ queryKey: ["postDetail", postId] });
      return { prev };
    },
    // 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        setLiked(ctx.prev.liked);
        setLikes(ctx.prev.likes);
      }
      console.log("공감 처리에 실패했어요.");
    },
    // 서버 재검증 (성공/실패 무관)
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["postDetail", postId] });
      for (const key of extraInvalidateKeys) {
        qc.invalidateQueries({ queryKey: key });
      }
    },
  });

  // 외부에서 사용 가능한 값과 toggle 함수 반환
  return { liked, likes, toggle, isPending };
}
