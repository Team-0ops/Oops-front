import { useState, useEffect } from "react";
import type { OopsPost } from "../types/OopsList";
import PostList from "../components/post/PostList";
import { useRef } from "react";

import LeftPoint from "../assets/icons/left-point.svg?react";
import UpArrow from "../assets/icons/UpArrow.svg?react";
import DownArrow from "../assets/icons/DownArrow.svg?react";

import "../App.css";

interface PostWriteProps {
  posts: OopsPost[];
  setPosts: React.Dispatch<React.SetStateAction<OopsPost[]>>;
  selectedStep: 0 | 1 | 2;
  setSelectedStep: (step: 0 | 1 | 2) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
}

const PostWrite = ({
  posts,
  setPosts,
  selectedStep,
  setSelectedStep,
  selectedPostId,
  setSelectedPostId,
}: PostWriteProps) => {
  // 카테고리 관련 state와 카테고리 배열
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "작은 일",
    "연애",
    "인간관계",
    "학교생활",
    "진로/취업",
    "회사생활",
    "대입/입시",
    "창업",
    "여행",
    "재정/돈관리",
    "건강/운동",
    "멘탈관리",
    "자유",
  ];
  // 웁스 중 작성용 state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // 극복 중/완료 작성용 state
  const [overcomeContent, setOvercomeContent] = useState("");
  const [completeContent, setCompleteContent] = useState("");
  const [overcomeTitle, setOvercomeTitle] = useState("");
  const [completeTitle, setCompleteTitle] = useState("");
  // 이미지 업로드용 state
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [commentType, setCommentType] = useState<string[]>([]);

  // 단계별 리스트 필터
  const oopsList = posts.filter((p) => p.status === "웁스 중");
  const overcomeList = posts.filter((p) => p.status === "극복 중");

  // 이미지 업로드 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 최종 제출 핸들러
  const handleSubmit = () => {
    const now = new Date().toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

   const basePost = {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    createdAt: now, // ✅ 추가
  };

    // 웁스 중 작성
    if (selectedStep === 0) {
    setPosts((prev) => [
      ...prev,
      {
        ...basePost,
        status: "웁스 중",
        title,
        content,
        images,
        category,
        commentType,
      },
    ]);
    setTitle("");
    setContent("");
    setImages([]);
    setCategory("");
    setCommentType([]);
  } else if (selectedStep === 1 && selectedPostId) {
    // 극복 중 작성
    setPosts((prev) => [
      ...prev,
      {
        ...basePost,
        status: "극복 중",
        title: overcomeTitle,
        content: overcomeContent,
        images: [],
        category,
        commentType: [],
        parentId: selectedPostId,
      },
    ]);
    setOvercomeContent("");
    setOvercomeTitle("");
    setSelectedPostId(null);
  } else if (selectedStep === 2 && selectedPostId) {
    // 극복 완료 작성
    setPosts((prev) => [
      ...prev,
      {
        ...basePost,
        status: "극복 완료",
        title: completeTitle,
        content: completeContent,
        images: [],
        category,
        commentType: [],
        parentId: selectedPostId,
      },
    ]);
    setCompleteContent("");
    setCompleteTitle("");
    setSelectedPostId(null);
  }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // button 스타일
  const buttonStyle =
    "body4 w-auto px-[13px] py-[6px] rounded-[20px] flex items-center justify-center cursor-pointer";

  return (
    <div className="flex justify-center items-center ">
      {/* <Navbar /> 들어가면 됨 */}
      <div className="w-full h-full bg-[#FFFBF8] ">
        {/* 첫번째 section */}
        <section className="w-full px-[20px] pt-[17px] pb-[30px] flex flex-col gap-[20px]">
          {/* 글작성 */}
          <div className="h2 flex items-center gap-[8px] ">
            <button className="cursor-pointer">
              <LeftPoint />
            </button>
            글작성
          </div>

          {/* 제목 및 본문 입력 */}
          <div className="w-full h-[209px] py-[17px] px-[16px] border-[1px] border-[#f6ebe6] rounded-[5px] ">
            {selectedStep === 0 && (
            <>
            <input
              placeholder="제목 (필수)"
              className="body1 mb-[14px] w-[177px] h-[21px] bg-transparent outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="실패담의 내용을 입력해주세요. (필수)"
              className="caption1 w-full h-[150px] bg-transparent outline-none "
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            </>
            )}

            {selectedStep === 1 && (
            <>
            <input
              placeholder="제목 (필수)"
              className="body1 mb-[14px] w-[177px] h-[21px] bg-transparent outline-none"
              value={overcomeTitle}
              onChange={(e) => setOvercomeTitle(e.target.value)}
            />
            <textarea
              placeholder="실패담의 내용을 입력해주세요. (필수)"
              className="caption1 w-full h-[150px] bg-transparent outline-none "
              value={overcomeContent}
              onChange={(e) => setOvercomeContent(e.target.value)}
            />
            </>
            )}

            {selectedStep === 2 && (
            <>
            <input
              placeholder="제목 (필수)"
              className="body1 mb-[14px] w-[177px] h-[21px] bg-transparent outline-none"
              value={completeTitle}
              onChange={(e) => setCompleteTitle(e.target.value)}
            />
            <textarea
              placeholder="실패담의 내용을 입력해주세요. (필수)"
              className="caption1 w-full h-[150px] bg-transparent outline-none "
              value={completeContent}
              onChange={(e) => setCompleteContent(e.target.value)}
            />
            </>
            )}
          </div>
        </section>

        <hr className="border-[#E6E6E6] border-[1px]" />

        {/* 두번째 section */}
        {/* 진행상황 선택 */}
        <section className="w-full px-[20px] py-[20px]  flex flex-col gap-[12px] items-start">
          <div className="body2 w-[242px] h-[19px] ">진행상황 선택</div>
          <div className="flex items-start w-full gap-[14px] font-['Pretendard'] rounded-lg overflow-hidden border-none">
            <button
              className={`${buttonStyle} ${
                selectedStep === 0 ? "bg-[#B3E378]" : "bg-[#E6E6E6] text-black"
              }`}
              onClick={() => setSelectedStep(0)}
            >
              웁스 중
            </button>
            <button
              className={`${buttonStyle} ${
                selectedStep === 1 ? "bg-[#B3E378]" : "bg-[#E6E6E6] text-black"
              }`}
              onClick={() => setSelectedStep(1)}
            >
              극복 중
            </button>
            <button
              className={`${buttonStyle} ${
                selectedStep === 2 ? "bg-[#B3E378]" : "bg-[#E6E6E6] text-black"
              }`}
              onClick={() => setSelectedStep(2)}
            >
              극복 완료
            </button>
          </div>

          {/* 웁스 중, 극복 중, 극복 완료 리스트 */}

          {selectedStep === 1 && (
            <PostList posts={oopsList} onSelect={setSelectedPostId} />
          )}
          {selectedStep === 2 && (
            <PostList posts={overcomeList} onSelect={setSelectedPostId} />
          )}
        </section>
        <hr className="border-[#E6E6E6] border-[1px]" />

        {/* 세번째 section */}
        {/* 이미지 업로드 */}
        <section className="w-full py-[20px] px-[20px] flex flex-col items-start">
          <div className="body2 mb-[8px] ">사진추가</div>
          <div className="flex justify-between items-center w-full ">
            <button
              className="body4 bg-[#E6E6E6] px-[12px] py-[6px] rounded-[20px] cursor-pointer my-[40px]"
              onClick={handleClick}
              type="button"
            >
              사진 추가
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="flex gap-[12px] items-start overflow-x-scroll max-w-[185px]">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="w-[80px] h-[80px] border border-black flex items-center justify-center cursor-pointer flex-shrink-0"
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== idx));
                  }}
                  title="이미지 삭제"
                >
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="object-cover w-[80px] h-[80px]"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <span className="caption2 text-[#999999]">
              jpg, png, 각 10MB 이하만 최대 5장 업로드 가능합니다.
            </span>
          </div>
        </section>

        <hr className="border-gray-300" />

        {/* 세번째 섹션 */}
        {/* 카테고리 선택 영역 */}
        <section
          className="flex justify-start gap-[30px] pl-[20px] pt-[20px] relative"
          ref={dropdownRef}
        >
          <form className="flex flex-col justify-start gap-[16px] w-[120px]">
            <div className="body2">카테고리 선택</div>

            {/* 드롭다운 버튼 */}
            <div
              className="body4 w-full flex justify-between h-[30px] z-10 px-[10px] py-[6px]  rounded-[20px] cursor-pointer
                bg-[#E6E6E6] outline-none select-none"
            >
              {category || "카테고리 선택"}
              {isDropdownOpen ? (
                <UpArrow
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-[18px] h-[18px]"
                />
              ) : (
                <DownArrow
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-[18px] h-[18px]"
                />
              )}
            </div>

            {/* 드롭다운 리스트 */}
            {isDropdownOpen && (
              <ul
                className="
              absolute top-[82px] 
              bg-[#f3f3f3]
              w-[120px] h-[118px] 
               rounded-b-[10px] 
                overflow-y-scroll text-[14px] shadow"
              >
                {categories.map((item, idx) => (
                  <li
                    key={item}
                    onClick={() => {
                      setCategory(item);
                      setIsDropdownOpen(false);
                    }}
                    className={`body4 px-[13px] py-[8px] cursor-pointer
            ${category === item ? "text-black" : "text-[#999999]"} 
            ${idx !== categories.length - 1 ? "border-b border-[#e6e6e6]" : ""}
          `}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* 댓글 종류 선택 */}
          <fieldset className="ml-[10px] flex flex-col justify-start items-start">
            <legend className="body2 mb-4">댓글 종류 선택</legend>
            <div className="flex items-center mb-[15px]">
              <input
                type="checkbox"
                value="조언"
                checked={commentType.includes("조언")}
                onChange={(e) => {
                  setCommentType((prev) =>
                    e.target.checked
                      ? [...prev, "조언"]
                      : prev.filter((type) => type !== "조언")
                  );
                }}
                className="accent-[#B3E378] rounded-[4px] scale-200"
              />
              <label className="body5 mx-5" htmlFor="comment1">
                조언
              </label>
            </div>

            <div className="flex items-center mb-[8px]">
              <input
                type="checkbox"
                value="공감"
                checked={commentType.includes("공감")}
                onChange={(e) => {
                  setCommentType((prev) =>
                    e.target.checked
                      ? [...prev, "공감"]
                      : prev.filter((type) => type !== "공감")
                  );
                }}
                className="accent-[#B3E378] rounded-[4px] scale-200"
              />
              <label className="body5 mx-5">공감</label>
            </div>
          </fieldset>
        </section>

        {/* 웁스 중 작성 */}

        {/* 작성 버튼 */}
        <div className="flex justify-center items-center mb-[32px] mt-[42px]">
          <button
            className="bg-[#B3E378] cursor-pointer w-[335px] h-[50px] px-6 font-bold"
            onClick={handleSubmit}
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostWrite;
