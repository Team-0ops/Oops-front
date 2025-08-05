import { useState } from "react";
import PostCard from "../components/common/PostCard";
//import PostStatusTab from "../components/FeedPage/PostStatusTab";
import MyStatusTab from "../components/myPage/MyStatusTab";
import type { MyStatus } from "../components/myPage/MyStatusTab";
import CategoryDropdown from "../components/myPage/CategoryDropdown";

type Post = {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  views: number;
  category: string;
};

const dummy: Post[] = [
  {
    id: 1,
    title: "친구 사귀기 힘들어..",
    content: "다우땨땨땨…",
    imageUrl: "https://placekitten.com/60/60",
    likes: 10,
    comments: 5,
    views: 200,
    category: "인간관계",
  },
  {
    id: 2,
    title: "회사 일이 너무 고돼…",
    content: "사진 없는 게시물 예시",
    likes: 8,
    comments: 2,
    views: 76,
    category: "회사생활",
  },
];

const categories = [
  "작은 일",
  "연애",
  "인간관계",
  "학교생활",
  "진로/취업",
  "회사생활",
  "대입/입시",
  "창업",
  "여행",
  "재정/돈관리",
  "건강/운동",
  "멘탈관리",
  "자유",
];

export default function MyFailuresPage() {
  const [tabStatus, setTabStatus] = useState<MyStatus>("oops");
  const [category, setCategory] = useState<string>("");

  const filtered = dummy.filter((p) =>
    category === "" ? true : p.category === category
  );

  return (
    <section className="space-y-3 p-4">
      {/* 상태 탭 */}
      <div className="flex items-center gap-[10px]">
        <MyStatusTab value={tabStatus} onChange={setTabStatus} />
        {/* 카테고리 */}
        <CategoryDropdown
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>

      {/* 게시물 목록 */}
      <div className="flex flex-col gap-[12px]">
        {filtered.map((p) => (
          <PostCard
            key={p.id}
            postId={p.id}
            title={p.title}
            content={p.content}
            likes={p.likes}
            comments={p.comments}
            views={p.views}
            category={p.category}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
