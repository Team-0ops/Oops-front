import { useEffect, useState } from "react";
import type { LessonDto } from "../types/mypage";
import { getMyLessons } from "../apis/mypageApi";

const tags = ["인생 교훈", "회사", "친구", "먹을 거", "위로"];

export default function MyLessonsPage() {
  const [tag, setTag] = useState<string>(tags[0]);
  const [lessons, setLessons] = useState<LessonDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    if (!tag) {
      setLessons([]);
      setErr(null);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        //API 연동
        const { items } = await getMyLessons({ tag, page: 0, size: 10 });
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
      {!tag && (
        <p className="mt-20 text-center text-[#808080]">
          보고 싶은 교훈 태그를 선택해 주세요.
        </p>
      )}
      {tag && loading && <p className="p-4">불러오는 중...</p>}
      {tag && err && <p className="p-4 text-red-500">{err}</p>}

      {/* 리스트 */}
      {tag &&
        !loading &&
        !err &&
        (lessons.length > 0 ? (
          <div className="flex flex-col items-center gap-[12px]">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="w-full flex justify-center">
                {/* 카드 컨테이너에 relative 필수 */}
                <div className="relative w-[335px] rounded-[10px] border border-[#A2E256] bg-[#B3E378] px-[13px] py-[12px]">
                  {/* 제목 */}
                  <h4 className="max-w-[240px] truncate text-[14px] font-bold text-[#1D1D1D]">
                    {lesson.title || "제목 없음"}
                  </h4>
                  {/* 내용 */}
                  <p className="mt-[6px] whitespace-pre-line text-[13px] text-[#1D1D1D]">
                    {lesson.content}
                  </p>

                  {/* ✅ 교훈 태그 배지 (피그마 스타일) */}
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
          <p className="text-center text-[#808080]">{tag} 교훈이 없습니다.</p>
        ))}
    </section>
  );

  // return (
  //   <section className="p-4">
  //     <div className="flex w-full flex-wrap gap-[10px] mb-4">
  //       {tags.map((t) => (
  //         <button
  //           key={t}
  //           onClick={() => setTag(t)}
  //           className={`inline-flex items-center justify-center whitespace-nowrap
  //             h-[28px] px-[13px] rounded-full
  //             text-[12px] font-semibold
  //             ${
  //               tag === t
  //                 ? "bg-[#1D1D1D] text-[#FFFFFF]"
  //                 : "bg-[#E6E6E6] text-[#1D1D1D]"
  //             }`}
  //         >
  //           {t}
  //         </button>
  //       ))}
  //     </div>

  //     {/* 교훈 카드 */}
  //     {tag ? (
  //       filteredLessons.length > 0 ? (
  //         <div className="flex flex-col gap-[12px] items-center">
  //           {filteredLessons.map((lesson) => (
  //             <div
  //               key={lesson.id}
  //               className="flex flex-col items-center gap-[8px]"
  //             >
  //               <div className="w-[335px] rounded-[10px] bg-[#F0E7E0] p-[10px_14px] flex justify-between items-start">
  //                 <div>
  //                   <h4 className="text-[14px] font-bold text-[#1D1D1D]">
  //                     {lesson.title}
  //                   </h4>
  //                   <p className="text-[12px] text-[#4D4D4D] truncate w-[250px]">
  //                     {lesson.content}
  //                   </p>
  //                 </div>
  //                 <span className="text-[12px] text-[#999999]">
  //                   {lesson.tag}
  //                 </span>
  //               </div>

  //               {lesson.bestComment && (
  //                 <div className="mt-[6px] ml-[16px] w-[297px] flex flex-col gap-[10px] rounded-[10px] border border-[#A2E256] bg-[#B3E378] px-[13px] py-[12px]">
  //                   <div className="flex items-start justify-between">
  //                     <div className="flex gap-[8px]">
  //                       <span className="text-[16px]">↳</span>
  //                       <div className="flex flex-col">
  //                         <p className="text-[12px] font-bold text-[#1D1D1D]">
  //                           {lesson.bestCommentWriter}
  //                         </p>
  //                         <p className="text-[13px] text-[#1D1D1D]">
  //                           {lesson.bestComment}
  //                         </p>
  //                       </div>
  //                     </div>
  //                     <button className="rounded-[4px] bg-[#1D1D1D] px-[8px] py-[2px] text-[12px] font-semibold text-[#FFFFFF]">
  //                       면접
  //                     </button>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //       ) : (
  //         <p className="text-center text-[#808080]">{tag} 교훈이 없습니다.</p>
  //       )
  //     ) : (
  //       <p className="mt-20 text-center text-[#808080]">
  //         보고 싶은 교훈 태그를 선택해 주세요.
  //       </p>
  //     )}
  //   </section>
  // );
}
