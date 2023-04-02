import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { userState } from '../recoil';
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
  UserInfoBox,
  UserCouponBox,
  UserBtnBox,
} from '../styles/HomeEmotion';
import { H4, H5 } from '../styles/Fonts';
import { Mouse, ChevronDoubleDown } from 'react-bootstrap-icons';
import { CommonBtn, PlayerProfile } from '../styles/CommonEmotion';
import { colors } from '../styles/ColorPalette';
import { CouponImg } from '../styles/MyPageEmotion';

import Coupon from "../assets/main_coupon.svg";
import { BasicProfile } from "../config";
import IsLogin from "../auth/IsLogin";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const [coupon, setCoupon] = useState(0);
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

  console.log(user);

  return (
    <>
      <HomeWrapper ref={scrollRef}>
        {IsLogin() ? (
          <UserInfoBox>
            <div className="flex userInfo">
              <PlayerProfile width={5} height={5} src={BasicProfile} />
              <div className="nickname">{user.nickname}</div>
            </div>
            <UserCouponBox>
              <CouponImg src={Coupon} alt="coupon" width={3.5} />
              <div className="couponInfo">
                쿠폰 <span className="couponCnt">{coupon}</span>
              </div>
            </UserCouponBox>
            <UserBtnBox>
              <CommonBtn
                color={colors.studyPink200}
                hoverColor={colors.studyPink300}
                font={1}
                padding="0.5rem 1rem"
                onClick={() => navigate("/review-note")}>
                오답노트
              </CommonBtn>
              <CommonBtn
                color={colors.studyBlue100}
                hoverColor={colors.studyBlue200}
                font={1}
                padding="0.5rem 1rem"
                onClick={() => navigate("/history")}>
                히스토리
              </CommonBtn>
            </UserBtnBox>
          </UserInfoBox>
        ) : null}

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
        <Divider style={{ backgroundColor: `${colors.gameBlue100}` }}></Divider>
        <HomeSentencyContainer></HomeSentencyContainer>
        <Divider style={{ backgroundColor: `${colors.gameBlue200}` }}></Divider>
        <HomeHiFiveContainer></HomeHiFiveContainer>
        <Divider style={{ backgroundColor: `${colors.gameBlue200}` }}></Divider>
        <HomeSpeedoodleContainer></HomeSpeedoodleContainer>
      </HomeWrapper>
    </>
  );
}

export default Home;
