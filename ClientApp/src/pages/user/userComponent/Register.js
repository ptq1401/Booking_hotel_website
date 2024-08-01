import { useRef } from "react";
import { useNavigate } from "react-router-dom";
//----------------------------------------------------------
function Register() {
  //---hook----
  const navigate = useNavigate();
  const form = useRef();
  //--register function---
  function registerHandle(e) {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      userName: formData.get("userName"),
      password: formData.get("password"),
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
    };
    for (let key in data) {
      if (!data[key]) {
        alert(`${key} empty`);
        return;
      }
    }
    fetch("http://localhost:5000/register", {
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
          alert(data.inform);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }
  //---------
  return (
    <form ref={form}>
      <h2>Register</h2>
      <input placeholder="Username" name="userName"></input>
      <input placeholder="Password" type="password" name="password"></input>
      <input placeholder="Full Name" name="fullName"></input>
      <input placeholder="Phone Number" name="phoneNumber"></input>
      <input placeholder="Email" name="email"></input>
      <button type="submit" onClick={(e) => registerHandle(e)}>
        Create Account
      </button>
    </form>
  );
}
export default Register;
