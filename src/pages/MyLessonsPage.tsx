import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowIcon from "../assets/icons/Arrow.svg?react";
import { getMyLessons } from "../apis/mypageApi";
import type { LessonWithPostDto } from "../types/mypage";

const POST_DETAIL_BASE = "/post";

// 가로 스크롤바 숨김
const HIDE_SCROLLBAR_CSS = `
  .my-scroll-hide::-webkit-scrollbar { display: none; } /* Chrome/Safari */
  .my-scroll-hide { 
    -ms-overflow-style: none;  /* IE/Edge */
    scrollbar-width: none;     /* Firefox */
  }
`;

type LessonWithTags = LessonWithPostDto & {
  tags?: string[] | null;
  title?: string | null;
  content?: string | null;
  categoryName?: string | null;
  postCategoryName?: string | null;
  postThumbnailUrl?: string | null;
};
type LessonView = LessonWithTags & { _tags: string[] };

// 태그 빈도
function countFreq(lessons: LessonView[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of lessons.flatMap((l) => l._tags)) {
    m.set(t, (m.get(t) ?? 0) + 1);
  }
  return m;
}

export default function MyLessonsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allLessons, setAllLessons] = useState<LessonView[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  // 로그인한 사용자의 교훈을 모든 페이지에서 모아오기
  const fetchAllLessons = useCallback(async () => {
    try {
      setLoading(true);
      setErr(null);

      const pageSize = 200;
      let page = 0;
      const accMap = new Map<number, LessonView>();

      while (true) {
        const { items } = await getMyLessons({ page, size: pageSize });
        const list = (items as unknown as LessonWithTags[]) ?? [];

        const mapped: LessonView[] = list.map((it) => ({
          ...it,
          _tags: Array.isArray(it.tags)
            ? it.tags.map(String).filter(Boolean)
            : [],
        }));

        for (const it of mapped) {
          accMap.set(Number(it.lessonId ?? Math.random()), it);
        }
        if (!items || list.length < pageSize) break;
        page += 1;
      }

      const acc = Array.from(accMap.values());
      setAllLessons(acc);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "교훈 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 마운트 시 1회 로드
  useEffect(() => {
    fetchAllLessons();
  }, [fetchAllLessons]);

  // 탭 복귀,작성 완료 시 재조회
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchAllLessons();
    };
    const onCreated = () => fetchAllLessons();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("lesson:created", onCreated);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("lesson:created", onCreated);
    };
  }, [fetchAllLessons]);

  // 현재 로그인 사용자의 교훈으로부터만 태그 계산
  const tagFreq = useMemo(() => countFreq(allLessons), [allLessons]);

  const chipTags = useMemo(() => {
    const set = new Set<string>(
      allLessons.flatMap((l) => l._tags).filter(Boolean)
    );
    const arr = Array.from(set);
    arr.sort((a, b) => {
      const fb = tagFreq.get(b) ?? 0;
      const fa = tagFreq.get(a) ?? 0;
      if (fb !== fa) return fb - fa; // 빈도 내림차순
      return a.localeCompare(b, "ko"); // 가나다 순
    });
    return arr.slice(0, 10); // 최대 10개까지만 보이도록
  }, [allLessons, tagFreq]);

  const visibleLessons = useMemo(() => {
    if (!selectedTag) return allLessons;
    return allLessons.filter((l) => l._tags.includes(selectedTag));
  }, [allLessons, selectedTag]);

  const toggleTag = (t: string) =>
    setSelectedTag((prev) => (prev === t ? null : t));

  const goPost = (postId?: number) => {
    if (postId) navigate(`${POST_DETAIL_BASE}/${postId}`);
  };
  const onKeyGoPost = (e: KeyboardEvent<HTMLDivElement>, postId?: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goPost(postId);
    }
  };

  return (
    <section className="p-4">
      <style>{HIDE_SCROLLBAR_CSS}</style>
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
                }`}
                title={tagFreq.get(t) ? `${t} · ${tagFreq.get(t)}건` : t}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {loading && <p className="p-4">불러오는 중...</p>}
      {err && <p className="p-4 text-red-500">{err}</p>}

      {!loading && !err && (
        <>
          {visibleLessons.length > 0 ? (
            <div className="flex flex-col gap-[20px]">
              {visibleLessons.map((lesson) => {
                const lessonTags = lesson._tags;
                const lessonTitle =
                  lesson.lessonTitle ?? lesson.title ?? "교훈 제목 없음";
                const lessonContent =
                  lesson.lessonContent ?? lesson.content ?? "";
                const postCategory =
                  lesson.postCategoryName ??
                  lesson.categoryName ??
                  "카테고리 없음";

                return (
                  <div
                    key={lesson.lessonId}
                    className="flex flex-col gap-0 w-full"
                  >
                    {/* 게시글 카드 */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => goPost(lesson.postId)}
                      onKeyDown={(e) => onKeyGoPost(e, lesson.postId)}
                      className="flex items-center justify-between gap-[12px] rounded-[10px] bg-[#F0E7E0] px-[14px] py-[16px] w-full cursor-pointer hover:brightness-95 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="truncate text-[14px] font-bold text-[#1D1D1D]">
                            {lesson.postTitle || "제목 없음"}
                          </h4>
                          <span className="text-[12px] text-[#999999] flex-shrink-0">
                            {postCategory}
                          </span>
                        </div>
                        <p className="mt-[4px] truncate text-[13px] text-[#1D1D1D]">
                          {lesson.postContent}
                        </p>
                      </div>
                      {lesson.postThumbnailUrl && (
                        <img
                          src={lesson.postThumbnailUrl}
                          alt="썸네일"
                          className="w-[50px] h-[50px] rounded-[4px] object-cover flex-shrink-0"
                        />
                      )}
                    </div>

                    {/* 교훈 카드 */}
                    <Link
                      to={`${POST_DETAIL_BASE}/${lesson.postId}`}
                      className="flex flex-col gap-[8px] rounded-[10px] border border-[#A2E256] bg-[#B3E378] px-[13px] py-[6px] w-full hover:brightness-95 transition"
                    >
                      <div className="flex items-center gap-[6px]">
                        <ArrowIcon className="w-[14px] h-[14px] text-[#1D1D1D]" />
                        <h4 className="text-[13px] font-bold text-[#1D1D1D]">
                          {lessonTitle}
                        </h4>
                      </div>
                      <div className="flex justify-between items-start w-full">
                        <p className="text-[13px] text-[#1D1D1D] whitespace-pre-line flex-1">
                          {lessonContent}
                        </p>
                        {lessonTags.length > 0 && (
                          <div className="ml-[10px] flex gap-[6px] overflow-x-auto max-w-[45%] whitespace-nowrap my-scroll-hide">
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
