import Bugger from '../../assets/icons/Vector.svg?react';
import Logo from '../../assets/icons/MainLogo2.svg?react';
import SearchLogo from '../../assets/icons/search.svg?react';
import WriteLogo from '../../assets/icons/write.svg?react';
import My from '../../assets/icons/my.svg?react';

const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between items-center px-[20px] py=[12px] border-neutral-700">
                <div className="flex gap-[8px] items-center">
                    <button>
                        <Bugger className="w-[24px] h-[24px]" />
                    </button>

                    <Logo className="w-[49.498px] h-[20px]"/>
                </div>
                <div className="flex gap-[8px] items-center ">
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
        </>
    )

}
export default Navbar;