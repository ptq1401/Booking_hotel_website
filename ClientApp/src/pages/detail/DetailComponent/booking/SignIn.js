import classes from "./SignIn.module.css";
import ReactDOM from "react-dom";
import React from "react";
import { useContext, useRef } from "react";
import SearchContext from "../../../../store/SearchContext";
//------------------
const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};
const Container = (props) => {
  //---hook----
  const dataContext = useContext(SearchContext);
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
          dataContext.login();
          dataContext.setBooking();
        }
      })
      .catch((err) => console.log(err));
  }
  //----------------------------------------------
  return (
    <>
      <Backdrop></Backdrop>
      <div className={classes.modal}>
        <h3 className={classes.title}>Login to make a reservation</h3>
        <div className={classes.close}>
          <button onClick={dataContext.login}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <form ref={form}>
          <h2>Login</h2>
          <input placeholder="UserName" name="userName"></input>
          <input placeholder="Password" type="password" name="password"></input>
          <button type="submit" onClick={(e) => loginHandle(e)}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};
const SignIn = (props) => {
  return ReactDOM.createPortal(
    <Container />,
    document.getElementById("booking")
  );
};
//----------------
export default SignIn;
