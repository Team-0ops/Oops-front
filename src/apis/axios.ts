import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api", // 프록시 경로 사용
  withCredentials: true, // 쿠키 전송
});
