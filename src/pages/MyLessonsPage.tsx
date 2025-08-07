import { useState } from "react";

const tags = ["인생 교훈", "회사", "친구", "먹을 거", "위로"];

type Lesson = {
  id: number;
  title: string;
  content: string;
  tag: string;
  bestComment?: string;
  bestCommentWriter?: string;
};

const dummyLessons: Lesson[] = [
  {
    id: 1,
    title: "제목입니다",
    content: "다다다다다다다다다다 단 다다다다다 다다다다다...",
    tag: "인생 교훈",
    bestComment: "암기보다 진짜 내 이야기를 해라",
    bestCommentWriter: "면접 질문",
  },
  {
    id: 2,
    title: "회사에서 야근했는데, 아무도 몰라줬다...",
    content: "진짜 지친다...",
    tag: "회사",
    bestComment: "자기 삶을 지키는 것도 업무입니다",
    bestCommentWriter: "면접 질문",
  },
  {
    id: 3,
    title: "친구에게 서운했던 일",
    content: "말 한 마디에 마음이 다쳐버렸다",
    tag: "친구",
    bestComment: "가까운 사람일수록 말은 조심스럽게",
    bestCommentWriter: "면접 질문",
  },
  {
    id: 4,
    title: "야식 끊어야지 진짜",
    content: "야밤에 떡볶이는 너무 유혹적이야",
    tag: "먹을 거",
    bestComment: "오늘도 실패했지만 내일은 다르겠지",
    bestCommentWriter: "면접 질문",
  },
];

export default function MyLessonsPage() {
  const [tag, setTag] = useState<string | null>(null);
  const filteredLessons = dummyLessons.filter((l) => l.tag === tag);

  return (
    <section className="p-4">
      <div className="flex w-full flex-wrap gap-[10px] mb-4">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`inline-flex items-center justify-center whitespace-nowrap
              h-[28px] px-[13px] rounded-full 
              text-[12px] font-semibold 
              ${
                tag === t
                  ? "bg-[#1D1D1D] text-[#FFFFFF]"
                  : "bg-[#E6E6E6] text-[#1D1D1D]"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 교훈 카드 */}
      {tag ? (
        filteredLessons.length > 0 ? (
          <div className="flex flex-col gap-[12px] items-center">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex flex-col items-center gap-[8px]"
              >
                <div className="w-[335px] rounded-[10px] bg-[#F0E7E0] p-[10px_14px] flex justify-between items-start">
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1D1D1D]">
                      {lesson.title}
                    </h4>
                    <p className="text-[12px] text-[#4D4D4D] truncate w-[250px]">
                      {lesson.content}
                    </p>
                  </div>
                  <span className="text-[12px] text-[#999999]">
                    {lesson.tag}
                  </span>
                </div>

                {lesson.bestComment && (
                  <div className="mt-[6px] ml-[16px] w-[297px] flex flex-col gap-[10px] rounded-[10px] border border-[#A2E256] bg-[#B3E378] px-[13px] py-[12px]">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-[8px]">
                        <span className="text-[16px]">↳</span>
                        <div className="flex flex-col">
                          <p className="text-[12px] font-bold text-[#1D1D1D]">
                            {lesson.bestCommentWriter}
                          </p>
                          <p className="text-[13px] text-[#1D1D1D]">
                            {lesson.bestComment}
                          </p>
                        </div>
                      </div>
                      <button className="rounded-[4px] bg-[#1D1D1D] px-[8px] py-[2px] text-[12px] font-semibold text-[#FFFFFF]">
                        면접
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#808080]">{tag} 교훈이 없습니다.</p>
        )
      ) : (
        <p className="mt-20 text-center text-[#808080]">
          보고 싶은 교훈 태그를 선택해 주세요.
        </p>
      )}
    </section>
  );
}
