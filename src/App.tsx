import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PostWrite from "./pages/PostWrite";
import PostSuccess from "./pages/PostSuccess";

import type { OopsPost } from "./types/OopsList";

function App() {
  // 상태 선언
  const [posts, setPosts] = useState<OopsPost[]>([]);
  const [selectedStep, setSelectedStep] = useState<0 | 1 | 2>(0);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // PostWrite 컴포넌트에 필요한 상태를 props로 전달하기 위해
  // publicRoutes를 App 내부로 이동했습니다.
  const publicRoutes: RouteObject[] = [
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <div>Not Found</div>,
      children: [
        { index: true, element: <MainPage /> },
        {
          path: "post",
          element: (
            <PostWrite
              posts={posts}
              setPosts={setPosts}
              selectedStep={selectedStep}
              setSelectedStep={setSelectedStep}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
            />
          ),
        },
      ],
    },
    { path: "/signin", element: <SigninPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/postsuccess", element: <PostSuccess /> },
  ];

  const router = createBrowserRouter([...publicRoutes]);

  return <RouterProvider router={router} />;
}

export default App;
