import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api", // 프록시 타서 API 서버로 요청됨
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzUzOTAzOTExLCJleHAiOjE3NTM5MTgzMTF9.EZLdor7Agals4EtV_ajN0r2-ypQsOKUvYhvFsgw0BNU",
  },
});

axiosInstance.interceptors.request.use((config) => {
  console.log("요청 직전 Authorization 헤더:", config.headers.Authorization);
  return config;
});
