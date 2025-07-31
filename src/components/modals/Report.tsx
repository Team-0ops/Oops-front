import X from "../../assets/icons/X.svg?react";

export type ReportTarget = {
  type: "post" | "comment" | "reComment";
  id: string;
  author: string;
  content: string;
};

interface ReportProps {
  comment: ReportTarget;
  onClose: () => void;
}

const Report = ({ onClose, comment }: ReportProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="
          rounded-[10px]
          px-[20px] pt-[21px] pb-[26px]
          bg-[#ffffff]
          flex flex-col 
          w-[302px]
        "
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
      >
        <section className="flex justify-center items-center">
          <div
            className="
          h2
          flex justify-between items-center gap-[68px]
          ml-[92px] mb-[14px]
          "
          >
            신고하기
            <X className="w-[24px] h-[24px] cursor-pointer" onClick={onClose} />
          </div>
        </section>

        <section
          className="
          flex flex-col items-center justify-center gap-[6px]
          mb-[18px] 
          "
        >
          <div className="caption2 text-[#666666]">
            {comment.author}님의{" "}
            {comment.type === "post"
              ? "게시글"
              : comment.type === "comment"
              ? "댓글"
              : "대댓글"}
          </div>
          <div className="caption2 text-[#666666]">"{comment.content}"</div>
        </section>

        <section
          className="
            flex flex-col justify-center items-center gap-[16px]
            mb-[8px] 
            "
        >
          <h1 className="body2 text-[#1d1d1d]">신고하는 이유는 무엇인가요?</h1>
          <textarea
            placeholder="사유를 입력해주세요."
            className="
              placeholder:caption2 placeholder:text-[#b3b3b3]
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
        caption2  
        flex justify-start items-start
        text-[#cccccc]
        w-full"
        >
          허위 신고의 경우, <br />
          사용자님의 계정 정지의 위험이 있습니다.
        </h6>

        <button
          className="
        body2 text-[#000000]  
        w-full h-[48px]
        flex justify-center items-center
        rounded-[10px]
        mt-[12px]
        py-[14px]
        bg-[#b3e378]
       "
        >
          신고하기
        </button>
      </div>
    </div>
  );
};

export default Report;
