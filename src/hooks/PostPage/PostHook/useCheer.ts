import { axiosInstance } from "../../../apis/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";

// cheer 상태 관리용 Store (낙관적 반영 pending 상태 추적) 
type CheerState = {
  pending: Record<number, number>; // postId별 pending 상태 카운트
  bump: (id: number) => void; // 클릭 시 +1
  settle: (id: number) => void; // 완료 시 -1
  rollback: (id: number) => void; // 실패 시 롤백
};

const useCheerStore = create<CheerState>((set) => ({
  pending: {},
  bump: (id) =>
    set((s) => ({ pending: { ...s.pending, [id]: (s.pending[id] ?? 0) + 1 } })),
  settle: (id) =>
    set((s) => {
      const n = (s.pending[id] ?? 0) - 1;
      const next = { ...s.pending };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return { pending: next };
    }),
  rollback: (id) =>
    set((s) => {
      const n = (s.pending[id] ?? 0) - 1;
      const next = { ...s.pending };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return { pending: next };
    }),
}));

/** 특정 postId의 optimistic ui 상태를 바로 구독 */
export const useIsCheered = (postId: number) =>
  useCheerStore((s) => (s.pending[postId] ?? 0) % 2 === 1);

/**
 * useCheer 훅
 * - 게시글 좋아요/공감을 토글하는 Optimistic UI 기능 제공
 */
export const useCheer = () => {
  const qc = useQueryClient();
  const bump = useCheerStore((s) => s.bump);
  const settle = useCheerStore((s) => s.settle);
  const rollback = useCheerStore((s) => s.rollback);

  const { mutate: toggleCheer } = useMutation({
    mutationFn: async (postId: number) => {
      const res = await axiosInstance.post(`/posts/${postId}/cheers`);
      return (res?.data?.result ?? null) as {
        liked?: boolean;
        likes?: number;
      } | null;
    },
    onMutate: async (postId: number) => {
      bump(postId); // 즉시 반영
      const prev = qc.getQueryData(["postDetail", postId]);
      return { prev, postId };
    },
    onError: (_err, _postId, ctx) => {
      if (ctx?.postId) rollback(ctx.postId);
    },
    onSuccess: (payload, postId) => {
      // 서버 값 기반으로 캐시 갱신
      qc.setQueryData(["postDetail", postId], (old: any) => {
        if (!old) return old;

        const patchOne = (p?: {
          postId: number;
          liked: boolean;
          likes: number;
        }) => {
          if (!p || p.postId !== postId) return p;

          if (
            typeof payload?.liked === "boolean" &&
            typeof payload?.likes === "number"
          ) {
            return { ...p, liked: payload.liked, likes: payload.likes };
          }
          return {
            ...p,
            liked: !p.liked,
            likes: p.liked ? p.likes - 1 : p.likes + 1,
          };
        };

        return {
          ...old,
          postFailure: patchOne(old.postFailure),
          postOvercoming: patchOne(old.postOvercoming),
          postOvercome: patchOne(old.postOvercome),
        };
      });

      settle(postId); // 깜빡임 방지
    },
  });

  return { toggleCheer };
};
