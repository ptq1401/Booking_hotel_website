//----------------import---------------------
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
//-------------------create component SearchList-----------------
const SearchItem = styled.div`
  display: grid;
  grid-template-columns: 1.9fr 3fr 1.5fr;
  column-gap: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1.5px solid #868e96;
  border-radius: 5px;
  font-size: 15px;

  & img {
    width: 100%;
    height: 240px;
  }
  & .none {
    display: none;
  }
  ul {
    list-style-type: none;
    line-height: 2.1;
    padding: 0;
  }
  li:nth-child(1) {
    color: #049dfc;
    font-weight: 700;
    font-size: 22px;
  }
  li:nth-child(3) {
    display: inline;
    background-color: #1cb50c;
    padding: 5px;
    color: #fff;
    border-radius: 5px;
  }
  li:nth-child(4) {
    font-weight: 700;
  }
  li:nth-child(6) {
    color: #1cb50c;
  }
  li:nth-child(6) p:nth-child(1) {
    font-weight: 700;
  }
  & > div {
    padding: 10px 0;
    display: grid;
    align-content: start;
    grid-template-rows: 1fr auto auto auto;
    row-gap: 10px;
  }
  & div div {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 500;
  }
  & .rate {
    color: #fff;
    background-color: #2b26b0;
    padding: 5px;
    height: 25px;
  }
  & .price {
    font-size: 24px;
    justify-self: end;
  }
  & div p:nth-child(3) {
    color: #868e96;
    justify-self: end;
  }
  & button {
    width: 100%;
    height: 40px;
    color: #fff;
    font-size: 16px;
    background-color: #049dfc;
    border: none;
    border-radius: 10px;
  }
  & button:hover {
    background-color: #1c93dd;
  }
`;
function SearchListItem(props) {
  const navigate = useNavigate();
  return (
    <SearchItem>
      <img alt={props.info.name} src={props.info.photos[0]}></img>
      <ul>
        <li>{props.info.name}</li>
        <li>
          <i class="fa fa-map-marker" aria-hidden="true">
            &nbsp; {props.info.address}
          </i>
        </li>
        <li>{props.info.distance}km from center</li>
        <li>{props.info.type.toUpperCase()}</li>
        <li>{props.info.desc.slice(0, 45)}...</li>
        <li className={!props.info.featured ? "none" : ""}>
          <p>Free support services are available</p>
        </li>
      </ul>
      <div>
        <div>
          <p>{props.info.rating > 4.5 ? "Exceptional" : "Excellent"}</p>
          <p className="rate">{props.info.rating.toFixed(1)}</p>
        </div>
        <button
          onClick={() => {
            navigate(`/detail/${props.info._id}`);
          }}
        >
          See availability
        </button>
      </div>
    </SearchItem>
  );
}

//---------------export--------------------------------------
export default SearchListItem;
