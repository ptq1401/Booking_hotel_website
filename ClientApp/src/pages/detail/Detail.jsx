//-------------------import----------------------
import NavHotel from "./DetailComponent/NavHotel";
import ImageHotel from "./DetailComponent/ImageHotel";
import Description from "./DetailComponent/Description";
import SignIn from "./DetailComponent/booking/SignIn";
import SearchContext from "../../store/SearchContext";
import Booking from "./DetailComponent/booking/Booking";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
//------------------create component Detail---------------
const DetailHotel = styled.div`
  width: 1100px;
  margin: 10px auto;
`;
const Detail = () => {
  //---------------------------------------------
  const dataContext = useContext(SearchContext);
  const [data, setData] = useState({ photos: [], rooms: [{ price: 0 }] });
  const { hotel } = useParams();
  useEffect(() => {
    fetch("http://localhost:5000/get-detail-hotel", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ hotel_id: hotel }),
    })
      .then((result) => result.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //---------------------------------------------
  return (
    <DetailHotel>
      <NavHotel data={data}></NavHotel>
      <ImageHotel data={data.photos}></ImageHotel>
      <Description data={data}></Description>
      {dataContext.display && <SignIn></SignIn>}
      {dataContext.booking && <Booking hotelId={hotel}></Booking>}
    </DetailHotel>
  );
};

export default Detail;
