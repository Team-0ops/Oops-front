import Navbar from '../components/common/Navbar';
import { Outlet } from 'react-router-dom';

const PostWriteLayout= () => {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
          <Navbar />
          <main className="flex-1 px-[20px]">
            <Outlet />
          </main>
        </div>
      </>
    );
  };

  export default PostWriteLayout;