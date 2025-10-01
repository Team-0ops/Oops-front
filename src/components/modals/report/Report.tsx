import X from "../../../assets/icons/X.svg?react";
import { useEffect, useState } from "react";
import { useReportPost } from "../../../hooks/PostPage/PostHook/useReportPost";
import { useReportComment } from "../../../hooks/PostPage/PostHook/useReportComment";

export type ReportTarget = {
  type: "post" | "comment" | "reComment"; // 신고 대상 구분
  id: string; // 대상 id
  author: string; // 작성자 이름
  content: string; // 신고 대상 내용 (일부만 표시)
};

interface ReportProps {
  comment: ReportTarget; // 신고 대상 정보
  onClose: () => void; // 모달 닫기 클릭
}

/**
 * Report 컴포넌트
 * - 게시글/댓글/대댓글을 신고할 수 있는 모달
 * - 신고 사유를 입력받아 api 호출
 * - 성공 시 알림 후 자동 닫힘
 */
const Report = ({ onClose, comment }: ReportProps) => {
  const [reason, setReson] = useState(""); // 신고 사유 입력값

  const postId = comment.id;
  const commentId = comment.id;

  // 게시글 신고 훅
  const { reportPost, success: postSuccess } = useReportPost(postId);

  // 댓글/대댓글 신고 훅
  const { reportComment, success: commentSuccess } =
    useReportComment(commentId);

  // type별로 함수/상태 분기
  // 신고 사유가 없으면 알림
  const handleReport = async () => {
    if (!reason.trim()) return alert("신고 사유를 입력해주세요!");
    if (comment.type === "post") {
      await reportPost(reason);
    } else {
      await reportComment(reason);
    }
  };

  // 신고 성공시 알림 후 모달 닫기
  useEffect(() => {
    if (
      (comment.type === "post" && postSuccess) ||
      ((comment.type === "comment" || comment.type === "reComment") &&
        commentSuccess)
    ) {
      alert("신고가 완료되었습니다.");
      onClose();
    }
  }, [postSuccess, commentSuccess, comment.type, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      onClick={onClose} // 바깥 클릭 시 모달 닫기
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
        {/* 모달 헤더 */}
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

        {/* 신고 대상 정보 */}
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

        {/* 신고 사유 입력 */}
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
            value={reason}
            onChange={(e) => setReson(e.target.value)}
          />
        </section>

        {/* 주의 문구 */}
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

        {/* 신고하기 버튼 */}
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
          onClick={handleReport}
        >
          신고하기
        </button>
      </div>
    </div>
  );
};

export default Report;
