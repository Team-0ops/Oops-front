import { Outlet, useNavigate } from "react-router-dom";
import TabBar from "../components/myPage/TabBar";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LeftArrow from "../assets/icons/left-point.svg?react";

export default function MyPageLayout() {
  const nav = useNavigate();
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
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
