import type {
  ResponseCategoryPostListDTO,
  ResponseMainPostListDTO,
} from "../types/post";
import { axiosInstance } from "./axios";

export const getPostListInMainPage =
  async (): Promise<ResponseMainPostListDTO> => {
    const { data } = await axiosInstance.get(
      "http://localhost:3000/api/feeds/home/first"
    );
    console.log(data);
    return data;
  };

export const getPostListCategory =
  async (): Promise<ResponseCategoryPostListDTO> => {
    const { data } = await axiosInstance.get(
      "http://localhost:3000/api/feeds/home/later"
    );
    console.log(data);
    return data;
  };
