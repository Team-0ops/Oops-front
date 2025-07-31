const WikiCategoryCard = () => {
  return (
    <>
      <div
        className="flex flex-col w-[144px] h-[144px] gap-[18px] items-center 
                   pt-[14px] px-[11px] bg-[#B3E378] rounded-[10px]"
      >
        <div className="caption1 text-[#FFF] px-[13px] py-[6px] bg-[#1D1D1D] rounded-[20px]">
          연애 실패 위키
        </div>
        <div className="caption3 text-[#4D4D4D] flex flex-col gap-[10px]">
          <p>시간이 답이다..극복할 수..</p>
          <p>나를 분발시킬 최고의 시...</p>
          <p>세상의 반이 이성이다 언...</p>
        </div>
      </div>
    </>
  );
};

export default WikiCategoryCard;
