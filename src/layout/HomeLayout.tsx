import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

//로그인 구현 전 nav바, footer만 구현
const HomeLayout = () => {
    return(
        <>
            <div>
                <Navbar />
                <main>
                    <Outlet />
                </main>

                <Footer />
                </div>
        </>
    )
}

export default HomeLayout;