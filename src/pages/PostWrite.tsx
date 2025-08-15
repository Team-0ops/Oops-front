import { useState, useRef, useEffect, useMemo, useCallback } from "react";
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

const BASE_CATEGORY_COUNT = 15;
const normalize = (s: string) => s.trim().toLowerCase();

const PostWrite = () => {
  //토픽 이름 받아오기
  const location = useLocation();
  const topicNameFromState: string = location.state?.topicName;
  // 토픽 마스터 (이름 ↔ id 매핑) — 실제 서비스 상황에 맞춰 교체 가능
  const topicMaster = useMemo(
    () =>
      [
        "발표",
        "노래",
        "고백",
        "택배",
        "지각",
        "회식",
        "시험",
        "길 찾기",
        "운전",
        "SNS",
        "면접",
        "이사",
        "다이어트",
        "선물",
        "소개팅",
        "기프티콘",
        "집중력",
        "핸드폰",
        "첫인상",
        "알바",
      ] as const,
    []
  );
  const topicIdMap = useMemo(() => {
    const m = new Map<string, number>();
    topicMaster.forEach((name, idx) => m.set(normalize(name), idx + 1));
    return m;
  }, [topicMaster]);

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
  const [commentType, setCommentType] = useState<string[]>([]);

  // 새 구조: 라벨만 직접 선택/표시
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  // 실제 서버로 보낼 ID — 라벨 매핑에 의해 자동 결정
  const [categoryId, setCategoryId] = useState<number | null>(null); // 1~15
  const [topicId, setTopicId] = useState<number | null>(null); // 토픽에 매칭되면 세팅

  const [categories] = useState<string[]>([
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
  const [topics, setTopics] = useState<string[]>([]); // 표시/매칭용 토픽 라벨 목록

  // ui
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 이전 단계 글 목록
  const { posts: previousPosts, fetchPreviousPosts } = usePreviousPosts();

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

  // 매핑용 맵

  // 카테고리(1~15) 라벨 → categoryId
  const categoryMap = useMemo(() => {
    const m = new Map<string, number>();
    categories.slice(0, BASE_CATEGORY_COUNT).forEach((name, idx) => {
      m.set(normalize(name), idx + 1); // 1-based
    });
    return m;
  }, [categories]);

  // 토픽 라벨 → 존재 여부 (topicId는 topicIdMap을 사용)
  const topicSet = useMemo(() => {
    const s = new Set<string>();
    topics.forEach((name) => s.add(normalize(name)));
    return s;
  }, [topics]);

  // 화면 표시용 목록: 카테고리 + 토픽(중복 제거)
  const displayList = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const name of categories) {
      const n = normalize(name);
      if (!seen.has(n)) {
        seen.add(n);
        list.push(name);
      }
    }
    for (const name of topics) {
      const n = normalize(name);
      if (!seen.has(n)) {
        seen.add(n);
        list.push(name);
      }
    }
    return list;
  }, [categories, topics]);

  // 선택 라벨 -> id적용
  const applySelection = useCallback(
    (label: string | null) => {
      setSelectedLabel(label);

      if (!label) {
        setCategoryId(null);
        setTopicId(null);
        return;
      }

      const key = normalize(label);

      // 카테고리(1~15 범위) 우선
      const cid = categoryMap.get(key);
      if (cid && cid >= 1 && cid <= BASE_CATEGORY_COUNT) {
        setCategoryId(cid);
        setTopicId(null);
        return;
      }

      // 카테고리에 없고 토픽에 있으면 topicId 세팅, categoryId는 null
      if (topicSet.has(key)) {
        const tid = topicIdMap.get(key) ?? null; // 실제 토픽 ID 매핑
        setCategoryId(null);
        setTopicId(tid);
        return;
      }

      // 둘 다 아니면 null
      setCategoryId(null);
      setTopicId(null);
    },
    [categoryMap, topicSet, topicIdMap]
  );

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

    // topics 목록에 없으면 추가
    setTopics((prev) => {
      const k = normalize(topicNameFromState);
      return prev.some((t) => normalize(t) === k)
        ? prev
        : [...prev, topicNameFromState];
    });

    // 선택 라벨을 이 주제로 지정 (ID는 규칙에 따라 자동 결정)
    applySelection(topicNameFromState);
  }, [topicNameFromState, applySelection]);

  // OopsList에서 클릭했을때 해당하는 카테고리 고정

  useEffect(() => {
    if (!selectedPostId) return;

    const sourceSituation =
      selectedStep === 1 ? "OOPS" : selectedStep === 2 ? "OVERCOMING" : null;
    if (!sourceSituation) return;

    const selectedPrev = previousPosts
      .filter((p) => p.situation === sourceSituation)
      .find((p) => p.postId === selectedPostId);
    if (!selectedPrev) return;

    // 1) categoryId가 1~15면 해당 라벨로 선택
    if (typeof (selectedPrev as any).categoryId === "number") {
      const cid = (selectedPrev as any).categoryId as number;
      if (cid >= 1 && cid <= BASE_CATEGORY_COUNT) {
        const label = categories[cid - 1];
        if (label) applySelection(label);
        return;
      }
    }

    // 2) categoryName이 있으면 라벨로 선택 (카테고리/토픽 여부는 applySelection이 판별)
    const name = (selectedPrev as any).categoryName as string | undefined;
    if (name) {
      applySelection(name);
      return;
    }

    // 3) (필요 시) topicName이 별도로 온다면 여기에 적용
    // const tname = (selectedPrev as any).topicName as string | undefined;
    // if (tname) applySelection(tname);
  }, [selectedStep, selectedPostId, previousPosts, categories, applySelection]);

  // 전송

  const clampCategoryId = (id: number | null) =>
    id && id >= 1 && id <= BASE_CATEGORY_COUNT ? id : null;

  const submitPost = async (situation: "OOPS" | "OVERCOMING" | "OVERCOME") => {
    const data: OopsPost = {
      title,
      content,
      situation,
      categoryId: clampCategoryId(categoryId),
      topicId: topicId ?? null,
      previousPostId: situation !== "OOPS" ? selectedPostId : null,
      wantedCommentTypes: commentType.map((type) =>
        type === "조언" ? "ADVICE" : "EMPATHY"
      ),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    images.forEach((file) => formData.append("images", file));

    try {
      const res = await axiosInstance.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      setImagePreviews([]);
      setCommentType([]);
      // 선택값 초기화(선택 사항)
      setSelectedLabel(null); setCategoryId(null); setTopicId(null);
      console.log("성공");
    } catch (error) {
      console.error(error);
    }
  };

  // button 스타일
  const buttonStyle =
    "body4 w-auto px-[13px] py-[6px] rounded-[20px] flex items-center justify-center cursor-pointer";

  // 버튼 비활성화 및 자동 포커스
  const isFormValid =
    !!title.trim() && !!content.trim() && (!!categoryId || !!topicId);

  // 핸들러
  const handleSubmit = (situation: "OOPS" | "OVERCOMING" | "OVERCOME") => {
    if (!title.trim()) {
      titleRef.current?.focus();
      return;
    }
    if (!content.trim()) {
      contentRef.current?.focus();
      return;
    }
    if (!categoryId && !topicId) {
      setIsDropdownOpen(true);
      categoryRef.current?.focus();
      return;
    }
    submitPost(situation);
  };

  return (
    <div className="flex justify-center items-center ">
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
              {selectedLabel ?? "카테고리 선택"}
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
                  w-[120px] h-[180px]
                  rounded-b-[10px]
                  overflow-y-scroll text-[14px] shadow
                "
              >
                {displayList.map((label, idx) => {
                  const isSelected =
                    selectedLabel &&
                    normalize(selectedLabel) === normalize(label);
                  return (
                    <li
                      key={`${label}-${idx}`}
                      onClick={() => {
                        applySelection(label);
                        setIsDropdownOpen(false);
                      }}
                      className={`body4 px-[13px] py-[8px] cursor-pointer
                        ${isSelected ? "text-black" : "text-[#999999]"}
                        ${
                          idx !== displayList.length - 1
                            ? "border-b border-[#e6e6e6]"
                            : ""
                        }`}
                    >
                      {label}
                    </li>
                  );
                })}
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
