import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostListByCategoryId } from "../apis/categoryPost";
import type { Post } from "../types/post";
import PostCard from "../components/common/PostCard";
import PostStatusTab from "../components/FeedPage/PostStatusTab";
import LeftArrow from "../assets/icons/left-point.svg?react";
import type { PostStatus } from "../components/FeedPage/PostStatusTab";

const categoryData: Record<string, { id: number; label: string }> = {
  daily: { id: 1, label: "일상" },
  love: { id: 2, label: "연애" },
  relationship: { id: 3, label: "인간관계" },
  stock: { id: 4, label: "주식/투자" },
  school: { id: 5, label: "학교생활" },
  work: { id: 6, label: "회사생활" },
  career: { id: 7, label: "진로" },
  startup: { id: 8, label: "창업" },
  college: { id: 9, label: "대입/입시" },
  job: { id: 10, label: "취업/자격증" },
  marriage: { id: 11, label: "결혼" },
  travel: { id: 12, label: "여행" },
  realestate: { id: 13, label: "부동산" },
  mental: { id: 14, label: "정신건강" },
  free: { id: 15, label: "자유" },
};

const CategoryFeed = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const categoryInfo = categoryData[categoryName ?? ""];
  const categoryId = categoryInfo?.id;
  const displayName = categoryInfo?.label ?? "알 수 없음";

  const [selectedStatus, setSelectedStatus] = useState<PostStatus>("OOPS");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!categoryId) {
        console.warn("잘못된 카테고리입니다:", categoryName);
        return;
      }

      setIsLoading(true);
      try {
        const res = await getPostListByCategoryId(categoryId, selectedStatus);
        setPosts(res.result?.posts ?? []);
      } catch (error) {
        console.error("게시글 로딩 실패", error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId, selectedStatus, categoryName]);

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
              category={post.categoryName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryFeed;
