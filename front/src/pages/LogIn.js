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

  // const loginWithKakao = () => {
  //   console.log("함수 실행됨");
  //   window.Kakao.Auth.login({
  //     scope: "profile_nickname, profile_image",
  //     success: getProfile,
  //   });
  //   console.log("함수2");
  // };

  // const getProfile = () => {
  //   console.log("함수 실행됨2");
  //   window.Kakao.API.request({
  //     url: "http://localhost:3000/login",
  //     success: (res) => {
  //       console.log("성공");
  //       const kakao_account = res.kakao_account;
  //       let emails = kakao_account.email;
  //       if (emails == null) {
  //         if (this.$route.path !== "/") this.$router.push({ name: "home" });
  //       } else {
  //         const req_body = {
  //           userId: "kakao" + res.id,
  //           userName: kakao_account.profile.nickname,
  //           email: emails,
  //           type: "kakao",
  //         };
  //         this.socialLogin(req_body);
  //       }
  //     },
  //   });
  // };

  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/login",
    });
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
