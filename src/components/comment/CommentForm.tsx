import { useState } from "react";

interface CommentFormProps {
  onSubmit: (reply: string) => void;
  onCancel: () => void;
}

const CommentForm = ({ onSubmit, onCancel }: CommentFormProps) => {
  const [reply, setReply] = useState("");

  const handleSubmit = () => {
    if (reply.trim() === "") return;
    onSubmit(reply);
    setReply("");
  };

  return (
    <div className="ml-[34px]">
      {/* ✅ 기존 댓글과 동일한 배경/테두리 스타일 */}
      <div className="w-full flex flex-col pl-[34px] pr-[20px] py-[13px] bg-[#fbf3ec] border border-[#f0e7e0]">
        <textarea
          className="caption1 w-full h-[100px] bg-transparent border-none resize-none outline-none"
          placeholder="답글을 입력하세요..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <div className="mt-[8px] flex gap-2">
          <button onClick={handleSubmit} className="px-4 py-1 bg-[#B3E378] rounded">작성</button>
          <button onClick={onCancel} className="px-4 py-1 bg-[#eee] rounded">취소</button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
