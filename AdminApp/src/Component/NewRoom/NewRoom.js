import classes from "./NewRoom.module.css";
import { useRef, useState, useEffect } from "react";
//--------------------------------------------------------
function NewRoom() {
  //--hook--
  const [hotelList, setHotelList] = useState([]);
  const form = useRef();
  //---get hotel list--
  useEffect(() => {
    fetch("http://localhost:5000/get-hotel")
      .then((result) => result.json())
      .then((data) => setHotelList(data))
      .catch((err) => console.log(err));
  }, []);
  //--------
  if (!localStorage.getItem("admin")) {
    return <h1>Login to authenticate admin rights</h1>;
  }
  const addRoomHandle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      price: formData.get("price"),
      maxPeople: formData.get("maxPeople"),
      roomNumber: formData.get("roomNumber").split(" "),
    };
    for (let key in data) {
      if (!data[key]) {
        alert(`${key} empty`);
        return;
      }
    }
    const hotelId = formData.get("hotel_id");
    fetch("http://localhost:5000/add-room", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: data, hotel_id: hotelId }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.success) {
          alert(data.inform);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };
  //-------------------------------------

  //--------
  return (
    <div className={classes.container}>
      <h3>Add New Hotel</h3>
      <form ref={form}>
        <div>
          <label>Title</label>
          <input name="title"></input>
        </div>
        <div>
          <label>Description</label>
          <input name="desc"></input>
        </div>
        <div>
          <label>Price</label>
          <input name="price" type="number"></input>
        </div>
        <div>
          <label>Max People</label>
          <input name="maxPeople" type="number"></input>
        </div>
        <div>
          <label>Room Number</label>
          <input name="roomNumber"></input>
          <p className={classes.notify}>
            Use space (" ") between two room number
          </p>
        </div>
        <div>
          <label>Choose a Hotel</label>
          <select name="hotel_id">
            {hotelList.map((cur, i) => (
              <option value={cur._id} key={i}>
                {cur.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={classes.button}
          onClick={(e) => addRoomHandle(e)}
        >
          Send
        </button>
      </form>
    </div>
  );
}
//--------------------------------------------------------
export default NewRoom;
