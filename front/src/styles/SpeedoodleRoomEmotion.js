import styled from '@emotion/styled';
import { colors } from './ColorPalette';

export const SpeedoodleRoomContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(12, 1fr);
  column-gap: 2rem;
  width: 100%;
  height: 100%;
`;

export const UserInfoContainer = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 5;
  border: 1px solid red;
  box-sizing: border-box;
`;

export const GameInfoContainer = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 5;
  grid-column-end: 13;
  border: 1px solid yellow;
  box-sizing: border-box;
`;
