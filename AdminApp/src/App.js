import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SideBar from "./Component/Sidebar/SideBar";
import NewHotel from "./Component/NewHotel/NewHotel";
import NewRoom from "./Component/NewRoom/NewRoom";
import Login from "./Component/Login/Login";
import DashBoard from "./Component/Dashboard/DashBoard";
import HotelList from "./Component/HotelList/HotelList";
import RoomList from "./Component/RoomList/RoomList";
import Transaction from "./Component/Transaction/Transaction";
import Edit from "./Component/Edit/Edit";
import Logout from "./Component/Logout/Logout";
//------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <SideBar></SideBar>,
    children: [
      { path: "/", element: <Login></Login> },
      { path: "/new-hotel", element: <NewHotel></NewHotel> },
      { path: "/new-room", element: <NewRoom></NewRoom> },
      { path: "/dashboard", element: <DashBoard></DashBoard> },
      { path: "/hotel-list", element: <HotelList></HotelList> },
      { path: "/room-list", element: <RoomList></RoomList> },
      { path: "/transaction", element: <Transaction></Transaction> },
      { path: "/edit/:hotel_id", element: <Edit></Edit> },
      { path: "/logout", element: <Logout></Logout> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
