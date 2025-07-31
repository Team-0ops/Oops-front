import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mockPosts = [
  {
    id: 1,
    title: "발표하다가 음이탈",
    content: "근엄하게 발표 시작했는데 음이탈나서 창피",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 9,
    comments: 3,
    views: 120,
    status: "웁스 중"
  },
  {
    id: 2,
    title: "발표공포증",
    content: "사진이 없는 게시물은 이런 식으로 글이 더 길어지게 보이게",
    likes: 10,
    comments: 5,
    views: 200,
    status: "극복 중"
  },
  {
    id: 3,
    title: "제발 발표시키지 말아줘",
    content: "발표뺴고 다 할게요..나 저번에 진짜 어땠냐면",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    status: "극복 완료"
  },
  {
    id: 4,
    title: "진짜 친했던 친구랑 손절했는데 너무 슬프다",
    content: "사진이 없는 게시물은 이런 식으로 글이 조금 더 길어지게 보이게",
    imageUrl: "",
    likes: 10,
    comments: 5,
    views: 200,
    status: "웁스 중"
  },
  {
    id: 5,
    title: "인간관계 힘들다...",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    status: "극복 중"
  },
  {
    id: 6,
    title: "인간관계 힘들다...",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    status: "극복 완료"
  }
];

const RandomFeed = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("웁스 중");

  const filteredPosts = mockPosts.filter((post) => post.status === selectedStatus);

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px]">
      <div className="flex gap-[8px] relative">
        <button onClick={() => navigate("/")}>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold">발표</h2>
        <button className="absolute right-[20px] text-[12px] text-[#B3E378] bg-[#262626] rounded-[8px] px-[9px] py-[8px]">
          '발표' 주제로 글 작성하기
        </button>
      </div>

      <PostStatusTab selected={selectedStatus} onSelect={setSelectedStatus} />

      <div className="flex flex-col gap-[12px]">
        {filteredPosts.map((post) => (
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
