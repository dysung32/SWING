import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: 'http://localhost:3000',
  };

  const app = initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate('/');
  };
  const scope = 'profile_nickname, profile_image, account_email';
  const getKakaoProfile = () => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (res) => {
        const { nickname, profile_image } = res.properties;
        const email = res.kakao_account.email;
        console.log(nickname, profile_image, email);
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
  const kakaoLogin = () => {
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

  // const parseJwt = (token) => {
  //   let base64Url = token.split('.')[1];
  //   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   let jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join('')
  //   );

  //   return JSON.parse(jsonPayload);
  // };

  // const handleCredentialResponse = (response) => {
  //   const responsePayload = parseJwt(response.credential);
  //   console.log('ID: ' + responsePayload.sub);
  //   console.log('Full Name: ' + responsePayload.name);
  //   console.log('Given Name: ' + responsePayload.given_name);
  //   console.log('Family Name: ' + responsePayload.family_name);
  //   console.log('Image URL: ' + responsePayload.picture);
  //   console.log('Email: ' + responsePayload.email);
  // };

  // const googleLogin = () => {
  //   window.google.accounts.id.initialize({
  //     client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //     callback: handleCredentialResponse,
  //   });
  // };

  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });

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
