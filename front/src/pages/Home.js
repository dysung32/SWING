import React, { useEffect, useRef, useMemo, useState } from 'react';
import GoogleLogin from '../auth/GoogleLogin';
import {
  HomeWrapper,
  HomeHeroContainer,
  HomeSentencyContainer,
  HomeHiFiveContainer,
  HomeSpeedoodleContainer,
  Divider,
  HeroScrollMsg,
  HeroScrollIconContainer,
  HeroScrollIconAni,
} from '../styles/HomeEmotion';
import { H4, P1 } from '../styles/Fonts';
import { Mouse, ChevronDoubleDown } from 'react-bootstrap-icons';

function Home() {
  // useEffect(() => {
  //   if (window.location.href.includes('code')) {
  //     const code = new URL(window.location.href).searchParams.get('code');
  //     GoogleLogin(code);
  //   }
  // });
  const [scrollIndex, setScrollIndex] = useState(1);
  const DIVIDER_HEIGHT = 5;
  const scrollRef = useRef();

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const scrollTop = window.scrollY;
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh.
      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 hero -> sentency
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 sentency -> hi-five
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 hi-five -> speedoodle
          window.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 4);
        } else if (scrollTop >= pageHeight * 3) {
          // 현재 speedoodle -> hero
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 1);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 hero-> hero
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 sentency -> hero
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 hi-five -> sentency
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 2);
        } else if (scrollTop >= pageHeight * 3) {
          // 현재 speedoodle -> hi-five
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(() => 3);
        }
      }
    };
    const scrollRefCurrent = scrollRef.current;
    scrollRefCurrent.addEventListener('wheel', wheelHandler);
    return () => {
      scrollRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <>
      <HomeWrapper ref={scrollRef}>
        <HomeHeroContainer>
          <HeroScrollMsg>
            <H4>Scroll Down for Games</H4>
            <HeroScrollIconContainer>
              <HeroScrollIconAni>
                <ChevronDoubleDown style={{ fontSize: '36px' }} />
              </HeroScrollIconAni>
              <Mouse
                style={{
                  fontSize: '48px',
                  padding: '0.5rem',
                }}
              />
              <HeroScrollIconAni>
                <ChevronDoubleDown style={{ fontSize: '36px' }} />
              </HeroScrollIconAni>
            </HeroScrollIconContainer>
          </HeroScrollMsg>
        </HomeHeroContainer>
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
