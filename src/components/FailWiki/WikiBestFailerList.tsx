import type { BestFailers } from "../../types/post";
import WikiBestFailerCard from "./WikiBestFailerCard";
interface WikiBestFailerListProps {
  bestFailers: BestFailers[];
}

const WikiBestFailerList = ({ bestFailers }: WikiBestFailerListProps) => {
  return (
    <div className="-mx-[38px]">
      {/* 타이틀 */}
      <div className="body2 flex w-full h-[39px] items-center bg-[#FBF3EC] px-[38px] border-b border-[#E9E5E2]">
        <p>베스트 failers</p>
      </div>

      {/* 카드 리스트 */}
      <div className="flex flex-col">
        {bestFailers.map((failer) => (
          <WikiBestFailerCard
            key={failer.postId}
            postId={failer.postId}
            text={failer.title}
          />
        ))}
      </div>
    </div>
  );
};

export default WikiBestFailerList;
