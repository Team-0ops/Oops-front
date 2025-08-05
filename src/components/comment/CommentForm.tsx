import { useState } from "react";

interface CommentFormProps {
  postId: number;
  parentId: string|null;
  onSubmit: (reply: string) => void;
  onCancel: () => void;
}

const CommentForm = ({ postId, parentId, onSubmit, onCancel }: CommentFormProps) => {
  const [reply, setReply] = useState("");

  console.log(parentId, postId)
  const handleSubmit = () => {
    if (reply.trim() === "") return;
    onSubmit(reply);
    setReply("");
  };

  return (
    <div className="ml-[34px]">
      <div className="w-full flex flex-col gap-[10px] pl-[32px] pr-[20px] py-[13px] bg-[#fbf3ec] border-[1px] border-[#f0e7e0]">
        <div className="flex flex-col justify-start gap-[4px]">
          <span className="body5 text-[#808080]">닉네임</span>
        <textarea
          className="body5 placeholder:text-[#1d1d1d] placeholder: text-[#1d1d1d] break-words w-full min-h-[20px] resize-none bg-transparent border-none outline-none whitespace-pre-wrap overflow-hidden"
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
        <div className="flex justify-end gap-[8px]">
          <button
            onClick={onCancel}
            className="caption1 bg-[#999] px-2 flex justify-center items-center h-[30px] text-white rounded-[4px]"
          >
            작성 취소
          </button>
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
