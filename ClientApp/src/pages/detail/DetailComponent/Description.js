//----------------import---------------------
import styled from "styled-components";
import { useContext } from "react";
import SearchContext from "../../../store/SearchContext";
//-------------------create component NavHotel-----------------
const Descript = styled.div`
  margin-top: 40px;
  margin-bottom: 100px;
  display: grid;
  grid-template-columns: 2.6fr 1fr;
  column-gap: 30px;
  font-size: 15px;
  & button {
    width: 250px;
    height: 50px;
    border-radius: 10px;
    color: #fff;
    font-size: 18px;
    background-color: #049dfc;
    border: none;
    margin-top: 20px;
  }
  & button:hover {
    background-color: #1c93dd;
  }
  & h2 {
    margin-bottom: 10px;
  }
  & div:nth-child(1) p {
    line-height: 1.5;
  }
  & div:nth-child(2) {
    background-color: #e3fafc;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & .price {
    font-size: 20px;
  }
  & .price span {
    font-weight: 700;
  }
  & h3 {
    color: #868e96;
  }
`;

function Description(props) {
  const dataContext = useContext(SearchContext);
  const clickHandle = () => {
    if (!localStorage.getItem("login")) {
      dataContext.login();
    } else dataContext.setBooking();
  };
  return (
    <Descript>
      <div>
        <h2>{props.data.name}</h2>
        <p>{props.data.desc}</p>
      </div>
      <div>
        <p className="price">
          <span>${props.data.rooms[0].price}</span> (1 nights)
        </p>
        <button onClick={clickHandle}>Reserve or Book Now!</button>
      </div>
    </Descript>
  );
}

//---------------export--------------------------------------
export default Description;
