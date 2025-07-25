import { useState } from "react";

const tags = ["인생 교훈", "회사", "친구", "먹을 거", "위로"];
export default function MyLessonsPage() {
  const [tag, setTag] = useState<string | null>(null);

  return (
    <section className="p-4">
      {/* 태그 칩 */}
      <div className="flex w-full flex-wrap gap-[10px] mb-4">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`inlineflex items-center justify-center whitespace-nowrap
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

      {tag ? (
        <p className="text-center text-[#808080]">추후 {tag} 교훈 목록 표시</p>
      ) : (
        <p className="mt-20 text-center text-[#808080]">
          보고 싶은 교훈 태그를 선택해 주세요.
        </p>
      )}
    </section>
  );
}
