import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LogInWrapper,
  LogInContainer,
  ExpImg,
  LogoImg,
  LogInBtnContainer,
  LogInBtn,
  SocialLogoImg,
} from "../styles/LogInEmotion";
import { RoundLogo } from "../styles/CommonEmotion";
import { colors } from "../styles/ColorPalette";
import { H5 } from "../styles/Fonts";
import Google from "../assets/google_icon.png";
import Kakao from "../assets/kakaotalk_icon.png";
import { API_URL } from "../config";

function LogIn() {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };

  const kakaoLogin = async (e) => {
    // 프론트에서 카카오 로그인 처리하고 백으로 POST /user/socialLogin url로
    // userDto{ userId, nickname }만 넘겨주기
    //
    // axios
    //   .post(`${API_URL}/user/socialLogin/${userId}/${nickname}`, null, {
    //     headers: {
    //       "Access-Token":
    //         "Ry7rohoVUjw3GA5W1GC3DaJ5Rzfec8-S2SHOE8xcnlh-VbeDGJr-Hu4t2mN2LuE-3nzucAo9cuoAAAGHLCzlKw&state=8_bprj_QaKc6mIzvlC972kiYByGkGAQT8ym9hvYNl9A%3D",
    //     },
    //   })
    //   .then((resp) => {
    //     console.log(resp);
    //   })
    //   .catch((err) => {
    //     console.log("오답 저장 중 오류 발생!");
    //   });
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
            <LogInBtn color="#F7E600" onClick={kakaoLogin}>
              <SocialLogoImg src={Kakao} alt="kakao" />
              <H5 align="center">카카오로 시작하기</H5>
            </LogInBtn>
          </LogInBtnContainer>
        </LogInContainer>
      </LogInWrapper>
    </>
  );
}

export default LogIn;
