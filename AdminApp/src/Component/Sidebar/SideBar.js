import classes from "./SideBar.module.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
//--------------------------------------------------------

function SideBar() {
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <h2>Admin Page</h2>
        <ul>
          <p>MAIN</p>
          <li>
            <Link to="/dashboard" className={classes.link}>
              <i class="fa-brands fa-microsoft"></i> Dashboard
            </Link>
          </li>
          <p>LIST</p>
          <li>
            <Link to="#" className={classes.link}>
              <i class="fa-solid fa-user-group"></i> Users
            </Link>
          </li>
          <li>
            <Link to="/hotel-list" className={classes.link}>
              <i class="fa-solid fa-hotel"></i> Hotels
            </Link>
          </li>
          <li>
            <Link to="/room-list" className={classes.link}>
              <i class="fa-solid fa-bed"></i> Rooms
            </Link>
          </li>
          <li>
            <Link to="/transaction" className={classes.link}>
              <i class="fa-solid fa-file-invoice"></i> Transactions
            </Link>
          </li>
          <p>NEW</p>
          <li>
            <Link to="/new-hotel" className={classes.link}>
              <i class="fa-solid fa-plus"></i> Add New Hotel
            </Link>
          </li>
          <li>
            <Link to="/new-room" className={classes.link}>
              <i class="fa-solid fa-plus"></i> Add New Room
            </Link>
          </li>
          <p>User</p>
          <li>
            <Link to="/logout" className={classes.link}>
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </Link>
          </li>
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
//--------------------------------------------------------
export default SideBar;
