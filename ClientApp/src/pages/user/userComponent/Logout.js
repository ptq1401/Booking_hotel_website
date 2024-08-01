import { useNavigate } from "react-router-dom";
//------------------------------------
function Logout() {
  const navigate = useNavigate();
  const logoutHandle = (e) => {
    e.preventDefault();
    localStorage.removeItem("login");
    navigate("/");
  };
  return (
    <form>
      <h2>Logout</h2>
      <button onClick={(e) => logoutHandle(e)}>Logout</button>
    </form>
  );
}
export default Logout;
