import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";

const mockPosts = [
  {
    id: 1,
    title: "발표하다가 음이탈",
    content: "근엄하게 발표 시작했는데 음이탈나서 창피",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 9,
    comments: 3,
    views: 120,
  },
  {
    id: 2,
    title: "발표공포증",
    content: "사진이 없는 게시물은 이런 식으로 글이 더 길어지게 보이게",
    likes: 10,
    comments: 5,
    views: 200,
  },
    {
    id: 3,
    title: "제발 발표시키지 말아줘",
    content: "발표뺴고 다 할게요..나 저번에 진짜 어땠냐면",
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



const RandomFeed = () => {
  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8]   pt-[17px] px-[20px]">
      <div className="flex gap-[8px]">
        <button>
        <img src="/src/assets/icons/left-point.svg" alt="뒤로가기" className="w-[9.48px] h-[16.97px]" />
      </button> 
      <h2 className="text-[20px] font-semibold">발표</h2>
      <button className=" absolute right-[20px] text-[12px] text-[#B3E378]  bg-[#262626] rounded-[8px] px-[9px] py-[8px]">
        '발표' 주제로 글 작성하기</button>
      </div>

      {/* 웁스중 극복중 극복완료 버튼 컴포넌트 */}
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

export default RandomFeed;
