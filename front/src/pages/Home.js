import React, { useEffect, useRef, useMemo, useState } from 'react';
import GoogleLogin from '../auth/GoogleLogin';
import {
  HomeWrapper,
  HomeHeroContainer,
  HomeSentencyContainer,
  HomeHiFiveContainer,
  HomeSpeedoodleContainer,
  Divider,
} from '../styles/HomeEmotion';

function Home() {
  // useEffect(() => {
  //   if (window.location.href.includes('code')) {
  //     const code = new URL(window.location.href).searchParams.get('code');
  //     GoogleLogin(code);
  //   }
  // });
  const [scrollIndex, setScrollIndex] = useState(1);
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const scrollHeroRef = useRef(null);
  const scrolSentencylRef = useRef(null);
  const scrollHifiveRef = useRef(null);
  const scrollSpeedoodleRef = useRef(null);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log('현재 1페이지, down');
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log('현재 2페이지, down');
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 3);
        } else {
          // 현재 3페이지
          console.log('현재 3페이지, down');
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 3);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log('현재 1페이지, up');
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log('현재 2페이지, up');
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 1);
        } else {
          // 현재 3페이지
          console.log('현재 3페이지, up');
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener('wheel', wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <>
      <HomeWrapper ref={outerDivRef}>
        <HomeHeroContainer></HomeHeroContainer>
        <Divider></Divider>
        <HomeSentencyContainer></HomeSentencyContainer>
        <Divider></Divider>
        <HomeHiFiveContainer></HomeHiFiveContainer>
        <Divider></Divider>
        <HomeSpeedoodleContainer></HomeSpeedoodleContainer>
      </HomeWrapper>
    </>
  );
}

export default Home;
