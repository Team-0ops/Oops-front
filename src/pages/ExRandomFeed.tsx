import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";

import { getLastWeekRandomTopicPosts } from "../apis/categoryPost";
import type { Post } from "../types/post";
import type { PostStatus } from "../components/FeedPage/PostStatusTab"; // ❗️경로 절대 변경 금지

const ExRandomFeed = () => {
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState<PostStatus>("OOPS");
  const [posts, setPosts] = useState<Post[]>([]);
  const [topicName, setTopicName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { posts, name } = await getLastWeekRandomTopicPosts(
          selectedStatus,
          0,
          10
        );
        setPosts(posts);
        setTopicName(name);
      } catch (error) {
        console.error("이전 랜덤주제 피드 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [selectedStatus]);

  const top3Posts = posts.slice(0, 3);
  const restPosts = posts.slice(3);

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px]">
      {/* 🔙 뒤로가기 + 주제명 + 주차 정보 */}
      <div className="flex gap-[8px] relative items-center mb-[10px]">
        <button onClick={() => navigate("/")}>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold">{topicName}</h2>
        <div className="absolute right-0 text-[#999999] text-[12px]">
          5월 셋째주 랜덤주제
        </div>
      </div>

      {/* 🔘 상태 탭 */}
      <PostStatusTab selected={selectedStatus} onSelect={setSelectedStatus} />

      {/* 🔺 Top3 */}
      <div className="flex">
        <div className="bg-[#B3E378] h-[20px] w-[8px] mr-[8px]"></div>
        <h2 className="text-[14px] font-semibold mb-[10px]">
          최고의 {topicName} 실패담 top 3
        </h2>
      </div>
      <div className="flex flex-col gap-[12px] mb-[20px]">
        {top3Posts.map((post) => (
          <PostCard
            key={post.postId}
            postId={post.postId}
            title={post.title}
            content={post.content}
            imageUrl={post.image ?? undefined}
            likes={post.likes}
            comments={post.comments}
            views={post.views}
            category={post.categoryName}
          />
        ))}
      </div>

      {/* 🔽 나머지 피드 */}
      <div className="flex">
        <div className="bg-[#B3E378] h-[20px] w-[8px] mr-[8px]"></div>
        <h2 className="text-[14px] font-semibold mb-[10px]">
          조회수 순 {topicName} 실패담
        </h2>
      </div>
      <div className="flex flex-col gap-[12px]">
        {restPosts.map((post) => (
          <PostCard
            key={post.postId}
            postId={post.postId}
            title={post.title}
            content={post.content}
            imageUrl={post.image ?? undefined}
            likes={post.likes}
            comments={post.comments}
            views={post.views}
            category={post.categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default ExRandomFeed;
