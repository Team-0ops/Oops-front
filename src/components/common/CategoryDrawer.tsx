import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Star from "../../assets/icons/star_empty.svg?react";
import StarFilled from "../../assets/icons/star_filled.svg?react";
import CloseButton from "../../assets/icons/X.svg?react";
import {
  favoriteCategory,
  unfavoriteCategory,
  getAllCategories, 
} from "../../apis/categoryApi";
import type { CustomAxiosError } from "../../types/AxiosError";

interface Props {
  onClose: () => void;
}

interface Category {
  id: number;
  key: string;
  name: string;
  active: boolean;
}

const CategoryDrawer = ({ onClose }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  //  서버에서 전체 카테고리 조회
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        setCategories(result); 
      } catch (err) {
        console.error("카테고리 불러오기 실패:", err);
      }
    };

    fetchCategories();
  }, []);

  const goToCategory = (key: string) => {
    window.scrollTo(0, 0);
    navigate(`/category-feed/${key}`);
    onClose();
  };

  const toggleStar = async (id: number, name: string, isActive: boolean) => {
    const updated = categories.map((cat) =>
      cat.name === name ? { ...cat, active: !cat.active } : cat
    );
    setCategories(updated);

    try {
      if (isActive) {
        await unfavoriteCategory(id);
        console.log(`즐겨찾기 해제: ${id}`);
      } else {
        await favoriteCategory(id);
        console.log(`즐겨찾기 등록: ${id}`);
      }
    } catch (error) {
      const err = error as CustomAxiosError;
      const errorCode = err.response?.data?.code;

      if (errorCode === "CATEGORY400") {
        console.warn("이미 등록된 카테고리입니다.");
        return;
      }

      console.error("즐겨찾기 실패:", err.response?.data || err.message);
      alert("즐겨찾기 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="px-[20px] flex flex-col items-center fixed top-0 left-0 w-full h-full z-50 bg-white">
      {/* 상단 헤더 */}
      <div className="flex justify-end justify-center mt-[27.81px] items-center w-full relative">
        <p className="text-center text-[20px] font-semibold w-full">카테고리 목록</p>
        <button className="absolute right-[24px]" onClick={onClose}>
          <CloseButton className="w-[24px] h-[24px]" />
        </button>
      </div>

      {/* 검색창 */}
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full h-[48px] rounded-[4px] border border-[#F6EBE6] mt-[28px] pl-[20px] mb-[34px] placeholder:text-[16px]"
        placeholder="카테고리 검색"
        style={{
          boxShadow: "inset 0px 0px 5.4px 0px rgba(0, 0, 0, 0.25)",
        }}
        type="text"
      />

      {/* 카테고리 목록 */}
      <div className="flex flex-col items-center overflow-y-auto max-h-[calc(100vh-200px)] w-full">
        {[...categories]
          .filter((cat) => cat.name.includes(keyword))
          .sort((a, b) => Number(b.active) - Number(a.active))
          .map((cat) => (
            <div
              key={cat.id}
              className={`flex justify-between items-center w-full h-[48px] mb-[16px] rounded-[4px] py-[9px] px-[10px] ${
                cat.active ? "bg-[#B3E378]" : "bg-[#F0E3E0]"
              }`}
            >
              <div className="flex items-center justify-center">
                <button
                  onClick={() => toggleStar(cat.id, cat.name, cat.active)}
                  className="pl-[10px] pr-[6px]"
                >
                  {cat.active ? (
                    <StarFilled className="w-[24px] h-[24px]" />
                  ) : (
                    <Star className="w-[24px] h-[24px]" />
                  )}
                </button>
                <p className="text-[16px] font-semibold">{cat.name}</p>
              </div>
              <button
                className="w-[75px] h-[26px] bg-white rounded-[20px] text-[#999] text-[14px]"
                onClick={() => goToCategory(cat.key)}
              >
                보러가기
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryDrawer;
