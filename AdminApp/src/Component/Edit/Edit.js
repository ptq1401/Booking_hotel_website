import classes from "./Edit.module.css";
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//--------------------------------------------------------
function Edit() {
  //--hook--
  const navigate = useNavigate();
  const { hotel_id } = useParams();
  const form = useRef();
  const [data, setData] = useState({ photos: [] });
  //------------------------------------------------
  useEffect(() => {
    fetch("http://localhost:5000/get-detail-hotel", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ hotel_id: hotel_id }),
    })
      .then((result) => result.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  //-----------------------------------------------
  const updateHandle = (e) => {
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
    fetch("http://localhost:5000/edit-hotel", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ hotel: data, _id: hotel_id }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.success) {
          alert(data.inform);
          navigate("/hotel-list");
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
      <h3>Edit Hotel Information</h3>
      <form ref={form}>
        <div>
          <label>Name</label>
          <input name="name" defaultValue={data.name}></input>
        </div>
        <div>
          <label>Type</label>
          <select name="type">
            <option value={data.type} selected>
              {data.type}
            </option>
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
            <option value={data.city} selected>
              {data.city}
            </option>
            <option value="TP Ho Chi Minh">TP Ho Chi Minh</option>
            <option value="Da Nang">Da Nang</option>
            <option value="Ha Noi">Ha Noi</option>
          </select>
        </div>
        <div>
          <label>Address</label>
          <input name="address" defaultValue={data.address}></input>
        </div>
        <div>
          <label>Distance from City Center</label>
          <input
            name="distance"
            type="number"
            defaultValue={data.distance}
          ></input>
        </div>
        <div>
          <label>Rating</label>
          <input
            name="rating"
            type="string"
            placeholder="0 - 5"
            defaultValue={data.rating}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input name="desc" defaultValue={data.desc}></input>
        </div>
        <div>
          <label>Featured</label>
          <select name="featured" defaultValue={data.featured}>
            <option value={data.featured} selected>
              {data.featured ? "Yes" : "No"}
            </option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div>
          <label>Photos</label>
          <input name="photos" defaultValue={data.photos.join(" ")}></input>
          <p className={classes.notify}>Use space (" ") between two link</p>
        </div>
        <button
          type="submit"
          className={classes.button}
          onClick={(e) => updateHandle(e)}
        >
          Update
        </button>
      </form>
    </div>
  );
}
//--------------------------------------------------------
export default Edit;
