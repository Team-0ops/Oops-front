import { useGetLesson } from "../../hooks/PostPage/useGetLesson";

interface FeedbackViewProps {
  postId: number;
  onClose: () => void;
}

const FeedbackView = ({ postId, onClose }: FeedbackViewProps) => {
  const { lesson } = useGetLesson(postId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="absolute right-[70px] top-[220px] 
        bg-[#b3e378] w-[165px] rounded-[4px] border-[1px] border-solid border-[#9bd654]
        px-[13px] py-[10px]"
        style={{
          boxShadow: "inset 0px 0px 10.5px 0px rgba(162, 226, 86, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[6px] mr-[29px] mb-[4px]">
          <span className="body4">{lesson?.title}</span>
          <span className="caption1 text-[#4d4d4d] mt-[4px]">{lesson?.content}</span>
        </div>
        <div className="flex justify-end gap-[6px] flex-wrap">
          {lesson?.tagNames?.map((tag:string) => (
            <span
              key={tag}
              className="caption1 text-[#fff] h-[20px] bg-[#1d1d1d] rounded-[4px] py-[3px] px-[7px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;
