//----------------import---------------------
import styled from "styled-components";
import { useEffect, useState } from "react";
//-------------------create component RenderHotel-----------------
const Hotellist = styled.div`
  width: 1100px;
  display: flex;
  gap: 33px;
  line-height: 2;
  & a {
    font-weight: 700;
    transition: transform 0.3s ease-out;
    display: inline-block;
  }
  & a:hover {
    color: #049dfc;
    transform: translateX(10px);
  }

  & img {
    width: 95%;
    height: 250px;
  }

  & p {
    color: #626262;
    font-weight: 300;
  }
  & .price {
    font-weight: 500;
  }
  & .rate p {
    display: inline-block;
    font-weight: 400;
  }
  & .rate .score {
    color: #fff;
    margin-right: 10px;
    background-color: #2b26b0;
    padding: 0 5px;
  }
`;

//-------------------------
function RenderHotel(props) {
  return (
    <div>
      <h2 style={{ marginTop: "30px", marginBottom: "20px" }}>
        Homes guests love
      </h2>
      <Hotellist>
        {props.data.map((cur) => {
          return (
            <div key={cur.name}>
              <img alt={cur.name} src={cur.image} />
              <a href={`/detail/${cur.id}`}>{cur.name}</a>
              <p>{cur.city}</p>
              <p className="price">Starting from ${cur.price}</p>
              <div className="rate">
                <p className="score">{cur.rate.toFixed(1)}</p>
              </div>
            </div>
          );
        })}
      </Hotellist>
    </div>
  );
}

//---------------export--------------------------------------
export default RenderHotel;
