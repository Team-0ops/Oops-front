import instance from "./instance";
import type { ApiResponse } from "../types/api";
import type { OthersProfileResult } from "../types/mypage";

function normalizeOthers(res: any): OthersProfileResult {
  const r = res?.result ?? res ?? {};

  // 프로필
  const nickname = r.nickname ?? r.userName ?? r.name ?? r.username ?? "사용자";
  const profileImageUrl =
    r.profileImageUrl ?? r.imageUrl ?? r.avatarUrl ?? null;
  const userId = r.userId ?? r.id ?? r.user?.id;

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

export async function getOthersProfile(userId: string | number) {
  const { data } = await instance.get<ApiResponse<any>>(
    `/my-page/profile/${userId}`
  );
  return normalizeOthers(data);
}
