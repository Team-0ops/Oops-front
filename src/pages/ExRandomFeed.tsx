
import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";

const mockPosts = [
  {
    id: 1,
    title: "노래방 갔다가 썸 깨졌다...",
    content: "로맨틱하게 노래 불러주려고 했는데 내 노래 듣자마자 나가더라",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 40,
    comments: 9,
    views: 359,

  },
  {
    id: 2,
    title: "노래방 점수 인증이요...ㅠㅠ",
    content: "다다다다다다다다다 단 다다다다 다다...",
    likes: 10,
    comments: 5,
    views: 200,

  },
  {
    id: 3,
    title: "전국노래자랑 예선 탈락",
    content: "내가 나가자마자 송해 선생님이 탈락시키는 장면...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 15,
    comments: 6,
    views: 210,

  },
  {
    id: 4,
    title: "비행기 놓침",
    content: "다다다다다다다다다다 단 다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 10,
    comments: 5,
    views: 200,
  
  },
  {
    id: 5,
    title: "제목을 적어요 여기에",
    content: "사진이 없는 게시물은 이런 식으로 글이 조금 더 길어지게 보여요",
    likes: 19,
    comments: 5,
    views: 200,

  },
];

const ExRandomFeed = () => {


  const top3Posts = mockPosts.slice(0, 3);
  const restPosts = mockPosts.slice(3);

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px] ">
      {/* 상단 제목 및 주차 표시 */}
      <div className="flex gap-[8px] relative items-center mb-[10px] ">
        <button>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold ">노래</h2>
        <div className="absolute right-0 text-[#999999] text-[12px]">
          5월 셋째주 랜덤주제
        </div>
      </div>

      {/* 웁스중 극복중 극복완료 버튼 컴포넌트 */}
      <PostStatusTab/>
      

      {/* Top 3 */}
      <div className="flex ">
        <div className="bg-[#B3E378] h-[20px] w-[8px] mr-[8px]"></div>
        <h2 className="text-[14px] font-semibold mb-[10px]">
        최고의 노래 실패담 top 3
        </h2>
      </div>
      <div className="flex flex-col gap-[12px] mb-[20px]">
        {top3Posts.map((post) => (
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

      {/* 조회수 순 */}
      <div className="flex ">
        <div className="bg-[#B3E378] h-[20px] w-[8px] mr-[8px]"></div>
        <h2 className="text-[14px] font-semibold mb-[10px]">
        조회수 순 노래 실패담
        </h2>
      </div>
      <div className="flex flex-col gap-[12px]">
        {restPosts.map((post) => (
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

export default ExRandomFeed;
