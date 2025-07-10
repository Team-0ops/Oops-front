import './app.css'; //tailwindcss 사용하지 않아서 일단 폰트를 app.css에 넣었습니다. 협업 하면서 수정가능
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import MainPage from "./pages/MainPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <div>Not Found</div>, //임시
    children: [
      {
        index: true,
        element: <MainPage />
      },
      //이후 추가하시면 됩니다.
    ]
  }
]

const router = createBrowserRouter( [...publicRoutes]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
