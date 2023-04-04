// import styled from '@emotion/styled/macro';
import styled, { keyframes } from 'styled-components';
import { colors } from '../styles/ColorPalette';
import HeroImg from '../assets/main.gif';
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  background-color: #bbd4f2;
  box-sizing: border-box;
`;

export const HomeSentencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  padding-top: 13rem;
  background: linear-gradient(
    to top right,
    rgba(236, 61, 89, 0.5),
    rgba(22, 86, 233, 0.5)
  );
  box-sizing: border-box;
`;

export const HomeHiFiveContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  padding-top: 13rem;
  background-color: ${colors.gameBlue200};
  box-sizing: border-box;
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

export const HeroGif = styled.div`
  width: 50%;
  height: 100%;
  background: center / contain no-repeat url(${HeroImg});
`;

export const HeroScrollMsg = styled.div``;

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
