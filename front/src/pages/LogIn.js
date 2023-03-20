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

function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
  const responsePayload = parseJwt(response.credential);
  console.log(responsePayload);
  console.log('ID: ' + responsePayload.sub);
  console.log('Full Name: ' + responsePayload.name);
  console.log('Given Name: ' + responsePayload.given_name);
  console.log('Family Name: ' + responsePayload.family_name);
  console.log('Image URL: ' + responsePayload.picture);
  console.log('Email: ' + responsePayload.email);
}

window.onload = () => {
  window.google.accounts.id.initialize({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
  });
  window.google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    text: 'signin_with',
    shape: 'rectangular',
    logo_alignment: 'left',
    width: 500,
    locale: 'ko_KR',
  });
};

function LogIn() {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate('/');
  };
  useEffect(() => window.onload, []);
  const scope = 'profile_nickname, profile_image, account_email';
  const getKakaoProfile = () => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (res) => {
        const { nickname, profile_image } = res.properties;
        const email = res.kakao_account.email;
        // if (emails == null) {
        //   if (this.$route.path != '/') this.$router.push({ name: 'home' });
        // } else {
        //   const req_body = {
        //     userId: 'kakao' + res.id,
        //     userName: kakao_account.profile.nickname,
        //     email: emails,
        //     type: 'kakao',
        //   };
        //   this.socialLogin(req_body);
        // }
      },
    });
  };
  const kakaoLogin = (e) => {
    e.preventDefault();
    window.Kakao.Auth.login({
      scope,
      success: function (response) {
        window.Kakao.Auth.setAccessToken(response.access_token);
        console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
        getKakaoProfile();
        // loginResult = true;
        // // 성공 사항에 따라 페이지를 수정하기 위한 setState
        // home.setState({ loginResult });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  const googleLogin = (e) => {
    e.preventDefault();
    window.location.href =
      'https://accounts.google.com/gsi/button?type=standard&theme=outline&size=large&text=signin_with&shape=rectangular&logo_alignment=left&width=100%25&client_id=12428147789-qgu2fc907vm0tu1otbd9v2a4m3g42sav.apps.googleusercontent.com&iframe_id=gsi_125285_234200&as=qXj4EK%2BCIsTD1l0BA6KTzQ&hl=ko_KR';
    // const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.REACT_APP_GOOGLE_SCOPE}`;
    // window.location.href = GOOGLE_LOGIN_URL;
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
            <div id='buttonDiv'></div>
            <LogInBtn border={colors.gray400} onClick={googleLogin}>
              <SocialLogoImg src={Google} alt='google logo' />
              <H5 align='center'>구글로 시작하기</H5>
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
