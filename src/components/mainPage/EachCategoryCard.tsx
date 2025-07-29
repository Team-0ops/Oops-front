import FeedCard from "./FeedCard";
import ToSeeButton from "./ToSeeButton";

const EachCategoryCard = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between itmes-center w-full">
          <div className="flex gap-[6px] items-center">
            <div className="w-[8px] h-[20px] bg-[#B3E378]">
              {/* 카테고리 이름 옆 바*/}
            </div>
            <span className="body4 text-[#1D1D1D]">카테고리 이름</span>
          </div>

          {/* 카테고리 이름을 Props로 받아서 link 추가 예정 */}
          <ToSeeButton nav="category-feed" />
        </div>
        <div className="flex justify-center items-center">
          <FeedCard />
        </div>
      </div>
    </>
  );
};

export default EachCategoryCard;
