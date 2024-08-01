import SearchContext from "./SearchContext";
import { useState } from "react";
//--------------------------
const SearchProvider = (props) => {
  //----------------------------------
  const [data, setData] = useState({
    city: "",
    checkin: "",
    checkout: "",
    adult: 0,
    children: "",
    room: 0,
  });
  const [display, setDisplay] = useState(false);
  const [book, setBook] = useState(false);
  //-------------------------------------
  const setLogin = () => {
    setDisplay((prev) => !prev);
  };
  const getData = (searchData) => {
    setData(searchData);
  };
  const setBooking = () => {
    setBook((prev) => {
      if (!prev)
        setTimeout(
          () =>
            window.scrollTo({
              top: 1000,
              left: 0,
              behavior: "smooth",
            }),
          200
        );
      return !prev;
    });
  };
  const value = {
    data: data,
    func: getData,
    display: display,
    login: setLogin,
    booking: book,
    setBooking: setBooking,
  };

  //---------------------------------------
  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};
//------------------------------
export default SearchProvider;
