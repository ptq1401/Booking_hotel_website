import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Transaction.module.css";
//------------------------------------
function Transaction() {
  //-------------------------------------------
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/get-transaction", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("login"),
      }),
    })
      .then((result) => result.json())
      .then((trans) => setData(trans))
      .catch((err) => console.log(err));
  }, []);
  //------------------------------------------------
  const date = (start, end) => {
    return `${start.split("-").reverse().join("/")} - ${end
      .split("-")
      .reverse()
      .join("/")}`;
  };
  //-------------------------------------------------
  return (
    <>
      <h2 className={classes.title}>Your Transaction</h2>
      <div className={classes.table}>
        <table>
          <thead>
            <tr>
              <th>#</th>
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
                  <td>{cur.hotel.name}</td>
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
    </>
  );
}
export default Transaction;
