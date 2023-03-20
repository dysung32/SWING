import React, { useEffect } from 'react';
import GoogleLogin from '../auth/GoogleLogin';

function Home() {
  // useEffect(() => {
  //   if (window.location.href.includes('code')) {
  //     const code = new URL(window.location.href).searchParams.get('code');
  //     GoogleLogin(code);
  //   }
  // });
  return (
    <>
      <div>Home</div>
    </>
  );
}

export default Home;
