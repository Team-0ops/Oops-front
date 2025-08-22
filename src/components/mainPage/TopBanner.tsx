import { useNavigate } from "react-router-dom";
import Banner from "../../assets/icons/failer-banner.svg?react";
import type { bannerData } from "../../types/banner";
interface LastTopicProps {
  lastTopicInfo: bannerData | boolean;
}
const TopBanner = ({ lastTopicInfo }: LastTopicProps) => {
  const navigate = useNavigate();
  if (typeof lastTopicInfo === "boolean") {
    // boolean이면 아무 것도 렌더링하지 않음
    return <></>;
  }
  return (
    <div
      onClick={() => navigate(`/random-feed`)}
      className="relative w-full h-full"
    >
      <Banner className="w-full h-auto" />
      <p
        className="waguri absolute left-[48%] top-[55%] -translate-x-1/2 -translate-y-1/2 
                  text-black text-[40px] font-normal leading-normal"
      >
        {lastTopicInfo.topicName}
      </p>
    </div>
  );
};

export default TopBanner;
