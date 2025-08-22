import { useNavigate } from "react-router-dom";
import Banner from "../../assets/icons/banner.svg?react";
import type { bannerData } from "../../types/banner";
interface CurrentTopicProps {
  currentTopicInfo: bannerData | boolean;
}
const ThisWeekSlider = ({ currentTopicInfo }: CurrentTopicProps) => {
  const navigate = useNavigate();
  // return (
  //   <>
  //     <div className="w-full h-full bg-[#B3E378]">
  //       <div className="flex flex-col gap-[4px] p-[16px_0px_0px_13px]">
  //         <p className="waguri text-[26px] leading-[1] font-normal">
  //           이번주 랜덤 주제!
  //         </p>
  //         <p className="text-[11.649px] font-normal">랜덤 주제로 실패해보기!</p>
  //       </div>
  //       <Clover className="ml-[218px] mt-[6px] w-[94px] h-[94px]" />
  //     </div>
  //   </>
  // );

  if (typeof currentTopicInfo === "boolean") {
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
        className="waguri absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 
                  text-black text-[68.384px] font-normal leading-normal"
      >
        {currentTopicInfo.topicName}
      </p>
    </div>
  );
};

export default ThisWeekSlider;
