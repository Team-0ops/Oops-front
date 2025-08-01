import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://15.164.217.202:8080/api",
  withCredentials: true, // 필요 시 쿠키 포함
});

axiosInstance.interceptors.request.use((config) => {
  console.log("요청 직전 Authorization 헤더:", config.headers.Authorization);
  return config;
});
