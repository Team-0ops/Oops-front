import { axiosInstance } from "./axios";

export const favoriteCategory = async (categoryId: number) => {
  return await axiosInstance.post(`/categories/${categoryId}/bookmark`);
};

export const unfavoriteCategory = async (categoryId: number) => {
  return await axiosInstance.delete(`/categories/${categoryId}/unbookmark`);
};
