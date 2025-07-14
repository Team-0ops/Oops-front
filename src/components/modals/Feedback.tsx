import X from "../../assets/icons/X.svg?react";
import Arrow from "../../assets/icons/Arrow.svg?react";

const Feedback = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center w-[302px] rounded-[10px] px-[20px] pt-[21px] pb-[17px] font-[pretendard] bg-[#ffffff]">
        <div className="flex ml-[86px] justify-between gap-[62px] text-[20px] font-semibold">
          교훈 작성
          <X className="w-[24px] h-[24px]" />
        </div>
        {/* 카테고리는 props로 가져와야할 듯 */}
        <div className="flex justify-center mt-[8px] items-center text-[12px] text-[#666666]">
          카테고리
        </div>

        {/* 다 props로 가져와야할 것들 */}
        <section className="mt-[20px] mb-[18px] font-[pretendard] w-full">
          <h6 className="flex w-full h-[14px] text-[12px] justify-start">
            ~~님의 게시 글
          </h6>
          {/* 게시글 들어올곳 */}
          <div className="flex flex-col bg-[#f0e7e0] px-[14px] py-[10px] mt-[10px] rounded-[10px] gap-[4px] font-['Pretendard'] w-full">
            <div className="w-full flex justify-between ">
              <span className="font-semibold text-[14px]">제목</span>
              <span className="text-[12px] font-medium text-[#999999]">
                카테고리
              </span>
            </div>
            <span className="text-[12px] text-[#262626]">본문</span>
          </div>

          <div className="flex justify-center gap-[10px] ml-[36px] mt-[8px]">
            <Arrow className="w-[24px] h-[24px]" />
            <input
              placeholder="교훈 제목 (선택)"
              className="
              bg-[#fffbf8] 
              w-[192px] h-[30px] 
              text-[12px] rounded-[5px] 
              border-[1px] border-[#f6ebe6]
              [box-shadow:inset_0_0_5.4px_rgba(0,0,0,0.25)]
              px-[12px] py-[8px]"
            />
          </div>

          <div className="flex justify-center gap-[10px] ml-[36px] mt-[8px]">
            <Arrow className="w-[24px] h-[24px]" />
            <textarea
              placeholder="교훈 내용 텍스트"
              className="
              bg-[#fffbf8] 
              w-[192px] h-[100px] 
              text-[12px] rounded-[5px] 
              border-[1px] border-[#f6ebe6]
              [box-shadow:inset_0_0_5.4px_rgba(0,0,0,0.25)]
              px-[12px] py-[8px]"
            />
          </div>
        </section>

        {/* 교훈 태그 선택 */}
        <section className="mb-[20px] font-[pretendard]">
          <h1 className="w-full h-[14px] text-[12px]">교훈 태그 선택</h1>
          <div className="mb-[14px] flex justify-start gap-[8px]">
            <span className="text-[12px] text-[#cccccc]">
              #본인만 확인 가능
            </span>
            <span className="text-[12px] text-[#cccccc]">#최대 10개</span>
            <span className="text-[12px] text-[#cccccc]">#삭제 불가</span>
          </div>

          <div className="flex w-full flex-wrap min-w-0 justify-start gap-[12px]">
            <button
              className="
            rounded-[4px]
            px-[7px]
            py-[3px]
            cursor-pointer
            bg-[#999999]
            text-[12px] text-[#ffffff]
            "
            >
              면접
            </button>

            <button
              className="
            rounded-[4px]
            px-[7px]
            py-[3px]
            cursor-pointer
            bg-[#1d1d1d]
            text-[12px] text-[#ffffff]
            "
            >
              인생교훈
            </button>

            <button
              className="
            rounded-[4px]
            px-[7px]
            py-[3px]
            cursor-pointer
            bg-[#999999]
            text-[12px] text-[#ffffff]
            "
            >
              친구
            </button>

            <button
              className="
            rounded-[4px]
            px-[7px]
            py-[3px]
            cursor-pointer
            bg-[#999999]
            text-[12px] text-[#ffffff]
            "
            >
              먹을 거
            </button>

            <button
              className="
            rounded-[4px]
            px-[7px]
            py-[3px]
            cursor-pointer
            bg-[#1d1d1d]
            text-[12px] text-[#ffffff]
            "
            >
              위로
            </button>

            <button
              className="
            rounded-[4px]
            px-[7px]
            py-[3px]
            cursor-pointer
            bg-[#999999]
            text-[12px] text-[#ffffff]
            "
            >
              추가하기
            </button>
          </div>
        </section>

        <button
          className="
        w-full h-[48px]
        flex justify-center items-center
        rounded-[10px]
        py-[14px]
        bg-[#b3e378]
        text-[16px] font-[pretandard]"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default Feedback;
