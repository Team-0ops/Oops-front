import { useState } from "react";
import type { Comment } from "../../types/Comment";

interface CommentFormProps {
  comment: Comment;
  postId: number; // 답글이 속한 게시글 id
  parentId: string|null; // 부모 댓글 id (없으면 null)
  onSubmit: (reply: string) => void; // 작성완료 시 실행되는 콜백
  onCancel: () => void; // 작성 취소 시 실행되는 콜백
}

/*
CommentForm 컴포넌트
- 특정 댓글에 대한 답글 "입력" ui 제공
- 입력값을 관리하고, 작성/취소 버튼을 통해 부모로 이벤트 전달 
*/
const CommentForm = ({ comment, postId, parentId, onSubmit, onCancel }: CommentFormProps) => {
  // 사용자가 입력 중인 답글 내용을 저장하는 상태
  const [reply, setReply] = useState("");

  // (디버깅용) 현재 답글 대상의 parentId와 postId 확인
  console.log(parentId, postId)

  // 작성 버튼 클릭 시 실행되는 핸들러 
  const handleSubmit = () => {
    if (reply.trim() === "") return; // 공백만 입력된 경우 무시
    onSubmit(reply); // 부모 컴포넌트로 데이터 전달
    setReply(""); // 입력창 비우기
  };

  return (
    // 부모 댓글보다 들여쓰기 적용
    <div className="ml-[34px]">
      <div className="w-full flex flex-col gap-[10px] pl-[32px] pr-[20px] py-[13px] bg-[#fbf3ec] border-[1px] border-[#f0e7e0]">
        <div className="flex flex-col justify-start gap-[4px]">
          <span className="body5 text-[#808080]">{comment.userName}</span>
        {/* 답글 입력 (자동 높이 조절) */}
        <textarea
          className="body5 placeholder:text-gray-400 break-words w-full min-h-[20px] resize-none bg-transparent border-none outline-none whitespace-pre-wrap overflow-hidden"
          placeholder="답글을 입력하세요..."
          value={reply}
          onChange={(e) => {
            setReply(e.target.value);
            e.target.style.height = "auto"; // 높이 초기화 후
            e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 재설정
          }}
          rows={1}
        />
        </div>
        {/* 버튼 영역 */}
        <div className="flex justify-end gap-[8px]">
          {/* 취소 버튼 */}
          <button
            onClick={onCancel}
            className="caption1 bg-[#999] px-2 flex justify-center items-center h-[30px] text-white rounded-[4px]"
          >
            작성 취소
          </button>
          {/* 작성 버튼 */}
          <button 
          onClick={handleSubmit} 
          className="caption1 bg-[#1d1d1d] w-[50px] px-2 flex justify-center items-center h-[30px] text-white rounded-[4px]">
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
