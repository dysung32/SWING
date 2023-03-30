import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  LogInWrapper,
  LogInContainer,
  ExpImg,
  LogoImg,
  LogInBtnContainer,
  LogInBtn,
  SocialLogoImg,
} from '../styles/LogInEmotion';
import { RoundLogo } from '../styles/CommonEmotion';
import { colors } from '../styles/ColorPalette';
import { H5 } from '../styles/Fonts';
import Google from '../assets/google_icon.png';
import Kakao from '../assets/kakaotalk_icon.png';
import { API_URL } from '../config';

function LogIn() {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate('/');
  };

  const kakaoLogin = (e) => {
    e.preventDefault();
    window.location.href = `${API_URL}/oauth2/authorization/kakao`;
  };

  const googleLogin = (e) => {
    e.preventDefault();
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  return (
    <>
      <LogInWrapper>
        <LogInContainer>
          <ExpImg />
          <LogoImg>
            <RoundLogo alt='logo' onClick={onClickLogo} size='70%' />
          </LogoImg>
          <LogInBtnContainer>
            <LogInBtn border={colors.gray400} onClick={googleLogin}>
              <SocialLogoImg src={Google} alt='google logo' />
              <H5 align='center'>구글로 시작하기</H5>
            </LogInBtn>
            <LogInBtn color='#F7E600' onClick={kakaoLogin}>
              <SocialLogoImg src={Kakao} alt='kakao logo' />
              <H5 align='center'>카카오로 시작하기</H5>
            </LogInBtn>
          </LogInBtnContainer>
        </LogInContainer>
      </LogInWrapper>
    </>
  );
}

export default LogIn;
