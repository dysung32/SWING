import React, { useEffect } from 'react';
import GoogleLogin from '../auth/GoogleLogin';
import { HomeWrapper } from '../styles/HomeEmotion';

function Home() {
  // useEffect(() => {
  //   if (window.location.href.includes('code')) {
  //     const code = new URL(window.location.href).searchParams.get('code');
  //     GoogleLogin(code);
  //   }
  // });
  return (
    <>
      <HomeWrapper></HomeWrapper>
    </>
  );
}

export default Home;
