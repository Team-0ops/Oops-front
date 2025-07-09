import X from "../../assets/icons/X.svg?react";

const Report = () => {
  return (
    <div
      className="
    fixed inset-0 
    bg-black bg-opacity-50 
    flex items-center justify-center z-50"
    >
      <div
        className="
      rounded-[10px]
      px-[20px] pt-[21px] pb-[26px]
      bg-[#ffffff]
      flex flex-col 
      w-[302px] "
      >
        <section className="flex justify-center items-center">
          <div
            className="
        flex justify-between items-center gap-[68px]
        ml-[92px] mb-[14px]
        text-[20px] font-semibold font-[pretendard]"
          >
            신고하기
            <X className="w-[24px] h-[24px]" />
          </div>
        </section>
        {/* 닉네임과 댓글 내용 가져와야할듯 */}

        <section
          className="
          flex flex-col items-center justify-center gap-[6px]
          mb-[18px]
          font-[pretendard]  
          "
        >
          <div className="text-[12px] text-[#666666]">닉네임 님의 댓글</div>
          <div className="text-[12px] text-[#666666]">"겁나긴댓글댓글댓글"</div>
        </section>
    
        <section
          className="
            flex flex-col justify-center items-center gap-[16px]
            mb-[8px] 
            font-[pretendard]"
        >
          <h1 className="text-[16px]">신고하는 이유는 무엇인가요?</h1>
          <textarea
            placeholder="사유를 입력해주세요."
            className="
              placeholder:text-[12px] text-[#b3b3b3]
              bg-[#fffbf8] 
              w-[262px] h-[136px] 
              text-[12px] rounded-[5px] 
              border-[1px] border-[#f6ebe6]
              [box-shadow:inset_0_0_5.4px_rgba(0,0,0,0.25)]
              px-[10px] py-[14px]
              "
          />
        </section>

        <h6
          className="
        flex justify-start items-start
        text-[12px] text-[#cccccc] leading-3.5
        w-full"
        >
          허위 신고의 경우, <br />
          사용자님의 계정 정지의 위험이 있습니다.
        </h6>

        <button
        className="
        w-full h-[48px]
        flex justify-center items-center
        rounded-[10px]
        mt-[12px]
        py-[14px]
        bg-[#b3e378]
        text-[16px] font-[pretandard]">
        신고하기
        </button>

      </div>
    </div>
  );
};

export default Report;
