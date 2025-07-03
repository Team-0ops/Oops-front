import Navbar from "../components/Navbar";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import type { OopsPost } from "../types/OopsList";
import OopsList from "../components/OopsList";
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
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 최종 제출 핸들러
  const handleSubmit = () => {
    if (selectedStep === 0) {
      // 웁스 중 작성
      setPosts((prev) => [
        ...prev,
        {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // uuid 대체
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
      setPosts((prev) =>
        prev.map((post) =>
          post.id === selectedPostId
            ? { ...post, status: "극복 중", overcomeContent }
            : post
        )
      );
      setOvercomeContent("");
      setSelectedPostId(null);
    } else if (selectedStep === 2 && selectedPostId) {
      // 극복 완료 작성
      setPosts((prev) =>
        prev.map((post) =>
          post.id === selectedPostId
            ? { ...post, status: "극복 완료", completeContent }
            : post
        )
      );
      setCompleteContent("");
      setSelectedPostId(null);
    }
  };

  return (
    <>
      {/* 네비게이션 */}
      <Navbar />
      <div className="bg-[#F9F6F0] ">
        <div className="flex items-center gap-2 text-lg font-bold ml-10">
          <button className="cursor-pointer">
            <FaAngleLeft />
          </button>
          글작성
        </div>

        {/* 제목 및 본문 입력 */}
        <div className="my-10 flex flex-col justify-center items-center w-full">
          <div className="w-[90%] h-[400px]  border border-[#ECE6DF] rounded-lg p-4">
            <input
              placeholder="제목(필수)"
              className="mb-2 text-xl font-bold w-full bg-transparent outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="실패담의 내용을 입력해주세요. (필수)"
              className="w-full h-[200px] bg-transparent outline-none text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* 진행상황 선택 */}
        <h6 className="mx-8 mt-4 font-bold">진행상황 선택</h6>
        <div className="flex items-start my-4 w-[350px] rounded-lg mx-8 overflow-hidden border-none gap-2">
          <button
            className={` cursor-pointer py-2 px-4 font-bold rounded-full ${
              selectedStep === 0 ? "bg-[#B3E378] " : "bg-gray-200 text-black"
            }`}
            onClick={() => setSelectedStep(0)}
          >
            웁스 중
          </button>
          <button
            className={` cursor-pointer py-2 px-4 font-bold rounded-full ${
              selectedStep === 1 ? "bg-[#B3E378] " : "bg-gray-200 text-black"
            }`}
            onClick={() => setSelectedStep(1)}
          >
            극복 중
          </button>
          <button
            className={` cursor-pointer py-2 px-4 font-bold rounded-full ${
              selectedStep === 2 ? "bg-[#B3E378] " : "bg-gray-200 text-black"
            }`}
            onClick={() => setSelectedStep(2)}
          >
            극복 완료
          </button>
        </div>
        {selectedStep === 1 && (
          <OopsList posts={oopsList} onSelect={setSelectedPostId} />
        )}
        {selectedStep === 2 && (
          <OopsList posts={overcomeList} onSelect={setSelectedPostId} />
        )}
        <hr className="border-gray-300" />

        {/* 이미지 업로드 */}
        <div className="flex items-start mt-4 ml-8">
          <div className="flex flex-col items-start">
            <h6 className="font-bold mb-2">사진추가</h6>
            <button
              className="bg-gray-200 px-4 py-2 mb-2 cursor-pointer rounded-full text-black"
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
          </div>
          <div className="flex gap-4 ml-8">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="w-[80px] h-[80px] border border-black flex items-center justify-center cursor-pointer relative"
                onClick={() => {
                  setImages(images.filter((_, i) => i !== idx));
                }}
                title="이미지 삭제"
              >
                <img
                  src={src}
                  alt={`preview-${idx}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="ml-8 mt-4 mb-6 text-xs text-gray-500">
          jpg, png, 각 10MB 이하만 최대 5장 업로드 가능합니다.
        </div>
        <hr className="border-gray-300" />

        {/* 카테고리 */}
        <div className="flex justify-center items-center">
          <form className="flex flex-col justify-center items-center mr-10 mt-6 mb-10">
            <label className="font-bold">카테고리를 선택</label>
            <select
              className="bg-white px-4 py-2 mt-2"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option className="text-gray-400" value="">
                카테고리 선택
              </option>
              <option value="category1">자유</option>
              <option value="category2">작은일</option>
              <option value="category3">회사</option>
              <option value="category4">인간관계</option>
            </select>
          </form>

          <fieldset className="ml-10 mt-6 mb-10">
            <legend className="font-bold mb-4">댓글 종류 선택</legend>
            <div>
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
                className="mb-2 scale-200"
              />
              <label className="mx-5" htmlFor="comment1">
                조언
              </label>
            </div>
            <div>
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
                className="mt-4 scale-200"
              />
              <label className="mx-5">공감</label>
            </div>
          </fieldset>
        </div>
        <div className="flex justify-center items-center mb-10">
          <button
            className="bg-[#B3E378] w-[400px] h-[50px] px-6 font-bold"
            onClick={handleSubmit}
          >
            작성
          </button>
        </div>
      </div>
    </>
  );
};

export default PostWrite;
