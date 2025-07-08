import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import MainPage from "./pages/MainPage";

// 너의 브랜치에서 추가한 피드 관련 페이지
import CategoryFeed from "./pages/CategoryFeed";
import FavoriteFeed from "./pages/FavoriteFeed";
import RandomFeed from "./pages/RandomFeed";
import BestFeed from "./pages/BestFeed";
import ExRandomFeed from "./pages/ExRandomFeed";

// develop에서 추가된 로그인 관련 페이지
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <div>Not Found</div>, //임시
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "category-feed",
        element: <CategoryFeed />,
      },
      {
        path: "favorite-feed",
        element: <FavoriteFeed />,
      },
      {
        path: "random-feed",
        element: <RandomFeed />,
      },
      {
        path: "best-feed",
        element: <BestFeed />,
      },
      {
        path: "exrandom-feed",
        element: <ExRandomFeed />,
      },
    ],
  },
  { path: "/signin", element: <SigninPage /> },
  { path: "/signup", element: <SignupPage /> },
];

const router = createBrowserRouter([...publicRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
