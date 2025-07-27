import PostCard from "../common/PostCard";
import ToSeeButton from "./ToSeeButton";

const BestFailerList = () => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-[16px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="h2 flex">베스트 Failer</h1>
          <ToSeeButton nav="best-feed" />
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
