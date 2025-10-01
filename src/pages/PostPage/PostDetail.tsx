import ReportIcon from "../../assets/icons/ReportIcon.svg?react";
import LeftIcon from "../../assets/icons/left-point.svg?react";
import Like from "../../assets/icons/GrayLike.svg?react";
import CommentIcon from "../../assets/icons/CommentIcon.svg?react";
import EyeIcon from "../../assets/icons/EyeIcon.svg?react";
import RedLike from "../../assets/icons/RedLike.svg?react";
import Icon from "../../assets/icons/BasicIcon.svg?react";

import CommentList from "../../components/comment/CommentList";
import FeedbackView from "../../components/modals/feedback/FeedbackView";
import Report from "../../components/modals/report/Report";
import DeleteModal from "../../components/modals/deleteAlert/Delete";
import type { ReportTarget } from "../../components/modals/report/Report";
import { usePostDetail } from "../../hooks/PostPage/PostHook/usePostDetail";
import { useCheer, useIsCheered } from "../../hooks/PostPage/PostHook/useCheer";
import { getLesson } from "../../hooks/PostPage/GetHook/useGetLesson";
import { categoryData } from "../CategoryFeed";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useDeletePost } from "../../hooks/PostPage/DeleteHook/useDeletePost";
import { useGetRecommendations } from "../../hooks/PostPage/GetHook/useGetRecommendations";
import { SituationRow } from "../../components/common/Row";
import { useCommentOptimistic } from "../../hooks/Mutation/useCommentOptimistic";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Feedback from "../../components/modals/feedback/Feedback";

// 상황 키와 라벨 매핑
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

/**
 * PostDetail 컴포넌트
 * - 게시글 상세 조회 / 댓글 / 교훈 / 신고 / 삭제 / 추천글까지 포함하는 페이지
 * - Swiper를 활용해 "웁스 중 → 극복 중 → 극복 완료" 게시글을 슬라이드로 전환
 * - Optimistic UI를 통한 댓글/좋아요 반영
 */
