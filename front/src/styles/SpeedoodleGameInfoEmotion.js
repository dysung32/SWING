import styled from '@emotion/styled';
import { colors } from './ColorPalette';

export const GameInfoContainer = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 5;
  grid-column-end: 13;
  padding: 1rem;
  background-color: ${colors.white};
  border-radius: 1.5rem;
  box-sizing: border-box;
`;

export const RoomTitle = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${colors.gray200};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const RoomInfoContainer = styled.div`
  width: 100%;
  height: calc(90% - 1rem);
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  margin-top: 1rem;
`;

export const RoomInfo = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 3;
`;

export const Chat = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 3;
  grid-column-end: 4;
  background-color: ${colors.gray200};
  border-radius: 1rem;
`;

export const GameExplain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40%;
  margin-bottom: 4%;
  border-radius: 1rem;
  background-color: ${colors.gray200};
`;

export const GameModeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30%;
  margin-bottom: 4%;
  background-color: ${colors.gray200};
`;

export const GameMode = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc((100% - 1rem) / 2);
  height: 100%;
  padding: 1rem;
  background-color: ${(props) => props.color};
  border-radius: 1rem;
  color: ${(props) => props.fontColor};
  border: ${(props) => props.border};
  box-sizing: border-box;
  word-break: keep-all;
`;

export const BtnContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
`;
