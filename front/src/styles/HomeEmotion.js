// import styled from '@emotion/styled/macro';
import styled, { keyframes } from 'styled-components';
import { colors } from '../styles/ColorPalette';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400vh;
  background-color: ${colors.white};
  box-sizing: border-box;
  overflow-y: auto;
`;

export const HomeHeroContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  background-color: ${colors.gameBlue100};
  box-sizing: border-box;
`;

export const HomeSentencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  padding-top: 13rem;
  background: linear-gradient(to top right, rgba(236, 61, 89, 0.5), rgba(22, 86, 233, 0.5));
  box-sizing: border-box;

  .howtoTitle {
    width: 50%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.white};
    z-index: 999;
  }

  .slideContainer {
    margin-left: 0;
    margin-bottom: 2rem;
    width: 50%;
    height: 50vh;
    background-color: ${colors.gray100};
  }

  .slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: ${colors.black};
  }

  .swiper-pagination-bullet {
    width: 0.7rem;
    height: 0.7rem;
    background-color: ${colors.gamePink400};
  }
`;

export const HomeHiFiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  padding-top: 13rem;
  background-color: ${colors.gameBlue200};
  box-sizing: border-box;

  .howtoTitle {
    width: 50%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.white};
    z-index: 999;
  }

  .slideContainer {
    margin-left: 0;
    margin-bottom: 2rem;
    width: 50%;
    height: 50vh;
    background-color: ${colors.gray100};
  }

  .slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: ${colors.black};
  }

  .swiper-pagination-bullet {
    width: 0.7rem;
    height: 0.7rem;
    background-color: ${colors.gamePink400};
  }
`;

export const HomeSpeedoodleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  background-color: ${colors.gameBlue300};
  box-sizing: border-box;
`;

export const Divider = styled.div`
  width: 100%;
  height: 5px;
`;

export const HeroScrollMsg = styled.div`
  margin: 80vh auto 0;
`;

export const HeroScrollIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  box-sizing: border-box;
`;
export const upDown = keyframes`
0% {
  margin-top: 0rem;
100% {
  margin-top: 1rem;
}`;

export const HeroScrollIconAni = styled.div`
  margin-top: 1rem;
  animation: ${upDown} 0.5s linear infinite alternate;
`;

export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10rem;
  right: 3%;
  width: 16rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${colors.studyBlue500};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

  .userInfo {
    align-items: center;
  }

  .nickname {
    color: ${colors.white};
    font-weight: 700;
    font-size: 1.2rem;
    padding: 0 0 0 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const UserCouponBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;

  .couponInfo {
    font-size: 1.1rem;
    color: ${colors.white};
  }

  .couponCnt {
    font-weight: 700;
    padding-left: 0.5rem;
    color: ${colors.studyPink200};
  }
`;

export const UserBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HomeRankBtn = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  background-color: ${colors.black};
  font-size: 2.5rem;
  color: ${colors.gameYellow200};
  cursor: pointer;

  position: absolute;
  left: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: bounce 1s infinite;

  .text {
    position: absolute;
    top: -2rem;
    font-size: 1.5rem;
    color: ${colors.white};
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      -webkit-transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-0.5rem);
    }
    60% {
      -webkit-transform: translateY(-0.25rem);
    }
  }

  &:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const GlowingBtn = styled.button`
  width: 12rem;
  height: 3.5rem;
  border: none;
  outline: none;
  color: ${colors.white};
  background: ${colors.black};
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  font-size: 2rem;

  &:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  &:active {
    color: ${colors.black};
  }

  &:active:after {
    background: transparent;
  }

  &:hover:before {
    opacity: 1;
  }

  &:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${colors.black};
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;
