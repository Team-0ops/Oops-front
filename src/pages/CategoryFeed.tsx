import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";

const mockPosts = [
  {
    id: 1,
    title: "친구 사귀기 힘들어..",
    content: "다우땨땨땨땨땨땨땨땨땨댜댜댜댜댜댜댜..",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 9,
    comments: 3,
    views: 120,
  },
  {
    id: 2,
    title: "진짜 친했던 친구랑 손절했는데 너무 슬프다",
    content: "사진이 없는 게시물은 이런 식으로 글이 더 길어지게 보이게",
    likes: 10,
    comments: 5,
    views: 200,
  },
    {
    id: 3,
    title: "인간관계 힘들다...",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
  },
  {
    id: 4,
    title: "진짜 친했던 친구랑 손절했는데 너무 슬프다",
    content: "사진이 없는 게시물은 이런 식으로 글이 조금 더 길어지게 보이게",
    imageUrl: "", // 이미지 없음
    likes: 10,
    comments: 5,
    views: 200,
  },
  {
    id: 5,
    title: "인간관계 힘들다...",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
  },
  {
    id: 6,
    title: "인간관계 힘들다...",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
  },
];



const CategoryFeed = () => {
  return (
    <div className="max-w-[375px] min-h-screen mx-auto bg-[#FFFBF8]   pt-[17px] px-[20px]">
      <div className="flex gap-[8px]">
        <button>
        <img src="/src/assets/icons/left-point.svg" alt="뒤로가기" className="w-[9.48px] h-[16.97px]" />
      </button> 
      <h2 className="text-[20px] font-semibold">인간관계 카테고리</h2>
      </div>

      {/* 웁스중 극복중 극본완료 버튼 컴포넌트 */}
      <PostStatusTab/>
      
      {/* 여기에 나중에 게시물 목록 추가 */}

      <div className="flex flex-col gap-[12px]">
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            views={post.views}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryFeed;
