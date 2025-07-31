import PostCard from "../components/common/PostCard";
import { useNavigate } from "react-router-dom";

const mockPosts = [
  {
    id: 1,
    title: "제목입니다 이게",
    content: "다우땨땨땨땨땨땨땨땨땨댜댜댜댜댜댜댜..",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 9,
    comments: 3,
    views: 120,
    category:"인간관계"
  },
  {
    id: 2,
    title: "제목을 적어요 여기에",
    content: "사진이 없는 게시물은 이런 식으로 글이 더 길어지게 보이게",
    likes: 10,
    comments: 5,
    views: 200,
    category:"인간관계"
  },
    {
    id: 3,
    title: "제목입니다",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category:"일상"
  },
  {
    id: 4,
    title: "부장님한테 욕함",
    content: "사진이 없는 게시물은 이런 식으로 글이 조금 더 길어지게 보이게",
    imageUrl: "", // 이미지 없음
    likes: 10,
    comments: 5,
    views: 200,
    category:"회사"
  },
  {
    id: 5,
    title: "저번주에 헤어짐",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category:"연애"
  },
  {
    id: 6,
    title: "비행기 놓침",
    content: "다다다다다다다다다다 다 다다다다다 다다...",
    imageUrl: "src/assets/icons/Rectangle 1 (1).svg",
    likes: 23,
    comments: 7,
    views: 127,
    category:"여행"
  },
];



const BestFeed = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8]   pt-[17px] ">
      <div className="flex gap-[8px]">
        <button onClick={() => navigate("/")}>
        <img src="/src/assets/icons/left-point.svg" alt="뒤로가기" className="w-[9.48px] h-[16.97px] mb-[20px]" />
      </button> 
      <h2 className="text-[20px] font-semibold mb-[20px]">베스트 Failers</h2>
      </div>

      
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
            category={post.category}
          />
        ))}
      </div>
    </div>
  );
};

export default BestFeed;
