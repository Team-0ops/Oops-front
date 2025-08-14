import { useEffect, useState } from "react";
import type { LessonWithPostDto } from "../types/mypage";
import { getMyLessons } from "../apis/mypageApi";
import ArrowIcon from "../assets/icons/Arrow.svg?react";

const tags = ["인생 교훈", "회사", "친구", "먹을 거", "위로"];

export default function MyLessonsPage() {
  const [tag, setTag] = useState<string | null>(null);
  const [lessons, setLessons] = useState<LessonWithPostDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const params: any = { page: 0, size: 10 };
        if (tag) params.tag = tag;
        const { items } = await getMyLessons(params);
        setLessons(items);
      } catch (e: any) {
        setErr(
          e?.response?.data?.message || "교훈 목록을 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [tag]);

  return (
    <section className="p-4">
      {/* 태그 필터 */}
      <div className="mb-4 flex flex-wrap gap-[10px]">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`inline-flex h-[28px] items-center justify-center whitespace-nowrap px-[13px] rounded-full text-[12px] font-semibold ${
              tag === t
                ? "bg-[#1D1D1D] text-[#FFFFFF]"
                : "bg-[#E6E6E6] text-[#1D1D1D]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && <p className="p-4">불러오는 중...</p>}
      {err && <p className="p-4 text-red-500">{err}</p>}

      {!loading && !err && (
        <>
          {lessons.length > 0 ? (
            <div className="flex flex-col gap-[20px]">
              {lessons.map((lesson) => (
                <div
                  key={lesson.lessonId}
                  className="flex flex-col gap-0 w-full"
                >
                  {/* 게시글 카드 */}
                  <div className="flex items-center justify-between gap-[12px] rounded-[10px] bg-[#F0E7E0] px-[14px] py-[16px] w-full">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="truncate text-[14px] font-bold text-[#1D1D1D]">
                          {lesson.postTitle || "제목 없음"}
                        </h4>
                        <span className="text-[12px] text-[#999999] flex-shrink-0">
                          {lesson.postCategoryName || "카테고리 없음"}
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
                  <div className="flex flex-col gap-[8px] rounded-[10px] border border-[#A2E256] bg-[#B3E378] px-[13px] py-[6px] w-full">
                    {/* 화살표 + 제목 */}
                    <div className="flex items-center gap-[6px]">
                      <ArrowIcon className="w-[14px] h-[14px] text-[#1D1D1D]" />
                      <h4 className="text-[13px] font-bold text-[#1D1D1D]">
                        {lesson.lessonTitle || "교훈 제목 없음"}
                      </h4>
                    </div>

                    {/* 본문 + 태그를 같은 줄에 */}
                    <div className="flex justify-between items-start w-full">
                      <p className="text-[13px] text-[#1D1D1D] whitespace-pre-line flex-1">
                        {lesson.lessonContent}
                      </p>
                      {lesson.tag && (
                        <span className="ml-[10px] rounded-[4px] bg-[#1D1D1D] px-[7px] py-[3px] text-[11px] font-semibold text-white flex-shrink-0 h-fit">
                          {lesson.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#808080]">
              {tag ? `${tag} 교훈이 없습니다.` : "작성한 모든 교훈이 없습니다."}
            </p>
          )}
        </>
      )}
    </section>
  );
}
