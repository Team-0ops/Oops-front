import instance from "./instance";
import type { ApiResponse } from "../types/api";
import type { OthersProfileResult } from "../types/mypage";

/**
 * 다른 사용자 프로필 및 게시글 데이터 정규화 함수
 * - API 응답 구조가 일정하지 않을 수 있어 다양한 키를 대응
 * - profile: userId, nickname, profileImageUrl
 * - posts: 게시글 리스트 (id, 제목, 미리보기, 이미지, 좋아요/댓글/조회수, 카테고리명)
 * - bestTitles: 대표적인 실패/타이틀 문자열 배열
 */
function normalizeOthers(res: any): OthersProfileResult {
  const r = res?.result ?? res ?? {};

  // 프로필 정보 추출
  const nickname = r.nickname ?? r.userName ?? r.name ?? r.username ?? "사용자";
  const profileImageUrl =
    r.profileImageUrl ?? r.imageUrl ?? r.avatarUrl ?? null;
  const userId = r.userId ?? r.id ?? r.user?.id;

  // 게시글 리스트 추출 (posts, postList, items 등)
  const postsSrc =
    r.posts ??
    r.postList ??
    r.items ??
    r.result?.posts ??
    r.result?.items ??
    [];

  const posts = Array.isArray(postsSrc)
    ? postsSrc.map((p: any) => ({
        id: p.id ?? p.postId ?? 0,
        title: p.title ?? "",
        contentPreview: p.contentPreview ?? p.content ?? "",
        imageUrl: p.thumbnailUrl ?? p.imageUrl ?? null,
        likes: p.likes ?? p.likeCount ?? 0,
        comments: p.comments ?? p.commentCount ?? 0,
        views: p.views ?? p.viewCount ?? 0,
        categoryName: p.categoryName ?? p.category ?? "",
      }))
    : [];

  // 베스트 타이틀 후보
  const best = r.bestFailures ?? r.bestTitles ?? r.best ?? []; // 문자열 배열이라 가정

  return {
    profile: { userId, nickname, profileImageUrl },
    posts,
    bestTitles: Array.isArray(best) ? best : [],
  };
}

/**
 * 다른 사용자 프로필 조회 API
 * @param userId - 조회할 사용자 ID
 * @returns OthersProfileResult (profile + posts + bestTitles)
 */
export async function getOthersProfile(userId: string | number) {
  const { data } = await instance.get<ApiResponse<any>>(
    `/my-page/profile/${userId}`
  );
  return normalizeOthers(data);
}
