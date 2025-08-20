// src/hooks/PostPage/useCheer.ts
import { axiosInstance } from "../../apis/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";

/** pending 토글 상태 */
type CheerState = {
  pending: Record<number, number>;
  bump: (id: number) => void;
  settle: (id: number) => void;
  rollback: (id: number) => void;
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

/** 특정 postId의 낙관 상태를 바로 구독 */
export const useIsCheered = (postId: number) =>
  useCheerStore((s) => (s.pending[postId] ?? 0) % 2 === 1);

export const useCheer = () => {
  const qc = useQueryClient();
  const bump = useCheerStore((s) => s.bump);
  const settle = useCheerStore((s) => s.settle);
  const rollback = useCheerStore((s) => s.rollback);

  const { mutate: toggleCheer } = useMutation({
    // ✅ AxiosResponse를 벗겨 payload만 반환
    mutationFn: async (postId: number) => {
      const res = await axiosInstance.post(`/posts/${postId}/cheers`);
      // 백엔드 응답 형태에 맞춰 아래 2줄 중 하나만 남기세요.
      // 1) result 래핑이 있는 경우:
      return (res?.data?.result ?? null) as {
        liked?: boolean;
        likes?: number;
      } | null;
      // 2) 바로 본문에 있는 경우라면:
      // return (res?.data ?? null) as ToggleCheerPayload;
    },

    onMutate: async (postId: number) => {
      bump(postId); // 클릭 즉시 optimistic 반영
      const prev = qc.getQueryData(["postDetail", postId]);
      return { prev, postId };
    },

    onError: (_err, _postId, ctx) => {
      if (ctx?.postId) rollback(ctx.postId);
    },

    // onSuccess만 교체
    onSuccess: (payload, postId) => {
      // 1) 서버 캐시를 "반드시" 먼저 갱신 (payload 없으면 로컬 flip)
      qc.setQueryData(["postDetail", postId], (old: any) => {
        if (!old) return old;

        const patchOne = (p?: {
          postId: number;
          liked: boolean;
          likes: number;
        }) => {
          if (!p || p.postId !== postId) return p;

          // 서버가 liked/likes를 주면 그대로 반영
          if (
            typeof payload?.liked === "boolean" &&
            typeof payload?.likes === "number"
          ) {
            return { ...p, liked: payload.liked, likes: payload.likes };
          }
          // 서버가 안 주면 안전한 로컬 flip
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

      // 2) 캐시가 최신이 된 다음 오버레이 소진(깜빡임 방지)
      settle(postId);
    },
  });

  return { toggleCheer };
};
