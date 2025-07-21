import "./App.css";
import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import MainPage from "./pages/MainPage";

// 피드 관련 페이지
import CategoryFeed from "./pages/CategoryFeed";
import FavoriteFeed from "./pages/FavoriteFeed";
import RandomFeed from "./pages/RandomFeed";
import BestFeed from "./pages/BestFeed";
import ExRandomFeed from "./pages/ExRandomFeed";
// import CategoryDrawerTest from "./pages/CategoryDrawerTest";

// 로그인 관련 페이지
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

// 글쓰기, 완료, 교훈 모달
import PostWrite from "./pages/PostWrite";
import PostSuccess from "./pages/PostSuccess";
import Feedback from "./components/modals/Feedback";
import Report from "./components/modals/Report";

import type { OopsPost } from "./types/OopsList";

function App() {
  const [posts, setPosts] = useState<OopsPost[]>([]);
  const [selectedStep, setSelectedStep] = useState<0 | 1 | 2>(0);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const publicRoutes: RouteObject[] = [
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <div>Not Found</div>,
      children: [
        { index: true, element: <MainPage /> },
        { path: "category-feed", element: <CategoryFeed /> },
        { path: "favorite-feed", element: <FavoriteFeed /> },
        { path: "random-feed", element: <RandomFeed /> },
        { path: "best-feed", element: <BestFeed /> },
        { path: "exrandom-feed", element: <ExRandomFeed /> },
        // { path: "drawer", element: <CategoryDrawerTest /> },
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
    { path: "/feedback", element: <Feedback /> },
    { path: "/report", element: <Report />},
  ];

  const router = createBrowserRouter([...publicRoutes]);

  return <RouterProvider router={router} />;
}

export default App;
