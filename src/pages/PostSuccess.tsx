import Logo from "../assets/icons/OopsLogo.svg?react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PostSuccess = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-full h-full pb-[21px]">
        <Navbar />
        {/* 첫번째 섹션 */}
        {/* 로고 ~ 버튼 */}
        <section className="bg-[#FFFBF8] flex flex-col items-center font-[pretendard] mt-[1px] mb-[30px] px-[20px]">
          <Logo className="mt-[81px] w-[112px] h-[106px]" />
          <div className="mt-[54px] w-auto h-[29px]  font-bold text-[24px]">
            작성 완료!
          </div>
          <div className="mt-[12px] w-auto h-[19px]  font-medium text-[16px] ">
            10포인트 제공 완료
          </div>
          {/* 버튼 */}
          <div className="flex justify-center items-center mb-[10px] mt-[60px]">
            <button className="bg-[#B3E378] cursor-pointer w-[335px] h-[50px] rounded-[4px] text-[14px] font-semibold">
              방금 작성한 게시글 보러가기
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-[#1d1d1d] cursor-pointer w-[335px] h-[50px] rounded-[4px] text-[14px] text-[#b3e378] font-semibold">
              메인 피드로 돌아가기
            </button>
          </div>
        </section>

        {/* 두번째 섹션 */}
        {/* 추천 글 */}
        <section className="bg-[#FFFBF8] flex flex-col items-center font-[pretendard] w-full mb-[20px]">
          {/* 추천 글을 여기다 끌어오면 됨 */}

          {/* 주제 */}
          <div className="flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px] text-[16px] font-semibold">
            작은 일 추천 글
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            내가 있잖아?
            <span className="bg-[#B3E378] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              웁스 중
            </span>
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            지금 너무너무 졸린데
            <span className="bg-[#14441a] text-[#b3e378] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              극복 중
            </span>
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            알바 출근하기 싫을 때
            <span className="bg-[#B3E378] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              웁스 중
            </span>
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            꿀팁 전수요
            <span className="bg-[#14441a] text-[#b3e378] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              극복 중
            </span>
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            그냥 안가면 돼...
            <span className="bg-[#B3E378] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              웁스 중
            </span>
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            알바같이 하는 애한테 너무 미안하네
            <span className="bg-[#1d1d1d] text-[#b3e378] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              극복 완
            </span>
          </div>

        </section>

        {/* 세번째 섹션 */}
        {/* 베스트 글 */}
        <section className="bg-[#FFFBF8] flex flex-col items-center font-[pretendard] w-full mb-[20px]">
          
          {/* 주제 */}
          <div className="flex justify-start items-center bg-[#fbf3ec] border-b-[1px] border-[#e9e5e2] w-full h-[39px] pl-[38px] text-[16px] font-semibold">
            베스트 Failers
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            내가 있잖아?
            <span className="bg-[#B3E378] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              웁스 중
            </span>
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            지금 너무너무 졸린데
            <span className="bg-[#B3E378] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              극복 중
            </span>
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            꿀팁 전수요
            <span className="bg-[#B3E378] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              웁스 중
            </span>
          </div>

          <div className="flex justify-between items-center border-b-[1px] border-[#e9e5e2] w-full h-34px pl-[38px] text-[12px]">
            그냥 안가면 돼...
            <span className="bg-[#B3E378] text-[#1d1d1d] flex items-center justify-center mt-[4px] mb-[6px] rounded-[20px] px-[13px] py-[6px] text-[14px] w-auto h-[24px] font-semibold">
              웁스 중
            </span>
          </div>

        </section>

        <Footer />
        {/* 푸터 */}
        </div>
      </div>
  
  );
};

export default PostSuccess;
