//----------------import---------------------
import styled from "styled-components";

//-------------------create component NavHotel-----------------
const Image = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 10px;
  & img {
    width: 100%;
    height: auto;
  }
`;

function ImageHotel(props) {
  return (
    <Image>
      {props.data.map((cur, i) => {
        return <img key={i} src={cur} alt="room in hotel" />;
      })}
    </Image>
  );
}

//---------------export--------------------------------------
export default ImageHotel;
