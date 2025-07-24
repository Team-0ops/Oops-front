import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}

const categoryList = [
  { key: "small", name: "작은 일", active: false },
  { key: "love", name: "연애", active: false },
  { key: "relationship", name: "인간관계", active: false },
  { key: "travel", name: "여행", active: false },
  { key: "school", name: "학교생활", active: false },
  { key: "career", name: "진로/취업", active: false },
  { key: "work", name: "회사생활", active: false },
  { key: "college", name: "대입/입시", active: false },
  { key: "money", name: "재정/돈 관리", active: false },
  { key: "health", name: "건강/운동", active: false },
  { key: "mental", name: "멘탈관리", active: false },
  { key: "free", name: "자유", active: false },
];


const CategoryDrawer = ({ onClose }: Props) => {

  const [categories, setCategories] = useState(categoryList);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate()
  const goToCategory =(name:string)=>{
    window.scrollTo(0,0)
    navigate(`/category-feed/${name}`)
    onClose(); 
  }


  const toggleStar = (name: string) => {
    const updated = categories.map(cat =>
      cat.name === name ? { ...cat, active: !cat.active } : cat
    );
    setCategories(updated);
  };

  return (
    <div className="px-[20px] flex flex-col items-center fixed top-0 left-0 w-full h-full z-50 bg-white">
      {/* 상단 헤더 */}
      <div className="flex justify-end justify-center mt-[27.81px] items-center w-full relative">
        <p className="text-center text-[20px] font-semibold w-full">카테고리 목록</p>
        <button className="absolute right-[24px]" onClick={onClose}>
          <img src="src/assets/icons/X.svg" alt="닫기 버튼" className="w-[24px] h-[24px]" />
        </button>
      </div>

      {/* 검색창 */}
      <input
        value={keyword}
        onChange={(e)=> setKeyword(e.target.value)}
        className="w-full h-[48px] rounded-[4px] border border-[#F6EBE6] mt-[28px] pl-[20px] mb-[34px] placeholder:text-[16px]"
        placeholder="카테고리 검색"
        style={{
          boxShadow: 'inset 0px 0px 5.4px 0px rgba(0, 0, 0, 0.25)'
        }}
        type="text"
      />

      {/* 카테고리 목록 */}
      <div className="flex flex-col items-center overflow-y-auto max-h-[calc(100vh-200px)] w-full">
        {[...categories] // 복사해서 정렬
          .filter(cat=> cat.name.includes(keyword))
          .sort((a, b) => Number(b.active) - Number(a.active)) // 즐겨찾기 먼저
          .map((cat) => (
            <div
              key={cat.name}
              className={`flex justify-between items-center w-full h-[48px] mb-[16px] rounded-[4px] py-[9px] px-[10px] ${
                cat.active ? "bg-[#B3E378]" : "bg-[#F0E3E0]"
              }`}
            >
              <div className="flex items-center justify-center">
                <button onClick={() => toggleStar(cat.name)} className="pl-[10px] pr-[6px]">
                  <img
                    className="w-[24px] h-[24px]"
                    src={
                      cat.active
                        ? "src/assets/icons/star_filled.svg"
                        : "src/assets/icons/star (2).svg"
                    }
                    alt="별 아이콘"
                  />
                </button>
                <p className="text-[16px] font-semibold">{cat.name}</p>
              </div>
              <button className="w-[75px] h-[26px] bg-white rounded-[20px] text-[#999] text-[14px]"
                      onClick={()=>goToCategory(cat.key)}>
                보러가기
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryDrawer;
