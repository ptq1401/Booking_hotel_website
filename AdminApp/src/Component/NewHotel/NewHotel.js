import classes from "./NewHotel.module.css";
import { useRef } from "react";
//--------------------------------------------------------
function NewHotel() {
  //--hook--
  const form = useRef();
  //--------
  const addHotelHandle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      type: formData.get("type"),
      city: formData.get("city"),
      address: formData.get("address"),
      distance: Number(formData.get("distance")),
      rating: Number(formData.get("rating")),
      desc: formData.get("desc"),
      featured: formData.get("featured")
        ? formData.get("featured")
        : "No featured",
      photos: formData.get("photos").split(" "),
    };
    for (let key in data) {
      if (!data[key]) {
        alert(`${key} empty`);
        return;
      }
    }
    fetch("http://localhost:5000/add-hotel", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
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
  if (!localStorage.getItem("admin"))
    return <h1>Login to authenticate admin rights</h1>;
  //--------
  return (
    <div className={classes.container}>
      <h3>Add New Hotel</h3>
      <form ref={form}>
        <div>
          <label>Name</label>
          <input name="name"></input>
        </div>
        <div>
          <label>Type</label>
          <select name="type">
            <option value="Hotel">Hotel</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Resort">Resort</option>
            <option value="Cabin">Cabin</option>
          </select>
        </div>
        <div>
          <label>City</label>
          <select name="city">
            <option value="TP Ho Chi Minh">TP Ho Chi Minh</option>
            <option value="Da Nang">Da Nang</option>
            <option value="Ha Noi">Ha Noi</option>
          </select>
        </div>
        <div>
          <label>Address</label>
          <input name="address"></input>
        </div>
        <div>
          <label>Distance from City Center</label>
          <input name="distance" type="number"></input>
        </div>
        <div>
          <label>Rating</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="1"
            placeholder="0 - 5"
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input name="desc"></input>
        </div>
        <div>
          <label>Featured</label>
          <select name="featured">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div>
          <label>Photos</label>
          <input name="photos"></input>
          <p className={classes.notify}>Use space (" ") between two link</p>
        </div>
        <div>
          <label>Rooms</label>
          <p className={classes.notify}>
            Click Add New Rooms to add rooms to the hotel
          </p>
        </div>
        <button
          type="submit"
          className={classes.button}
          onClick={(e) => addHotelHandle(e)}
        >
          Send
        </button>
      </form>
    </div>
  );
}
//--------------------------------------------------------
export default NewHotel;
