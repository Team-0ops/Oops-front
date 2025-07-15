import type { Comment } from "../../types/Comment";

import NoColorReport from "../../assets/icons/NoColorReport.svg?react";
import NoColorLike from "../../assets/icons/gray_heart.svg?react";
import GrayComment from "../../assets/icons/gray_comment.svg?react";

interface CommentProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentProps) => {
  return (
    <div className="flex flex-col w-full pl-[34px] pr-[20px] py-[13px] bg-[#fbf3ec] border-[1px] border-solid border-[#f0e7e0]">
      <div className="mb-[4px] flex justify-between items-center">
        <span className="body5 text-[#808080]">{comment.author}</span>
        <NoColorReport className="w-[24px] h-[24px]" />
      </div>

      <div className="flex justify-start">
        <span className="body5 text-[#1d1d1d]">{comment.content}</span>
      </div>

      <div className="flex justify-between items-center mt-[12px] mr-[36px]">
        <span className="caption3 text-[#b3b3b3]">{comment.createdAt}</span>
        <div className="flex justify-center gap-[4px]">
          <NoColorLike className="w-[14px] h-[14px]" />
          <p className="caption3 text-[#b3b3b3]">공감</p>
          <div className="flex justify-center gap-[4px] ml-[18px]">
          <GrayComment className="w-[14px] h-[14px]" />
          <p className="caption3 text-[#b3b3b3]">대댓글 달기</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CommentItem;
