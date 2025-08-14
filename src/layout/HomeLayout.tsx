import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";

const HomeLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/signin"} replace />;
  }

  const location = useLocation();
  const isFooterHidden = location.pathname === "/lucky-draw";

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
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
