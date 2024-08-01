import classes from "./RoomList.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//------------------------------------------
function RoomList() {
  //------------------------
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/get-all-room")
      .then((result) => result.json())
      .then((data) => setData(data));
  }, []);
  //------------------------------------------------
  const deleteHandle = (id) => {
    const check = window.confirm("Delete Room ?");
    if (!check) return;
    fetch("http://localhost:5000/delete-room", {
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
  return (
    <div className={classes.container}>
      <h2>Room List</h2>
      <div>
        <nav>
          <p>Rooms List</p>
          <button onClick={() => navigate("/new-room")}>Add New</button>
        </nav>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Max People</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cur, i) => (
              <tr key={cur._id}>
                <td>{i + 1}</td>
                <td>{cur._id}</td>
                <td>{cur.title}</td>
                <td>{cur.desc}</td>
                <td>${cur.price}</td>
                <td>{cur.maxPeople}</td>
                <td>
                  <button
                    className={classes.delete}
                    onClick={() => deleteHandle(cur._id)}
                  >
                    Delete
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
export default RoomList;
