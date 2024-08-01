import { useNavigate } from "react-router-dom";
import classes from "./Logout.module.css";
//------------------------------------
function Logout() {
  const navigate = useNavigate();
  const logoutHandle = (e) => {
    localStorage.removeItem("admin");
    navigate("/");
  };
  return (
    <div className={classes.logout}>
      <h2>Logout</h2>
      <button onClick={(e) => logoutHandle(e)}>Logout</button>
    </div>
  );
}
export default Logout;
