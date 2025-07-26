import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PostCard from "../components/common/PostCard";

/* 아이콘 & 프로필 이미지 */
import LeftArrow from "../assets/icons/left-point.svg?react";
import othersProfile from "../assets/icons/othersprofile.svg";

/* 더미 게시물 데이터 */
const posts = [
  {
    id: 1,
    title: "제목입니다",
    content: "다다다다다다다다다다 다다다다다…",
    imageUrl: "https://placekitten.com/60/60",
    likes: 10,
    comments: 5,
    views: 200,
    category: "인간관계",
  },
  /* 필요 시 추가 */
];

/* 베스트 failures 더미 */
const bestFails = [
  "내가 있잖아?",
  "지금 너무나도 힘들다…",
  "알바 졸업하기 실패 때",
  "꿀밤 전수해줄게",
  "그냥 안먹게 돼 …",
  "말말말이 하는 어쩌면 나마 미안하네",
];

export default function OthersProfilePage() {
  const { userId } = useParams();

  /* 더미 데이터 */
  const dummyUser = { id: "demo", nickname: "닉네임1", avatar: othersProfile };
  const dummyPosts = posts; //
  const dummyBest = bestFails;

  /* 실제 API 호출 로직 */
  // const { data: user } = useQuery(["user", userId], fetchUser, { enabled: false });

  /* UI 렌더링 – 아직 API가 없어서 더미데이터 사용 */
  const user = dummyUser;

  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFBF8] flex flex-col">
      <Navbar />

      <div className="flex items-center gap-[4px] px-[20px] pt-[17px]">
        <button onClick={() => nav(-1)} aria-label="뒤로가기">
          <LeftArrow className="h-5 w-5" />
        </button>
        <h2 className="text-[20px] font-semibold text-[#1D1D1D] leading-none">
          닉네임1 님의 프로필
        </h2>
      </div>

      <div className="flex items-center gap-[20px] px-[20px] pt-[20px]">
        <img
          src={othersProfile}
          alt="프로필 이미지"
          className="h-[100px] w-[100px] rounded-full object-cover"
        />
        <p className="text-[20px] font-semibold text-[#1D1D1D]">닉네임</p>
      </div>
      <div className="mt-[20px] flex flex-col gap-[12px] px-[20px]">
        {posts.map((p) => (
          <PostCard
            key={p.id}
            title={p.title}
            content={p.content}
            imageUrl={p.imageUrl}
            likes={p.likes}
            comments={p.comments}
            views={p.views}
            category={p.category}
          />
        ))}
      </div>

      {/* 베스트 failures */}
      <div className="mt-[32px] px-[20px]">
        <h3 className="mb-[12px] text-[16px] font-semibold">베스트 failers</h3>
        <ul className="divide-y divide-[#E6E6E6] rounded-[4px] bg-[#F9F5F1]">
          {bestFails.map((title) => (
            <li key={title} className="px-[14px] py-[10px] text-[14px]">
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow" />
      <Footer />
    </div>
  );
}
