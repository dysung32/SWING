import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LogInWrapper,
  LogInContainer,
  ExpImg,
  LogoImg,
  LogInBtnContainer,
  LogInBtn,
} from "../styles/LogInEmotion";
import RoundLogo from "../styles/CommonEmotion";
import Google from "../assets/google_icon.png";
import Kakao from "../assets/kakaotalk_icon.png";

function LogIn() {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };

  return (
    <>
      <LogInWrapper>
        <LogInContainer>
          <ExpImg />
          <LogoImg>
            <RoundLogo alt="logo" onClick={onClickLogo} size="70%" />
          </LogoImg>
          <LogInBtnContainer>
            <LogInBtn border="#B4B4B4" image={Google}>
              Google로 시작하기
            </LogInBtn>
            <LogInBtn color="#F7E600" image={Kakao}>
              카카오로 시작하기
            </LogInBtn>
          </LogInBtnContainer>
        </LogInContainer>
      </LogInWrapper>
    </>
  );
}

export default LogIn;
