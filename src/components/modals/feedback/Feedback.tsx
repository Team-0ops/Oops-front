import X from "../../../assets/icons/X.svg?react"
import Arrow from "../../../assets/icons/Arrow.svg?react";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { submitLesson } from "../../../hooks/PostPage/PostHook/useSubmitLesson";

interface FeedbackProps {
  postId: number; // 교훈이 달릴 게시글 id
  onClose: () => void; // 모달 닫기 콜백
  onSuccess?: () => void; // 교훈 등록 성공 후 실행 콜백
  category: string; // 게시글 카테고리
  author: string; // 게시글 작성자
  title: string; // 게시글 제목
  content: string; // 게시글 내용
}

/**
 * Feedback 컴포넌트
 * - 특정 게시글에 대해 "교훈"을 작성하는 모달 ui
 * - 교훈 제목, 교훈 내용, 태그 선택/추가 기능 포함
 * - 등록 시 "submitLesson" 훅을 호출해 서버에 저장
 */

const Feedback = ({
  postId,
  onClose,
  onSuccess,
  category,
  author,
  title: postTitle,
  content: postContent,
}: FeedbackProps) => {
  // 상태 관리
  const [customTags, setCustomTags] = useState<string[]>([]); // 사용자가 직접 추가한 태그
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그들
  const [title, setTitle] = useState(""); // 교훈 제목
  const [content, setContent] = useState(""); // 교훈 내용

  // 태그 입력창 크기 조절을 위한 ref
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // 입력창 추가될 때 포커스 자동
  useEffect(() => {
    const lastRef = inputRefs.current[inputRefs.current.length - 1];
    if (lastRef) lastRef.focus();
  }, [customTags.length]);

  // 글자 수에 따른 width 자동 조절
  useLayoutEffect(() => {
    customTags.forEach((tag, index) => {
      const span = spanRefs.current[index];
      const input = inputRefs.current[index];
      if (span && input) {
        span.textContent = tag || "새 태그";
        input.style.width = `${span.offsetWidth + 14}px`; // padding 고려
      }
    });
  }, [customTags]);

  // 태그 선택/해제 토글
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // 교훈 등록 api 호출
  const handleSubmit = async () => {
    try {
      await submitLesson(postId, title, content, selectedTags);
      alert("교훈이 등록되었습니다!");
      onSuccess?.();
      onClose();
    } catch (e) {
      alert("교훈 등록에 실패했습니다.");
      throw e;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center w-[302px] rounded-[10px] px-[20px] pt-[21px] pb-[17px] bg-[#ffffff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="h2 flex ml-[86px] justify-between gap-[62px] ">
          교훈 작성
          <X className="w-[24px] h-[24px] cursor-pointer" onClick={onClose} />
        </div>
        <div className="caption2 flex justify-center mt-[8px] items-center text-[#666666]">
          {category}
        </div>

        {/* 게시글 미리보기 */}
        <section className="mt-[20px] mb-[18px] w-full">
          <h6 className="caption1 flex w-full h-[14px] justify-start">
            {author}님의 게시글
          </h6>
          <div className="flex flex-col bg-[#f0e7e0] px-[14px] py-[10px] mt-[10px] rounded-[10px] gap-[4px] font-['Pretendard'] w-full">
            <div className="w-full flex justify-between ">
              <span className="body4">
                {postTitle.length > 15
                  ? `${postTitle.slice(0, 15)}...`
                  : postTitle}
              </span>
              <span className="caption2 text-[#999999]">{category}</span>
            </div>
            <span className="caption3 text-[#262626]">
              {postContent.length > 20
                ? `${postContent.slice(0, 20)}...`
                : postContent}
            </span>
          </div>

          {/* 교훈 제목 입력 */}
          <div className="flex justify-center gap-[10px] ml-[36px] mt-[8px]">
            <Arrow className="w-[24px] h-[24px]" />
            <input
              placeholder="교훈 제목 (선택)"
              className="
              caption1
              placeholder: text-[#808080] placeholder: caption1
              bg-[#fffbf8] 
              w-[192px] h-[30px] 
              rounded-[5px] 
              border-[1px] border-[#f6ebe6]
              [box-shadow:inset_0_0_5.4px_rgba(0,0,0,0.25)]
              px-[12px] py-[8px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 교훈 내용 입력 */}
          <div className="flex justify-center gap-[10px] ml-[36px] mt-[8px]">
            <Arrow className="w-[24px] h-[24px]" />
            <textarea
              placeholder="교훈 내용 텍스트"
              className="
              caption1
              placeholder: text-[#808080] placeholder: caption1
              bg-[#fffbf8] 
              w-[192px] h-[100px] 
              rounded-[5px] 
              border-[1px] border-[#f6ebe6]
              [box-shadow:inset_0_0_5.4px_rgba(0,0,0,0.25)]
              px-[12px] py-[8px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        {/* 교훈 태그 선택 */}
        <section className="mb-[20px] ">
          <h1 className="caption1 w-full h-[14px] ">교훈 태그 선택</h1>
          <div className="mb-[14px] flex justify-start gap-[8px]">
            <span className="caption2 text-[#cccccc]">#본인만 확인 가능</span>
            <span className="caption2 text-[#cccccc]">#최대 10개</span>
            <span className="caption2 text-[#cccccc]">#삭제 불가</span>
          </div>

          <div className="flex w-full flex-wrap min-w-0 justify-start gap-[12px]">
            {/* 기존 태그들 */}
            {["면접", "인생교훈", "친구", "먹을 거", "위로"].map((tag) => (
              <button
                key={tag}
                className={`caption1 h-[20px] rounded-[4px] px-[7px] py-[3px] cursor-pointer
      ${
        selectedTags.includes(tag) ? "bg-[#1d1d1d]" : "bg-[#999999]"
      } text-[#ffffff]`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}

            {/* 커스텀 태그 입력 */}
            {customTags.map((tag, index) => (
              <div key={index} className="relative">
                {/* 너비 계산용 span */}
                <span
                  ref={(el) => {
                    spanRefs.current[index] = el;
                  }}
                  className="absolute invisible whitespace-pre caption1"
                >
                  {tag || "새 태그"}
                </span>

                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className={`caption1 h-[20px] rounded-[4px] px-[7px] outline-none appearance-none
        ${
          selectedTags.includes(tag) ? "bg-[#1d1d1d]" : "bg-[#999999]"
        } text-white flex items-center leading-none`}
                  value={tag}
                  placeholder="새 태그"
                  onChange={(e) => {
                    const newTags = [...customTags];
                    newTags[index] = e.target.value;
                    setCustomTags(newTags);
                  }}
                  onClick={() => handleTagClick(tag)}
                />
              </div>
            ))}

            {/* 추가하기 버튼 */}
            <button
              onClick={() => setCustomTags([...customTags, ""])}
              className="caption1 rounded-[4px] px-[7px] py-[3px] cursor-pointer bg-[#999999] text-[#ffffff]"
            >
              추가하기
            </button>
          </div>
        </section>

        <button
          className="
        body2
          w-full h-[48px]
        flex justify-center items-center
        rounded-[10px]
        py-[14px]
        bg-[#b3e378]
        "
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default Feedback;
