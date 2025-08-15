import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/common/PostCard";
import { getBestFailersFeed } from "../apis/categoryPost"; 
import type { Post } from "../types/post";
import LeftArrow from "../assets/icons/left-point.svg?react";

const BestFeed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBestFailersFeed(0, 10); 
        console.log("응답 posts:", data);
        setPosts(data);
      } catch (err) {
        console.error("베스트 피드 조회 실패:", err);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px]">
      <div className="flex gap-[8px]">
        <button onClick={() => navigate("/")}>
          <LeftArrow  className="w-[9.48px] h-[16.97px] mb-[20px]"/>
        </button>
        <h2 className="text-[20px] font-semibold mb-[20px]">베스트 Failers</h2>
      </div>

      {isLoading ? (
        <div className="text-center py-10">로딩 중...</div>
      ) : (
        <div className="flex flex-col gap-[12px]">
          {posts.map((post) => {
            if (!post?.postId || !post?.title) {
              console.warn("잘못된 post 데이터:", post);
              return null;
            }

            return (
              <PostCard
                key={post.postId}
                postId={post.postId}
                title={post.title}
                content={post.content}
                imageUrl={post.image ?? ""}
                likes={post.likes}
                comments={post.comments}
                views={post.views}
                category={post.categoryOrTopicName ?? ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BestFeed;
