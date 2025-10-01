import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TabBar from "../../components/myPage/TabBar";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import LeftArrow from "../assets/icons/left-point.svg?react";

/**
 * 마이페이지 레이아웃 컴포넌트
 * - 공통 Navbar, Footer 포함
 * - 상단에 "마이페이지" 제목 + 뒤로가기 버튼 표시
 * - TabBar(내 실패담 / 내 교훈 / 내 정보) 표시
 * - 현재 경로에 따라 구분선 조건부 렌더링
 * - 내부 라우트 콘텐츠는 <Outlet />으로 표시
 */
export default function MyPageLayout() {
  const nav = useNavigate();
  const location = useLocation();

  // "/profile" 페이지 여부 확인 -> 구분선 표시 여부 결정
  const isMyInfoPage = location.pathname.includes("/profile");
  return (
    <div className="min-h-screen flex  flex-col bg-[#FFFBF8]">
      {/* 공통 네비게이션 바 */}
      <Navbar />

      {/* 헤더 영역: 뒤로가기 + 타이틀 */}
      <div className="flex items-center gap-[4px] px-[20px] pt-[12px] pb-[12px]">
        <button onClick={() => nav(-1)} aria-label="뒤로가기">
          <LeftArrow className="h-5 w-5 shrink-0" />
        </button>
        <h2 className="text-[20px] font-semibold text-[#1D1D1D]">마이페이지</h2>
      </div>

      {/* 마이페이지 전용 탭바 */}
      <TabBar />

      {/* 페이지 콘텐츠 */}
      <div className="flex-grow">
        {/* 프로필 페이지가 아닐 경우만 구분선 표시 */}
        {!isMyInfoPage && <div className="w-full h-[1px] bg-[#E9E5E2] mt-2" />}
        <Outlet />
      </div>
      
      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
}
