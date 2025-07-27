import Carousel from "../components/mainPage/Carousel";
import FeedButton from "../components/mainPage/FeedButton";
import MainFeedList from "../components/mainPage/MainFeedList";

const MainPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[36px]">
        <div className="flex flex-col w-full items-center justify-center gap-[36px] ">
          <Carousel />
          <FeedButton />
        </div>
        <div className="flex flex-col w-full items-center">
          <MainFeedList />
          {/* component를 어떻게 나눌지 고민중... 이후 수정할수도 있어용 베스트 failer랑 즐겨찾기 한 카테고리 부분을 묶을까 나눌까?*/}
        </div>
      </div>
    </>
  );
};

export default MainPage;
