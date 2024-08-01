import { useEffect, useState } from "react";
import classes from "./DashBoard.module.css";
//-------------------------------------------------------
function DashBoard() {
  //------------------------
  const [user, setUser] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/get-all")
      .then((result) => result.json())
      .then((data) => setData(data.slice(0, 8)));

    fetch("http://localhost:5000/get-all-user")
      .then((result) => result.json())
      .then((data) => setUser(data.length));
  }, []);
  //------------------------------------------------
  const date = (start, end) => {
    return `${start.split("-").reverse().join("/")} - ${end
      .split("-")
      .reverse()
      .join("/")}`;
  };
  //-------------------------------------
  if (!localStorage.getItem("admin"))
    return <h1>Login to authenticate admin rights</h1>;
  //--------
  return (
    <div className={classes.container}>
      <h2>DashBoard</h2>
      <div className={classes.info}>
        <div className={classes.component}>
          <h5>USERS</h5>
          <p>{user}</p>
          <span>
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
        <div className={classes.component}>
          <h5>ORDERS</h5>
          <p>{data.length}</p>
          <span>
            <i class="fa-solid fa-cart-shopping"></i>
          </span>
        </div>
        <div className={classes.component}>
          <h5>EARNINGS</h5>
          <p>${data.reduce((total, cur) => total + cur.price, 0)}</p>
          <span>
            <i class="fa-solid fa-circle-dollar-to-slot"></i>
          </span>
        </div>
        <div className={classes.component}>
          <h5>BALANCE</h5>
          <p>
            $
            {(data.reduce((total, cur) => total + cur.price, 0) / 2).toFixed(0)}
          </p>
          <span>
            <i class="fa-regular fa-credit-card"></i>
          </span>
        </div>
      </div>
      <div className={classes.table}>
        <h3>Latest Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cur, i) => {
              return (
                <tr key={cur._id}>
                  <td>{i + 1}</td>
                  <td>{cur._id}</td>
                  <td>{cur.user.userName}</td>
                  <td>{cur.hotel ? cur.hotel.name : "Hotel Deleted"}</td>
                  <td>{cur.room.toString()}</td>
                  <td>{date(cur.dateStart, cur.dateEnd)}</td>
                  <td>{cur.price}$</td>
                  <td>{cur.payment}</td>
                  <td>
                    <p className={classes[`${cur.status}`]}>{cur.status}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashBoard;
