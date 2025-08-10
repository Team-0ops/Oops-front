import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedStep, setSelectedPostId } from "../store/slices/postSlice";
import type { RootState } from "../store/store";
import PostList from "../components/post/PostList";
import type { OopsPost } from "../types/OopsList";
import LeftPoint from "../assets/icons/left-point.svg?react";
import UpArrow from "../assets/icons/UpArrow.svg?react";
import DownArrow from "../assets/icons/DownArrow.svg?react";
import "../App.css";

import { usePreviousPosts } from "../hooks/PostPage/usePreviousPosts";
import { axiosInstance } from "../apis/axios";

const PostWrite = () => {
  const location = useLocation();
  const topicNameFromState = location.state?.topicName;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedStep = useSelector(
    (state: RootState) => state.post.selectedStep
  );
  const selectedPostId = useSelector(
    (state: RootState) => state.post.selectedPostId
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLButtonElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const [commentType, setCommentType] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { posts: previousPosts, fetchPreviousPosts } = usePreviousPosts();

  const normalize = (s = "") => s.replace(/\s+/g, "").toLowerCase();
  const [categories, setCategories] = useState<string[]>([
    "일상",
    "연애",
    "인간관계",
    "주식/투자",
    "학교생활",
    "회사생활",
    "진로",
    "창업",
    "대입/입시",
    "취업/자격증",
    "결혼",
    "여행",
    "부동산",
    "정신 건강",
    "자유",
  ]);

  // 이미지 업로드 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages((prev) => [...prev, ...newImages]);
      //프리뷰
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 작성 핸들러
  const submitPost = async (situation: "OOPS" | "OVERCOMING" | "OVERCOME") => {
    const data: OopsPost = {
      title,
      content,
      situation,
      categoryId: category!,
      topicId: null,
      previousPostId: situation !== "OOPS" ? selectedPostId : null,
      wantedCommentTypes: commentType.map((type) =>
        type === "조언" ? "ADVICE" : "EMPATHY"
      ),
    };

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("data", JSON.stringify(data)); // JSON 문자열로 추가
    images.forEach((file) => {
      formData.append("images", file); // 여러 장 전송시 이름을 똑같이 반복!
    });

    try {
      const res = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const postId = res.data.result?.postId;
      await fetchPreviousPosts();
      if (situation === "OOPS") {
        dispatch(setSelectedStep(1));
        navigate("/postsuccess", { state: { postId } });
      } else if (situation === "OVERCOMING") {
        dispatch(setSelectedStep(2));
        navigate("/postsuccess", { state: { postId } });
      } else {
        dispatch(setSelectedStep(0));
        dispatch(setSelectedPostId(null));
        navigate("/postsuccess", { state: { postId } });
      }
      setTitle("");
      setContent("");
      setImages([]);
      setCommentType([]);
      alert("성공");
    } catch (error) {
      alert("글 작성에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

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

  // 카테고리 자동선택 (random -> post로 갈때)
  useEffect(() => {
    if (!topicNameFromState) return;

    const n = normalize(topicNameFromState);

    setCategories((prev) => {
      const idx = prev.findIndex((c) => normalize(c) === n);
      if (idx !== -1) {
        setCategory(idx + 1); // 이미 있으면 바로 선택
        return prev;
      }
      const next = [...prev, topicNameFromState]; // 없으면 동적 추가
      setCategory(next.length); // 방금 추가한 항목 선택(1-based)
      return next;
    });
  }, [topicNameFromState]);

  // OopsList에서 클릭했을때 해당하는 카테고리 고정
  useEffect(() => {
    if (!selectedPostId) return;

    // 현재 단계 기준 "이전 단계"를 결정
    const sourceSituation =
      selectedStep === 1 ? "OOPS" : selectedStep === 2 ? "OVERCOMING" : null;

    if (!sourceSituation) return;

    // 이전 단계에서 선택된 글 찾기
    const selectedPrev = previousPosts
      .filter((p) => p.situation === sourceSituation)
      .find((p) => p.postId === selectedPostId);

    if (!selectedPrev) return;

    // categoryId가 있으면 그대로 사용
    if (typeof (selectedPrev as any).categoryId === "number") {
      setCategory((selectedPrev as any).categoryId);
      return;
    }

    // categoryName만 있는 경우: 문자열 매칭/동적 추가
    const name = (selectedPrev as any).categoryName as string | undefined;
    if (!name) return;

    setCategories((prev) => {
      const idx = prev.findIndex((c) => normalize(c) === normalize(name));
      if (idx !== -1) {
        setCategory(idx + 1);
        return prev;
      }
      const next = [...prev, name];
      setCategory(next.length);
      return next;
    });
  }, [selectedStep, selectedPostId, previousPosts]);

  // button 스타일
  const buttonStyle =
    "body4 w-auto px-[13px] py-[6px] rounded-[20px] flex items-center justify-center cursor-pointer";

  // 버튼 비활성화 및 자동 포커스
  const isFormValid = !!title.trim() && !!content.trim() && !!category;

  const handleSubmit = (situation: "OOPS" | "OVERCOMING" | "OVERCOME") => {
    if (!title.trim()) {
      titleRef.current?.focus();
      return;
    }

    if (!content.trim()) {
      contentRef.current?.focus();
      return;
    }

    if (!category) {
      setIsDropdownOpen(true);
      categoryRef.current?.focus();
      return;
    }

    submitPost(situation);
  };

  return (
    <div className="flex justify-center items-center ">
      {/* <Navbar /> 들어가면 됨 */}
      <div className="w-full h-full bg-[#FFFBF8] ">
        {/* 첫번째 section */}
        <section className="w-full pt-[17px] pb-[30px] flex flex-col gap-[20px]">
          {/* 글작성 */}
          <div className="h2 flex items-center gap-[8px] ">
            <button className="cursor-pointer" onClick={() => navigate(-1)}>
              <LeftPoint />
            </button>
            글작성
          </div>

          {/* 제목 및 본문 입력 */}
          <div className="w-full ">
            <input
              ref={titleRef}
              required
              placeholder="제목 (필수)"
              className="body1 placeholder:body1 placeholder-[#999] mb-[14px] pl-[16px] [box-shadow:inset_0_0_5.4px_rgba(0,0,0,0.25)] w-full h-[50px] bg-transparent border-transparent border-[1px] rounded-[4px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              ref={contentRef}
              required
              placeholder="내용을 입력해주세요. (필수)"
              className="caption1 placeholder:caption1 placeholder-[#999] w-full min-h-[155px] [box-shadow:inset_0_0_5.4px_rgba(0,0,0,0.25)] bg-transparent border-transparent border-[1px] rounded-[4px] pl-[16px] pt-[14px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        <hr className="border-[#E6E6E6] -mx-[20px] border-[1px]" />

        {/* 두번째 section */}
        {/* 진행상황 선택 */}
        <section className="w-full py-[20px] flex flex-col gap-[12px] items-start">
          <div className="body2 w-[242px] h-[19px] ">진행상황 선택</div>
          <div className="flex items-start w-full gap-[14px] font-['Pretendard'] rounded-lg overflow-hidden border-none">
            <button
              className={`${buttonStyle} ${
                selectedStep === 0 ? "bg-[#B3E378]" : "bg-[#E6E6E6] text-black"
              }`}
              onClick={() => dispatch(setSelectedStep(0))}
            >
              웁스 중
            </button>
            <button
              className={`${buttonStyle} ${
                selectedStep === 1 ? "bg-[#B3E378]" : "bg-[#E6E6E6] text-black"
              }`}
              onClick={() => dispatch(setSelectedStep(1))}
            >
              극복 중
            </button>
            <button
              className={`${buttonStyle} ${
                selectedStep === 2 ? "bg-[#B3E378]" : "bg-[#E6E6E6] text-black"
              }`}
              onClick={() => dispatch(setSelectedStep(2))}
            >
              극복 완료
            </button>
          </div>

          {/* 웁스 중, 극복 중, 극복 완료 리스트 */}

          {selectedStep === 1 && (
            <PostList
              posts={previousPosts.filter((p) => p.situation === "OOPS")}
              onSelect={(id) => dispatch(setSelectedPostId(id))}
              step={selectedStep}
            />
          )}
          {selectedStep === 2 && (
            <PostList
              posts={previousPosts.filter((p) => p.situation === "OVERCOMING")}
              onSelect={(id) => dispatch(setSelectedPostId(id))}
              step={selectedStep}
            />
          )}
        </section>
        <hr className="border-[#E6E6E6] -mx-[20px] border-[1px]" />

        {/* 세번째 section */}
        {/* 이미지 업로드 */}
        <section className="w-full py-[20px] flex flex-col items-start">
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
              {imagePreviews.map((src, idx) => (
                <div
                  key={idx}
                  className="w-[80px] h-[80px] border border-black flex items-center justify-center cursor-pointer flex-shrink-0"
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== idx));
                    setImagePreviews(imagePreviews.filter((_, i) => i !== idx));
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

        <hr className="border-[#E6E6E6] -mx-[20px] border-[1px]" />

        {/* 세번째 섹션 */}
        {/* 카테고리 선택 영역 */}
        <section
          className="flex justify-start gap-[30px] pt-[20px] relative"
          ref={dropdownRef}
        >
          <form className="flex flex-col justify-start gap-[16px] w-[120px]">
            <div className="body2">카테고리 선택</div>

            {/* 드롭다운 버튼 */}
            <button
              type="button"
              ref={categoryRef}
              className="body4 w-full flex justify-between h-[30px] z-10 px-[10px] py-[6px] rounded-[20px] cursor-pointer bg-[#E6E6E6] outline-none select-none"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {/* ✅ 선택된 카테고리 이름 보여주기 */}
              {category ? categories[category - 1] : "카테고리 선택"}

              {isDropdownOpen ? (
                <UpArrow className="w-[18px] h-[18px]" />
              ) : (
                <DownArrow className="w-[18px] h-[18px]" />
              )}
            </button>

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
                      setCategory(idx + 1); // 1부터 시작하는 ID로 저장
                      setIsDropdownOpen(false);
                    }}
                    className={`body4 px-[13px] py-[8px] cursor-pointer
                      ${category === idx + 1 ? "text-black" : "text-[#999999]"}
                      ${
                        idx !== categories.length - 1
                          ? "border-b border-[#e6e6e6]"
                          : ""
                      }
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
          {selectedStep === 0 && (
            <button
              disabled={!isFormValid}
              className="bg-[#B3E378] cursor-pointer w-[335px] h-[50px] px-6 font-bold"
              onClick={() => handleSubmit("OOPS")}
            >
              작성
            </button>
          )}
          {selectedStep === 1 && selectedPostId && (
            <button
              disabled={!isFormValid}
              className="bg-[#B3E378] cursor-pointer w-[335px] h-[50px] px-6 font-bold"
              onClick={() => handleSubmit("OVERCOMING")}
            >
              작성
            </button>
          )}
          {selectedStep === 2 && selectedPostId && (
            <button
              disabled={!isFormValid}
              className="bg-[#B3E378] cursor-pointer w-[335px] h-[50px] px-6 font-bold"
              onClick={() => handleSubmit("OVERCOME")}
            >
              작성
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostWrite;
