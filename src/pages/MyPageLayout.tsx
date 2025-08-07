import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TabBar from "../components/myPage/TabBar";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LeftArrow from "../assets/icons/left-point.svg?react";

export default function MyPageLayout() {
  const nav = useNavigate();
  const location = useLocation();

  // 현재 경로가 /mypage/profile 이면 선을 숨김
  const hideDivider = location.pathname === "/mypage/profile";
  return (
    <div className="min-h-screen flex  flex-col bg-[#FFFBF8]">
      <Navbar />
      <div className="flex items-center gap-[4px] px-[20px] pt-[12px] pb-[12px]">
        <button onClick={() => nav(-1)} aria-label="뒤로가기">
          <LeftArrow className="h-5 w-5 shrink-0" />
        </button>
        <h2 className="text-[20px] font-semibold text-[#1D1D1D]">마이페이지</h2>
      </div>

      <TabBar />

      {/* 내 정보 페이지에서는 구분선 숨김 */}
      {!hideDivider && (
        <div className="mt-[10px] w-full h-[1px] bg-[#E9E5E2]" />
      )}

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
