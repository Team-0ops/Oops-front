import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import type { OopsPost } from "../types/OopsList";
import OopsList from "../components/post/OopsList";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

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
    // 웁스 중 작성
    if (selectedStep === 0) {
      setPosts((prev) => [
        ...prev,
        {
          id:
            Date.now().toString() + Math.random().toString(36).substring(2, 9), // uuid 대체
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
          id:
            Date.now().toString() + Math.random().toString(36).substring(2, 9), // uuid 대체
          status: "극복 중",
          title: overcomeTitle,
          content: overcomeContent,
          images: [],
          category: "",
          commentType: [],
          parentId: selectedPostId, // 웁스 중 id
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
          id:
            Date.now().toString() + Math.random().toString(36).substring(2, 9), // uuid 대체
          status: "극복 완료",
          title: completeTitle,
          content: completeContent,
          images: [],
          category: "",
          commentType: [],
          parentId: selectedPostId, // 극복 중 id
        },
      ]);
      setCompleteContent("");
      setCompleteTitle("");
      setSelectedPostId(null);
    }
  };

  // button 스타일
  const buttonStyle =
    "w-auto px-[13px] py-[6px] rounded-[20px]  font-semibold text-[14px] flex items-center justify-center cursor-pointer";

  return (
    <div className="flex justify-center items-center min-h-screen ">
      {/* <Navbar /> 들어가면 됨 */}
      <div className="w-[375px] h-[812px] bg-[#FFFBF8] overflow-auto ">
        {/* 첫번째 section */}
        <section className="w-full px-[20px] pt-[17px] pb-[30px] flex flex-col gap-[20px]">
          {/* 글작성 */}
          <div className="flex items-center font-['Pretendard'] gap-[8px] text-[20px] font-semibold">
            <button className="cursor-pointer">
              <FaAngleLeft />
            </button>
            글작성
          </div>

          {/* 제목 및 본문 입력 */}
          <div className="w-full h-[209px] py-[17px] px-[16px] border-[1px] border-[#f6ebe6] rounded-[5px] ">
            <input
              placeholder="제목 (필수)"
              className="mb-[14px] font-['Pretendard'] font-semibold text-[18px] w-[177px] h-[21px] bg-transparent outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="실패담의 내용을 입력해주세요. (필수)"
              className="w-full h-[150px] bg-transparent outline-none text-[12px] font-['Pretendard'] font-semibold"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        <hr className="border-[#E6E6E6] border-[1px]" />

        {/* 두번째 section */}
        {/* 진행상황 선택 */}
        <section className="w-full px-[20px] py-[20px] font-['Pretendard'] flex flex-col gap-[12px] items-start">
          <div className="w-[242px] h-[19px] font-semibold text-[16px]">
            진행상황 선택
          </div>
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
            <OopsList posts={oopsList} onSelect={setSelectedPostId} />
          )}
          {selectedStep === 2 && (
            <OopsList posts={overcomeList} onSelect={setSelectedPostId} />
          )}
        </section>
        <hr className="border-[#E6E6E6] border-[1px]" />

        {/* 세번째 section */}
        {/* 이미지 업로드 */}
        <section className="w-full py-[20px] px-[20px] font-['Pretendard'] flex flex-col items-start">
          <div className="font-semibold mb-[8px] text-[16px]">사진추가</div>
          <div className="flex justify-between items-center w-full ">
            <button
              className="bg-[#E6E6E6] px-[12px] py-[6px] rounded-[20px] cursor-pointer my-[40px] text-[14px] font-semibold"
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
            <div className="flex gap-[12px] items-start overflow-x-auto max-w-[180px] scrollbar-thin">
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
            <span className="text-[12px] font-medium text-[#999999]">
              jpg, png, 각 10MB 이하만 최대 5장 업로드 가능합니다.
            </span>
          </div>
        </section>

        <hr className="border-gray-300" />

        {/* 세번째 섹션 */}
        {/* 카테고리 */}
        <section className="flex justify-start gap-[30px] pl-[20px] pt-[20px] font-['Pretendard']">
          <form className="flex flex-col justify-start items-center gap-[16px] w-[120px]">
            <label className="font-semibold text-[16px]">카테고리를 선택</label>
            <select
              className="bg-[#F5F5F5] px-[10px] py-[6px] w-auto h-auto rounded-[20px]"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option className="text-[14px]" value="">
                카테고리 선택
              </option>
              <option className="text-[14px]" value="작은 일">작은 일</option>
              <option className="text-[14px]" value="연애">연애</option>
              <option className="text-[14px]" value="인간관계">인간관계</option>
              <option className="text-[14px]" value="학교생활">학교생활</option>
              <option className="text-[14px]" value="진로/취업">진로/취업</option>
              <option className="text-[14px]" value="회사생활">회사생활</option>
              <option className="text-[14px]" value="대입/입시">대입/입시</option>
              <option className="text-[14px]" value="창업">창업</option>
              <option className="text-[14px]" value="여행">여행</option>
              <option className="text-[14px]" value="재정/돈관리">재정/돈관리</option>
              <option className="text-[14px]" value="건강/운동">건강/운동</option>
              <option className="text-[14px]" value="멘탈관리">멘탈관리</option>
              <option className="text-[14px]" value="자유">자유</option>
              {/* 카테고리 추가 시 아래와 같이 추가 */}
            </select>
          </form>

          <fieldset className="ml-[10px] flex flex-col justify-start items-start">
            <legend className="font-bold mb-4">댓글 종류 선택</legend>
            <div className="flex items-center mb-[8px]">
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
              <label className="mx-5" htmlFor="comment1">
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
              <label className="mx-5">공감</label>
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
