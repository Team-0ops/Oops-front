import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const HomeLayout = () => {
  const location = useLocation();
  const isFooterHidden = location.pathname === "/lucky-draw";

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
        <Navbar />
        <main className="flex-1 px-[20px] mb-[20px]">
          <Outlet />
        </main>
        {!isFooterHidden && <Footer />}
      </div>
    </>
  );
};

export default HomeLayout;
