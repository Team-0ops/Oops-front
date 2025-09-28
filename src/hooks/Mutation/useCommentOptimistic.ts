import { useMutation } from "@tanstack/react-query";
import { submitComment } from "../PostPage/PostHook/useSubmitComment";
import type { Comment } from "../../types/Comment";

export type AddCommentVars = {
  postId: number; // 댓글이 속한 게시글 ID
  content: string; // 댓글/대댓글 내용
  parentId: string | null; // 일반 댓글: null, 대댓글: 부모 댓글 ID
};

/**
 * useCommentOptimistic 훅
 * - 댓글/대댓글 작성 시 Optimistic UI 방식으로 즉시 반영
 * - 서버 실패 시 롤백, 성공 시 임시 ID → 서버 ID로 교체
 */
export function useCommentOptimistic(params: {
  userId: string | null; // 현재 로그인 사용자 ID
  setLocalComments: React.Dispatch<React.SetStateAction<Comment[]>>; // 댓글 목록 상태 업데이트 함수
  setInput?: (v: string) => void; // 일반 댓글 입력창 초기화 콜백 (선택)
}) {
  const { userId, setLocalComments, setInput } = params;

  // 임시 ID 생성기 (UUID 또는 fallback)
  const genTempId = () =>
    (globalThis as any)?.crypto?.randomUUID?.() ??
    `tmp-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const { mutate: addComment, isPending } = useMutation({
    // 댓글 등록 API 호출
    mutationFn: (v: AddCommentVars) =>
      submitComment(v.postId, v.content, v.parentId),

    /**
     * Optimistic 업데이트: UI에 임시 댓글 먼저 추가
     */
    onMutate: ({ content, parentId }) => {
      const tempId = genTempId();

      // 낙관적으로 추가할 임시 댓글 객체
      const optimistic: Comment = {
        id: tempId,
        content,
        userName: "나", // 로그인 닉네임으로 대체 가능
        likes: 0,
        liked: false,
        createdAt: new Date().toISOString(),
        parentId, // 일반 댓글: null, 대댓글: 부모 ID
        userId: Number(userId) || 0,
      };

      // 즉시 댓글 목록에 추가 (상단 prepend)
      setLocalComments((prev) => [optimistic, ...prev]);

      // 입력창 초기화 (일반 댓글 작성 시)
      setInput?.("");

      return { tempId }; // rollback 대비 tempId 저장
    },

    /**
     * 실패 시 롤백: 임시 댓글 제거
     */
    onError: (_err, _vars, ctx) => {
      if (ctx?.tempId) {
        setLocalComments((prev) => prev.filter((c) => c.id !== ctx.tempId));
      }
      alert("댓글 작성에 실패했습니다.");
    },

    /**
     * 성공 시: 서버에서 받은 ID와 정보로 교체
     */
    onSuccess: (res, _vars, ctx) => {
      const serverId =
        res?.result?.commentId ?? res?.result?.id ?? res?.id ?? null;

      const serverCreatedAt = res?.result?.createdAt ?? res?.createdAt ?? null;

      const serverUserName = res?.result?.userName ?? res?.userName ?? "나";

      if (!ctx?.tempId || !serverId) return;

      // tempId → 서버에서 받은 진짜 ID로 치환
      setLocalComments((prev) =>
        prev.map((c) =>
          c.id === ctx.tempId
            ? {
                ...c,
                id: String(serverId),
                createdAt: serverCreatedAt ?? c.createdAt,
                userName: serverUserName ?? c.userName,
              }
            : c
        )
      );
    },

    // 필요 시: postDetail 캐시 무효화 가능
    // onSettled: (_d, _e, v) =>
    //   qc.invalidateQueries({ queryKey: ["postDetail", v.postId] }),
  });

  return { addComment, isPending };
}
