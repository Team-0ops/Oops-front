import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

//로그인 구현 전 nav바, footer만 구현
const HomeLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
        <Navbar />
        <main className="flex-1 px-[20px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
