import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import { postLogin, getMyProfile, postLogout } from "../apis/auth/authApi";
import type { User } from "../types/User";

type LoginParams = { email: string; password: string };

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (params: LoginParams) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: (opts?: { redirect?: boolean }) => Promise<void>;
}

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  login: async () => {
    throw new Error("AuthProvider가 설정되지 않았습니다.");
  },
  refreshUser: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // lazy initializer로 처음 한 번만 localStorage 읽기 -> usestate로 읽었더니 에러가 와라라라 나가지고 바꿨습니다.ㅇ.ㅠㅠ
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY)
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem(REFRESH_TOKEN_KEY)
  );
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  });

  const refreshUser = async () => {
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      setUser(null);
      localStorage.removeItem(USER_KEY);
      return;
    }
    try {
      const me = await getMyProfile();
      setUser(me);
      localStorage.setItem(USER_KEY, JSON.stringify(me));
    } catch (e) {
      // 토큰이 유효하지 않으면 정리
      console.warn("refreshUser failed:", e);
      setUser(null);
      localStorage.removeItem(USER_KEY);
    }
  };

  const login = async (signinData: LoginParams) => {
    try {
      const resp: any = await postLogin(signinData);
      const result = resp?.result ?? resp ?? {};
      const at = String(
        result?.accessToken ?? localStorage.getItem(ACCESS_TOKEN_KEY) ?? ""
      );
      const rt = String(
        result?.refreshToken ?? localStorage.getItem(REFRESH_TOKEN_KEY) ?? ""
      );

      if (!at) throw new Error("로그인 응답에 accessToken이 없습니다.");

      // 3) 상태/스토리지 동기화 (상태 먼저 올려서 UI 즉시 전환)
      setAccessToken(at);
      setRefreshToken(rt || null);
      localStorage.setItem(ACCESS_TOKEN_KEY, at);
      if (rt) localStorage.setItem(REFRESH_TOKEN_KEY, rt);
      await refreshUser();
      // 라우팅은 페이지 컴포넌트에서 navigate 처리
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };
  const logout = async (opts?: { redirect?: boolean }) => {
    try {
      // 서버에 세션&리프레시 토큰 무효화 요청
      await postLogout().catch(() => {});
    } finally {
      // 클라이언트 상태&스토리지 초기화
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      try {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem("userId");
      } catch {}

      if (opts?.redirect !== false) {
        window.location.replace("/");
      }

      // 보호 경로에서 자동 호출되는 API 재요청 방지 + 즉시 반영
      window.location.replace("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      refreshUser().catch(() => {});
    }
  }, []);

  // value는 메모이즈해서 불필요 리렌더 방지
  const value = useMemo<AuthContextType>(
    () => ({ accessToken, refreshToken, user, login, refreshUser, logout }),
    [accessToken, refreshToken, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
