import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import MainPage from "./pages/MainPage";

// 피드 관련 페이지
import PostDetail from "./pages/PostDetail";
import CategoryFeed from "./pages/CategoryFeed";
import FavoriteFeed from "./pages/FavoriteFeed";
import RandomFeed from "./pages/RandomFeed";
import BestFeed from "./pages/BestFeed";
import ExRandomFeed from "./pages/ExRandomFeed";
// import CategoryDrawerTest from "./pages/CategoryDrawerTest";

// 로그인 관련 페이지
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import FindIdPwPage from "./pages/FindIdPw";
import TermsPage from "./pages/TermsPage";

// 글쓰기, 완료, 교훈 모달
import PostWrite from "./pages/PostWrite";
import PostSuccess from "./pages/PostSuccess";
import SearchPage from "./pages/SearchPage";
import FailWiki from "./pages/FailWiki";

//마이페이지
import MyPageLayout from "./pages/MyPageLayout";
import MyFailuresPage from "./pages/MyFailuresPage";
import MyLessonsPage from "./pages/MyLessonsPage";
import MyProfilePage from "./pages/MyProfilePage";

import OthersProfilePage from "./pages/OthersProfilePage";

function App() {
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
        { path: "postsuccess", element: <PostSuccess /> },
        { path: "postdetail", element: <PostDetail /> },
        // { path: "drawer", element: <CategoryDrawerTest /> },
        { path: "post", element: <PostWrite /> },
        { path: "fail-wiki", element: <FailWiki /> },
      ],
    },

    {
      path: "/mypage",
      element: <MyPageLayout />,
      children: [
        { index: true, element: <Navigate to="failures" replace /> },
        { path: "failures", element: <MyFailuresPage /> },
        { path: "lessons", element: <MyLessonsPage /> },
        { path: "profile", element: <MyProfilePage /> },
      ],
    },

    {
      path: "/users/:userId",
      element: <OthersProfilePage />,
    },

    { path: "/signin", element: <SigninPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/find-idpw", element: <FindIdPwPage /> },
    { path: "/terms", element: <TermsPage /> },
    { path: "/search", element: <SearchPage /> },
  ];

  const router = createBrowserRouter([...publicRoutes]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
