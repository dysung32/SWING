import styled from "@emotion/styled";
import logInExpImg from "../assets/login_expImg.png";

const LogInWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0 10%;
  box-sizing: border-box;
  background-color: #1656e9;
`;

const LogInContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(12, 1fr);
  column-gap: 2rem;
  grid-template-areas:
    ". . . . . . . . . . . ."
    ". expImg expImg expImg expImg . logoImg logoImg logoImg logoImg logoImg ."
    ". expImg expImg expImg expImg . logoImg logoImg logoImg logoImg logoImg ."
    ". expImg expImg expImg expImg . logoImg logoImg logoImg logoImg logoImg ."
    ". expImg expImg expImg expImg . logInBtnCon logInBtnCon logInBtnCon logInBtnCon logInBtnCon ."
    ". expImg expImg expImg expImg . logInBtnCon logInBtnCon logInBtnCon logInBtnCon logInBtnCon ."
    ". . . . . . . . . . . .";
  width: 100%;
  height: 68vh;
  box-sizing: border-box;
  border-radius: 0.75rem;
  background-color: #ffffff;
`;

const ExpImg = styled.div`
  grid-area: expImg;
  background: center / contain no-repeat url(${logInExpImg});
`;
const LogoImg = styled.div`
  display: flex;
  justify-content: center;
  grid-area: logoImg;
  box-sizing: border-box;
`;

const LogInBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: logInBtnCon;
`;

const LogInBtn = styled.div`
  width: 100%;
  padding: 1.3rem 0;
  border: ${(props) => (props.border ? `1px solid ${props.border}` : "none")};
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: ${(props) => (props.color ? props.color : "#ffffff")};
  background-image: url(${(props) => (props.image ? props.image : "")});
  background-size: 3rem;
  background-repeat: no-repeat;
  background-position-x: 1rem;
  background-position-y: center;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
`;
export {
  LogInWrapper,
  LogInContainer,
  ExpImg,
  LogoImg,
  LogInBtnContainer,
  LogInBtn,
};
