//----------------import---------------------
import "./Header.css";
import { DateRange } from "react-date-range";
import { useState, useRef } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../../../store/SearchContext";
//-------------------create component Header----------------
function Header() {
  //--------------------------------
  const [isvalid, setIsvalid] = useState(true);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const city = useRef();
  const time = useRef();
  const room = useRef();
  const dataContext = useContext(SearchContext);
  const navigate = useNavigate();
  //------------------------------------
  const ClickHandle = () => {
    setIsvalid((prev) => !prev);
  };
  const getday = (day) => {
    const digit = (number) => {
      return new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
      }).format(number);
    };
    const startMonth = digit(day.startDate.getMonth() + 1);
    const endMonth = digit(day.endDate.getMonth() + 1);
    const startDay = digit(day.startDate.getDate());
    const endDay = digit(day.endDate.getDate());
    //--------------------------------------------
    const startdate = `${day.startDate.getFullYear()}-${startMonth}-${startDay}`;
    const enddate = `${day.endDate.getFullYear()}-${endMonth}-${endDay}`;
    return startdate + " to " + enddate;
  };
  //---------------------------------------
  const searchHandle = () => {
    const in_out = time.current.value.split(" ");
    const infor = room.current.value.split("-");
    let data = {
      city: city.current.value,
      checkin: in_out[0],
      checkout: in_out[2],
      adult: Number(infor[0]),
      children: infor[1],
      room: Number(infor[2]),
    };
    dataContext.func(data);
    navigate("/search");
  };
  return (
    <div className="header">
      <div>
        <h1>A Lifetime of discounts? It's Genius.</h1>
        <p>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        <button>Sign in / Register</button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="&#xf236; Where are you going?"
          style={{
            fontFamily: "Arial, FontAwesome",
            fontSize: "16px",
          }}
          list="city"
          ref={city}
        ></input>
        <datalist id="city">
          <option value="Ha Noi" />
          <option value="Da Nang" />
          <option value="TP Ho Chi Minh" />
        </datalist>
        <input
          type="text"
          style={{
            fontFamily: "Arial, FontAwesome",
            fontSize: "16px",
          }}
          value={getday(state[0])}
          onClick={ClickHandle}
          ref={time}
        />
        <input
          type="text"
          placeholder="&#xf182; 1 adult- 0 children - 1 room (1-0-1) "
          style={{
            fontFamily: "Arial, FontAwesome",
            fontSize: "16px",
          }}
          ref={room}
        />
        <button className="btn" onClick={() => searchHandle()}>
          Search
        </button>
      </div>
      {!isvalid && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            setState([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={state}
          className="display"
        />
      )}
    </div>
  );
}

//---------------export--------------------------------------
export default Header;
