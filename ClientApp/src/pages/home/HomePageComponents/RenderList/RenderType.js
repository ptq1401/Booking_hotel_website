//----------------import---------------------
import styled from "styled-components";

//-------------------create component RenderType-----------------
const Typelist = styled.div`
  width: 1100px;
  display: flex;
  gap: 25px;
  & img {
    width: 200px;
    height: 75%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  & h3 {
    color: #626262;
    font-weight: 700;
  }
  & p {
    color: #626262;
    font-weight: 300;
  }
`;

function RenderType(props) {
  return (
    <div>
      <h2 style={{ marginTop: "-50px", marginBottom: "20px" }}>
        Browse by property type
      </h2>
      <Typelist>
        {props.data.map((cur) => {
          return (
            <div key={cur.name}>
              <img alt={cur.name} src={cur.image} />
              <h3>{cur.name}</h3>
              <p>{cur.quantity} hotels</p>
            </div>
          );
        })}
      </Typelist>
    </div>
  );
}

//---------------export--------------------------------------
export default RenderType;
