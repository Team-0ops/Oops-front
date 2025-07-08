import X from "../../assets/icons/X.svg?react";

const Feedback = () => {
  return (

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center w-[302px] h-[513px] rounded-[10px] px-[20px] pt-[21px] pb-[17px] font-[pretendard] bg-[#ffffff]">
          
          <div className="flex ml-[86px] justify-between gap-[62px] text-[20px] font-semibold">
            교훈 작성
            <X className="w-[24px] h-[24px]"/>
            </div>
            {/* 카테고리는 props로 가져와야할 듯 */}
          <div className="flex justify-center mt-[8px] items-center text-[12px] text-[#666666]">
            카테고리
            </div> 
          
          {/* 다 props로 가져와야할 것들 */}
          <section>
          <div>~~님의 게시 글</div>
          <div>게시글</div>
          <div>교훈 제목</div>
           <div>교훈 내용 텍스트</div> 
           </section>

           {/* 교훈 태그 선택 */}
           <section>
            <span>#본인만 확인 가능</span>
            <span>#최대 10개</span>
            <span>#삭제 불가</span>

           </section>
          
        </div>
      </div>
   
  );
};

export default Feedback;
