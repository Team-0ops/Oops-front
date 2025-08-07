import WikiBestFailerCard from "./WikiBestFailerCard";

const WikiBestFailerList = () => {
  const bestFailers = [
    { id: 1, title: "실패 1" },
    { id: 2, title: "실패 2" },
    { id: 3, title: "실패 3" },
    { id: 4, title: "실패 4" },
    { id: 5, title: "실패 5" },
    { id: 6, title: "실패 6" },
  ];

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
            key={failer.id}
            postId={failer.id}
            text={failer.title}
          />
        ))}
      </div>
    </div>
  );
};

export default WikiBestFailerList;
