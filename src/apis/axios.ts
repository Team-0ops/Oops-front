import axios from "axios";

export const axiosInstance = axios.create({
baseURL: "/api", // 프록시 경로 사용
  withCredentials: true, // 쿠키 전송
});

// 요청 전에 매번 토큰을 넣어주도록 인터셉터 설정
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
