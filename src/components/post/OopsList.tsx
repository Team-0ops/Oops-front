import { useRef, useEffect } from "react";
import type { OopsPost } from "../../types/OopsList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "../../App.css";
import "swiper/css";
import "swiper/css/pagination";



interface OopsListProps {
  posts: OopsPost[];
  onSelect: (id: string) => void;
}

const POSTS_PER_PAGE = 5;

const OopsList = ({ posts, onSelect }: OopsListProps) => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const chunkedPosts = Array.from({ length: totalPages }, (_, i) =>
    posts.slice(i * POSTS_PER_PAGE, (i + 1) * POSTS_PER_PAGE)
  );

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // 게시글이 있을 때만 초기화
    if (swiperRef.current && paginationRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      if (swiperInstance && swiperInstance.pagination) {
        swiperInstance.params.pagination.el = paginationRef.current;
        swiperInstance.pagination.init();
        swiperInstance.pagination.render();
        swiperInstance.pagination.update();
      }
    }
  }, [posts]); // posts가 변할 때마다 실행

  return (
    <div
      style={{
        boxShadow: "inset 0px 0px 5.4px 0px rgba(0, 0, 0, 0.25)",
      }}
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
                    <li
                      key={post.id}
                      className="flex w-full h-[90px] justify-between items-center bg-[#f0e7e0] cursor-pointer px-[14px] py-[10px] rounded-[10px]"
                      onClick={() => onSelect(post.id)}
                    >
                      <div
                        className={`flex flex-col justify-between w-full ${post.images?.[0] ? "pr-[12px]" : ""}`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="body4">
                            {post.title}
                          </span>
                          <span className="caption2 text-[#999999] whitespace-nowrap ml-2">
                            {post.category}
                          </span>
                        </div>
                        <span className="caption3 text-[#262626] max-w-[calc(100%-60px)] truncate">
                          {post.content}
                        </span>
                      </div>
                      {post.images?.[0] && (
                        <div className="w-[48px] h-[48px] flex-shrink-0 rounded ml-[8px]">
                          <img
                            src={post.images[0]}
                            alt="preview"
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 외부 커스텀 pagination dot 영역 */}
          <div ref={paginationRef} className="custom-pagination mt-[20px] flex justify-center gap-[12px]" />
        </>
      )}
    </div>
  );
};

export default OopsList;
