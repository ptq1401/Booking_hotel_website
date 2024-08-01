import Login from "./userComponent/Login";
import Logout from "./userComponent/Logout";
import Register from "./userComponent/Register";
import Transaction from "./userComponent/Transaction";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
//-------------------------------------------
function User() {
  const value = localStorage.getItem("login")
    ? ["Transaction", "Logout"]
    : ["Register", "Login"];
  const navigate = useNavigate();
  //----------------------------------
  const NavBar = styled.div`
    width: 100%;
    height: 70px;
    background-color: #2b26b0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & h3 {
      color: #fff;
      margin-left: 50px;
    }
    & div {
      margin-right: 50px;
    }
    & div button {
      margin-left: 20px;
      width: 100px;
      height: 30px;
    }
  `;

  //----------------------------------
  const { param } = useParams();
  return (
    <>
      <NavBar>
        <h3>Booking Website</h3>
        <div>
          <button onClick={() => navigate(`/${value[0].toLocaleLowerCase()}`)}>
            {value[0]}
          </button>
          <button onClick={() => navigate(`/${value[1].toLocaleLowerCase()}`)}>
            {value[1]}
          </button>
        </div>
      </NavBar>
      {param === "logout" ? <Logout></Logout> : ""}
      {param === "login" ? <Login></Login> : ""}
      {param === "register" ? <Register></Register> : ""}
      {param === "transaction" ? <Transaction></Transaction> : ""}
    </>
  );
}
//----------------------------------------------
export default User;
