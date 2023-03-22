import styled from '@emotion/styled/macro';
import { colors } from '../styles/ColorPalette';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400vh;
  background-color: ${colors.white};
  box-sizing: border-box;
  scoll: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
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
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
  background: linear-gradient(
    to top right,
    rgba(236, 61, 89, 0.5),
    rgba(22, 86, 233, 0.5)
  );
  box-sizing: border-box;
`;

export const HomeHiFiveContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 10%;
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
  background-color: gray;
`;
