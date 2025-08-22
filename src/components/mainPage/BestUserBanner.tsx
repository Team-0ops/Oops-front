import { useNavigate } from "react-router-dom";
import Banner from "../../assets/icons/point-banner.svg?react";
import type { bannerData } from "../../types/banner";
interface PointBannerProps {
  bestUser: bannerData | boolean;
}

const BestUserBanner = ({ bestUser }: PointBannerProps) => {
  const navigate = useNavigate();
  if (typeof bestUser === "boolean") {
    // boolean이면 아무 것도 렌더링하지 않음
    return <></>;
  }
  return (
    <div onClick={() => navigate(`/exrandom-feed`)} className="w-full h-full">
      <Banner />
      <p>{bestUser.topicName}</p>
    </div>
  );
};

export default BestUserBanner;
