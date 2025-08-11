import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // dev 서버 프록시 사용
  withCredentials: true, // 쿠키도 쓸거면 true (안 쓰면 지워도 됨)
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// // 401 공통 처리
// instance.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error?.response?.status === 401) {
//       // 토큰 만료or무효되면 정리 후 로그인 유도
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       // localStorage.removeItem("userId"); // 필요하다면
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
