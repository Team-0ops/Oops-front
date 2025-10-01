import instance from "./instance";
import type { ApiResponse } from "../types/api";
import type {
  LessonWithPostDto,
  MyPostDto,
  MyProfileRes,
  PostsSection,
} from "../types/mypage";

/**
 * URL 정규화 유틸
 * - 상대경로/프로필 경로를 절대경로로 변환
 */
function normalizeUrl(u?: string | null) {
  if (!u) return u ?? null;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("user_profile/")) return `${location.origin}/${u}`;
  if (u.startsWith("/")) return `${location.origin}${u}`;
  return `${location.origin}/${u}`;
}

/**
 * URL 캐싱 방지를 위한 bust query 추가
 */
function addBust(u?: string | null) {
  if (!u) return u ?? null;
  const sep = u.includes("?") ? "&" : "?";
  return `${u}${sep}v=${Date.now()}`;
}

/**
 * 내 프로필 조회 API
 */
export const getMyProfile = async (): Promise<MyProfileRes> => {
  const { data } =
    await instance.get<ApiResponse<MyProfileRes>>("/my-page/profile");
  const raw: any = data.result;
  return raw as MyProfileRes;
};

/**
 * 내 프로필 수정 API
 * - userName, 프로필 이미지 파일 업로드 가능
 * - patch 후 location 헤더가 내려오면 재조회
 * - 이미지 URL에 bust query 추가하여 캐싱 방지
 */
export const patchMyProfile = async ({
  userName,
  file,
}: {
  userName?: string | null;
  file?: File | null;
}): Promise<MyProfileRes | null> => {
  const form = new FormData();

  // 유저명은 null 처리 또는 JSON 직렬화
  if (userName === undefined || userName === null || userName === "") {
    form.append("data", "null");
  } else {
    form.append("data", JSON.stringify({ userName }));
  }
  if (file) form.append("profileImage", file);

  const res = await instance.patch<ApiResponse<any>>("/my-page/profile", form, {
    __req_src: "PATCH_PROFILE",
  } as any);
  const bodyResult = (res.data as any)?.result ?? null;

  const locationHeader =
    (res.headers as any)?.location || (res.headers as any)?.Location || null;

  // location 헤더 존재 → 강제 refetch
  if (locationHeader) {
    const { data: freshData } = await instance.get<ApiResponse<MyProfileRes>>(
      "/my-page/profile",
      { __req_src: "AFTER_PATCH_REFETCH" } as any
    );
    const fresh: any = freshData.result ?? null;
    if (fresh) {
      fresh.profileImageUrl =
        fresh.profileImageUrl ?? fresh.profileImage ?? fresh.imageUrl ?? null;
      if (!fresh.profileImageUrl) fresh.profileImageUrl = locationHeader;
      fresh.profileImageUrl = normalizeUrl(addBust(fresh.profileImageUrl));
      return fresh as MyProfileRes;
    }
    return null;
  }

  // bodyResult에 결과 존재 → 변환 처리
  if (bodyResult) {
    const r: any = bodyResult;
    r.profileImageUrl =
      r.profileImageUrl ?? r.profileImage ?? r.imageUrl ?? null;
    if (r.profileImageUrl) {
      r.profileImageUrl = normalizeUrl(addBust(r.profileImageUrl));
    }
    return r as MyProfileRes;
  }

  // 최종 fallback → refetch
  const { data: freshData } = await instance.get<ApiResponse<MyProfileRes>>(
    "/my-page/profile",
    { __req_src: "AFTER_PATCH_REFETCH" } as any
  );
  const fresh: any = freshData.result ?? null;
  if (fresh?.profileImageUrl || fresh?.profileImage || fresh?.imageUrl) {
    fresh.profileImageUrl =
      fresh.profileImageUrl ?? fresh.profileImage ?? fresh.imageUrl ?? null;
    fresh.profileImageUrl = normalizeUrl(addBust(fresh.profileImageUrl));
  }
  return (fresh as MyProfileRes) ?? null;
};

/**
 * 내 게시글 조회 API
 * - situation: OOPS / OVERCOMING / OVERCOME
 * - categoryId 필터링 지원
 * - 응답 구조(배열/section 등)를 통합적으로 flatten 처리
 */
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

export type MyPostStatus = "OOPS" | "OVERCOMING" | "OVERCOME";

/**
 * 쿼리 파라미터 sanitize함수
 */
