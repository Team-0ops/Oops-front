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
      <div className="w-full flex flex-col pl-[34px] pr-[20px] py-[13px] bg-[#fbf3ec] border border-[#f0e7e0]">
        <textarea
          className="caption1 break-words w-full min-h-[30px] resize-none bg-transparent border-none outline-none whitespace-pre-wrap overflow-hidden"
          placeholder="답글을 입력하세요..."
          value={reply}
          onChange={(e) => {
            setReply(e.target.value);
            e.target.style.height = "auto"; // 높이 초기화 후
            e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 재설정
          }}
          rows={1}
        />
        <div className="mt-[8px] flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-black text-white rounded"
          >
            작성
          </button>
          <button onClick={onCancel} className="px-4 py-1 bg-[#eee] rounded">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
