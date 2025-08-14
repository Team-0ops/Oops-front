import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { postLogin } from "../apis/auth/authApi";
import type { User } from "../types/User";

type LoginParams = { email: string; password: string };

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (params: LoginParams) => Promise<void>;
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

  const login = async (signinData: LoginParams) => {
    try {
      const { data } = await postLogin(signinData);

      if (!data) throw new Error("로그인 응답이 없습니다.");

      const newAccessToken = data.accessToken as string;
      const newRefreshToken = data.refreshToken as string;

      // 서버 키가 nickName / nickname 혼용될 수 있어 보호적으로 처리
      const nickname = data.nickname ?? data.nickName;

      const newUser: User = {
        userId: Number(data.userId),
        nickname,
        email: String(data.email),
        profileImage: data.profileImage ?? null,
      };

      // 1) state
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setUser(newUser);

      // 2) storage
      localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));

      // 라우팅은 Provider 밖(페이지)에서 navigate로 처리 추천
      // ex) 로그인 페이지에서: await login(...); navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      throw error; // 호출한 쪽에서 에러 UI 처리
    }
  };

  // value는 메모이즈해서 불필요 리렌더 방지
  const value = useMemo<AuthContextType>(
    () => ({ accessToken, refreshToken, user, login }),
    [accessToken, refreshToken, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
