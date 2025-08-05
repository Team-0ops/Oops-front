import { useGetLesson } from "../../hooks/PostPage/useGetLesson";

interface FeedbackViewProps {
  postId: number;
  onClose: () => void;
}

const FeedbackView = ({ postId, onClose }: FeedbackViewProps) => {
  const { lesson } = useGetLesson(postId);
  console.log(postId)
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[320px] rounded-[10px] px-[20px] py-[16px] shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="body2 mb-[8px]">📘 교훈 보기</div>
        <div className="caption1 font-bold">{lesson?.title}</div>
        <div className="caption2 mt-[4px]">{lesson?.content}</div>
        <div className="flex gap-[6px] mt-[8px] flex-wrap">
          {lesson?.tagNames?.map((tag) => (
            <span
              key={tag}
              className="caption3 bg-[#999] text-white px-[6px] py-[2px] rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;