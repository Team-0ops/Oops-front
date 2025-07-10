import FeedCard from "./FeedCard"

const BestFailerList = () => {
    return(
        <>
            <div className="flex flex-col w-full justify-center items-center gap-[16px]">
                <div className="flex w-full justify-between items-center">
                    <h1 className="flex text-[20px] font-semibold">베스트 Failer</h1>
                    <button className="flex w-[75px] h-[30px] py-[3px] justify-center items-center rounded-[20px] border-[1px] border-[#E6E6E6]">
                        <span className="text-[#4E4E4E] text-[14px] font-medium leading-[140%]">보러가기</span>
                    </button>
                </div>
                <div className="flex justify-center items-center">
                        <FeedCard />
                </div>
            </div>
        </>
    );

}

export default BestFailerList;