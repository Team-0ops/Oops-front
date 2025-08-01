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
    title: "친구 사귀는 게 너무 어렵다",
    content: "낯을 많이 가려서 다가가는 게 힘들어요.",
    imageUrl: "",
    likes: 8,
    comments: 2,
    views: 105,
    category: "relationship",
    status: "웁스 중"
  },
  {
    id: 2,
    title: "단체 생활이 너무 부담돼요",
    content: "사람들과 계속 어울리는 게 피곤해요.",
    imageUrl: "",
    likes: 12,
    comments: 3,
    views: 133,
    category: "relationship",
    status: "웁스 중"
  },
  {
    id: 3,
    title: "친구가 내 말을 잘 안 들어줘요",
    content: "계속 제 이야기를 무시당하는 느낌이에요.",
    imageUrl: "",
    likes: 9,
    comments: 4,
    views: 128,
    category: "relationship",
    status: "웁스 중"
  },
  {
    id: 4,
    title: "모임에서 소외되는 기분이에요",
    content: "항상 마지막에 연락받고 혼자 있는 시간이 많아요.",
    imageUrl: "",
    likes: 11,
    comments: 5,
    views: 150,
    category: "relationship",
    status: "웁스 중"
  },
  {
    id: 5,
    title: "가식적인 인간관계에 지쳤어요",
    content: "진심 없이 웃어주는 사람들과의 관계가 괴로워요.",
    imageUrl: "",
    likes: 14,
    comments: 6,
    views: 178,
    category: "relationship",
    status: "웁스 중"
  },
  {
    id: 6,
    title: "자꾸 사람 눈치를 보게 돼요",
    content: "말 한마디에도 상처받을까 걱정돼요.",
    imageUrl: "",
    likes: 10,
    comments: 2,
    views: 122,
    category: "relationship",
    status: "웁스 중"
  },

  // 극복 중 (6개)
  {
    id: 7,
    title: "조금씩 거리 두기를 연습 중이에요",
    content: "모두와 친하지 않아도 괜찮다고 생각하려고요.",
    imageUrl: "",
    likes: 15,
    comments: 4,
    views: 160,
    category: "relationship",
    status: "극복 중"
  },
  {
    id: 8,
    title: "내 감정을 솔직하게 말해봤어요",
    content: "예전엔 참기만 했는데 이제는 표현하려 해요.",
    imageUrl: "",
    likes: 13,
    comments: 5,
    views: 142,
    category: "relationship",
    status: "극복 중"
  },
  {
    id: 9,
    title: "거절을 배우고 있어요",
    content: "싫은 걸 싫다고 말하는 연습을 하고 있어요.",
    imageUrl: "",
    likes: 17,
    comments: 3,
    views: 170,
    category: "relationship",
    status: "극복 중"
  },
  {
    id: 10,
    title: "친구들과의 소통이 조금씩 나아져요",
    content: "천천히 서로 이해하는 시간을 가지려 해요.",
    imageUrl: "",
    likes: 16,
    comments: 4,
    views: 165,
    category: "relationship",
    status: "극복 중"
  },
  {
    id: 11,
    title: "억지로 맞추던 관계를 정리했어요",
    content: "불편한 관계를 끊고 나니 마음이 편해졌어요.",
    imageUrl: "",
    likes: 19,
    comments: 6,
    views: 180,
    category: "relationship",
    status: "극복 중"
  },
  {
    id: 12,
    title: "속마음을 털어놓을 수 있는 친구가 생겼어요",
    content: "혼자라는 생각이 조금 사라졌어요.",
    imageUrl: "",
    likes: 20,
    comments: 5,
    views: 192,
    category: "relationship",
    status: "극복 중"
  },

  // 극복 완료 (6개)
  {
    id: 13,
    title: "진짜 친구가 누군지 알게 됐어요",
    content: "힘든 시간 끝에 진심을 아는 사람이 남았어요.",
    imageUrl: "",
    likes: 25,
    comments: 4,
    views: 210,
    category: "relationship",
    status: "극복 완료"
  },
  {
    id: 14,
    title: "이젠 나다운 모습으로 지내요",
    content: "억지로 맞추지 않고 있는 그대로 받아줘요.",
    imageUrl: "",
    likes: 22,
    comments: 3,
    views: 198,
    category: "relationship",
    status: "극복 완료"
  },
  {
    id: 15,
    title: "사람들과의 관계가 편해졌어요",
    content: "이제는 대화가 즐겁고 부담이 없어요.",
    imageUrl: "",
    likes: 28,
    comments: 6,
    views: 230,
    category: "relationship",
    status: "극복 완료"
  },
  {
    id: 16,
    title: "내가 소중한 사람이란 걸 알았어요",
    content: "존중받는 관계를 통해 나를 더 사랑하게 됐어요.",
    imageUrl: "",
    likes: 30,
    comments: 7,
    views: 245,
    category: "relationship",
    status: "극복 완료"
  },
  {
    id: 17,
    title: "불필요한 인간관계를 정리했어요",
    content: "진짜 필요한 관계만 남기고 더 행복해졌어요.",
    imageUrl: "",
    likes: 27,
    comments: 5,
    views: 220,
    category: "relationship",
    status: "극복 완료"
  },
  {
    id: 18,
    title: "나도 좋은 친구가 될 수 있다는 걸 느껴요",
    content: "서로 배려하는 관계가 이런 거구나 싶어요.",
    imageUrl: "",
    likes: 26,
    comments: 4,
    views: 215,
    category: "relationship",
    status: "극복 완료"
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
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px] mb-[50px]">
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
