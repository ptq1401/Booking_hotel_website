import classes from "./HotelList.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//------------------------------------------
function HotelList() {
  //------------------------
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/get-hotel")
      .then((result) => result.json())
      .then((data) => setData(data));
  }, []);
  //------------------------------------------------
  const deleteHandle = (id) => {
    const check = window.confirm("Delete Hotel ?");
    if (!check) return;
    fetch("http://localhost:5000/delete-hotel", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.success) {
          alert(data.inform);
          window.location.reload();
        } else alert(data.inform);
      })
      .catch((err) => console.log(err));
  };
  //-------------------------------------
  if (!localStorage.getItem("admin"))
    return <h1>Login to authenticate admin rights</h1>;
  //--------
  //------------------------------------------------
  return (
    <div className={classes.container}>
      <h2>Hotel List</h2>
      <div>
        <nav>
          <p>Hotels List</p>
          <button onClick={() => navigate("/new-hotel")}>Add New</button>
        </nav>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cur, i) => (
              <tr key={cur._id}>
                <td>{i + 1}</td>
                <td>{cur._id}</td>
                <td>{cur.name}</td>
                <td>{cur.type}</td>
                <td>{cur.city}</td>
                <td>
                  <button
                    className={classes.delete}
                    onClick={() => deleteHandle(cur._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={classes.update}
                    onClick={() => navigate(`/edit/${cur._id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//------------------------------------------
export default HotelList;
