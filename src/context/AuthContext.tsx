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

/**
 * AuthContext에 담기는 값의 타입 정의
 */
interface AuthContextType {
  user: User | null; // 로그인 된 사용자 정보
  accessToken: string | null; // 인증 토큰
  refreshToken: string | null; // 인증 토큰
  login: (params: LoginParams) => Promise<void>; // 로그인 함수
  refreshUser: () => Promise<void>; // 사용자 정보 갱신 함수
  logout: (opts?: { redirect?: boolean }) => Promise<void>; // 로그아웃 함수
}

// localStorage key 상수
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

/**
 * 기본 AuthContext (Provider 외부에서 사용 시 에러 발생하도록 설정)
 */
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

/**
 * 인증 컨텍스트 Provider
 * - 로그인/로그아웃/유저정보 조회를 전역적으로 관리
 * - localStorage에 토큰/유저 정보를 저장하여 새로고침에도 유지
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
  // 최초 로딩 시 localStorage에서 상태 복원
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

  /**
   * 유저 정보 갱신
   * - accessToken이 없으면 user 초기화
   * - 토큰이 있으면 `getMyProfile` 호출 후 user 업데이트
   */
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
      // 토큰이 유효하지 않으면 초기화
      console.warn("refreshUser failed:", e);
      setUser(null);
      localStorage.removeItem(USER_KEY);
    }
  };

  /**
   * 로그인 처리
   * - postLogin 호출 → 토큰 저장
   * - 상태 & localStorage 동기화
   * - refreshUser 호출로 유저 정보 최신화
   */
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

      // 상태 & LocalStorage 동기화 (상태 먼저 올려서 UI 즉시 전환)
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

  /**
   * 로그아웃 처리
   * - 서버에 로그아웃 요청
   * - 상태 & localStorage 초기화
   * - redirect 옵션에 따라 "/"로 이동
   */
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

      // 보호 경로에서 자동 호출되는 API 재요청 방지 위해 강제 새로고침
      window.location.replace("/");
    }
  };

  // 앱 최초 렌더링 시 accessToken이 있으면 유저 정보 불러오기
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      refreshUser().catch(() => {});
    }
  }, []);

  // context value는 memoization으로 불필요한 리렌더 방지
  const value = useMemo<AuthContextType>(
    () => ({ accessToken, refreshToken, user, login, refreshUser, logout }),
    [accessToken, refreshToken, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * AuthContext 사용을 위한 커스텀 훅
 */
export const useAuth = () => useContext(AuthContext);
