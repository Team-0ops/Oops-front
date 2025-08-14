import { useState } from "react";
import { axiosInstance } from "../../apis/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCheer = () => {
  const qc = useQueryClient();
  const [cheeredPostIds, setCheeredPostIds] = useState<Set<number>>(new Set());

  const { mutate: toggleCheer } = useMutation({
    mutationFn: (postId: number) =>
      axiosInstance.post(`/posts/${postId}/cheers`),
    // 클릭 즉시 토글 반영
    onMutate: async (postId: number) => {
      // 관련 쿼리 중단 (키는 프로젝트에 맞게 조정)
      await qc.cancelQueries();

      setCheeredPostIds((prev) => {
        const next = new Set(prev);
        if (next.has(postId)) next.delete(postId);
        else next.add(postId);
        return next;
      });

      // 컨텍스트로 롤백용 스냅샷 반환
      return { postId };
    },
    // 실패 시 롤백
    onError: (_err, postId) => {
      setCheeredPostIds((prev) => {
        const next = new Set(prev);
        if (next.has(postId)) next.delete(postId);
        else next.add(postId);
        return next;
      });
      alert("응원에 실패했습니다.");
    },
    // 성공/실패와 무관하게 서버값 재검증 (키는 프로젝트에 맞게 조정)
    onSettled: (_data, _err, postId) => {
      // 예: 상세 페이지가 ['postDetail', postId] 키를 쓰는 경우
      qc.invalidateQueries({ queryKey: ["postDetail", postId] });
      // 목록/피드도 갱신하고 싶다면 아래처럼 추가
      // qc.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  // "현재 세션에서 토글되었는지" 여부
  const isCheered = (postId: number) => cheeredPostIds.has(postId);

  return { toggleCheer, isCheered };
};
