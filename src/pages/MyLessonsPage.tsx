import { useState } from "react";

const tags = ["인생 교훈", "회사", "친구", "먹을 거", "위로"];
export default function MyLessonsPage() {
  const [tag, setTag] = useState<string | null>(null);

  return (
    <section className="p-4">
      {/* 태그 칩 */}
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`rounded-full px-3 py-1 text-sm ${
              tag === t
                ? "bg-green-400 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tag ? (
        <p className="text-center text-gray-500">추후 {tag} 교훈 목록 표시</p>
      ) : (
        <p className="mt-20 text-center text-gray-400">
          보고 싶은 교훈 태그를 선택해 주세요.
        </p>
      )}
    </section>
  );
}
