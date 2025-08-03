import { axiosInstance } from "./axios";
import type { ResponseCategoryPostListDTO } from "../types/post"; 

// 카테고리별 게시글 리스트 조회
export const getPostListByCategoryId = async (
  categoryId: number,
  situation: string,
  page: number = 0,
  limit: number = 10
): Promise<ResponseCategoryPostListDTO> => {
  const { data } = await axiosInstance.get(
    `/feeds/categories/${categoryId}/all`, 
    {
      params: { situation, page, limit },
    }
  );
  return data;
};




