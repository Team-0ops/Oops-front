import Carousel from "../components/mainPage/Carousel";
import FeedButton from "../components/mainPage/FeedButton";
import MainFeedList from "../components/mainPage/MainFeedList";

/*
  MainPage 컴포넌트
  homelayout과 protextedLayout 안에서 사용됨
  - carousel : 이미지 슬라이더 컴포넌트
  - feedButton : 피드 필터 버튼 컴포넌트
  - mainFeedList : 메인 피드 리스트 컴포넌트 (베스트 Failer, 즐겨찾기, 카테고리 목록)
*/

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
        </div>
      </div>
    </>
  );
};

export default MainPage;
