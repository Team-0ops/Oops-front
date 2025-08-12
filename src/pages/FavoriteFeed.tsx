import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getBookmarkedPosts } from "../apis/categoryPost"; // 즐겨찾기한 게시글 API
import type { Post } from "../types/post";

import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";
import type { PostStatus } from "../components/FeedPage/PostStatusTab";

const FavoriteFeed = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<PostStatus>("OOPS");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 게시글 불러오기
  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      setIsLoading(true);
      try {
        const res = await getBookmarkedPosts(selectedStatus);
        setPosts(res.result?.posts ?? []);
      } catch (e) {
        console.error("즐겨찾기 피드 로딩 실패", e);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkedPosts();
  }, [selectedStatus]);

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px]">
      {/* 상단 헤더 */}
      <div className="flex gap-[8px]">
        <button onClick={() => navigate("/")}>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold flex gap-[4px]">
          <img src="src/assets/icons/star.svg" alt="star" />
          즐겨찾기한 카테고리
        </h2>
      </div>

      {/* 상태 탭 */}
      <PostStatusTab selected={selectedStatus} onSelect={setSelectedStatus} />

      {/* 게시글 리스트 */}
      <div className="flex flex-col gap-[12px] mt-[16px] mb-[50px]">
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

export default FavoriteFeed;
