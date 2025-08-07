

import { axiosInstance } from "./axios";

// 기존 부적 추첨 
export const requestLuckyDraw = async () => {
  const res = await axiosInstance.post("/lucky-draw", {});
  return res.data;
};

//  포인트 조회 
export const getUserProfile = async () => {
  const res = await axiosInstance.get("/my-page/profile");
  return res.data;
};
