import ReportIcon from "../assets/icons/ReportIcon.svg?react";
import LeftIcon from "../assets/icons/left-point.svg?react";
import Like from "../assets/icons/majesticons_heart.svg?react";
import CommentIcon from "../assets/icons/CommentIcon.svg?react";
import EyeIcon from "../assets/icons/EyeIcon.svg?react";

import CommentList from "../components/comment/CommentList";
import type { Comment } from "../types/Comment";
import Report from "../components/modals/Report";
import type { ReportTarget } from "../components/modals/Report";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Feedback from "../components/modals/Feedback";

const PostDetail = () => {
  //교훈 작성 모달
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  //게시글 신고 모달
  const [showReportModal, setShowReportModal] = useState(false);
  // swiper 상태관리
  const buttonSwiperRef = useRef<SwiperCore | null>(null);
  const contentSwiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 댓글 관리 로직
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const handleAddComment = () => {
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      type: "comment",
      id: Date.now().toString(),
      author: "닉네임",
      content: commentInput,
      createdAt: new Date().toLocaleString("ko-KR", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setComments((prev) => [...prev, newComment]);
    setCommentInput(""); // 입력창 비우기
  };

  // 슬라이드 관련 로직
  const states = ["웁스 중", "극복 중", "극복 완료"];

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
    buttonSwiperRef.current?.slideTo(index);
    contentSwiperRef.current?.slideTo(index);
  };

  // 본문 목데이터
  const post = {
    id: "1",
    author: "작성자1",
    content: "본문 내용1",
  };

  const reportTarget: ReportTarget = {
    type: "post",
    id: post.id,
    author: post.author,
    content: post.content,
  };

  return (
    <>
      <div className="w-full flex flex-col bg-[#fffbf8]">
        <div
          className="
            h2
            flex justify-start items-center gap-[10px]
            h-[24px]
            ml-[20px] my-[20px]
            "
        >
          <LeftIcon className="w-[24px] h-[24px]" />
          진로 / 취업 카테고리
        </div>

        {/* 첫번째 섹션 게시글 */}
        <section className="w-full ">
          <Swiper
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={110}
            onSwiper={(swiper) => (buttonSwiperRef.current = swiper)}
            onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            className="w-full h-[50px]"
          >
            {states.map((state, index) => (
              <SwiperSlide
                key={index}
                className="!w-[80px] flex justify-center items-center"
                style={{ flexShrink: 0 }}
              >
                <button
                  onClick={() => {
                    setActiveIndex(index); // 상태 업데이트
                    buttonSwiperRef.current?.slideTo(index); // 이걸로 가운데로 이동!
                  }}
                  className={`body4 w-full py-[6px] h-[30px] rounded-[20px] transition 
          ${
            activeIndex === index
              ? "bg-[#B3E378] text-black"
              : "bg-[#E6E6E6] text-[#393939] opacity-40"
          }`}
                >
                  {state}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 본문 Swiper */}
          <Swiper
            onSwiper={(swiper) => (contentSwiperRef.current = swiper)}
            onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            slidesPerView={1.2}
            centeredSlides={true}
            spaceBetween={20}
            // className="w-full"
          >
            <SwiperSlide className="flex justify-center items-center w-full">
              <div
                className=" w-full
              p-[14px] rounded-[10px]
            bg-[#f0e7e0] flex flex-col"
              >
                <div className="flex gap-[6px]">
                  <div className="w-[42px] h-[42px] rounded-[4px] bg-[#9a9a9a]" />
                  <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col gap-[4px]">
                      <span className="body2 text-[#1d1d1d]">닉네임</span>
                      <span className="body5 text-[#999999]">
                        3일전 or 18:09
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <button
                        className="body2 text-[#ffffff] h-[30px] px-[12px] py-[5px] bg-black rounded-[4px]"
                        onClick={() => setShowFeedbackModal(true)}
                      >
                        교훈 작성
                      </button>
                      <div className="w-[30px] h-[30px] p-[4px] cursor-pointer rounded-[4px] bg-black">
                        <ReportIcon
                          className="w-full h-full"
                          onClick={() => setShowReportModal(true)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="body1 w-full mt-[20px] mb-[16px]">제목</div>
                <div className="body5 w-full mb-[22px] text-[#4d4d4d]">
                  첫 직무 면접이어서 준비만 죽어라 했는데 막상 가서는 말
                  한마디도 제대로 못 함;; <br />
                  질문 나오니까 머리가 하얘지고, 준비했던 것도 다 말아먹 음.
                  말하면서도 내가 무슨 말 하는지 모르겠고, 괜히 시간 낭비했나
                  싶더라ㅋㅋ <br /> 면접 끝나고 진짜 집 오는 길에 현타 씨게 옴…{" "}
                  <br />
                  다들 첫 면접은 그럴수잇다는데 그냥 아쉽네. .........
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <Like className="w-[24px] h-[24px] cursor-pointer" />
                    <span className="caption2 text-[#666]">응원해요 10</span>
                  </div>
                  <div className="flex items-center ">
                    <CommentIcon className="w-[24px] h-[24px] cursor-pointer" />
                    <span className="caption2 text-[#666]">댓글 5</span>
                  </div>
                  <div className="flex items-center ">
                    <EyeIcon className="w-[24px] h-[24px] cursor-pointer" />
                    <span className="caption2 text-[#666]">조회수 200</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center w-full">
              <div
                className=" w-full
             h-[339px] p-[14px] rounded-[10px]
            bg-[#f0e7e0]"
              >
                <div className="flex gap-[6px]">
                  <div className="w-[42px] h-[42px] rounded-[4px] bg-[#9a9a9a]" />
                  <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col gap-[4px]">
                      <span className="body2 text-[#1d1d1d]">닉네임</span>
                      <span className="body5 text-[#999999]">
                        3일전 or 18:09
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <button
                        className="body2 text-[#ffffff] h-[30px] px-[12px] py-[5px] bg-black rounded-[4px]"
                        onClick={() => setShowFeedbackModal(true)}
                      >
                        교훈 작성
                      </button>
                      <div className="w-[30px] h-[30px] p-[4px] cursor-pointer rounded-[4px] bg-black">
                        <ReportIcon
                          className="w-full h-full"
                          onClick={() => setShowReportModal(true)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center w-full">
              <div
                className=" w-full
            h-[339px] p-[14px] rounded-[10px]
            bg-[#f0e7e0]"
              >
                <div className="flex gap-[6px]">
                  <div className="w-[42px] rounded-[4px] h-[42px] bg-[#9a9a9a]" />
                  <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col gap-[4px]">
                      <span className="body2 text-[#1d1d1d]">닉네임</span>
                      <span className="body5 text-[#999999]">
                        3일전 or 18:09
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <button
                        className="body2 text-[#ffffff] h-[30px] px-[12px] py-[5px] bg-black rounded-[4px]"
                        onClick={() => setShowFeedbackModal(true)}
                      >
                        교훈 작성
                      </button>
                      <div className="w-[30px] h-[30px] p-[4px] cursor-pointer rounded-[4px] bg-black">
                        <ReportIcon
                          className="w-full h-full"
                          onClick={() => setShowReportModal(true)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          {/* 인디케이터 */}
          <div className="flex justify-center gap-[20px] mt-[18px]">
            {states.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-[8px] h-[8px] rounded-full transition ${
                  index === activeIndex ? "bg-[#1d1d1d]" : "bg-[#D9D9D9]"
                }`}
              />
            ))}
          </div>
        </section>

        {/* 두번째 섹션 댓글 입력*/}
        <section className="flex flex-col w-full gap-[10px] px-[20px] mt-[20px]">
          <div className="body2 w-full flex justify-start items-start">
            댓글로 조언 남기기
          </div>
          <div className="flex justify-between w-full items-center gap-[13px]">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              style={{
                boxShadow: "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
              placeholder="[조언]을 입력해주세요!"
              className="
            body5 placeholder:body5 
            p-[9px] w-[70%] 
            border-[1px] border-[#8f8f8f] rounded-[4px]"
            />

            <button
              type="button"
              onClick={handleAddComment}
              className="body2 bg-[#262626] text-[#ffffff] px-[19px] py-[8px] rounded-[4px]"
            >
              작성
            </button>
          </div>
        </section>

        {/* 댓글 목록 */}
        <section className="mt-[20px] flex flex-col w-full">
          <CommentList comments={comments} />
        </section>

        {/* 카테고리 추천 글 */}
        <section className="mt-[40px] flex flex-col">
          <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
            인간관계 추천 글
          </div>

          <div className="caption2 py-[10px] pl-[38px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px ">
            내가 있잖아?
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            지금 너무너무 졸린데...
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            알바 출근하기 싫을 때
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            꿀팁 전수해줄게
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            그냥 안가면 돼 ...
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            알바같이 하는 애한테 너무 미안하네
          </div>
        </section>

        {/* 베스트 피드 */}
        <section className="mt-[32px] mb-[26px] flex flex-col">
          <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
            인간관계 추천 글
          </div>

          <div className="caption2 py-[10px] pl-[38px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px ">
            내가 있잖아?
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            지금 너무너무 졸린데...
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            알바 출근하기 싫을 때
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            꿀팁 전수해줄게
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            그냥 안가면 돼 ...
          </div>

          <div className="caption2 py-[10px] text-[#666] border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            알바같이 하는 애한테 너무 미안하네
          </div>
        </section>
      </div>
      {showReportModal && (
        <Report
          onClose={() => setShowReportModal(false)}
          comment={reportTarget}
        />
      )}
      {showFeedbackModal && (
        <Feedback onClose={() => setShowFeedbackModal(false)} />
      )}
    </>
  );
};

export default PostDetail;
