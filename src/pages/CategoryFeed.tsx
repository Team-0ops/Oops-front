import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";
import { useParams } from "react-router-dom";


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
    content: "다우땨땨땨땨땨땨땨땨땨댜댜댜댜댜댜댜..",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 9,
    comments: 3,
    views: 120,
    category: "relationship"
  },
  {
    id: 2,
    title: "진짜 친했던 친구랑 손절했는데 너무 슬프다",
    content: "사진이 없는 게시물은 이런 식으로 글이 더 길어지게 보이게",
    likes: 10,
    comments: 5,
    views: 200,
    category: "relationship"
  },
  {
    id: 3,
    title: "인간관계 힘들다...",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category: "relationship"
  },
  {
    id: 4,
    title: "진짜 친했던 친구랑 손절했는데 너무 슬프다",
    content: "사진이 없는 게시물은 이런 식으로 글이 조금 더 길어지게 보이게",
    imageUrl: "",
    likes: 10,
    comments: 5,
    views: 200,
    category: "relationship"
  },
  {
    id: 5,
    title: "인간관계 힘들다...",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category: "relationship"
  },
  {
    id: 6,
    title: "인간관계 힘들다...",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category: "relationship"
  },
  {
    id: 7,
    title: "사소한 실수로 민망했어요",
    content: "엘리베이터 문 열렸는데 혼자 말하다 들켰어요 ㅠ",
    imageUrl: "",
    likes: 5,
    comments: 2,
    views: 55,
    category: "small"
  },
  {
    id: 8,
    title: "썸 타던 사람이 갑자기 연락이 끊겼어요",
    content: "왜인지 모르겠지만 너무 속상해요...",
    imageUrl: "",
    likes: 12,
    comments: 4,
    views: 80,
    category: "love"
  },
  {
    id: 9,
    title: "여행 가고 싶다",
    content: "갑자기 훌쩍 떠나고 싶네요... 제주도?",
    imageUrl: "",
    likes: 7,
    comments: 1,
    views: 73,
    category: "travel"
  },
  {
    id: 10,
    title: "시험 망쳤다...",
    content: "하필 공부 안 한 부분이 나옴ㅋㅋ",
    imageUrl: "",
    likes: 10,
    comments: 5,
    views: 90,
    category: "school"
  },
  {
    id: 11,
    title: "면접 후기 공유해요",
    content: "스타트업 면접 분위기 좋았어요!",
    imageUrl: "",
    likes: 6,
    comments: 3,
    views: 66,
    category: "career"
  },
  {
    id: 12,
    title: "회사 회식 힘들다...",
    content: "또 2차까지 가는 회식이라니 😢",
    imageUrl: "",
    likes: 8,
    comments: 2,
    views: 77,
    category: "work"
  },
  {
    id: 13,
    title: "수시 최종 결과 나왔어요!",
    content: "합격했습니다 🎉 너무 행복해요!",
    imageUrl: "",
    likes: 20,
    comments: 6,
    views: 150,
    category: "college"
  },
  {
    id: 14,
    title: "이번 달 지출 클났다",
    content: "계좌 잔고 보고 멘붕 옴...",
    imageUrl: "",
    likes: 11,
    comments: 3,
    views: 98,
    category: "money"
  },
  {
    id: 15,
    title: "헬스장 3일 차 인증",
    content: "어깨에 알배김 생겼지만 뿌듯해요",
    imageUrl: "",
    likes: 13,
    comments: 4,
    views: 110,
    category: "health"
  },
  {
    id: 16,
    title: "불안한 요즘, 잘 버티고 있어요",
    content: "작은 루틴 하나하나가 버팀목이에요.",
    imageUrl: "",
    likes: 9,
    comments: 1,
    views: 60,
    category: "mental"
  },
  {
    id: 17,
    title: "그냥 하고 싶은 말 쓰는 곳",
    content: "아무말 대잔치 🤪",
    imageUrl: "",
    likes: 4,
    comments: 0,
    views: 40,
    category: "free"
  }
];

const CategoryFeed = () => {
  const { categoryName } = useParams();
  const displayName = categoryMap[categoryName ?? ""] ?? "알 수 없음";
  const filteredPosts = mockPosts.filter(post => post.category === categoryName);



  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px] px-[20px]">
      <div className="flex gap-[8px]">
        <button>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold">{displayName}</h2>
      </div>
      <PostStatusTab />
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
