//----------------import---------------------
import styled from "styled-components";

//-------------------create component Form-----------------
const FormComponent = styled.div`
  background-color: #2b26b0;
  width: 90vw;
  padding: 50px 30px;
  margin-top: 40px;
  text-align: center;
  color: #fff;
  & h1,
  & p {
    margin-bottom: 15px;
  }
  & input {
    height: 45px;
    width: 320px;
    font-size: 16px;
    margin-right: 20px;
    border-radius: 5px;
    border: none;
  }
  & input:focus {
    outline: 3px solid #fcc100;
  }
  & button {
    height: 45px;
    background-color: #049dfc;
    border-radius: 5px;
    border: none;
    color: #fff;
    padding: 0 10px;
  }
  & button:hover {
    border: 3px solid #fcc100;
  }
`;
function Form() {
  return (
    <FormComponent>
      <h1>Save time, Save money!</h1>
      <p>Sign up and we'll send best deals to you</p>
      <div>
        <input type="text" placeholder="  Your Email"></input>
        <button>Subscribe</button>
      </div>
    </FormComponent>
  );
}

//---------------export--------------------------------------
export default Form;
