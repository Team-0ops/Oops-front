import type { ResponseCurrentWiki, ResponseWikiSearch } from "../types/wkik";
import { axiosInstance } from "./axios";

export const getCurrentWikis = async (): Promise<ResponseCurrentWiki> => {
  const { data } = await axiosInstance.get("/failwiki/all");
  console.log(data);
  return data;
};

export const getFailWikiResult = async (params: {
  keyword: string;
}): Promise<ResponseWikiSearch> => {
  const { data } = await axiosInstance.get("/failwiki/summary", { params });
  console.log(data);
  return data;
};
