import PostCard from "../components/common/PostCard";

const dummy = Array.from({ length: 3 }).map((_, i) => ({
  id: i,
  title: "제목입니다",
  content: "다다다다다다다다다다 다다다다다 …",
  likes: 10,
  comments: 5,
  views: 200,
  imageUrl: "https://placekitten.com/60/60",
  category: "인간관계",
}));

export default function MyFailuresPage() {
  return (
    <section className="space-y-3 p-4">
      {/* 카테고리 드롭다운은 나중에 */}
      {dummy.map((p) => (
        <PostCard
          key={p.id}
          title={p.title}
          content={p.content} // PostCard는 content 라는 이름으로 받음
          likes={p.likes}
          comments={p.comments}
          views={p.views}
          category={p.category}
          imageUrl={p.imageUrl} // 썸네일 있을 때만
        />
      ))}
    </section>
  );
}
