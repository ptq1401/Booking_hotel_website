//----------------import---------------------
import styled from "styled-components";

//-------------------create component RenderCity-----------------
const Citylist = styled.div`
  margin-top: 70px;
  margin-bottom: 20px;
  width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2%;
`;

const Image = styled.div`
  position: relative;
  & img {
    width: 100%;
    height: 80%;
    border-radius: 10px;
    margin-bottom: 30px;
    z-index: 0;
  }
  & div {
    position: absolute;
    left: 5%;
    top: 45%;
    color: #fff;
    font-size: 26px;
  }
`;
function RenderCity(props) {
  return (
    <Citylist>
      {props.data.map((cur) => {
        return (
          <Image key={cur.name}>
            <img alt={cur.name} src={cur.image} />
            <div>
              <h3>{cur.name}</h3>
              <p>{cur.properties} properties</p>
            </div>
          </Image>
        );
      })}
    </Citylist>
  );
}

//---------------export--------------------------------------
export default RenderCity;
