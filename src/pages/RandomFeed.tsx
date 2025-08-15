import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomTopicPosts } from "../apis/categoryPost";
import type { Post } from "../types/post";
import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import type { PostStatus } from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";

const RandomFeed = () => {
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState<PostStatus>("OOPS");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topicName, setTopicName] = useState("랜덤 주제");

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await getRandomTopicPosts(selectedStatus, 0, 10);
        setPosts(res.posts ?? []);
        setTopicName(res.name ?? "랜덤 주제");
      } catch (error) {
        console.error("랜덤 주제 게시글 불러오기 실패:", error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [selectedStatus]);

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px] mb-[50px]">
      <div className="flex gap-[8px] relative">
        <button onClick={() => navigate("/")}>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold">{topicName}</h2>
        <button
          className="absolute right-[1px] text-[12px] text-[#B3E378] bg-[#262626] rounded-[8px] px-[9px] py-[8px]"
          onClick={() =>navigate("/post", {state: { topicName }, 
  })
}
        >
          <span className="font-semibold">'{topicName}'</span> 주제로 글 작성하기
        </button>
      </div>

      <PostStatusTab selected={selectedStatus} onSelect={setSelectedStatus} />

      <div className="flex flex-col gap-[12px] mt-[16px]">
        {isLoading ? (
          <p className="text-center">로딩 중...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-sm text-gray-400">게시글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.postId}
              postId={post.postId}
              title={post.title}
              content={post.content}
              imageUrl={post.image ?? ""}
              likes={post.likes}
              comments={post.comments}
              views={post.views}
              category={post.categoryOrTopicName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RandomFeed;
