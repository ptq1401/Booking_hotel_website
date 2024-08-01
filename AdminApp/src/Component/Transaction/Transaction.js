import classes from "./Transaction.module.css";
import { useEffect, useState } from "react";
//------------------------------------------
function Transaction() {
  //------------------------
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/get-all")
      .then((result) => result.json())
      .then((data) => setData(data));
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
      <h2>Transactions List</h2>
      <div>
        <nav>
          <p>Transactions List</p>
        </nav>
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

//------------------------------------------
export default Transaction;
