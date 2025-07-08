import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import MainPage from "./pages/MainPage";
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
      //이후 추가하시면 됩니다.
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
