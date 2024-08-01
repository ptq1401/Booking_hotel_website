import classes from "./Booking.module.css";
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import Room from "./Room";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
//--------------------------------------------------
function Booking(props) {
  //--------------------------------------------
  const [user, setUser] = useState({});
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [data, setData] = useState({ hotelId: props.hotelId, date: null });
  const searchHandle = () => {
    setData({ hotelId: props.hotelId, date: state[0] });
  };
  //-------------get info user---------------
  useEffect(() => {
    fetch("http://localhost:5000/get-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ _id: localStorage.getItem("login") }),
    })
      .then((result) => result.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className={classes.container}>
        <div>
          <h1>Dates</h1>
          <div className={classes.date}>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setState([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>
          <div className={classes.search}>
            <button onClick={searchHandle}>Search</button>
            <p>Select dates checkin & checkout to search for suitable rooms</p>
          </div>
        </div>
        <div>
          <h1>Reserve Info</h1>
          <form className={classes.info}>
            <label>Your Full Name:</label>
            <input
              placeholder="Full Name"
              defaultValue={user.fullName ? user.fullName : ""}
            ></input>
            <label>Your Email:</label>
            <input
              placeholder="Email"
              defaultValue={user.email ? user.email : ""}
            ></input>
            <label>Your Phone Number:</label>
            <input
              placeholder="Phone Number"
              defaultValue={user.phoneNumber ? user.phoneNumber : ""}
            ></input>
            <label>Your Identity Card Number:</label>
            <input placeholder="Identity Card Number"></input>
          </form>
        </div>
      </div>
      <Room data={data}></Room>
    </>
  );
}
//--------------------------------------------------
export default Booking;
