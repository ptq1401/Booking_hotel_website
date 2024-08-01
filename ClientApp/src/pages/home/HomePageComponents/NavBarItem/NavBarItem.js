//----------------import---------------------
import "./NavBarItem.css";
import { useNavigate } from "react-router-dom";
//-------------------create component Navbar-----------------
function NavBarItem(props) {
  const value = localStorage.getItem("login")
    ? ["Transaction", "Logout"]
    : ["Register", "Login"];
  //-------use hook------------
  const navigate = useNavigate();
  //--------------------------
  return (
    <div className="navbar">
      <div className="navbar-flex">
        <p>Booking Website</p>
        <div>
          <button onClick={() => navigate(`/${value[0].toLocaleLowerCase()}`)}>
            {value[0]}
          </button>
          <button onClick={() => navigate(`/${value[1].toLocaleLowerCase()}`)}>
            {value[1]}
          </button>
        </div>
      </div>
      <nav>
        {props.data.map((cur) => {
          return (
            <i
              className={`fa ${cur.icon} icon ${cur.active && "icon-border"}`}
              key={cur.type}
            >
              <p>{cur.type}</p>
            </i>
          );
        })}
      </nav>
    </div>
  );
}

//---------------export--------------------------------------
export default NavBarItem;
