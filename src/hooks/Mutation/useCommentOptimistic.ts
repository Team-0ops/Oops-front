import { useMutation } from "@tanstack/react-query";
import { submitComment } from "../../hooks/PostPage/useSubmitComment";
import type { Comment } from "../../types/Comment";

export type AddCommentVars = {
  postId: number;
  content: string;
  parentId: string | null; // 일반 댓글: null, 대댓글: 부모 id
};


export function useCommentOptimistic(params: {
  userId: string | null;
  setLocalComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setInput?: (v: string) => void; // 일반 댓글 입력창 비우는 콜백(선택)
}) {
  const { userId, setLocalComments, setInput } = params;

  const genTempId = () =>
    (globalThis as any)?.crypto?.randomUUID?.() ??
    `tmp-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (v: AddCommentVars) => submitComment(v.postId, v.content, v.parentId),

    onMutate: ({ content, parentId }) => {
      const tempId = genTempId();
      const optimistic: Comment = {
        id: tempId,
        content,
        userName: "나", // 로그인 닉네임으로 대체 가능
        likes: 0,
        liked: false,
        createdAt: new Date().toISOString(),
        parentId, // 일반 댓글이면 null, 대댓글이면 부모 id
        userId: Number(userId) || 0,
      };
      // 즉시 추가 (상단에 붙임)
      setLocalComments((prev) => [optimistic, ...prev]);
      // 일반 댓글 입력창 비우기
      setInput?.("");
      return { tempId };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.tempId) {
        // 롤백: 임시 댓글 제거
        setLocalComments((prev) => prev.filter((c) => c.id !== ctx.tempId));
      }
      alert("댓글 작성에 실패했습니다.");
    },

    onSuccess: (res, _vars, ctx) => {
      const serverId =
        res?.result?.commentId ??
        res?.result?.id ??
        res?.id ??
        null;

      const serverCreatedAt =
        res?.result?.createdAt ??
        res?.createdAt ??
        null;

      const serverUserName =
        res?.result?.userName ??
        res?.userName ??
        "나";

      if (!ctx?.tempId || !serverId) return;

      // tempId → 서버 id 치환
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

    // 필요 시 서버 진실값 재동기화
    // onSettled: (_d, _e, v) => qc.invalidateQueries({ queryKey: ["postDetail", v.postId] }),
  });

  return { addComment, isPending };
}
