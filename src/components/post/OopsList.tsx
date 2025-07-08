import type { OopsPost } from "../../types/OopsList";

interface OopsListProps {
  posts: OopsPost[];
  onSelect: (id: string) => void;
}

const OopsList = ({ posts, onSelect }: OopsListProps) => (
  <div className="bg-[#fffbf8] rounded-[4px] border-[1px] border-[#f6ebe6] px-[22px] py-[17px] mt-[8px] w-[335px] font-['Pretendard']">
    <div className="font-semibold mb-3 text-[14px]">
      {posts.length > 0 ? "극복 완료한 게시글을 선택해주세요" : "게시글이 없습니다"}
    </div>
    <ul className="flex flex-col gap-[12px]">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex items-center justify-between bg-[#f0e7e0]  cursor-pointer px-[14px] py-[10px] rounded-[10px] w-[291px] h-[50px]"
          onClick={() => onSelect(post.id)}
        >
          <div className="flex flex-col gap-[4px] font-['Pretendard'] w-[258px]">
            <span className="font-semibold text-[14px]">{post.title}</span>
            <span className="text-[12px] font-medium text-[#999999]">{post.category}</span>
            <span className="text-[12px] text-[#262626]">{post.content}</span>
          </div>
          <div className="w-[48px] h-[48px] flex-shrink-0  flex items-center justify-center">
            {post.images && post.images[0] ? (
              <img
                src={post.images[0]}
                alt="preview"
                className="object-cover w-full h-full"
              />
            ) :null}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default OopsList;