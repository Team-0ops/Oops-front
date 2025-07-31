import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true, // 쿠키 전송
  });
  
axiosInstance.interceptors.request.use((config) => {
  console.log("요청 직전 Authorization 헤더:", config.headers.Authorization);
  return config;
});