import Logo from "../assets/icons/newLogo.svg?react";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const PostSuccess = () => {
  const navigate = useNavigate();
  const handleMain = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full h-full pb-[21px] ">
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
            <button className="body4 bg-[#B3E378] cursor-pointer w-[335px] h-[50px] rounded-[4px] ">
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

        {/* 두번째 섹션 */}
        {/* 추천 글 */}
        <section className="bg-[#FFFBF8] -mx-[20px] flex flex-col items-center w-screen
         mb-[20px]">
          {/* 추천 글을 여기다 끌어오면 됨 */}

          {/* 주제 */}
          <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
            작은 일 추천 글
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            내가 있잖아?
            <span className="body4 bg-[#B3E378] mr-[20px] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px] ">
              웁스 중
            </span>
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            지금 너무너무 졸린데
            <span className="body4 bg-[#14441a] mr-[20px] text-[#b3e378] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px] ">
              극복 중
            </span>
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            알바 출근하기 싫을 때
            <span className="body4 bg-[#B3E378] mr-[20px] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] ">
              웁스 중
            </span>
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            꿀팁 전수요
            <span className="body4 bg-[#14441a] mr-[20px] text-[#b3e378] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px] ">
              극복 중
            </span>
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            그냥 안가면 돼...
            <span className="body4 bg-[#B3E378] mr-[20px] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px] ">
              웁스 중
            </span>
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            알바같이 하는 애한테 너무 미안하네
            <span className="body4 bg-[#1d1d1d] mr-[20px] text-[#b3e378] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px] ">
              극복 완
            </span>
          </div>
        </section>

        {/* 세번째 섹션 */}
        {/* 베스트 글 */}
        <section className="bg-[#FFFBF8] -mx-[20px] flex flex-col items-center font-[pretendard] w-screen mb-[20px]">
          {/* 주제 */}
          <div className="body2 flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px]">
            베스트 Failers
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] ">
            내가 있잖아?
            <span className="body4 bg-[#B3E378] mr-[20px] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px]">
              웁스 중
            </span>
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] ">
            지금 너무너무 졸린데
            <span className="body4 bg-[#B3E378] mr-[20px] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px]">
              극복 중
            </span>
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            꿀팁 전수요
            <span className="body4 bg-[#B3E378] mr-[20px] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px]">
              웁스 중
            </span>
          </div>

          <div className="caption2 text-[#666666] flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px]">
            그냥 안가면 돼...
            <span className="body4 bg-[#B3E378] mr-[20px] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] w-auto h-[24px]">
              웁스 중
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostSuccess;
