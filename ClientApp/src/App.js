import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import User from "./pages/user/User";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/search", element: <Search /> },
    { path: "/detail/:hotel", element: <Detail /> },
    { path: "/:param", element: <User /> },
  ]);

  //----------------------------------------------
  return (
    <div style={{ width: "95vw", margin: "10px auto" }}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
