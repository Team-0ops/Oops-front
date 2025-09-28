import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";

const HomeLayout = () => {
  const location = useLocation();
  const isFooterHidden = location.pathname === "/lucky-draw";
  const { accessToken } = useAuth();

  return (
    <>
      <div
        key={accessToken ? "auth" : "guest"}
        className="min-h-screen flex flex-col bg-[#FFFBF8]"
      >
        <Navbar />
        <main className="flex-1 px-[20px] mb-[50px]">
          <Outlet />
        </main>
        {!isFooterHidden && <Footer />}
      </div>
    </>
  );
};

export default HomeLayout;
