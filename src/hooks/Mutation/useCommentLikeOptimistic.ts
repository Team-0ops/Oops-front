// hooks/Mutation/useToggleCommentLikeOptimistic.ts
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCheerComment } from "../../hooks/PostPage/useCheerComment";

type Params = {
  postId: number;            // invalidate용
  commentId: string | number; // API 호출용
  initialLiked: boolean;
  initialLikes: number;
  // 선택: 서버 재검증 시 외부에서도 최신값을 밀어넣고 싶다면
  onServerSync?: (liked: boolean, likes: number) => void;
  // 선택: invalidate할 추가 키가 있다면
  extraInvalidateKeys?: Array<unknown[]>;
};

export function useCommentLikeOptimistic({
  postId,
  commentId,
  initialLiked,
  initialLikes,
  onServerSync,
  extraInvalidateKeys = [],
}: Params) {
  const qc = useQueryClient();
  const { cheerComment } = useCheerComment();

  // 로컬 표시 상태 (옵티미스틱)
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [likes, setLikes] = useState<number>(initialLikes);

  // 부모에서 props가 바뀌면 동기화 (서버 재검증 이후)
  const prevSyncRef = useRef({ initialLiked, initialLikes });
  useEffect(() => {
    if (
      prevSyncRef.current.initialLiked !== initialLiked ||
      prevSyncRef.current.initialLikes !== initialLikes
    ) {
      setLiked(initialLiked);
      setLikes(initialLikes);
      prevSyncRef.current = { initialLiked, initialLikes };
      onServerSync?.(initialLiked, initialLikes);
    }
  }, [initialLiked, initialLikes, onServerSync]);

  const { mutate: toggle, isPending } = useMutation({
    mutationFn: async () => {
      // 댓글 좋아요 API 호출 (프로젝트의 실제 경로/함수 사용)
      await cheerComment(Number(commentId));
    },
    // ✅ 즉시 반영
    onMutate: async () => {
      const prev = { liked, likes };
      const nextLiked = !liked;
      const nextLikes = likes + (liked ? -1 : 1);
      setLiked(nextLiked);
      setLikes(nextLikes);

      // 관련 쿼리 중단(필요 시)
      await qc.cancelQueries({ queryKey: ["postDetail", postId] });
      return { prev };
    },
    // ⛔ 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        setLiked(ctx.prev.liked);
        setLikes(ctx.prev.likes);
      }
      alert("공감 처리에 실패했어요.");
    },
    // ✅ 성공/실패와 무관하게 서버값 재동기화
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["postDetail", postId] });
      for (const key of extraInvalidateKeys) {
        qc.invalidateQueries({ queryKey: key });
      }
    },
  });

  return { liked, likes, toggle, isPending };
}
