import React from 'react';
import { API_URL } from '../config';
import axios from 'axios';

const GoogleLogin = async (code) => {
  await axios.post(
    `${API_URL}/user/login`, // 구글 소셜 로그인 엔드포인트
    {
      authorizationCode: code,
    },
    {
      headers: { accept: `application/json` },
    }
  );
};

export default GoogleLogin;