function sanitizeParams(input?: {
  page?: number;
  size?: number;
  categoryId?: number;
  situation?: MyPostStatus;
}) {
  const out: Record<string, any> = {};
  if (typeof input?.page === "number") out.page = input!.page;
  if (typeof input?.size === "number") out.size = input!.size;
  if (
    input?.categoryId !== undefined &&
    Number.isFinite(Number(input.categoryId))
  ) {
    out.categoryId = Number(input.categoryId);
  }
  if (input?.situation) out.situation = input.situation;
  return out;
}

export const getMyPosts = async (params?: {
  page?: number;
  size?: number;
  categoryId?: number;
  situation?: MyPostStatus;
}) => {
  const query = sanitizeParams(params);
  const { data } = await instance.get<ApiResponse<RawMyPosts>>(
    "/my-page/posts",
    { params: query }
  );

  return {
    isSuccess: data.isSuccess,
    code: data.code,
    message: data.message,
    result: normalizeMyPosts(data.result),
    pageInfo: (data as any).pageInfo ?? undefined,
  };
};

/**
 * 게시글 응답 구조를 통합적으로 flatten
 */
function normalizeMyPosts(result: RawMyPosts): MyPostDto[] {
  if (isPostArray(result)) return result;
  if (isSectionArray(result)) return result.flatMap((sec) => sec.posts ?? []);
  if (isSection(result)) return result.posts ?? [];
  return [];
}

/**
 * API 응답에서 List 추출
 */
function pickList(result: any): any[] {
  if (Array.isArray(result)) return result;
  if (result?.items && Array.isArray(result.items)) return result.items;
  if (result?.lessons && Array.isArray(result.lessons)) return result.lessons;
  return [];
}

/**
 * 교훈 썸네일 추출
 */
function pickFirstImage(x: any): string | null {
  const arr = x?.postImageUrls ?? x?.imageUrls ?? x?.images ?? null;
  if (!Array.isArray(arr) || arr.length === 0) return null;
  if (typeof arr[0] === "string") return arr[0] || null;

  const obj = arr[0] as any;
  return obj?.url ?? obj?.imageUrl ?? obj?.thumbnailUrl ?? obj?.src ?? null;
}

/**
 * 내 교훈 조회 API
 * - 삭제된 게시글 포함 옵션
 * - 태그, 썸네일, 게시글 정보와 함께 매핑
 * - 400/403 에러 발생 시 userId 포함 재조회
 */
export async function getMyLessons(params?: { page?: number; size?: number }) {
  const query = {
    page: params?.page,
    size: params?.size,
    includeDeletedPosts: true, // 삭제된 게시글의 교훈도 포함
  };

  const mapLessons = (list: any[]): LessonWithPostDto[] =>
    list.map((x: any): LessonWithPostDto => {
      const tags: string[] = Array.isArray(x.tags)
        ? (x.tags as (string | null | undefined)[]).filter(
            (t): t is string => !!t && t.trim() !== ""
          )
        : [];
      const firstTag =
        (tags.length ? tags[0] : null) ??
        (typeof x.tag === "string" ? x.tag : "") ??
        "";

      const rawThumb =
        x.postThumbnailUrl ??
        pickFirstImage(x) ??
        x.postImageUrl ??
        x.thumbnailUrl ??
        null;
      const thumb = rawThumb ? normalizeUrl(rawThumb) : null;

      return {
        lessonId: x.lessonId ?? 0,
        lessonTitle: x.title ?? "",
        lessonContent: x.content ?? "",
        tags,
        tag: firstTag,

        postId: x.postId ?? 0,
        postTitle: x.postTitle ?? "",
        postContent: x.postContent ?? "",
        postCategoryName: x.categoryName ?? "",
        postThumbnailUrl: thumb,

        bestComment: x.bestComment ?? undefined,
        bestCommentWriter: x.bestCommentWriter ?? undefined,
        createdAt: x.createdAt ?? undefined,
      };
    });

  try {
    const { data } = await instance.get<ApiResponse<any>>("/my-page/lessons", {
      params: query,
    });
    const list = pickList(data.result);
    return { items: mapLessons(list), pageInfo: (data as any).pageInfo };
  } catch (e: any) {
    // 일부 권한 문제 발생 시 userId 포함 재조회
    if (e?.response?.status === 400 || e?.response?.status === 403) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const { data } = await instance.get<ApiResponse<any>>(
          "/my-page/lessons",
          {
            params: { ...query, userId },
          }
        );
        const list = pickList(data.result);
        return { items: mapLessons(list), pageInfo: (data as any).pageInfo };
      }
    }
    throw e;
  }
}
