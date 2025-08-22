import type { BannerResponse } from "../types/banner";
import axiosInstance from "./axios";

export const getBannerData = async (): Promise<BannerResponse> => {
  const { data } = await axiosInstance.get("/feeds/banners/auth");
  console.log(data);
  return data;
};

export const getBannerDataGuest = async (): Promise<BannerResponse> => {
  const { data } = await axiosInstance.get("/feeds/banners/guest");
  console.log(data);
  return data;
};
