import React from 'react';
import { useNavigate } from 'react-router-dom';
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

function LogIn() {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate('/');
  };

  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/login',
    });
  };

  const getCookie = (name) => {
    let parts = document.cookie.split(name + '=');
    if (parts.length === 2) {
      return parts[1].split(';')[0];
    }
  };

  const displayToken = () => {
    let token = getCookie('authorize-access-token');

    if (token) {
      console.log(token);
      window.Kakao.Auth.setAccessToken(token);
      window.Kakao.Auth.getStatusInfo()
        .then(function (res) {
          if (res.status === 'connected') {
            document.getElementById('token-result').innerText =
              'login success, token: ' + window.Kakao.Auth.getAccessToken();
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
            <RoundLogo alt='logo' onClick={onClickLogo} size='70%' />
          </LogoImg>
          <LogInBtnContainer>
            <LogInBtn border={colors.gray400}>
              <SocialLogoImg src={Google} alt='google logo' />
              <H5 align='center'>Google로 시작하기</H5>
            </LogInBtn>
            <LogInBtn color='F7E600' onClick={kakaoLogin}>
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
