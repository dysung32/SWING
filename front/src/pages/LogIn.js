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
import { RoundLogo } from "../styles/CommonEmotion";
import Google from "../assets/google_icon.png";
import Kakao from "../assets/kakaotalk_icon.png";

function LogIn() {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };

  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/login",
    });
  };

  const getCookie = (name) => {
    let parts = document.cookie.split(name + "=");
    if (parts.length === 2) {
      return parts[1].split(";")[0];
    }
  };

  const displayToken = () => {
    let token = getCookie("authorize-access-token");

    if (token) {
      console.log(token);
      window.Kakao.Auth.setAccessToken(token);
      window.Kakao.Auth.getStatusInfo()
        .then(function (res) {
          if (res.status === "connected") {
            document.getElementById("token-result").innerText =
              "login success, token: " + window.Kakao.Auth.getAccessToken();
          }
        })
        .catch(function (err) {
          window.Kakao.Auth.setAccessToken(null);
        });
    }
  };
  displayToken();

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
            <LogInBtn color="#F7E600" image={Kakao} onClick={kakaoLogin}>
              카카오로 시작하기
            </LogInBtn>
          </LogInBtnContainer>
        </LogInContainer>
      </LogInWrapper>
    </>
  );
}

export default LogIn;
