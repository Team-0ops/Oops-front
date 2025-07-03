import type { OopsPost } from "../types/OopsList";

interface OopsListProps {
  posts: OopsPost[];
  onSelect: (id: string) => void;
}

const OopsList = ({ posts, onSelect }: OopsListProps) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 mx-8 mt-4">
    <div className="font-bold mb-3 text-gray-600">
      {posts.length > 0 ? "극복 완료한 게시글을 선택해주세요" : "게시글이 없습니다"}
    </div>
    <ul>
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex items-center justify-between bg-[#F5F2ED] rounded-lg mb-3 px-4 py-3 cursor-pointer hover:bg-[#ece6df]"
          onClick={() => onSelect(post.id)}
        >
          <div className="flex flex-col flex-1 mr-4">
            <span className="font-bold text-base mb-1">{post.title}</span>
            <span className="text-xs text-gray-400 mb-1">{post.category}</span>
            <span className="text-sm text-gray-500 truncate">{post.content}</span>
          </div>
          <div className="w-[48px] h-[48px] flex-shrink-0 border border-gray-400 bg-white flex items-center justify-center">
            {post.images && post.images[0] ? (
              <img
                src={post.images[0]}
                alt="preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                &#10005;
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default OopsList;