import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie } from ".././config";
import GoogleLogin from "../auth/GoogleLogin";
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
} from "../styles/HomeEmotion";
import { H4, H5 } from "../styles/Fonts";
import { Mouse, ChevronDoubleDown } from "react-bootstrap-icons";
import { CommonBtn, PlayerProfile } from "../styles/CommonEmotion";
import { colors } from "../styles/ColorPalette";
import { CouponImg } from "../styles/MyPageEmotion";

import Coupon from "../assets/main_coupon.svg";
import { BasicProfile } from "../config";

function Home() {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(1);
  const DIVIDER_HEIGHT = 5;
  const scrollRef = useRef();

  useEffect(() => {
    const reg = /[()]/gi;
    if (window.location.href.includes("kakao")) {
      const accessToken = new URL(window.location.href).searchParams.get(
        "access-token"
      );
      const refreshToken = new URL(window.location.href).searchParams.get(
        "refresh-token"
      );
      let user = new URL(window.location.href).searchParams.get("user");
      user = user.replace("UserDto", "");
      user = user.replace(reg, "");
      user = user.split(", ");
      const saveUser = {};
      user.forEach((str) => {
        const tmpArr = str.split("=");
        if (tmpArr[0] !== "coupon" && tmpArr[0] !== "first") {
          saveUser[tmpArr[0]] = tmpArr[1];
        }
      });
      setCookie("accessToken", accessToken, 1);
      setCookie("refreshToken", refreshToken, 1);
      navigate("/");
    }
  });

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
            behavior: "smooth",
          });
          setScrollIndex(() => 2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 sentency -> hi-five
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(() => 3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 hi-five -> speedoodle
          window.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(() => 4);
        } else if (scrollTop >= pageHeight * 3) {
          // 현재 speedoodle -> hero
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
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
            behavior: "smooth",
          });
          setScrollIndex(() => 1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 sentency -> hero
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(() => 1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 hi-five -> sentency
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(() => 2);
        } else if (scrollTop >= pageHeight * 3) {
          // 현재 speedoodle -> hi-five
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(() => 3);
        }
      }
    };
    const scrollRefCurrent = scrollRef.current;
    scrollRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      scrollRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <>
      <HomeWrapper ref={scrollRef}>
        <UserInfoBox>
          <div className="flex userInfo">
            <PlayerProfile width={5} height={5} src={BasicProfile} />
            <H5 padding="0 0 0 1rem" color={colors.white}>
              Player1
            </H5>
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
              font={1}
              padding="0.5rem 1rem"
              onClick={() => navigate("/review-note")}>
              오답노트
            </CommonBtn>
            <CommonBtn
              color={colors.studyBlue100}
              font={1}
              padding="0.5rem 1rem"
              onClick={() => navigate("/history")}>
              히스토리
            </CommonBtn>
          </UserBtnBox>
        </UserInfoBox>
        <HomeHeroContainer>
          <HeroScrollMsg>
            <H4>Scroll Down for Games</H4>
            <HeroScrollIconContainer>
              <HeroScrollIconAni>
                <ChevronDoubleDown style={{ fontSize: "36px" }} />
              </HeroScrollIconAni>
              <Mouse
                style={{
                  fontSize: "48px",
                  padding: "0.5rem",
                }}
              />
              <HeroScrollIconAni>
                <ChevronDoubleDown style={{ fontSize: "36px" }} />
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
