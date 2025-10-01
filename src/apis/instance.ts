import axios from "axios";

/**
 * 공통 Axios 인스턴스 생성
 * - baseURL: 모든 요청은 `/api` prefix를 사용
 * - withCredentials: true → 쿠키를 포함한 요청 허용
 */
const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

/**
 * 토큰 문자열 마스킹 (로그 출력용)
 * @param t - 토큰 문자열
 * @returns 앞 10자리 + ... + 끝 6자리
 */
function mask(t?: string | null) {
  return t ? `${t.slice(0, 10)}...${t.slice(-6)}` : "none";
}

/**
 * 요청 인터셉터
 * - localStorage에 저장된 accessToken을 Authorization 헤더에 추가
 * - `/my-page/profile` 요청 시 로그 출력
 */
instance.interceptors.request.use((config) => {
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  if (token) {
    const h: any = config.headers || {};
    if (typeof h.set === "function") {
      h.set("Authorization", `Bearer ${token}`);
    } else {
      h.Authorization = `Bearer ${token}`;
      config.headers = h;
    }
  }
  // 프로필 요청 로깅
  try {
    const url = config.url || "";
    if (url.includes("/my-page/profile")) {
      const src = (config as any).__req_src || "UNKNOWN";
      const usingCookie = config.withCredentials === true;
      console.log(
        `[PROFILE REQ] src=${src} ${String(config.method || "get").toUpperCase()} ${url} auth=${mask(
          token
        )} cookies=${usingCookie ? "on" : "off"}`
      );
    }
  } catch {}

  return config;
});

/**
 * 응답 인터셉터
 * - 프로필 요청일 경우 응답 로그 출력
 * - 401 응답일 경우 localStorage에서 토큰 삭제
 */
instance.interceptors.response.use(
  (res) => {
    try {
      const url = res.config?.url || "";
      if (url.includes("/my-page/profile")) {
        const src = (res.config as any)?.__req_src || "UNKNOWN";
        const p = (res.data as any)?.result ?? {};
        const email = p?.email ?? "n/a";
        const img =
          p?.profileImageUrl ?? p?.profileImage ?? p?.imageUrl ?? null;
        console.log(
          `[PROFILE RES] src=${src} status=${res.status} email=${email} img=${img}`
        );
      }
    } catch {}
    return res;
  },
  (error) => {
    try {
      const url = error?.config?.url || "";
      if (url && url.includes("/my-page/profile")) {
        const src = (error.config as any)?.__req_src || "UNKNOWN";
        const status = error?.response?.status;
        const msg = error?.response?.data?.message || error?.message;
        console.warn(`[PROFILE ERR] src=${src} status=${status} msg=${msg}`);
      }
    } catch {}

    // 인증 실패 시 토큰 제거
    if (error?.response?.status === 401) {
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // localStorage.removeItem("userId"); // 필요 시 사용
      } catch {}
    }
    return Promise.reject(error);
  }
);

export default instance;
