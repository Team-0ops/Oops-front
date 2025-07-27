import { Link } from "react-router-dom";
import PostCard from "../common/PostCard";

const BestFailerList = () => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex text-[20px] font-semibold">베스트 Failer</h1>
          <Link
            to="/best-feed"
            className="flex w-[75px] h-[30px] py-[3px] justify-center items-center rounded-[20px] border-[1px] border-[#E6E6E6]"
          >
            <span className="text-[#4E4E4E] text-[14px] font-medium leading-[140%]">
              보러가기
            </span>
          </Link>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-[16px]">
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
          <PostCard
            title="노래 실패담"
            content="노래를 부르다가 음이탈을 해서 망한 경험담입니다."
            imageUrl="https://example.com/image.jpg"
            likes={10}
            comments={5}
            views={100}
            category="노래"
          />
        </div>
      </div>
    </>
  );
};

export default BestFailerList;
