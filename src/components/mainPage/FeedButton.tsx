import { Link } from "react-router-dom";
import FailWiki from "../../assets/icons/failwiki.svg?react";
import LuckyAmulet from "../../assets/icons/luckyamulet.svg?react";
import RandomFeed from "../../assets/icons/randomfeed.svg?react";
const FeedButton = () => {
  return (
    <>
      <div className="caption1 text-[#FFF] flex items-center justify-center w-full gap-[26px]">
        <Link
          to="/fail-wiki"
          className="w-[94px] h-[93px] bg-[#262626] px-[20px] py-[11px] rounded-[15px]"
        >
          <div className="flex flex-col items-center w-[53px] gap-[4px]">
            <FailWiki className="w-[53px] h-[53px]" />
            <p>실패 위키</p>
          </div>
        </Link>
        <Link
          to="/random-feed"
          className="flex flex-col w-[px] h-[93px] bg-[#262626] px-[13px] py-[11px] rounded-[15px] gap-[4px]"
        >
          <div className="flex flex-col items-center w-[68px] gap-[4px]">
            <RandomFeed className="w-[53px] h-[53px]" />
            <p>랜덤주제 피드</p>
          </div>
        </Link>
        <Link
          to="/lucky-draw"
          className="flex flex-col w-[94px] h-[93px] bg-[#262626] px-[14px] py-[11px] rounded-[15px] gap-[4px]"
        >
          <div className="flex flex-col items-center w-[66px] gap-[4px]">
            <LuckyAmulet className="w-[53px] h-[53px] pt-[4.416px] pr-[13.25px] pb-[5.471px] pl-[13.25px]" />
            <p>행운부적 추첨</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FeedButton;
