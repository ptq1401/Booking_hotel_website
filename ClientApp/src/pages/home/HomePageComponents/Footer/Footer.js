//----------------import---------------------
import styled from "styled-components";

//-------------------create component Form-----------------
const Footercomponent = styled.div`
  width: 1100px;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  line-height: 2;
  color: #2b26b0;
`;
function Footer(props) {
  return (
    <Footercomponent>
      {props.data.map((cur) => {
        return (
          <div key={cur.col_number}>
            {cur.col_values.map((item, i) => {
              return <p key={i}>{item}</p>;
            })}
          </div>
        );
      })}
    </Footercomponent>
  );
}

//---------------export--------------------------------------
export default Footer;
