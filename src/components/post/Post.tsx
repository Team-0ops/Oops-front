import ReportIcon from "../../assets/icons/ReportIcon.svg?react";
import Report from "../modals/Report";
import Feedback from "../modals/Feedback";

const Post = () => {
  return (
    <div className="flex justify-between w-full items-center gap-[51px]">
      <div className="flex items-center gap-[6px] font-[pretendard]">
        {/* 이미지 */}
        <div className="bg-[#9a9a9a] w-[140px] h-[46px]"></div>
        <div className="flex flex-col leading-tight">
          <span className="text-[#1d1d1d] text-[16px] font-semibold">회사가기시러</span>
          <span className="text-[#999999] text-[14px]">3일 전 or 18:09</span>
        </div>
      </div>

      <div className="">
        <button>
            교훈 작성 
        </button>
        <button>
            <ReportIcon />
            
        </button>
      </div>
    </div>
  );
};

export default Post;
