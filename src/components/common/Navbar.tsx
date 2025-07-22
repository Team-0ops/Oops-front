import Bugger from '../../assets/icons/Vector.svg?react';
import Logo from '../../assets/icons/MainLogo2.svg?react';
import SearchLogo from '../../assets/icons/search.svg?react';
import WriteLogo from '../../assets/icons/write.svg?react';
import My from '../../assets/icons/my.svg?react';
import { useState } from 'react';
import CategoryDrawer from '../common/CategoryDrawer'; 

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* NavBar */}
      <nav className="flex justify-between items-center px-[20px] py-[12px] border-neutral-700 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <div className="flex gap-[8px] items-center">
          <button onClick={() => setIsDrawerOpen(true)}>
            <Bugger className="w-[24px] h-[24px]" />
          </button>
          <Logo className="w-[49.498px] h-[20px]" />
        </div>

        <div className="flex gap-[8px] items-center">
          <button>
            <SearchLogo />
          </button>

          <button>
            <WriteLogo />
          </button>

          <button>
            <My />
          </button>
        </div>
      </nav>

      {/* Drawer 조건부 렌더링 */}
      {isDrawerOpen && (
        <CategoryDrawer onClose={() => setIsDrawerOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
