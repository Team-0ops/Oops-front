import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const categoryMap: Record<string, string> = {
  small: "작은 일",
  love: "연애",
  relationship: "인간관계",
  travel: "여행",
  school: "학교생활",
  career: "진로/취업",
  work: "회사생활",
  college: "대입/입시",
  money: "재정/돈 관리",
  health: "건강/운동",
  mental: "멘탈관리",
  free: "자유",
};

const mockPosts = [
  {
    id: 1,
    title: "친구 사귀기 힘들어..",
    content: "다우땨땨땨땨...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 9,
    comments: 3,
    views: 120,
    category: "relationship",
    status: "웁스 중"
  },
  {
    id: 2,
    title: "진짜 친했던 친구랑 손절했는데 너무 슬프다",
    content: "사진이 없는 게시물은...",
    likes: 10,
    comments: 5,
    views: 200,
    category: "relationship",
    status: "웁스 중"
  },
  {
    id: 3,
    title: "인간관계 힘들다...",
    content: "다다다다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category: "relationship",
    status: "웁스 중"
  },
  {
    id: 7,
    title: "사소한 실수로 민망했어요",
    content: "엘리베이터 문 열렸는데 혼자 말하다 들켰어요 ㅠ",
    imageUrl: "",
    likes: 5,
    comments: 2,
    views: 55,
    category: "small",
    status: "웁스 중"
  },
  {
    id: 8,
    title: "썸 타던 사람이 갑자기 연락이 끊겼어요",
    content: "왜인지 모르겠지만 너무 속상해요...",
    imageUrl: "",
    likes: 12,
    comments: 4,
    views: 80,
    category: "love",
    status: "웁스 중"
  },
  {
    id: 9,
    title: "여행 가고 싶다",
    content: "갑자기 훌쩍 떠나고 싶네요... 제주도?",
    imageUrl: "",
    likes: 7,
    comments: 1,
    views: 73,
    category: "travel",
    status: "웁스 중"
  }
];

const CategoryFeed = () => {
  const { categoryName } = useParams();
  const displayName = categoryMap[categoryName ?? ""] ?? "알 수 없음";
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("웁스 중");

  const filteredPosts = mockPosts.filter(
    (post) => post.category === categoryName && post.status === selectedStatus
  );

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px]">
      <div className="flex gap-[8px]">
        <button onClick={() => navigate("/")}>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold">{displayName}</h2>
      </div>
      <PostStatusTab selected={selectedStatus} onSelect={setSelectedStatus} />
      <div className="flex flex-col gap-[12px] mt-[16px]">
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

export default CategoryFeed;
