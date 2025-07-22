// components/post/PostList.tsx
import { useRef, useEffect } from "react";
import type { OopsPost } from "../../types/OopsList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import Post from "./Post";

import "../../App.css";
import "swiper/css";
import "swiper/css/pagination";

interface PostListProps {
  posts: OopsPost[];
  onSelect: (id: string) => void;
}

const POSTS_PER_PAGE = 5;

const PostList = ({ posts, onSelect }: PostListProps) => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const swiperRef = useRef<any>(null);

  const chunkedPosts = Array.from({ length: totalPages }, (_, i) =>
    posts.slice(i * POSTS_PER_PAGE, (i + 1) * POSTS_PER_PAGE)
  );

  useEffect(() => {
    if (swiperRef.current && paginationRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      if (swiperInstance?.pagination) {
        swiperInstance.params.pagination.el = paginationRef.current;
        swiperInstance.pagination.init();
        swiperInstance.pagination.render();
        swiperInstance.pagination.update();
      }
    }
  }, [posts]);

  return (
    <div
      style={{ boxShadow: "inset 0px 0px 5.4px 0px rgba(0, 0, 0, 0.25)" }}
      className="bg-[#fffbf8] w-full rounded-[4px] border-[1px] border-[#f6ebe6] px-[20px] py-[20px] mt-[8px]"
    >
      <div className="body4 mb-[12px]">
        극복 완료한 게시글을 선택해주세요!
      </div>

      {posts.length === 0 ? (
        <div className="body5 flex justify-center text-[#999] items-center">
          작성된 게시물이 없습니다.
        </div>
      ) : (
        <>
          <Swiper
            ref={swiperRef}
            modules={[Pagination]}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full"
          >
            {chunkedPosts.map((chunk, pageIndex) => (
              <SwiperSlide key={pageIndex}>
                <ul className="flex flex-col gap-[12px]">
                  {chunk.map((post) => (
                    <Post key={post.id} post={post} onClick={onSelect} />
                  ))}
                </ul>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            ref={paginationRef}
            className="custom-pagination mt-[20px] flex justify-center gap-[12px]"
          />
        </>
      )}
    </div>
  );
};

export default PostList;
