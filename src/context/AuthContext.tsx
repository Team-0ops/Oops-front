import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { postLogin } from "../apis/auth/authApi";

type LoginParams = { email: string; password: string };

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (params: LoginParams) => Promise<void>;
}

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const AuthContext = createContext<AuthContextType>({
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

  const login = async (signinData: LoginParams) => {
    try {
      const { data } = await postLogin(signinData);

      if (!data) throw new Error("로그인 응답이 없습니다.");

      const newAccessToken = data.accessToken as string;
      const newRefreshToken = data.refreshToken as string;

      // 1) state
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      // 2) storage
      localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
      // 라우팅은 Provider 밖(페이지)에서 navigate로 처리 추천
      // ex) 로그인 페이지에서: await login(...); navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      throw error; // 호출한 쪽에서 에러 UI 처리
    }
  };

  // value는 메모이즈해서 불필요 리렌더 방지
  const value = useMemo<AuthContextType>(
    () => ({ accessToken, refreshToken, login }),
    [accessToken, refreshToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
