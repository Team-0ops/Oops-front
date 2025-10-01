import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowIcon from "../../assets/icons/Arrow.svg?react";
import { getMyLessons } from "../../apis/mypageApi";
import type { LessonWithPostDto } from "../../types/mypage";

const POST_DETAIL_BASE = "/post";

/* 스크롤바 숨김 */
const HIDE_SCROLLBAR_CSS = `
  .my-scroll-hide::-webkit-scrollbar { display: none; }
  .my-scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

/**
 * 교훈 서버 응답 타입 확장
 * - 게시글 삭제 여부(postStatus)
 * - 이미지 필드 다양한 케이스 대응
 */
type LessonServerDto = LessonWithPostDto & {
  postStatus?: "ACTIVE" | "DELETED" | string | null;

  postImageUrls?: string[] | null;
  postImageUrl?: string | null;
  imageUrls?: Array<
    | string
    | { url?: string; imageUrl?: string; thumbnailUrl?: string; src?: string }
  > | null;

  categoryName?: string | null;
  thumbnailUrl?: string | null;
  title?: string | null;
  content?: string | null;
};

/**
 * 뷰 전용 교훈 타입
 * - 태그 정규화된 배열(_tags)
 * - 게시글 삭제 여부 플래그
 * - 가공된 썸네일 URL
 */
type LessonView = LessonWithPostDto & {
  _tags: string[];
  isPostDeleted: boolean;
  postThumbnailUrl?: string;
};

/* 유틸: 문자열 → URL 유효성 검사 */
const toUrl = (v: any): string | undefined => {
  if (!v) return undefined;
  const s = String(v).trim();
  if (!s) return undefined;
  return /^https?:\/\//i.test(s) ? s : undefined;
};

/* 유틸: 이미지 배열에서 첫 번째 URL 추출 */
const firstFrom = (arr: any[] | null | undefined): string | undefined => {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  const s0 = toUrl(arr[0]);
  if (s0) return s0;
  const obj = arr[0] as any;
  return (
    toUrl(obj?.url) ||
    toUrl(obj?.imageUrl) ||
    toUrl(obj?.thumbnailUrl) ||
    toUrl(obj?.src) ||
    undefined
  );
};

/**
 * 마이페이지 - 내 교훈 목록 페이지
 * - getMyLessons API로 교훈 전체 목록 불러오기
 * - 태그 기반 필터링(토글 chip)
 * - 게시글 삭제 여부에 따른 UI 분기 처리
 * - 삭제된 게시글: "삭제된 게시글입니다." 표시
 * - 삭제되지 않은 게시글: 상세 페이지로 이동 가능
 */
export default function MyLessonsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // 선택된 태그
  const [allLessons, setAllLessons] = useState<LessonView[]>([]); // 전체 교훈 목록
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  /* 서버에서 전체 교훈 로드 */
  const fetchAllLessons = useCallback(async () => {
    try {
      setLoading(true);
      setErr(null);

      const pageSize = 200;
      let page = 0;
      const acc: LessonView[] = [];

      while (true) {
        const { items } = await getMyLessons({ page, size: pageSize });
        const list = (items as unknown as LessonServerDto[]) ?? [];

        const mapped: LessonView[] = list.map((it) => {
          // 태그 정규화
          const tags = Array.isArray(it.tags)
            ? it.tags.map(String).filter(Boolean)
            : [];

          // 게시글 삭제 여부
          const isPostDeleted =
            (it.postStatus ?? "").toString().toUpperCase() === "DELETED" ||
            !it.postId;

          // 교훈/게시글 정보 가공
          const lessonTitle = String(it.lessonTitle ?? it.title ?? "");
          const lessonContent = String(it.lessonContent ?? it.content ?? "");
          const postTitle = String(it.postTitle ?? "");
          const postContent: string | undefined = it.postContent ?? undefined;
          const postCategoryName: string | undefined =
            it.postCategoryName ?? it.categoryName ?? undefined;
          const postThumbnailUrl: string | undefined =
            toUrl(it.postThumbnailUrl) ||
            firstFrom(it.postImageUrls) ||
            firstFrom(it.imageUrls) ||
            toUrl(it.postImageUrl) ||
            toUrl(it.thumbnailUrl) ||
            undefined;

          return {
            ...it,
            lessonTitle,
            lessonContent,
            postTitle,
            postContent,
            postCategoryName,
            postThumbnailUrl,
            _tags: tags,
            isPostDeleted,
          };
        });

        acc.push(...mapped);
        if (!items || list.length < pageSize) break; // 더 이상 페이지 없음
        page += 1;
      }

      setAllLessons(acc);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "교훈 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 최초/탭 복귀 시 재조회
  useEffect(() => {
    fetchAllLessons();
  }, [fetchAllLessons]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchAllLessons();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [fetchAllLessons]);

  /* 교훈에 포함된 모든 태그 집합 */
  const chipTags = useMemo(() => {
    const set = new Set<string>(
      allLessons.flatMap((l) => l._tags).filter(Boolean)
    );
    return Array.from(set);
  }, [allLessons]);

  /* 선택된 태그에 따라 필터링된 교훈 */
  const visibleLessons = useMemo(() => {
    if (!selectedTag) return allLessons;
    return allLessons.filter((l) => l._tags.includes(selectedTag));
  }, [allLessons, selectedTag]);

  /* 태그 토글 핸들러 */
  const toggleTag = (t: string) =>
    setSelectedTag((prev) => (prev === t ? null : t));

  /* 게시글 상세 이동 */
  const navigatePost = (postId?: number, isPostDeleted?: boolean) => {
    if (!postId || isPostDeleted) return;
    navigate(`${POST_DETAIL_BASE}/${postId}`);
  };

  /* 키보드 접근성 지원 */
  const onKeyGoPost = (
    e: KeyboardEvent<HTMLDivElement>,
    postId?: number,
    isPostDeleted?: boolean
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigatePost(postId, isPostDeleted);
    }
  };

  return (
    <section className="p-4">
      <style>{HIDE_SCROLLBAR_CSS}</style>

      {/* 태그 chip */}
      <div className="-mx-4 mb-4 px-4 overflow-x-auto whitespace-nowrap my-scroll-hide">
        <div className="inline-flex gap-[10px]">
          {chipTags.map((t) => {
            const active = selectedTag === t;
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`inline-flex h-[28px] items-center justify-center px-[13px] rounded-full text-[12px] font-semibold transition ${
                  active
                    ? "bg-[#1D1D1D] text-white"
                    : "bg-[#E6E6E6] text-[#1D1D1D]"
                }
                `}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {loading && <p className="p-4">불러오는 중...</p>}
      {err && <p className="p-4 text-red-500">{err}</p>}

      {/* 교훈 카드 목록 */}
      {!loading && !err && (
        <>
          {visibleLessons.length > 0 ? (
            <div className="flex flex-col gap-[20px]">
              {visibleLessons.map((lesson) => {
                const lessonTags = lesson._tags;
                const postCategory =
                  lesson.postCategoryName ??
                  (lesson as any).categoryName ??
                  (lesson.isPostDeleted ? "" : "카테고리 없음");

                return (
                  <div
                    key={lesson.lessonId}
                    className="flex flex-col gap-[0px] w-full"
                  >
                    {/* 게시글 카드 */}
                    {lesson.isPostDeleted ? (
                      <div className="flex items-center justify-between gap-[14px] w-full px-[14px] py-[10px] rounded-[10px] bg-[#F0E7E0]">
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <p className="text-left text-[12px] font-normal text-[#1D1D1D] font-pretendard">
                            삭제된 게시글입니다.
                          </p>
                        </div>
                        <div className="w-[50px] h-[50px] flex-shrink-0" />
                      </div>
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          navigatePost(lesson.postId, lesson.isPostDeleted)
                        }
                        onKeyDown={(e) =>
                          onKeyGoPost(e, lesson.postId, lesson.isPostDeleted)
                        }
                        className="flex items-center justify-between gap-[14px] w-full px-[14px] py-[10px] rounded-[10px] bg-[#F0E7E0] cursor-pointer hover:brightness-95 transition"
                      >
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="truncate text-[16px] font-bold text-[#1D1D1D]">
                              {lesson.postTitle || "제목 없음"}
                            </h4>
                            <span className="text-[12px] text-[#999999] flex-shrink-0">
                              {postCategory}
                            </span>
                          </div>
                          <p
                            className="mt-[4px] text-[12px] text-[#1D1D1D] break-words break-all overflow-hidden"
                            title={lesson.postContent ?? ""}
                          >
                            {lesson.postContent ?? ""}
                          </p>
                        </div>

                        {lesson.postThumbnailUrl ? (
                          <img
                            src={lesson.postThumbnailUrl}
                            alt="썸네일"
                            className="w-[50px] h-[50px] rounded-[4px] object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-[50px] h-[50px]" />
                        )}
                      </div>
                    )}

                    {/* 교훈 카드 */}
                    {lesson.isPostDeleted ? (
                      // 삭제된 게시글은 이동할 수 없음
                      <div
                        className="flex flex-col items-start gap-[10px] w-full px-[13px] py-[12px] rounded-[10px] border border-[#A2E256] bg-[#B3E378] select-text cursor-not-allowed"
                        aria-disabled="true"
                        title="원글이 삭제되어 이동할 수 없습니다."
                      >
                        <div className="flex items-center gap-[6px]">
                          <ArrowIcon className="w-[14px] h-[14px] text-[#1D1D1D]" />
                          <h4 className="text-[14px] font-bold text-[#1D1D1D]">
                            {lesson.lessonTitle}
                          </h4>
                        </div>
                        <div className="w-full flex items-start">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="text-[12px] text-[#1D1D1D] whitespace-pre-line break-words break-all [overflow-wrap:anywhere] overflow-hidden max-w-full">
                              {lesson.lessonContent}
                            </p>
                          </div>

                          {lessonTags.length > 0 && (
                            <div className="ml-[10px] flex gap-[6px] overflow-x-auto whitespace-nowrap my-scroll-hide flex-shrink-0">
                              {lessonTags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-[4px] bg-[#1D1D1D] px-[7px] py-[3px] text-[11px] font-semibold text-white flex-shrink-0 h-fit"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // 삭제되지 않은 게시글만 클릭가능
                      <Link
                        to={`${POST_DETAIL_BASE}/${lesson.postId}`}
                        className="flex flex-col items-start gap-[10px] w-full px-[13px] py-[12px] rounded-[10px] border border-[#A2E256] bg-[#B3E378] hover:brightness-95 transition"
                      >
                        <div className="flex items-center gap-[6px]">
                          <ArrowIcon className="w-[14px] h-[14px] text-[#1D1D1D]" />
                          <h4 className="text-[14px] font-bold text-[#1D1D1D]">
                            {lesson.lessonTitle}
                          </h4>
                        </div>
                        <div className="w-full flex justify-between items-start">
                          <p className="text-[12px] text-[#1D1D1D] whitespace-pre-line">
                            {lesson.lessonContent}
                          </p>
                          {lessonTags.length > 0 && (
                            <div className="ml-[10px] flex gap-[6px] overflow-x-auto whitespace-nowrap my-scroll-hide">
                              {lessonTags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-[4px] bg-[#1D1D1D] px-[7px] py-[3px] text-[11px] font-semibold text-white flex-shrink-0 h-fit"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-[#808080]">
              {selectedTag
                ? `${selectedTag} 교훈이 없습니다.`
                : "작성한 모든 교훈이 없습니다."}
            </p>
          )}
        </>
      )}
    </section>
  );
}
