import WikiResultCard from "./WikiResultCard";

const WikiResult = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-[26px]">
        <WikiResultCard />
        <div className="body5 text-[#999] px-[13px] py-[3px] rounded-[20px] border-[1px] border-[#B3B3B3] itmes-center ">
          관련 실패담 보러가기
        </div>
      </div>
    </>
  );
};

export default WikiResult;
