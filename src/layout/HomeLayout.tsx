import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const HomeLayout = () => {
  const location = useLocation();
  const isFooterHidden = location.pathname === "/lucky-draw";

  return (
    <>
      <div>
        <Navbar />
        <main className="px-[20px] bg-[#FFFBF8]">
          <Outlet />
        </main>
        {!isFooterHidden && <Footer />}
      </div>
    </>
  );
};

export default HomeLayout;
