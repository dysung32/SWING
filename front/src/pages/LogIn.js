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

function LogIn() {
  const [accessToken, setAccessToken] = useState('');
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
