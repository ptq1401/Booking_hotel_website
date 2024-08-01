import { useEffect, useState, useRef, useMemo } from "react";
import classes from "./Room.module.css";
import { useNavigate } from "react-router-dom";
function Room(props) {
  //----------------
  const [rooms, setRooms] = useState([]); // list room valid
  const [booking, setBooking] = useState([{ roomNumber: [], price: 0 }]); // list room reserve
  const form = useRef();
  const select = useRef();
  const navigate = useNavigate();
  //function get day from DateRange
  const getday = (day) => {
    const digit = (number) => {
      return new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
      }).format(number);
    };
    const startMonth = digit(day.startDate.getMonth() + 1);
    const endMonth = digit(day.endDate.getMonth() + 1);
    const startDay = digit(day.startDate.getDate());
    const endDay = digit(day.endDate.getDate());
    //--------------------------------------------
    const startdate = `${day.startDate.getFullYear()}-${startMonth}-${startDay}`;
    const enddate = `${day.endDate.getFullYear()}-${endMonth}-${endDay}`;
    return { checkin: startdate, checkout: enddate };
  };

  //---------------get room-----------------------
  useEffect(() => {
    fetch("http://localhost:5000/get-room", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        _id: props.data.hotelId,
        date: props.data.date ? getday(props.data.date) : null,
      }),
    })
      .then((result) => result.json())
      .then((data) => setRooms(data))
      .catch((err) => console.log(err));
  }, [props.data]);
  //-------handle form function----------------------------------
  const formHandle = () => {
    const data = new FormData(form.current);
    let arrayRoom = [];
    rooms.forEach((cur) => {
      if (data.getAll(cur._id).length > 0) {
        arrayRoom.push({
          room_id: cur._id,
          roomNumber: data.getAll(cur._id),
          price: cur.price,
        });
      }
    });
    setBooking(arrayRoom);
  };
  //------------total bill------------------------
  const bill = useMemo(() => {
    const time = props.data.date
      ? (props.data.date.endDate - props.data.date.startDate) / 86400000
      : 0;
    let total = 0;
    booking.forEach((cur) => {
      total += cur.roomNumber.length * cur.price * time;
    });
    return total;
  }, [booking]);
  //---------------------reserve booking------------------------------
  const reserveHandle = () => {
    if (bill === 0) return alert("Error: Total bill: $0");
    const data = {
      roomReserve: booking,
      user: localStorage.getItem("login"),
      hotel: props.data.hotelId,
      date: getday(props.data.date),
      payment: select.current.value,
    };
    fetch("http://localhost:5000/add-transaction", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.success) {
          alert(data.inform);
        }
        navigate("/transaction");
      })
      .catch((err) => console.log(err));
  };
  //----------------------------------------------------------
  return (
    <>
      <h2>Select Rooms</h2>
      <form className={classes.container} ref={form}>
        {rooms.map((cur, i) => (
          <div key={i} className={classes.room}>
            <div>
              <h3>{cur.title.toUpperCase()}</h3>
              <p>
                Description: <strong>{cur.desc}</strong>
              </p>
              <p>
                Max people: <strong>{cur.maxPeople}</strong>
              </p>
              <h3>${cur.price}</h3>
            </div>
            <div className={classes.form}>
              {cur.roomNumber.map((num, i) => (
                <div key={i}>
                  <label>{num}</label>
                  <input
                    type="checkbox"
                    name={cur._id}
                    value={num}
                    onChange={formHandle}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
      <h2>Total Bill: {bill}$</h2>
      <div className={classes.payment}>
        <select className={classes.select} ref={select}>
          <option selected disabled value="Cash">
            Select Payment Method
          </option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <button onClick={reserveHandle}>Reserve Now</button>
      </div>
    </>
  );
}
export default Room;
