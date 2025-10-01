import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * 보호된 라우트(인증 필요 페이지) 컴포넌트
 * - `accessToken`이 없으면 로그인 페이지(`/signin`)로 리다이렉트
 * - `accessToken`이 있으면 children을 그대로 렌더링
 */
interface ProtectedRouteProps {
  children: ReactNode; // 인증 성공 시 렌더링할 자식 컴포넌트
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useAuth(); // AuthContext에서 토큰 가져오기
  const location = useLocation(); // 현재 위치 정보

  // 로그인하지 않은 경우 -> 로그인 페이지로 이동
  if (!accessToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // 인증된 경우 -> 자식 컴포넌트 랜더링 
  return <>{children}</>;
};

export default ProtectedRoute;
