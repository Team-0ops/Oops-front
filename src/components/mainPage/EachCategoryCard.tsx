import FeedCard from "./FeedCard"

const EachCategoryCard = () => {
    return(
        <>
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between itmes-center w-full">
                <div className="flex gap-[6px] items-center">
                    <div className="w-[8px] h-[20px] bg-[#B3E378]">
                    {/* 카테고리 이름 옆 바*/}
                    </div>
                    <span className="text-[#1D1D1D] text-[14px] font-semibold leading-normal">카테고리 이름</span>
                </div>
                <button className="flex w-[75px] h-[30px] py-[3px] justify-center items-center rounded-[20px] border-[1px] border-[#E6E6E6]">
                    <span className="text-[#4E4E4E] text-[14px] font-medium leading-[140%]">보러가기</span>
                </button>   
                </div>
                <div className="flex justify-center items-center">
                        <FeedCard/>
                </div>
            </div>
        </>
    )
};

export default EachCategoryCard;