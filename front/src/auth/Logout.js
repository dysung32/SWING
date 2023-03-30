import React from 'react';
import axios from 'axios';
import { API_URL, getCookie, delCookie } from '.././config';
import { useNavigate } from 'react-router-dom';

const Logout = async () => {
  const navigate = useNavigate();
  try {
    const response = await axios.get(`${API_URL}/logout`, {
      headers: {
        'Access-Token': getCookie('accessToken'),
      },
    });
    if (response.status === 200) {
      delCookie('accessToken');
      delCookie('refreshToken');

      navigate('/');
    }
  } catch (e) {
    console.log(e);
  }
};

export default Logout;
