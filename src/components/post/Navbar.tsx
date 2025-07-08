import { FaBars, FaSearch } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className="h-[100px] px-4 py-2">
      <div className="flex justify-between items-center mb-4 text-[20px] ">
        <div className="flex items-center font-bold gap-4 ">
          <FaBars />
          Oops!
        </div>

        <div className="flex items-center gap-4">
          <FaSearch />
          <MdEdit />
          <FaUser />
        </div>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
