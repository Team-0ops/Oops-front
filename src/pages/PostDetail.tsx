import ReportIcon from "../assets/icons/ReportIcon.svg?react";
import LeftIcon from "../assets/icons/left-point.svg?react";

import CommentList from "../components/comment/CommentList";
import type { Comment } from "../types/Comment";

import { useState } from "react";

const PostDetail = () => {
  // 댓글 관리 로직
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const handleAddComment = () => {
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "닉네임",
      content: commentInput,
      createdAt: new Date().toLocaleString("ko-KR", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "조언",
    };

    setComments((prev) => [...prev, newComment]);
    setCommentInput(""); // 입력창 비우기
  };

  // 슬라이드 관련 로직
  const states = ["웁스 중", "극복 중", "극복 완료"];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col bg-[#fffbf8]">
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
      <section className=" font-[pretendard] w-full px-[20px]">
        {/* 상태 표시 바 - 가운데만 초록색 */}
        <div
          className="
          relative flex items-center justify-between 
          px-2 mb-4"
        >
          {/* 가운데 점선 라인 */}
          <div
            className="
            absolute top-1/2 left-0 right-0 
            h-[2px] 
            border-dashed border-t-2 border-gray-300 z-0"
          />

          {states.map((state, index) => {
            const position =
              index === 0
                ? "justify-start"
                : index === 1
                ? "justify-center"
                : "justify-end";

            const isActive = index === activeIndex;

            return (
              <div key={index} className={`flex w-1/3 z-10 ${position}`}>
                <button
                  className={`body4 px-4 py-1 rounded-full cursor-pointer transition
                  ${
                    isActive
                      ? "bg-[#B3E378] text-black"
                      : "bg-[#E6E6E6] text-[#A0A0A0]"
                  }`}
                  onClick={() => handleSlide(index)}
                >
                  {state}
                </button>
              </div>
            );
          })}
        </div>

        {/* 본문: 슬라이드 X, 상태에 따라 고정 렌더링 */}
        <div className="mt-6 bg-white p-6 rounded-[10px] shadow text-center text-gray-700">
          {activeIndex === 0 && <div>🟢 웁스 중인 글의 본문입니다.</div>}
          {activeIndex === 1 && <div>🟡 극복 중인 글의 본문입니다.</div>}
          {activeIndex === 2 && <div>🔵 극복 완료한 글의 본문입니다.</div>}
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center gap-2 mt-[18px]">
          {states.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlide(index)}
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
            p-[9px] w-[80%] 
            border-[1px] border-[#8f8f8f] rounded-[4px]"
          />

          <button
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
  );
};

export default PostDetail;
