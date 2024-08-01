//-----------------import------------------------
import SearchPopup from "./SearchComponent/SearchPopup/SearchPopup";
import SearchList from "./SearchComponent/SearchList/SearchList";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import SearchContext from "../../store/SearchContext";
//--import json file--
//----------------------create component Search-----------------
const SearchPage = styled.div`
  width: 1300px;
  margin: 20px auto;
  font-size: 16px;
  display: grid;
  grid-template-columns: 2.5fr 7fr;
  column-gap: 30px;
`;
const Search = () => {
  const [data, setData] = useState([]);
  const getData = (hotel) => {
    setData(hotel);
  };
  const dataContext = useContext(SearchContext);
  //--------------------
  useEffect(() => {
    fetch("http://localhost:5000/get-hotel-option", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataContext.data),
    })
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SearchPage>
      <SearchPopup getData={getData}></SearchPopup>
      <SearchList data={data}></SearchList>
    </SearchPage>
  );
};

export default Search;
