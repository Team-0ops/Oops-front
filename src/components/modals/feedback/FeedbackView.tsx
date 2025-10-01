import { useGetLesson } from "../../../hooks/PostPage/GetHook/useGetLesson";

interface FeedbackViewProps {
  postId: number; // 교훈이 달린 게시글 id
  onClose: () => void; // 팝업 닫기 콜백
}

/**
 * FeedbackView 컴포넌트
 * - 특정 게시글에 등록된 교훈(Lesson)을 조회하여 표시
 * - 제목, 내용, 태그 리스트를 보여주는 간단한 뷰
 */
const FeedbackView = ({ postId, onClose }: FeedbackViewProps) => {
  const { lesson } = useGetLesson(postId); // 게시글 id로 교훈 데이터 가져오기

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="absolute right-[70px] top-[220px] 
        bg-[#b3e378] w-[165px] rounded-[4px] border-[1px] border-solid border-[#9bd654]
        px-[13px] py-[10px] z-10"
        style={{
          boxShadow: "inset 0px 0px 10.5px 0px rgba(162, 226, 86, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 방지
      >
        {/* 교훈 제목 & 내용 */}
        <div className="flex flex-col gap-[6px] mr-[16px] mb-[4px]">
          <span className="body4 break-words w-full" >{lesson?.title}</span>
          <span className="caption1 text-[#4d4d4d] break-words w-full mt-[4px]">{lesson?.content}</span>
        </div>
        {/* 교훈 태그 리스트 */}
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
