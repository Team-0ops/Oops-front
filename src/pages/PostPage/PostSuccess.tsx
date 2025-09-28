import Logo from "../../assets/icons/newLogo.svg?react";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetRecommendations } from "../../hooks/PostPage/GetHook/useGetRecommendations";
import { SituationRow } from "../../components/common/Row";
import { usePostDetail } from "../../hooks/PostPage/PostHook/usePostDetail";

/**
 * PostSuccess 컴포넌트
 * - 글 작성 완료 후 보여지는 페이지
 * - 방금 작성한 글 상세보기 이동 / 메인 피드 이동 버튼 제공
 * - 추천 글 및 베스트 Failers 목록 표시
 */
const PostSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.state?.postId; // 방금 작성한 게시글 id
  const { postDetail } = usePostDetail(Number(postId)); // 상세 데이터 조회

  // 상세보기 이동
  const goToDetail = () => {
    if (!postId) return alert("방금 작성한 게시글이 없습니다.");
    navigate(`/post/${postId}`);
  };

  // 메인 피드 이동
  const handleMain = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 추천 글 불러오기
  const { data, loadingRecommendation, error } = useGetRecommendations(
    postId ?? 0
  );
  const goToPost = (id: number) => navigate(`/post/${id}`);

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full h-full ">
        {/* 작성 완료 안내 및 버튼 */}
        <section className="bg-[#FFFBF8] flex flex-col items-center mt-[1px] mb-[30px] px-[20px]">
          <Logo className="mt-[81px] w-[94px] h-[127px]" />
          <div className="h1 mt-[54px] w-auto h-[29px]">작성 완료!</div>
          <div className="body3 mt-[12px] w-auto h-[19px]">
            10포인트 제공 완료
          </div>

          {/* 버튼 영역*/}
          <div className="flex justify-center items-center mb-[10px] mt-[60px]">
            <button
              onClick={goToDetail}
              className="body4 bg-[#B3E378] cursor-pointer w-[335px] h-[50px] rounded-[4px] "
            >
              방금 작성한 게시글 보러가기
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleMain()}
              type="button"
              className="body4 bg-[#1d1d1d] cursor-pointer w-[335px] h-[50px] rounded-[4px]  text-[#b3e378] "
            >
              메인 피드로 돌아가기
            </button>
          </div>
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

        {/* 추천 글 */}
        {!loadingRecommendation && !error && (
          <section className="bg-[#FFFBF8] -mx-[20px] flex flex-col items-center w-screen mb-[20px]">
            <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
              {postDetail?.category?.categoryId
                ? `${postDetail.category.name} 추천 글`
                : `${postDetail?.randomTopic?.randomTopicName} 추천 글`}
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

        {/* 베스트 글 */}
        {!loadingRecommendation && !error && (
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
    </div>
  );
};

export default PostSuccess;
