import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mockPosts = [
  {
    id: 1,
    title: "제목입니다 이게",
    content: "다우땨땨땨땨땨땨땨땨땨댜댜댜댜댜댜댜..",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 9,
    comments: 3,
    views: 120,
    category: "인간관계",
    status: "웁스 중",
  },
  {
    id: 2,
    title: "제목을 적어요 여기에",
    content: "사진이 없는 게시물은 이런 식으로 글이 더 길어지게 보이게",
    likes: 10,
    comments: 5,
    views: 200,
    category: "인간관계",
    status: "극복 중",
  },
  {
    id: 3,
    title: "제목입니다",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category: "일상",
    status: "극복 완료",
  },
  {
    id: 4,
    title: "부장님한테욕함",
    content: "사진이 없는 게시물은 이런 식으로 글이 조금 더 길어지게 보이게",
    imageUrl: "",
    likes: 10,
    comments: 5,
    views: 200,
    category: "회사",
    status: "웁스 중",
  },
  {
    id: 5,
    title: "저번주에헤어짐",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category: "연애",
    status: "극복 중",
  },
  {
    id: 6,
    title: "비행기놓침",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category: "여행",
    status: "극복 완료",
  },
];

const FavoriteFeed = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("웁스 중");

  const filteredPosts = mockPosts.filter(
    (post) => post.status === selectedStatus
  );

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px]">
      <div className="flex gap-[8px]">
        <button onClick={() => navigate("/")}>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold flex gap-[4px]">
          <img src="src/assets/icons/star.svg" alt="" />
          즐겨찾기한 카테고리
        </h2>
      </div>

      <PostStatusTab selected={selectedStatus} onSelect={setSelectedStatus} />

      <div className="flex flex-col gap-[12px] mb-[50px]">
        {filteredPosts.map((post) => (
          <PostCard
            postId={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            views={post.views}
            category={post.category}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteFeed;
