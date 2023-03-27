import styled from '@emotion/styled';
import { colors } from './ColorPalette';

export const GameContainer = styled.div`
  padding: 1rem;
`;

export const RoundHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.gameBlue500};
`;

export const CanvasContainer = styled.div`
  width: 100%;
  height: 50vh;
  margin: 1rem 0;
  padding-top: 1rem;
  border-radius: 1.5rem;
  background-color: ${colors.white};
`;

export const Keyword = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;
  background-color: ${colors.gamePink200};
  border-radius: 1rem;
  box-sizing: border-box;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
`;
