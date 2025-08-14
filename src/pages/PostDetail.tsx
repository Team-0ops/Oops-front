import ReportIcon from "../assets/icons/ReportIcon.svg?react";
import LeftIcon from "../assets/icons/left-point.svg?react";
import Like from "../assets/icons/GrayLike.svg?react";
import CommentIcon from "../assets/icons/CommentIcon.svg?react";
import EyeIcon from "../assets/icons/EyeIcon.svg?react";
import RedLike from "../assets/icons/RedLike.svg?react";

import CommentList from "../components/comment/CommentList";
import FeedbackView from "../components/modals/FeedbackView";
import Report from "../components/modals/Report";
import type { ReportTarget } from "../components/modals/Report";
import { usePostDetail } from "../hooks/PostPage/usePostDetail";
import { submitComment } from "../hooks/PostPage/useSubmitComment";
import { useCheer } from "../hooks/PostPage/useCheer";
import { getLesson } from "../hooks/PostPage/useGetLesson";
import { categoryData } from "./CategoryFeed";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useDeletePost } from "../hooks/PostPage/useDeletePost";

import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Feedback from "../components/modals/Feedback";

const SITUATION_ORDER = [
  "postFailure",
  "postOvercoming",
  "postOvercome",
] as const;

const SITUATION_LABEL: Record<(typeof SITUATION_ORDER)[number], string> = {
  postFailure: "웁스 중",
  postOvercoming: "극복 중",
  postOvercome: "극복 완료",
};

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{
    postId: string;
  }>();

  //api 관련 훅
  const { postDetail, loading } = usePostDetail(Number(postId));
  const { toggleCheer } = useCheer();
  const { deletePost, success } = useDeletePost();

  //userId 뽑아오기 (내 게시글인지 인식표)
  const userId = useSelector((state: RootState) => state.user.userId);

  //모달
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showLessonView, setShowLessonView] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLessonWritten, setIsLessonWritten] = useState(false);

  const buttonSwiperRef = useRef<SwiperCore | null>(null);
  const contentSwiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [commentInput, setCommentInput] = useState("");

  const [localComments, setLocalComments] = useState<any[]>([]);

  const validPosts = SITUATION_ORDER.map((key) => postDetail?.[key]).filter(
    (p): p is NonNullable<typeof p> => !!p
  );
  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
    buttonSwiperRef.current?.slideTo(index);
    contentSwiperRef.current?.slideTo(index);

    const nextPostId = validPosts[index]?.postId;
    if (nextPostId) navigate(`/post/${nextPostId}`, { replace: false });
  };
  const currentPost = validPosts[activeIndex];
  const currentPostId = currentPost?.postId;
  const currentComments =
    (currentPost?.comments ?? []).map((comment: any) => ({
      id: comment.commentId?.toString() ?? "",
      content: comment.content,
      author: currentPost.nickname,
      likes: comment.likes,
      createdAt: comment.createdAt,
      parentId: comment.parentId,
      liked: comment.liked,
      userId: comment.userId,
    })) || [];

  useEffect(() => {
    const checkLessonExists = async () => {
      if (!currentPostId) return;
      try {
        const result = await getLesson(currentPostId);
        if (result) setIsLessonWritten(true);
      } catch (e) {
        setIsLessonWritten(false);
        console.log("교훈이 아직 없음");
        throw e;
      }
    };

    checkLessonExists();
  }, [currentPostId]);

  useEffect(() => {
    setLocalComments(currentComments);
  }, [activeIndex, postDetail]);

  // 댓글 추가
  const handleAddComment = async () => {
    if (!commentInput.trim() || !currentPostId) return;

    const newComment = {
      id: Date.now().toString(),
      content: commentInput,
      author: "나",
      likes: 0,
      createdAt: new Date().toISOString(),
      parentId: null,
    };
    setLocalComments((prev) => [newComment, ...prev]);
    setCommentInput("");

    try {
      await submitComment(Number(currentPostId), commentInput, null);
      console.log("댓글 작성 성공!");
    } catch (e) {
      setLocalComments((prev) => prev.filter((c) => c.id !== newComment.id));
      alert("댓글 작성 실패!");
      throw e;
    }
  };

  const reportTarget: ReportTarget = {
    type: "post",
    id: String(currentPost?.postId),
    author: currentPost?.nickname ?? "",
    content: currentPost?.content ?? "",
  };

  const getCategoryKeyByLabel = (label: string) => {
    const entry = Object.entries(categoryData).find(
      ([, value]) => value.label === label
    );
    return entry ? entry[0] : null;
  };

  // 시간표현 ~~시간 전과 같이 표현하기
  const formatRelativeTime = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffMs = now.getTime() - createdDate.getTime();

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return "방금 전";
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 4) return `${diffDays}일 전`;

    // 4일 이상이면 날짜로 표시
    return `${createdDate.getMonth() + 1}월 ${createdDate.getDate()}일`;
  };

  // 작성자 프로필 이동 핸들러 (아바타&닉네임 클릭)
  // const goAuthor = (authorId?: number | string) => (e: any) => {
  //   e.stopPropagation();
  //   if (authorId == null) return;
  //   // 본인이면 마이페이지로
  //   if (String(userId) === String(authorId)) {
  //     navigate("/mypage");
  //   } else {
  //     navigate(`/users/${authorId}`);
  //   }
  // };

  if (loading) return <div>로딩 중...</div>;
  if (!postDetail) return <div>데이터 없음</div>;

  return (
    <>
      <div className="w-full flex flex-col bg-[#fffbf8]">
        <div
          className="
            h2
            flex justify-start items-center gap-[10px]
            h-[24px]
            my-[20px]
            "
        >
          <button
            className="cursor-pointer"
            onClick={() => {
              const categoryKey = getCategoryKeyByLabel(
                postDetail.category.name
              );
              if (categoryKey) {
                navigate(`/category-feed/${categoryKey}`);
              } else {
                alert("카테고리 정보를 찾을 수 없습니다.");
              }
            }}
          >
            <LeftIcon className="w-[24px] h-[24px]" />
          </button>
          {postDetail.category.name}
        </div>

        {/* 첫번째 섹션 게시글 */}
        <section className="w-screen -mx-[20px]  ">
          <Swiper
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={110}
            onSwiper={(swiper) => (buttonSwiperRef.current = swiper)}
            onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            className="w-full h-[50px]"
          >
            {validPosts.map((_post, index) => (
              <SwiperSlide
                key={SITUATION_ORDER[index]}
                className="!w-[80px] flex justify-center items-center"
                style={{ flexShrink: 0 }}
              >
                <button
                  onClick={() => handleSlideChange(index)}
                  className={`body4 w-full py-[6px] h-[30px] rounded-[20px] transition 
          ${
            activeIndex === index
              ? "bg-[#B3E378] text-black"
              : "bg-[#E6E6E6] text-[#393939] opacity-40"
          }`}
                >
                  {SITUATION_LABEL[SITUATION_ORDER[index]]}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 본문 Swiper */}
          <Swiper
            onSwiper={(swiper) => (contentSwiperRef.current = swiper)}
            onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={10}
            className="w-full"
          >
            {validPosts.map((post, index) => (
              <SwiperSlide
                key={SITUATION_ORDER[index]}
                className="flex justify-center items-center !w-[335px]"
              >
                <div className="w-full p-[14px] rounded-[10px] bg-[#f0e7e0] flex flex-col">
                  <div className="flex gap-[6px]">
                    {/* <div className="w-[42px] h-[42px] aspect-square object-cover rounded-[4px] bg-[#9a9a9a]" /> */}
                    {/* 아바타(클릭 시 프로필 이동) */}
                    <button
                      onClick={() =>
                        post?.userId && navigate(`/users/${post.userId}`)
                      }
                      className="w-[42px] h-[42px] rounded-[4px] overflow-hidden bg-[#9a9a9a] shrink-0"
                      aria-label="작성자 프로필로 이동"
                    >
                      {(post as any)?.profileImage && (
                        <img
                          src={(post as any).profileImage}
                          alt="" // alt 텍스트 노출 방지
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                    <div className="flex justify-between w-full items-center">
                      <div className="flex flex-col gap-[4px]">
                        {/* 닉네임도 클릭 시 이동 */}
                        <button
                          className="body2 text-left text-[#1d1d1d] hover:underline"
                          onClick={() =>
                            post?.userId && navigate(`/users/${post.userId}`)
                          }
                          aria-label="작성자 프로필로 이동"
                        >
                          {post?.nickname ?? "닉네임 없음"}
                        </button>
                        {/* <span className="body2 text-[#1d1d1d]">
                          {post ? post.nickname : "닉네임 없음"}
                        </span> */}
                        <span className="body5 text-[#999999]">
                          {formatRelativeTime(String(post?.created_at))}
                        </span>
                      </div>
                      <div className="flex items-center gap-[4px]">
                        {Number(userId) === currentPost?.userId ? (
                          <>
                            <button
                              className="body2 text-[#ffffff] h-[30px] bg-[#262626] px-[12px] py-[5px] rounded-[4px]"
                              onClick={() => {
                                deletePost(Number(currentPostId));
                                {
                                  if (success) navigate("/");
                                }
                              }}
                            >
                              삭제
                            </button>
                          </>
                        ) : (
                          <>
                            {isLessonWritten ? (
                              <button
                                className="body2 text-[#ffffff] h-[30px] px-[12px] py-[5px] bg-black rounded-[4px]"
                                onClick={() => setShowLessonView(true)}
                              >
                                교훈 확인
                              </button>
                            ) : (
                              <button
                                className="body2 text-[#ffffff] h-[30px] px-[12px] py-[5px] bg-black rounded-[4px]"
                                onClick={() => setShowFeedbackModal(true)}
                              >
                                교훈 작성
                              </button>
                            )}
                            <div className="w-[30px] h-[30px] p-[4px] cursor-pointer rounded-[4px] bg-black">
                              <ReportIcon
                                className="w-full h-full"
                                onClick={() => setShowReportModal(true)}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="body1 w-full mt-[20px] mb-[16px]">
                    {post?.title}
                  </div>
                  <div className="body5 w-full mb-[16px] text-[#4d4d4d] break-words">
                    {post?.content}
                  </div>
                  <div>
                    {Array.isArray(post.images) && post.images.length > 0 && (
                      <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        spaceBetween={8}
                        pagination={{ clickable: true, el: null }}
                        className="mb-[22px] w-[307px] h-[220px]"
                      >
                        {post.images.map((src, i) => (
                          <SwiperSlide key={`${post.postId}-img-${i}`}>
                            <div className="w-full rounded-[4px] aspect-[4/3] overflow-hidden ">
                              <img
                                src={src}
                                alt={`post image ${i + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-[4px]">
                      <button
                        onClick={() =>
                          currentPostId && toggleCheer(Number(post?.postId))
                        }
                        className="cursor-pointer"
                      >
                        {post.liked ? (
                          <RedLike className=" cursor-pointer" />
                        ) : (
                          <Like className=" cursor-pointer" />
                        )}
                      </button>
                      <span className="caption2 text-[#666]">
                        응원해요 {post?.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px] ">
                      <CommentIcon className="cursor-pointer" />
                      <span className="caption2 text-[#666]">
                        댓글 {post?.comments.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px] ">
                      <EyeIcon className=" cursor-pointer" />
                      <span className="caption2 text-[#666]">
                        조회수 {post?.watching}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 인디케이터 */}
          <div className="flex justify-center gap-[20px] mt-[18px]">
            {validPosts.map((_, index) => (
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
        <section className="flex flex-col w-full gap-[10px] mt-[20px]">
          <div className="body2 w-full flex justify-start items-start">
            댓글로 조언 남기기
          </div>
          <div className="flex w-full items-center justify-between gap-[13px]">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              style={{
                boxShadow: "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
              placeholder="[조언]을 입력해주세요!"
              className="
              body5 placeholder:body5 
              p-[9px] w-[256px]
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
        <section className="mt-[20px] -mx-[20px] flex flex-col w-screen">
          <CommentList
            comments={localComments}
            postId={Number(currentPostId)}
          />
        </section>

        {/* 카테고리 추천 글 */}
        <section className="mt-[40px] -mx-[20px] flex flex-col">
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
        <section className="mt-[32px] -mx-[20px] mb-[26px] flex flex-col">
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
      {showFeedbackModal && currentPost && (
        <Feedback
          postId={Number(currentPostId)}
          onClose={() => setShowFeedbackModal(false)}
          onSuccess={() => {
            setIsLessonWritten(true);
            setShowFeedbackModal(false);
          }}
          category={postDetail?.category?.name || ""}
          author={currentPost?.nickname || ""}
          title={currentPost?.title || ""}
          content={currentPost?.content || ""}
        />
      )}
      {/* 교훈 확인 말풍선 */}
      {showLessonView && currentPostId && (
        <FeedbackView
          postId={currentPostId}
          onClose={() => setShowLessonView(false)}
        />
      )}
    </>
  );
};

export default PostDetail;
