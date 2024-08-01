import classes from "./Login.module.css";
import ReactDOM from "react-dom";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
//------------------
const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};
function Container() {
  const navigate = useNavigate();
  const form = useRef();
  //--login function---
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

    fetch("http://localhost:5000/login-admin", {
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
          localStorage.setItem("admin", true);
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  }
  //----------------------------------------------
  return (
    <>
      <Backdrop></Backdrop>
      <div className={classes.modal}>
        <h3 className={classes.title}>Login to authenticate admin rights</h3>
        <form ref={form}>
          <input placeholder="UserName" name="userName"></input>
          <input placeholder="Password" type="password" name="password"></input>
          <button type="submit" onClick={(e) => loginHandle(e)}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
const SignIn = () => {
  localStorage.setItem("admin", "");
  return ReactDOM.createPortal(
    <Container />,
    document.getElementById("signin")
  );
};
//----------------
export default SignIn;
