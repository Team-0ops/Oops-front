import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";

import { getLastWeekRandomTopicPosts, type LastWeekRandomTopicResponse } from "../apis/categoryPost";
import type { Post } from "../types/post";
import type { PostStatus } from "../components/FeedPage/PostStatusTab";

const ExRandomFeed = () => {
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState<PostStatus>("OOPS");
  const [top3Posts, setTop3Posts] = useState<Post[]>([]);
  const [restPosts, setRestPosts] = useState<Post[]>([]);
  const [topicName, setTopicName] = useState<string>("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("=== [ExRandomFeed] API 호출 시작 ===");
      try {
        const data: LastWeekRandomTopicResponse[] = await getLastWeekRandomTopicPosts(
          selectedStatus,
          0,
          10
        );

        const top3 = data?.[0]?.posts ?? [];
        const rest = data?.[1]?.posts ?? [];
        const topic =
          top3[0]?.categoryOrTopicName ||
          rest[0]?.categoryOrTopicName ||
          "";

        console.log("API 응답 top3:", top3);
        console.log("API 응답 rest:", rest);

        setTop3Posts(top3);
        setRestPosts(rest);
        setTopicName(topic);
        setIsError(false);
      } catch (error) {
        console.error("❌ 이전 랜덤주제 피드 불러오기 실패:", error);
        setTop3Posts([]);
        setRestPosts([]);
        setTopicName("");
        setIsError(true);
      } finally {
        console.log("=== [ExRandomFeed] API 호출 끝 ===");
      }
    };

    fetchData();
  }, [selectedStatus]);

  return (
    <div className="w-full min-h-screen mx-auto bg-[#FFFBF8] pt-[17px]">
      {/* 뒤로가기 + 주제명 + 주차 정보 */}
      <div className="flex gap-[8px] relative items-center mb-[10px]">
        <button onClick={() => navigate("/")}>
          <LeftArrow className="w-[9.48px] h-[16.97px] relative top-[1.5px]" />
        </button>
        <h2 className="text-[20px] font-semibold">{topicName || "랜덤 주제"}</h2>
        <div className="absolute right-0 text-[#999999] text-[12px]">
          8월 셋째주 랜덤주제
        </div>
      </div>

      {/* 상태 탭 */}
      <PostStatusTab selected={selectedStatus} onSelect={setSelectedStatus} />

      {isError ? (
        <p className="text-center text-sm text-gray-400 mt-[20px]">
          데이터를 불러올 수 없습니다.
        </p>
      ) : (
        <>
          {/* Top3 */}
          <div className="flex">
            <div className="bg-[#B3E378] h-[20px] w-[8px] mr-[8px]"></div>
            <h2 className="text-[14px] font-semibold mb-[10px]">
              최고의 {topicName} 실패담 top 3
            </h2>
          </div>
          <div className="flex flex-col gap-[12px] mb-[20px]">
            {top3Posts.length === 0 ? (
              <p className="text-center text-sm text-gray-400">
                게시글이 없습니다.
              </p>
            ) : (
              top3Posts.map((post) => (
                <PostCard
                  key={post.postId}
                  postId={post.postId}
                  title={post.title}
                  content={post.content}
                  imageUrl={post.image ?? undefined}
                  likes={post.likes}
                  comments={post.comments}
                  views={post.views}
                  category={post.categoryOrTopicName}
                />
              ))
            )}
          </div>

          {/* 조회수 순 */}
          <div className="flex">
            <div className="bg-[#B3E378] h-[20px] w-[8px] mr-[8px]"></div>
            <h2 className="text-[14px] font-semibold mb-[10px]">
              조회수 순 {topicName} 실패담
            </h2>
          </div>
          <div className="flex flex-col gap-[12px]">
            {restPosts.length === 0 ? (
              <p className="text-center text-sm text-gray-400">
                게시글이 없습니다.
              </p>
            ) : (
              restPosts.map((post) => (
                <PostCard
                  key={post.postId}
                  postId={post.postId}
                  title={post.title}
                  content={post.content}
                  imageUrl={post.image ?? undefined}
                  likes={post.likes}
                  comments={post.comments}
                  views={post.views}
                  category={post.categoryOrTopicName}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExRandomFeed;
