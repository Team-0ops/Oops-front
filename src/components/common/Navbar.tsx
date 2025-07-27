import Bugger from "../../assets/icons/Vector.svg?react";
import Logo from "../../assets/icons/navbar.svg?react";
import SearchLogo from "../../assets/icons/search.svg?react";
import WriteLogo from "../../assets/icons/write.svg?react";
import My from "../../assets/icons/my.svg?react";
import { useState } from "react";
import CategoryDrawer from "../common/CategoryDrawer";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center px-[20px] py-[12px] bg-[#FFF] border-neutral-700 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <div className="flex gap-[8px] items-center">
          <button onClick={() => setIsDrawerOpen(true)}>
            <Bugger className="w-[24px] h-[24px]" />
          </button>

          <Link to="/">
            <Logo className="w-[49.498px] h-[20px]" />
          </Link>
        </div>

        <div className="flex gap-[8px] items-center">
          <Link to="search">
            <SearchLogo />
          </Link>

          <Link to="/post">
            <WriteLogo />
          </Link>

          <button>
            <My />
          </button>
        </div>
      </nav>

      {/* 드로어 조건부 렌더링 */}
      {isDrawerOpen && (
        <CategoryDrawer onClose={() => setIsDrawerOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
