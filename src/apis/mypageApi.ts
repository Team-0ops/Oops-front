import instance from "./instance";
import type { ApiResponse } from "../types/api";
import type {
  LessonDto,
  //LessonWithPostDto,
  MyPostDto,
  MyProfileRes,
  PostsSection,
} from "../types/mypage";

// 내 프로필
export const getMyProfile = async (): Promise<MyProfileRes> => {
  const { data } =
    await instance.get<ApiResponse<MyProfileRes>>("/my-page/profile");
    console.log("내정보", data.result)
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

function pickList(result: any): any[] {
  if (Array.isArray(result)) return result;
  if (result?.items && Array.isArray(result.items)) return result.items;
  if (result?.lessons && Array.isArray(result.lessons)) return result.lessons;
  return [];
}
function normalizeLesson(x: any): LessonDto {
  return {
    id: x.id ?? x.lessonId ?? 0,
    title: x.title ?? x.name ?? "",
    content: x.content ?? x.body ?? "",
    tag: Array.isArray(x.tags) ? (x.tags[0] ?? "") : (x.tag ?? ""),
    thumbnailUrl: x.thumbnailUrl ?? x.imageUrl ?? x.thumbnail ?? null,
    bestComment: x.bestComment ?? undefined,
    bestCommentWriter: x.bestCommentWriter ?? undefined,
  };
}
export async function getMyLessons(params?: {
  tag?: string;
  page?: number;
  size?: number;
}) {
  try {
    const { data } = await instance.get<ApiResponse<any>>("/my-page/lessons", {
      params,
    });

    let list = pickList(data.result);
    if (params?.tag) {
      list = list.filter(
        (i: any) =>
          Array.isArray(i.tags) && i.tags.includes(params.tag as string)
      );
    }

    return {
      items: list.map(normalizeLesson) as LessonDto[],
      pageInfo: (data as any).pageInfo,
    };
  } catch (e: any) {
    if (e?.response?.status === 400 || e?.response?.status === 403) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const { data } = await instance.get<ApiResponse<any>>(
          "/my-page/lessons",
          { params: { ...params, userId } }
        );
        let list = pickList(data.result);
        if (params?.tag) {
          list = list.filter(
            (i: any) =>
              Array.isArray(i.tags) && i.tags.includes(params.tag as string)
          );
        }
        return {
          items: list.map(normalizeLesson) as LessonDto[],
          pageInfo: (data as any).pageInfo,
        };
      }
    }
    throw e;
  }
}
