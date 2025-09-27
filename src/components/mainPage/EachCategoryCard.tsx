import { categoryMap } from "../../types/common";
import type { Post } from "../../types/post";
import PostCard from "../common/PostCard";
import ToSeeButton from "./ToSeeButton";
interface EachCategoryCardProps {
  post: Post;
}
/*
  EachCategoryCard 컴포넌트
  각 카테고리 별 post를 하나씩 띄움.

  '보러가기'를 눌렀을 경우 해당 카테고리로 이동하기 위해 common의 categoryMap을 사용하여 navKey를 찾음
  ex) categoryMap = { "study": "스터디", "hobby": "취미" } -> key : url에 사용, value : 화면에 표시되는 카테고리 이름
  PostCard 컴포넌트 사용 -> props로 값 넘겨줌

*/
const EachCategoryCard = ({ post }: EachCategoryCardProps) => {
  const navKey = Object.keys(categoryMap).find(
    (key) => categoryMap[key] === post.categoryOrTopicName
  );

  return (
    <>
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between itmes-center w-full">
          <div className="flex gap-[6px] items-center">
            <div className="w-[8px] h-[20px] bg-[#B3E378]"></div>
            <span className="body4 text-[#1D1D1D]">
              {post?.categoryOrTopicName}
            </span>
          </div>

          <ToSeeButton
            nav={navKey ? `category-feed/${navKey}` : "category-feed"}
          />
        </div>
        <div className="flex justify-center items-center">
          <PostCard
            postId={post.postId}
            title={post.title}
            content={post.content}
            imageUrl={post.image ?? "null"} // null이면 기본 이미지
            likes={post.likes}
            comments={post.comments}
            views={post.views}
            category={post.categoryOrTopicName}
          />
        </div>
      </div>
    </>
  );
};

export default EachCategoryCard;
