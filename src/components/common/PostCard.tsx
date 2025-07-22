import PostStats from "./PostStats";
type PostCardProps = {
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  views: number;
  category?: string; 
};

const PostCard = ({ title, content, imageUrl, likes, comments, views, category }: PostCardProps) => {
  return (
    <div className=" relative flex px-[12px] py-[10px] bg-[#F0E7E0] rounded-[10px] h-[85px]">
      <div>
        <div className="flex items-center">
          <h3 className="text-[16px] font-semibold mb-[4px] line-clamp-1 pr-[130px]">{title}</h3>
            {/*  카테고리가 있을 때만 출력 */}
            {category && (
              <span className="text-[12px] text-[#999999] absolute right-[85px]">{category}</span>
        )}
        </div>
        <p className="text-[12px] font-regular mb-[10px] line-clamp-1 leading-tight pr-[70px]">{content}</p>


      {/* 좋아요 댓글수 조회수 상태 컴포넌트*/}
      <PostStats likes={likes} comments={comments} views={views}/>
      </div>
      <div className="flex items-center absolute right-[12px] top-[12.5px] ">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="post image"
            className="w-[60px] h-[60px] rounded-[4px]   "
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