const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{
    postId: string;
  }>();

  const { postDetail, loading } = usePostDetail(Number(postId)); // 게시글 상세 조회
  const { deletePost } = useDeletePost(); // 게시글 삭제
  const { data, loadingRecommendation, error } = useGetRecommendations(
    Number(postId)
  ); // 추천 글
  const { toggleCheer } = useCheer(); // 좋아요(응원) 토글

  // 추천글리스트에 해당하는 게시글로 페이지 전환
  const goToPost = (id: number) => navigate(`/post/${id}`);

  // Redux에서 내 userId 확인 (내 게시글 여부 판단용)
  const userId = useSelector((state: RootState) => state.user.userId);

  // 프로필 클릭시 해당 프로필로 이동하기 위한 로직
  const goAuthorProfile = (u: {
    userId?: number;
    nickname?: string;
    profileImage?: string;
  }) => {
    if (!u?.userId) return; //uerId값이 없다면 함수 종료
    navigate(`/users/${u.userId}`, {
      state: {
        nickname: u?.nickname ?? "",
        profileImageUrl: u?.profileImage ?? null,
      },
    });
  };

  // 교훈을 작성하기 위한 모달을 띄우기 위한 state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  // 교훈을 작성했는지 안했는지 판단을 하기위한 state
  const [isLessonWritten, setIsLessonWritten] = useState(false);
  // 작성한 교훈 모달을 띄우기 위한 state
  const [showLessonView, setShowLessonView] = useState(false);
  // 삭제 모달을 띄우기 위한 state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // 신고 모달을 띄우기 위한 state
  const [showReportModal, setShowReportModal] = useState(false);

  // Swiper 라이브러리를 통해 버튼과 본문의 현재위치를 알기위함
  const buttonSwiperRef = useRef<SwiperCore | null>(null);
  const contentSwiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 이미지 에러 처리
  const [imgError, setImgError] = useState(false);

  // 댓글 입력과 optimistic ui적용
  const [commentInput, setCommentInput] = useState("");
  const [localComments, setLocalComments] = useState<any[]>([]);
  const { addComment } = useCommentOptimistic({
    userId,
    setLocalComments,
    setInput: setCommentInput, // 일반 댓글 입력창 비우기용
  });

  // 댓글 작성 버튼 핸들러
  const handleAddComment = () => {
    if (!commentInput.trim() || !currentPostId) return;
    addComment({
      postId: Number(currentPostId),
      content: commentInput,
      parentId: null, // 일반 댓글
    });
  };

  // 현재 슬라이드에서 표시할 게시글
  const validPosts = SITUATION_ORDER.map((key) => postDetail?.[key]).filter(
    (p): p is NonNullable<typeof p> => !!p
  );

  // 슬라이드 전환 시 postId 변환 핸들러
  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
    buttonSwiperRef.current?.slideTo(index);
    contentSwiperRef.current?.slideTo(index);

    const nextPostId = validPosts[index]?.postId;
    if (nextPostId) navigate(`/post/${nextPostId}`, { replace: false });
  };

  const currentPost = validPosts[activeIndex];
  const currentPostId = currentPost?.postId;

  // 현재 게시글의 댓글들
  const currentComments =
    (currentPost?.comments ?? []).map((comment: any) => ({
      id: comment.commentId,
      content: comment.content,
      userName: comment.userName,
      likes: comment.likes,
      createdAt: comment.createdAt,
      parentId: comment.parentId,
      liked: comment.liked,
      userId: comment.userId,
    })) || [];

  // 교훈 존재 여부 확인
  useEffect(() => {
    const checkLessonExists = async () => {
      if (!currentPostId) return;
      try {
        const result = await getLesson(currentPostId);
        if (result) setIsLessonWritten(true);
        console.log("교훈 결과", result, isLessonWritten, currentPostId);
      } catch (e) {
        setIsLessonWritten(false);
        console.log("교훈이 아직 없음");
        throw e;
      }
    };

    checkLessonExists();
  }, [currentPostId]);

  // 댓글 리스트 동기화
  useEffect(() => {
    setLocalComments(currentComments);
  }, [activeIndex, postDetail]);

  // 게시글 신고 대상 정의
  const reportTarget: ReportTarget = {
    type: "post",
    id: String(currentPost?.postId),
    author: currentPost?.nickname ?? "",
    content: currentPost?.content ?? "",
  };

  // 카테고리 key 매핑 
  const getCategoryKeyByLabel = (label: string) => {
    const entry = Object.entries(categoryData).find(
      ([, value]) => value.label === label
    );
    return entry ? entry[0] : null;
  };

  // 시간표현 "~~시간 전"과 같이 표현하기
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

  // postDetail 로드 후, URL의 postId가 속한 슬라이드로 이동
  useEffect(() => {
    if (!postDetail || !postId) return;
    const idNum = Number(postId);

    // 현재 로드된 세 개(또는 그 이하) 포스트 중에서 postId가 위치한 인덱스 탐색
    const idx = validPosts.findIndex((p) => p?.postId === idNum);
    if (idx >= 0) {
      setActiveIndex(idx);
      // 버튼/본문 스와이퍼를 모두 같은 인덱스로 맞춤 (애니메이션 없이 즉시)
      buttonSwiperRef.current?.slideTo(idx, 0);
      contentSwiperRef.current?.slideTo(idx, 0);
    }
  }, [postDetail, postId]); // postDetail이 바뀌거나 주소가 바뀌면 재동기화

  // 초기 진입 & postId가 바뀔 때마다 최상단으로 스크롤
  useEffect(() => {
    // 크로스 브라우저 안정화
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [postId]);

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
              if (postDetail.category?.categoryId) {
                const categoryKey = getCategoryKeyByLabel(
                  postDetail.category.name
                );
                if (categoryKey) {
                  navigate(`/category-feed/${categoryKey}`);
                } else {
                  alert("카테고리 정보를 찾을 수 없습니다.");
                }
              } else if (postDetail.randomTopic?.randomTopicId) {
                navigate(`/random-feed`);
              }
            }}
          >
            <LeftIcon className="w-[24px] h-[24px]" />
          </button>
          {postDetail.category?.categoryId
            ? postDetail.category.name
            : (postDetail.randomTopic?.randomTopicName ?? "")}
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
                    {/* 아바타 클릭하면 프로필 이동 */}
                    <button
                      onClick={() =>
                        goAuthorProfile({
                          userId: post?.userId,
                          nickname: post?.nickname,
                          profileImage: post?.profileImage,
                        })
                      }
                      className="w-[42px] h-[42px] rounded-[4px] overflow-hidden bg-[#9a9a9a] shrink-0"
                      aria-label="작성자 프로필로 이동"
                    >
                      {post?.profileImage && !imgError ? (
                        <img
                          src={post.profileImage}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <Icon className="w-full h-full" />
                      )}
                    </button>
                    <div className="flex justify-between w-full items-center">
                      <div className="flex flex-col gap-[4px]">
                        {/* 닉네임도 클릭하면 프로필 이동 */}
                        <button
                          className="body2 text-left text-[#1d1d1d] hover:underline"
                          onClick={() =>
                            goAuthorProfile({
                              userId: post?.userId,
                              nickname: post?.nickname,
                              profileImage: post?.profileImage,
                            })
                          }
                          aria-label="작성자 프로필로 이동"
                        >
                          {post?.nickname ?? "닉네임 없음"}
                        </button>
                        <span className="body5 text-[#999999]">
                          {formatRelativeTime(String(post?.created_at))}
                        </span>
                      </div>
                      <div className="flex items-center gap-[4px]">
                        {Number(userId) === currentPost?.userId ? (
                          <>
                            <button
                              className="body2 text-[#ffffff] h-[30px] bg-[#262626] px-[12px] py-[5px] rounded-[4px]"
                              onClick={() => setShowDeleteModal(true)}
                            >
                              삭제
                            </button>
                          </>
                        ) : (
                          <>
                            {isLessonWritten ? (
                              <button
                                className="body2 bg-[#b3e378] text-black h-[30px] px-[12px] py-[5px] rounded-[4px]"
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
                            <div className="w-[30px] h-[30px] p-[6px] cursor-pointer rounded-[4px] bg-black">
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
                  <div className="body6 whitespace-pre-line w-full mb-[16px] text-[#4d4d4d] break-words">
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
                    <CheerBlock
                      postId={post.postId}
                      liked={post.liked}
                      likes={post.likes}
                      onToggle={() => {
                        toggleCheer(post.postId);
                      }}
                    />
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
        <section className="mt-[20px] -mx-[20px] mb-[40px] flex flex-col w-screen">
          <CommentList
            comments={localComments}
            postId={Number(currentPostId)}
            onReplySubmit={(parentId: string, text: string) =>
              addComment({
                postId: Number(currentPostId),
                content: text,
                parentId,
              })
            }
          />
        </section>

        {/* 로딩/에러 */}
        {loadingRecommendation && (
          <div className="-mx-[20px] w-screen bg-[#FFFBF8] py-[20px] text-center text-[#666]">
            추천 글을 불러오는 중...
          </div>
        )}
        {error && (
          <div className="-mx-[20px] w-screen bg-[#FFFBF8] py-[20px] text-center text-red-500">
            추천 글을 불러오는 데 실패했습니다.
          </div>
        )}

        {/* 두번째 섹션 — 추천 글 */}
        {!loading && !error && (
          <section className="bg-[#FFFBF8] -mx-[20px] flex flex-col items-center w-screen mb-[20px]">
            <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
              {postDetail.category?.categoryId
                ? `${postDetail.category.name} 추천 글`
                : `${postDetail.randomTopic?.randomTopicName} 추천 글`}
            </div>

            {data?.similarPosts?.length ? (
              data.similarPosts.map((p) => (
                <SituationRow
                  key={p.postId}
                  title={p.title}
                  situation={p.situation}
                  onClick={() => goToPost(p.postId)}
                />
              ))
            ) : (
              <div className="caption2 text-[#999] w-full pl-[38px] py-[12px] border-b-[1px] border-[#e9e5e2]">
                추천 글이 아직 없습니다.
              </div>
            )}
          </section>
        )}

        {/* 세번째 섹션 — 베스트 글 */}
        {!loading && !error && (
          <section className="bg-[#FFFBF8] -mx-[20px] flex flex-col items-center w-screen ">
            <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
              베스트 Failers
            </div>

            {data?.bestFailers?.length ? (
              data.bestFailers.map((p) => (
                <SituationRow
                  key={p.postId}
                  title={p.title}
                  situation={p.situation}
                  onClick={() => goToPost(p.postId)}
                />
              ))
            ) : (
              <div className="caption2 text-[#999] w-full pl-[38px] py-[12px] border-b-[1px] border-[#e9e5e2]">
                베스트 글이 아직 없습니다.
              </div>
            )}
          </section>
        )}
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
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (currentPostId) {
              deletePost(Number(currentPostId));
              navigate("/");
            }
          }}
        />
      )}
    </>
  );
};

export default PostDetail;

/**
 * CheerBlock 서브컴포넌트
 * - 좋아요(응원) 버튼과 수치 표시
 * - useIsCheered 훅을 통해 Optimistic 상태와 서버 상태를 합성하여 표시
 */
function CheerBlock({
  postId,
  liked,
  likes,
  onToggle,
}: {
  postId: number;
  liked: boolean;
  likes: number;
  onToggle: () => void;
}) {
  // 훅을 컴포넌트 최상위에서 호출 (규칙 준수)
  const cheered = useIsCheered(postId);

  // 서버값 + overlay 합성
  const shownLiked = cheered ? !liked : liked;
  const shownLikes = cheered ? (liked ? likes - 1 : likes + 1) : likes;

  return (
    <div className="flex items-center gap-[4px]">
      <button onClick={onToggle} className="cursor-pointer">
        {shownLiked ? (
          <RedLike className="cursor-pointer" />
        ) : (
          <Like className="cursor-pointer" />
        )}
      </button>
      <span className="caption2 text-[#666]">응원해요 {shownLikes}</span>
    </div>
  );
}
