import type { ResponsePostListDTO } from "../types/post";
import { axiosInstance } from "./axios";

export const getPostListInMainPage = async (): Promise<ResponsePostListDTO> => {
  const { data } = await axiosInstance.get(
    "http://localhost:3000/api/feeds/home/first"
  );
  console.log(data);
  return data;
};
