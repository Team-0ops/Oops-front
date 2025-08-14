import { useEffect, useState } from "react";
import type { LessonDto } from "../types/mypage";
import { getMyLessons } from "../apis/mypageApi";

const tags = ["인생 교훈", "회사", "친구", "먹을 거", "위로"];

export default function MyLessonsPage() {
  const [tag, setTag] = useState<string | null>(null);
  const [lessons, setLessons] = useState<LessonDto[]>([]);
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
      <div className="mb-4 flex w-full flex-wrap gap-[10px]">
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
      {/* 상태 표시 */}
      {loading && <p className="p-4">불러오는 중...</p>}
      {err && <p className="p-4 text-red-500">{err}</p>}
      {/* 리스트 */}
      {!loading &&
        !err &&
        (lessons.length > 0 ? (
          <div className="flex flex-col items-center gap-[12px]">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="w-full flex justify-center">
                <div className="relative w-[335px] rounded-[10px] border border-[#A2E256] bg-[#B3E378] px-[13px] py-[12px]">
                  {/* 제목 */}
                  <h4 className="max-w-[240px] truncate text-[14px] font-bold text-[#1D1D1D]">
                    {lesson.title || "제목 없음"}
                  </h4>
                  {/* 내용 */}
                  <p className="mt-[6px] whitespace-pre-line text-[13px] text-[#1D1D1D]">
                    {lesson.content}
                  </p>

                  <span
                    className="
                      absolute right-[14px] bottom-[7px]
                      flex h-[20px] items-end justify-end gap-[10px]
                      rounded-[4px] bg-[#1D1D1D] px-[7px] py-[3px]
                      text-[11px] font-semibold text-white
                      whitespace-nowrap
                    "
                  >
                    {lesson.tag || "태그 없음"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#808080]">
            {tag ? `${tag} 교훈이 없습니다.` : "작성한 모든 교훈이 없습니다."}
          </p>
        ))}
    </section>
  );
}
