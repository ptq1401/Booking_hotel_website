//----------------import---------------------
import styled from "styled-components";

//-------------------create component NavHotel-----------------
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
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
  & div {
    line-height: 2;
    font-size: 18px;
  }
  & div p:nth-child(1) {
    font-size: 22px;
    font-weight: 700;
  }
  & div p:nth-child(2) span {
    font-size: 14px;
    margin-left: 5px;
  }
  & div p:nth-child(3) {
    color: #4263eb;
  }
  & div p:nth-child(4) {
    color: #0ca678;
  }
`;
function NavHotel(props) {
  return (
    <Nav>
      <div>
        <p>{props.data.name}</p>
        <p>
          <i className="fa fa-map-marker">
            <span>{props.data.address}</span>
          </i>
        </p>
        <p>{props.data.distance}km from center</p>
        <p>
          {props.data.featured
            ? "Free wifi, parking, taxi airport and breakfast"
            : ""}
        </p>
      </div>
    </Nav>
  );
}

//---------------export--------------------------------------
export default NavHotel;
