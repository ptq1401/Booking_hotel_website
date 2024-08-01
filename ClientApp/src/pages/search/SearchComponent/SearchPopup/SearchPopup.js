//----------------import---------------------
import styled from "styled-components";
import { useContext, useRef, useEffect } from "react";
import SearchContext from "../../../../store/SearchContext";
//-------------------create component SearhPopup-----------------
const SearchForm = styled.div`
  background-color: #fcc100;
  padding: 15px;
  border-radius: 10px;
  & form {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  & form > input {
    margin-top: 10px;
    width: 98%;
    height: 35px;
  }
  & form div > input {
    width: 18%;
    height: 25px;
  }

  & form div > label,
  h2 {
    color: #454f5a;
    margin-bottom: 10px;
  }

  & form div {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  & button {
    width: 100%;
    height: 40px;
    color: #fff;
    font-size: 16px;
    background-color: #049dfc;
    border: none;
    margin-top: 30px;
  }
  & button:hover {
    background-color: #1c93dd;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 16px;
  background-color: #fcc100;
  border: none;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 400;
  &:hover {
    background-color: #049dfc;
    color: #fff;
  }
`;

function SearchPopup(props) {
  const dataContext = useContext(SearchContext);
  //------useRef-----
  const city = useRef();
  const date = useRef();
  const options = useRef();
  //-----------------------
  const searchHandle = () => {
    const formCity = new FormData(city.current);
    const formDate = new FormData(date.current);
    const formOptions = new FormData(options.current);
    const data = {
      city: formCity.get("city"),
      checkin: formDate.get("checkin"),
      checkout: formDate.get("checkout"),
      minPrice: Number(formOptions.get("minPrice")),
      maxPrice: Number(formOptions.get("maxPrice")),
      adult: Number(formOptions.get("adult")),
      room: Number(formOptions.get("room")),
    };

    fetch("http://localhost:5000/get-hotel-option", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((data) => props.getData(data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <SearchForm>
        <h2> Search</h2>
        <form ref={city}>
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            defaultValue={dataContext.data.city}
            name="city"
            list="city"
          ></input>
          <datalist id="city">
            <option value="Ha Noi" />
            <option value="Da Nang" />
            <option value="TP Ho Chi Minh" />
          </datalist>
        </form>
        <form ref={date}>
          <label htmlFor="date">Check-in Date</label>
          <input
            type="date"
            id="date"
            defaultValue={dataContext.data.checkin}
            name="checkin"
          ></input>
          <label htmlFor="date">Check-out Date</label>
          <input
            type="date"
            id="date"
            name="checkout"
            defaultValue={dataContext.data.checkout}
          ></input>
        </form>
        <form className="options" ref={options}>
          <label>Options</label>
          <div>
            <label htmlFor="minprice">Min price per night</label>
            <input type="number" id="minprice" name="minPrice"></input>
          </div>
          <div>
            <label htmlFor="maxprice">Max price per night</label>
            <input type="number" id="maxprice" name="maxPrice"></input>
          </div>
          <div>
            <label htmlFor="adult">Adult</label>
            <input
              type="number"
              id="aldult"
              name="adult"
              defaultValue={dataContext.data.adult}
            ></input>
          </div>
          <div>
            <label htmlFor="children">Children</label>
            <input
              type="number"
              id="children"
              name="children"
              defaultValue={dataContext.data.children}
            ></input>
          </div>
          <div>
            <label htmlFor="room">Room</label>
            <input
              type="number"
              id="room"
              name="room"
              defaultValue={dataContext.data.room}
            ></input>
          </div>
        </form>
        <button onClick={() => searchHandle()}>Search</button>
      </SearchForm>
      <Button onClick={() => window.location.replace("/")}>
        Home <i class="fa fa-home"></i>
      </Button>
    </div>
  );
}

//---------------export--------------------------------------
export default SearchPopup;
