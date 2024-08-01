//-----------------import compenent----------------
import NavBarItem from "./HomePageComponents/NavBarItem/NavBarItem";
import Header from "./HomePageComponents/Header/Header";
import RenderCity from "./HomePageComponents/RenderList/RenderCity";
import RenderType from "./HomePageComponents/RenderList/RenderType";
import Form from "./HomePageComponents/Form/Form";
import RenderHotel from "./HomePageComponents/RenderList/RenderHotel";
import Footer from "./HomePageComponents/Footer/Footer";
//--import json file--
import dataNavbar from "./jsondata/navBar.json";
import datacity from "./jsondata/city.json";
import datatype from "./jsondata/type.json";
import datahotel from "./jsondata/hotel_list.json";
import datafooter from "./jsondata/footer.json";
//--import css file--
import "./Home.css";
//-----------------------------------------
import { useEffect, useState } from "react";
//------------------create component Home-------------------
const Home = (props) => {
  //--hook--
  const [data, setData] = useState({
    hotelByArea: [],
    hotelByType: [],
    topRating: [],
  });
  //---get hotel list--
  useEffect(() => {
    fetch("http://localhost:5000/quantity-hotel")
      .then((result) => result.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  //-----------
  return (
    <div className="home">
      <div className="nav">
        <NavBarItem data={dataNavbar}></NavBarItem>
        <Header></Header>
      </div>
      <RenderCity data={data.hotelByArea}></RenderCity>
      <RenderType data={data.hotelByType}></RenderType>
      <RenderHotel data={data.topRating}></RenderHotel>
      <Form></Form>
      <Footer data={datafooter}></Footer>
    </div>
  );
};

//---------------------export component------------------
export default Home;
