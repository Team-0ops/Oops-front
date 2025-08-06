import { axiosInstance } from "./axios";

interface CategoryItem {
  categoryId: number;
  name: string;
  stored: boolean;
}


// 전체 카테고리 + 즐겨찾기 여부 조회
const categoryKeyMap: Record<number, string> = {
  1: "daily",
  2: "love",
  3: "relationship",
  4: "stock",
  5: "school",
  6: "work",
  7: "career",
  8: "startup",
  9: "college",
  10: "job",
  11: "marriage",
  12: "travel",
  13: "realestate",
  14: "mental",
  15: "free",
};

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get("/categories");

  return data.result.map((item: CategoryItem) => ({
    id: item.categoryId,
    name: item.name,
    active: item.stored,
    key: categoryKeyMap[item.categoryId],
  }));
};


//  즐겨찾기 등록 및 해제
export const favoriteCategory = async (categoryId: number) => {
  return await axiosInstance.post(`/categories/${categoryId}/bookmark`);
};

export const unfavoriteCategory = async (categoryId: number) => {
  return await axiosInstance.delete(`/categories/${categoryId}/unbookmark`);
};
