import { Link } from "react-router-dom";
import Star from "../../assets/icons/star.svg?react";
import FeedCard from "./FeedCard";

const FavoritesCategoryList = () => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-[4px] items-center">
            <Star />
            <h1 className="flex text-[20px] font-semibold">
              즐겨찾기한 카테고리
            </h1>
          </div>
          <Link
            to="/favorite-feed"
            className="flex w-[75px] h-[30px] py-[3px] justify-center items-center rounded-[20px] border-[1px] border-[#E6E6E6]"
          >
            <span className="text-[#4E4E4E] text-[14px] font-medium leading-[140%]">
              보러가기
            </span>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <FeedCard />
        </div>
      </div>
    </>
  );
};

export default FavoritesCategoryList;
