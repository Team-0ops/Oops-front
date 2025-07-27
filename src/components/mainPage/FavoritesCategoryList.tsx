import Star from "../../assets/icons/star.svg?react";
import FeedCard from "./FeedCard";
import ToSeeButton from "./ToSeeButton";

const FavoritesCategoryList = () => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-[4px] items-center">
            <Star />
            <h1 className="h2 flex">즐겨찾기한 카테고리</h1>
          </div>
          <ToSeeButton nav="favorite-feed" />
        </div>
        <div className="flex justify-center items-center">
          <FeedCard />
        </div>
      </div>
    </>
  );
};

export default FavoritesCategoryList;
