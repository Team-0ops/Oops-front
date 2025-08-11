import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

// 기존 코드와 호환되는 공통 인스턴스
export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// AxiosHeaders. 일반 객체 모두 안전하게 Authorization 세팅
function setAuthHeader(config: InternalAxiosRequestConfig, token: string) {
  const h: any = config.headers;
  if (h?.set && typeof h.set === "function") {
    h.set("Authorization", `Bearer ${token}`);
  } else {
    const headers = (config.headers ?? {}) as AxiosRequestHeaders;
    headers["Authorization"] = `Bearer ${token}`;
    config.headers = headers;
  }
}

// 디버그용 마스킹 함수
function mask(t?: string | null) {
  return t ? `${t.slice(0, 6)}...${t.slice(-6)}` : "none";
}

// 요청 인터셉터 (디버그 로그 포함)
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url || "";

  // auth 경로는 헤더 토큰 금지
  if (/\/auth\/(login|join|logout|refresh|reissue)/.test(url)) {
    console.log("[AUTH][skip]", { url });
    return config;
  }

  // ✅ HttpOnly 쿠키는 JS에서 접근 불가 → document.cookie로 읽지 않음
  //    헤더 토큰은 localStorage 값만 사용 (동기화 이슈 최소화)
  const storageTok =
    (typeof localStorage !== "undefined" &&
      localStorage.getItem("accessToken")) ||
    "";

  if (storageTok) {
    setAuthHeader(config, storageTok);
  }

  // eslint-disable-next-line no-console
  console.log("[AUTH]", {
    url,
    storage: mask(storageTok),
    used: mask(storageTok),
  });
  return config;
});

export default axiosInstance; // 옵션: default 임포트도 가능
