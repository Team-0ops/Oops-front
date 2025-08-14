import Logo from "../assets/icons/newLogo.svg?react";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetRecommendations } from "../hooks/PostPage/useGetRecommendations";
import { SituationRow } from "../components/common/Row";
import { usePostDetail } from "../hooks/PostPage/usePostDetail";

const PostSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.state?.postId;
  const {postDetail} = usePostDetail(Number(postId));

  const goToDetail = () => {
    if (!postId) return alert("방금 작성한 게시글이 없습니다.");
    navigate(`/post/${postId}`);
  };

  const handleMain = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, loadingRecommendation, error } = useGetRecommendations(postId ?? 0);

  const goToPost = (id: number) => navigate(`/post/${id}`);

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full h-full ">
        {/* 첫번째 섹션 */}
        {/* 로고 ~ 버튼 */}
        <section className="bg-[#FFFBF8] flex flex-col items-center mt-[1px] mb-[30px] px-[20px]">
          <Logo className="mt-[81px] w-[94px] h-[127px]" />
          <div className="h1 mt-[54px] w-auto h-[29px]">작성 완료!</div>
          <div className="body3 mt-[12px] w-auto h-[19px]">
            10포인트 제공 완료
          </div>
          {/* 버튼 */}
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

        {/* 두번째 섹션 — 추천 글 */}
        {!loadingRecommendation && !error && (
          <section className="bg-[#FFFBF8] -mx-[20px] flex flex-col items-center w-screen mb-[20px]">
            <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
              {`${postDetail?.category.name} 추천 글`}
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
