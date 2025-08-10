import instance from "./instance";
import type { ApiResponse } from "../types/api";
import type { MyPostDto, MyProfileRes, PostsSection } from "../types/mypage";

// 내 프로필
export const getMyProfile = async (): Promise<MyProfileRes> => {
  const { data } =
    await instance.get<ApiResponse<MyProfileRes>>("/my-page/profile");
  return data.result;
};

type RawMyPosts =
  | MyPostDto[]
  | PostsSection<MyPostDto>
  | PostsSection<MyPostDto>[];

function isSection(x: unknown): x is PostsSection<MyPostDto> {
  return (
    !!x &&
    typeof x === "object" &&
    "posts" in (x as any) &&
    Array.isArray((x as any).posts)
  );
}
function isSectionArray(x: unknown): x is PostsSection<MyPostDto>[] {
  return Array.isArray(x) && (x.length === 0 || isSection(x[0]));
}
function isPostArray(x: unknown): x is MyPostDto[] {
  return Array.isArray(x) && (x.length === 0 || "postId" in (x[0] as any));
}

export const getMyPosts = async (params?: {
  page?: number;
  size?: number;
  categoryId?: number;
}) => {
  const { data } = await instance.get<ApiResponse<RawMyPosts>>(
    "/my-page/posts",
    { params }
  );

  return {
    isSuccess: data.isSuccess,
    code: data.code,
    message: data.message,
    result: normalizeMyPosts(data.result),
  };
};

function normalizeMyPosts(result: RawMyPosts): MyPostDto[] {
  if (isPostArray(result)) return result; // 이미 포스트 배열이면 그대로
  if (isSectionArray(result)) return result.flatMap((sec) => sec.posts ?? []); // 섹션 배열 → 평탄화
  if (isSection(result)) return result.posts ?? []; // 단일 섹션
  return [];
}
