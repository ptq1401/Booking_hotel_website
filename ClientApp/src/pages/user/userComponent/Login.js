import "./form.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
//-----------------------------------------------------
function Login() {
  //---hook----
  const navigate = useNavigate();
  const form = useRef();
  //--register function---
  function loginHandle(e) {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      userName: formData.get("userName"),
      password: formData.get("password"),
    };
    for (let key in data) {
      if (!data[key]) {
        alert(`${key} empty`);
        return;
      }
    }

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((data) => {
        if (!data.success) {
          alert(data.inform);
        } else {
          localStorage.setItem("login", data._id);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }
  //---------
  return (
    <form ref={form}>
      <h2>Login</h2>
      <input placeholder="UserName" name="userName"></input>
      <input placeholder="Password" type="password" name="password"></input>
      <button type="submit" onClick={(e) => loginHandle(e)}>
        Login
      </button>
    </form>
  );
}
export default Login;
