import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

function mask(t?: string | null) {
  return t ? `${t.slice(0, 10)}...${t.slice(-6)}` : "none";
}

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
