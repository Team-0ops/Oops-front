import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

//로그인 구현 전 nav바, footer만 구현
const HomeLayout = () => {
    return(
        <>
            <div>
                <Navbar />
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default HomeLayout;